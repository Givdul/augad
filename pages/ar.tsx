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
                <meta httpEquiv="Permissions-Policy" content="camera=(), gyroscope=()" />
            </Head>
            <Script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js" strategy="beforeInteractive" />
            <Script src="https://aframe.io/releases/1.6.0/aframe.min.js" strategy="beforeInteractive" />
            <a-scene embedded arjs>
                <a-box position="0 0.5 0" material="opacity: 0.5;"></a-box>
                {/* Replace a-marker-camera with a-marker */}
                <a-marker preset="hiro"></a-marker>
            </a-scene>
        </>
    );
};

export default ARPage;