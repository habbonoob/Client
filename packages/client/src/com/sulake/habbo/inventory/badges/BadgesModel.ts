import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetBadgesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/GetBadgesComposer';
import { SetActivatedBadgesComposer } from '@/com/sulake/habbo/communication/messages/outgoing/inventory/badges/SetActivatedBadgesComposer';
import { Badge } from '@/com/sulake/habbo/inventory/badges/Badge';
import { BadgesView } from '@/com/sulake/habbo/inventory/badges/BadgesView';
import { IInventoryModel } from '@/com/sulake/habbo/inventory/IInventoryModel';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class BadgesModel implements IInventoryModel {
    static { registerClassName(this, 'com.sulake.habbo.inventory.badges::BadgesModel'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        BadgesModel.#initStatics();
        return BadgesModel._log;
    }

    public static readonly BADGES_ALL: number = -1;
    public static readonly BADGES_INACTIVE: number = 0;
    public static readonly BADGES_ACTIVE: number = 1;
    private readonly MAX_ACTIVE_BADGE_COUNT: number = 5;

    constructor(param1: HabboInventory, param2: IHabboWindowManager, param3: IHabboCommunicationManager, param4: IAssetLibrary) {
        this._controller = param1;
        this._windowManager = param2;
        this._badges = new Array<Badge>(0).fill(null);
        this._SafeStr_2685 = new Array<Badge>(0).fill(null);
        this._assets = param4;
        this._communication = param3;
        this._view = new BadgesView(this, param2, param4);
        this._SafeStr_2572 = new UtilsMap();
        this.initBadgeWindowAsset();
    }

    declare private _controller: HabboInventory;

    declare private _view: BadgesView;

    declare private _badges: Badge[];

    declare private _SafeStr_2685: Badge[];

    declare private _SafeStr_2572: UtilsMap;

    declare private _assets: IAssetLibrary;

    declare private _communication: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get controller(): HabboInventory {
        return this._controller;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (Badge._SafeStr_4265 != null) {
            Badge._SafeStr_4265.dispose();
            Badge._SafeStr_4265 = null;
        }
        this._disposed = true;
        this._controller = null;
        this._windowManager = null;
        this._badges = null;
        this._SafeStr_2685 = null;
        if (this._SafeStr_2572) {
            this._SafeStr_2572.dispose();
            this._SafeStr_2572 = null;
        }
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._assets = null;
        this._communication = null;
    }

    public requestInitialization(): void {
        this._communication.connection.send(new GetBadgesComposer());
    }

    public getMaxActiveCount(): number {
        return 5;
    }

    public updateView(): void {
        if (this._view != null) {
            this._view.updateAll(null);
        }
    }

    public updateActionView(): void {
        this._view.updateActionView();
    }

    public initBadges(param1: UtilsMap): void {
        let _loc3_: number = 0;
        let _loc6_: boolean = false;
        let _loc5_: string = null;
        let _loc7_: string = null;
        let _loc2_: Badge = null;
        this.resetBadges();
        this._badges = new Array<Badge>(0).fill(null);
        this._SafeStr_2685 = new Array<Badge>(0).fill(null);
        this._SafeStr_2572 = new UtilsMap();
        for (const _loc4_ of param1.getKeys() ?? []) {
            _loc3_ = param1.getValue(_loc4_) | 0;
            if (_loc3_ > 0) {
                this._SafeStr_2572.add(_loc4_, _loc3_);
            }
            _loc6_ = this._controller.unseenItemTracker.isUnseen(4, _loc3_);
            _loc5_ = this.controller.localization.getBadgeName(stringOrNull(_loc4_));
            _loc7_ = this.controller.localization.getBadgeDesc(stringOrNull(_loc4_));
            _loc2_ = new Badge(this, stringOrNull(_loc4_), _loc5_, _loc7_, _loc6_);
            if (_loc6_) {
                this._badges.unshift(_loc2_);
            } else {
                this._badges.push(_loc2_);
            }
        }
    }

    public updateBadge(param1: string, param2: boolean, param3: number = 0): void {
        let _loc7_: boolean = false;
        let _loc6_: string = null;
        let _loc8_: string = null;
        let _loc4_: Badge = null;
        if (param3 > 0 && !this._SafeStr_2572.hasKey(param1)) {
            this._SafeStr_2572.add(param1, param3);
        }
        let _loc5_: Badge = this.getBadge(param1);
        if (_loc5_ != null) {
            if (_loc5_.isInUse != param2) {
                if (param2) {
                    this.startWearingBadge(_loc5_);
                } else {
                    this.stopWearingBadge(_loc5_);
                }
            }
        } else {
            _loc7_ = this._controller.unseenItemTracker.isUnseen(4, param3);
            _loc6_ = this.controller.localization.getBadgeName(param1);
            _loc8_ = this.controller.localization.getBadgeDesc(param1);
            _loc4_ = new Badge(this, param1, _loc6_, _loc8_, _loc7_);
            if (_loc7_) {
                this._badges.unshift(_loc4_);
            } else {
                this._badges.push(_loc4_);
            }
            if (param2) {
                this.startWearingBadge(_loc4_);
            }
        }
    }

    public removeBadge(param1: string): void {
        let _loc3_: number = 0;
        let _loc2_: Badge = null;
        _loc3_ = 0;
        while (_loc3_ < this._badges.length) {
            _loc2_ = this._badges[_loc3_];
            if (_loc2_.badgeId == param1) {
                this._badges.splice(_loc3_, 1);
                this.stopWearingBadge(_loc2_);
                this.updateView();
                return;
            }
            _loc3_++;
        }
    }

    public toggleBadgeWearing(param1: string): void {
        let _loc2_: Badge = this.getBadge(param1);
        if (_loc2_ != null) {
            if (_loc2_.isInUse) {
                this.stopWearingBadge(_loc2_);
            } else {
                this.startWearingBadge(_loc2_);
            }
            this.saveBadgeSelection();
        }
    }

    public saveBadgeSelection(): void {
        let _loc4_: number = 0;
        let _loc2_: Badge = null;
        let _loc1_: SetActivatedBadgesComposer = new SetActivatedBadgesComposer();
        let _loc3_: Badge[] = this.getBadges(1);
        _loc4_ = 0;
        while (_loc4_ < _loc3_.length) {
            _loc2_ = _loc3_[_loc4_];
            _loc1_.addActivatedBadge(_loc2_.badgeId);
            _loc4_++;
        }
        this._communication.connection.send(_loc1_);
    }

    public setBadgeSelected(param1: string): void {
        let _loc3_: number = 0;
        let _loc2_: Badge = null;
        _loc3_ = 0;
        while (_loc3_ < this._badges.length) {
            _loc2_ = asInstanceOf(this._badges[_loc3_], Badge);
            if (_loc2_ != null) {
                _loc2_.isSelected = _loc2_.badgeId == param1;
            }
            _loc3_++;
        }
        this.updateActionView();
    }

    public forceSelection(): void {
        let _loc1_: Badge = this.getSelectedBadge();
        if (_loc1_ != null) {
            return;
        }
        let _loc3_: Badge[] = this.getBadges(0);
        if (_loc3_ != null && _loc3_.length > 0) {
            _loc1_ = asInstanceOf(_loc3_[0], Badge);
            _loc1_.isSelected = true;
            this.updateView();
            return;
        }
        let _loc2_: Badge[] = this.getBadges(1);
        if (_loc2_ != null && _loc2_.length > 0) {
            _loc1_ = asInstanceOf(_loc2_[0], Badge);
            _loc1_.isSelected = true;
            this.updateView();
        }
    }

    public getSelectedBadge(param1: number = -1): Badge {
        let _loc4_: number = 0;
        let _loc3_: Badge = null;
        let _loc2_: Badge[] = this.getBadges(param1);
        _loc4_ = 0;
        while (_loc4_ < _loc2_.length) {
            _loc3_ = _loc2_[_loc4_];
            if (_loc3_.isSelected) {
                return _loc3_;
            }
            _loc4_++;
        }
        return null;
    }

    public getBadges(param1: number = -1): Badge[] {
        let _loc3_: any = undefined;
        switch (param1 - -1) {
            case 0:
                return this._badges;
            case 1:
                _loc3_ = new Array<Badge>(0).fill(null);
                for (const _loc2_ of this._badges ?? []) {
                    if (!_loc2_.isInUse) {
                        _loc3_.push(_loc2_);
                    }
                }
                return _loc3_;
            case 2:
                return this._SafeStr_2685;
            default:
                BadgesModel._log.info("Unexpected filter. Returning an empty array to maintain backward compatibility");
                return new Array<Badge>(0).fill(null);
        }
    }

    public getBadgeFromActive(param1: number): Badge {
        return this.getItemInIndex(param1, 1);
    }

    public getBadgeFromInactive(param1: number): Badge {
        return this.getItemInIndex(param1, 0);
    }

    public getItemInIndex(param1: number, param2: number = -1): Badge {
        let _loc3_: Badge[] = this.getBadges(param2);
        if (param1 < 0 || param1 >= _loc3_.length) {
            return null;
        }
        return _loc3_[param1];
    }

    public getWindowContainer(): IWindowContainer {
        return this._view.getWindowContainer();
    }

    public closingInventoryView(): void {
        if (this._view.isVisible) {
            this.resetUnseenItems();
        }
    }

    public categorySwitch(param1: string): void {
        if (param1 == "badges" && this._controller.isVisible) {
            this._controller.events.dispatchEvent(new Event("HABBO_INVENTORY_TRACKING_EVENT_BADGES"));
        }
    }

    public subCategorySwitch(param1: string): void {
    }

    public resetUnseenItems(): void {
        if (!this._controller.isMainViewActive) {
            return;
        }
        this._controller.unseenItemTracker.resetCategory(4);
        for (const _loc1_ of this._badges ?? []) {
            _loc1_.isUnseen = false;
        }
        this.updateView();
        this._controller.updateUnseenItemCounts();
    }

    public selectItemById(param1: string): void {
        this.setBadgeSelected(param1);
    }

    public removeSelections(): void {
        for (const _loc1_ of this._badges ?? []) {
            _loc1_.isSelected = false;
        }
    }

    private initBadgeWindowAsset(): void {
        let _loc2_: IAsset = this._assets.getAssetByName("inventory_thumb_xml");
        let _loc1_: XmlAsset = castTo(_loc2_, XmlAsset);
        if (Badge._SafeStr_4265 == null) {
            Badge._SafeStr_4265 = asGuarded(this._windowManager.buildFromXML(XML.from(_loc1_.content)), isIWindowContainer);
        }
    }

    private startWearingBadge(param1: Badge): void {
        this._SafeStr_2685.push(param1);
        param1.isInUse = true;
    }

    private stopWearingBadge(param1: Badge): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2685.length) {
            if (this._SafeStr_2685[_loc2_] == param1) {
                this._SafeStr_2685.splice(_loc2_, 1);
                param1.isInUse = false;
                return;
            }
            _loc2_++;
        }
    }

    private resetBadges(): void {
        if (this._SafeStr_2572) {
            this._SafeStr_2572.dispose();
            this._SafeStr_2572 = null;
        }
        if (this._badges != null) {
            for (const _loc1_ of this._badges ?? []) {
                _loc1_.dispose();
            }
            this._badges = null;
        }
        if (this._SafeStr_2685 != null) {
            this._SafeStr_2685 = null;
        }
    }

    private getBadge(param1: string): Badge {
        let _loc3_: number = 0;
        let _loc2_: Badge = null;
        _loc3_ = 0;
        while (_loc3_ < this._badges.length) {
            _loc2_ = this._badges[_loc3_];
            if (_loc2_.badgeId == param1) {
                return _loc2_;
            }
            _loc3_++;
        }
        return null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (BadgesModel.#staticsReady) return;
        BadgesModel.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(BadgesModel, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.inventory.badges.BadgesModel"));
    }

    get [IInventoryModel](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
