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
                <a-marker type="pattern" url="./hiro-pattern.patt">
                    <a-entity geometry="primitive: box" material="color: blue"></a-entity>
                </a-marker>
            </a-scene>
        </>
    );
};

export default ARPage;