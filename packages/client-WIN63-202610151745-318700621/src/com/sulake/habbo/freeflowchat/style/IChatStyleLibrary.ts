import type { IChatStyle } from '@/com/sulake/habbo/freeflowchat/style/IChatStyle';

export interface IChatStyleLibrary {
    getStyleIds(): any[];
    getStyle(param1: number): IChatStyle;
}
