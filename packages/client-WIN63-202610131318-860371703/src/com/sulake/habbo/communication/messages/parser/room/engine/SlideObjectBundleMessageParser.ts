import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { SlideObjectMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/SlideObjectMessageData';
import { Logger } from '@/com/sulake/habbo/Logger';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class SlideObjectBundleMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::SlideObjectBundleMessageParser'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _objectList: any[];

    private _avatar: SlideObjectMessageData = null;

    constructor() {
    }

    public get id(): number {
        return this._id;
    }

    public get avatar(): SlideObjectMessageData {
        return this._avatar;
    }

    public get objectList(): any[] {
        return this._objectList;
    }

    public flush(): boolean {
        this._id = -1;
        this._avatar = null;
        this._objectList = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc14_: number = 0;
        let _loc7_: SlideObjectMessageData = null;
        let _loc2_: Vector3d = null;
        let _loc9_: Vector3d = null;
        let _loc12_: number = NaN;
        let _loc3_: number = NaN;
        let _loc6_: number = 0;
        if (param1 == null) {
            return false;
        }
        let _loc10_: number = param1.readInteger();
        let _loc11_: number = param1.readInteger();
        let _loc5_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        let _loc8_: number = param1.readInteger();
        this._objectList = [];
        _loc6_ = 0;
        while (_loc6_ < _loc8_) {
            _loc14_ = param1.readInteger();
            _loc12_ = Number(param1.readString());
            _loc3_ = Number(param1.readString());
            _loc2_ = new Vector3d(_loc10_, _loc11_, _loc12_);
            _loc9_ = new Vector3d(_loc5_, _loc4_, _loc3_);
            _loc7_ = new SlideObjectMessageData(_loc14_, _loc2_, _loc9_);
            this._objectList.push(_loc7_);
            _loc6_++;
        }
        this._id = param1.readInteger();
        if (!param1.bytesAvailable) {
            return true;
        }
        let _loc13_: number = 0;
        switch (_loc13_ = param1.readInteger()) {
            case 0:
                break;
            case 1:
                _loc14_ = param1.readInteger();
                _loc12_ = Number(param1.readString());
                _loc3_ = Number(param1.readString());
                _loc2_ = new Vector3d(_loc10_, _loc11_, _loc12_);
                _loc9_ = new Vector3d(_loc5_, _loc4_, _loc3_);
                this._avatar = new SlideObjectMessageData(_loc14_, _loc2_, _loc9_, "mv");
                break;
            case 2:
                _loc14_ = param1.readInteger();
                _loc12_ = Number(param1.readString());
                _loc3_ = Number(param1.readString());
                _loc2_ = new Vector3d(_loc10_, _loc11_, _loc12_);
                _loc9_ = new Vector3d(_loc5_, _loc4_, _loc3_);
                this._avatar = new SlideObjectMessageData(_loc14_, _loc2_, _loc9_, "sld");
                break;
            default:
                Logger.log("** Incompatible character movetype!");
        }
        return true;
    }
}
