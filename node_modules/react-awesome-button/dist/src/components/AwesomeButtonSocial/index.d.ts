/// <reference types="react" />
import { ButtonType } from '../AwesomeButton/index';
declare type SharerType = {
    image?: string;
    message?: string;
    phone?: string;
    url?: string;
    user?: string;
};
declare type DimensionsType = {
    width: number;
    height: number;
};
declare type SocialButtonType = {
    sharer?: SharerType;
    icon?: boolean | DimensionsType;
    dimensions?: DimensionsType;
};
declare const AwesomeButtonSocial: ({ onPress, children, icon, sharer, dimensions, type, ...extra }: SocialButtonType & ButtonType) => JSX.Element;
export default AwesomeButtonSocial;
