import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { WiredContractContentsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageParser';
import type { WiredContractUpdateResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredContractUpdateResultMessageParser';
import type { WiredOpenContractMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/contracts/WiredOpenContractMessageParser';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IWiredContractController } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/IWiredContractController';
import type { AbstractContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/util/AbstractContract';
import type { WiredContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/WiredContract';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WiredContractContentsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/contracts/WiredContractContentsMessageEvent';
import { WiredContractUpdateResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/contracts/WiredContractUpdateResultMessageEvent';
import { WiredOpenContractMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/contracts/WiredOpenContractMessageEvent';
import { WiredOpenContractMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/contracts/WiredOpenContractMessageComposer';
import { WiredUpdateContractMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/contracts/WiredUpdateContractMessageComposer';
import { AddEditContractElement } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/AddEditContractElement';
import { PaymentContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/PaymentContract';
import { RewardContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/RewardContract';
import { TradeContract } from '@/com/sulake/habbo/roomevents/wired_trading/contracts/subcontrollers/TradeContract';
import { UbuntuPresetManager } from '@/com/sulake/habbo/roomevents/wired_trading/UbuntuPresetManager';

export class WiredContractController implements IWiredContractController {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.contracts::WiredContractController'); }

    private _disposed: boolean = false;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _presetManager: PresetManager;

    declare private _messageEvents: IMessageEvent[];

    private _SafeStr_4480: number = -1;

    declare private _SafeStr_2899: AddEditContractElement;

    declare private _SafeStr_2911: PaymentContract;

    declare private _SafeStr_2872: RewardContract;

    declare private _SafeStr_2843: TradeContract;

    private _xCache: number = 2147483647;
    private _yCache: number = 2147483647;

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        this._presetManager = new UbuntuPresetManager(param1);
        this._messageEvents = [];
        this._messageEvents.push(new WiredOpenContractMessageEvent(this.onOpenContract));
        this._messageEvents.push(new WiredContractContentsMessageEvent(this.onContractContents));
        this._messageEvents.push(new WiredContractUpdateResultMessageEvent(this.onContractUpdateResult));
        for (const _loc2_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc2_);
        }
    }

    private onOpenContract = (param1: WiredOpenContractMessageEvent): void => {
        let _loc2_: WiredOpenContractMessageParser = param1.getParser();
        this._SafeStr_4480 = _loc2_.contractId;
        this.communicationManager.connection.send(new WiredOpenContractMessageComposer(this._SafeStr_4480));
    };

    private onContractContents = (param1: WiredContractContentsMessageEvent): void => {
        let _loc2_: WiredContractContentsMessageParser = param1.getParser();
        if (_loc2_.contractId != this._SafeStr_4480) {
            return;
        }
        this._SafeStr_4480 = -1;
        this.closeAllOpenFrames();
        let _loc3_: WiredContract = null;
        if (_loc2_.contractType == 0) {
            if (this._SafeStr_2911 == null) {
                this._SafeStr_2911 = new PaymentContract(this, this._presetManager);
            }
            this._SafeStr_2911.show(_loc2_);
            _loc3_ = this._SafeStr_2911;
        } else if (_loc2_.contractType == 1) {
            if (this._SafeStr_2843 == null) {
                this._SafeStr_2843 = new TradeContract(this, this._presetManager);
            }
            this._SafeStr_2843.show(_loc2_);
            _loc3_ = this._SafeStr_2843;
        } else if (_loc2_.contractType == 2) {
            if (this._SafeStr_2872 == null) {
                this._SafeStr_2872 = new RewardContract(this, this._presetManager);
            }
            this._SafeStr_2872.show(_loc2_);
            _loc3_ = this._SafeStr_2872;
        }
        if (_loc3_ != null && !(this._yCache == 2147483647 || this._xCache == 2147483647)) {
            _loc3_.window.y = this._yCache;
            _loc3_.window.x = this._xCache;
        }
    };

    public saveContract(param1: AbstractContract): void {
        let _loc3_: string = param1.validate();
        if (_loc3_ != null) {
            this._roomEvents.windowManager.alert("${wiredfurni.error.title}", _loc3_, 0, null);
            return;
        }
        let _loc2_: any[] = [];
        param1.addContentsToComposer(_loc2_);
        this.communicationManager.connection.send(new WiredUpdateContractMessageComposer(_loc2_));
    }

    private onContractUpdateResult = (param1: WiredContractUpdateResultMessageEvent): void => {
        let _loc4_: string = null;
        let _loc3_: string = null;
        let _loc2_: WiredContractUpdateResultMessageParser = param1.getParser();
        if (_loc2_.isSuccess) {
            this.closeAllOpenFrames();
            return;
        }
        _loc4_ = "wiredcontracts.error." + _loc2_.failCode;
        _loc3_ = this._roomEvents.localization.getLocalizationWithParams(_loc4_, _loc4_);
        this._roomEvents.windowManager.alert("${wiredfurni.error.title}", _loc3_, 0, null);
    };

    public clear(): void {
        this.closeAllOpenFrames();
        this._xCache = 2147483647;
        this._yCache = 2147483647;
        if (this._SafeStr_2899 != null) {
            this._SafeStr_2899.forgetLocation();
        }
    }

    public closeAllOpenFrames(): void {
        if (this._SafeStr_2899) {
            this._SafeStr_2899.hide();
        }
        if (this._SafeStr_2911 && this._SafeStr_2911.isShowing()) {
            this._SafeStr_2911.hide();
        } else if (this._SafeStr_2872 && this._SafeStr_2872.isShowing()) {
            this._SafeStr_2872.hide();
        } else if (this._SafeStr_2843 && this._SafeStr_2843.isShowing()) {
            this._SafeStr_2843.hide();
        }
    }

    public cacheWindowLocation(param1: IWindow): void {
        this._yCache = param1.y;
        this._xCache = param1.x;
    }

    public get addEditContractElement(): AddEditContractElement {
        if (this._SafeStr_2899 == null) {
            this._SafeStr_2899 = new AddEditContractElement(this, this._presetManager);
        }
        return this._SafeStr_2899;
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._roomEvents.communication;
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this.communicationManager) {
            return;
        }
        this.communicationManager.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this.communicationManager) {
            return;
        }
        this.communicationManager.removeHabboConnectionMessageEvent(param1);
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_2899 != null) {
            this._SafeStr_2899.dispose();
            this._SafeStr_2899 = null;
        }
        if (this._SafeStr_2843 != null) {
            this._SafeStr_2843.dispose();
            this._SafeStr_2843 = null;
        }
        if (this._SafeStr_2872 != null) {
            this._SafeStr_2872.dispose();
            this._SafeStr_2872 = null;
        }
        if (this._SafeStr_2911 != null) {
            this._SafeStr_2911.dispose();
            this._SafeStr_2911 = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._presetManager = null;
        this._roomEvents = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
