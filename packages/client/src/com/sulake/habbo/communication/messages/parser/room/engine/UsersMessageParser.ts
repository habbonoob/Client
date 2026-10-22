import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { UserMessageData } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/UserMessageData';

export class UsersMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::UsersMessageParser'); }

    public static convertOldPetFigure(param1: string): string {
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc10_: any[] = ["FF7B3A", "FF9763", "FFCDB3", "F59500", "FBBD5C", "FEE4B2", "EDD400", "F5E759", "FBF8B1", "84A95F", "B0C993", "DBEFC7", "65B197", "91C7B5", "C5EDDE", "7F89B2", "98A1C5", "CAD2EC", "A47FB8", "C09ED5", "DBC7E9", "BD7E9D", "DA9DBD", "ECC6DB", "DD7B7D", "F08B90", "F9BABF", "ABABAB", "D4D4D4", "FFFFFF", "D98961", "DFA281", "F1D2C2", "D5B35F", "DAC480", "FCFAD3", "EAA7AF", "86BC40", "E8CE25", "8E8839", "888F67", "5E9414", "84CE84", "96E75A", "88E70D", "B99105", "C8D71D", "838851", "C08337", "83A785", "E6AF26", "ECFF99", "94FFF9", "ABC8E5", "F2E5CC", "D2FF00"];
        let _loc4_: any[] = param1.split(" ");
        if (_loc4_.length < 3) {
            return "";
        }
        let _loc8_: number = _loc4_[0] | 0;
        let _loc2_: number = (_loc4_[1] | 0) + 1;
        let _loc9_: string = String(_loc4_[2]);
        _loc9_ = _loc9_.substr(_loc9_.length - 6, 6);
        let _loc3_: number = 25;
        if (_loc8_ <= 1) {
            _loc5_ = _loc3_ * _loc8_ + _loc2_;
        } else {
            _loc5_ = 64;
        }
        _loc6_ = _loc10_.indexOf(_loc9_.toUpperCase()) + 1;
        let _loc7_: string = "";
        _loc7_ = _loc7_ + ("phd-" + _loc5_ + "-" + _loc6_);
        _loc7_ = _loc7_ + (".pbd-" + _loc5_ + "-" + _loc6_);
        return _loc7_ + (".ptl-" + _loc5_ + "-" + _loc6_);
    }

    constructor() {
    }

    private _users: any[] = [];

    public flush(): boolean {
        this._users = [];
        return true;
    }

    public getUserCount(): number {
        return this._users.length | 0;
    }

    public getUser(param1: number): UserMessageData {
        if (param1 < 0 || param1 >= this.getUserCount()) {
            return null;
        }
        let _loc2_: UserMessageData = asInstanceOf(this._users[param1], UserMessageData);
        if (_loc2_ != null) {
            _loc2_.setReadOnly();
        }
        return _loc2_;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc7_: number = 0;
        let _loc17_: number = 0;
        let _loc8_: string = null;
        let _loc10_: string = null;
        let _loc13_: string = null;
        let _loc18_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: string = null;
        let _loc11_: number = 0;
        let _loc14_: number = 0;
        let _loc16_: UserMessageData = null;
        let _loc15_: string = null;
        let _loc4_: number = 0;
        let _loc12_: any[] = null;
        let _loc9_: number = 0;
        this._users = [];
        let _loc5_: number = param1.readInteger();
        _loc7_ = 0;
        while (_loc7_ < _loc5_) {
            _loc17_ = param1.readInteger();
            _loc8_ = param1.readString();
            _loc10_ = param1.readString();
            _loc13_ = param1.readString();
            _loc18_ = param1.readInteger();
            _loc6_ = param1.readInteger();
            _loc2_ = param1.readInteger();
            _loc3_ = param1.readString();
            _loc11_ = param1.readInteger();
            _loc14_ = param1.readInteger();
            _loc16_ = new UserMessageData(_loc18_);
            _loc16_.dir = _loc11_;
            _loc16_.name = _loc8_;
            _loc16_.custom = _loc10_;
            _loc16_.x = _loc6_;
            _loc16_.y = _loc2_;
            _loc16_.z = Number(_loc3_);
            this._users.push(_loc16_);
            if (_loc14_ == 1) {
                _loc16_.webID = _loc17_;
                _loc16_.userType = 1;
                _loc16_.sex = this.resolveSex(param1.readString());
                _loc16_.groupID = "" + param1.readInteger();
                _loc16_.groupStatus = param1.readInteger();
                _loc16_.groupName = param1.readString();
                _loc15_ = param1.readString();
                if (_loc15_ != "") {
                    _loc13_ = this.convertSwimFigure(_loc15_, _loc13_, _loc16_.sex);
                }
                _loc16_.figure = _loc13_;
                _loc16_.achievementScore = param1.readInteger();
                _loc16_.isModerator = param1.readBoolean();
            } else if (_loc14_ == 2) {
                _loc16_.userType = 2;
                _loc16_.figure = _loc13_;
                _loc16_.webID = _loc17_;
                _loc16_.subType = param1.readInteger().toString();
                _loc16_.ownerId = param1.readInteger();
                _loc16_.ownerName = param1.readString();
                _loc16_.rarityLevel = param1.readInteger();
                _loc16_.hasSaddle = param1.readBoolean();
                _loc16_.isRiding = param1.readBoolean();
                _loc16_.canBreed = param1.readBoolean();
                _loc16_.canHarvest = param1.readBoolean();
                _loc16_.canRevive = param1.readBoolean();
                _loc16_.hasBreedingPermission = param1.readBoolean();
                _loc16_.petLevel = param1.readInteger();
                _loc16_.petPosture = param1.readString();
            } else if (_loc14_ == 3) {
                _loc16_.userType = 3;
                _loc16_.webID = _loc17_;
                if (_loc13_.indexOf("/") == -1) {
                    _loc16_.figure = _loc13_;
                } else {
                    _loc16_.figure = "hr-100-.hd-180-1.ch-876-66.lg-270-94.sh-300-64";
                }
                _loc16_.sex = "M";
            } else if (_loc14_ == 4) {
                _loc16_.userType = 4;
                _loc16_.webID = _loc17_;
                _loc16_.sex = this.resolveSex(param1.readString());
                _loc16_.figure = _loc13_;
                _loc16_.ownerId = param1.readInteger();
                _loc16_.ownerName = param1.readString();
                _loc4_ = param1.readInteger();
                if (_loc4_ > 0) {
                    _loc12_ = [];
                    _loc9_ = 0;
                    while (_loc9_ < _loc4_) {
                        _loc12_.push(param1.readShort());
                        _loc9_++;
                    }
                    _loc16_.botSkills = _loc12_;
                }
            }
            _loc7_++;
        }
        return true;
    }

    private resolveSex(param1: string): string {
        if (param1.substr(0, 1).toLowerCase() == "f") {
            return "F";
        }
        return "M";
    }

    private convertSwimFigure(param1: string, param2: string, param3: string): string {
        let _loc9_: number = 0;
        let _loc13_: string = null;
        let _loc17_: any[] = null;
        let _loc12_: string = null;
        let _loc6_: any[] = null;
        let _loc14_: string = null;
        let _loc7_: string = null;
        let _loc10_: number = 0;
        let _loc4_: any[] = param2.split(".");
        let _loc15_: number = 1;
        let _loc11_: number = 1;
        let _loc8_: number = 1;
        let _loc5_: number = 10000;
        _loc9_ = 0;
        while (_loc9_ < _loc4_.length) {
            _loc13_ = stringOrNull(_loc4_[_loc9_]);
            _loc17_ = _loc13_.split("-");
            if (_loc17_.length > 2) {
                _loc12_ = stringOrNull(_loc17_[0]);
                if (_loc12_ == "hd") {
                    _loc15_ = _loc17_[2] | 0;
                }
            }
            _loc9_++;
        }
        let _loc18_: any[] = ["238,238,238", "250,56,49", "253,146,160", "42,199,210", "53,51,44", "239,255,146", "198,255,152", "255,146,90", "157,89,126", "182,243,255", "109,255,51", "51,120,201", "255,182,49", "223,161,233", "249,251,50", "202,175,143", "197,198,197", "71,98,61", "138,131,97", "255,140,51", "84,198,39", "30,108,153", "152,79,136", "119,200,255", "255,192,142", "60,75,135", "124,44,71", "215,255,227", "143,63,28", "255,99,147", "31,155,121", "253,255,51"];
        let _loc19_: any[] = param1.split("=");
        if (_loc19_.length > 1) {
            _loc6_ = (asGuarded(_loc19_[1], isString)).split("/");
            _loc14_ = stringOrNull(_loc6_[0]);
            _loc7_ = stringOrNull(_loc6_[1]);
            if (param3 == "F") {
                _loc8_ = 10010;
            } else {
                _loc8_ = 10011;
            }
            _loc10_ = _loc18_.indexOf(_loc7_);
            _loc11_ = _loc5_ + _loc10_ + 1;
        }
        let _loc16_: string = ".bds-10001-" + _loc15_ + ".ss-" + _loc8_ + "-" + _loc11_;
        return param2 + _loc16_;
    }
}
