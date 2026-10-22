import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { InterfaceStruct } from '@/com/sulake/core/runtime/InterfaceStruct';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AssetLibrary, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { LockEvent } from '@/com/sulake/core/runtime/events/LockEvent';
import { ComponentDisposedException } from '@/com/sulake/core/runtime/exceptions/ComponentDisposedException';
import { InvalidComponentException } from '@/com/sulake/core/runtime/exceptions/InvalidComponentException';
import { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { InterfaceStructList } from '@/com/sulake/core/runtime/InterfaceStructList';
import { IUnknown, isIUnknown } from '@/com/sulake/core/runtime/IUnknown';
import { ClassUtils } from '@/com/sulake/core/utils/ClassUtils';

export class Component implements IUnknown, ICoreConfiguration {
    static { registerClassName(this, 'com.sulake.core.runtime::Component'); }

    public static readonly COMPONENT_EVENT_RUNNING: string = "COMPONENT_EVENT_RUNNING";
    public static readonly COMPONENT_EVENT_DISPOSING: string = "COMPONENT_EVENT_DISPOSING";
    public static readonly COMPONENT_EVENT_WARNING: string = "COMPONENT_EVENT_WARNING";
    public static readonly COMPONENT_EVENT_ERROR: string = "COMPONENT_EVENT_ERROR";
    public static readonly COMPONENT_EVENT_DEBUG: string = "COMPONENT_EVENT_DEBUG";
    public static readonly COMPONENT_EVENT_UNLOCKED: string = "COMPONENT_EVENT_UNLOCKED";
    public static readonly COMPONENT_EVENT_REBOOT: string = "COMPONENT_EVENT_REBOOT";
    protected static readonly INTERNAL_EVENT_UNLOCKED: string = "_INTERNAL_EVENT_UNLOCKED";
    public static readonly COMPONENT_FLAG_NULL: number = 0;
    public static readonly COMPONENT_FLAG_INTERFACE: number = 1;
    public static readonly COMPONENT_FLAG_CONTEXT: number = 2;
    public static readonly COMPONENT_FLAG_DISPOSABLE: number = 4;
    protected _references: number = 0;
    protected _lastError: string = "";
    protected _SafeStr_7216: string = "";
    protected _SafeStr_5846: string = "";

    declare private _assets: IAssetLibrary;

    declare private _events: EventDispatcherWrapper;

    declare private _flags: number;
    static { (this.prototype as any)._flags = 0; }

    declare private _SafeStr_2969: InterfaceStructList;

    private _context: IContext = null;
    private _disposed: boolean = false;
    private _SafeStr_3562: boolean = false;
    private _SafeStr_3696: number = 1;

    declare private _requiredDependencyIids: string[];

    private _SafeStr_4389: ((...args: any[]) => any)[] = new Array<(...args: any[]) => any>(0).fill(null);

    /**
     * Passed as the context by a context that is its own context (CoreComponentContext): AS3 passed
     * `this`, which JS does not have before super().
     */
    public static readonly OWN_CONTEXT: IContext = Object.freeze({}) as IContext;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        this.initInstanceFields();
        this._flags = param2;
        this._SafeStr_2969 = new InterfaceStructList();
        this._events = new EventDispatcherWrapper();
        this._context = param1 === Component.OWN_CONTEXT ? (this as unknown as IContext) : param1;
        this._assets = param3 ?? new AssetLibrary("_internal_asset_library");
        if (this._context == null) {
            throw new InvalidComponentException("IContext not provided to Component\'s constructor!");
        }
        if (this.dependencies.length > 0) {
            this.lock();
        }
        this._requiredDependencyIids = new Array<string>(0).fill(null);
        for (const _loc4_ of this.dependencies ?? []) {
            if (_loc4_.isRequired) {
                this._requiredDependencyIids.push(ClassUtils.getSimpleQualifiedClassName(_loc4_.identifier));
            }
            this.injectDependency(_loc4_.identifier, _loc4_.dependencySetter, _loc4_.isRequired, _loc4_.eventListeners);
        }
        this.allDependenciesRequested();
    }

    public static getInterfaceStructList(param1: Component): InterfaceStructList {
        return param1._SafeStr_2969;
    }

    public get locked(): boolean {
        return this._SafeStr_3562;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get context(): IContext {
        return this._context;
    }

    public get events(): IEventDispatcher {
        return this._events;
    }

    public get assets(): IAssetLibrary {
        return this._assets;
    }

    private injectDependency(param1: IID, param2: (...args: any[]) => any, param3: boolean, param4: any[]): void {
        let identifier: IID = param1;
        let dependencySetter: (...args: any[]) => any = param2;
        let isRequired: boolean = param3;
        let eventListeners: any[] = param4;
        if (isRequired) {
            this._SafeStr_3696 = this._SafeStr_3696 + 1;
        }
        this.queueInterface(identifier, ((param1: (...args: any[]) => any, param2: boolean, param3: any[], param4: string): (...args: any[]) => any => {
             let setter: (...args: any[]) => any = param1;
             let required: boolean = param2;
             let listeners: any[] = param3;
             let componentName: string = param4;
             return (param1: IID, param2: IUnknown): void => {
                let eventDispatcher: IEventDispatcher;
                let listener: any;
                let identifier: IID = param1;
                let unknown: IUnknown = param2;
                if (this.disposed) {
                    return;
                }
                if (setter != null) {
                    setter(unknown);
                }
                if (listeners != null) {
                    eventDispatcher = castTo(unknown, Component).events;
                    for (listener of listeners ?? []) {
                        eventDispatcher.addEventListener(listener.type, listener.callback);
                    }
                }
                this._SafeStr_4389.push(((param1: IID, param2: IUnknown): (...args: any[]) => any => {
                   let iid: IID = param1;
                   let component: IUnknown = param2;
                   return (): void => {
                      let _loc2_: IEventDispatcher = null;
                      if (listeners != null) {
                          _loc2_ = castTo(component, Component).events;
                          if (_loc2_ != null) {
                              for (const _loc1_ of listeners ?? []) {
                                  _loc2_.removeEventListener(_loc1_.type, _loc1_.callback);
                              }
                          }
                      }
                      if (setter != null) {
                          setter(null);
                      }
                      component.release(iid);
                  };
               })(identifier, unknown));
                if (required) {
                    this.allDependenciesRequested(ClassUtils.getSimpleQualifiedClassName(identifier));
                }
            };
         })(dependencySetter, isRequired, eventListeners, ClassUtils.getSimpleQualifiedClassName(this)));
    }

    private allDependenciesRequested(param1: string = ""): void {
        this._SafeStr_3696 = this._SafeStr_3696 - 1;
        if (param1 != "" && this._requiredDependencyIids.indexOf(param1) > -1) {
            this._requiredDependencyIids.splice(this._requiredDependencyIids.indexOf(param1), 1);
        }
        if (this._SafeStr_3696 == 0) {
            this.initComponent();
            this.unlock();
        }
    }

    protected get allRequiredDependenciesInjected(): boolean {
        return this._SafeStr_3696 == 0;
    }

    protected get dependencies(): ComponentDependency[] {
        return new Array<ComponentDependency>(0).fill(null);
    }

    protected initComponent(): void {
    }

    public queueInterface(param1: IID, param2: (...args: any[]) => any = null): IUnknown {
        let _loc3_: InterfaceStruct = this._SafeStr_2969.getStructByInterface(param1);
        if (_loc3_ == null) {
            return this._context.queueInterface(param1, param2);
        }
        if (this._disposed) {
            throw new ComponentDisposedException("Failed to queue interface trough disposed Component \"" + ClassUtils.getSimpleQualifiedClassName(this) + "\"!");
        }
        if (this._SafeStr_3562) {
            return null;
        }
        _loc3_.reserve();
        let _loc4_: IUnknown = asGuarded(_loc3_.unknown, isIUnknown);
        if (param2 != null) {
            param2(param1, _loc4_);
        }
        return _loc4_;
    }

    public release(param1: IID): number {
        if (this._disposed) {
            return 0;
        }
        let _loc2_: InterfaceStruct = this._SafeStr_2969.getStructByInterface(param1);
        if (_loc2_ == null) {
            this._lastError = "Attempting to release unknown interface:" + param1 + "!";
            throw new Error(this._lastError);
        }
        let _loc3_: number = _loc2_.release();
        if (this._flags & 4) {
            if (_loc3_ == 0) {
                if (this._SafeStr_2969.getTotalReferenceCount() == 0) {
                    this._context.detachComponent(this);
                    this.dispose();
                }
            }
        }
        return _loc3_;
    }

    public dispose(): void {
        if (!this._disposed) {
            for (const _loc1_ of this._SafeStr_4389 ?? []) {
                _loc1_();
            }
            this._SafeStr_4389 = null;
            this._events.dispatchEvent(new Event("COMPONENT_EVENT_DISPOSING"));
            this._events = null;
            this._SafeStr_2969.dispose();
            this._SafeStr_2969 = null;
            this._assets.dispose();
            this._assets = null;
            this._context = null;
            this._references = 0;
            this._disposed = true;
        }
    }

    public purge(): void {
    }

    protected lock(): void {
        if (!this._SafeStr_3562) {
            this._SafeStr_3562 = true;
        }
    }

    protected unlock(): void {
        if (this._SafeStr_3562) {
            this._SafeStr_3562 = false;
            this._events.dispatchEvent(new LockEvent("_INTERNAL_EVENT_UNLOCKED", this));
        }
    }

    public toString(): string {
        return "[component " + ClassUtils.getSimpleQualifiedClassName(this) + " refs: " + this._references + "]";
    }

    public toXMLString(param1: number = 0): string {
        let _loc7_: any = 0;
        let _loc3_: InterfaceStruct = null;
        let _loc8_: any = 0;
        let _loc4_: string = "";
        _loc7_ = 0;
        while (_loc7_ < param1) {
            _loc4_ += "\t";
            _loc7_++;
        }
        let _loc5_: string = getQualifiedClassName(this);
        let _loc2_: string = "";
        _loc2_ += _loc4_ + "<component class=\"" + _loc5_ + "\">\n";
        let _loc6_: number = this._SafeStr_2969.length;
        _loc8_ = 0;
        while (_loc8_ < _loc6_) {
            _loc3_ = this._SafeStr_2969.getStructByIndex(_loc8_ >>> 0);
            _loc2_ += _loc4_ + "\t<interface iid=\"" + _loc3_.iis + "\" refs=\"" + _loc3_.references + "\"/>\n";
            _loc8_++;
        }
        return _loc2_ + (_loc4_ + "</component>\n");
    }

    public get requiredDependencyIids(): string[] {
        return this._requiredDependencyIids;
    }

    public registerUpdateReceiver(param1: IUpdateReceiver, param2: number): void {
        if (!this._disposed) {
            this._context.registerUpdateReceiver(param1, param2);
        }
    }

    public removeUpdateReceiver(param1: IUpdateReceiver): void {
        if (!this._disposed) {
            this._context.removeUpdateReceiver(param1);
        }
    }

    public get flags(): number {
        return this._flags;
    }

    public propertyExists(param1: string): boolean {
        return this._context.configuration ? this._context.configuration.propertyExists(param1) : false;
    }

    public getProperty(param1: string, param2: Map<any, any> = null): string {
        return this._context.configuration ? this._context.configuration.getProperty(param1, param2) : "";
    }

    public setProperty(param1: string, param2: string, param3: boolean = false, param4: boolean = false): void {
        if (this._context.configuration) {
            this._context.configuration.setProperty(param1, param2, param3, param4);
        }
    }

    public getBoolean(param1: string): boolean {
        return this._context.configuration ? this._context.configuration.getBoolean(param1) : false;
    }

    public getInteger(param1: string, param2: number): number {
        return this._context.configuration ? this._context.configuration.getInteger(param1, param2) : 0;
    }

    public interpolate(param1: string): string {
        return this._context.configuration ? this._context.configuration.interpolate(param1) : "";
    }

    public updateUrlProtocol(param1: string): string {
        return this._context.configuration ? this._context.configuration.updateUrlProtocol(param1) : "";
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IUnknown](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [ICoreConfiguration](): true {
        return true;
    }
}
