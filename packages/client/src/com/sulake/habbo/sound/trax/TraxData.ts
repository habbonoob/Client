import { asGuarded, asInstanceOf, isInt, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { TraxChannel } from '@/com/sulake/habbo/sound/trax/TraxChannel';
import { TraxChannelItem } from '@/com/sulake/habbo/sound/trax/TraxChannelItem';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class TraxData {
    static { registerClassName(this, 'com.sulake.habbo.sound.trax::TraxData'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        TraxData.#initStatics();
        return TraxData._log;
    }

    constructor(param1: string) {
        let _loc8_: any = null;
        let _loc11_: any[] = null;
        let _loc9_: number = 0;
        let _loc15_: string = null;
        let _loc14_: string = null;
        let _loc6_: number = 0;
        let _loc16_: number = 0;
        let _loc2_: any[] = null;
        let _loc5_: TraxChannel = null;
        let _loc7_: number = 0;
        let _loc13_: any[] = null;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        this._SafeStr_4672 = new UtilsMap();
        this._channels = [];
        let _loc12_: any[] = param1.split(":");
        let _loc10_: string = String(_loc12_[_loc12_.length - 1]);
        if (_loc10_.indexOf("meta") != -1) {
            _loc11_ = _loc10_.split(";");
            _loc9_ = 0;
            while (_loc9_ < _loc11_.length) {
                _loc15_ = stringOrNull(String(_loc11_[_loc9_]).split(",")[0]);
                _loc14_ = stringOrNull(String(_loc11_[_loc9_]).split(",")[1]);
                this._SafeStr_4672.add(_loc15_, _loc14_);
                _loc9_++;
            }
            _loc8_ = _loc12_.slice(0, _loc12_.length - 1);
        } else {
            _loc8_ = _loc12_;
        }
        _loc6_ = 0;
        while (_loc6_ < _loc8_.length / 2) {
            if (_loc8_[_loc6_ * 2].toString().length > 0) {
                _loc16_ = _loc8_[_loc6_ * 2] | 0;
                _loc2_ = _loc8_[_loc6_ * 2 + 1].toString().split(";");
                _loc5_ = new TraxChannel(_loc16_);
                _loc7_ = 0;
                while (_loc7_ < _loc2_.length) {
                    _loc13_ = _loc2_[_loc7_].toString().split(",");
                    if (_loc13_.length != 2) {
                        TraxData._log.warn("Trax load error: invalid song data string");
                        return;
                    }
                    _loc4_ = _loc13_[0] | 0;
                    _loc3_ = _loc13_[1] | 0;
                    _loc5_.addChannelItem(new TraxChannelItem(_loc4_, _loc3_));
                    _loc7_++;
                }
                this._channels.push(_loc5_);
            }
            _loc6_++;
        }
    }

    declare private _SafeStr_4672: UtilsMap;

    declare private _channels: any[];

    public get channels(): any[] {
        return this._channels;
    }

    public get hasMetaData(): boolean {
        return this._SafeStr_4672["meta"] != null;
    }

    public get metaCutMode(): boolean {
        return this._SafeStr_4672["c"] == "1";
    }

    public get metaTempo(): number {
        return asGuarded(this._SafeStr_4672["t"], isInt);
    }

    public getSampleIds(): any[] {
        let _loc4_: number = 0;
        let _loc3_: TraxChannel = null;
        let _loc5_: number = 0;
        let _loc2_: TraxChannelItem = null;
        let _loc1_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < this._channels.length) {
            _loc3_ = asInstanceOf(this._channels[_loc4_], TraxChannel);
            _loc5_ = 0;
            while (_loc5_ < _loc3_.itemCount) {
                _loc2_ = _loc3_.getItem(_loc5_);
                if (_loc1_.indexOf(_loc2_.id) == -1) {
                    _loc1_.push(_loc2_.id);
                }
                _loc5_++;
            }
            _loc4_++;
        }
        return _loc1_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TraxData.#staticsReady) return;
        TraxData.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TraxData, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.sound.trax.TraxData"));
    }
}
