import { VRM } from "@pixiv/three-vrm";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { mixamoVRMRigMap } from "../lib/mixamoVRMRigMap";

export interface IAnimationOption {
    animationName: string;
}

export class Animation {
    constructor(option: IAnimationOption) {
        this.animationName = option.animationName;
    }

    animationName: string;

    animationAsset?: THREE.Group<THREE.Object3DEventMap>;

    load = async () => {
        const fbxLoader = new FBXLoader();

        this.animationAsset = await fbxLoader.loadAsync(`/animations/${this.animationName}.fbx`);
    }

    getAnimationClip = async (vrm: VRM) => {
        if (!this.animationAsset) return;

        const animationAsset = this.animationAsset.clone();
        
        const clip = THREE.AnimationClip.findByName( animationAsset.animations, 'mixamo.com' ); // extract the AnimationClip

		const tracks: any[] = []; // KeyframeTracks compatible with VRM will be added here

		const restRotationInverse = new THREE.Quaternion();
		const parentRestWorldRotation = new THREE.Quaternion();
		const _quatA = new THREE.Quaternion();
		const _vec3 = new THREE.Vector3();

		// Adjust with reference to hips height.
		const motionHipsHeight = animationAsset.getObjectByName( 'mixamorigHips' )?.position.y || 0;
		const vrmHipsY = vrm.humanoid.getNormalizedBoneNode( 'hips' )?.getWorldPosition( _vec3 ).y || 0;
		const vrmRootY = vrm.scene.getWorldPosition( _vec3 ).y;
		const vrmHipsHeight = Math.abs( vrmHipsY - vrmRootY );
		const hipsPositionScale = vrmHipsHeight / motionHipsHeight;

		clip.tracks.forEach( ( track ) => {
            if (!animationAsset) return;

			// Convert each tracks for VRM use, and push to `tracks`
			const trackSplitted = track.name.split( '.' );
			const mixamoRigName = trackSplitted[ 0 ];
			const vrmBoneName = (mixamoVRMRigMap as any)[ mixamoRigName ];
			const vrmNodeName = vrm.humanoid.getNormalizedBoneNode( vrmBoneName )?.name.replace(/Normalized_/, '') || null;
            
			const mixamoRigNode = animationAsset.getObjectByName( mixamoRigName );

			if ( vrmNodeName != null ) {

				const propertyName = trackSplitted[ 1 ];

				// Store rotations of rest-pose.
				mixamoRigNode?.getWorldQuaternion( restRotationInverse ).invert();
				mixamoRigNode?.parent?.getWorldQuaternion( parentRestWorldRotation );

				if ( track instanceof THREE.QuaternionKeyframeTrack ) {

					// Retarget rotation of mixamoRig to NormalizedBone.
					for ( let i = 0; i < track.values.length; i += 4 ) {

						const flatQuaternion = track.values.slice( i, i + 4 );

						_quatA.fromArray( flatQuaternion );

						// 親のレスト時ワールド回転 * トラックの回転 * レスト時ワールド回転の逆
						_quatA
							.premultiply( parentRestWorldRotation )
							.multiply( restRotationInverse );

						_quatA.toArray( flatQuaternion );

						flatQuaternion.forEach( ( v, index ) => {

							track.values[ index + i ] = v;

						} );

					}

					tracks.push(
						new THREE.QuaternionKeyframeTrack(
							`${vrmNodeName}.${propertyName}`,
							track.times,
							track.values.map( ( v, i ) => ( vrm.meta?.metaVersion === '0' && i % 2 === 0 ? - v : v ) ),
						),
					);

				} else if ( track instanceof THREE.VectorKeyframeTrack ) {

					const value = track.values.map( ( v, i ) => ( vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? - v : v ) * hipsPositionScale );
					tracks.push( new THREE.VectorKeyframeTrack( `${vrmNodeName}.${propertyName}`, track.times, value ) );

				}

			}

		} );

		return new THREE.AnimationClip( 'vrmAnimation', clip.duration, tracks );
    };
}