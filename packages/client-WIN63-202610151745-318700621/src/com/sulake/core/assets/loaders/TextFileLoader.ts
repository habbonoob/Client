import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLoader } from '@/com/sulake/core/assets/loaders/IAssetLoader';
import { IllegalOperationError } from '@habbo-pixi/runtime/errors/IllegalOperationError';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { GZIPBytesEncoder } from '@/com/probertson/utils/GZIPBytesEncoder';
import { BinaryFileLoader } from '@/com/sulake/core/runtime/Component.group';

export class TextFileLoader extends BinaryFileLoader implements IAssetLoader {
    static { registerClassName(this, 'com.sulake.core.assets.loaders::TextFileLoader'); }

    constructor(param1: string, param2: URLRequest = null, param3: number = -1) {
        super(param1, param2, param3);
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

    protected override loadEventHandler(param1: Event): void {
        if (param1.type == "complete") {
            this.unCompress();
        }
        super.loadEventHandler(param1);
    }

    private unCompress(): void {
        let _loc2_: ByteArray = null;
        let _loc3_: GZIPBytesEncoder = null;
        let _loc1_: string = "";
        if (this._loader.data instanceof ByteArray) {
            _loc2_ = this._loader.data instanceof ByteArray ? this._loader.data : null;
            if (_loc2_.length == 0) {
                _loc1_ = "";
            } else {
                try {
                    _loc3_ = new GZIPBytesEncoder();
                    _loc1_ = _loc3_.uncompressToByteArray(_loc2_).toString();
                } catch ($e) {
                    if ($e instanceof IllegalOperationError) {
                        let error: IllegalOperationError = $e;
                        _loc2_.position = 0;
                        _loc1_ = _loc2_.readUTFBytes(_loc2_.length);
                    } else {
                        throw $e;
                    }
                }
            }
            _loc2_.position = 0;
        } else {
            _loc1_ = typeof this._loader.data === "string" ? this._loader.data : null;
        }
        this._loader.data = _loc1_;
    }
}
