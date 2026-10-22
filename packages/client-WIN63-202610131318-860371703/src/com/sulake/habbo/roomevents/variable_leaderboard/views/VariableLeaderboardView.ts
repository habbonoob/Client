import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { VariableLeaderboardDescriptor } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptor';
import type { VariableLeaderboardDescriptorChoice } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardDescriptorChoice';
import type { VariableLeaderboardRow } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/variableleaderboard/VariableLeaderboardRow';
import type { VariableLeaderboardContext } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableLeaderboardContext';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableLeaderboardController } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardController';
import type { VariableLeaderboardConfig } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardConfig';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ScaledWindow } from '@/com/sulake/core/window/utils/ScaledWindow';
import { VariableLeaderboardLocationProjector } from '@/com/sulake/habbo/roomevents/variable_leaderboard/VariableLeaderboardLocationProjector';
import { VariableLeaderboardChoiceRowView } from '@/com/sulake/habbo/roomevents/variable_leaderboard/views/VariableLeaderboardChoiceRowView';
import { VariableLeaderboardColumnHeaderView } from '@/com/sulake/habbo/roomevents/variable_leaderboard/views/VariableLeaderboardColumnHeaderView';
import { VariableLeaderboardRowView } from '@/com/sulake/habbo/roomevents/variable_leaderboard/views/VariableLeaderboardRowView';
import { VariableLeaderboardDisplayNameFormatter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/leaderboard/VariableLeaderboardDisplayNameFormatter';

export class VariableLeaderboardView {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard.views::VariableLeaderboardView'); }

    private static readonly _SafeStr_14309: number = 4;
    private static readonly MIN_WINDOW_WIDTH: number = 250;
    public static readonly RANK_GUTTER_WIDTH: number = 38;

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _controller: VariableLeaderboardController;

    declare private _overlayInstanceId: number;
    static { (this.prototype as any)._overlayInstanceId = 0; }

    declare private _window: IWindowContainer;

    declare private _scaledWindow: ScaledWindow;

    declare private _SafeStr_14280: VariableLeaderboardDescriptor;

    declare private _SafeStr_14285: VariableLeaderboardConfig;

    declare private _SafeStr_14302: VariableLeaderboardContext;

    declare private _SafeStr_14031: string;

    declare private _SafeStr_14310: number;
    static { (this.prototype as any)._SafeStr_14310 = 0; }

    declare private _SafeStr_14311: number;
    static { (this.prototype as any)._SafeStr_14311 = 0; }

    declare private _headerTemplate: IWindowContainer;

    declare private _rowTemplate: IWindowContainer;

    declare private _SafeStr_14312: IRegionWindow;

    declare private _headerViews: VariableLeaderboardColumnHeaderView[];

    declare private _SafeStr_14313: VariableLeaderboardRowView[];

    declare private _SafeStr_14314: VariableLeaderboardChoiceRowView[];

    declare private _SafeStr_14315: boolean;
    static { (this.prototype as any)._SafeStr_14315 = false; }

    declare private _SafeStr_14316: boolean;
    static { (this.prototype as any)._SafeStr_14316 = false; }

    declare private _SafeStr_14317: boolean;
    static { (this.prototype as any)._SafeStr_14317 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: VariableLeaderboardController, param3: number) {
        let _loc7_: number = 0;
        let _loc6_: VariableLeaderboardColumnHeaderView = null;
        let _loc4_: number = 0;
        let _loc5_: VariableLeaderboardRowView = null;
        this._roomEvents = param1;
        this._controller = param2;
        this._overlayInstanceId = param3;
        this._window = asGuarded(param1.getXmlWindow("variable_leaderboard_panel"), isIWindowContainer);
        this._SafeStr_14310 = this._window.width - this.rowsList.width;
        this._SafeStr_14311 = this._window.height - this.rowsList.height;
        this._headerTemplate = asGuarded(this.headersContainer.removeChild(this.headerTemplate), isIWindowContainer);
        this._rowTemplate = asGuarded(this.rowsList.removeListItemAt(0), isIWindowContainer);
        this._SafeStr_14312 = asGuarded(this.choiceList.removeListItemAt(0), isIRegionWindow);
        this._headerViews = [];
        _loc7_ = 0;
        while (_loc7_ < 4) {
            _loc6_ = new VariableLeaderboardColumnHeaderView(this._headerTemplate);
            this._headerViews.push(_loc6_);
            this.headersContainer.addChild(_loc6_.window);
            _loc6_.hide();
            _loc7_++;
        }
        this._SafeStr_14313 = [];
        _loc4_ = 0;
        while (_loc4_ < 20) {
            _loc5_ = new VariableLeaderboardRowView(this._rowTemplate, param1.localization, _loc4_ % 2 == 1);
            this._SafeStr_14313.push(_loc5_);
            this.rowsList.addListItem(_loc5_.window);
            _loc4_++;
        }
        this._SafeStr_14314 = [];
        this.previousButton.addEventListener("WME_CLICK", this.onPreviousPage);
        this.nextButton.addEventListener("WME_CLICK", this.onNextPage);
        this.choiceToggle.addEventListener("WME_CLICK", this.onToggleChoices);
        this.hideChoiceDropdown();
        this.setPager(1, 1, false, false);
        this.setBodyState(0);
        this._scaledWindow = new ScaledWindow(this._window);
        this._scaledWindow.window.addEventListener("WE_RELOCATED", this.onWindowRelocated);
    }

    public setDependencies(param1: IAvatarRenderManager, param2: IHabboGroupsManager): void {
        for (const _loc3_ of this._SafeStr_14313 ?? []) {
            _loc3_.setDependencies(param1, param2);
        }
    }

    public setDescriptor(param1: VariableLeaderboardDescriptor, param2: string): void {
        let _loc3_: boolean = !this.hasSameChoiceStructure(param1.choices);
        let _loc4_: boolean = this._SafeStr_14315;
        let _loc5_: boolean = this._SafeStr_14316;
        if (_loc3_ && (_loc4_ || _loc5_)) {
            this.setLocationEditState(false, false);
        }
        this._SafeStr_14280 = param1;
        this._SafeStr_14031 = param2;
        if (_loc3_) {
            this.rebuildChoices();
        }
        this.applyPresentation();
        if (_loc3_ && (_loc4_ || _loc5_)) {
            this.setLocationEditState(_loc4_, _loc5_);
        }
    }

    public setSelection(param1: string): void {
        this._SafeStr_14031 = param1;
        this.hideChoiceDropdown();
        this.refreshChoiceRows();
        this.updateTitle();
    }

    public setEditDraft(param1: VariableLeaderboardConfig, param2: VariableLeaderboardContext): void {
        this._SafeStr_14285 = param1;
        this._SafeStr_14302 = param2;
        this.applyPresentation();
    }

    public clearEditDraft(): void {
        this._SafeStr_14285 = null;
        this._SafeStr_14302 = null;
        this.applyPresentation();
    }

    public setLocationEditState(param1: boolean, param2: boolean): void {
        if (this._SafeStr_14315 == param1 && this._SafeStr_14316 == param2) {
            return;
        }
        this._SafeStr_14315 = param1;
        this._SafeStr_14316 = param2;
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        this._window.blend = param2 ? 0.35 : 1;
        this._scaledWindow.draggable = param1;
    }

    private applyPresentation(): void {
        let _loc10_: number = 0;
        let _loc12_: number = 0;
        if (this._SafeStr_14280 == null) {
            return;
        }
        this.descriptionText.text = this._SafeStr_14285?.description;
        this.descriptionText.visible = this.descriptionText.text.length > 0;
        let _loc4_: number[] = [];
        let _loc2_: string[] = [];
        let _loc9_: number[] = [];
        if (this._SafeStr_14285 == null) {
            _loc10_ = this._SafeStr_14280.sortMode;
            for (const _loc5_ of this._SafeStr_14280.columns ?? []) {
                _loc4_.push(_loc5_.type);
                _loc2_.push(_loc5_.label);
                _loc9_.push(_loc5_.pixelWidth);
            }
        } else {
            _loc10_ = this._SafeStr_14285.sortMode;
            for (const _loc1_ of this._SafeStr_14285.columns ?? []) {
                _loc4_.push(_loc1_.type);
                _loc2_.push(_loc1_.label);
                _loc9_.push(_loc1_.pixelWidth);
            }
        }
        let _loc3_: number = 38;
        for (const _loc6_ of _loc9_ ?? []) {
            _loc3_ += _loc6_;
        }
        this._window.width = Math.max(250, _loc3_ + this._SafeStr_14310) | 0;
        let _loc11_: number = this._SafeStr_14285?.entriesPerPage;
        this.rowsList.height = _loc11_ * this._rowTemplate.height;
        this._window.height = this.rowsList.height + this._SafeStr_14311;
        let _loc7_: number = 38;
        _loc12_ = 0;
        while (_loc12_ < this._headerViews.length) {
            if (_loc12_ >= _loc4_.length) {
                this._headerViews[_loc12_].hide();
            } else {
                this._headerViews[_loc12_].setColumn(_loc4_[_loc12_], _loc2_[_loc12_], _loc10_, _loc7_, _loc9_[_loc12_]);
                _loc7_ += _loc9_[_loc12_];
            }
            _loc12_++;
        }
        for (const _loc8_ of this._SafeStr_14313 ?? []) {
            _loc8_.configureColumns(_loc4_, _loc9_, this.rowsList.width);
        }
        this.refreshChoiceRows();
        this.updateTitle();
    }

    private hasSameChoiceStructure(param1: VariableLeaderboardDescriptorChoice[]): boolean {
        let _loc2_: number = 0;
        if (this._SafeStr_14314.length != param1.length) {
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            if (this._SafeStr_14314[_loc2_].variableId != param1[_loc2_].variableId) {
                return false;
            }
            _loc2_++;
        }
        return true;
    }

    private rebuildChoices(): void {
        let _loc1_: VariableLeaderboardChoiceRowView = null;
        this.clearChoiceViews();
        for (const _loc2_ of this._SafeStr_14280.choices ?? []) {
            _loc1_ = new VariableLeaderboardChoiceRowView(this._SafeStr_14312, _loc2_.variableId, this.effectiveChoiceName(_loc2_), this.onChoiceSelected);
            this._SafeStr_14314.push(_loc1_);
            this.choiceList.addListItem(_loc1_.window);
        }
        this.choiceList.height = this._SafeStr_14314.length * this._SafeStr_14312.height;
        this.choiceDropdown.height = this.choiceList.height + 4;
    }

    private refreshChoiceRows(): void {
        let _loc1_: number = 0;
        if (this._SafeStr_14280 == null) {
            return;
        }
        let _loc2_: VariableLeaderboardDescriptorChoice[] = this._SafeStr_14280.choices;
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_14314.length) {
            this._SafeStr_14314[_loc1_].displayName = this.effectiveChoiceName(_loc2_[_loc1_]);
            this._SafeStr_14314[_loc1_].selected = _loc2_[_loc1_].variableId == this._SafeStr_14031;
            _loc1_++;
        }
    }

    private effectiveChoiceName(param1: VariableLeaderboardDescriptorChoice): string {
        let _loc2_: string = null;
        let _loc3_: string = null;
        if (this._SafeStr_14285 != null) {
            _loc2_ = this._SafeStr_14285.displayOverrideFor(param1.variableId);
            if (_loc2_ != null) {
                return _loc2_;
            }
            _loc3_ = this.editTechnicalName(param1.variableId);
            if (_loc3_ != null) {
                return VariableLeaderboardDisplayNameFormatter.suggest(_loc3_);
            }
        }
        return param1.displayName;
    }

    private editTechnicalName(param1: string): string {
        if (this._SafeStr_14302 == null) {
            return null;
        }
        for (const _loc2_ of this._SafeStr_14302.choices ?? []) {
            if (_loc2_.variableId == param1) {
                return _loc2_.technicalName;
            }
        }
        return null;
    }

    private updateTitle(): void {
        if (this._SafeStr_14280 == null) {
            return;
        }
        let _loc2_: VariableLeaderboardDescriptorChoice[] = this._SafeStr_14280.choices;
        let _loc1_: boolean = _loc2_.length > 1;
        let _loc3_: string = this._SafeStr_14285?.title;
        if (_loc1_) {
            for (const _loc4_ of _loc2_ ?? []) {
                if (_loc4_.variableId == this._SafeStr_14031) {
                    _loc3_ += ": " + this.effectiveChoiceName(_loc4_);
                    break;
                }
            }
        }
        this.titleText.text = _loc3_;
        this.choiceToggle.visible = _loc1_;
        if (!_loc1_) {
            this.hideChoiceDropdown();
        }
    }

    private onToggleChoices = (param1: WindowMouseEvent): void => {
        this.choiceDropdown.visible = !this.choiceDropdown.visible;
    };

    private onChoiceSelected = (param1: string): void => {
        this._controller.selectVariable(this._overlayInstanceId, param1);
        this.hideChoiceDropdown();
    };

    private hideChoiceDropdown(): void {
        this.choiceDropdown.visible = false;
    }

    private clearChoiceViews(): void {
        let _loc3_: IRegionWindow = null;
        let _loc2_: IItemListWindow = this._window != null && !this._window.disposed ? this.choiceList : null;
        for (const _loc1_ of this._SafeStr_14314 ?? []) {
            _loc3_ = _loc1_.window;
            if (_loc2_ != null && _loc3_ != null && !_loc3_.disposed && _loc3_.parent == _loc2_) {
                _loc2_.removeListItem(_loc3_);
            }
            _loc1_.dispose();
        }
        this._SafeStr_14314 = [];
    }

    public setRowAt(param1: number, param2: VariableLeaderboardRow, param3: number): void {
        this._SafeStr_14313[param1].setData(param2, param3);
    }

    public clearRowAt(param1: number): void {
        this._SafeStr_14313[param1].clear();
    }

    public setBodyState(param1: number): void {
        let _loc2_: boolean = param1 == 1;
        this.rowsList.visible = _loc2_;
        this.bodyStateText.visible = !_loc2_;
        switch (param1) {
            case 0:
                this.bodyStateText.text = "${wiredfurni.variable_leaderboard.loading}";
                break;
            case 2:
                this.bodyStateText.text = "${wiredfurni.variable_leaderboard.no_entries}";
                break;
            default:
                this.bodyStateText.text = "";
        }
    }

    public setPager(param1: number, param2: number, param3: boolean, param4: boolean): void {
        this.pageText.text = this._roomEvents.localization.getLocalizationWithParams("wiredfurni.variable_leaderboard.page", "Page %page% / %pages%", "page", String(param1), "pages", String(param2));
        if (param3) {
            this.previousButton.enable();
        } else {
            this.previousButton.disable();
        }
        if (param4) {
            this.nextButton.enable();
        } else {
            this.nextButton.disable();
        }
    }

    private onPreviousPage = (param1: WindowMouseEvent): void => {
        this._controller.showPreviousPage(this._overlayInstanceId);
    };

    private onNextPage = (param1: WindowMouseEvent): void => {
        this._controller.showNextPage(this._overlayInstanceId);
    };

    public setAnchor(param1: Point, param2: number): void {
        let _loc3_: Point = null;
        this._SafeStr_14317 = true;
        try {
            this._scaledWindow.scale = param2;
            _loc3_ = VariableLeaderboardLocationProjector.getWindowPosition(param1, this.window.width, this.window.height);
            this.window.x = Math.round(_loc3_.x) | 0;
            this.window.y = Math.round(_loc3_.y) | 0;
        } finally {
            this._SafeStr_14317 = false;
        }
    }

    private onWindowRelocated = (param1: WindowEvent): void => {
        if (this._SafeStr_14315 && this._scaledWindow.dragging && !this._SafeStr_14317) {
            this._controller.updateDraggedWindowPosition(this._overlayInstanceId, new Point(this.window.x, this.window.y), this.window.width, this.window.height);
        }
    };

    public refreshRelativeTimes(param1: number): void {
        for (const _loc2_ of this._SafeStr_14313 ?? []) {
            _loc2_.refreshRelativeTimes(param1);
        }
    }

    public get overlayInstanceId(): number {
        return this._overlayInstanceId;
    }

    public get window(): IWindow {
        return this._scaledWindow.window;
    }

    public dispose(): void {
        let _loc2_: IButtonWindow = null;
        let _loc1_: IButtonWindow = null;
        let _loc3_: IRegionWindow = null;
        if (this._disposed) {
            return;
        }
        let _loc5_: boolean = this._window != null && !this._window.disposed;
        if (_loc5_) {
            this.setLocationEditState(false, false);
            _loc2_ = this.previousButton;
            _loc1_ = this.nextButton;
            _loc3_ = this.choiceToggle;
            if (_loc2_ != null) {
                _loc2_.removeEventListener("WME_CLICK", this.onPreviousPage);
            }
            if (_loc1_ != null) {
                _loc1_.removeEventListener("WME_CLICK", this.onNextPage);
            }
            if (_loc3_ != null) {
                _loc3_.removeEventListener("WME_CLICK", this.onToggleChoices);
            }
        }
        this.clearChoiceViews();
        for (const _loc4_ of this._SafeStr_14313 ?? []) {
            _loc4_.dispose();
        }
        for (const _loc6_ of this._headerViews ?? []) {
            _loc6_.dispose();
        }
        if (this._headerTemplate != null && !this._headerTemplate.disposed) {
            this._headerTemplate.dispose();
        }
        if (this._rowTemplate != null && !this._rowTemplate.disposed) {
            this._rowTemplate.dispose();
        }
        if (this._SafeStr_14312 != null && !this._SafeStr_14312.disposed) {
            this._SafeStr_14312.dispose();
        }
        this._scaledWindow.window.removeEventListener("WE_RELOCATED", this.onWindowRelocated);
        this._scaledWindow.dispose();
        this._scaledWindow = null;
        this._roomEvents = null;
        this._controller = null;
        this._window = null;
        this._SafeStr_14280 = null;
        this._SafeStr_14285 = null;
        this._SafeStr_14302 = null;
        this._headerTemplate = null;
        this._rowTemplate = null;
        this._SafeStr_14312 = null;
        this._headerViews = null;
        this._SafeStr_14313 = null;
        this._SafeStr_14314 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get titleText(): ITextWindow {
        return asGuarded(this._window.findChildByName("title_text"), isITextWindow);
    }

    private get descriptionText(): ITextWindow {
        return asGuarded(this._window.findChildByName("description_text"), isITextWindow);
    }

    private get choiceToggle(): IRegionWindow {
        return asGuarded(this._window.findChildByName("choice_toggle"), isIRegionWindow);
    }

    private get headersContainer(): IWindowContainer {
        return asGuarded(this._window.findChildByName("headers_container"), isIWindowContainer);
    }

    private get headerTemplate(): IWindowContainer {
        return asGuarded(this.headersContainer.findChildByName("header_template"), isIWindowContainer);
    }

    private get rowsList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("rows_list"), isIItemListWindow);
    }

    private get bodyStateText(): ITextWindow {
        return asGuarded(this._window.findChildByName("body_state_text"), isITextWindow);
    }

    private get choiceDropdown(): IWindowContainer {
        return asGuarded(this._window.findChildByName("choice_dropdown"), isIWindowContainer);
    }

    private get choiceList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("choice_list"), isIItemListWindow);
    }

    private get previousButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("previous_button"), isIButtonWindow);
    }

    private get nextButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("next_button"), isIButtonWindow);
    }

    private get pageText(): ITextWindow {
        return asGuarded(this._window.findChildByName("page_text"), isITextWindow);
    }
}
