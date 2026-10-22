import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AvatarActionMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/AvatarActionMessageData';
import { UserUpdateMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserUpdateMessageData';

export class UserUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UserUpdateMessageParser'); }

    private _users: any[] = [];

    constructor() {
    }

    public get userUpdateCount(): number {
        return this._users.length | 0;
    }

    public flush(): boolean {
        this._users = [];
        return true;
    }

    public getUserUpdateData(param1: number): UserUpdateMessageData {
        if (param1 < 0 || param1 >= this.userUpdateCount) {
            return null;
        }
        return this._users[param1];
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc23_: number = 0;
        let _loc16_: number = 0;
        let _loc28_: number = NaN;
        let _loc29_: number = NaN;
        let _loc30_: number = NaN;
        let _loc14_: number = NaN;
        let _loc3_: number = 0;
        let _loc26_: number = 0;
        let _loc2_: number = 0;
        let _loc10_: string = null;
        let _loc11_: boolean = false;
        let _loc17_: number = 0;
        let _loc8_: number = 0;
        let _loc31_: any[] = null;
        let _loc21_: number = NaN;
        let _loc20_: number = NaN;
        let _loc19_: number = NaN;
        let _loc12_: boolean = false;
        let _loc13_: any[] = null;
        let _loc9_: boolean = false;
        let _loc24_: number = 0;
        let _loc6_: string = null;
        let _loc15_: any[] = null;
        let _loc27_: string = null;
        let _loc18_: string = null;
        let _loc4_: any[] = null;
        let _loc25_: number = NaN;
        let _loc7_: number = NaN;
        let _loc5_: UserUpdateMessageData = null;
        if (param1 == null) {
            return false;
        }
        let _loc22_: number = param1.readInteger();
        _loc23_ = 0;
        while (_loc23_ < _loc22_) {
            _loc16_ = param1.readInteger();
            _loc28_ = param1.readInteger();
            _loc29_ = param1.readInteger();
            _loc30_ = Number(param1.readString());
            _loc14_ = 0;
            _loc3_ = param1.readInteger();
            _loc26_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            _loc10_ = param1.readString();
            _loc11_ = false;
            _loc17_ = _loc3_ % 8 * 45;
            _loc8_ = _loc26_ % 8 * 45;
            _loc31_ = [];
            _loc21_ = 0;
            _loc20_ = 0;
            _loc19_ = 0;
            _loc12_ = false;
            _loc13_ = _loc10_.split("/");
            _loc9_ = false;
            _loc24_ = 0;
            while (_loc24_ < _loc13_.length) {
                _loc6_ = asGuarded(_loc13_[_loc24_], isString);
                _loc15_ = _loc6_.split(" ");
                _loc27_ = String(_loc15_[0]);
                _loc18_ = "";
                if (_loc27_ != "") {
                    if (_loc27_ == "wf") {
                        _loc9_ = true;
                    }
                    if (_loc15_.length >= 2) {
                        _loc18_ = String(_loc15_[1]);
                        switch (_loc27_) {
                            case "mv":
                                _loc4_ = _loc18_.split(",");
                                if (_loc4_.length >= 3) {
                                    _loc21_ = _loc4_[0] | 0;
                                    _loc20_ = _loc4_[1] | 0;
                                    _loc19_ = Number(_loc4_[2]);
                                    _loc12_ = true;
                                }
                                break;
                            case "sit":
                                _loc25_ = Number(_loc18_);
                                if (_loc15_.length >= 3) {
                                    _loc11_ = _loc15_[2] == "1";
                                }
                                _loc14_ = _loc25_;
                                break;
                            case "lay":
                                _loc7_ = Number(_loc18_);
                                if (_loc7_ < 0) {
                                }
                                _loc14_ = Number(Math.abs(_loc7_));
                        }
                    }
                    _loc31_.push(new AvatarActionMessageData(_loc27_, _loc18_));
                }
                _loc24_++;
            }
            _loc5_ = new UserUpdateMessageData(_loc16_, _loc28_, _loc29_, _loc30_, _loc14_, _loc8_, _loc17_, _loc21_, _loc20_, _loc19_, _loc12_, _loc11_, _loc31_, _loc9_, _loc2_);
            this._users.push(_loc5_);
            _loc23_++;
        }
        return true;
    }
}
