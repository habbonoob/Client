import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import type { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { LocalConnection } from '@habbo-pixi/runtime/net/LocalConnection';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { RC4Cipher } from '@/com/sulake/habbo/RC4Cipher';

const encryptedDomainData_binAsset = embedBytes("sitelock/encryptedDomainData.bin");
const encryptionKey_binAsset = embedBytes("sitelock/encryptionKey.bin");

export class SiteLockValidator {
    static { registerClassName(this, 'SiteLockValidator'); }

    private encryptedDomainData = encryptedDomainData_binAsset;

    private encryptionKey = encryptionKey_binAsset;

    constructor() {
    }

    public validateDomain(param1: Sprite): boolean {
        let _loc4_: boolean = false;
        let _loc5_: boolean = false;
        let _loc12_: string = null;
        let _loc2_: any[] = [];
        let _loc3_: string = "";
        let _loc6_: string = param1.loaderInfo.loaderURL;
        let _loc7_: string = new LocalConnection().domain;
        let _loc8_: any[] = this._SafeStr_14012().split("|");
        let _loc9_: number = 0;
        while (_loc9_ < _loc8_.length) {
            _loc12_ = (asGuarded(_loc8_[_loc9_], isString)).toLocaleLowerCase();
            if (_loc12_ == "?") {
                _loc5_ = true;
            } else if (_loc12_.indexOf("localhost") != -1) {
                _loc4_ = true;
            } else if (_loc12_.indexOf("http:") == 0 || _loc12_.indexOf("https:") == 0) {
                _loc2_.push(_loc12_);
            } else {
                if (_loc3_ != "") {
                    _loc3_ += "|";
                }
                if (_loc12_.indexOf("*.") == 0) {
                    _loc12_ = _loc12_.replace("*.", "((\\w|-|_)+\\.)*");
                }
                _loc3_ += _loc12_;
            }
            _loc9_++;
        }
        let _loc10_: RegExp = new RegExp("^http(|s)://((www)+\\.)*(" + _loc3_ + ")", "i");
        if (_loc7_.toLowerCase() == "localhost") {
            if (_loc4_) {
                return true;
            }
            if (_loc5_) {
                // site lock: any host passes (tools/fixes/site_lock.py)
                return true;
            }
        }
        if (_loc10_.test(_loc6_)) {
            return true;
        }
        let _loc11_: number = 0;
        while (_loc11_ < _loc2_.length) {
            if (_loc6_.indexOf(stringOrNull(_loc2_[_loc11_])) == 0) {
                return true;
            }
            _loc11_++;
        }
        if (_loc3_.length == 0 && _loc2_.length == 0 && _loc5_) {
            return true;
        }
        // site lock: any host passes (tools/fixes/site_lock.py)
        return true;
    }

    private _SafeStr_14012(): string {
        let _loc1_: ByteArray = asInstanceOf(new this.encryptedDomainData(), ByteArray);
        let _loc2_: RC4Cipher = new RC4Cipher(asInstanceOf(new this.encryptionKey(), ByteArray));
        _loc2_._SafeStr_14012(_loc1_);
        _loc1_.position = 0;
        return _loc1_.readUTFBytes(_loc1_.length);
    }
}
