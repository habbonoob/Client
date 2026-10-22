import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { URLStream } from '@habbo-pixi/runtime/net/URLStream';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import type { IDataInput } from '@habbo-pixi/runtime/utils/IDataInput';
import type { IDataOutput } from '@habbo-pixi/runtime/utils/IDataOutput';
import { FZipErrorEvent } from '@/deng/fzip/FZipErrorEvent';
import { FZipEvent } from '@/deng/fzip/FZipEvent';
import { FZipFile } from '@/deng/fzip/FZipFile';

export class FZip extends EventDispatcher {
    static { registerClassName(this, 'deng.fzip::FZip'); }

    public static readonly SIG_CENTRAL_FILE_HEADER: number = 33639248;
    public static readonly SIG_SPANNING_MARKER: number = 808471376;
    public static readonly SIG_LOCAL_FILE_HEADER: number = 67324752;
    public static readonly SIG_DIGITAL_SIGNATURE: number = 84233040;
    public static readonly SIG_END_OF_CENTRAL_DIRECTORY: number = 101010256;
    public static readonly SIG_ZIP64_END_OF_CENTRAL_DIRECTORY: number = 101075792;
    public static readonly SIG_ZIP64_END_OF_CENTRAL_DIRECTORY_LOCATOR: number = 117853008;
    public static readonly SIG_DATA_DESCRIPTOR: number = 134695760;
    public static readonly SIG_ARCHIVE_EXTRA_DATA: number = 134630224;
    public static readonly SIG_SPANNING: number = 134695760;

    declare protected filesList: any[];

    declare protected filesDict: Map<any, any>;

    declare protected _SafeStr_2266: URLStream;

    declare protected _SafeStr_6189: string;

    declare protected _SafeStr_2230: (...args: any[]) => any;

    declare protected currentFile: FZipFile;

    declare protected _SafeStr_3083: ByteArray;

    declare protected _SafeStr_4369: number;
    static { (this.prototype as any)._SafeStr_4369 = 0; }

    declare protected _SafeStr_7311: number;
    static { (this.prototype as any)._SafeStr_7311 = 0; }

    constructor(param1: string = "utf-8") {
        super();
        this._SafeStr_6189 = param1;
        this._SafeStr_2230 = this.parseIdle;
    }

    public get active(): boolean {
        return this._SafeStr_2230 !== this.parseIdle;
    }

    public load(param1: URLRequest): void {
        if (!this._SafeStr_2266 && this._SafeStr_2230 == this.parseIdle) {
            this._SafeStr_2266 = new URLStream();
            this._SafeStr_2266.endian = "littleEndian";
            this.addEventHandlers();
            this.filesList = [];
            this.filesDict = new Dictionary();
            this._SafeStr_2230 = this.parseSignature;
            this._SafeStr_2266.load(param1);
        }
    }

    public loadBytes(param1: ByteArray): void {
        if (!this._SafeStr_2266 && this._SafeStr_2230 == this.parseIdle) {
            this.filesList = [];
            this.filesDict = new Dictionary();
            param1.position = 0;
            param1.endian = "littleEndian";
            this._SafeStr_2230 = this.parseSignature;
            if (this.parse(param1)) {
                this._SafeStr_2230 = this.parseIdle;
                this.dispatchEvent(new Event("complete"));
            } else {
                this.dispatchEvent(new FZipErrorEvent("parseError", "EOF"));
            }
        }
    }

    public close(): void {
        if (this._SafeStr_2266) {
            this._SafeStr_2230 = this.parseIdle;
            this.removeEventHandlers();
            this._SafeStr_2266.close();
            this._SafeStr_2266 = null;
        }
    }

    public serialize(param1: IDataOutput, param2: boolean = false): void {
        let _loc7_: string = null;
        let _loc8_: ByteArray = null;
        let _loc4_: any = 0;
        let _loc5_: any = 0;
        let _loc6_: number = 0;
        let _loc3_: FZipFile = null;
        if (param1 != null && this.filesList.length > 0) {
            _loc7_ = stringOrNull(param1.endian);
            _loc8_ = new ByteArray();
            param1.endian = _loc8_.endian = "littleEndian";
            _loc4_ = 0;
            _loc5_ = 0;
            _loc6_ = 0;
            while (_loc6_ < this.filesList.length) {
                _loc3_ = asInstanceOf(this.filesList[_loc6_], FZipFile);
                if (_loc3_ != null) {
                    _loc3_.serialize(_loc8_, param2, true, _loc4_ >>> 0);
                    _loc4_ += _loc3_.serialize(param1, param2);
                    _loc5_++;
                }
                _loc6_++;
            }
            if (_loc8_.length > 0) {
                param1.writeBytes(_loc8_);
            }
            param1.writeUnsignedInt(101010256);
            param1.writeShort(0);
            param1.writeShort(0);
            param1.writeShort(_loc5_);
            param1.writeShort(_loc5_);
            param1.writeUnsignedInt(_loc8_.length);
            param1.writeUnsignedInt(_loc4_);
            param1.writeShort(0);
            param1.endian = _loc7_;
        }
    }

    public getFileCount(): number {
        return (this.filesList ? this.filesList.length : 0) >>> 0;
    }

    public getFileAt(param1: number): FZipFile {
        return this.filesList ? asInstanceOf(this.filesList[param1], FZipFile) : null;
    }

    public getFileByName(param1: string): FZipFile {
        return this.filesDict.get(param1) ? asInstanceOf(this.filesDict.get(param1), FZipFile) : null;
    }

    public addFile(param1: string, param2: ByteArray = null, param3: boolean = true): FZipFile {
        return this.addFileAt((this.filesList ? this.filesList.length : 0) >>> 0, param1, param2, param3);
    }

    public addFileFromString(param1: string, param2: string, param3: string = "utf-8", param4: boolean = true): FZipFile {
        return this.addFileFromStringAt((this.filesList ? this.filesList.length : 0) >>> 0, param1, param2, param3, param4);
    }

    public addFileAt(param1: number, param2: string, param3: ByteArray = null, param4: boolean = true): FZipFile {
        if (this.filesList == null) {
            this.filesList = [];
        }
        if (this.filesDict == null) {
            this.filesDict = new Dictionary();
        } else if (this.filesDict.get(param2)) {
            throw new Error("File already exists: " + param2 + ". Please remove first.");
        }
        let _loc5_: FZipFile = new FZipFile();
        _loc5_.filename = param2;
        _loc5_.setContent(param3, param4);
        if (param1 >= this.filesList.length) {
            this.filesList.push(_loc5_);
        } else {
            this.filesList.splice(param1, 0, _loc5_);
        }
        this.filesDict.set(param2, _loc5_);
        return _loc5_;
    }

    public addFileFromStringAt(param1: number, param2: string, param3: string, param4: string = "utf-8", param5: boolean = true): FZipFile {
        if (this.filesList == null) {
            this.filesList = [];
        }
        if (this.filesDict == null) {
            this.filesDict = new Dictionary();
        } else if (this.filesDict.get(param2)) {
            throw new Error("File already exists: " + param2 + ". Please remove first.");
        }
        let _loc6_: FZipFile = new FZipFile();
        _loc6_.filename = param2;
        _loc6_.setContentAsString(param3, param4, param5);
        if (param1 >= this.filesList.length) {
            this.filesList.push(_loc6_);
        } else {
            this.filesList.splice(param1, 0, _loc6_);
        }
        this.filesDict.set(param2, _loc6_);
        return _loc6_;
    }

    public removeFileAt(param1: number): FZipFile {
        let _loc2_: FZipFile = null;
        if (this.filesList != null && this.filesDict != null && param1 < this.filesList.length) {
            _loc2_ = asInstanceOf(this.filesList[param1], FZipFile);
            if (_loc2_ != null) {
                this.filesList.splice(param1, 1);
                this.filesDict.delete(_loc2_.filename);
                return _loc2_;
            }
        }
        return null;
    }

    protected parse(param1: IDataInput): boolean {
        while (this._SafeStr_2230(param1)) {
        }
        return this._SafeStr_2230 === this.parseIdle;
    }

    protected parseIdle = (param1: IDataInput): boolean => {
        return false;
    };

    protected parseSignature = (param1: IDataInput): boolean => {
        let _loc2_: any = 0;
        if (param1.bytesAvailable >= 4) {
            _loc2_ = param1.readUnsignedInt() >>> 0;
            switch (_loc2_) {
                case 67324752:
                    this._SafeStr_2230 = this.parseLocalfile;
                    this.currentFile = new FZipFile(this._SafeStr_6189);
                    break;
                case 33639248:
                case 101010256:
                case 808471376:
                case 84233040:
                case 101075792:
                case 117853008:
                case 134695760:
                case 134630224:
                case 134695760:
                    this._SafeStr_2230 = this.parseIdle;
                    break;
                default:
                    throw new Error("Unknown record signature: 0x" + _loc2_.toString(16));
            }
            return true;
        }
        return false;
    };

    protected parseLocalfile = (param1: IDataInput): boolean => {
        if (this.currentFile.parse(param1)) {
            if (this.currentFile.hasDataDescriptor) {
                this._SafeStr_2230 = this.findDataDescriptor;
                this._SafeStr_3083 = new ByteArray();
                this._SafeStr_4369 = 0;
                this._SafeStr_7311 = 0;
                return true;
            }
            this.onFileLoaded();
            if (this._SafeStr_2230 != this.parseIdle) {
                this._SafeStr_2230 = this.parseSignature;
                return true;
            }
        }
        return false;
    };

    protected findDataDescriptor = (param1: IDataInput): boolean => {
        let _loc2_: any = 0;
        while (param1.bytesAvailable > 0) {
            _loc2_ = param1.readUnsignedByte() >>> 0;
            this._SafeStr_4369 = (this._SafeStr_4369 >>> 8 | _loc2_ << 24) >>> 0;
            if (this._SafeStr_4369 == 134695760) {
                this._SafeStr_3083.length -= 3;
                this._SafeStr_2230 = this.validateDataDescriptor;
                return true;
            }
            this._SafeStr_3083.writeByte(_loc2_ | 0);
        }
        return false;
    };

    protected validateDataDescriptor = (param1: IDataInput): boolean => {
        let _loc4_: any = 0;
        let _loc2_: any = 0;
        let _loc3_: any = 0;
        if (param1.bytesAvailable >= 12) {
            _loc4_ = param1.readUnsignedInt() >>> 0;
            _loc2_ = param1.readUnsignedInt() >>> 0;
            _loc3_ = param1.readUnsignedInt() >>> 0;
            if (this._SafeStr_3083.length == _loc2_) {
                this._SafeStr_3083.position = 0;
                this.currentFile._crc32 = _loc4_ >>> 0;
                this.currentFile._sizeCompressed = _loc2_ >>> 0;
                this.currentFile._sizeUncompressed = _loc3_ >>> 0;
                this.currentFile.parseContent(this._SafeStr_3083);
                this.onFileLoaded();
                this._SafeStr_2230 = this.parseSignature;
            } else {
                this._SafeStr_3083.writeUnsignedInt(_loc4_ >>> 0);
                this._SafeStr_3083.writeUnsignedInt(_loc2_ >>> 0);
                this._SafeStr_3083.writeUnsignedInt(_loc3_ >>> 0);
                this._SafeStr_2230 = this.findDataDescriptor;
            }
            return true;
        }
        return false;
    };

    protected onFileLoaded(): void {
        this.filesList.push(this.currentFile);
        if (this.currentFile.filename) {
            this.filesDict.set(this.currentFile.filename, this.currentFile);
        }
        this.dispatchEvent(new FZipEvent("fileLoaded", this.currentFile));
        this.currentFile = null;
    }

    protected progressHandler = (param1: Event): void => {
        let _loc2_: string = null;
        this.dispatchEvent(param1.clone());
        try {
            if (this.parse(this._SafeStr_2266)) {
                this.close();
                this.dispatchEvent(new Event("complete"));
            }
        } catch (e) {
            this.close();
            if (this.hasEventListener("parseError")) {
                this.dispatchEvent(new FZipErrorEvent("parseError", stringOrNull(e.message)));
            } else {
                _loc2_ = "";
                if (this._SafeStr_2266 != null) {
                    _loc2_ = this._SafeStr_2266.toString();
                }
            }
        }
    };

    protected defaultHandler = (param1: Event): void => {
        this.dispatchEvent(param1.clone());
    };

    protected defaultErrorHandler = (param1: Event): void => {
        this.close();
        this.dispatchEvent(param1.clone());
    };

    protected addEventHandlers(): void {
        this._SafeStr_2266.addEventListener("complete", this.defaultHandler);
        this._SafeStr_2266.addEventListener("open", this.defaultHandler);
        this._SafeStr_2266.addEventListener("httpStatus", this.defaultHandler);
        this._SafeStr_2266.addEventListener("ioError", this.defaultErrorHandler);
        this._SafeStr_2266.addEventListener("securityError", this.defaultErrorHandler);
        this._SafeStr_2266.addEventListener("progress", this.progressHandler);
    }

    protected removeEventHandlers(): void {
        this._SafeStr_2266.removeEventListener("complete", this.defaultHandler);
        this._SafeStr_2266.removeEventListener("open", this.defaultHandler);
        this._SafeStr_2266.removeEventListener("httpStatus", this.defaultHandler);
        this._SafeStr_2266.removeEventListener("ioError", this.defaultErrorHandler);
        this._SafeStr_2266.removeEventListener("securityError", this.defaultErrorHandler);
        this._SafeStr_2266.removeEventListener("progress", this.progressHandler);
    }
}
