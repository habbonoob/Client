import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetSelectOutfitMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetSelectOutfitMessage'); }

    public static readonly SELECT_OUTFIT: string = "select_outfit";

    constructor(param1: number) {
        super("select_outfit");
        this._outfitId = param1;
    }

    declare private _outfitId: number;
    static { (this.prototype as any)._outfitId = 0; }

    public get outfitId(): number {
        return this._outfitId;
    }
}
