/// <reference types="react" />
import { ComponentMeta } from '@storybook/react';
declare const _default: ComponentMeta<({ onPress, children, icon, sharer, dimensions, type, ...extra }: {
    sharer?: {
        image?: string;
        message?: string;
        phone?: string;
        url?: string;
        user?: string;
    };
    icon?: boolean | {
        width: number;
        height: number;
    };
    dimensions?: {
        width: number;
        height: number;
    };
} & import("../components/AwesomeButton").ButtonType) => JSX.Element>;
export default _default;
export declare const Facebook: any;
export declare const Instagram: any;
export declare const Messenger: any;
export declare const Whatsapp: any;
export declare const Linkedin: any;
export declare const Github: any;
export declare const Reddit: any;
export declare const Pinterest: any;
