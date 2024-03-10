import * as THREE from 'three';
import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Character {
    constructor (option: { modelPath: string }) {
        this.modelPath = option.modelPath;

        this.vrmLoader = new GLTFLoader();
        this.vrmLoader.register((parser) => {
            return new VRMLoaderPlugin(parser);
        });
    }

    modelPath: string;

    vrmLoader: GLTFLoader;

    vrm?: VRM;

    animationMixer?: THREE.AnimationMixer;

    loadModel = async (onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined) => {
        const gltf = await this.vrmLoader.loadAsync(this.modelPath, onProgress);
        this.vrm = gltf.userData.vrm;

        VRMUtils.removeUnnecessaryVertices( gltf.scene );
        VRMUtils.removeUnnecessaryJoints( gltf.scene );

        this.vrm?.scene.traverse( ( obj: { frustumCulled: boolean; } ) => {
            obj.frustumCulled = false;
        } );

        this.animationMixer = new THREE.AnimationMixer( this.vrm?.scene! );
    }
}