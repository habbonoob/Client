import { asGuarded, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { AreaHideMessageData } from '@/com/sulake/habbo/communication/messages/parser/room/engine/AreaHideMessageData';

export class FloorHeightMapMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::FloorHeightMapMessageParser'); }

    constructor() {
    }

    private _heightMap: any[] = [];
    private _height: number = 0;
    private _scale: number = 0;

    declare private _areaHideData: AreaHideMessageData[];

    declare private _cameraInitX: number;
    static { (this.prototype as any)._cameraInitX = 0; }

    declare private _cameraInitY: number;
    static { (this.prototype as any)._cameraInitY = 0; }

    declare private _cameraInitZ: number;
    static { (this.prototype as any)._cameraInitZ = NaN; }

    private _text: string = "";

    public get text(): string {
        return this._text;
    }

    private _width: number = 0;

    public get width(): number {
        return this._width;
    }

    private _fixedWallsHeight: number = -1;

    public get fixedWallsHeight(): number {
        return this._fixedWallsHeight;
    }

    public get height(): number {
        return this._height;
    }

    public get scale(): number {
        return this._scale;
    }

    public get areaHideData(): AreaHideMessageData[] {
        return this._areaHideData;
    }

    public get cameraInitX(): number {
        return this._cameraInitX;
    }

    public get cameraInitY(): number {
        return this._cameraInitY;
    }

    public get cameraInitZ(): number {
        return this._cameraInitZ;
    }

    public getTileHeight(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this.width || param2 < 0 || param2 >= this.height) {
            return -110;
        }
        let _loc3_: any[] = asGuarded(this._heightMap[param2], Array.isArray);
        return _loc3_[param1] | 0;
    }

    public flush(): boolean {
        this._heightMap = [];
        this._width = 0;
        this._height = 0;
        this._text = "";
        this._fixedWallsHeight = -1;
        this._areaHideData = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc8_: string = null;
        let _loc5_: number = 0;
        if (param1 == null) {
            return false;
        }
        let _loc9_: boolean = param1.readBoolean();
        this._fixedWallsHeight = param1.readInteger();
        this._text = param1.readString();
        let _loc6_: any[] = this._text.split("\r");
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc11_: number = 0;
        let _loc2_: any[] = null;
        let _loc12_: number = _loc6_.length | 0;
        if (_loc12_ > 0 && _loc6_[_loc12_ - 1] == "") {
            _loc12_ -= 1;
        }
        let _loc7_: number = 0;
        let _loc10_: string = null;
        _loc4_ = 0;
        while (_loc4_ < _loc12_) {
            _loc10_ = asGuarded(_loc6_[_loc4_], isString);
            if (_loc10_.length > _loc7_) {
                _loc7_ = _loc10_.length;
            }
            _loc4_++;
        }
        this._heightMap = [];
        _loc4_ = 0;
        while (_loc4_ < _loc12_) {
            _loc2_ = [];
            _loc3_ = 0;
            while (_loc3_ < _loc7_) {
                _loc2_.push(-110);
                _loc3_++;
            }
            this._heightMap.push(_loc2_);
            _loc4_++;
        }
        this._width = _loc7_;
        this._height = _loc12_;
        _loc4_ = 0;
        while (_loc4_ < _loc12_) {
            _loc2_ = asGuarded(this._heightMap[_loc4_], Array.isArray);
            _loc10_ = asGuarded(_loc6_[_loc4_], isString);
            if (_loc10_.length > 0) {
                _loc3_ = 0;
                while (_loc3_ < _loc10_.length) {
                    _loc8_ = _loc10_.charAt(_loc3_);
                    if (_loc8_ != "x" && _loc8_ != "X") {
                        _loc11_ = parseInt(_loc8_, 36) | 0;
                    } else {
                        _loc11_ = -110;
                    }
                    _loc2_[_loc3_] = _loc11_;
                    _loc3_++;
                }
            }
            _loc4_++;
        }
        this._scale = _loc9_ ? 32 : 64;
        this._areaHideData = [];
        let _loc13_: number = param1.readInteger();
        _loc5_ = 0;
        while (_loc5_ < _loc13_) {
            this._areaHideData.push(new AreaHideMessageData(param1));
            _loc5_++;
        }
        this._cameraInitX = param1.readInteger();
        this._cameraInitY = param1.readInteger();
        this._cameraInitZ = param1.readFloat();
        return true;
    }
}
