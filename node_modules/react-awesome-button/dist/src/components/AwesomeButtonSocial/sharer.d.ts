export declare function isMobile(): false | RegExpMatchArray;
declare type SharerType = {
    url: string;
    message?: string;
    title?: string;
    image?: string;
    user?: string;
    type: string;
    phone?: string;
    width: number;
    height: number;
};
export default function Sharer({ url, message, title, image, user, type, phone, width, height, }: SharerType): any;
export {};
