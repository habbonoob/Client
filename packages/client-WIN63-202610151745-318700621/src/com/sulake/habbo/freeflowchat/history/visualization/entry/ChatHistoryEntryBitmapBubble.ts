import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import type { IChatHistoryEntryBitmap } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/IChatHistoryEntryBitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { ChatHistoryConstants } from '@/com/sulake/habbo/freeflowchat/history/visualization/enum/ChatHistoryConstants';

export class ChatHistoryEntryBitmapBubble implements IChatHistoryEntryBitmap {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization.entry::ChatHistoryEntryBitmapBubble'); }

    declare private _bitmap: BitmapData;

    declare private _overlap: Rectangle;

    declare private _userIndex: number;
    static { (this.prototype as any)._userIndex = 0; }

    declare private _webId: number;
    static { (this.prototype as any)._webId = 0; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _SafeStr_6758: boolean;
    static { (this.prototype as any)._SafeStr_6758 = false; }

    declare private _userName: string;

    constructor(param1: ChatItem, param2: boolean, param3: number, param4: string, param5: BitmapData, param6: Rectangle = null) {
        this._overlap = param6;
        this._userIndex = param1.userId;
        this._webId = param3;
        this._roomId = param1.roomId;
        let _loc7_: TextField = new TextField();
        _loc7_.defaultTextFormat = ChatHistoryConstants.TEXT_FORMAT_TIMESTAMP;
        _loc7_.text = HabboFreeFlowChat.getTimeStampNow();
        _loc7_.thickness = -15;
        _loc7_.sharpness = 80;
        _loc7_.antiAliasType = "advanced";
        _loc7_.embedFonts = true;
        _loc7_.gridFitType = "pixel";
        let _loc9_: number = param5.height;
        let _loc8_: number = 62;
        let _loc10_: number = Math.max(3, 3 + param6.top) | 0;
        this._bitmap = new BitmapData(_loc8_ + param5.width, _loc9_, true, 0);
        this._bitmap.draw(_loc7_, new Matrix(1, 0, 0, 1, 0, _loc10_));
        this._bitmap.copyPixels(param5, param5.rect, new Point(_loc8_, 0));
        this._SafeStr_6758 = param2;
        this._userName = param4;
    }

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    public get overlap(): Rectangle {
        return this._overlap;
    }

    public get userIndex(): number {
        return this._userIndex;
    }

    public get webId(): number {
        return this._webId;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get canIgnore(): boolean {
        return this._SafeStr_6758;
    }

    public get userName(): string {
        return this._userName;
    }
}
