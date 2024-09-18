import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebXRAd: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Setup scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true; // Enable WebXR
        if ("appendChild" in containerRef.current) {
            containerRef.current.appendChild(renderer.domElement);
        } // Attach renderer to div

        // Create a basic plane with image texture for the ad
        const geometry = new THREE.PlaneGeometry(1, 1); // Plane for displaying an image or video
        const textureLoader = new THREE.TextureLoader();

        // Replace 'your-image-url' with the actual image, GIF, or video texture URL
        textureLoader.load('/assets/tonsplakat.jpg', (texture) => {
            const material = new THREE.MeshBasicMaterial({ map: texture });
            const plane = new THREE.Mesh(geometry, material);
            scene.add(plane); // Add the plane to the scene
        });

        camera.position.z = 2;

        // WebXR's animation loop
        const animate = () => {
            renderer.setAnimationLoop(() => {
                renderer.render(scene, camera);
            });
        };

        renderer.setAnimationLoop(animate);

        // Clean up on unmount
        return () => {
            if (containerRef.current) {
                if ("removeChild" in containerRef.current) {
                    containerRef.current.removeChild(renderer.domElement);
                }
            }
        };
    }, []);

    return <div ref={containerRef}></div>;
};

export default WebXRAd;
