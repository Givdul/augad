"use client";

import Head from 'next/head';
import Script from 'next/script';
import { useEffect } from 'react';

const ARPage: React.FC = () => {
    useEffect(() => {
        // Any additional setup can go here
    }, []);

    return (
        <>
            <Head>
                <title>AR Page</title>
            </Head>
            <Script
                src="https://aframe.io/releases/1.6.0/aframe.min.js"
                strategy="beforeInteractive"
            />
            <a-scene embedded arjs>
                <a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        </>
    );
};

export default ARPage;