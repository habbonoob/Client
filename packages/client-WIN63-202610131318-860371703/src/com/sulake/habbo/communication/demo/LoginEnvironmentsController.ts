import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IDropListWindow } from '@/com/sulake/core/window/components/IDropListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { ICoreWindowManager } from '@/com/sulake/core/window/ICoreWindowManager';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { IOErrorEvent } from '@habbo-pixi/runtime/events/IOErrorEvent';
import type { ProgressEvent } from '@habbo-pixi/runtime/events/ProgressEvent';
import type { SecurityErrorEvent } from '@habbo-pixi/runtime/events/SecurityErrorEvent';
import { Socket } from '@habbo-pixi/runtime/net/Socket';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';

export class LoginEnvironmentsController extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.communication.demo::LoginEnvironmentsController'); }

    public static readonly ENVIRONMENT_SELECTED_EVENT: string = "ENVIRONMENT_SELECTED_EVENT";

    declare private _SafeStr_3665: ICoreConfiguration;

    declare private _windowManager: ICoreWindowManager;

    declare private _SafeStr_5776: IAssetLibrary;

    declare private _SafeStr_6685: IWindow;

    declare private _SafeStr_3144: number;
    static { (this.prototype as any)._SafeStr_3144 = 0; }

    declare private _SafeStr_2583: IDropListWindow;

    declare private _selectedEnvironment: string;

    constructor(param1: IDropListWindow, param2: ICoreConfiguration, param3: ICoreWindowManager, param4: IAssetLibrary) {
        super();
        this._SafeStr_3665 = param2;
        this._windowManager = param3;
        this._SafeStr_5776 = param4;
        this._SafeStr_2583 = param1;
        this.init();
    }

    public get selectedEnvironment(): string {
        return this._selectedEnvironment;
    }

    public override dispose(): void {
        this._SafeStr_2583 = null;
        super.dispose();
    }

    private getAvailableEnvironments(): any[] {
        return this._SafeStr_3665.getProperty("live.environment.list").split("/");
    }

    private createListItem(param1: string): IWindow {
        let _loc2_: XmlAsset = asInstanceOf(this._SafeStr_5776.getAssetByName(param1), XmlAsset);
        return this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML));
    }

    private init(): void {
        let _loc5_: number = 0;
        let _loc6_: IWindowContainer = null;
        this._SafeStr_6685 = this.createListItem("login_environment_list_item");
        let _loc3_: any[] = this.getAvailableEnvironments();
        let _loc1_: string = CommunicationUtils.readSOLString("environment");
        _loc1_ = _loc1_ == null ? "d63" : _loc1_;
        let _loc4_: any[] = this.getEnvironmentNames(_loc3_);
        this._selectedEnvironment = _loc1_;
        let _loc7_: number = this._SafeStr_2583.numMenuItems;
        _loc5_ = 0;
        while (_loc5_ < _loc7_) {
            this._SafeStr_2583.removeMenuItemAt(0);
            _loc5_++;
        }
        for (const _loc2_ of _loc4_ ?? []) {
            _loc6_ = asGuarded(this._SafeStr_6685.clone(), isIWindowContainer);
            _loc6_.findChildByName("title").caption = stringOrNull(_loc2_);
            this._SafeStr_2583.addMenuItem(_loc6_);
        }
        this._SafeStr_2583.selection = _loc3_.indexOf(_loc1_);
        this._SafeStr_2583.procedure = this.dropMenuEventHandler;
        this._SafeStr_3144 = -1;
        this.testEnvironmentAvailable(false);
    }

    private testEnvironmentAvailable(param1: boolean): void {
        let environmentIds: any[];
        let window: IWindowContainer;
        let environment: string;
        let host: string;
        let ports: any[];
        let socket: Socket;
        let lastEnvironmentConnected: boolean = param1;
        if (this._disposed || this._SafeStr_2583 == null || Boolean(this._SafeStr_2583.disposed)) {
            return;
        }
        environmentIds = this.getAvailableEnvironments();
        if (this._SafeStr_2583 && this._SafeStr_3144 > -1 && this._SafeStr_3144 < this._SafeStr_2583.numMenuItems) {
            window = asGuarded(this._SafeStr_2583.getMenuItemAt(this._SafeStr_3144), isIWindowContainer);
            (asGuarded(window.findChildByName("icon"), isIStaticBitmapWrapperWindow)).assetUri = lastEnvironmentConnected ? "help_accept_icon" : "help_decline_icon";
        }
        this._SafeStr_3144 = this._SafeStr_3144 + 1;
        if (this._SafeStr_3144 >= environmentIds.length) {
            return;
        }
        environment = stringOrNull(environmentIds[this._SafeStr_3144]);
        host = this._SafeStr_3665.getProperty("connection.info.host." + environment);
        ports = this._SafeStr_3665.getProperty("connection.info.port." + environment).split(",");
        socket = new Socket();
        socket.addEventListener("connect", (param1: Event): void => {
             (asInstanceOf(param1.target, Socket)).close();
             this.testEnvironmentAvailable(true);
         });
        socket.addEventListener("complete", (param1: Event): void => {
             (asInstanceOf(param1.target, Socket)).close();
         });
        socket.addEventListener("close", (param1: Event): void => {
             (asInstanceOf(param1.target, Socket)).close();
         });
        socket.addEventListener("socketData", (param1: ProgressEvent): void => {
             (asInstanceOf(param1.target, Socket)).close();
         });
        socket.addEventListener("securityError", (param1: SecurityErrorEvent): void => {
             (asInstanceOf(param1.target, Socket)).close();
             this.testEnvironmentAvailable(false);
         });
        socket.addEventListener("ioError", (param1: IOErrorEvent): void => {
             (asInstanceOf(param1.target, Socket)).close();
             this.testEnvironmentAvailable(false);
         });
        socket.connect(host, ports[0] | 0);
    }

    private getEnvironmentNames(param1: any[]): any[] {
        let _loc3_: any[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push(this.getEnvironmentName(stringOrNull(_loc2_)));
        }
        return _loc3_;
    }

    public getEnvironmentName(param1: string): string {
        let _loc3_: string = param1;
        let _loc2_: string = "connection.info.name." + param1;
        if (this._SafeStr_3665.propertyExists(_loc2_)) {
            _loc3_ = this._SafeStr_3665.getProperty(_loc2_);
        } else {
            Logger.log("Could not find name for environment: " + param1);
        }
        return _loc3_;
    }

    private dropMenuEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_SELECTED") {
            return;
        }
        let _loc4_: any[] = this.getAvailableEnvironments();
        let _loc5_: number = this._SafeStr_2583.selection;
        let _loc3_: string = stringOrNull(_loc4_[_loc5_]);
        this._selectedEnvironment = _loc3_;
        this.dispatchEvent(new Event("ENVIRONMENT_SELECTED_EVENT"));
        param1.stopPropagation();
        param1.stopImmediatePropagation();
    };
}
