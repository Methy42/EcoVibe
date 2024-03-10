import * as THREE from 'three';
import { Character } from './Character';
import { EnterPanelCharacterChangeEvent, SceneControlCharacterModelLoadCompleteEvent, SceneControlCharacterModelLoadProgressEvent, SocketPlayerLoginEvent, store } from '../store';
import { Animation } from './Animation';

export class Scene {
    constructor(option: { cantainer: HTMLDivElement }) {
        this.container = option.cantainer;

        this.clock = new THREE.Clock();

        this.initScene();

        this.initRenderer();

        this.initCamera();

        this.initAnimations();

        this.container.addEventListener('resize', this.onContainerResize);

        this.animate();

        store.eventBus.addEventListener(EnterPanelCharacterChangeEvent, (event) => {
            this.initControlCharacter((event as MessageEvent<string>).data);
        });

        store.eventBus.addEventListener(SocketPlayerLoginEvent, (event) => {
            !this.controlCharacter && this.initControlCharacter((event as MessageEvent<any>).data.player.character);

            
        });
    }

    container: HTMLDivElement;

    scene!: THREE.Scene;

    renderer!: THREE.WebGLRenderer;

    camera!: THREE.PerspectiveCamera;

    clock!: THREE.Clock;

    controlCharacter?: Character;
    
    animationMap: { [name: string]: Animation } = {};

    initScene = () => {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xa0a0a0);
        this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
        hemiLight.position.set(0, 20, 0);
        this.scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 3);
        dirLight.position.set(3, 10, 10);
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = - 2;
        dirLight.shadow.camera.left = - 2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        this.scene.add(dirLight);

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
    }

    initRenderer = () => {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.scrollWidth, this.container.scrollHeight);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
    }

    initCamera = () => {
        this.camera = new THREE.PerspectiveCamera(45, this.container.scrollWidth / this.container.scrollHeight, 1, 100);
        this.camera.position.set(0, 1.2, 3);
        this.camera.lookAt(new THREE.Vector3(0, 1.2, 0))
    }

    initControlCharacter = async (characterName: string) => {
        if (this.controlCharacter) {
            this.scene.remove(this.controlCharacter.vrm?.scene!);
        }

        this.controlCharacter = new Character({ modelPath: `/models/${characterName}.vrm` });
        await this.controlCharacter.loadModel((event) => {
            store.eventBus.dispatchEvent(new MessageEvent(SceneControlCharacterModelLoadProgressEvent, { data: event }));
        });

        await this.initAnimations();

        const clip = await this.animationMap['StandingIdle'].getAnimationClip(this.controlCharacter.vrm!);
        this.controlCharacter?.animationMixer?.clipAction(clip!).play();

        this.controlCharacter && this.scene.add(this.controlCharacter.vrm?.scene!);
        store.eventBus.dispatchEvent(new Event(SceneControlCharacterModelLoadCompleteEvent));
    };

    initAnimations = async () => {
        this.animationMap = {};

        this.animationMap['StandingIdle'] = new Animation({ animationName: 'Standing Idle' });
        await this.animationMap['StandingIdle'].load();
    }

    onContainerResize = () => {
        this.camera.aspect = this.container.scrollWidth / this.container.scrollHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.container.scrollWidth, this.container.scrollHeight);
    }

    animate = () => {
        // Render loop
        requestAnimationFrame(this.animate);

        const mixerUpdateDelta = this.clock.getDelta();
        // Update the animation mixer, the stats panel, and render this frame
        this.controlCharacter?.animationMixer?.update(mixerUpdateDelta);

        this.renderer.render(this.scene, this.camera);
    }
}