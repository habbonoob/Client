import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IWiredCtrl } from '@/com/sulake/habbo/roomevents/wired_setup/IWiredCtrl';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/IListPreset';
import type { SpacerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SpacerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { ProgressTreasureHuntMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/treasurehunt/ProgressTreasureHuntMessageComposer';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { ListScrollParams } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/ListScrollParams';
import { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';
import { MenuItem } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/MenuItem';
import { MenuPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/MenuPreset';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class FramePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::FramePreset'); }

    private static readonly MENU_COPY: number = 0;
    private static readonly MENU_PASTE: number = 1;
    private static readonly MENU_COPY_INTO: number = 2;
    private static readonly MENU_CLEAR_PICKS: number = 3;
    private static readonly MENU_RESET: number = 4;
    private static readonly MENU_OPEN_CREATOR_TOOLS: number = 5;
    private static readonly MENU_SAVE: number = 6;
    private static readonly MENU_CLOSE: number = 7;

    declare protected _frame: IFrameWindow;

    declare protected _headerPreset: HeaderPreset;

    declare protected _listPreset: IListPreset;

    declare private _SafeStr_4343: (...args: any[]) => any;

    declare private _holderKey: string;

    declare private _code: number;
    static { (this.prototype as any)._code = 0; }

    declare private _leftRightMargin: number;
    static { (this.prototype as any)._leftRightMargin = 0; }

    declare private _topBottomMargin: number;
    static { (this.prototype as any)._topBottomMargin = 0; }

    declare private _ignoreEvents: boolean;
    static { (this.prototype as any)._ignoreEvents = false; }

    declare private _SafeStr_14419: boolean;
    static { (this.prototype as any)._SafeStr_14419 = false; }

    declare private _scrollParams: ListScrollParams;

    declare private _SafeStr_2336: MenuPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: (...args: any[]) => any, param6: string, param7: number, param8: boolean = false, param9: boolean = false, param10: ListScrollParams = null) {
        super(param1, param2, param3);
        this._SafeStr_4343 = param5;
        this._holderKey = param6;
        this._code = param7;
        this._SafeStr_14419 = param9;
        this._scrollParams = param10;
        this._frame = param3.createFrame();
        this._leftRightMargin = this._frame.width - this._frame.margins.right + this._frame.margins.left;
        this._topBottomMargin = this._frame.height - this._frame.margins.bottom + this._frame.margins.top;
        this.createListView(param4);
        this._listPreset.window.addEventListener("WE_RESIZED", this.onContentsResized);
        this._frame.findChildByTag("close").addEventListener("WME_CLICK", this.onCloseClicked);
        this._frame.content.addChild(this._listPreset.window);
        this._frame.color = this._SafeStr_2144.frameColor;
        if (param8) {
            this._frame.setParamFlag(65536, true);
            this._frame.addEventListener("WE_RESIZED", this.onFrameResized);
        }
        if (this._frame.menuButton != null && param9) {
            this._frame.menuButtonVisible = true;
            this._frame.menuButton.addEventListener("WME_CLICK", this.onMenuButtonClick);
            this.createMenuPreset();
        }
    }

    protected createListView(param1: any[]): void {
        let _loc16_: SpacerPreset = null;
        let _loc8_: number = 0;
        let _loc17_: WiredUIPreset = null;
        let _loc2_: number = 0;
        let _loc13_: SpacerPreset = null;
        let _loc4_: SpacerPreset = null;
        let _loc11_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: ListScrollParams = null;
        let _loc15_: IListPreset = null;
        let _loc6_: any[] = null;
        let _loc12_: number = this._SafeStr_2144.sectionSpacing;
        let _loc10_: any[] = [];
        let _loc9_: HeaderPreset = null;
        let _loc14_: FooterPreset = null;
        let _loc7_: any[] = param1;
        if (this._scrollParams != null && this._scrollParams.stickyHeader && _loc7_.length > 0 && _loc7_[0] instanceof HeaderPreset) {
            this._headerPreset = _loc9_ = asInstanceOf(param1[0], HeaderPreset);
            _loc7_ = param1.slice(1, _loc7_.length);
        }
        if (this._scrollParams != null && this._scrollParams.stickyFooter && _loc7_.length > 0 && _loc7_[_loc7_.length - 1] instanceof FooterPreset) {
            _loc14_ = asInstanceOf(_loc7_[_loc7_.length - 1], FooterPreset);
            _loc7_ = _loc7_.slice(0, _loc7_.length - 1);
        }
        _loc8_ = 0;
        while (_loc8_ < _loc7_.length) {
            _loc17_ = _loc7_[_loc8_];
            if (_loc17_ instanceof HeaderPreset) {
                this._headerPreset = _loc17_ instanceof HeaderPreset ? _loc17_ : null;
            }
            _loc10_.push(_loc17_);
            if (_loc8_ < _loc7_.length - 1) {
                _loc16_ = this._presetManager.createSpacer(_loc12_);
                _loc17_.blendSpacer = _loc16_;
                _loc10_.push(_loc16_);
            }
            _loc8_++;
        }
        if (this._scrollParams != null) {
            if (_loc9_ != null || _loc14_ != null) {
                _loc2_ = 0;
                if (_loc9_ != null) {
                    _loc2_ += _loc9_.window.height + _loc12_;
                    _loc13_ = this._presetManager.createSpacer(_loc12_);
                    _loc10_.unshift(_loc13_);
                }
                if (_loc14_ != null) {
                    _loc2_ += _loc14_.window.height + _loc12_;
                    _loc4_ = this._presetManager.createSpacer(_loc12_);
                    if (_loc7_.length > 0) {
                        castTo(_loc7_[_loc7_.length - 1], WiredUIPreset).blendSpacer = _loc4_;
                    }
                    _loc10_.push(_loc4_);
                }
                _loc11_ = Math.max(0, this._scrollParams.minHeight - _loc2_) | 0;
                _loc3_ = Math.max(_loc11_, this._scrollParams.maxHeight - _loc2_) | 0;
                _loc5_ = new ListScrollParams(this._scrollParams.alwaysShowScrollbar, _loc11_, _loc3_, false, false);
                _loc15_ = this._presetManager.createScrollList(_loc10_, _loc5_);
                _loc15_.spacing = 0;
                _loc6_ = [];
                if (_loc9_ != null) {
                    _loc6_.push(_loc9_);
                }
                _loc6_.push(_loc15_);
                if (_loc14_ != null) {
                    _loc6_.push(_loc14_);
                }
                this._listPreset = this._presetManager.createSimpleListView(true, _loc6_);
                this._listPreset.spacing = 0;
                return;
            }
            this._listPreset = this._presetManager.createScrollList(_loc10_, this._scrollParams);
        } else {
            this._listPreset = this._presetManager.createSimpleListView(true, _loc10_);
        }
        this._listPreset.spacing = 0;
    }

    public set title(param1: string) {
        this._frame.caption = param1;
    }

    private onMenuButtonClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2336) {
            this._SafeStr_2336.requestOpen();
        }
    };

    public refreshForNewTriggerable(): void {
        if (this._SafeStr_2336) {
            this._SafeStr_2336.setSelected(2, false);
            this.updateButtonDisabledStates();
        }
    }

    public updateButtonDisabledStates(): void {
        let _loc1_: IWiredCtrl = null;
        let _loc2_: boolean = false;
        if (this._SafeStr_2336) {
            _loc1_ = this._roomEvents.wiredCtrl;
            _loc2_ = this._roomEvents.wiredMenu.hasWritePermission;
            this._SafeStr_2336.setDisabled(0, !_loc2_);
            this._SafeStr_2336.setDisabled(1, !_loc2_ || !_loc1_.hasCurrentElementInClipboard());
            this._SafeStr_2336.setDisabled(2, !_loc2_);
            this._SafeStr_2336.setDisabled(3, !_loc2_ || _loc1_.getStuffIds().length + _loc1_.getStuffIds2().length == 0);
            this._SafeStr_2336.setDisabled(4, !_loc2_);
            this._SafeStr_2336.setDisabled(5, false);
            this._SafeStr_2336.setDisabled(6, !_loc2_);
            this._SafeStr_2336.setDisabled(7, false);
        }
    }

    private createMenuPreset(): void {
        let _loc1_: any[] = [new MenuItem("${wiredfurni.params.menu.copy}", this.onCopyConfigMenuClick, "${wiredfurni.params.menu.copy_paste.tooltip}"), new MenuItem("${wiredfurni.params.menu.paste}", this.onPasteConfigMenuClick, "${wiredfurni.params.menu.copy_paste.tooltip}"), new MenuItem("${wiredfurni.params.menu.paste_into}", null, "${wiredfurni.params.menu.paste_into.tooltip}", true), MenuPreset.SPACER, new MenuItem("${wiredfurni.params.menu.clear_picks}", this.onClearPicksMenuClick), new MenuItem("${wiredfurni.params.menu.reset}", this.onResetMenuClick), MenuPreset.SPACER, new MenuItem("${wiredfurni.params.menu.open_menu}", this.onOpenMenuMenuClick), MenuPreset.SPACER, new MenuItem("${wiredfurni.params.menu.save}", this.onSaveMenuClick, "${wiredfurni.params.menu.save.tooltip}"), new MenuItem("${wiredfurni.params.menu.close}", this.onCloseMenuClick)];
        if (this._holderKey == "action" && this._code == ActionTypeCodes.RESET) {
            _loc1_.push(MenuPreset.SPACER);
            _loc1_.push(new MenuItem("Erase from existence", this.onEraseClick));
        }
        this._SafeStr_2336 = this._presetManager.createMenuPreset(_loc1_, this._frame.menuButton);
    }

    private onFrameResized = (param1: WindowEvent): void => {
        if (!this._ignoreEvents) {
            this.resizeToWidth(this._frame.width);
        }
    };

    private onContentsResized = (param1: WindowEvent): void => {
        if (!this._ignoreEvents) {
            this.fixHeight();
        }
    };

    private onCloseClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_4343 != null) {
            this._SafeStr_4343();
        }
    };

    public get isCopyingIntoMode(): boolean {
        return this._SafeStr_2336 != null && this._SafeStr_2336.getSelected(2);
    }

    public override get window(): IWindow {
        return this._frame;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._ignoreEvents = true;
        this._frame.width = param1;
        this._listPreset.resizeToWidth(param1 - this._leftRightMargin);
        this._ignoreEvents = false;
        this.fixHeight();
    }

    private get headerFrameBackground(): IWindow {
        return this._frame.findChildByTag("wired_header_bg");
    }

    private fixHeight(): void {
        this._ignoreEvents = true;
        let _loc2_: number = this._listPreset.window.height + this._topBottomMargin;
        this._frame.limits.minHeight = _loc2_;
        this._frame.limits.maxHeight = _loc2_;
        this._frame.height = _loc2_;
        this._ignoreEvents = false;
        let _loc1_: IWindow = this.headerFrameBackground;
        if (_loc1_ != null && this._headerPreset != null) {
            _loc1_.height = this._headerPreset.window.height + this._frame.margins.top + this._SafeStr_2144.sectionSpacing;
        }
    }

    protected override get childPresets(): any[] {
        if (this._SafeStr_2336 == null) {
            return [this._listPreset];
        }
        return [this._listPreset, this._SafeStr_2336];
    }

    public override dispose(): void {
        this._listPreset.window.removeEventListener("WE_RESIZED", this.onContentsResized);
        this._frame.removeEventListener("WE_RESIZED", this.onFrameResized);
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._frame.dispose();
        this._frame = null;
        this._listPreset = null;
        this._SafeStr_4343 = null;
        this._SafeStr_2336 = null;
    }

    public onCopyConfigMenuClick = (): void => {
        this._roomEvents.wiredCtrl.createClipboardCopy();
    };

    public onPasteConfigMenuClick = (): void => {
        this._roomEvents.wiredCtrl.pasteFromClipboard();
    };

    public onClearPicksMenuClick = (): void => {
        this._roomEvents.wiredCtrl.clearStuffPicks();
    };

    public onResetMenuClick = (): void => {
        this._roomEvents.wiredCtrl.resetToDefault();
    };

    public onOpenMenuMenuClick = (): void => {
        this._roomEvents.context.createLinkEvent("wiredmenu/open");
    };

    public onSaveMenuClick = (): void => {
        this._roomEvents.wiredCtrl.update(1);
    };

    public onCloseMenuClick = (): void => {
        this._roomEvents.wiredCtrl.close();
    };

    public onEraseClick = (): void => {
        this._roomEvents.send(new ProgressTreasureHuntMessageComposer("wf15", this._holderKey + this._code));
        this._roomEvents.wiredCtrl.close();
    };
}
