import * as THREE from 'three';

declare module '@ar-js-org/ar.js/three.js/build/ar-threex.js' {
    export class ArToolkitSource {
        constructor(params: { sourceType: string });
        init(callback: () => void): void;
        ready: boolean;
        domElement: HTMLElement;
        onResizeElement(): void;
        copyElementSizeTo(element: HTMLElement): void;
    }

    export class ArToolkitContext {
        constructor(params: {
            cameraParametersUrl: string;
            detectionMode: string;
            maxDetectionRate: number;
            canvasWidth: number;
            canvasHeight: number;
        });
        init(callback: () => void): void;
        arController: { canvas: HTMLElement } | null;
        getProjectionMatrix(): any;
        update(element: HTMLElement): void;
    }

    export class ArMarkerControls {
        constructor(
            context: ArToolkitContext,
            object: THREE.Object3D,
            params: {
                type: string;
                patternUrl: string;
                changeMatrixMode: string;
            }
        );
    }
}