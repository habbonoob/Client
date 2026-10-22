import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AvatarActionMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/AvatarActionMessageData';
import { UserUpdateMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserUpdateMessageData';

export class UserUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UserUpdateMessageParser'); }

    constructor() {
    }

    private _users: any[] = [];

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
        let _loc22_: number = 0;
        let _loc15_: number = 0;
        let _loc27_: number = NaN;
        let _loc28_: number = NaN;
        let _loc29_: number = NaN;
        let _loc13_: any = NaN;
        let _loc2_: number = 0;
        let _loc25_: number = 0;
        let _loc9_: string = null;
        let _loc10_: any = false;
        let _loc16_: number = 0;
        let _loc7_: number = 0;
        let _loc30_: any[] = null;
        let _loc20_: number = NaN;
        let _loc19_: number = NaN;
        let _loc18_: number = NaN;
        let _loc11_: boolean = false;
        let _loc12_: any[] = null;
        let _loc8_: boolean = false;
        let _loc23_: number = 0;
        let _loc5_: string = null;
        let _loc14_: any[] = null;
        let _loc26_: string = null;
        let _loc17_: string = null;
        let _loc3_: any[] = null;
        let _loc24_: number = NaN;
        let _loc6_: number = NaN;
        let _loc4_: UserUpdateMessageData = null;
        if (param1 == null) {
            return false;
        }
        let _loc21_: number = param1.readInteger();
        _loc22_ = 0;
        while (_loc22_ < _loc21_) {
            _loc15_ = param1.readInteger();
            _loc27_ = param1.readInteger();
            _loc28_ = param1.readInteger();
            _loc29_ = Number(param1.readString());
            _loc13_ = 0;
            _loc2_ = param1.readInteger();
            _loc25_ = param1.readInteger();
            _loc9_ = param1.readString();
            _loc10_ = false;
            _loc16_ = _loc2_ % 8 * 45;
            _loc7_ = _loc25_ % 8 * 45;
            _loc30_ = [];
            _loc20_ = 0;
            _loc19_ = 0;
            _loc18_ = 0;
            _loc11_ = false;
            _loc12_ = _loc9_.split("/");
            _loc8_ = false;
            _loc23_ = 0;
            while (_loc23_ < _loc12_.length) {
                _loc5_ = asGuarded(_loc12_[_loc23_], isString);
                _loc14_ = _loc5_.split(" ");
                _loc26_ = String(_loc14_[0]);
                _loc17_ = "";
                if (_loc26_ != "") {
                    if (_loc26_ == "wf") {
                        _loc8_ = true;
                    }
                    if (_loc14_.length >= 2) {
                        _loc17_ = String(_loc14_[1]);
                        switch (_loc26_) {
                            case "mv":
                                _loc3_ = _loc17_.split(",");
                                if (_loc3_.length >= 3) {
                                    _loc20_ = _loc3_[0] | 0;
                                    _loc19_ = _loc3_[1] | 0;
                                    _loc18_ = Number(_loc3_[2]);
                                    _loc11_ = true;
                                }
                                break;
                            case "sit":
                                _loc24_ = Number(_loc17_);
                                if (_loc14_.length >= 3) {
                                    _loc10_ = _loc14_[2] == "1";
                                }
                                _loc13_ = _loc24_;
                                break;
                            case "lay":
                                _loc6_ = Number(_loc17_);
                                if (_loc6_ < 0) {
                                }
                                _loc13_ = Math.abs(_loc6_);
                        }
                    }
                    _loc30_.push(new AvatarActionMessageData(_loc26_, _loc17_));
                }
                _loc23_++;
            }
            _loc4_ = new UserUpdateMessageData(_loc15_, _loc27_, _loc28_, _loc29_, Number(_loc13_), _loc7_, _loc16_, _loc20_, _loc19_, _loc18_, _loc11_, _loc10_, _loc30_, _loc8_);
            this._users.push(_loc4_);
            _loc22_++;
        }
        return true;
    }
}
