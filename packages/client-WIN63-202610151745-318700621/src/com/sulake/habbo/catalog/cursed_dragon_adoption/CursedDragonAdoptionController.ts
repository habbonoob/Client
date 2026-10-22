import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { ClaimProductResultParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/ClaimProductResultParser';
import type { HasClaimedProductResponseParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/HasClaimedProductResponseParser';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { CursedDragonAdoptionView } from '@/com/sulake/habbo/catalog/cursed_dragon_adoption/CursedDragonAdoptionView';
import { ClaimProductResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/peerservice/ClaimProductResultMessageEvent';
import { HasClaimedProductResponseMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/peerservice/HasClaimedProductResponseMessageEvent';
import { ClaimProductMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/peerservice/ClaimProductMessageComposer';
import { HasClaimedProductMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/peerservice/HasClaimedProductMessageComposer';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';

export class CursedDragonAdoptionController extends Component implements ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.catalog.cursed_dragon_adoption::CursedDragonAdoptionController'); }

    public static readonly _SafeStr_14838: number = 0;
    public static readonly _SafeStr_14839: number = 1;
    public static readonly CLAIM_STATE_UNKNOWN: number = 0;
    public static readonly CLAIM_STATE_FETCHING: number = 1;
    public static readonly CLAIM_STATE_AVAILABLE: number = 2;
    public static readonly CLAIM_STATE_CLAIMING: number = 3;
    public static readonly CLAIM_STATE_CLAIMED: number = 4;
    public static readonly CLAIM_STATE_UNAVAILABLE: number = 5;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: CursedDragonAdoptionView;

    declare private _claimId: string;

    declare private _claimState: number;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat(Array.from([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communicationManager = param1;
         }), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         })]));
    }

    protected override initComponent(): void {
        this._claimId = this.getProperty("cursed_dragon_adoption.claim_id");
        if (this._claimId == null || this._claimId.length == 0) {
            this._claimId = "cursed_dragon_adoption";
        }
        this._messageEvents = Array.from([new HasClaimedProductResponseMessageEvent(this.onHasClaimedProductResponse), new ClaimProductResultMessageEvent(this.onClaimProductResult)]);
        for (const _loc1_ of this._messageEvents ?? []) {
            this._communicationManager.addHabboConnectionMessageEvent(_loc1_);
        }
        this.context.addLinkEventTracker(this);
    }

    public get linkPattern(): string {
        return "cursed_dragon_adoption/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1.split("/");
        if (_loc2_.length >= 2 && _loc2_[1] == "open") {
            this.open();
        }
    }

    public open(): void {
        if (this._view == null) {
            this._view = new CursedDragonAdoptionView(this, this._windowManager);
        }
        if (this._claimState != 1 && this._claimState != 3 && this._claimState != 4) {
            this._claimState = 1;
            this.send(new HasClaimedProductMessageComposer(this._claimId));
        }
        this._view.updateClaimState();
        this._view.show();
    }

    public makeClaim(param1: number): void {
        if (!this.canClaim || param1 != 0 && param1 != 1) {
            return;
        }
        this._claimState = 3;
        this._view.updateClaimState();
        this.send(new ClaimProductMessageComposer(this._claimId, param1));
    }

    private onHasClaimedProductResponse(param1: HasClaimedProductResponseMessageEvent): void {
        let _loc2_: HasClaimedProductResponseParser = param1.getParser();
        if (_loc2_.claimId != this._claimId || this._claimState != 1) {
            return;
        }
        this._claimState = _loc2_.hasClaimed ? 4 : 2;
        this._view.updateClaimState();
    }

    private onClaimProductResult(param1: ClaimProductResultMessageEvent): void {
        let _loc2_: ClaimProductResultParser = param1.getParser();
        if (_loc2_.claimId != this._claimId || this._claimState != 3) {
            return;
        }
        switch (_loc2_.result) {
            case 0:
            case 1:
                this._claimState = 4;
                break;
            case 2:
            case 3:
                this._claimState = 5;
                break;
            default:
                this._claimState = 2;
        }
        this._view.updateClaimState();
    }

    private send(param1: IMessageComposer): void {
        this._communicationManager.connection.send(param1);
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get claimState(): number {
        return this._claimState;
    }

    public get canClaim(): boolean {
        return this._claimState == 2;
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.context.removeLinkEventTracker(this);
        for (const _loc1_ of this._messageEvents ?? []) {
            this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._communicationManager = null;
        this._windowManager = null;
        this._roomEngine = null;
        this._localizationManager = null;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onHasClaimedProductResponse = this.onHasClaimedProductResponse.bind(this);
        this.onClaimProductResult = this.onClaimProductResult.bind(this);
        this._claimState = 0;
        super.initInstanceFields();
    }
}
