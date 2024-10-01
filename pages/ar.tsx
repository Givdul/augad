import Head from 'next/head';
import Script from 'next/script';
import {useEffect} from 'react';

const ARPage: React.FC = () => {
    useEffect(() => {
        // Any additional setup can go here
    }, []);

    return (
        <>
            <Head>
                <title>AR Page</title>
            </Head>
                {/* Include AR.js library */}
                <Script src="https://aframe.io/releases/1.6.0/aframe.min.js" strategy="beforeInteractive"/>
                <Script
                    src="https://cdn.jsdelivr.net/npm/ar.js@2.1.0/aframe/build/aframe-ar.js"
                    strategy="beforeInteractive"
                />

            <a-scene>
                {/* Your 3D content here */}
                <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
                <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                <a-sky color="#ECECEC"></a-sky>

                {/* Add the marker component */}
                <a-marker preset="hiro"></a-marker>
            </a-scene>
        </>
    );
};

export default ARPage;