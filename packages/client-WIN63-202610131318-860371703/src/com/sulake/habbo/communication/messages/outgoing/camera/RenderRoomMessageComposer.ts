import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { CryptoTools } from '@/com/sulake/core/communication/encryption/CryptoTools';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { JsonMaskDrawingData } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonMaskDrawingData';
import { JsonPlaneDrawingData } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonPlaneDrawingData';
import { JsonPoint } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonPoint';
import { JsonTextureColumnData } from '@/com/sulake/habbo/communication/messages/outgoing/camera/json/JsonTextureColumnData';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';

export class RenderRoomMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.camera::RenderRoomMessageComposer'); }

    declare private _SafeStr_7406: any[];

    declare private _SafeStr_7361: string;

    declare private _SafeStr_7395: string;

    private _SafeStr_7404: string = "[]";

    declare private roomId: number;
    static { (this.prototype as any).roomId = 0; }

    private zoomLevel: number = 1;

    declare private topSecurityLevel: number;
    static { (this.prototype as any).topSecurityLevel = 0; }

    declare private time: number;
    static { (this.prototype as any).time = NaN; }

    protected _data: any[] = [];

    constructor(param1: any[], param2: string, param3: string, param4: number, param5: number) {
        this._SafeStr_7406 = this.getRoomPlanesDataArray(param1);
        this._SafeStr_7361 = param2;
        this._SafeStr_7395 = param3;
        this.roomId = param4;
        this.topSecurityLevel = param5;
        this.time = new Date().getTime();
    }

    private static planesString(): string {
        return StringUtil.makeMagicString(142, 178, 155, 183, 194, 196, 168, 157, 195, 152, 143, 163, 197, 154, 200, 148, 158, 148, 200);
    }

    private static spritesString(): string {
        return StringUtil.makeMagicString(113, 119, 172, 167, 152, 139, 154, 118, 141, 140, 125, 169, 152, 119, 168, 165, 129, 146);
    }

    private static modifiersString(): string {
        return StringUtil.makeMagicString(129, 188, 141, 133, 186, 137, 164, 132, 160, 132, 185, 134, 168, 183, 162, 149, 181, 135);
    }

    private static filtersString(): string {
        return StringUtil.makeMagicString(131, 190, 163, 186, 162, 159, 146, 177, 172, 172, 132, 136, 170, 186, 164, 151, 164);
    }

    private static roomIdString(): string {
        return StringUtil.makeMagicString(122, 181, 177, 127, 144, 130, 147, 129, 125, 157, 126, 145, 142, 145, 170);
    }

    private static zoomString(): string {
        return StringUtil.makeMagicString(126, 132, 128, 180, 166, 134, 158, 167, 151, 148, 133, 132, 181, 159, 146, 158, 159);
    }

    private static statusString(): string {
        return StringUtil.makeMagicString(118, 124, 120, 172, 157, 164, 171, 145, 167, 143, 139, 173, 154, 159, 141, 134, 170);
    }

    private static timestampString(): string {
        return StringUtil.makeMagicString(137, 178, 196, 192, 164, 143, 165, 144, 193, 158, 164, 155, 143, 144, 163, 191, 160, 153, 149, 173, 169, 173, 195);
    }

    private static checksumString(): string {
        return StringUtil.makeMagicString(120, 179, 124, 161, 132, 139, 150, 176, 139, 145, 157, 141, 169, 127, 152, 175, 153, 140, 156, 143);
    }

    private static jsonEndString(): string {
        return StringUtil.makeMagicString(136, 148, 159, 145, 168);
    }

    private static deflate(param1: string): ByteArray {
        let _loc2_: ByteArray = new ByteArray();
        _loc2_.writeUTFBytes(param1);
        _loc2_.compress("zlib");
        return _loc2_;
    }

    public addEffectData(param1: string): void {
        this._SafeStr_7404 = param1;
    }

    public setZoom(param1: number): void {
        this.zoomLevel = param1;
    }

    public compressData(): void {
        let timeLastDigits: number = 0;
        let status: number = 0;
        let check: number = 0;
        let bytes: ByteArray;
        let checksum: number = 0;
        let deflatedMsg: ByteArray;
        let roomPlanesDataJsonObj: string = JSON.stringify(this._SafeStr_7406, (param1: any, param2: any): any => {
             if (param1 == "masks" && param2.length == 0) {
                 return undefined;
             }
             return param2;
         });
        let dataStrJsonObj: string = RenderRoomMessageComposer.planesString() + roomPlanesDataJsonObj + RenderRoomMessageComposer.spritesString() + this._SafeStr_7361 + RenderRoomMessageComposer.modifiersString() + this._SafeStr_7395 + RenderRoomMessageComposer.filtersString() + this._SafeStr_7404 + RenderRoomMessageComposer.roomIdString() + this.roomId;
        if (this.zoomLevel != 1) {
            dataStrJsonObj += RenderRoomMessageComposer.zoomString() + this.zoomLevel;
        }
        timeLastDigits = this.time % 100 | 0;
        this.time -= timeLastDigits;
        status = this.time / 100 % 23 + this.topSecurityLevel | 0;
        dataStrJsonObj += RenderRoomMessageComposer.statusString() + status;
        check = dataStrJsonObj.length;
        check = (check + this.time / 100 * 17) % 1493 | 0;
        bytes = CryptoTools.stringToByteArray(dataStrJsonObj);
        checksum = CryptoTools.fletcher100(bytes, check, this.roomId);
        dataStrJsonObj += RenderRoomMessageComposer.timestampString() + (this.time + checksum);
        dataStrJsonObj += RenderRoomMessageComposer.checksumString() + (timeLastDigits + 13) * (check + 29) + RenderRoomMessageComposer.jsonEndString();
        deflatedMsg = RenderRoomMessageComposer.deflate(dataStrJsonObj);
        this._data = [deflatedMsg];
    }

    protected getRoomPlanesDataArray(param1: any[]): any[] {
        let _loc5_: any;
        let _loc12_: any;
        let _loc11_: JsonPlaneDrawingData = null;
        let _loc6_: any = undefined;
        let _loc4_: any[] = null;
        let _loc10_: any[] = null;
        let _loc3_: any[] = null;
        let _loc8_: any[] = null;
        let _loc7_: number = 0;
        let _loc13_: any[] = null;
        let _loc2_: JsonTextureColumnData = null;
        let _loc9_: any[] = [];
        for (const _loc14_ of param1 ?? []) {
            _loc11_ = new JsonPlaneDrawingData();
            _loc11_.z = Number(_loc14_.z);
            _loc6_ = _loc14_.cornerPoints;
            _loc11_.addCornerPoint(_loc6_[0].x | 0, _loc6_[0].y | 0);
            _loc11_.addCornerPoint(_loc6_[1].x | 0, _loc6_[1].y | 0);
            _loc11_.addCornerPoint(_loc6_[2].x | 0, _loc6_[2].y | 0);
            _loc11_.addCornerPoint(_loc6_[3].x | 0, _loc6_[3].y | 0);
            _loc11_.color = _loc14_.color >>> 0;
            _loc4_ = _loc14_.maskAssetNames;
            _loc10_ = _loc14_.maskAssetLocations;
            _loc3_ = _loc14_.maskAssetFlipHs;
            _loc8_ = _loc14_.maskAssetFlipVs;
            _loc7_ = 0;
            while (_loc7_ < _loc4_.length) {
                _loc11_.addMask(new JsonMaskDrawingData(stringOrNull(_loc4_[_loc7_]), new JsonPoint(_loc10_[_loc7_].x | 0, _loc10_[_loc7_].y | 0), _loc3_[_loc7_], _loc8_[_loc7_]));
                _loc7_++;
            }
            _loc11_.setBottomAligned(_loc14_.isBottomAligned());
            _loc13_ = _loc14_.assetNameColumns;
            if (_loc13_.length != 0) {
                for (_loc5_ of _loc13_ ?? []) {
                    _loc2_ = new JsonTextureColumnData();
                    for (_loc12_ of valuesOf(_loc5_)) {
                        _loc2_.addAssetName(stringOrNull(_loc12_));
                    }
                    _loc11_.addTexCol(_loc2_);
                }
            }
            _loc9_.push(_loc11_);
        }
        return _loc9_;
    }

    public isSendable(): boolean {
        if (this._data.length == 0) {
            this.compressData();
        }
        return true;
    }

    public getMessageArray(): any[] {
        if (this._data.length == 0) {
            throw new Exception("Render room message sending attempt before packData() is called.");
        }
        return this._data;
    }

    public dispose(): void {
        this._data = [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
