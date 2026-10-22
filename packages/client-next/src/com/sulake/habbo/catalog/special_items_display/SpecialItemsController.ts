import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { ISpecialItemsDisplay } from '@/com/sulake/habbo/catalog/special_items_display/ISpecialItemsDisplay';
import type { SpecialItem } from '@/com/sulake/habbo/catalog/special_items_display/model/SpecialItem';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { HasClaimedProductResponseParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/HasClaimedProductResponseParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { FurniSpecialItem } from '@/com/sulake/habbo/catalog/special_items_display/model/FurniSpecialItem';
import { SpecialItemsView } from '@/com/sulake/habbo/catalog/special_items_display/SpecialItemsView';
import { HasClaimedProductResponseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/peerservice/HasClaimedProductResponseMessageEvent';
import { ClaimProductMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/peerservice/ClaimProductMessageComposer';
import { HasClaimedProductMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/peerservice/HasClaimedProductMessageComposer';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class SpecialItemsController extends Component implements ILinkEventTracker, ISpecialItemsDisplay {
    static { registerClassName(this, 'com.sulake.habbo.catalog.special_items_display::SpecialItemsController'); }

    public static readonly ITEM_TYPE_FURNI: string = "furni";
    public static readonly CLAIM_STATE_NOT_APPLICABLE: number = 0;
    public static readonly CLAIM_STATE_FETCHING: number = 1;
    public static readonly CLAIM_STATE_BROWSING: number = 2;
    public static readonly CLAIM_STATE_CLAIMABLE: number = 3;
    public static readonly CLAIM_STATE_CLAIMED: number = 4;

    declare private _catalog: HabboCatalog;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _messageEvents: IMessageEvent[];

    declare private _key: string;

    declare private _items: SpecialItem[];

    declare private _freeClaim: string;

    declare private _claimState: number;

    declare private _view: SpecialItemsView;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1 instanceof HabboCatalog ? param1 : null;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         })]);
    }

    protected override initComponent(): void {
        this.context.addLinkEventTracker(this);
        this._messageEvents = [];
        this._messageEvents.push(new HasClaimedProductResponseMessageEvent(this.onHasClaimedProductResponse));
        for (const _loc1_ of this._messageEvents ?? []) {
            this.addMessageEvent(_loc1_);
        }
    }

    private onHasClaimedProductResponse(param1: HasClaimedProductResponseMessageEvent): void {
        let _loc2_: HasClaimedProductResponseParser = param1.getParser();
        if (_loc2_.claimId == this._freeClaim && this._claimState == 1) {
            this._claimState = _loc2_.hasClaimed ? 4 : 2;
            if (this._view != null && this._view.isShowing()) {
                this._view.updateClaimState();
            }
        }
    }

    public makeClaimable(): void {
        if (this._freeClaim == null || this._freeClaim.length == 0) {
            return;
        }
        if (this._claimState != 2) {
            return;
        }
        this._claimState = 3;
        if (this._view != null && this._view.isShowing()) {
            this._view.updateClaimState();
        }
    }

    public makeClaim(): void {
        if (this._freeClaim == null || this._freeClaim.length == 0) {
            return;
        }
        if (this._claimState != 3 && this._claimState != 2) {
            return;
        }
        this._communication.connection.send(new ClaimProductMessageComposer(this._freeClaim));
        this._claimState = 4;
        if (this._view != null && this._view.isShowing()) {
            this._view.updateClaimState();
        }
    }

    public get linkPattern(): string {
        return "special_items_display/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length < 2) {
            return;
        }
        this._key = stringOrNull(_loc2_[1]);
        this.initialize();
    }

    public initialize(): void {
        if (this.parseSpecialItems()) {
            if (this._freeClaim != null && this._freeClaim.length > 0) {
                this._claimState = 1;
                this._communication.connection.send(new HasClaimedProductMessageComposer(this._freeClaim));
            } else {
                this._claimState = 0;
            }
            this.openView();
        }
    }

    private parseSpecialItems(): boolean {
        let _loc2_: any[] = null;
        let _loc3_: string = null;
        let _loc9_: string = null;
        let _loc4_: string = null;
        let _loc5_: SpecialItem = null;
        let _loc7_: SpecialItem[] = [];
        let _loc8_: string = this.getProperty("special_items." + this._key + ".items");
        let _loc6_: number = 0;
        let _loc10_: any[] = _loc8_.split(";");
        for (const _loc1_ of _loc10_ ?? []) {
            _loc2_ = _loc1_.split(",", 3);
            _loc3_ = stringOrNull(_loc2_[0]);
            _loc9_ = stringOrNull(_loc2_[1]);
            _loc4_ = stringOrNull(_loc2_[2]);
            _loc5_ = null;
            let _loc11_: string = _loc9_;
            if ("furni" === _loc11_) {
                _loc5_ = new FurniSpecialItem(_loc6_, this._key, _loc3_, this, _loc4_);
            }
            if (_loc5_ != null && _loc5_.isValid) {
                _loc7_.push(_loc5_);
                _loc6_ += 1;
            }
        }
        this._items = _loc7_;
        this._freeClaim = this.getProperty("special_items." + this._key + ".free_claim");
        return _loc7_.length > 0;
    }

    private openView(): void {
        if (this._view == null) {
            this._view = new SpecialItemsView(this, this._windowManager);
        }
        this._view.displayNewData();
        if (!this._view.isShowing()) {
            this._view.show();
        }
    }

    public addMessageEvent(param1: IMessageEvent): void {
        if (!this._communication) {
            return;
        }
        this._communication.addHabboConnectionMessageEvent(param1);
    }

    public removeMessageEvent(param1: IMessageEvent): void {
        if (!this._communication) {
            return;
        }
        this._communication.removeHabboConnectionMessageEvent(param1);
    }

    public get catalog(): HabboCatalog {
        return this._catalog;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get key(): string {
        return this._key;
    }

    public get items(): SpecialItem[] {
        return this._items;
    }

    public get claimState(): number {
        return this._claimState;
    }

    public get view(): SpecialItemsView {
        return this._view;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this.removeMessageEvent(_loc1_);
        }
        this._catalog = null;
        this._sessionDataManager = null;
        this._communication = null;
        this._windowManager = null;
        this._localizationManager = null;
        this._roomEngine = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onHasClaimedProductResponse = this.onHasClaimedProductResponse.bind(this);
        this._claimState = 0;
        super.initInstanceFields();
    }
}
