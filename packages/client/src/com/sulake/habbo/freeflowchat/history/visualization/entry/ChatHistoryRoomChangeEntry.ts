import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IChatHistoryEntryBitmap } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/IChatHistoryEntryBitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { ChatHistoryConstants } from '@/com/sulake/habbo/freeflowchat/history/visualization/enum/ChatHistoryConstants';

export class ChatHistoryRoomChangeEntry implements IChatHistoryEntryBitmap {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization.entry::ChatHistoryRoomChangeEntry'); }

    private static readonly TOP_MARGIN_HEIGHT: number = 4;

    constructor(param1: GuestRoomData, param2: HabboFreeFlowChat) {
        let _loc4_: TextField = new TextField();
        _loc4_.defaultTextFormat = ChatHistoryConstants.TEXT_FORMAT;
        _loc4_.htmlText = param1.roomName;
        _loc4_.width = _loc4_.textWidth + 5;
        _loc4_.height = _loc4_.textHeight + 5;
        _loc4_.thickness = -15;
        _loc4_.sharpness = 80;
        _loc4_.antiAliasType = "advanced";
        _loc4_.embedFonts = true;
        _loc4_.gridFitType = "pixel";
        let _loc3_: TextField = new TextField();
        _loc3_.defaultTextFormat = ChatHistoryConstants.TEXT_FORMAT_TIMESTAMP;
        _loc3_.text = HabboFreeFlowChat.getTimeStampNow();
        _loc3_.width = _loc3_.textWidth + 5;
        _loc3_.height = _loc3_.textHeight + 5;
        _loc3_.thickness = -15;
        _loc3_.sharpness = 80;
        _loc3_.antiAliasType = "advanced";
        _loc3_.embedFonts = true;
        _loc3_.gridFitType = "pixel";
        this._bitmap = new BitmapData(415, _loc4_.textHeight + 5 + 8 + 4 | 0, true, 0);
        this._bitmap.copyPixels(param2.getRoomChangeBitmap(), param2.getRoomChangeBitmap().rect, new Point(62, 1 + 4));
        this._bitmap.draw(_loc3_, new Matrix(1, 0, 0, 1, 0, 4));
        this._bitmap.draw(_loc4_, new Matrix(1, 0, 0, 1, 62 + 20, 4));
    }

    declare private _bitmap: BitmapData;

    public get bitmap(): BitmapData {
        return this._bitmap;
    }

    private _overlap: Rectangle = new Rectangle(0, 0, 0, 0);

    public get overlap(): Rectangle {
        return this._overlap;
    }

    public get userId(): number {
        return -1;
    }

    public get roomId(): number {
        return -1;
    }

    public get canIgnore(): boolean {
        return false;
    }

    public get userName(): string {
        return "";
    }
}
