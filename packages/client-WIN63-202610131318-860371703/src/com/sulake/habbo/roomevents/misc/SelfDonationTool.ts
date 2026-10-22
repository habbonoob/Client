import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { SelfDonationResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/misc/SelfDonationResultMessageParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ISelfDonationTool } from '@/com/sulake/habbo/roomevents/misc/ISelfDonationTool';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { SelfDonationResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/misc/SelfDonationResultMessageEvent';
import { SelfDonateItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/misc/SelfDonateItemMessageComposer';
import { SelfDonationToolView } from '@/com/sulake/habbo/roomevents/misc/SelfDonationToolView';
import { UbuntuPresetManager } from '@/com/sulake/habbo/roomevents/wired_trading/UbuntuPresetManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';

export class SelfDonationTool extends Component implements ILinkEventTracker, ISelfDonationTool {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.misc::SelfDonationTool'); }

    private static readonly ALLOWED_ENVIRONMENT_IDS: any[] = ["s1", "s2", "d63", "dev", "local"];

    declare private _communication: IHabboCommunicationManager;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _presetManager: PresetManager;

    declare private _view: SelfDonationToolView;

    declare private _messageEvents: IMessageEvent[];

    declare private _disposed_SelfDonationTool: boolean;

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._roomEvents = param1;
        this._presetManager = new UbuntuPresetManager(param1);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }, true)]);
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
        this._messageEvents = [];
        this._messageEvents.push(new SelfDonationResultMessageEvent(this.onSelfDonationResult));
        for (const _loc1_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc1_);
        }
    }

    public get linkPattern(): string {
        return "selfdonation/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        if (_loc2_[1] == "open") {
            this.open();
        }
    }

    public open(): void {
        if (this._disposed_SelfDonationTool) {
            return;
        }
        if (!this.isSandboxEnvironment) {
            return;
        }
        this.ensureView();
        this._view.showTool();
    }

    public onDonate(param1: ChestItemType, param2: number): void {
        let _loc3_: string = this.validate(param1, param2);
        if (_loc3_ != null) {
            this._roomEvents.windowManager.alert("${wiredfurni.error.title}", _loc3_, 0, null);
            return;
        }
        if (this._communication == null || this._communication.connection == null) {
            this._roomEvents.windowManager.alert("${wiredfurni.error.title}", this.localization.getLocalization("selfdonation.no_connection", "Connection is not ready yet."), 0, null);
            return;
        }
        this._communication.connection.send(new SelfDonateItemMessageComposer(param1.isWallItem, param1.typeId, param1.legacyPosterId, param2));
    }

    private onSelfDonationResult(param1: SelfDonationResultMessageEvent): void {
        let _loc3_: string = null;
        let _loc6_: string = null;
        let _loc2_: SelfDonationResultMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        switch (_loc2_.resultCode) {
            case 0:
                _loc3_ = "selfdonation.result.success";
                _loc6_ = "selfdonation.success";
                break;
            case 1:
                _loc3_ = "selfdonation.result.not_allowed";
                _loc6_ = "selfdonation.fail";
                break;
            default:
                _loc3_ = "selfdonation.result.failed";
                _loc6_ = "selfdonation.fail";
        }
        let _loc4_: string = this.localization.getLocalization(_loc6_, _loc6_);
        let _loc5_: string = this.localization.getLocalization(_loc3_, _loc3_);
        this._roomEvents.windowManager.alert(_loc4_, _loc5_, 0, null);
    }

    private validate(param1: ChestItemType, param2: number): string {
        if (!this.isSandboxEnvironment) {
            return this.sandboxWarningText;
        }
        if (param1 == null) {
            return this.localization.getLocalization("selfdonation.select_item", "Select a furniture item first.");
        }
        if (param2 < 1 || param2 > 500) {
            return this.localization.getLocalizationWithParams("selfdonation.invalid_amount", "Please enter an amount between 1 and %max%.", "max", 500);
        }
        let _loc3_: IFurnitureData = this.getFurnitureData(param1);
        if (_loc3_ == null) {
            return this.localization.getLocalization("selfdonation.invalid_item", "This item cannot be donated from the sandbox tool.");
        }
        return null;
    }

    private getFurnitureData(param1: ChestItemType): IFurnitureData {
        if (this._roomEvents == null || this._roomEvents.sessionDataManager == null || param1 == null) {
            return null;
        }
        if (param1.isWallItem) {
            return this._roomEvents.sessionDataManager.getWallItemData(param1.typeId);
        }
        return this._roomEvents.sessionDataManager.getFloorItemData(param1.typeId);
    }

    private ensureView(): void {
        if (this._view == null) {
            this._view = new SelfDonationToolView(this, this._presetManager);
        }
    }

    private get sandboxWarningText(): string {
        return this.localization.getLocalization("selfdonation.sandbox_only", "Self donation only works in the sandbox environment.");
    }

    public get roomEvents(): HabboUserDefinedRoomEvents {
        return this._roomEvents;
    }

    private get localization(): IHabboLocalizationManager {
        return this._roomEvents.localization;
    }

    public get isSandboxEnvironment(): boolean {
        let _loc1_: string = this.getProperty("environment.id");
        return SelfDonationTool.ALLOWED_ENVIRONMENT_IDS.indexOf(_loc1_) != -1;
    }

    public override dispose(): void {
        if (this._disposed_SelfDonationTool) {
            return;
        }
        this._disposed_SelfDonationTool = true;
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._presetManager = null;
        this._roomEvents = null;
        this._communication = null;
        super.dispose();
    }

    public override get disposed(): boolean {
        return this._disposed_SelfDonationTool;
    }

    private addMessageEvent(param1: IMessageEvent): void {
        if (this._communication != null) {
            this._communication.addHabboConnectionMessageEvent(param1);
        }
    }

    private removeMessageEvent(param1: IMessageEvent): void {
        if (this._communication != null) {
            this._communication.removeHabboConnectionMessageEvent(param1);
        }
    }

    protected override initInstanceFields(): void {
        this.onSelfDonationResult = this.onSelfDonationResult.bind(this);
        this._disposed_SelfDonationTool = false;
        super.initInstanceFields();
    }
}
