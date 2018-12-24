import React from 'react';

import './LoadingOverlay.css';
import { SpinnerIcon } from './icons';

const LoadingOverlay = () => (
    <div className="loading-overlay">
        <div className="loading-spinner">
            <SpinnerIcon
                size={5}
                color={'white'}
                spin={1}
            />
        </div>
    </div>
);

export default LoadingOverlay;