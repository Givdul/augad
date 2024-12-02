import {useEffect, useRef} from 'react';
import * as THREE from 'three';
import dynamic from 'next/dynamic';

const WebXRAd: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Dynamically import AR.js only on client side
        const initAR = async () => {
            const { ArToolkitSource, ArToolkitContext, ArMarkerControls } = await import('@ar-js-org/ar.js/three.js/build/ar-threex.js');

            if (!containerRef.current) return;

            // Setup scene
            const scene = new THREE.Scene();
            const camera = new THREE.Camera();
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true // important for AR
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            if ("appendChild" in containerRef.current) {
                containerRef.current.appendChild(renderer.domElement);
            }

            // Setup AR source (webcam)
            const arToolkitSource = new ArToolkitSource({
                sourceType: 'webcam',
            });

            // Handle resize
            arToolkitSource.init(() => {
                setTimeout(() => {
                    onResize();
                }, 2000);
            });

            window.addEventListener('resize', onResize);

            function onResize() {
                arToolkitSource.onResizeElement();
                arToolkitSource.copyElementSizeTo(renderer.domElement);
                if (arToolkitContext.arController !== null) {
                    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
                }
            }

// Setup AR context
            const arToolkitContext = new ArToolkitContext({
                cameraParametersUrl: 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/camera_para.dat',
                detectionMode: 'mono',
                maxDetectionRate: 30,
                canvasWidth: 80*3,
                canvasHeight: 60*3,
            });

// Initialize context first
            arToolkitContext.init(() => {
                camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
            });

// Create a group to hold the cube
            const markerGroup = new THREE.Group();
            scene.add(markerGroup);

// Create marker
            new ArMarkerControls(arToolkitContext, markerGroup, {
                type: 'pattern',
                patternUrl: 'https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/data/patt.hiro',
                changeMatrixMode: 'modelViewMatrix'
            });

// Add cube to the marker group instead of scene directly
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshNormalMaterial({
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.y = 0.5;
            markerGroup.add(cube);  // Add to markerGroup instead of scene

// Animation loop
            const animate = () => {
                requestAnimationFrame(animate);

                if (arToolkitSource.ready !== false) {
                    arToolkitContext.update(arToolkitSource.domElement);
                    scene.visible = camera.visible;
                }

                // Rotate cube
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                renderer.render(scene, camera);
            };

            animate();

            // Clean up
            return () => {
                window.removeEventListener('resize', onResize);
                if (containerRef.current) {
                    if ("removeChild" in containerRef.current) {
                        containerRef.current.removeChild(renderer.domElement);
                    }
                }
            };
        };

        initAR();
    }, []);

    return <div ref={containerRef}></div>;
};

// Export with dynamic import and SSR disabled
export default dynamic(() => Promise.resolve(WebXRAd), {
    ssr: false
});