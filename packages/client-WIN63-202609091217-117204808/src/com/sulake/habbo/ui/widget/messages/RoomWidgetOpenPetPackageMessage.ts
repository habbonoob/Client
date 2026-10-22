import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';

export class RoomWidgetOpenPetPackageMessage extends RoomWidgetMessage {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.messages::RoomWidgetOpenPetPackageMessage'); }

    public static readonly WIDGET_MESSAGE_OPEN_PET_PACKAGE: string = "RWOPPM_OPEN_PET_PACKAGE";

    declare private _objectId: number;
    static { (this.prototype as any)._objectId = 0; }

    declare private _name: string;

    constructor(param1: string, param2: number, param3: string) {
        super(param1);
        this._objectId = param2;
        this._name = param3;
    }

    public get objectId(): number {
        return this._objectId;
    }

    public get name(): string {
        return this._name;
    }
}
