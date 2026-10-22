import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { VariableLeaderboardRow } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardRow';
import type { VariableLeaderboardContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardContext';
import type { VariableLeaderboardChunkUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/variableleaderboard/VariableLeaderboardChunkUpdateMessageParser';
import type { VariableLeaderboardSnapshotMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/variableleaderboard/VariableLeaderboardSnapshotMessageParser';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableLeaderboardChunkState } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardChunkState';
import type { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';
import type { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { CloseConnectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/session/CloseConnectionMessageEvent';
import { VariableLeaderboardChunkUpdateMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardChunkUpdateMessageEvent';
import { VariableLeaderboardColumn } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardColumn';
import { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';
import { VariableLeaderboardDescriptorChoice } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptorChoice';
import { VariableLeaderboardLocation } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardLocation';
import { VariableLeaderboardSnapshotMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardSnapshotMessageEvent';
import { VariableLeaderboardSubscribeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/variableleaderboard/VariableLeaderboardSubscribeMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { VariableLeaderboardLocationProjector } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardLocationProjector';
import { VariableLeaderboardOverlayState } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardOverlayState';
import { VariableLeaderboardView } from '@/com/sulake/habbo/roomevents/variable_leaderboard/views/VariableLeaderboardView';
import { VariableLeaderboardDisplayNameFormatter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardDisplayNameFormatter';

export class VariableLeaderboardController implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard::VariableLeaderboardController'); }

    public static readonly BODY_LOADING: number = 0;
    public static readonly BODY_AVAILABLE: number = 1;
    public static readonly BODY_NO_ENTRIES: number = 2;
    private static readonly MAX_OVERLAYS: number = 4;
    private static readonly MAX_CHOICES: number = 10;
    private static readonly RELATIVE_TIME_REFRESH_INTERVAL_MS: number = 30000;
    private static readonly NULL_VARIABLE_ID: string = "0";

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _context: IContext;

    declare private _communication: IHabboCommunicationManager;

    declare private _roomEngine: IRoomEngine;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _groupsManager: IHabboGroupsManager;

    declare private _messageEvents: IMessageEvent[];

    declare private _SafeStr_14295: boolean;
    static { (this.prototype as any)._SafeStr_14295 = false; }

    declare private _activeRoomId: number;
    static { (this.prototype as any)._activeRoomId = 0; }

    declare private _SafeStr_14296: boolean;
    static { (this.prototype as any)._SafeStr_14296 = false; }

    private _overlays: any = {};

    private _overlayOrder: number[] = [];

    declare private _SafeStr_6907: IRoomDesktop;

    declare private _SafeStr_14297: IWindowContainer;

    declare private _SafeStr_14298: boolean;
    static { (this.prototype as any)._SafeStr_14298 = false; }

    declare private _SafeStr_14299: VariableLeaderboardView;

    declare private _SafeStr_14300: boolean;
    static { (this.prototype as any)._SafeStr_14300 = false; }

    declare private _SafeStr_14301: number;
    static { (this.prototype as any)._SafeStr_14301 = NaN; }

    declare private _SafeStr_2122: boolean;
    static { (this.prototype as any)._SafeStr_2122 = false; }

    declare private _SafeStr_14302: VariableLeaderboardContext;

    declare private _SafeStr_14285: VariableLeaderboardConfig;

    declare private _SafeStr_14303: number;
    static { (this.prototype as any)._SafeStr_14303 = 0; }

    declare private _SafeStr_14304: (...args: any[]) => any;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: IContext, param3: IAvatarRenderManager = null, param4: IHabboGroupsManager = null) {
        this._roomEvents = param1;
        this._context = param2;
        this._communication = param1.communication;
        this._roomEngine = param1.roomEngine;
        this._avatarRenderManager = param3;
        this._groupsManager = param4;
        this._messageEvents = Array.from([new VariableLeaderboardSnapshotMessageEvent(this.onSnapshot), new VariableLeaderboardChunkUpdateMessageEvent(this.onChunkUpdate), new RoomEntryInfoMessageEvent(this.onRoomEntryInfo), new CloseConnectionMessageEvent(this.onRoomConnectionClosed)]);
        for (const _loc5_ of this._messageEvents ?? []) {
            this._communication.addHabboConnectionMessageEvent(_loc5_);
        }
        this.ensureContextReceiver();
    }

    private static createDraftDescriptor(param1: VariableLeaderboardConfig, param2: VariableLeaderboardContext): VariableLeaderboardDescriptor {
        let _loc6_: string = null;
        let _loc5_: VariableLeaderboardColumn[] = [];
        for (const _loc7_ of param1.columns ?? []) {
            _loc5_.push(new VariableLeaderboardColumn(_loc7_.type, _loc7_.label, _loc7_.width));
        }
        let _loc9_: VariableLeaderboardDescriptorChoice[] = [];
        for (const _loc3_ of param2.choices ?? []) {
            _loc6_ = param1.displayOverrideFor(_loc3_.variableId);
            if (_loc6_ == null) {
                _loc6_ = VariableLeaderboardDisplayNameFormatter.suggest(_loc3_.technicalName);
            }
            _loc9_.push(new VariableLeaderboardDescriptorChoice(_loc3_.variableId, _loc6_));
        }
        let _loc8_: VariableLeaderboardLocation = param1.location;
        let _loc4_: string = _loc9_.length == 0 ? "0" : _loc9_[0].variableId;
        return new VariableLeaderboardDescriptor(0, 0, param1.title, param1.description, new VariableLeaderboardLocation(_loc8_.tileX, _loc8_.tileY, _loc8_.offsetX, _loc8_.altitude), param1.sortMode, _loc5_, _loc9_, _loc4_, param1.pageSizeOption);
    }

    private static resolveSelection(param1: VariableLeaderboardDescriptor, param2: string): string {
        if (param1.choices.length == 0) {
            return null;
        }
        for (const _loc3_ of param1.choices ?? []) {
            if (_loc3_.variableId == param2) {
                return param2;
            }
        }
        return param1.defaultVariableId;
    }

    private static isDescriptorStructurallyValid(param1: VariableLeaderboardDescriptor): boolean {
        if (param1 == null || param1.columns.length < 1 || param1.columns.length > 4 || param1.columns[0].type != 0 || param1.choices.length > 10 || param1.pageSizeOption < 0 || param1.pageSizeOption >= VariableLeaderboardDescriptor._SafeStr_14138.length) {
            return false;
        }
        let _loc2_: any = {};
        for (const _loc3_ of param1.columns ?? []) {
            if (!VariableLeaderboardColumn.isValidWidth(_loc3_.width)) {
                return false;
            }
        }
        for (const _loc4_ of param1.choices ?? []) {
            if (_loc4_.variableId == null || _loc4_.variableId.length == 0 || Boolean(_loc2_.hasOwnProperty(_loc4_.variableId))) {
                return false;
            }
            _loc2_[_loc4_.variableId] = true;
        }
        return param1.choices.length == 0 ? param1.defaultVariableId == "0" : param1.defaultVariableId != null && Boolean(_loc2_.hasOwnProperty(param1.defaultVariableId));
    }

    private static rowsEqual(param1: VariableLeaderboardRow, param2: VariableLeaderboardRow): boolean {
        if (param1 == param2) {
            return true;
        }
        return param1 != null && param2 != null && param1.rank == param2.rank && param1.userId == param2.userId && param1.username == param2.username && param1.figure == param2.figure && param1.rawValue == param2.rawValue && param1.creationTime == param2.creationTime && param1.lastUpdateTime == param2.lastUpdateTime && param1.levelAvailable == param2.levelAvailable && param1.level == param2.level && param1.textConnectionAvailable == param2.textConnectionAvailable && param1.textConnection == param2.textConnection;
    }

    public roomSessionStarted(): void {
        this.clearRoomState();
    }

    public roomSessionEnded(): void {
        this.clearRoomState();
    }

    public roomDisposed(param1: number): void {
        if (this._SafeStr_14295 && param1 == this._activeRoomId) {
            this.clearRoomState();
        }
    }

    private onRoomConnectionClosed = (param1: CloseConnectionMessageEvent): void => {
        this.clearRoomState();
    };

    private onRoomEntryInfo = (param1: RoomEntryInfoMessageEvent): void => {
        let _loc2_: number = param1.getParser().guestRoomId;
        if (_loc2_ == 0) {
            return;
        }
        if (this._SafeStr_14295 && this._activeRoomId == _loc2_) {
            this.tryBindHost();
            return;
        }
        this.clearRoomState();
        this._SafeStr_14295 = true;
        this._activeRoomId = _loc2_;
        this._roomEvents.send(new VariableLeaderboardSubscribeMessageComposer(0, 0, "0", []));
        this.tryBindHost();
    };

    private onSnapshot = (param1: VariableLeaderboardSnapshotMessageEvent): void => {
        let _loc7_: boolean = false;
        if (!this._SafeStr_14295) {
            return;
        }
        let _loc2_: VariableLeaderboardSnapshotMessageParser = param1.getParser();
        if (!_loc2_.valid) {
            return;
        }
        let _loc5_: boolean = this._SafeStr_14296;
        this._SafeStr_14296 = true;
        let _loc6_: any = {};
        for (const _loc4_ of _loc2_.descriptors ?? []) {
            _loc6_[String(_loc4_.overlayInstanceId)] = true;
            _loc7_ = this.applyDescriptor(_loc4_) || _loc7_;
        }
        let _loc3_: number[] = this._overlayOrder.concat();
        for (const _loc8_ of _loc3_ ?? []) {
            if (!_loc6_[String(_loc8_)]) {
                _loc7_ = this.applyRemoval(_loc8_) || _loc7_;
            }
        }
        if (_loc7_ || !_loc5_) {
            this.synchronizeViews();
        }
    };

    private applyDescriptor(param1: VariableLeaderboardDescriptor): boolean {
        let _loc3_: number = 0;
        let _loc4_: string = null;
        let _loc2_: string = null;
        if (!VariableLeaderboardController.isDescriptorStructurallyValid(param1)) {
            Logger.log("Ignoring invalid Variable leaderboard descriptor");
            return false;
        }
        let _loc6_: string = String(param1.overlayInstanceId);
        let _loc5_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[_loc6_], VariableLeaderboardOverlayState);
        if (_loc5_ != null && param1.queryRevision < _loc5_.descriptor.queryRevision) {
            Logger.log("Ignoring Variable leaderboard descriptor with a regressed query revision");
            return false;
        }
        if (_loc5_ == null) {
            if (this._overlayOrder.length >= 4) {
                Logger.log("Ignoring Variable leaderboard descriptor above the four-overlay limit");
                return false;
            }
            _loc5_ = new VariableLeaderboardOverlayState(param1);
            _loc5_.resetQueryScope(VariableLeaderboardController.resolveSelection(param1, null));
            if (this._SafeStr_2122 && this._SafeStr_14302 != null && this._SafeStr_14302.published && param1.overlayInstanceId == this._SafeStr_14303) {
                _loc5_.editDraft = this._SafeStr_14285;
            }
            this._overlays[_loc6_] = _loc5_;
            this._overlayOrder.push(param1.overlayInstanceId);
            if (this._SafeStr_6907 != null) {
                this.bootstrapSubscription(_loc5_);
            }
        } else {
            _loc3_ = _loc5_.descriptor.queryRevision;
            _loc4_ = _loc5_.selectedVariableId;
            _loc5_.applyDescriptor(param1);
            _loc2_ = VariableLeaderboardController.resolveSelection(param1, _loc4_);
            if (param1.queryRevision != _loc3_ || _loc2_ != _loc4_) {
                _loc5_.resetQueryScope(_loc2_);
                if (this._SafeStr_6907 != null) {
                    this.bootstrapSubscription(_loc5_);
                }
            }
            this.refreshView(_loc5_);
            this.projectView(_loc5_);
        }
        return true;
    }

    private applyRemoval(param1: number): boolean {
        let _loc4_: string = String(param1);
        let _loc3_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[_loc4_], VariableLeaderboardOverlayState);
        if (_loc3_ == null) {
            return false;
        }
        if (this._SafeStr_2122 && this._SafeStr_14303 == param1) {
            this.endLocationEdit();
        }
        this.removeStateView(_loc3_);
        delete this._overlays[_loc4_];
        let _loc2_: number = this._overlayOrder.indexOf(param1);
        if (_loc2_ >= 0) {
            this._overlayOrder.splice(_loc2_, 1);
        }
        return true;
    }

    private onChunkUpdate = (param1: VariableLeaderboardChunkUpdateMessageEvent): void => {
        if (!this._SafeStr_14295 || !this._SafeStr_14296) {
            return;
        }
        let _loc2_: VariableLeaderboardChunkUpdateMessageParser = param1.getParser();
        if (!_loc2_.valid) {
            return;
        }
        let _loc4_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(_loc2_.overlayInstanceId)], VariableLeaderboardOverlayState);
        if (_loc4_ == null || _loc2_.queryRevision != _loc4_.descriptor.queryRevision || _loc2_.selectedVariableId != _loc4_.selectedVariableId || !_loc4_.hasRequestedChunk(_loc2_.chunkIndex)) {
            return;
        }
        let _loc3_: VariableLeaderboardChunkState = _loc4_.getChunk(_loc2_.chunkIndex);
        if (_loc3_ == null) {
            return;
        }
        if (_loc2_.rows.length > 50) {
            return;
        }
        _loc3_.applyRows(_loc2_.rows);
        _loc4_.paging.applyExactTotal(_loc2_.totalCount);
        this.reconcileSubscription(_loc4_);
        this.refreshView(_loc4_);
    };

    public selectVariable(param1: number, param2: string): boolean {
        let _loc3_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(param1)], VariableLeaderboardOverlayState);
        if (_loc3_ == null || param2 == null || param2 == _loc3_.selectedVariableId || !_loc3_.offers(param2)) {
            return false;
        }
        _loc3_.resetQueryScope(param2);
        this.bootstrapSubscription(_loc3_);
        this.refreshView(_loc3_);
        return true;
    }

    public showPreviousPage(param1: number): boolean {
        return this.movePage(param1, -1);
    }

    public showNextPage(param1: number): boolean {
        return this.movePage(param1, 1);
    }

    private movePage(param1: number, param2: number): boolean {
        let _loc3_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(param1)], VariableLeaderboardOverlayState);
        if (_loc3_ == null) {
            return false;
        }
        if (!_loc3_.paging.moveTo(_loc3_.paging.clientPage + param2)) {
            return false;
        }
        this.reconcileSubscription(_loc3_);
        this.refreshView(_loc3_);
        return true;
    }

    private bootstrapSubscription(param1: VariableLeaderboardOverlayState): void {
        if (param1.selectedVariableId == null) {
            param1.clearSubscription();
            this.refreshView(param1);
            return;
        }
        this.reconcileSubscription(param1);
    }

    private reconcileSubscription(param1: VariableLeaderboardOverlayState): void {
        if (!this._SafeStr_14295 || !this._SafeStr_14296 || param1.selectedVariableId == null) {
            return;
        }
        let _loc2_: number[] = param1.paging.desiredChunkIndices();
        if (!param1.replaceSubscription(_loc2_)) {
            return;
        }
        this._roomEvents.send(new VariableLeaderboardSubscribeMessageComposer(param1.overlayInstanceId, param1.descriptor.queryRevision, param1.selectedVariableId, param1.paging.subscribedChunkIndices));
    }

    public updateViewDependencies(param1: IAvatarRenderManager, param2: IHabboGroupsManager): void {
        let _loc3_: VariableLeaderboardOverlayState = null;
        if (this._disposed || this._avatarRenderManager == param1 && this._groupsManager == param2) {
            return;
        }
        this._avatarRenderManager = param1;
        this._groupsManager = param2;
        for (const _loc4_ of this._overlayOrder ?? []) {
            _loc3_ = asInstanceOf(this._overlays[String(_loc4_)], VariableLeaderboardOverlayState);
            if (_loc3_ != null && _loc3_.view != null && !_loc3_.view.disposed) {
                _loc3_.view.setDependencies(this._avatarRenderManager, this._groupsManager);
            }
        }
        if (this._SafeStr_14299 != null && !this._SafeStr_14299.disposed) {
            this._SafeStr_14299.setDependencies(this._avatarRenderManager, this._groupsManager);
        }
    }

    private synchronizeViews(): void {
        let _loc2_: VariableLeaderboardOverlayState = null;
        let _loc1_: VariableLeaderboardView = null;
        if (this._SafeStr_6907 == null || this._SafeStr_14297 == null) {
            return;
        }
        for (const _loc3_ of this._overlayOrder ?? []) {
            _loc2_ = asInstanceOf(this._overlays[String(_loc3_)], VariableLeaderboardOverlayState);
            if (_loc2_ != null) {
                if (_loc2_.view != null && _loc2_.view.disposed) {
                    _loc2_.view = null;
                }
                if (_loc2_.view == null) {
                    _loc1_ = new VariableLeaderboardView(this._roomEvents, this, _loc3_);
                    _loc1_.setDependencies(this._avatarRenderManager, this._groupsManager);
                    _loc2_.view = _loc1_;
                }
                if (!(_loc2_.view == null || _loc2_.view.window == null)) {
                    if (!_loc2_.viewAttached) {
                        _loc2_.viewAttached = this.attachToBackgroundLayer(_loc2_.view.window);
                    }
                    if (_loc2_.viewAttached) {
                        this.refreshView(_loc2_);
                        this.projectView(_loc2_);
                    }
                }
            }
        }
        this.synchronizeDraftView();
        this.applyLocationEditVisuals();
    }

    private synchronizeDraftView(): void {
        if (!this._SafeStr_2122 || this._SafeStr_14302 == null || this._SafeStr_14302.published || this._SafeStr_14285 == null || this._SafeStr_6907 == null || this._SafeStr_14297 == null) {
            return;
        }
        if (this._SafeStr_14299 != null && this._SafeStr_14299.disposed) {
            this._SafeStr_14299 = null;
            this._SafeStr_14300 = false;
        }
        if (this._SafeStr_14299 == null) {
            this._SafeStr_14299 = new VariableLeaderboardView(this._roomEvents, this, 0);
            this._SafeStr_14299.setDependencies(this._avatarRenderManager, this._groupsManager);
            this.initializeDraftView();
        }
        if (this._SafeStr_14299 == null || this._SafeStr_14299.window == null) {
            return;
        }
        if (!this._SafeStr_14300) {
            this._SafeStr_14300 = this.attachToBackgroundLayer(this._SafeStr_14299.window);
        }
        if (this._SafeStr_14300) {
            this.projectDraftView();
        }
    }

    private initializeDraftView(): void {
        let _loc2_: VariableLeaderboardDescriptor = VariableLeaderboardController.createDraftDescriptor(this._SafeStr_14285, this._SafeStr_14302);
        let _loc1_: string = _loc2_.choices.length == 0 ? null : _loc2_.defaultVariableId;
        this._SafeStr_14299.setDescriptor(_loc2_, _loc1_);
        this._SafeStr_14299.setEditDraft(this._SafeStr_14285, this._SafeStr_14302);
        this._SafeStr_14299.setBodyState(2);
        this._SafeStr_14299.setPager(1, 1, false, false);
    }

    private applyLocationEditVisuals(): void {
        let _loc1_: VariableLeaderboardOverlayState = null;
        let _loc3_: boolean = false;
        let _loc2_: boolean = false;
        for (const _loc4_ of this._overlayOrder ?? []) {
            _loc1_ = asInstanceOf(this._overlays[String(_loc4_)], VariableLeaderboardOverlayState);
            if (!(_loc1_ == null || _loc1_.view == null || _loc1_.view.disposed)) {
                _loc3_ = this._SafeStr_2122 && this._SafeStr_14302 != null && this._SafeStr_14302.published && _loc4_ == this._SafeStr_14303;
                _loc1_.view.setLocationEditState(_loc3_, this._SafeStr_2122 && !_loc3_);
            }
        }
        if (this._SafeStr_14299 != null && !this._SafeStr_14299.disposed) {
            _loc2_ = this._SafeStr_2122 && this._SafeStr_14302 != null && !this._SafeStr_14302.published;
            this._SafeStr_14299.setLocationEditState(_loc2_, false);
        }
    }

    private refreshView(param1: VariableLeaderboardOverlayState): void {
        let _loc9_: number = 0;
        let _loc10_: VariableLeaderboardRow = null;
        let _loc7_: number = 0;
        let _loc6_: VariableLeaderboardChunkState = null;
        let _loc3_: VariableLeaderboardView = param1.view;
        if (_loc3_ == null || _loc3_.disposed || !param1.viewAttached) {
            return;
        }
        let _loc12_: number = param1.editDraft?.entriesPerPage;
        if (param1.paging.entriesPerPage != _loc12_) {
            param1.paging.entriesPerPage = _loc12_;
            param1.invalidateVisibleRendering();
            this.reconcileSubscription(param1);
        }
        if (param1.descriptorDirty) {
            _loc3_.setDescriptor(param1.descriptor, param1.selectedVariableId);
            param1.markDescriptorRendered();
            if (param1.editDraft != null) {
                _loc3_.setEditDraft(param1.editDraft, this._SafeStr_14302);
            }
        }
        if (!param1.renderedSelectionSet || param1.renderedSelection != param1.selectedVariableId) {
            _loc3_.setSelection(param1.selectedVariableId);
            param1.markRenderedSelection(param1.selectedVariableId);
        }
        let _loc5_: number = this.getBodyState(param1);
        if (param1.renderedBodyState != _loc5_) {
            _loc3_.setBodyState(_loc5_);
            param1.renderedBodyState = _loc5_;
        }
        let _loc8_: boolean = param1.paging.totalKnown && param1.paging.totalCount > 0 && param1.paging.clientPage > 0;
        let _loc11_: boolean = param1.paging.totalKnown && param1.paging.totalCount > 0 && param1.paging.clientPage + 1 < param1.paging.pageCount;
        let _loc4_: number = param1.paging.clientPage + 1;
        if (param1.renderedPageNumber != _loc4_ || param1.renderedPageCount != param1.paging.pageCount || param1.renderedPreviousEnabled != _loc8_ || param1.renderedNextEnabled != _loc11_) {
            _loc3_.setPager(_loc4_, param1.paging.pageCount, _loc8_, _loc11_);
            param1.markRenderedPager(_loc4_, param1.paging.pageCount, _loc8_, _loc11_);
        }
        let _loc2_: number = Number(new Date().getTime());
        _loc9_ = 0;
        while (_loc9_ < 20) {
            _loc10_ = null;
            _loc7_ = param1.paging.firstRowIndex + _loc9_;
            if (_loc5_ == 1 && _loc9_ < _loc12_ && _loc7_ < param1.paging.totalCount) {
                _loc6_ = param1.getChunk(Math.floor(_loc7_ / 50) | 0);
                _loc10_ = _loc6_.rowAt(_loc7_ % 50);
            }
            if (!param1.renderedRowsInitialized || !VariableLeaderboardController.rowsEqual(_loc10_, param1.renderedRowAt(_loc9_))) {
                if (_loc10_ == null) {
                    _loc3_.clearRowAt(_loc9_);
                } else {
                    _loc3_.setRowAt(_loc9_, _loc10_, _loc2_);
                }
                param1.setRenderedRowAt(_loc9_, _loc10_);
            }
            _loc9_++;
        }
        param1.markRenderedRowsInitialized();
    }

    private getBodyState(param1: VariableLeaderboardOverlayState): number {
        let _loc3_: number = 0;
        let _loc2_: VariableLeaderboardChunkState = null;
        if (param1.selectedVariableId == null || param1.paging.totalKnown && param1.paging.totalCount == 0) {
            return 2;
        }
        _loc3_ = param1.paging.currentChunkIndex;
        while (_loc3_ <= param1.paging.lastChunkIndex) {
            _loc2_ = param1.getChunk(_loc3_);
            if (_loc2_ == null || !_loc2_.hasSuccessfulPayload) {
                return 0;
            }
            _loc3_++;
        }
        return 1;
    }

    private projectView(param1: VariableLeaderboardOverlayState): void {
        if (this._SafeStr_6907 == null || param1.view == null || param1.view.disposed || !param1.viewAttached) {
            return;
        }
        let _loc2_: Rectangle = this._SafeStr_6907.getRoomViewRect();
        if (_loc2_ == null || this._SafeStr_6907.roomSession == null) {
            return;
        }
        let _loc4_: VariableLeaderboardLocation = this.effectiveLocation(param1);
        let _loc3_: Point = VariableLeaderboardLocationProjector.project(this._roomEngine, this._SafeStr_6907.roomSession.roomId, _loc4_, _loc2_.width, _loc2_.height, this._SafeStr_6907.getFirstCanvasId());
        if (_loc3_ != null) {
            param1.view.setAnchor(_loc3_, VariableLeaderboardLocationProjector.getScale(this._roomEngine, this._SafeStr_6907.roomSession.roomId, this._SafeStr_6907.getFirstCanvasId()));
        }
    }

    private projectDraftView(): void {
        if (this._SafeStr_6907 == null || this._SafeStr_14299 == null || this._SafeStr_14299.disposed || !this._SafeStr_14300 || this._SafeStr_14285 == null) {
            return;
        }
        let _loc1_: Rectangle = this._SafeStr_6907.getRoomViewRect();
        if (_loc1_ == null || this._SafeStr_6907.roomSession == null) {
            return;
        }
        let _loc2_: Point = VariableLeaderboardLocationProjector.project(this._roomEngine, this._SafeStr_6907.roomSession.roomId, this._SafeStr_14285.location, _loc1_.width, _loc1_.height, this._SafeStr_6907.getFirstCanvasId());
        if (_loc2_ != null) {
            this._SafeStr_14299.setAnchor(_loc2_, VariableLeaderboardLocationProjector.getScale(this._roomEngine, this._SafeStr_6907.roomSession.roomId, this._SafeStr_6907.getFirstCanvasId()));
        }
    }

    private effectiveLocation(param1: VariableLeaderboardOverlayState): VariableLeaderboardLocation {
        if (param1.editDraft != null) {
            return param1.editDraft.location;
        }
        return param1.descriptor.location;
    }

    private tryBindHost(): void {
        if (!this._SafeStr_14295 || this._roomEvents.roomUI == null) {
            return;
        }
        let _loc2_: IRoomDesktop = this._roomEvents.roomUI.desktop;
        let _loc1_: IRoomDesktop = _loc2_;
        if (_loc1_ == null || _loc1_.roomSession == null || _loc1_.roomSession.roomId != this._activeRoomId || _loc1_.getFirstCanvasId() == 0) {
            return;
        }
        let _loc4_: IRoomWidget = _loc1_.getWidget("RWE_HIGH_SCORE_DISPLAY");
        let _loc3_: IWindowContainer = _loc4_ == null ? null : asGuarded(_loc4_.mainWindow, isIWindowContainer);
        if (_loc3_ == null || Boolean(_loc3_.disposed)) {
            return;
        }
        if (this._SafeStr_6907 == _loc1_ && this._SafeStr_14297 == _loc3_) {
            return;
        }
        this.detachHost();
        this._SafeStr_6907 = _loc1_;
        this._SafeStr_14297 = _loc3_;
        this.bootstrapMissingSubscriptions();
        this.synchronizeViews();
    }

    private bootstrapMissingSubscriptions(): void {
        let _loc1_: VariableLeaderboardOverlayState = null;
        for (const _loc2_ of this._overlayOrder ?? []) {
            _loc1_ = asInstanceOf(this._overlays[String(_loc2_)], VariableLeaderboardOverlayState);
            if (_loc1_ != null && _loc1_.selectedVariableId != null && _loc1_.subscribedVariableId == null) {
                this.bootstrapSubscription(_loc1_);
            }
        }
    }

    private detachHost(): void {
        let _loc1_: VariableLeaderboardOverlayState = null;
        if (this._SafeStr_6907 == null && this._SafeStr_14297 == null) {
            return;
        }
        for (const _loc2_ of this._overlayOrder ?? []) {
            _loc1_ = asInstanceOf(this._overlays[String(_loc2_)], VariableLeaderboardOverlayState);
            if (_loc1_ != null && _loc1_.view != null && _loc1_.viewAttached) {
                this.detachFromBackgroundLayer(_loc1_.view.window);
                _loc1_.viewAttached = false;
            }
        }
        if (this._SafeStr_14299 != null && this._SafeStr_14300) {
            this.detachFromBackgroundLayer(this._SafeStr_14299.window);
            this._SafeStr_14300 = false;
        }
        this._SafeStr_14297 = null;
        this._SafeStr_6907 = null;
    }

    private attachToBackgroundLayer(param1: IWindow): boolean {
        if (param1 == null || this._SafeStr_14297 == null || Boolean(this._SafeStr_14297.disposed)) {
            return false;
        }
        if (param1.parent != this._SafeStr_14297) {
            this._SafeStr_14297.addChild(param1);
        }
        return true;
    }

    private detachFromBackgroundLayer(param1: IWindow): void {
        if (param1 != null && this._SafeStr_14297 != null && !this._SafeStr_14297.disposed && param1.parent == this._SafeStr_14297) {
            this._SafeStr_14297.removeChild(param1);
        }
    }

    private ensureContextReceiver(): void {
        if (!this._disposed && !this._SafeStr_14298) {
            this._context.registerUpdateReceiver(this, 1);
            this._SafeStr_14298 = true;
        }
    }

    public update(param1: number): void {
        let _loc3_: boolean = false;
        let _loc2_: number = NaN;
        let _loc4_: VariableLeaderboardOverlayState = null;
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_6907 == null) {
            this.tryBindHost();
            _loc3_ = this._SafeStr_6907 != null;
        } else if (!this._SafeStr_14295 || this._SafeStr_14297 == null || Boolean(this._SafeStr_14297.disposed) || this._SafeStr_6907.roomSession == null || this._SafeStr_6907.roomSession.roomId != this._activeRoomId || this._SafeStr_6907.getFirstCanvasId() == 0) {
            this.detachHost();
        }
        if (!_loc3_) {
            this.synchronizeViews();
        }
        this._SafeStr_14301 += param1;
        if (this._SafeStr_14301 >= 30000) {
            this._SafeStr_14301 = 0;
            _loc2_ = Number(new Date().getTime());
            for (const _loc5_ of this._overlayOrder ?? []) {
                _loc4_ = asInstanceOf(this._overlays[String(_loc5_)], VariableLeaderboardOverlayState);
                if (_loc4_ != null && _loc4_.view != null && !_loc4_.view.disposed && _loc4_.viewAttached) {
                    _loc4_.view.refreshRelativeTimes(_loc2_);
                }
            }
        }
    }

    public beginLocationEdit(param1: VariableLeaderboardContext, param2: VariableLeaderboardConfig, param3: (...args: any[]) => any): boolean {
        if (!this._SafeStr_14295 || param1 == null || param2 == null || param3 == null) {
            return false;
        }
        if (this._SafeStr_2122) {
            this.endLocationEdit();
        }
        this._SafeStr_2122 = true;
        this._SafeStr_14302 = param1;
        this._SafeStr_14285 = param2;
        this._SafeStr_14303 = param1.published ? param1.overlayInstanceId : 0;
        this._SafeStr_14304 = param3;
        let _loc4_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(this._SafeStr_14303)], VariableLeaderboardOverlayState);
        if (_loc4_ != null) {
            _loc4_.editDraft = param2;
            if (_loc4_.view != null && !_loc4_.view.disposed) {
                _loc4_.view.setEditDraft(param2, param1);
            }
        }
        this.synchronizeViews();
        this.applyLocationEditVisuals();
        if (_loc4_ != null) {
            this.projectView(_loc4_);
        } else {
            this.projectDraftView();
        }
        return true;
    }

    public updateEditDraft(param1: VariableLeaderboardConfig): void {
        if (!this._SafeStr_2122 || param1 == null) {
            return;
        }
        this._SafeStr_14285 = param1;
        let _loc2_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(this._SafeStr_14303)], VariableLeaderboardOverlayState);
        if (_loc2_ != null) {
            _loc2_.editDraft = param1;
            if (_loc2_.view != null && !_loc2_.view.disposed) {
                _loc2_.view.setEditDraft(param1, this._SafeStr_14302);
            }
            this.projectView(_loc2_);
        } else if (this._SafeStr_14302 != null && !this._SafeStr_14302.published) {
            this.synchronizeDraftView();
            if (this._SafeStr_14299 != null && !this._SafeStr_14299.disposed) {
                this._SafeStr_14299.setEditDraft(param1, this._SafeStr_14302);
            }
            this.projectDraftView();
        }
    }

    public updateDraggedWindowPosition(param1: number, param2: Point, param3: number, param4: number): void {
        if (!this._SafeStr_2122 || param1 != this._SafeStr_14303 || this._SafeStr_6907 == null || this._SafeStr_6907.roomSession == null) {
            return;
        }
        let _loc5_: Rectangle = this._SafeStr_6907.getRoomViewRect();
        if (_loc5_ == null) {
            return;
        }
        let _loc7_: Point = VariableLeaderboardLocationProjector.getScreenAnchor(param2, param3, param4);
        let _loc6_: VariableLeaderboardLocation = VariableLeaderboardLocationProjector.unproject(this._roomEngine, this._SafeStr_6907.roomSession.roomId, _loc7_, _loc5_.width, _loc5_.height, this._SafeStr_6907.getFirstCanvasId());
        if (_loc6_ != null) {
            this.updateDraggedLocation(_loc6_);
        }
    }

    public updateDraggedLocation(param1: VariableLeaderboardLocation): void {
        if (!this._SafeStr_2122 || this._SafeStr_14285 == null || param1 == null) {
            return;
        }
        this._SafeStr_14285.setLocation(param1);
        let _loc2_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(this._SafeStr_14303)], VariableLeaderboardOverlayState);
        if (_loc2_ != null) {
            _loc2_.editDraft = this._SafeStr_14285;
            this.projectView(_loc2_);
        } else if (this._SafeStr_14299 != null && !this._SafeStr_14299.disposed) {
            this.projectDraftView();
        }
        this._SafeStr_14304(param1);
    }

    public endLocationEdit(): void {
        if (!this._SafeStr_2122) {
            return;
        }
        let _loc1_: VariableLeaderboardOverlayState = asInstanceOf(this._overlays[String(this._SafeStr_14303)], VariableLeaderboardOverlayState);
        if (_loc1_ != null) {
            _loc1_.editDraft = null;
            if (_loc1_.view != null && !_loc1_.view.disposed) {
                _loc1_.view.clearEditDraft();
            }
            this.projectView(_loc1_);
        }
        this.removeDraftView();
        this.clearEditState();
        this.applyLocationEditVisuals();
    }

    private clearEditState(): void {
        this._SafeStr_2122 = false;
        this._SafeStr_14302 = null;
        this._SafeStr_14285 = null;
        this._SafeStr_14303 = 0;
        this._SafeStr_14304 = null;
    }

    private clearRoomState(): void {
        let _loc1_: VariableLeaderboardOverlayState = null;
        this.removeDraftView();
        this.detachHost();
        for (const _loc2_ of this._overlayOrder ?? []) {
            _loc1_ = asInstanceOf(this._overlays[String(_loc2_)], VariableLeaderboardOverlayState);
            if (_loc1_ != null) {
                _loc1_.editDraft = null;
                _loc1_.disposeView();
            }
        }
        this._overlays = {};
        this._overlayOrder = [];
        this._SafeStr_14301 = 0;
        this._SafeStr_14296 = false;
        this._SafeStr_14295 = false;
        this._activeRoomId = 0;
        this.clearEditState();
    }

    private removeStateView(param1: VariableLeaderboardOverlayState): void {
        if (param1.view != null && param1.viewAttached) {
            this.detachFromBackgroundLayer(param1.view.window);
        }
        param1.disposeView();
    }

    private removeDraftView(): void {
        if (this._SafeStr_14299 != null) {
            if (this._SafeStr_14300) {
                this.detachFromBackgroundLayer(this._SafeStr_14299.window);
            }
            this._SafeStr_14299.dispose();
            this._SafeStr_14299 = null;
        }
        this._SafeStr_14300 = false;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.clearRoomState();
        if (this._SafeStr_14298) {
            this._context.removeUpdateReceiver(this);
            this._SafeStr_14298 = false;
        }
        for (const _loc1_ of this._messageEvents ?? []) {
            this._communication.removeHabboConnectionMessageEvent(_loc1_);
        }
        this._messageEvents = null;
        this._roomEvents = null;
        this._context = null;
        this._communication = null;
        this._roomEngine = null;
        this._avatarRenderManager = null;
        this._groupsManager = null;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
