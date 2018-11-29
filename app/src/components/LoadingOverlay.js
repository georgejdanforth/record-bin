import React from 'react';

import './LoadingOverlay.css';
import { SpinnerIcon } from './icons';

const LoadingOverlay = () => (
    <div className="loading-overlay">
        <SpinnerIcon
            size={5}
            color={'white'}
            spin={1}
        />
    </div>
);

export default LoadingOverlay;