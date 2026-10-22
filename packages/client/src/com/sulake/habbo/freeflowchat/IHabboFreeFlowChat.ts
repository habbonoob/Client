import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IChatStyleLibrary } from '@/com/sulake/habbo/freeflowchat/style/IChatStyleLibrary';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';

export interface IHabboFreeFlowChat extends IUnknown {
    get displayObject(): DisplayObject;
    get chatStyleLibrary(): IChatStyleLibrary;
    get isDisabledInPreferences(): boolean;
    set isDisabledInPreferences(param1: boolean);
    get preferedChatStyle(): number;
    set preferedChatStyle(param1: number);
    set visible(param1: boolean);
    createPreviewBitmap(param1: string, param2: number): BitmapData;
    clear(): void;
    toggleVisibility(): void;
    isNotificationStyle(param1: number): boolean;
}
