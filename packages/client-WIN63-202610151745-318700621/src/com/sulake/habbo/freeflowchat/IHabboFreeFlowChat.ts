import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IChatStyleLibrary } from '@/com/sulake/habbo/freeflowchat/style/IChatStyleLibrary';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';

export interface IHabboFreeFlowChat extends IUnknown {
    get displayObject(): DisplayObject;
    get chatStyleLibrary(): IChatStyleLibrary;
    get preferedChatStyle(): number;
    set preferedChatStyle(param1: number);
    get chatFontSizeMode(): number;
    set chatFontSizeMode(param1: number);
    get chatMode(): number;
    set chatMode(param1: number);
    get chatBubbleWidth(): number;
    set chatBubbleWidth(param1: number);
    get chatScrollSpeed(): number;
    set chatScrollSpeed(param1: number);
    updateChatPreferences(param1: number, param2: number, param3: number): void;
    createPreviewBitmap(param1: string, param2: number): BitmapData;
    createChatMessagePreviewBitmap(param1: string, param2: string, param3: number, param4: number, param5: number): BitmapData;
    clear(): void;
    toggleVisibility(): void;
    set visible(param1: boolean);
    isNotificationStyle(param1: number): boolean;
}
