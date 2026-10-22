import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';

export class GZIPFile {
    static { registerClassName(this, 'com.probertson.utils::GZIPFile'); }

    declare private _gzipFileName: string;

    declare private _SafeStr_5170: ByteArray;

    declare private _headerFileName: string;

    declare private _headerComment: string;

    declare private _fileModificationTime: Date;

    declare private _originalFileSize: number;
    static { (this.prototype as any)._originalFileSize = 0; }

    constructor(param1: ByteArray, param2: number, param3: Date, param4: string = "", param5: string = null, param6: string = null) {
        this._SafeStr_5170 = param1;
        this._originalFileSize = param2;
        this._fileModificationTime = param3;
        this._gzipFileName = param4;
        this._headerFileName = param5;
        this._headerComment = param6;
    }

    public get gzipFileName(): string {
        return this._gzipFileName;
    }

    public get headerFileName(): string {
        return this._headerFileName;
    }

    public get headerComment(): string {
        return this._headerComment;
    }

    public get fileModificationTime(): Date {
        return this._fileModificationTime;
    }

    public get originalFileSize(): number {
        return this._originalFileSize;
    }

    public getCompressedData(): ByteArray {
        let _loc1_: ByteArray = new ByteArray();
        this._SafeStr_5170.position = 0;
        this._SafeStr_5170.readBytes(_loc1_, 0, this._SafeStr_5170.length);
        return _loc1_;
    }
}
