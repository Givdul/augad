declare module 'mind-ar-js' {
    export class MindARThree {
        constructor(config: {
            container: HTMLElement;
            imageTargetSrc?: string;
            maxTrack?: number;
            uiScanning?: string | boolean;
            uiLoading?: string | boolean;
            filterMinCF?: number;
            filterBeta?: number;
        });
        renderer: THREE.WebGLRenderer;
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        start(): Promise<void>;
        stop(): void;
    }
}