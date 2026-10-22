import { asGuarded, asInstanceOf, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { BadgeLeaderboardResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/BadgeLeaderboardResultMessageParser';
import type { _SafeCls_6147 } from '@/com/sulake/habbo/groups/badge_leaderboard/_SafeCls_6147';
import type { BadgeLeaderboardEntryView } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardEntryView';
import type { BadgeLeaderboardPageData } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardPageData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { _SafeCls_6082 } from '@/com/sulake/habbo/communication/enum/_SafeCls_6082';
import { _SafeCls_6026 } from '@/com/sulake/habbo/communication/messages/incoming/users/_SafeCls_6026';
import { BadgeLeaderboardResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/BadgeLeaderboardResultMessageEvent';
import { BadgeLeaderboardView } from '@/com/sulake/habbo/groups/badge_leaderboard/BadgeLeaderboardView';
import { BadgeLeaderboardDataServer } from '@/com/sulake/habbo/groups/badge_leaderboard/server/BadgeLeaderboardDataServer';
import { HabboFaceFocuser } from '@/com/sulake/habbo/utils/HabboFaceFocuser';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

export class BadgeLeaderboardController extends Component implements _SafeCls_6147, IAvatarImageListener, ILinkEventTracker {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge_leaderboard::BadgeLeaderboardController'); }

    public static readonly PAGE_SIZE: number = 10;
    private static readonly DEFAULT_RANK_BORDER_COLOR: number = 6521514;
    private static readonly FIRST_PLACE_RANK_BORDER_COLOR: number = 13938487;
    private static readonly _SafeStr_14999: number = 12632256;
    private static readonly THIRD_PLACE_RANK_BORDER_COLOR: number = 13467442;
    private static readonly BASE_SUPPORTED_RARITIES: any[] = [2, 3, 4, 5, 6];

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _groupsManager: HabboGroupsManager;

    declare private _disposed_BadgeLeaderboardController: boolean;

    declare private _messageEvents: IMessageEvent[];

    declare private _view: BadgeLeaderboardView;

    declare private _SafeStr_15000: BadgeLeaderboardDataServer;

    declare private _SafeStr_15001: number;

    declare private _SafeStr_15002: number;

    declare private _currentPage: number;

    declare private _SafeStr_15003: BadgeLeaderboardPageData;

    constructor(param1: HabboGroupsManager, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._groupsManager = param1;
        this._messageEvents = [];
        this._SafeStr_15000 = new BadgeLeaderboardDataServer(this.send);
    }

    public showBadgeLeaderboard(param1: number, param2: number = -1, param3: number = 0): void {
        if (this._view == null && this._windowManager != null) {
            this._view = new BadgeLeaderboardView(this, this._windowManager);
        }
        if (this._view == null) {
            return;
        }
        this._SafeStr_15001 = this.normalizeType(param1, param2);
        this._SafeStr_15002 = this.normalizeRarity(this._SafeStr_15001, param2);
        this._currentPage = Math.max(0, param3) | 0;
        this.clearVisibleData();
        this.updateChrome();
        this._SafeStr_15000.requestPage(this._SafeStr_15001, this._SafeStr_15002, this._currentPage, this.onPageData);
        this._view.show();
    }

    public get linkPattern(): string {
        return "badge_leaderboard/";
    }

    public linkReceived(param1: string): void {
        let _loc2_: any[] = param1 == null ? [] : param1.split("/");
        if (_loc2_.length == 0 || _loc2_[0] != "badge_leaderboard") {
            return;
        }
        this.showBadgeLeaderboard(this.getLinkIntValue(_loc2_, 1, 0), this.getLinkIntValue(_loc2_, 2, -1), this.getLinkIntValue(_loc2_, 3, 0));
    }

    public hide(): void {
        if (this._view != null) {
            this._view.hide();
        }
    }

    public onDropdownOpenClicked(): void {
        if (this._view != null) {
            this._view.openDropdownMenu();
        }
    }

    public onDropdownSelectionChanged(param1: number): void {
        this.showBadgeLeaderboard(this.getTypeByDropdownIndex(param1), this.getRarityByDropdownIndex(param1), 0);
    }

    public onPreviousPageClicked(): void {
        if (this._currentPage > 0) {
            this.showBadgeLeaderboard(this._SafeStr_15001, this._SafeStr_15002, this._currentPage - 1);
        }
    }

    public onNextPageClicked(): void {
        if (this._SafeStr_15003 != null && (this._currentPage + 1) * 10 < this._SafeStr_15003.totalEntries) {
            this.showBadgeLeaderboard(this._SafeStr_15001, this._SafeStr_15002, this._currentPage + 1);
        }
    }

    public onProfileRegionClicked(param1: number): void {
        let _loc2_: _SafeCls_6026 = null;
        if (this._SafeStr_15003 == null) {
            return;
        }
        if (param1 == -1) {
            _loc2_ = this._SafeStr_15003.ownEntry;
        } else if (param1 >= 0 && param1 < this._SafeStr_15003.entries.length) {
            _loc2_ = asInstanceOf(this._SafeStr_15003.entries[param1], _SafeCls_6026);
        }
        if (_loc2_ != null) {
            this._groupsManager.showExtendedProfile(_loc2_.userId);
        }
    }

    public send(param1: IMessageComposer): void {
        if (this._communicationManager != null && this._communicationManager.connection != null) {
            this._communicationManager.connection.send(param1);
        }
    }

    public avatarImageReady(param1: string): void {
        if (this._disposed_BadgeLeaderboardController || this._SafeStr_15003 == null || !this.currentPageContainsFigure(param1)) {
            return;
        }
        this.renderEntryFacesForFigure(param1);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), this.setCommunicationManager, true), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }, false)]);
    }

    private setCommunicationManager(param1: IHabboCommunicationManager): void {
        this._communicationManager = param1;
        this.registerMessageEvents();
    }

    private registerMessageEvents(): void {
        if (this._disposed_BadgeLeaderboardController || this._communicationManager == null) {
            return;
        }
        if (this._messageEvents == null) {
            this._messageEvents = [];
        }
        if (this._messageEvents.length > 0) {
            return;
        }
        this._messageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(new BadgeLeaderboardResultMessageEvent(this.onBadgeLeaderboardResult)));
    }

    private onBadgeLeaderboardResult(param1: BadgeLeaderboardResultMessageEvent): void {
        let _loc2_: BadgeLeaderboardResultMessageParser = param1.getParser();
        this._SafeStr_15000.onBadgeLeaderboardResult(_loc2_);
    }

    private onPageData(param1: BadgeLeaderboardPageData): void {
        if (this._disposed_BadgeLeaderboardController) {
            return;
        }
        this._SafeStr_15003 = param1;
        this.updateChrome();
        this.renderEntries();
    }

    private updateChrome(): void {
        if (this._view == null) {
            return;
        }
        this._view.setFrameStyle(this.getFrameStyle(this._SafeStr_15001, this._SafeStr_15002) >>> 0);
        this._view.setDropdownOptions(this.getDropdownOptions(), this.getDropdownSelectionIndex(this._SafeStr_15001, this._SafeStr_15002));
        this._view.setTitle(this.getTitleText(this._SafeStr_15001, this._SafeStr_15002));
        this._view.setInfo(this.getHeaderAssetUri(this._SafeStr_15001, this._SafeStr_15002), this.getInfoText(this._SafeStr_15001, this._SafeStr_15002));
        this._view.setRankTypeExtendedImageYOffset(this.getHeaderAssetYOffset(this._SafeStr_15001, this._SafeStr_15002));
        this._view.setPagerEnabled(this.canGoPrevious(), this.canGoNext());
    }

    private renderEntries(): void {
        let _loc3_: any[] = null;
        let _loc5_: number = 0;
        let _loc1_: _SafeCls_6026 = null;
        let _loc6_: BadgeLeaderboardEntryView = null;
        let _loc4_: boolean = false;
        let _loc2_: _SafeCls_6026 = null;
        let _loc7_: string = this.getRowAssetUri(this._SafeStr_15001, this._SafeStr_15002);
        if (this._view == null) {
            return;
        }
        _loc3_ = this._SafeStr_15003?.entries;
        _loc5_ = 0;
        while (_loc5_ < this._view.entryViews.length) {
            _loc6_ = this._view.entryViews[_loc5_];
            _loc1_ = _loc5_ < _loc3_.length ? asInstanceOf(_loc3_[_loc5_], _SafeCls_6026) : null;
            if (_loc1_ == null) {
                this._view.setEntryVisible(_loc5_, false);
                this.clearFaceBitmap(_loc6_.profileCanvas);
            } else {
                _loc4_ = (this._currentPage * 10 + _loc5_) % 2 == 0;
                this._view.setEntryVisible(_loc5_, true);
                _loc6_.evenBackground.visible = _loc4_;
                _loc6_.unevenBackground.visible = !_loc4_;
                _loc6_.rankText.text = this.getRankText(_loc1_.rank);
                _loc6_.usernameText.text = _loc1_.userName;
                _loc6_.scoreText.text = _loc1_.score.toString();
                this.applyRankBorderColor(_loc6_, _loc1_.rank);
                _loc6_.rankTypeImage.assetUri = _loc7_;
            }
            _loc5_++;
        }
        _loc2_ = this._SafeStr_15003?.ownEntry;
        this._view.setOwnEntryVisible(_loc2_ != null);
        if (_loc2_ != null) {
            this._view.ownEntryView.rankText.text = this.getRankText(_loc2_.rank);
            this._view.ownEntryView.usernameText.text = _loc2_.userName;
            this._view.ownEntryView.scoreText.text = _loc2_.score.toString();
            this.applyRankBorderColor(this._view.ownEntryView, _loc2_.rank);
            this._view.ownEntryView.rankTypeImage.assetUri = _loc7_;
        } else {
            this.clearFaceBitmap(this._view.ownEntryView.profileCanvas);
        }
        this.renderEntryFaces();
        this._view.setPagerEnabled(this.canGoPrevious(), this.canGoNext());
    }

    private renderEntryFaces(): void {
        let _loc3_: number = 0;
        let _loc1_: _SafeCls_6026 = null;
        let _loc2_: any[] = this._SafeStr_15003?.entries;
        if (this._view == null) {
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < this._view.entryViews.length) {
            _loc1_ = _loc3_ < _loc2_.length ? asInstanceOf(_loc2_[_loc3_], _SafeCls_6026) : null;
            this.renderEntryFace(this._view.entryViews[_loc3_], _loc1_);
            _loc3_++;
        }
        this.renderEntryFace(this._view.ownEntryView, this._SafeStr_15003?.ownEntry);
    }

    private renderEntryFacesForFigure(param1: string): void {
        let _loc4_: number = 0;
        let _loc2_: _SafeCls_6026 = null;
        let _loc3_: any[] = this._SafeStr_15003?.entries;
        if (this._view == null || param1 == null) {
            return;
        }
        _loc4_ = 0;
        while (_loc4_ < this._view.entryViews.length) {
            _loc2_ = _loc4_ < _loc3_.length ? asInstanceOf(_loc3_[_loc4_], _SafeCls_6026) : null;
            if (_loc2_ != null && _loc2_.figureString == param1) {
                this.renderEntryFace(this._view.entryViews[_loc4_], _loc2_);
            }
            _loc4_++;
        }
        _loc2_ = this._SafeStr_15003?.ownEntry;
        if (_loc2_ != null && _loc2_.figureString == param1) {
            this.renderEntryFace(this._view.ownEntryView, _loc2_);
        }
    }

    private renderEntryFace(param1: BadgeLeaderboardEntryView, param2: _SafeCls_6026): void {
        let _loc4_: IAvatarImage = null;
        let _loc3_: BitmapData = null;
        this.clearFaceBitmap(param1.profileCanvas);
        if (param2 == null || this._avatarRenderManager == null || param2.figureString == null || param2.figureString.length == 0) {
            return;
        }
        _loc4_ = this._avatarRenderManager.createAvatarImage(param2.figureString, "h", null, this);
        if (_loc4_ == null) {
            return;
        }
        _loc3_ = HabboFaceFocuser.focusUserFace(_loc4_, "head", 2, 1);
        _loc4_.dispose();
        if (_loc3_ != null) {
            this.setFaceBitmap(param1.profileCanvas, _loc3_);
        }
    }

    private setFaceBitmap(param1: IBitmapWrapperWindow, param2: BitmapData): void {
        this.clearFaceBitmap(param1);
        param1.bitmap = param2;
        param1.width = param2.width;
        param1.height = param2.height;
        param1.invalidate();
    }

    private clearFaceBitmap(param1: IBitmapWrapperWindow): void {
        if (param1 == null) {
            return;
        }
        if (param1.bitmap != null) {
            param1.bitmap.dispose();
            param1.bitmap = null;
        }
        param1.invalidate();
    }

    private clearVisibleData(): void {
        let _loc1_: number = 0;
        this._SafeStr_15003 = null;
        if (this._view == null) {
            return;
        }
        _loc1_ = 0;
        while (_loc1_ < this._view.entryViews.length) {
            this._view.setEntryVisible(_loc1_, false);
            this.clearFaceBitmap(this._view.entryViews[_loc1_].profileCanvas);
            _loc1_++;
        }
        this._view.setOwnEntryVisible(false);
        this.clearFaceBitmap(this._view.ownEntryView.profileCanvas);
        this._view.setPagerEnabled(this.canGoPrevious(), false);
    }

    private currentPageContainsFigure(param1: string): boolean {
        let _loc2_: any = null;
        if (this._SafeStr_15003 == null || param1 == null) {
            return false;
        }
        for (_loc2_ of this._SafeStr_15003.entries ?? []) {
            if (_loc2_ != null && _loc2_.figureString == param1) {
                return true;
            }
        }
        return this._SafeStr_15003.ownEntry != null && this._SafeStr_15003.ownEntry.figureString == param1;
    }

    private getLinkIntValue(param1: any[], param2: number, param3: number): number {
        let _loc4_: string = null;
        let _loc5_: number = NaN;
        if (param1 == null || param2 < 0 || param2 >= param1.length) {
            return param3;
        }
        _loc4_ = asGuarded(param1[param2], isString);
        if (_loc4_ == null || _loc4_.length == 0) {
            return param3;
        }
        _loc5_ = Number(_loc4_);
        return isNaN(_loc5_) ? param3 : _loc5_ | 0;
    }

    private canGoPrevious(): boolean {
        return this._currentPage > 0;
    }

    private canGoNext(): boolean {
        return this._SafeStr_15003 != null && (this._currentPage + 1) * 10 < this._SafeStr_15003.totalEntries;
    }

    private normalizeType(param1: number, param2: number): number {
        if (param1 == 2) {
            return param1;
        }
        if (param1 == 1 && this.isSupportedRarity(param2)) {
            return param1;
        }
        return 0;
    }

    private normalizeRarity(param1: number, param2: number): number {
        if (param1 == 1) {
            return param2;
        }
        return -1;
    }

    private isSupportedRarity(param1: number): boolean {
        return this.getSupportedRarities().indexOf(param1) >= 0;
    }

    private getDropdownOptions(): any[] {
        let _loc3_: number = 0;
        let _loc2_: any[] = [this.localizationManager.getLocalization("badge_leaderboard.option.total_badges"), this.localizationManager.getLocalization("badge_leaderboard.option.achievement_level")];
        let _loc1_: any[] = this.getSupportedRarities();
        for (_loc3_ of _loc1_ ?? []) {
            _loc2_.push(this.localizationManager.getLocalizationWithParams("badge_leaderboard.option.rarity", "", "rarity", this.getRarityText(_loc3_)));
        }
        return _loc2_;
    }

    private getDropdownSelectionIndex(param1: number, param2: number): number {
        let _loc4_: any[] = null;
        let _loc3_: number = 0;
        if (param1 == 0) {
            return 0;
        }
        if (param1 == 2) {
            return 1;
        }
        _loc4_ = this.getSupportedRarities();
        _loc3_ = _loc4_.indexOf(param2);
        return _loc3_ < 0 ? 0 : _loc3_ + 2;
    }

    private getTypeByDropdownIndex(param1: number): number {
        if (param1 <= 0) {
            return 0;
        }
        if (param1 == 1) {
            return 2;
        }
        return 1;
    }

    private getRarityByDropdownIndex(param1: number): number {
        let _loc2_: any[] = this.getSupportedRarities();
        if (param1 <= 1 || param1 > _loc2_.length + 1) {
            return -1;
        }
        return _loc2_[param1 - 2] | 0;
    }

    private getTitleText(param1: number, param2: number): string {
        if (param1 == 1) {
            return this.localizationManager.getLocalizationWithParams("badge_leaderboard.title.rarity", "", "rarity", this.getRarityText(param2));
        }
        if (param1 == 2) {
            return this.localizationManager.getLocalization("badge_leaderboard.title.achievement_level");
        }
        return this.localizationManager.getLocalization("badge_leaderboard.title.total_badges");
    }

    private getInfoText(param1: number, param2: number): string {
        if (param1 == 1) {
            return this.localizationManager.getLocalization(this.getInfoLocalizationKey(param2));
        }
        if (param1 == 2) {
            return this.localizationManager.getLocalization("badge_leaderboard.info.achievement_level");
        }
        return this.localizationManager.getLocalization("badge_leaderboard.info.total_badges");
    }

    private getInfoLocalizationKey(param1: number): string {
        switch (param1 - 1) {
            case 0:
                return "badge_leaderboard.info.rarity.uncommon";
            case 1:
                return "badge_leaderboard.info.rarity.rare";
            case 2:
                return "badge_leaderboard.info.rarity.epic";
            case 3:
                return "badge_leaderboard.info.rarity.mythical";
            case 4:
                return "badge_leaderboard.info.rarity.legendary";
            case 5:
                return "badge_leaderboard.info.rarity.unique";
            default:
                return "badge_leaderboard.info.total_badges";
        }
    }

    private getRarityText(param1: number): string {
        return this.localizationManager.getLocalization(_SafeCls_6082.getLocalizationKey(param1, this.isUncommonBadgeRarityEnabled()));
    }

    private getHeaderAssetUri(param1: number, param2: number): string {
        if (param1 == 1) {
            return this.getRarityAssetBase(param2) + "_extended";
        }
        if (param1 == 2) {
            return "badges_emblem_achievement_extended";
        }
        return "badge_rarity_badges_emblem";
    }

    private getFrameStyle(param1: number, param2: number): number {
        if (param1 == 1) {
            switch (param2 - 1) {
                case 0:
                    return 10007;
                case 1:
                    return 10002;
                case 2:
                    return 10003;
                case 3:
                    return 10004;
                case 4:
                    return 10005;
                case 5:
                    return 10006;
            }
        }
        if (param1 == 2) {
            return 10001;
        }
        return 10000;
    }

    private getHeaderAssetYOffset(param1: number, param2: number): number {
        if (param1 == 0 || param1 == 1 && param2 == 1) {
            return -9;
        }
        if (param1 == 2) {
            return -7;
        }
        return 0;
    }

    private getRowAssetUri(param1: number, param2: number): string {
        if (param1 == 1) {
            return this.getRarityAssetBase(param2);
        }
        if (param1 == 2) {
            return "badges_emblem_achievement";
        }
        return "badge_rarity_badges_emblem";
    }

    private getRarityAssetBase(param1: number): string {
        switch (param1 - 1) {
            case 0:
                return "badge_rarity_badges_emblem_uncommon";
            case 1:
                return "badge_rarity_badges_emblem_rare";
            case 2:
                return "badge_rarity_badges_emblem_very_rare";
            case 3:
                return "badge_rarity_badges_emblem_mythical";
            case 4:
                return "badge_rarity_badges_emblem_legendary";
            case 5:
                return "badge_rarity_badges_emblem_unique";
            default:
                return "badge_rarity_badges_emblem";
        }
    }

    private getSupportedRarities(): any[] {
        let _loc1_: any[] = BadgeLeaderboardController.BASE_SUPPORTED_RARITIES.concat();
        if (this.isUncommonBadgeRarityEnabled()) {
            _loc1_.unshift(1);
        }
        return _loc1_;
    }

    private isUncommonBadgeRarityEnabled(): boolean {
        return this._groupsManager != null && this._groupsManager.getBoolean("badge_rarity.uncommon");
    }

    private getRankText(param1: number): string {
        return param1 < 0 ? "--" : param1.toString();
    }

    private applyRankBorderColor(param1: BadgeLeaderboardEntryView, param2: number): void {
        if (param1 == null || param1.rankBorder == null) {
            return;
        }
        param1.rankBorder.color = this.getRankBorderColor(param2);
    }

    private getRankBorderColor(param1: number): number {
        switch (param1 - 1) {
            case 0:
                return 13938487;
            case 1:
                return 12632256;
            case 2:
                return 13467442;
            default:
                return 6521514;
        }
    }

    public get localizationManager(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get groupsManager(): HabboGroupsManager {
        return this._groupsManager;
    }

    public get view(): BadgeLeaderboardView {
        return this._view;
    }

    public override get disposed(): boolean {
        return this._disposed_BadgeLeaderboardController;
    }

    public override dispose(): void {
        let _loc1_: any = null;
        if (this._disposed_BadgeLeaderboardController) {
            return;
        }
        this.clearVisibleData();
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        if (this._SafeStr_15000 != null) {
            this._SafeStr_15000.dispose();
            this._SafeStr_15000 = null;
        }
        if (this._messageEvents != null && this._communicationManager != null) {
            for (_loc1_ of this._messageEvents ?? []) {
                this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            }
        }
        this._messageEvents = null;
        this._communicationManager = null;
        this._localizationManager = null;
        this._windowManager = null;
        this._avatarRenderManager = null;
        this._groupsManager = null;
        this._SafeStr_15003 = null;
        this._disposed_BadgeLeaderboardController = true;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.send = this.send.bind(this);
        this.setCommunicationManager = this.setCommunicationManager.bind(this);
        this.onBadgeLeaderboardResult = this.onBadgeLeaderboardResult.bind(this);
        this.onPageData = this.onPageData.bind(this);
        this._disposed_BadgeLeaderboardController = false;
        this._SafeStr_15001 = 0;
        this._SafeStr_15002 = -1;
        this._currentPage = 0;
        super.initInstanceFields();
    }
}
