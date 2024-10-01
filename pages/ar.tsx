import Head from 'next/head';
import Script from 'next/script';

const ARPage: React.FC = () => {

    return (
        <>
            <Head>
                <title>AR Page</title>
            </Head>
            {/* Include AR.js library */}
            <Script src="https://aframe.io/releases/1.6.0/aframe.min.js" strategy="beforeInteractive" />
            <Script
                src="https://cdn.jsdelivr.net/npm/ar.js@2.1.0/aframe/build/aframe-ar.js"
                strategy="beforeInteractive"
            />
            <a-scene>
                {/* Conditionally render the box based on markerFound state */}
                        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
                        {/* ... other 3D content (optional) */}
                <a-marker preset="hiro"></a-marker>
            </a-scene>
        </>
    );
};

export default ARPage;