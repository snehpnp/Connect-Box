import * as React from 'react';
import { ButtonType } from '../AwesomeButton';
declare type ButtonTypeModified = Omit<ButtonType, 'onPress'>;
export declare type ButtonProgressType = {
    onPress: (event: React.MouseEvent, next: () => void) => void;
    loadingLabel?: string;
    resultLabel?: string;
    releaseDelay?: number;
};
declare const AwesomeButtonProgress: ({ onPress, rootElement, loadingLabel, resultLabel, disabled, cssModule, children, size, type, releaseDelay, ...extra }: ButtonProgressType & ButtonTypeModified) => JSX.Element;
export default AwesomeButtonProgress;
