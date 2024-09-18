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

        // Create a video element to stream the camera feed
        const video = document.createElement('video');
        video.style.display = 'none';
        document.body.appendChild(video);

        // Request camera access and start the video
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.play();

                video.onloadedmetadata = () => {
                    // Create a texture from the video
                    const videoTexture = new THREE.VideoTexture(video);

                    // Create a plane to display the video feed
                    const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
                    const videoGeometry = new THREE.PlaneGeometry(2, 2);
                    const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);

                    // Position the videoMesh in front of the camera
                    videoMesh.position.set(0, 0, -1);

                    scene.add(videoMesh);
                };
            });

        // Create a texture from the video
        const videoTexture = new THREE.VideoTexture(video);

        // Create a plane to display the video feed
        const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });
        const videoGeometry = new THREE.PlaneGeometry(2, 2);
        const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
        scene.add(videoMesh);

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
            document.body.removeChild(video);
        };
    }, []);

    return <div ref={containerRef}></div>;
};

export default WebXRAd;