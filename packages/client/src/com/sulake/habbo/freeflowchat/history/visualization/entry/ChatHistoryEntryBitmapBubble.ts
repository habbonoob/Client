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

    constructor(param1: ChatItem, param2: boolean, param3: string, param4: BitmapData, param5: Rectangle = null) {
        this._overlap = param5;
        this._userId = param1.userId;
        this._roomId = param1.roomId;
        let _loc6_: TextField = new TextField();
        _loc6_.defaultTextFormat = ChatHistoryConstants.TEXT_FORMAT_TIMESTAMP;
        _loc6_.text = HabboFreeFlowChat.getTimeStampNow();
        _loc6_.thickness = -15;
        _loc6_.sharpness = 80;
        _loc6_.antiAliasType = "advanced";
        _loc6_.embedFonts = true;
        _loc6_.gridFitType = "pixel";
        let _loc8_: number = param4.height;
        let _loc7_: number = 62;
        let _loc9_: number = Math.max(3, 3 + param5.top) | 0;
        this._bitmap = new BitmapData(_loc7_ + param4.width, _loc8_, true, 0);
        this._bitmap.draw(_loc6_, new Matrix(1, 0, 0, 1, 0, _loc9_));
        this._bitmap.copyPixels(param4, param4.rect, new Point(_loc7_, 0));
        this._canIgnore = param2;
        this._userName = param3;
    }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _canIgnore: boolean;
    static { (this.prototype as any)._canIgnore = false; }

    declare private _bitmap: BitmapData;

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    declare private _overlap: Rectangle;

    public get overlap(): Rectangle {
        return this._overlap;
    }

    declare private _userName: string;

    public get userName(): string {
        return this._userName;
    }

    public get userId(): number {
        return this._userId;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get canIgnore(): boolean {
        return this._canIgnore;
    }
}
