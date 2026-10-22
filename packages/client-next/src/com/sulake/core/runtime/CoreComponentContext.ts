import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreErrorLogger } from '@/com/sulake/core/runtime/ICoreErrorLogger';
import type { ICoreErrorReporter } from '@/com/sulake/core/runtime/ICoreErrorReporter';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import type { IFileProxy } from '@/com/sulake/core/utils/IFileProxy';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { AssetLibraryCollection, Component, ComponentContext, Core, LibraryLoader, LibraryLoaderQueue, Profiler, PurgeTrigger } from '@/com/sulake/core/runtime/Component.group';
import { LibraryProgressEvent } from '@/com/sulake/core/runtime/events/LibraryProgressEvent';
import { ICore } from '@/com/sulake/core/runtime/ICore';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IIDCore } from '@/com/sulake/core/runtime/IIDCore';
import { IIDProfiler } from '@/com/sulake/core/runtime/IIDProfiler';
import { isIUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { ProfilerViewer } from '@/com/sulake/core/utils/profiler/ProfilerViewer';
import { Logger } from '@/com/sulake/habbo/Logger';

export class CoreComponentContext extends ComponentContext implements ICore {
    static { registerClassName(this, 'com.sulake.core.runtime::CoreComponentContext'); }

    private static readonly NUM_UPDATE_RECEIVER_LEVELS: number = 3;
    private static readonly CONFIG_XML_NODE_ASSET_LIBRARIES: string = "asset-libraries";
    private static readonly CONFIG_XML_NODE_ASSET_LIBRARY: string = "library";
    private static readonly CONFIG_XML_NODE_SERVICE_LIBRARIES: string = "service-libraries";
    private static readonly CONFIG_XML_NODE_SERVICE_LIBRARY: string = "library";
    private static readonly CONFIG_XML_NODE_COMPONENT_LIBRARIES: string = "component-libraries";
    private static readonly CONFIG_XML_NODE_COMPONENT_LIBRARY: string = "library";
    private static _fileProxy: IFileProxy;

    declare private _SafeStr_2734: LibraryLoaderQueue;

    declare private _loadingEventDelegate: IEventDispatcher;

    declare private _numberOfFilesInConfig: number;
    static { (this.prototype as any)._numberOfFilesInConfig = 0; }

    declare private _SafeStr_2346: (...args: any[]) => any;

    declare private _profiler: Profiler;

    declare private _SafeStr_4877: ICoreErrorReporter;

    declare private _SafeStr_2720: any[];

    declare private _SafeStr_3530: any[];

    declare private _lastUpdateTimeMs: number;
    static { (this.prototype as any)._lastUpdateTimeMs = 0; }

    private _flags_CoreComponentContext: number = 0;
    private _hibernationLevel: number = -1;

    declare private _hibernationUpdateFrequency: number;
    static { (this.prototype as any)._hibernationUpdateFrequency = 0; }

    declare private _arguments: Map<any, any>;

    declare private _rebootOnNextFrame: boolean;
    static { (this.prototype as any)._rebootOnNextFrame = false; }

    constructor(param1: DisplayObjectContainer, param2: ICoreErrorReporter, param3: number, param4: Map<any, any>) {
        let _loc5_: any = 0;
        super(Component.OWN_CONTEXT, 2, new AssetLibraryCollection("_core_assets"));
        if (param4 == null) {
            param4 = new Dictionary();
        }
        this._arguments = param4;
        this._flags_CoreComponentContext = param3;
        this._debug = (param3 & 0x0F) == 15;
        this._SafeStr_2720 = [];
        this._SafeStr_3530 = [];
        this._displayObjectContainer = param1;
        this._SafeStr_4877 = param2;
        _loc5_ = 0;
        while (_loc5_ < 3) {
            this._SafeStr_2720.push([]);
            this._SafeStr_3530.push(0);
            _loc5_++;
        }
        this._lastUpdateTimeMs = getTimer() >>> 0;
        this.attachComponent(this, [new IIDCore()]);
        this._displayObjectContainer.addEventListener("enterFrame", this.onEnterFrame);
        switch (param3 & 0x0F) {
            case 0:
                this.debug("Core; using simple frame update handler");
                this._SafeStr_2346 = this.simpleFrameUpdateHandler;
                break;
            case 1:
                this.debug("Core; using complex frame update handler");
                this._SafeStr_2346 = this.complexFrameUpdateHandler;
                break;
            case 2:
                this.debug("Core; using profiler frame update handler");
                this._SafeStr_2346 = this.profilerFrameUpdateHandler;
                this._profiler = new Profiler(this);
                this.attachComponent(this._profiler, [new IIDProfiler()]);
                this._displayObjectContainer.addChild(new ProfilerViewer(this._profiler));
                break;
            case 4:
                this.debug("Core; using experimental frame update handler");
                this._SafeStr_2346 = this.experimentalFrameUpdateHandler;
                break;
            case 15:
                this.debug("Core; using debug frame update handler");
                this._SafeStr_2346 = this.debugFrameUpdateHandler;
        }
    }

    private static writeObjectToProxy(param1: string, param2: any): boolean {
        let _loc8_: boolean = false;
        let _loc3_: IFileProxy = null;
        let _loc4_: ByteArray = null;
        try {
            _loc3_ = Core.instance.fileProxy;
            if (_loc3_) {
                _loc4_ = new ByteArray();
                _loc4_.writeObject(param2);
                _loc3_.writeCache(param1, _loc4_);
                return true;
            }
            return false;
        } catch (e) {
            Logger.log("Caught error when writing Object (" + param1 + ") to IFileProxy: " + e.toString());
            _loc8_ = false;
        }
        return _loc8_;
    }

    private static readObjectFromProxy(param1: string): any {
        let _loc7_: any;
        let _loc2_: IFileProxy = null;
        let _loc3_: ByteArray = null;
        try {
            _loc2_ = Core.instance.fileProxy;
            if (_loc2_) {
                _loc3_ = _loc2_.readCache(param1);
                if (_loc3_) {
                    return _loc3_.readObject();
                }
            }
            return null;
        } catch (e) {
            Logger.log("Caught error when reading Object (" + param1 + ") from IFileProxy: " + e.toString());
            _loc7_ = null;
        }
        return _loc7_;
    }

    public set fileProxy(param1: IFileProxy) {
        CoreComponentContext._fileProxy = param1;
    }

    public get fileProxy(): IFileProxy {
        return CoreComponentContext._fileProxy;
    }

    public getNumberOfFilesPending(): number {
        return this._SafeStr_2734.length >>> 0;
    }

    public getNumberOfFilesLoaded(): number {
        return this._numberOfFilesInConfig - this.getNumberOfFilesPending() >>> 0;
    }

    public get arguments(): Map<any, any> {
        return this._arguments;
    }

    public clearArguments(): void {
        this._arguments = new Dictionary();
    }

    public initialize(): void {
        if (this.hasLockedComponents()) {
            this.events.addEventListener("COMPONENT_EVENT_UNLOCKED", this.unlockEventHandler_CoreComponentContext);
        } else {
            this.doInitialize();
        }
    }

    private unlockEventHandler_CoreComponentContext = (param1: Event): void => {
        if (!this.hasLockedComponents()) {
            this.events.removeEventListener("COMPONENT_EVENT_UNLOCKED", this.unlockEventHandler_CoreComponentContext);
            this.doInitialize();
        }
    };

    private doInitialize(): void {
        this.events.dispatchEvent(new Event("COMPONENT_EVENT_RUNNING"));
        PurgeTrigger.start();
    }

    public hasLockedComponents(): boolean {
        if (this._SafeStr_2363 != null) {
            for (const _loc1_ of this._SafeStr_2363 ?? []) {
                if (_loc1_.locked) {
                    return true;
                }
            }
        }
        return false;
    }

    public getLockedComponents(): any[] {
        let _loc2_: any[] = [];
        if (this._SafeStr_2363 != null) {
            for (const _loc1_ of this._SafeStr_2363 ?? []) {
                if (_loc1_.locked) {
                    _loc2_.push(_loc1_);
                }
            }
        }
        return _loc2_;
    }

    public override dispose(): void {
        let _loc2_: any[] = null;
        let _loc1_: any = undefined;
        let _loc3_: any = 0;
        let _loc4_: any = 0;
        if (!this.disposed) {
            this.debug("Disposing core");
            PurgeTrigger.stop();
            try {
                _loc4_ = 0;
                while (_loc4_ < 3) {
                    _loc2_ = asGuarded(this._SafeStr_2720[_loc4_], Array.isArray);
                    _loc3_ = _loc2_.length;
                    while (_loc3_-- > 0) {
                        _loc1_ = _loc2_.pop();
                        if (_loc1_ instanceof UpdateDelegate) {
                            castTo(_loc1_, UpdateDelegate).dispose();
                        }
                    }
                    _loc4_++;
                }
            } catch (e) {
            }
            if (this._displayObjectContainer) {
                this._displayObjectContainer.removeEventListener("enterFrame", this.onEnterFrame);
                this._displayObjectContainer = null;
            }
            if (this._SafeStr_2734 != null) {
                this._SafeStr_2734.dispose();
                this._SafeStr_2734 = null;
            }
            super.dispose();
        }
    }

    public override error(param1: string, param2: boolean, param3: number = -1, param4: Error = null): boolean {
        super.error(param1, param2, param3, param4);
        this._SafeStr_4877.logError(param1, param2, param3, param4);
        if (param2 && this.isCrashOnCriticalError && !this.isExcludedFromCrash(param3)) {
            this.dispose();
            return true;
        }
        return false;
    }

    private get isCrashOnCriticalError(): boolean {
        return this.getBoolean("error_handling.crash_on_critical_error");
    }

    private isExcludedFromCrash(param1: number): boolean {
        let _loc2_: string = this.getProperty("error_handling.exclude_crashing");
        if (!_loc2_) {
            return false;
        }
        let _loc3_: any[] = _loc2_.split(",");
        return _loc3_.indexOf(param1.toString()) != -1;
    }

    public readConfigDocument(param1: XML, param2: IEventDispatcher = null): void {
        let _loc3_: XML = null;
        let _loc7_: XMLList = null;
        let _loc4_: any = null;
        let _loc8_: string = null;
        let _loc5_: LibraryLoader = null;
        let _loc6_: LoaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, null);
        this.debug("Parsing config document");
        this._loadingEventDelegate = param2;
        if (this._SafeStr_2734 == null) {
            this._SafeStr_2734 = new LibraryLoaderQueue(this._debug);
        }
        _loc3_ = param1.child("asset-libraries").item(0);
        if (_loc3_ != null) {
            _loc7_ = _loc3_.child("library");
            for (_loc4_ of _loc7_ ?? []) {
                _loc8_ = _loc4_.attribute("url").toString();
                _loc5_ = new LibraryLoader(_loc6_, true, this._debug);
                this.assets.loadFromFile(_loc5_, true);
                _loc5_.load(new URLRequest(_loc8_));
                this._SafeStr_2734.push(_loc5_);
                _loc5_.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.updateLoadingProcess);
                _loc5_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.errorInLoadingProcess);
                this._numberOfFilesInConfig = this._numberOfFilesInConfig + 1 >>> 0;
            }
        }
        _loc3_ = param1.child("service-libraries").item(0);
        if (_loc3_ != null) {
            _loc7_ = _loc3_.child("library");
            for (_loc4_ of _loc7_ ?? []) {
                _loc8_ = _loc4_.attribute("url").toString();
                _loc5_ = new LibraryLoader(_loc6_, true, this._debug);
                _loc5_.load(new URLRequest(_loc8_));
                this._SafeStr_2734.push(_loc5_);
                _loc5_.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.updateLoadingProcess);
                _loc5_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.errorInLoadingProcess);
                this._numberOfFilesInConfig = this._numberOfFilesInConfig + 1 >>> 0;
            }
        }
        _loc3_ = param1.child("component-libraries").item(0);
        if (_loc3_ != null) {
            _loc7_ = _loc3_.child("library");
            for (_loc4_ of _loc7_ ?? []) {
                _loc8_ = _loc4_.attribute("url").toString();
                _loc5_ = new LibraryLoader(_loc6_, true, this._debug);
                _loc5_.load(new URLRequest(_loc8_));
                this._SafeStr_2734.push(_loc5_);
                _loc5_.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.updateLoadingProcess);
                _loc5_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.errorInLoadingProcess);
                this._numberOfFilesInConfig = this._numberOfFilesInConfig + 1 >>> 0;
            }
        }
        if (!this.disposed) {
            this.updateLoadingProcess();
        }
    }

    public writeDictionaryToProxy(param1: string, param2: Map<any, any>): boolean {
        return CoreComponentContext.writeObjectToProxy(param1, param2);
    }

    public readDictionaryFromProxy(param1: string): Map<any, any> {
        return asInstanceOf(CoreComponentContext.readObjectFromProxy(param1), Map);
    }

    public writeXMLToProxy(param1: string, param2: XML): boolean {
        return CoreComponentContext.writeObjectToProxy(param1, param2);
    }

    public readXMLFromProxy(param1: string): XML {
        return asInstanceOf(CoreComponentContext.readObjectFromProxy(param1), XML);
    }

    public readStringFromProxy(param1: string): string {
        let _loc7_: any;
        let _loc2_: IFileProxy = null;
        let _loc3_: ByteArray = null;
        try {
            _loc2_ = Core.instance.fileProxy;
            if (_loc2_) {
                _loc3_ = _loc2_.readCache(param1);
                if (_loc3_) {
                    return _loc3_.readUTFBytes(_loc3_.length);
                }
            }
            return null;
        } catch (e) {
            Logger.log("Caught error when reading Object (" + param1 + ") from IFileProxy: " + e.toString());
            _loc7_ = null;
        }
        return stringOrNull(_loc7_);
    }

    public writeStringToProxy(param1: string, param2: string): boolean {
        let _loc8_: boolean = false;
        let _loc3_: IFileProxy = null;
        let _loc4_: ByteArray = null;
        try {
            _loc3_ = Core.instance.fileProxy;
            if (_loc3_) {
                _loc4_ = new ByteArray();
                _loc4_.writeUTFBytes(param2);
                _loc3_.writeCache(param1, _loc4_);
                return true;
            }
            return false;
        } catch (e) {
            Logger.log("Caught error when writing String (" + param1 + ") to IFileProxy: " + e.toString());
            _loc8_ = false;
        }
        return _loc8_;
    }

    private errorInLoadingProcess = (param1: LibraryLoaderEvent = null): void => {
        let _loc2_: LibraryLoader = castTo(param1.target, LibraryLoader);
        this.error("Failed to download library \"" + _loc2_.url + "\" HTTP status " + param1.status + " bytes loaded " + param1.bytesLoaded + "/" + param1.bytesTotal + " : " + _loc2_.getLastErrorMessage(), true, 2);
        if (!this.disposed) {
            this.updateLoadingProcess(param1);
        }
    };

    private finalizeLoadingEventDelegate(): void {
        if (this._loadingEventDelegate != null) {
            this._loadingEventDelegate.dispatchEvent(new Event("complete"));
            this._loadingEventDelegate = null;
        }
    }

    private updateLoadingProgress = (param1: LibraryLoaderEvent = null): void => {
        let _loc2_: LibraryLoader = null;
        if (this._loadingEventDelegate != null) {
            _loc2_ = asInstanceOf(param1.target, LibraryLoader);
            this._loadingEventDelegate.dispatchEvent(new LibraryProgressEvent(_loc2_.url, param1.bytesLoaded, param1.bytesTotal, _loc2_.elapsedTime | 0));
        }
    };

    private updateLoadingProcess = (param1: LibraryLoaderEvent = null): void => {
        let _loc2_: LibraryLoader = null;
        let _loc3_: string = null;
        if (param1 != null) {
            if (param1.type == "LIBRARY_LOADER_EVENT_COMPLETE" || param1.type == "LIBRARY_LOADER_EVENT_ERROR") {
                _loc2_ = asInstanceOf(param1.target, LibraryLoader);
                _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.updateLoadingProcess);
                _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.errorInLoadingProcess);
                _loc2_.removeEventListener("LIBRARY_LOADER_EVENT_PROGRESS", this.updateLoadingProgress);
                _loc3_ = _loc2_.url;
                this.debug("Loading library \"" + _loc3_ + "\" " + (param1.type == "LIBRARY_LOADER_EVENT_COMPLETE" ? "ready" : "failed\n" + _loc2_.getLastErrorMessage()));
                _loc2_.dispose();
                if (!this.disposed) {
                    if (this._loadingEventDelegate != null) {
                        this._loadingEventDelegate.dispatchEvent(new LibraryProgressEvent(_loc2_.url, this._numberOfFilesInConfig - this._SafeStr_2734.length >>> 0, this._numberOfFilesInConfig, _loc2_.elapsedTime | 0));
                    }
                }
            }
        }
        if (!this.disposed) {
            if (this._SafeStr_2734.length == 0) {
                this.finalizeLoadingEventDelegate();
                this.debug("All libraries loaded, Core is now running");
            }
        }
    };

    public override registerUpdateReceiver(param1: IUpdateReceiver, param2: number): void {
        this.removeUpdateReceiver(param1);
        param2 = (param2 >= 3 ? 3 - 1 : param2) >>> 0;
        let _loc3_: number = this._profiler ? 2 : this._flags_CoreComponentContext & 0x0F;
        if (_loc3_ == 4) {
            this._SafeStr_2720[param2].push(new UpdateDelegate(param1, this, param2 | 0));
        } else {
            this._SafeStr_2720[param2].push(param1);
        }
    }

    public override removeUpdateReceiver(param1: IUpdateReceiver): void {
        let _loc2_: any;
        let _loc4_: any[] = null;
        let _loc5_: number = 0;
        let _loc6_: any = 0;
        if (this.disposed) {
            return;
        }
        let _loc3_: number = this._profiler ? 2 : this._flags_CoreComponentContext & 0x0F;
        _loc6_ = 0;
        while (_loc6_ < 3) {
            _loc4_ = asGuarded(this._SafeStr_2720[_loc6_], Array.isArray);
            if (_loc3_ == 4) {
                for (_loc2_ of _loc4_ ?? []) {
                    if (_loc2_.receiver == param1) {
                        _loc2_.dispose();
                        return;
                    }
                }
            } else {
                _loc5_ = _loc4_.indexOf(param1);
                if (_loc5_ > -1) {
                    _loc4_[_loc5_] = null;
                    return;
                }
            }
            _loc6_++;
        }
    }

    public hibernate(param1: number, param2: number = 1): void {
        if (!this.hibernating) {
            PurgeTrigger.stop();
            this._hibernationLevel = param1;
            this._hibernationUpdateFrequency = 1000 / param2 >>> 0;
        }
    }

    public resume(): void {
        if (this.hibernating) {
            PurgeTrigger.start();
            this._hibernationLevel = -1;
        }
    }

    private get hibernating(): boolean {
        return this._hibernationLevel > -1;
    }

    private get maxPriority(): number {
        return (this.hibernating ? this._hibernationLevel + 1 : 3) >>> 0;
    }

    private onEnterFrame = (param1: Event): void => {
        if (this._rebootOnNextFrame) {
            this._displayObjectContainer.removeEventListener("enterFrame", this.onEnterFrame);
            this._rebootOnNextFrame = false;
            this.events.dispatchEvent(new Event("COMPONENT_EVENT_REBOOT"));
            return;
        }
        let _loc3_: number = getTimer() >>> 0;
        let _loc2_: number = _loc3_ - this._lastUpdateTimeMs >>> 0;
        if (!this.hibernating || _loc2_ > this._hibernationUpdateFrequency) {
            this._SafeStr_2346(_loc3_, _loc2_);
            this._lastUpdateTimeMs = _loc3_;
        }
    };

    private simpleFrameUpdateHandler = (param1: number, param2: number): void => {
        let _loc4_: any[] = null;
        let _loc3_: IUpdateReceiver = null;
        let _loc5_: any = 0;
        let _loc6_: any = 0;
        let _loc7_: any = 0;
        _loc7_ = 0;
        while (_loc7_ < this.maxPriority) {
            this._SafeStr_3530[_loc7_] = 0;
            _loc4_ = this._SafeStr_2720[_loc7_];
            _loc6_ = 0;
            _loc5_ = _loc4_.length;
            while (_loc6_ != _loc5_) {
                _loc3_ = castGuarded(_loc4_[_loc6_], isIUpdateReceiver, "com.sulake.core.runtime.IUpdateReceiver");
                if (_loc3_ == null || Boolean(_loc3_.disposed)) {
                    _loc4_.splice(_loc6_, 1);
                    _loc5_--;
                } else {
                    try {
                        _loc3_.update(param2);
                    } catch (e) {
                        Logger.log(e.stack);
                        if (this.error("Error in update receiver \"" + getQualifiedClassName(_loc3_) + "\": " + e.message, true, (e.errorID ?? 0), e)) {
                            return;
                        }
                    }
                    _loc6_++;
                }
            }
            _loc7_++;
        }
    };

    private complexFrameUpdateHandler = (param1: number, param2: number): void => {
        let _loc11_: any = 0;
        let _loc6_: any[] = null;
        let _loc4_: IUpdateReceiver = null;
        let _loc7_: any = 0;
        let _loc9_: any = 0;
        let _loc10_: boolean = false;
        let _loc5_: any = 0;
        let _loc3_: boolean = true;
        let _loc8_: number = 1000 / this._displayObjectContainer.stage.frameRate >>> 0;
        _loc11_ = 0;
        while (_loc11_ < this.maxPriority) {
            _loc5_ = getTimer() >>> 0;
            _loc10_ = false;
            if (_loc5_ - param1 > _loc8_) {
                if (this._SafeStr_3530[_loc11_] < _loc11_) {
                    this._SafeStr_3530[_loc11_]++;
                    _loc10_ = true;
                }
            }
            if (!_loc10_) {
                this._SafeStr_3530[_loc11_] = 0;
                _loc6_ = this._SafeStr_2720[_loc11_];
                _loc9_ = 0;
                _loc7_ = _loc6_.length;
                while (_loc9_ != _loc7_ && _loc3_) {
                    _loc4_ = castGuarded(_loc6_[_loc9_], isIUpdateReceiver, "com.sulake.core.runtime.IUpdateReceiver");
                    if (_loc4_ == null || Boolean(_loc4_.disposed)) {
                        _loc6_.splice(_loc9_, 1);
                        _loc7_--;
                    } else {
                        try {
                            _loc4_.update(param2);
                        } catch (e) {
                            Logger.log(e.stack);
                            if (this.error("Error in update receiver \"" + getQualifiedClassName(_loc4_) + "\": " + e, true, (e.errorID ?? 0), e)) {
                                _loc3_ = false;
                            }
                        }
                        _loc9_++;
                    }
                }
            }
            _loc11_++;
        }
    };

    private profilerFrameUpdateHandler = (param1: number, param2: number): void => {
        let _loc4_: any[] = null;
        let _loc3_: IUpdateReceiver = null;
        let _loc5_: any = 0;
        let _loc6_: any = 0;
        let _loc7_: any = 0;
        this._profiler.start();
        _loc7_ = 0;
        while (_loc7_ < this.maxPriority) {
            this._SafeStr_3530[_loc7_] = 0;
            _loc4_ = this._SafeStr_2720[_loc7_];
            _loc6_ = 0;
            _loc5_ = _loc4_.length;
            while (_loc6_ != _loc5_) {
                _loc3_ = castGuarded(_loc4_[_loc6_], isIUpdateReceiver, "com.sulake.core.runtime.IUpdateReceiver");
                if (_loc3_ == null || Boolean(_loc3_.disposed)) {
                    _loc4_.splice(_loc6_, 1);
                    _loc5_--;
                } else {
                    try {
                        this._profiler.update(_loc3_, param2);
                    } catch (e) {
                        if (this.error("Error in update receiver \"" + getQualifiedClassName(_loc3_) + "\": " + e.message, true, (e.errorID ?? 0), e)) {
                            return;
                        }
                    }
                    _loc6_++;
                }
            }
            _loc7_++;
        }
        this._profiler.stop();
    };

    private experimentalFrameUpdateHandler = (param1: number, param2: number): void => {
        let _loc5_: number = 0;
        let _loc3_: any[] = null;
        let _loc4_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < 3) {
            _loc3_ = this._SafeStr_2720[_loc5_];
            _loc4_ = _loc3_.length - 1;
            while (_loc4_ > -1) {
                if (_loc3_[_loc4_].disposed) {
                    _loc3_.splice(_loc4_, 1);
                }
                _loc4_--;
            }
            _loc5_++;
        }
    };

    private debugFrameUpdateHandler = (param1: number, param2: number): void => {
        let _loc4_: any[] = null;
        let _loc3_: IUpdateReceiver = null;
        let _loc5_: any = 0;
        let _loc6_: any = 0;
        let _loc7_: any = 0;
        _loc7_ = 0;
        while (_loc7_ < this.maxPriority) {
            this._SafeStr_3530[_loc7_] = 0;
            _loc4_ = this._SafeStr_2720[_loc7_];
            _loc6_ = 0;
            _loc5_ = _loc4_.length;
            while (_loc6_ != _loc5_) {
                _loc3_ = castGuarded(_loc4_[_loc6_], isIUpdateReceiver, "com.sulake.core.runtime.IUpdateReceiver");
                if (_loc3_ == null || Boolean(_loc3_.disposed)) {
                    _loc4_.splice(_loc6_, 1);
                    _loc5_--;
                } else {
                    try {
                        _loc3_.update(param2);
                    } catch (e) {
                        this.error("Error in update receiver \"" + getQualifiedClassName(_loc3_) + "\": " + e, false, (e.errorID ?? 0), e);
                    }
                    _loc6_++;
                }
            }
            _loc7_++;
        }
    };

    public setProfilerMode(param1: boolean): void {
        let _loc3_: any[] = null;
        let _loc2_: any = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (param1) {
            this._SafeStr_2346 = this.profilerFrameUpdateHandler;
            if (!this._profiler || this._profiler.disposed) {
                this._profiler = new Profiler(this);
            }
            this.attachComponent(this._profiler, [new IIDProfiler()]);
            _loc5_ = 0;
            while (_loc5_ < 3) {
                _loc3_ = this._SafeStr_2720[_loc5_];
                _loc4_ = _loc3_.length - 1;
                while (_loc4_ > -1) {
                    _loc2_ = _loc3_[_loc4_];
                    if (_loc2_ instanceof UpdateDelegate) {
                        _loc3_[_loc4_] = castTo(_loc2_, UpdateDelegate).receiver;
                        castTo(_loc2_, UpdateDelegate).dispose();
                    }
                    _loc4_--;
                }
                _loc5_++;
            }
        } else {
            this.detachComponent(this._profiler);
            switch (this._flags_CoreComponentContext & 0x0F) {
                case 0:
                    this._SafeStr_2346 = this.simpleFrameUpdateHandler;
                    break;
                case 1:
                    this._SafeStr_2346 = this.complexFrameUpdateHandler;
                    break;
                case 4:
                    this._SafeStr_2346 = this.experimentalFrameUpdateHandler;
                    _loc5_ = 0;
                    while (_loc5_ < 3) {
                        _loc3_ = this._SafeStr_2720[_loc5_];
                        _loc4_ = _loc3_.length - 1;
                        while (_loc4_ > -1) {
                            _loc2_ = _loc3_[_loc4_];
                            if (isIUpdateReceiver(_loc2_)) {
                                _loc3_[_loc4_] = new UpdateDelegate(castGuarded(_loc2_, isIUpdateReceiver, "com.sulake.core.runtime.IUpdateReceiver"), this, _loc5_);
                            }
                            _loc4_--;
                        }
                        _loc5_++;
                    }
                    break;
                default:
                    this._SafeStr_2346 = this.debugFrameUpdateHandler;
            }
        }
    }

    public set errorLogger(param1: ICoreErrorLogger) {
        if (this._SafeStr_4877 != null) {
            this._SafeStr_4877.errorLogger = param1;
        }
    }

    public reboot(): void {
        this._rebootOnNextFrame = true;
    }

    get [ICore](): true {
        return true;
    }
}

class UpdateDelegate implements IDisposable {
    declare private _receiver: IUpdateReceiver;

    declare private _context: IContext;

    declare private _priority: number;
    static { (this.prototype as any)._priority = 0; }

    declare private _lastUpdateTimeMs: number;
    static { (this.prototype as any)._lastUpdateTimeMs = 0; }

    private _framesSkipped: number = 0;

    constructor(param1: IUpdateReceiver, param2: IContext, param3: number) {
        if (param2 && param1) {
            this._receiver = param1;
            this._context = param2;
            this._priority = param3;
            param2.displayObjectContainer.stage.addEventListener(this._priority == 0 ? "exitFrame" : "enterFrame", this.onFrameUpdate);
            this._lastUpdateTimeMs = getTimer() >>> 0;
        }
    }

    public get priority(): number {
        return this._priority;
    }

    public get receiver(): IUpdateReceiver {
        return this._receiver;
    }

    public get disposed(): boolean {
        return this._receiver ? this._receiver.disposed : true;
    }

    public dispose(): void {
        if (this._receiver) {
            this._receiver = null;
            this._context.displayObjectContainer.stage.removeEventListener(this._priority == 0 ? "exitFrame" : "enterFrame", this.onFrameUpdate);
            this._context = null;
        }
    }

    private onFrameUpdate = (param1: Event): void => {
        let _loc2_: any = 0;
        if (!this.disposed) {
            _loc2_ = getTimer() >>> 0;
            let _loc3_: number = _loc2_ - this._lastUpdateTimeMs >>> 0;
            this._lastUpdateTimeMs = _loc2_ >>> 0;
            if (this._priority > 0 && this._framesSkipped < this._priority) {
                if (_loc3_ > 1000 / this._context.displayObjectContainer.stage.frameRate) {
                    this._framesSkipped = Number(this._framesSkipped) + 1 >>> 0;
                    return;
                }
            }
            this._framesSkipped = 0;
            try {
                this._receiver.update(_loc3_);
            } catch (e) {
                this._context.error("Error in update receiver \"" + getQualifiedClassName(this._receiver) + "\": " + e.message, true, (e.errorID ?? 0), e);
            }
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
