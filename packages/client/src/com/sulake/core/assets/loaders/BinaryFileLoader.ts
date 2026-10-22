import { asGuarded, asInstanceOf, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { AssetLoader } from '@/com/sulake/core/runtime/Component.group';
import { Resources } from '@/com/sulake/core/utils/Resources';

export class BinaryFileLoader extends AssetLoader implements IAssetLoader {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::BinaryFileLoader'); }

    constructor(param1: string, param2: URLRequest = null, param3: number = -1) {
        super();
        this._SafeStr_2991 = param2 != null ? param2.url : null;
        this._type = param1;
        this._loader = new URLLoader();
        this._loader.dataFormat = "binary";
        this._loader.addEventListener("complete", this.loadEventHandler);
        this._loader.addEventListener("unload", this.loadEventHandler);
        this._loader.addEventListener("httpStatus", this.loadEventHandler);
        this._loader.addEventListener("progress", this.loadEventHandler);
        this._loader.addEventListener("ioError", this.loadEventHandler);
        this._loader.addEventListener("securityError", this.securityErrorEventHandler);
        this._id = param3;
        if (param2 != null) {
            this.load(param2);
        }
    }

    declare protected _SafeStr_2991: string;

    declare protected _type: string;

    declare protected _data: any;

    declare protected _loader: URLLoader;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    public get url(): string {
        return this._SafeStr_2991;
    }

    public get content(): any {
        return this._data ? this._data : (this._loader ? this._loader.data : null);
    }

    public get bytes(): ByteArray {
        let _loc1_: ByteArray = null;
        if (this._loader) {
            if (this._loader.data instanceof ByteArray) {
                return this._loader.data;
            }
            if (typeof this._loader.data === "string") {
                _loc1_ = new ByteArray();
                _loc1_.writeUTFBytes(stringOrNull(this._loader.data));
                return _loc1_;
            }
        }
        return null;
    }

    public get mimeType(): string {
        return this._type;
    }

    public get bytesLoaded(): number {
        return (this._loader ? this._loader.bytesLoaded : 0) >>> 0;
    }

    public get bytesTotal(): number {
        return (this._loader ? this._loader.bytesTotal : 0) >>> 0;
    }

    public get id(): number {
        return this._id;
    }

    protected override retry(): boolean {
        if (!this._disposed) {
            if (++this._retries <= this._SafeStr_7201) {
                try {
                    this._loader.close();
                } catch (e) {
                }
                this._loader.load(new URLRequest(this._SafeStr_2991 + (this._SafeStr_2991.indexOf("?") == -1 ? "?" : "&") + "retry=" + this._retries));
                return true;
            }
        }
        return false;
    }

    public override dispose(): void {
        if (!this._disposed) {
            super.dispose();
            this._loader.removeEventListener("complete", this.loadEventHandler);
            this._loader.removeEventListener("unload", this.loadEventHandler);
            this._loader.removeEventListener("httpStatus", this.loadEventHandler);
            this._loader.removeEventListener("progress", this.loadEventHandler);
            this._loader.removeEventListener("ioError", this.loadEventHandler);
            this._loader.removeEventListener("securityError", this.securityErrorEventHandler);
            try {
                this._loader.close();
            } catch (e) {
            }
            this._loader = null;
            this._type = null;
            this._data = null;
            this._SafeStr_2991 = null;
        }
    }

    public load(param1: URLRequest): void {
        let _loc2_: Timer = null;
        this._SafeStr_2991 = param1.url;
        this._data = null;
        this._retries = 0;
        this._loader.dataFormat = "binary";
        this._data = asGuarded(Resources._SafeStr_2119(param1.url), isString);
        if (this._data) {
            _loc2_ = new Timer(10, 1);
            _loc2_.addEventListener("timer", this.timerEventHandler);
            _loc2_.start();
            return;
        }
        this._loader.load(param1);
    }

    private securityErrorEventHandler = (param1: SecurityErrorEvent): void => {
        if (!this._disposed) {
            this.loadEventHandler(param1);
        }
    };

    private timerEventHandler = (param1: TimerEvent): void => {
        let _loc2_: Timer = asInstanceOf(param1.target, Timer);
        if (_loc2_) {
            _loc2_.stop();
            _loc2_.removeEventListener("timer", this.timerEventHandler);
        }
        if (!this._disposed) {
            this.loadEventHandler(new Event("complete"));
        }
    };

    get [IAssetLoader](): true {
        return true;
    }
}
