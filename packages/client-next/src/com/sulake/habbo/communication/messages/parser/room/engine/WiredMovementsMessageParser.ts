import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { UserDirectionUpdateMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/UserDirectionUpdateMessageData';
import { WiredFurniMoveMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredFurniMoveMessageData';
import { WiredUserMoveMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredUserMoveMessageData';
import { WiredWallItemMoveMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredWallItemMoveMessageData';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class WiredMovementsMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::WiredMovementsMessageParser'); }

    declare private _userMoves: any[];

    declare private _furniMoves: any[];

    declare private _wallItemMoves: any[];

    declare private _userDirectionUpdates: any[];

    constructor() {
    }

    private static parseUserMove(param1: IMessageDataWrapper): WiredUserMoveMessageData {
        let _loc3_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        let _loc10_: number = param1.readInteger();
        let _loc9_: number = param1.readInteger();
        let _loc5_: number = Number(param1.readString());
        let _loc8_: number = Number(param1.readString());
        let _loc6_: number = param1.readInteger();
        let _loc13_: number = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        let _loc11_: number = param1.readInteger();
        let _loc7_: number = param1.readInteger();
        let _loc12_: number = NaN;
        if (param1.readBoolean()) {
            _loc12_ = param1.readInteger();
        }
        return new WiredUserMoveMessageData(_loc6_ | 0, new Vector3d(_loc3_, _loc4_, _loc5_), new Vector3d(_loc10_, _loc9_, _loc8_), _loc13_ == 0 ? "mv" : "sld", _loc2_, _loc11_, _loc7_, _loc12_);
    }

    private static parseFurniMove(param1: IMessageDataWrapper): WiredFurniMoveMessageData {
        let _loc3_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        let _loc10_: number = param1.readInteger();
        let _loc8_: number = param1.readInteger();
        let _loc5_: number = Number(param1.readString());
        let _loc7_: number = Number(param1.readString());
        let _loc6_: number = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        let _loc9_: number = param1.readInteger();
        let _loc11_: number = NaN;
        if (param1.readBoolean()) {
            _loc11_ = param1.readInteger();
        }
        let _loc12_: number = NaN;
        if (param1.readBoolean()) {
            _loc12_ = param1.readInteger();
        }
        return new WiredFurniMoveMessageData(_loc6_ | 0, new Vector3d(_loc3_, _loc4_, _loc5_), new Vector3d(_loc10_, _loc8_, _loc7_), _loc2_, _loc9_, _loc11_, _loc12_);
    }

    private static parseWallItemMove(param1: IMessageDataWrapper): WiredWallItemMoveMessageData {
        let _loc4_: number = param1.readInteger();
        let _loc6_: boolean = param1.readBoolean();
        let _loc10_: number = param1.readInteger();
        let _loc9_: number = param1.readInteger();
        let _loc7_: number = param1.readInteger();
        let _loc8_: number = param1.readInteger();
        let _loc5_: number = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        let _loc11_: number = param1.readInteger();
        let _loc12_: number = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        return new WiredWallItemMoveMessageData(_loc4_ | 0, _loc6_, _loc10_, _loc9_, _loc7_, _loc8_, _loc5_, _loc2_, _loc11_, _loc12_, _loc3_);
    }

    private static parseUserDirUpdate(param1: IMessageDataWrapper): UserDirectionUpdateMessageData {
        let _loc3_: number = param1.readInteger();
        let _loc2_: number = param1.readInteger();
        let _loc4_: number = param1.readInteger();
        return new UserDirectionUpdateMessageData(_loc3_ | 0, _loc2_, _loc4_);
    }

    public flush(): boolean {
        this._userMoves = [];
        this._furniMoves = [];
        this._wallItemMoves = [];
        this._userDirectionUpdates = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        if (param1 == null) {
            return false;
        }
        this._userMoves = [];
        this._furniMoves = [];
        this._wallItemMoves = [];
        this._userDirectionUpdates = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = param1.readInteger();
            switch (_loc3_) {
                case 0:
                    this._userMoves.push(WiredMovementsMessageParser.parseUserMove(param1));
                    break;
                case 1:
                    this._furniMoves.push(WiredMovementsMessageParser.parseFurniMove(param1));
                    break;
                case 2:
                    this._wallItemMoves.push(WiredMovementsMessageParser.parseWallItemMove(param1));
                    break;
                case 3:
                    this._userDirectionUpdates.push(WiredMovementsMessageParser.parseUserDirUpdate(param1));
            }
            _loc4_++;
        }
        return true;
    }

    public get userMoves(): any[] {
        return this._userMoves;
    }

    public get furniMoves(): any[] {
        return this._furniMoves;
    }

    public get wallItemMoves(): any[] {
        return this._wallItemMoves;
    }

    public get userDirectionUpdates(): any[] {
        return this._userDirectionUpdates;
    }
}
