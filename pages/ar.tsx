import React, { useEffect } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

const ARPage: React.FC = () => {
    useEffect(() => {
        // Any additional setup can go here
    }, []);

    return (
        <a-scene mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/examples/image-tracking/assets/card-example/card.mind;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
            <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
            <a-entity mindar-image-target="targetIndex: 0">
                <a-plane color="blue" opaciy="0.5" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
            </a-entity>
        </a-scene>
    );
};

export default ARPage;