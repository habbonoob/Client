import { asGuarded, asInstanceOf, castTo, isClass, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { FrameLabel } from '@habbo-pixi/runtime/display/FrameLabel';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { MovieClip } from '@habbo-pixi/runtime/display/MovieClip';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { System } from '@habbo-pixi/runtime/system/System';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Core, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import { Resources } from '@/com/sulake/core/utils/Resources';
import { Logger } from '@/com/sulake/habbo/Logger';

export class LibraryLoader extends EventDispatcherWrapper implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils::LibraryLoader'); }

    private static readonly LOG_LOADING: any = false;
    protected static readonly STATE_EVENT_COMPLETE: number = 1;
    protected static readonly STATE_EVENT_INIT: number = 2;
    protected static readonly STATE_EVENT_FRAME: number = 4;
    protected static readonly STATE_ANALYZE: number = 3;
    protected static readonly STATE_READY: number = 7;
    public static readonly DEFAULT_MAX_RETRIES: number = 5;
    public static readonly LIBRARY_LOADER_FINALIZE: string = "LIBRARY_LOADER_FINALIZE";
    public static readonly USE_DOWNLOAD_THROTTLING: boolean = true;
    public static readonly MAX_SIMULTANEOUS_DOWNLOADS: number = 6;
    private static _SafeStr_4399: any[] = [];
    private static _SafeStr_4021: any[] = [];

    declare protected _loader: Loader;

    declare protected _context: LoaderContext;

    protected _status: number = 0;

    declare protected _request: URLRequest;

    declare protected _manifest: XML;

    declare protected _resource: any;

    protected _SafeStr_2597: number = 0;

    declare protected _name: string;

    protected _SafeStr_3794: boolean = false;
    protected _debug: boolean = false;
    protected _paused: boolean = false;
    protected _errorMsg: string = "";
    protected _debugMsg: string = "";

    declare protected _downloadStartTime: number;
    static { (this.prototype as any)._downloadStartTime = 0; }

    declare protected _downloadEndTime: number;
    static { (this.prototype as any)._downloadEndTime = 0; }

    declare protected _downloadRetriesLeft: number;
    static { (this.prototype as any)._downloadRetriesLeft = 0; }

    protected _SafeStr_7948: number = 0;

    constructor(param1: LoaderContext = null, param2: boolean = false, param3: boolean = false) {
        super();
        if (param1 == null) {
            this._context = new LoaderContext();
            this._context.applicationDomain = ApplicationDomain.currentDomain;
        } else {
            this._context = param1;
        }
        this._paused = param2;
        this._debug = param3;
        this._status = 0;
        this._loader = new Loader();
        this._loader.contentLoaderInfo.addEventListener("init", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("complete", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("progress", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("unload", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("httpStatus", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("ioError", this.loadEventHandler);
        this._loader.contentLoaderInfo.addEventListener("securityError", this.loadEventHandler);
    }

    protected static addRequestCounterToUrlRequest(param1: URLRequest, param2: number): void {
        let _loc3_: number = 0;
        let _loc6_: string = null;
        if (param1.url == null || param1.url == "") {
            return;
        }
        let _loc4_: any[] = param1.url.split("?");
        let _loc5_: string = stringOrNull(_loc4_[0]);
        let _loc9_: string = stringOrNull(_loc4_.length > 1 ? _loc4_[1] : "");
        let _loc7_: string = "counterparameter";
        let _loc10_: any[] = _loc9_.split("&");
        let _loc8_: boolean = false;
        _loc3_ = 0;
        while (_loc3_ < _loc10_.length) {
            _loc6_ = stringOrNull(_loc10_[_loc3_]);
            if (_loc6_.indexOf(_loc7_ + "=") >= 0) {
                _loc6_ = _loc7_ + "=" + param2.toString();
                _loc10_[_loc3_] = _loc6_;
                _loc8_ = true;
                break;
            }
            _loc3_++;
        }
        if (!_loc8_) {
            _loc10_.push(_loc7_ + "=" + param2);
        }
        _loc3_ = 0;
        while (_loc3_ < _loc10_.length) {
            _loc5_ += (_loc3_ == 0 ? "?" : "&") + _loc10_[_loc3_];
            _loc3_++;
        }
        param1.url = _loc5_;
    }

    protected static parseNameFromUrl(param1: string): string {
        let _loc2_: number = 0;
        _loc2_ = param1.indexOf("?", 0);
        if (_loc2_ > -1) {
            param1 = param1.slice(0, _loc2_);
        }
        _loc2_ = param1.lastIndexOf(".");
        if (_loc2_ > -1) {
            param1 = param1.slice(0, _loc2_);
        }
        _loc2_ = param1.lastIndexOf("/");
        if (_loc2_ > -1) {
            param1 = param1.slice(_loc2_ + 1, param1.length);
        }
        return param1;
    }

    protected static queue(param1: LibraryLoader): void {
        if (LibraryLoader._SafeStr_4399.indexOf(param1) == -1) {
            LibraryLoader._SafeStr_4399.push(param1);
        }
        LibraryLoader.throttle();
    }

    protected static throttle(): void {
        let _loc1_: LibraryLoader = null;
        let _loc2_: number = 0;
        _loc2_ = LibraryLoader._SafeStr_4021.length - 1;
        while (_loc2_ > -1) {
            _loc1_ = asInstanceOf(LibraryLoader._SafeStr_4021[_loc2_], LibraryLoader);
            if (_loc1_ && (_loc1_.ready || _loc1_.disposed)) {
                LibraryLoader._SafeStr_4021.splice(_loc2_, 1);
            }
            _loc2_--;
        }
        while (LibraryLoader._SafeStr_4021.length < 6 && LibraryLoader._SafeStr_4399.length > 0) {
            _loc1_ = asInstanceOf(LibraryLoader._SafeStr_4399.shift(), LibraryLoader);
            if (!_loc1_.ready && !_loc1_.disposed) {
                LibraryLoader._SafeStr_4021.push(_loc1_);
                _loc1_._loader.load(_loc1_._request, _loc1_._context);
            }
        }
    }

    public get url(): string {
        return this._request ? this._request.url : null;
    }

    public get name(): string {
        return this._name;
    }

    public get ready(): boolean {
        return this._SafeStr_3794;
    }

    public get status(): number {
        return this._status;
    }

    public get domain(): ApplicationDomain {
        return this._loader.contentLoaderInfo.applicationDomain;
    }

    public get request(): URLRequest {
        return this._request;
    }

    public get resource(): any {
        return this._resource;
    }

    public get manifest(): XML {
        return this._manifest;
    }

    public get bytesTotal(): number {
        return this._loader.contentLoaderInfo.bytesTotal;
    }

    public get bytesLoaded(): number {
        return this._loader.contentLoaderInfo.bytesLoaded;
    }

    public get elapsedTime(): number {
        return (this._SafeStr_3794 ? this._downloadEndTime - this._downloadStartTime : getTimer() - this._downloadStartTime) >>> 0;
    }

    public get paused(): boolean {
        return this._paused;
    }

    protected get content(): DisplayObject {
        if (Resources._SafeStr_2119(this._name)) {
            return asInstanceOf(Resources._SafeStr_2119(this._name), DisplayObject);
        }
        return this._loader.content;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this.dispatchEvent(new LibraryLoaderEvent("LIBRARY_LOADER_EVENT_DISPOSE", this._status, this.bytesTotal, this.bytesLoaded, this.elapsedTime));
            try {
                this._loader.close();
            } catch (e) {
            }
            try {
                this._loader.unload();
            } catch (e) {
            }
            this._loader = null;
            this._context = null;
            this._resource = null;
            System.disposeXML(this._manifest);
            this._manifest = null;
            super.dispose();
        }
    }

    public load(param1: URLRequest, param2: number = 5): void {
        this._request = param1;
        this._name = LibraryLoader.parseNameFromUrl(this._request.url);
        this._SafeStr_3794 = false;
        this._downloadRetriesLeft = param2;
        ErrorReportStorage.addDebugData("Library url", "Library url " + param1.url);
        ErrorReportStorage.addDebugData("Library name", "Library name " + this._name);
        if (!this._paused) {
            this._paused = true;
            this.resume();
        }
    }

    public resume(): void {
        let _loc1_: Timer = null;
        if (this._paused && !this._disposed) {
            this._paused = false;
            if (!this._SafeStr_3794 && this._request) {
                this._downloadEndTime = -1;
                this._downloadStartTime = getTimer();
                if (this.hasDefinition(this._name)) {
                    Logger.log("[LibraryLoader] Found in AIR: " + this._name);
                    _loc1_ = new Timer(10, 1);
                    _loc1_.addEventListener("timer", this.loadEventHandler);
                    _loc1_.start();
                    return;
                }
                LibraryLoader.queue(this);
            }
        }
    }

    protected retry(): boolean {
        if (!this._SafeStr_3794 && !this._disposed && this._downloadRetriesLeft > 0) {
            try {
                this._loader.close();
                this._loader.unload();
            } catch (e) {
            }
            LibraryLoader.addRequestCounterToUrlRequest(this._request, 5 - this._downloadRetriesLeft);
            this._downloadRetriesLeft = this._downloadRetriesLeft - 1;
            this._SafeStr_2597 = 0;
            this._loader.load(this._request, this._context);
            return true;
        }
        return false;
    }

    public hasDefinition(param1: string): boolean {
        if (Resources._SafeStr_2119(param1)) {
            Logger.log("[LibraryLoader] Definition in resources: " + param1);
            return true;
        }
        let _loc2_: boolean = false;
        try {
            _loc2_ = this._loader.contentLoaderInfo.applicationDomain.hasDefinition(param1);
        } catch (e) {
        }
        return _loc2_;
    }

    public getDefinition(param1: string): any {
        if (Resources._SafeStr_2119(param1)) {
            return Resources._SafeStr_2119(param1);
        }
        let _loc2_: any = null;
        try {
            if (this._loader.contentLoaderInfo.applicationDomain.hasDefinition(param1)) {
                _loc2_ = this._loader.contentLoaderInfo.applicationDomain.getDefinition(param1);
            }
        } catch (e) {
        }
        return _loc2_;
    }

    protected loadEventHandler = (param1: Event): void => {
        let _loc3_: Timer = null;
        let _loc2_: boolean = false;
        switch (param1.type) {
            case "init":
                this._SafeStr_2597 |= 2;
                break;
            case "complete":
                this._SafeStr_2597 |= 1;
                break;
            case "enterFrame":
                break;
            case "httpStatus":
                this._status = castTo(param1, HTTPStatusEvent).status;
                break;
            case "unload":
                this.debug("Load event UNLOAD for file \"" + this.url + "\"");
                this.dispatchEvent(new LibraryLoaderEvent("LIBRARY_LOADER_EVENT_UNLOAD", this._status, this.bytesTotal, this.bytesLoaded, this.elapsedTime));
                break;
            case "progress":
                this.dispatchEvent(new LibraryLoaderEvent("LIBRARY_LOADER_EVENT_PROGRESS", this._status, this.bytesTotal, this.bytesLoaded, this.elapsedTime));
                break;
            case "ioError":
                this.debug("Load event IO ERROR for file \"" + this.url + "\"");
                if (!this.handleHttpStatus(this._status)) {
                    this._downloadEndTime = getTimer();
                    this.failure("IO Error, send or load operation failed for file \"" + this.url + "\"");
                    this.removeEventListeners();
                }
                break;
            case "securityError":
                this._downloadEndTime = getTimer();
                this.failure("Security Error, security violation with file \"" + this.url + "\"");
                this.removeEventListeners();
                break;
            case "timer":
                _loc3_ = asInstanceOf(castTo(param1, TimerEvent).target, Timer);
                _loc3_.removeEventListener("timer", this.loadEventHandler);
                _loc3_.stop();
                if (!this._disposed) {
                    this._SafeStr_2597 = 7;
                    this.loadEventHandler(new Event("complete"));
                }
                return;
        }
        if (this._SafeStr_2597 == 3) {
            if (this.analyzeLibrary()) {
                this._SafeStr_2597 |= 4;
            }
        }
        if (this._SafeStr_2597 == 7) {
            _loc2_ = this.prepareLibrary();
            if (_loc2_) {
                this._SafeStr_3794 = true;
                this._downloadEndTime = getTimer();
                this.removeEventListeners();
                LibraryLoader.throttle();
                this.dispatchEvent(new LibraryLoaderEvent("LIBRARY_LOADER_EVENT_COMPLETE", this._status, this.bytesTotal, this.bytesLoaded, this.elapsedTime));
                this.dispatchEvent(new Event("LIBRARY_LOADER_FINALIZE"));
            }
        }
    };

    protected analyzeLibrary(): boolean {
        let _loc1_: MovieClip = null;
        let _loc3_: FrameLabel = null;
        let _loc4_: any[] = null;
        let _loc2_: any = 0;
        if (this.content instanceof MovieClip) {
            _loc1_ = asInstanceOf(this.content, MovieClip);
            _loc4_ = _loc1_.currentLabels;
            this.debug("\tLibrary \"" + this._name + "\" is in frame " + _loc1_.currentFrame + "(" + _loc1_.currentLabel + ")");
            if (_loc4_.length > 1) {
                _loc2_ = 0;
                while (_loc2_ < _loc4_.length) {
                    _loc3_ = asInstanceOf(_loc4_[_loc2_], FrameLabel);
                    if (_loc3_.name == this._name) {
                        if (_loc3_.frame != _loc1_.currentFrame) {
                            _loc1_.addEventListener("enterFrame", this.loadEventHandler);
                            return false;
                        }
                    }
                    _loc2_++;
                }
            }
        }
        return true;
    }

    // [SecureSWF(controlFlow="0")]
    protected prepareLibrary(): boolean {
        let _loc3_: ByteArray = null;
        this._resource = asGuarded(this.getDefinition(this._name), isClass);
        if (this._resource == null) {
            if (!this.retry()) {
                this.failure("Failed to find resource class \"" + this._name + "\" from library " + this._request.url + "!");
            }
            return false;
        }
        let _loc1_: boolean = true;
        let _loc2_: any = null;
        try {
            _loc2_ = typeof this._resource.manifest === "function" ? this._resource.manifest : null;
        } catch (e) {
            if (!this.retry()) {
                this.failure("Failed to find embedded manifest.xml from library " + this._request.url + "!");
            }
            _loc1_ = false;
        }
        if (_loc2_ == null || !_loc1_) {
            return false;
        }
        try {
            _loc3_ = asInstanceOf(new _loc2_(), ByteArray);
            this._manifest = new XML(_loc3_.readUTFBytes(_loc3_.length));
        } catch (e) {
            if (!this.retry()) {
                this.failure("Failed to extract manifest.xml from library " + this._name + "!\n" + e.message);
            }
            _loc1_ = false;
        }
        return _loc1_;
    }

    protected handleHttpStatus(param1: number): boolean {
        if (param1 == 0 || param1 >= 400) {
            if (this.retry()) {
                return true;
            }
            this.failure("HTTP Error " + param1 + " \"" + this._loader.contentLoaderInfo.url + "\"");
            this.removeEventListeners();
        }
        return false;
    }

    protected removeEventListeners(): void {
        if (this._loader) {
            if (this._loader.content != null) {
                this._loader.content.removeEventListener("enterFrame", this.loadEventHandler);
            }
            this._loader.contentLoaderInfo.removeEventListener("init", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("complete", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("progress", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("unload", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("httpStatus", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("ioError", this.loadEventHandler);
            this._loader.contentLoaderInfo.removeEventListener("securityError", this.loadEventHandler);
        }
    }

    protected debug(param1: string): void {
        Core.debug(param1);
        this._debugMsg = param1;
        if (this._debug) {
            this.dispatchEvent(new LibraryLoaderEvent("LIBRARY_LOADER_EVENT_DEBUG", this._status, this.bytesTotal, this.bytesLoaded, this.elapsedTime));
        }
    }

    protected failure(param1: string): void {
        Core.warning(param1);
        this._errorMsg = param1;
        LibraryLoader.throttle();
        this.dispatchEvent(new LibraryLoaderEvent("LIBRARY_LOADER_EVENT_ERROR", this._status, this.bytesTotal, this.bytesLoaded, this.elapsedTime));
        this.dispatchEvent(new Event("LIBRARY_LOADER_FINALIZE"));
    }

    public getLastDebugMessage(): string {
        return this._debugMsg;
    }

    public getLastErrorMessage(): string {
        return this._errorMsg;
    }
}
