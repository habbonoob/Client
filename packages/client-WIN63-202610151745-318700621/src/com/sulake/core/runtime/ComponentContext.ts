import { asGuarded, asInstanceOf, castGuarded, isClass, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { LockEvent } from '@/com/sulake/core/runtime/events/LockEvent';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { InterfaceStructList } from '@/com/sulake/core/runtime/InterfaceStructList';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { LibraryLoaderEvent } from '@/com/sulake/core/utils/LibraryLoaderEvent';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import type { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getDefinitionByName } from '@habbo-pixi/runtime/utils/getDefinitionByName';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { AssetLibrary, Component, LibraryLoader } from '@/com/sulake/core/runtime/Component.group';
import { ComponentInterfaceQueue } from '@/com/sulake/core/runtime/ComponentInterfaceQueue';
import { ErrorEvent } from '@/com/sulake/core/runtime/events/ErrorEvent';
import { WarningEvent } from '@/com/sulake/core/runtime/events/WarningEvent';
import { InvalidComponentException } from '@/com/sulake/core/runtime/exceptions/InvalidComponentException';
import { IContext } from '@/com/sulake/core/runtime/IContext';
import { isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { InterfaceStruct } from '@/com/sulake/core/runtime/InterfaceStruct';
import { isIUnknown } from '@/com/sulake/core/runtime/IUnknown';

export class ComponentContext extends Component implements IContext {
    static { registerClassName(this, 'com.sulake.core.runtime::ComponentContext'); }

    declare private _linkEventTrackers: ILinkEventTracker[];

    declare protected _SafeStr_2363: Component[];

    declare protected _queuees: ComponentInterfaceQueue[];

    declare protected _loaders: LibraryLoader[];

    declare protected _debug: boolean;

    declare protected _displayObjectContainer: DisplayObjectContainer;

    declare private _configuration: ICoreConfiguration;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, (param2 | 2) >>> 0, param3);
    }

    public get root(): IContext {
        if (!this.context || this.context == this) {
            return this;
        }
        return this.context.root;
    }

    public get displayObjectContainer(): DisplayObjectContainer {
        return this._displayObjectContainer;
    }

    public override purge(): void {
        super.purge();
        for (const _loc1_ of this._SafeStr_2363 ?? []) {
            if (_loc1_ != this) {
                _loc1_.purge();
            }
        }
    }

    public debug(param1: string): void {
        this._SafeStr_7216 = param1;
        if (this._debug && this.events) {
            this.events.dispatchEvent(new Event("COMPONENT_EVENT_DEBUG"));
        }
    }

    public getLastDebugMessage(): string {
        return this._SafeStr_7216;
    }

    public warning(param1: string): void {
        this._SafeStr_5846 = param1;
        if (this.events != null) {
            this.events.dispatchEvent(new WarningEvent("COMPONENT_EVENT_WARNING", param1));
        }
    }

    public getLastWarningMessage(): string {
        return this._SafeStr_5846;
    }

    public error(param1: string, param2: boolean, param3: number = -1, param4: Error = null): boolean {
        this._lastError = param1;
        if (this.events != null) {
            this.events.dispatchEvent(new ErrorEvent("COMPONENT_EVENT_ERROR", param1, param2, param3, param4));
        }
        return false;
    }

    public getLastErrorMessage(): string {
        return this._lastError;
    }

    public loadFromFile(param1: URLRequest, param2: LoaderContext): LibraryLoader {
        let _loc3_: LibraryLoader = null;
        if (this._loaders == null) {
            this._loaders = [];
        }
        for (_loc3_ of this._loaders ?? []) {
            if (_loc3_.url == param1.url) {
                return _loc3_;
            }
        }
        _loc3_ = new LibraryLoader(param2, this._debug);
        _loc3_.addEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.loadReadyHandler, false);
        _loc3_.addEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadErrorHandler, false);
        _loc3_.addEventListener("LIBRARY_LOADER_EVENT_DEBUG", this.loadDebugHandler, false);
        _loc3_.load(param1);
        this._loaders.push(_loc3_);
        return _loc3_;
    }

    protected loadReadyHandler(param1: LibraryLoaderEvent): void {
        let _loc2_: LibraryLoader = asInstanceOf(param1.target, LibraryLoader);
        this.removeLibraryLoader(_loc2_);
        this.prepareComponent(_loc2_.resource, 0, _loc2_.domain);
    }

    protected loadErrorHandler(param1: LibraryLoaderEvent): void {
        let _loc2_: LibraryLoader = null;
        _loc2_ = asInstanceOf(param1.target, LibraryLoader);
        let _loc3_: string = _loc2_.getLastErrorMessage();
        this.removeLibraryLoader(_loc2_);
        this.error("Failed to download component resource \"" + _loc2_.url + "\"!" + "\r" + _loc3_, true, 5);
    }

    protected loadDebugHandler(param1: LibraryLoaderEvent): void {
        let _loc2_: LibraryLoader = null;
        _loc2_ = asInstanceOf(param1.target, LibraryLoader);
        let _loc3_: string = _loc2_.getLastDebugMessage();
        this.debug(_loc3_);
    }

    protected removeLibraryLoader(param1: LibraryLoader): void {
        param1.removeEventListener("LIBRARY_LOADER_EVENT_COMPLETE", this.loadReadyHandler, false);
        param1.removeEventListener("LIBRARY_LOADER_EVENT_ERROR", this.loadReadyHandler, false);
        param1.dispose();
        let _loc2_: number = this._loaders.indexOf(param1);
        if (_loc2_ > -1) {
            this._loaders.splice(_loc2_, 1);
        }
    }

    public prepareAssetLibrary(param1: XML, param2: any): boolean {
        return this.assets.loadFromResource(param1, param2);
    }

    public prepareComponent(param1: any, param2: number = 0, param3: ApplicationDomain = null): IUnknown {
        let _loc11_: XML = null;
        let _loc16_: any = null;
        let _loc23_: ByteArray = null;
        let _loc8_: any = null;
        let _loc4_: string = null;
        let _loc13_: XMLList = null;
        let _loc21_: Component = null;
        let _loc5_: any[] = null;
        let _loc9_: any = null;
        let _loc7_: string = null;
        let _loc10_: IID = null;
        let _loc18_: string = null;
        let _loc19_: IUnknown = null;
        let _loc6_: XML = null;
        let _loc14_: any = 0;
        let _loc17_: XMLList = null;
        let _loc20_: XML = null;
        let _loc15_: any = 0;
        if (param3 == null) {
            param3 = ApplicationDomain.currentDomain;
        }
        try {
            _loc16_ = (param1).manifest;
            if (_loc16_ instanceof XML) {
                _loc11_ = _loc16_ instanceof XML ? _loc16_ : null;
            } else if (typeof _loc16_ === "function") {
                _loc23_ = asInstanceOf(new (typeof _loc16_ === "function" ? _loc16_ : null)(), ByteArray);
                _loc11_ = new XML(_loc23_.readUTFBytes(_loc23_.length));
            }
        } catch (e) {
            _loc11_ = null;
        }
        if (_loc11_ == null) {
            return null;
        }
        let _loc12_: XMLList = _loc11_.child("component");
        _loc14_ = 0;
        while (_loc14_ < _loc12_.length()) {
            _loc6_ = _loc12_.getProperty(_loc14_);
            _loc18_ = _loc6_.attribute("version").toString();
            _loc4_ = _loc6_.attribute("class").toString();
            _loc17_ = _loc6_.child("assets");
            let _loc22_: XMLList = _loc6_.child("aliases");
            let _loc24_: IAssetLibrary = null;
            if (_loc17_.length() > 0) {
                _loc20_ = new XML(`<manifest><library /></manifest>`);
                _loc20_.child("library").appendChild(_loc17_);
                _loc20_.child("library").appendChild(_loc22_);
                _loc24_ = new AssetLibrary("_assets@" + _loc4_, _loc20_);
                _loc24_.loadFromResource(_loc20_, param1);
            }
            _loc8_ = asGuarded(param3.getDefinition(_loc4_), isClass);
            if (_loc8_ == null) {
                _loc8_ = asGuarded(getDefinitionByName(_loc4_), isClass);
            }
            if (_loc8_ == null) {
                this.error("Invalid component class " + _loc4_ + "!", true, 4);
                return null;
            }
            _loc21_ = _loc24_ == null ? new _loc8_(this, param2) : new _loc8_(this, param2, _loc24_);
            if (_loc21_ != null) {
                if (_loc24_ != null) {
                    if (_loc21_.assets != _loc24_) {
                        _loc24_.dispose();
                        this.error("Component \"" + _loc4_ + "\" did not save provided asset library!", true, 4);
                    }
                }
                _loc13_ = _loc6_.child("interface");
                _loc5_ = [];
                _loc15_ = 0;
                while (_loc15_ < _loc13_.length()) {
                    _loc7_ = stringOrNull(_loc13_.getProperty(_loc15_).attribute("iid"));
                    _loc9_ = asGuarded(param3.getDefinition(_loc7_), isClass);
                    if (_loc9_ == null) {
                        _loc9_ = asGuarded(getDefinitionByName(_loc7_), isClass);
                    }
                    if (_loc9_ == null) {
                        throw new InvalidComponentException("Identifier class defined in manifest not found: " + _loc7_);
                    }
                    _loc10_ = new _loc9_();
                    _loc19_ = isIUnknown(_loc21_) ? _loc21_ : null;
                    Component.getInterfaceStructList(_loc21_).insert(new InterfaceStruct(_loc10_, _loc21_));
                    _loc5_.push(_loc10_);
                    _loc15_++;
                }
                this.attachComponent(_loc21_, _loc5_);
            }
            _loc14_++;
        }
        return isIUnknown(_loc21_) ? _loc21_ : null;
    }

    public attachComponent(param1: Component, param2: any[]): void {
        let _loc6_: any = 0;
        let _loc4_: IID = null;
        let _loc3_: IID = null;
        if (this._SafeStr_2363 == null) {
            return;
        }
        if (this._SafeStr_2363.indexOf(param1) > -1) {
            this.error("Component " + param1 + " already attached to context!", false);
            return;
        }
        this._SafeStr_2363.push(param1);
        if (param1.locked) {
            param1.events.addEventListener("_INTERNAL_EVENT_UNLOCKED", this.unlockEventHandler);
        }
        let _loc5_: number = param2.length;
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc4_ = param2[_loc6_];
            if (Component.getInterfaceStructList(param1).find(_loc4_) == null) {
                Component.getInterfaceStructList(param1).insert(new InterfaceStruct(_loc4_, param1));
            }
            Component.getInterfaceStructList(this).insert(new InterfaceStruct(_loc4_, param1));
            _loc6_++;
        }
        if (!param1.locked) {
            _loc6_ = 0;
            while (_loc6_ < _loc5_) {
                _loc3_ = param2[_loc6_];
                if (this.hasQueueForInterface(_loc3_)) {
                    this.announceInterfaceAvailability(_loc3_, param1);
                }
                _loc6_++;
            }
        }
    }

    public detachComponent(param1: Component): void {
        let _loc2_: InterfaceStruct = null;
        let _loc4_: any = 0;
        let _loc5_: InterfaceStructList = Component.getInterfaceStructList(this);
        let _loc3_: number = _loc5_.getIndexByImplementor(param1);
        while (_loc3_ > -1) {
            _loc2_ = _loc5_.remove(_loc3_ >>> 0);
            _loc3_ = _loc5_.getIndexByImplementor(param1);
        }
        _loc4_ = 0;
        while (_loc4_ < this._SafeStr_2363.length) {
            if (this._SafeStr_2363[_loc4_] == param1) {
                this._SafeStr_2363.splice(_loc4_, 1);
                param1.events.removeEventListener("_INTERNAL_EVENT_UNLOCKED", this.unlockEventHandler);
                return;
            }
            _loc4_++;
        }
    }

    public override queueInterface(param1: IID, param2: (...args: any[]) => any = null): IUnknown {
        let _loc5_: IUnknown = null;
        let _loc4_: InterfaceStructList = Component.getInterfaceStructList(this);
        if (_loc4_ == null) {
            return null;
        }
        let _loc3_: InterfaceStruct = _loc4_.getStructByInterface(param1);
        if (_loc3_ != null) {
            if (_loc3_.unknown == this && _loc3_.iis == getQualifiedClassName(param1)) {
                return super.queueInterface(param1, param2);
            }
            _loc5_ = _loc3_.unknown.queueInterface(param1, param2);
            if (_loc5_) {
                return _loc5_;
            }
        }
        if (param2 != null) {
            this.addQueueeForInterface(param1, param2);
            if (this.context && this.context != this) {
                this.context.queueInterface(param1, this.announceInterfaceAvailability);
            }
        }
        return null;
    }

    protected addQueueeForInterface(param1: IID, param2: (...args: any[]) => any): void {
        let _loc3_: ComponentInterfaceQueue = null;
        if (this.hasQueueForInterface(param1)) {
            _loc3_ = this.getQueueForInterface(param1);
        } else {
            _loc3_ = new ComponentInterfaceQueue(param1);
            this._queuees.push(_loc3_);
        }
        _loc3_.receivers.unshift(param2);
    }

    protected hasQueueForInterface(param1: IID): boolean {
        let _loc4_: any = 0;
        if (this._queuees == null) {
            return false;
        }
        let _loc2_: string = getQualifiedClassName(param1);
        let _loc3_: number = this._queuees.length;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            if (getQualifiedClassName(this._queuees[_loc4_].identifier) == _loc2_) {
                return true;
            }
            _loc4_++;
        }
        return false;
    }

    protected getQueueForInterface(param1: IID): ComponentInterfaceQueue {
        let _loc5_: ComponentInterfaceQueue = null;
        let _loc4_: any = 0;
        let _loc2_: string = getQualifiedClassName(param1);
        let _loc3_: number = this._queuees.length;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc5_ = this._queuees[_loc4_];
            if (getQualifiedClassName(_loc5_.identifier) == _loc2_) {
                return _loc5_;
            }
            _loc4_++;
        }
        return null;
    }

    protected announceInterfaceAvailability(param1: IID, param2: Component): void {
        let _loc6_: IUnknown = null;
        let _loc4_: any = 0;
        let _loc5_: ComponentInterfaceQueue = this.getQueueForInterface(param1);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: number = _loc5_.receivers.length;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc6_ = param2.queueInterface(param1);
            if (_loc6_ == null) {
                this.error("Interface " + param1 + " still unavailable!", true, 6);
            }
            if (_loc5_.receivers != null) {
                _loc5_.receivers.pop()(param1, _loc6_);
            }
            _loc4_++;
        }
    }

    public override dispose(): void {
        let _loc2_: any = 0;
        let _loc1_: LibraryLoader = null;
        if (!this.disposed) {
            super.dispose();
            if (this._SafeStr_2363 != null) {
                _loc2_ = this._SafeStr_2363.length;
                while (_loc2_-- > 0) {
                    castGuarded(this._SafeStr_2363.pop(), isIUnknown, "com.sulake.core.runtime.IUnknown").dispose();
                }
                this._SafeStr_2363 = null;
            }
            if (this._queuees != null) {
                _loc2_ = this._queuees.length;
                while (_loc2_-- > 0) {
                    castGuarded(this._queuees.pop(), isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
                }
                this._queuees = null;
            }
            if (this._loaders != null) {
                _loc2_ = this._loaders.length;
                while (_loc2_-- > 0) {
                    _loc1_ = this._loaders[0];
                    this.removeLibraryLoader(_loc1_);
                    _loc1_.dispose();
                }
                this._loaders = null;
            }
        }
    }

    private unlockEventHandler(param1: LockEvent): void {
        let _loc2_: InterfaceStruct = null;
        let _loc4_: any[] = null;
        let _loc3_: Component = param1.unknown instanceof Component ? param1.unknown : null;
        if (!_loc3_.disposed) {
            _loc3_.events.removeEventListener("_INTERNAL_EVENT_UNLOCKED", this.unlockEventHandler);
        }
        if (!this.disposed) {
            _loc4_ = [];
            Component.getInterfaceStructList(this).mapStructsByImplementor(_loc3_, _loc4_);
            while (_loc4_.length && !_loc3_.disposed && !this.disposed) {
                _loc2_ = _loc4_.pop();
                this.announceInterfaceAvailability(_loc2_.iid, _loc3_);
            }
            this.root.events.dispatchEvent(new Event("COMPONENT_EVENT_UNLOCKED"));
        }
    }

    public override toXMLString(param1: number = 0): string {
        let _loc9_: any = 0;
        let _loc3_: InterfaceStruct = null;
        let _loc10_: any = 0;
        let _loc4_: Component = null;
        let _loc11_: any = 0;
        let _loc6_: string = "";
        _loc9_ = 0;
        while (_loc9_ < param1) {
            _loc6_ += "\t";
            _loc9_++;
        }
        let _loc7_: string = getQualifiedClassName(this);
        let _loc2_: string = "";
        _loc2_ += _loc6_ + "<context class=\"" + _loc7_ + "\" >\n";
        let _loc5_: any[] = [];
        let _loc8_: number = Component.getInterfaceStructList(this).mapStructsByImplementor(this, _loc5_);
        _loc10_ = 0;
        while (_loc10_ < _loc8_) {
            _loc3_ = _loc5_[_loc10_];
            _loc2_ += _loc6_ + "\t<interface iid=\"" + _loc3_.iis + "\" refs=\"" + _loc3_.references + "\"/>\n";
            _loc10_++;
        }
        _loc11_ = 0;
        while (_loc11_ < this._SafeStr_2363.length) {
            _loc4_ = asInstanceOf(this._SafeStr_2363[_loc11_], Component);
            if (_loc4_ != this) {
                _loc2_ += _loc4_.toXMLString(param1 + 1 >>> 0);
            }
            _loc11_++;
        }
        return _loc2_ + (_loc6_ + "</context>\n");
    }

    public set configuration(param1: ICoreConfiguration) {
        this._configuration = param1;
    }

    public get configuration(): ICoreConfiguration {
        return this._configuration;
    }

    public addLinkEventTracker(param1: ILinkEventTracker): void {
        if (this._linkEventTrackers.indexOf(param1) < 0) {
            this._linkEventTrackers.push(param1);
        }
    }

    public removeLinkEventTracker(param1: ILinkEventTracker): void {
        let _loc2_: number = this._linkEventTrackers.indexOf(param1);
        if (_loc2_ > -1) {
            this._linkEventTrackers.splice(_loc2_, 1);
        }
    }

    public createLinkEvent(param1: string): void {
        for (const _loc2_ of this._linkEventTrackers ?? []) {
            if (_loc2_.linkPattern.length > 0) {
                if (param1.substr(0, _loc2_.linkPattern.length) == _loc2_.linkPattern) {
                    _loc2_.linkReceived(param1);
                }
            } else {
                _loc2_.linkReceived(param1);
            }
        }
    }

    public get linkEventTrackers(): ILinkEventTracker[] {
        return this._linkEventTrackers;
    }

    protected override initInstanceFields(): void {
        this.loadReadyHandler = this.loadReadyHandler.bind(this);
        this.loadErrorHandler = this.loadErrorHandler.bind(this);
        this.loadDebugHandler = this.loadDebugHandler.bind(this);
        this.announceInterfaceAvailability = this.announceInterfaceAvailability.bind(this);
        this.unlockEventHandler = this.unlockEventHandler.bind(this);
        this.createLinkEvent = this.createLinkEvent.bind(this);
        this._linkEventTrackers = new Array<ILinkEventTracker>(0).fill(null);
        this._SafeStr_2363 = [];
        this._queuees = [];
        this._debug = false;
        this._displayObjectContainer = new Sprite();
        super.initInstanceFields();
    }

    get [IContext](): true {
        return true;
    }
}
