import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import type { IDataInput } from '@habbo-pixi/runtime/utils/IDataInput';
import type { IDataOutput } from '@habbo-pixi/runtime/utils/IDataOutput';
import { ChecksumUtil } from '@/deng/utils/ChecksumUtil';

export class FZipFile {
    static { registerClassName(this, 'deng.fzip::FZipFile'); }

    static #staticsReady = false;

    public static readonly COMPRESSION_NONE: number = 0;
    public static readonly COMPRESSION_SHRUNK: number = 1;
    public static readonly COMPRESSION_REDUCED_1: number = 2;
    public static readonly COMPRESSION_REDUCED_2: number = 3;
    public static readonly COMPRESSION_REDUCED_3: number = 4;
    public static readonly COMPRESSION_REDUCED_4: number = 5;
    public static readonly COMPRESSION_IMPLODED: number = 6;
    public static readonly COMPRESSION_TOKENIZED: number = 7;
    public static readonly COMPRESSION_DEFLATED: number = 8;
    public static readonly COMPRESSION_DEFLATED_EXT: number = 9;
    public static readonly COMPRESSION_IMPLODED_PKWARE: number = 10;

    protected static get HAS_UNCOMPRESS(): boolean {
        FZipFile.#initStatics();
        return FZipFile.HAS_UNCOMPRESS;
    }
    protected static set HAS_UNCOMPRESS(value: boolean) {
        FZipFile.#initStatics();
        FZipFile.HAS_UNCOMPRESS = value;
    }

    protected static get _SafeStr_4548(): boolean {
        FZipFile.#initStatics();
        return FZipFile._SafeStr_4548;
    }
    protected static set _SafeStr_4548(value: boolean) {
        FZipFile.#initStatics();
        FZipFile._SafeStr_4548 = value;
    }

    protected _SafeStr_5283: number = 0;
    protected _versionNumber: string = "2.0";
    protected _SafeStr_3799: number = 8;
    protected _SafeStr_5648: boolean = false;
    protected _SafeStr_7313: number = -1;
    protected _implodeShannonFanoTrees: number = -1;
    protected _SafeStr_6335: number = -1;
    protected _hasDataDescriptor: boolean = false;
    protected _SafeStr_7234: boolean = false;

    declare protected _date: Date;

    declare protected _adler32: number;
    static { (this.prototype as any)._adler32 = 0; }

    protected _hasAdler32: boolean = false;
    protected _sizeFilename: number = 0;
    protected _SafeStr_5504: number = 0;
    protected _filename: string = "";

    declare protected _SafeStr_2907: string;

    declare protected _SafeStr_4990: Map<any, any>;

    protected _SafeStr_7149: string = "";

    declare protected _content: ByteArray;

    declare public _crc32: number;
    static { (this.prototype as any)._crc32 = 0; }

    public _sizeCompressed: number = 0;
    public _sizeUncompressed: number = 0;
    protected isCompressed: boolean = false;

    declare protected _SafeStr_2230: (...args: any[]) => any;

    constructor(param1: string = "utf-8") {
        this._SafeStr_2230 = this.parseFileHead;
        this._SafeStr_2907 = param1;
        this._SafeStr_4990 = new Dictionary();
        this._content = new ByteArray();
        this._content.endian = "bigEndian";
    }

    public get date(): Date {
        return this._date;
    }

    public set date(param1: Date) {
        this._date = param1 != null ? param1 : new Date();
    }

    public get filename(): string {
        return this._filename;
    }

    public set filename(param1: string) {
        this._filename = param1;
    }

    public get hasDataDescriptor(): boolean {
        return this._hasDataDescriptor;
    }

    public get content(): ByteArray {
        if (this.isCompressed) {
            this.uncompress();
        }
        return this._content;
    }

    public set content(param1: ByteArray) {
        this.setContent(param1);
    }

    public setContent(param1: ByteArray, param2: boolean = true): void {
        if (param1 != null && param1.length > 0) {
            param1.position = 0;
            param1.readBytes(this._content, 0, param1.length);
            this._crc32 = ChecksumUtil.CRC32(this._content);
            this._hasAdler32 = false;
        } else {
            this._content.length = 0;
            this._content.position = 0;
            this.isCompressed = false;
        }
        if (param2) {
            this.compress();
        } else {
            this._sizeUncompressed = this._sizeCompressed = this._content.length;
        }
    }

    public get versionNumber(): string {
        return this._versionNumber;
    }

    public get sizeCompressed(): number {
        return this._sizeCompressed;
    }

    public get sizeUncompressed(): number {
        return this._sizeUncompressed;
    }

    public getContentAsString(param1: boolean = true, param2: string = "utf-8"): string {
        let _loc3_: string = null;
        if (this.isCompressed) {
            this.uncompress();
        }
        this._content.position = 0;
        if (param2 == "utf-8") {
            _loc3_ = this._content.readUTFBytes(this._content.bytesAvailable);
        } else {
            _loc3_ = this._content.readMultiByte(this._content.bytesAvailable, param2);
        }
        this._content.position = 0;
        if (param1) {
            this.compress();
        }
        return _loc3_;
    }

    public setContentAsString(param1: string, param2: string = "utf-8", param3: boolean = true): void {
        this._content.length = 0;
        this._content.position = 0;
        this.isCompressed = false;
        if (param1 != null && param1.length > 0) {
            if (param2 == "utf-8") {
                this._content.writeUTFBytes(param1);
            } else {
                this._content.writeMultiByte(param1, param2);
            }
            this._crc32 = ChecksumUtil.CRC32(this._content);
            this._hasAdler32 = false;
        }
        if (param3) {
            this.compress();
        } else {
            this._sizeUncompressed = this._sizeCompressed = this._content.length;
        }
    }

    public serialize(param1: IDataOutput, param2: boolean, param3: boolean = false, param4: number = 0): number {
        let _loc7_: ByteArray = null;
        let _loc14_: boolean = false;
        if (param1 == null) {
            return 0;
        }
        if (param3) {
            param1.writeUnsignedInt(33639248);
            param1.writeShort(this._SafeStr_5283 << 8 | 0x14);
        } else {
            param1.writeUnsignedInt(67324752);
        }
        param1.writeShort(this._SafeStr_5283 << 8 | 0x14);
        param1.writeShort(this._SafeStr_2907 == "utf-8" ? 2048 : 0);
        param1.writeShort(this.isCompressed ? 8 : 0);
        let _loc6_: Date = this._date != null ? this._date : new Date();
        let _loc11_: number = (_loc6_.getSeconds() >>> 0 | _loc6_.getMinutes() >>> 0 << 5 | _loc6_.getHours() >>> 0 << 11) >>> 0;
        let _loc8_: number = (_loc6_.getDate() >>> 0 | _loc6_.getMonth() + 1 >>> 0 << 5 | _loc6_.getFullYear() - 1980 >>> 0 << 9) >>> 0;
        param1.writeShort(_loc11_);
        param1.writeShort(_loc8_);
        param1.writeUnsignedInt(this._crc32);
        param1.writeUnsignedInt(this._sizeCompressed);
        param1.writeUnsignedInt(this._sizeUncompressed);
        let _loc16_: ByteArray = new ByteArray();
        _loc16_.endian = "littleEndian";
        if (this._SafeStr_2907 == "utf-8") {
            _loc16_.writeUTFBytes(this._filename);
        } else {
            _loc16_.writeMultiByte(this._filename, this._SafeStr_2907);
        }
        let _loc9_: number = _loc16_.position;
        for (const _loc10_ of this._SafeStr_4990?.keys() ?? []) {
            _loc7_ = asInstanceOf(this._SafeStr_4990.get(_loc10_), ByteArray);
            if (_loc7_ != null) {
                _loc16_.writeShort(_loc10_ >>> 0 | 0);
                _loc16_.writeShort(_loc7_.length | 0);
                _loc16_.writeBytes(_loc7_);
            }
        }
        if (param2) {
            if (!this._hasAdler32) {
                _loc14_ = this.isCompressed;
                if (_loc14_) {
                    this.uncompress();
                }
                this._adler32 = ChecksumUtil.Adler32(this._content, 0, this._content.length);
                this._hasAdler32 = true;
                if (_loc14_) {
                    this.compress();
                }
            }
            _loc16_.writeShort(56026);
            _loc16_.writeShort(4);
            _loc16_.writeUnsignedInt(this._adler32);
        }
        let _loc15_: number = _loc16_.position - _loc9_ >>> 0;
        if (param3 && this._SafeStr_7149.length > 0) {
            if (this._SafeStr_2907 == "utf-8") {
                _loc16_.writeUTFBytes(this._SafeStr_7149);
            } else {
                _loc16_.writeMultiByte(this._SafeStr_7149, this._SafeStr_2907);
            }
        }
        let _loc5_: number = _loc16_.position - _loc9_ - _loc15_ >>> 0;
        param1.writeShort(_loc9_);
        param1.writeShort(_loc15_);
        if (param3) {
            param1.writeShort(_loc5_);
            param1.writeShort(0);
            param1.writeShort(0);
            param1.writeUnsignedInt(0);
            param1.writeUnsignedInt(param4);
        }
        if (_loc9_ + _loc15_ + _loc5_ > 0) {
            param1.writeBytes(_loc16_);
        }
        let _loc13_: number = 0;
        if (!param3 && this._content.length > 0) {
            if (this.isCompressed) {
                if (FZipFile.HAS_UNCOMPRESS || FZipFile._SafeStr_4548) {
                    _loc13_ = this._content.length;
                    param1.writeBytes(this._content, 0, _loc13_);
                } else {
                    _loc13_ = this._content.length - 6 >>> 0;
                    param1.writeBytes(this._content, 2, _loc13_);
                }
            } else {
                _loc13_ = this._content.length;
                param1.writeBytes(this._content, 0, _loc13_);
            }
        }
        let _loc12_: number = 30 + _loc9_ + _loc15_ + _loc5_ + _loc13_ >>> 0;
        if (param3) {
            _loc12_ += 16;
        }
        return _loc12_;
    }

    public parse(param1: IDataInput): boolean {
        while (param1.bytesAvailable && this._SafeStr_2230(param1)) {
        }
        return this._SafeStr_2230 === this.parseFileIdle;
    }

    protected parseFileIdle = (param1: IDataInput): boolean => {
        return false;
    };

    protected parseFileHead = (param1: IDataInput): boolean => {
        if (param1.bytesAvailable >= 30) {
            this.parseHead(param1);
            if (this._sizeFilename + this._SafeStr_5504 > 0) {
                this._SafeStr_2230 = this.parseFileHeadExt;
            } else {
                this._SafeStr_2230 = this.parseFileContent;
            }
            return true;
        }
        return false;
    };

    protected parseFileHeadExt = (param1: IDataInput): boolean => {
        if (param1.bytesAvailable >= this._sizeFilename + this._SafeStr_5504) {
            this.parseHeadExt(param1);
            this._SafeStr_2230 = this.parseFileContent;
            return true;
        }
        return false;
    };

    protected parseFileContent = (param1: IDataInput): boolean => {
        let _loc2_: boolean = true;
        if (this._hasDataDescriptor) {
            this._SafeStr_2230 = this.parseFileIdle;
            _loc2_ = false;
        } else if (this._sizeCompressed == 0) {
            this._SafeStr_2230 = this.parseFileIdle;
        } else if (param1.bytesAvailable >= this._sizeCompressed) {
            this.parseContent(param1);
            this._SafeStr_2230 = this.parseFileIdle;
        } else {
            _loc2_ = false;
        }
        return _loc2_;
    };

    protected parseHead(param1: IDataInput): void {
        let _loc9_: number = param1.readUnsignedShort() >>> 0;
        this._SafeStr_5283 = _loc9_ >> 8;
        this._versionNumber = Math.floor((_loc9_ & 0xFF) / 10) + "." + (_loc9_ & 0xFF) % 10;
        let _loc4_: number = param1.readUnsignedShort() >>> 0;
        this._SafeStr_3799 = param1.readUnsignedShort() | 0;
        this._SafeStr_5648 = (_loc4_ & 1) !== 0;
        this._hasDataDescriptor = (_loc4_ & 8) !== 0;
        this._SafeStr_7234 = (_loc4_ & 0x20) !== 0;
        if ((_loc4_ & 0x0320) !== 0) {
            this._SafeStr_2907 = "utf-8";
        }
        if (this._SafeStr_3799 === 6) {
            this._SafeStr_7313 = (_loc4_ & 2) !== 0 ? 8192 : 4096;
            this._implodeShannonFanoTrees = (_loc4_ & 4) !== 0 ? 3 : 2;
        } else if (this._SafeStr_3799 === 8) {
            this._SafeStr_6335 = (_loc4_ & 6) >> 1;
        }
        let _loc2_: number = param1.readUnsignedShort() >>> 0;
        let _loc10_: number = param1.readUnsignedShort() >>> 0;
        let _loc3_: any = _loc2_ & 0x1F;
        let _loc5_: any = (_loc2_ & 0x07E0) >> 5;
        let _loc6_: any = (_loc2_ & 0xF800) >> 11;
        let _loc11_: any = _loc10_ & 0x1F;
        let _loc7_: any = (_loc10_ & 0x01E0) >> 5;
        let _loc8_: number = ((_loc10_ & 0xFE00) >> 9) + 1980;
        this._date = new Date(_loc8_, _loc7_ - 1, _loc11_, _loc6_, _loc5_, _loc3_, 0);
        this._crc32 = param1.readUnsignedInt() >>> 0;
        this._sizeCompressed = param1.readUnsignedInt() >>> 0;
        this._sizeUncompressed = param1.readUnsignedInt() >>> 0;
        this._sizeFilename = param1.readUnsignedShort() >>> 0;
        this._SafeStr_5504 = param1.readUnsignedShort() >>> 0;
    }

    protected parseHeadExt(param1: IDataInput): void {
        let _loc5_: any = 0;
        let _loc4_: any = 0;
        let _loc2_: ByteArray = null;
        if (this._SafeStr_2907 == "utf-8") {
            this._filename = stringOrNull(param1.readUTFBytes(this._sizeFilename));
        } else {
            this._filename = stringOrNull(param1.readMultiByte(this._sizeFilename, this._SafeStr_2907));
        }
        let _loc3_: number = this._SafeStr_5504;
        while (_loc3_ > 4) {
            _loc5_ = param1.readUnsignedShort() >>> 0;
            _loc4_ = param1.readUnsignedShort() >>> 0;
            if (_loc4_ > _loc3_) {
                throw new Error("Parse error in file " + this._filename + ": Extra field data size too big.");
            }
            if (_loc5_ === 56026 && _loc4_ === 4) {
                this._adler32 = param1.readUnsignedInt() >>> 0;
                this._hasAdler32 = true;
            } else if (_loc4_ > 0) {
                _loc2_ = new ByteArray();
                param1.readBytes(_loc2_, 0, _loc4_);
                this._SafeStr_4990.set(_loc5_, _loc2_);
            }
            _loc3_ = _loc3_ - (_loc4_ + 4) >>> 0;
        }
        if (_loc3_ > 0) {
            param1.readBytes(new ByteArray(), 0, _loc3_);
        }
    }

    public parseContent(param1: IDataInput): void {
        let _loc2_: any = 0;
        if (this._SafeStr_3799 === 8 && !this._SafeStr_5648) {
            if (FZipFile.HAS_UNCOMPRESS || FZipFile._SafeStr_4548) {
                param1.readBytes(this._content, 0, this._sizeCompressed);
            } else {
                if (!this._hasAdler32) {
                    throw new Error("Adler32 checksum not found.");
                }
                this._content.writeByte(120);
                _loc2_ = (~this._SafeStr_6335 << 6 & 0xC0) >>> 0;
                _loc2_ += 31 - (0x7800 | _loc2_) % 31;
                this._content.writeByte(_loc2_ | 0);
                param1.readBytes(this._content, 2, this._sizeCompressed);
                this._content.position = this._content.length;
                this._content.writeUnsignedInt(this._adler32);
            }
            this.isCompressed = true;
        } else {
            if (this._SafeStr_3799 != 0) {
                throw new Error("Compression method " + this._SafeStr_3799 + " is not supported.");
            }
            param1.readBytes(this._content, 0, this._sizeCompressed);
            this.isCompressed = false;
        }
        this._content.position = 0;
    }

    protected compress(): void {
        if (!this.isCompressed) {
            if (this._content.length > 0) {
                this._content.position = 0;
                this._sizeUncompressed = this._content.length;
                if (FZipFile._SafeStr_4548) {
                    this._content.deflate();
                    this._sizeCompressed = this._content.length;
                } else if (FZipFile.HAS_UNCOMPRESS) {
                    Reflect.apply(this._content.compress, this._content, ["deflate"]);
                    this._sizeCompressed = this._content.length;
                } else {
                    this._content.compress();
                    this._sizeCompressed = this._content.length - 6 >>> 0;
                }
                this._content.position = 0;
                this.isCompressed = true;
            } else {
                this._sizeCompressed = 0;
                this._sizeUncompressed = 0;
            }
        }
    }

    protected uncompress(): void {
        if (this.isCompressed && this._content.length > 0) {
            this._content.position = 0;
            if (FZipFile._SafeStr_4548) {
                this._content.inflate();
            } else if (FZipFile.HAS_UNCOMPRESS) {
                Reflect.apply(this._content.uncompress, this._content, ["deflate"]);
            } else {
                this._content.uncompress();
            }
            this._content.position = 0;
            this.isCompressed = false;
        }
    }

    public toString(): string {
        return "[FZipFile]\n  name:" + this._filename + "\n  date:" + this._date + "\n  sizeCompressed:" + this._sizeCompressed + "\n  sizeUncompressed:" + this._sizeUncompressed + "\n  versionHost:" + this._SafeStr_5283 + "\n  versionNumber:" + this._versionNumber + "\n  compressionMethod:" + this._SafeStr_3799 + "\n  encrypted:" + this._SafeStr_5648 + "\n  hasDataDescriptor:" + this._hasDataDescriptor + "\n  hasCompressedPatchedData:" + this._SafeStr_7234 + "\n  filenameEncoding:" + this._SafeStr_2907 + "\n  crc32:" + this._crc32.toString(16) + "\n  adler32:" + this._adler32.toString(16);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FZipFile.#staticsReady) return;
        FZipFile.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FZipFile, name, { value, writable: true, configurable: true, enumerable: true });
        set("HAS_UNCOMPRESS", false);
        set("_SafeStr_4548", false);
        // feature tests on ByteArray: its uncompress() takes the algorithm as a parameter, and inflate() exists
        set("HAS_UNCOMPRESS", typeof ByteArray.prototype.uncompress === "function");
        set("_SafeStr_4548", typeof ByteArray.prototype.inflate === "function");
    }
}
