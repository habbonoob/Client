import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { EarningsController } from '@/com/sulake/habbo/catalog/earnings/EarningsController';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class EarningsView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.earnings::EarningsView'); }

    private readonly ALL_CATEGORIES: number = -1;

    declare private _controller: EarningsController;

    declare private _window: IWindowContainer;

    private _rewardCategories: any[] = ["tutorial", "dailygift", "achievements", "marketplace", "habboclub", "levelprogression", "roombundlesales", "bonusbag", "donation", "surprise", "snowstorm", "games", "wiredchest", "agency"];

    constructor(param1: EarningsController, param2: IHabboWindowManager) {
        this._controller = param1;
        this._window = asGuarded(param2.buildFromXML(XML.from(this._controller.assets.getAssetByName("vault_view_xml").content)), isIWindowContainer);
        this._window.procedure = this.windowProcedure;
        this._window.center();
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("scrolling_earnings_list"), isIItemListWindow);
        if (!this._controller.getBoolean("games_icon_enabled")) {
            _loc3_.findChildByName("snowstorm_container").visible = false;
        }
        if (!this._controller.getBoolean("wired.game_earnings")) {
            _loc3_.findChildByName("games_container").visible = false;
            _loc3_.findChildByName("agency_container").visible = false;
        }
        _loc3_.findChildByName("wiredchest_container").visible = false;
    }

    private static getDistinctRewardCategories(param1: any[]): any[] {
        let _loc5_: any;
        let _loc2_: boolean = false;
        let _loc4_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc2_ = false;
            for (_loc5_ of _loc4_ ?? []) {
                if (_loc3_.rewardCategory == _loc5_) {
                    _loc2_ = true;
                    break;
                }
            }
            if (!_loc2_) {
                _loc4_.push(_loc3_.rewardCategory);
            }
        }
        return _loc4_;
    }

    public onIncomeRewardClaimResponse(param1: number, param2: boolean): void {
        let _loc3_: number = 0;
        if (param2) {
            if (param1 == -1) {
                _loc3_ = 0;
                while (_loc3_ < this._rewardCategories.length) {
                    this.updateRewardsForCategory(_loc3_, 0, 0);
                    this.setElementEnabled(this._rewardCategories[_loc3_] + "_claim_button", false);
                    _loc3_ += 1;
                }
            } else {
                this.updateRewardsForCategory(param1, 0, 0);
            }
        } else if (param1 != -1) {
            this.setElementEnabled(this._rewardCategories[param1] + "_claim_button", true);
        } else {
            this.setElementEnabled("claim_all_btn", true);
        }
    }

    public onIncomeRewardDataReceived(param1: any[]): void {
        let _loc9_: any;
        let _loc11_: any;
        let _loc7_: number = 0;
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc5_: boolean = false;
        let _loc6_: any[] = [];
        for (const _loc3_ of EarningsView.getDistinctRewardCategories(param1) ?? []) {
            _loc7_ = 0;
            _loc4_ = 0;
            _loc8_ = 0;
            for (_loc9_ of param1 ?? []) {
                if (_loc3_ == _loc9_.rewardCategory) {
                    if (_loc9_.rewardType == 0) {
                        _loc7_ = _loc7_ + _loc9_.amount | 0;
                    }
                    if (_loc9_.rewardType === 1) {
                        _loc4_ = _loc4_ + _loc9_.amount | 0;
                    }
                    if (_loc9_.productCode) {
                        _loc8_++;
                    }
                }
            }
            this.updateRewardsForCategory(_loc3_ | 0, _loc4_, _loc7_, _loc8_);
            if (_loc4_ > 0 || _loc7_ > 0 || _loc8_ > 0) {
                _loc6_.push(this._rewardCategories[_loc3_]);
            }
        }
        let _loc2_: boolean = false;
        for (const _loc10_ of this._rewardCategories ?? []) {
            _loc5_ = false;
            for (_loc11_ of _loc6_ ?? []) {
                if (_loc10_ == _loc11_) {
                    _loc5_ = true;
                    _loc2_ = true;
                    break;
                }
            }
            if (_loc5_ && _loc10_ == "wiredchest") {
                this._window.findChildByName("wiredchest_container").visible = true;
            }
            this.setElementEnabled(_loc10_ + "_claim_button", _loc5_);
        }
        this.setElementEnabled("claim_all_btn", _loc2_);
    }

    private getTotalDucketsToClaim(): number {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < this._rewardCategories.length) {
            _loc1_ += this.ducketValueForCategory(_loc2_);
            _loc2_ += 1;
        }
        return _loc1_;
    }

    private ducketValueForCategory(param1: number): number {
        if (param1 == -1) {
            return this.getTotalDucketsToClaim();
        }
        let _loc3_: string = stringOrNull(this._rewardCategories[param1]);
        let _loc2_: IWindow = this._window.findChildByName(_loc3_ + "DucketValue");
        if (_loc2_ != null) {
            return Number(_loc2_.caption) | 0;
        }
        return 0;
    }

    private updateRewardsForCategory(param1: number, param2: number, param3: number, param4: number = 0): void {
        let _loc6_: IWindow = null;
        let _loc8_: string = stringOrNull(this._rewardCategories[param1]);
        let _loc7_: IWindow = this._window.findChildByName(_loc8_ + "CreditValue");
        if (_loc7_ != null) {
            _loc7_.caption = param2.toString();
        }
        let _loc5_: IWindow = this._window.findChildByName(_loc8_ + "DucketValue");
        if (_loc5_ != null) {
            _loc5_.caption = param3.toString();
        }
        if (param4 > 0) {
            _loc6_ = this._window.findChildByName(_loc8_ + "ProductValue");
            if (_loc6_ != null) {
                _loc6_.caption = param4.toString();
            }
        }
    }

    private setElementEnabled(param1: string, param2: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_ != null) {
            param2 ? _loc3_.enable() : _loc3_.disable();
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        let claiming: boolean = false;
        let claimCategory: number = 0;
        let newAmountOfDuckets: number = 0;
        let currentDuckets: number = 0;
        let softLimit: number = 0;
        let event: WindowEvent = param1;
        let target: IWindow = param2;
        if (event.type != "WME_CLICK") {
            return;
        }
        claiming = false;
        claimCategory = 0;
        switch (target.name) {
            case "vaultWithdraw_button":
            case "vaultWithdrawAll_button":
                this._controller.withdrawVaultCredits();
                break;
            case "vaultOpenShop_button":
                this._controller.openCatalogue();
                break;
            case "header_button_close":
                this.dispose();
                break;
            case "dailygift_claim_button":
                claiming = true;
                claimCategory = 1;
                break;
            case "achievements_claim_button":
                claiming = true;
                claimCategory = 2;
                break;
            case "marketplace_claim_button":
                claiming = true;
                claimCategory = 3;
                break;
            case "habboclub_claim_button":
                claiming = true;
                claimCategory = 4;
                break;
            case "levelprogression_claim_button":
                claiming = true;
                claimCategory = 5;
                break;
            case "bonusbag_claim_button":
                claiming = true;
                claimCategory = 7;
                break;
            case "donation_claim_button":
                claiming = true;
                claimCategory = 8;
                break;
            case "surprise_claim_button":
                claiming = true;
                claimCategory = 9;
                break;
            case "snowstorm_claim_button":
                claiming = true;
                claimCategory = 10;
                break;
            case "games_claim_button":
                claiming = true;
                claimCategory = 11;
                break;
            case "wiredchest_claim_button":
                claiming = true;
                claimCategory = 12;
                break;
            case "agency_claim_button":
                claiming = true;
                claimCategory = 13;
                break;
            case "claim_all_btn":
                claiming = true;
                claimCategory = -1;
        }
        if (claiming) {
            newAmountOfDuckets = this.ducketValueForCategory(claimCategory);
            currentDuckets = this._controller.catalog.getPurse().getActivityPointsForType(0);
            softLimit = this._controller.getInteger("duckets.soft_limit", 2147483647);
            if (newAmountOfDuckets > 0 && newAmountOfDuckets + currentDuckets > softLimit) {
                this._controller.windowManager.confirm("${generic.alert.title}", "${earning.exceeding_limit}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                   param1.dispose();
                   if (param2.type == "WE_OK") {
                       this.performClaim(target.name, claimCategory);
                   }
               });
            } else {
                this.performClaim(target.name, claimCategory);
            }
        }
    };

    private performClaim(param1: string, param2: number): void {
        if (this._window == null || this._controller == null) {
            return;
        }
        this.setElementEnabled(param1, false);
        this._controller.claimReward(param2);
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._controller = null;
    }

    public get disposed(): boolean {
        return this._controller == null;
    }

    get [IDisposable](): true {
        return true;
    }
}
