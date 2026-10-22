import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { GuildColorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildColorData';
import type { GuildCreationData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildCreationData';
import type { GuildEditData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildEditData';
import type { IGuildData } from '@/com/sulake/habbo/communication/messages/incoming/users/IGuildData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/RoomEntryData';
import { CreateGuildMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/CreateGuildMessageComposer';
import { UpdateGuildBadgeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UpdateGuildBadgeMessageComposer';
import { UpdateGuildColorsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UpdateGuildColorsMessageComposer';
import { UpdateGuildIdentityMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UpdateGuildIdentityMessageComposer';
import { UpdateGuildSettingsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/UpdateGuildSettingsMessageComposer';
import { BadgeEditorCtrl } from '@/com/sulake/habbo/groups/badge/BadgeEditorCtrl';
import { ColorGridCtrl } from '@/com/sulake/habbo/groups/ColorGridCtrl';
import { GuildSettingsChangedInManageEvent } from '@/com/sulake/habbo/groups/events/GuildSettingsChangedInManageEvent';
import { GuildSettingsCtrl } from '@/com/sulake/habbo/groups/GuildSettingsCtrl';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GuildManagementWindowCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups::GuildManagementWindowCtrl'); }

    private static readonly VIEW_IDENTITY: number = 1;
    private static readonly VIEW_BADGE: number = 2;
    private static readonly VIEW_COLORS: number = 3;
    private static readonly VIEW_CONFIRM: number = 4;
    private static readonly VIEW_SETTINGS: number = 5;
    private static readonly _SafeStr_7826: number = 43;
    private static readonly _SafeStr_8135: number = 69;
    private static readonly EDIT_HEADER_TEXTS_OFFSET: number = -20;
    private static readonly CREATE_HEADER_BITMAP_OFFSET: number = 36;
    private static readonly STEP_TITLE_Y_OFFSET_ACTIVE: number = 5;
    private static readonly STEP_TITLE_Y_OFFSET_INACTIVE: number = 9;
    private static readonly STEP_TITLE_CREDIT_Y_OFFSET_ACTIVE: number = 6;
    private static readonly STEP_TITLE_CREDIT_Y_OFFSET_INACTIVE: number = 10;
    private static readonly MAX_DESCRIPTION_LENGTH: number = 255;
    private static readonly MAX_NAME_LENGTH: number = 30;

    declare private _manager: HabboGroupsManager;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2297: BadgeEditorCtrl;

    declare private _SafeStr_2353: ColorGridCtrl;

    declare private _SafeStr_2365: ColorGridCtrl;

    declare private _SafeStr_2825: GuildSettingsCtrl;

    private _SafeStr_5439: boolean = false;
    private _SafeStr_3429: number = 0;

    declare private _data: IGuildData;

    private _SafeStr_2202: number = 1;

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
        this._SafeStr_2297 = new BadgeEditorCtrl(this._manager);
        this._SafeStr_2353 = new ColorGridCtrl(this._manager, this.onPrimaryColorSelected);
        this._SafeStr_2365 = new ColorGridCtrl(this._manager, this.onSecondaryColorSelected);
        this._SafeStr_2825 = new GuildSettingsCtrl();
    }

    public dispose(): void {
        this._manager = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2297) {
            this._SafeStr_2297.dispose();
            this._SafeStr_2297 = null;
        }
        if (this._SafeStr_2353) {
            this._SafeStr_2353.dispose();
            this._SafeStr_2353 = null;
        }
        if (this._SafeStr_2365) {
            this._SafeStr_2365.dispose();
            this._SafeStr_2365 = null;
        }
    }

    public get disposed(): boolean {
        return this._manager == null;
    }

    private prepare(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._manager.getXmlWindow("group_management_window"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onCloseWindow;
        this._window.center();
        this._window.findChildByName("create_room_link_region").procedure = this.onCreateRoomLink;
        this._window.findChildByName("cancel_link_region").procedure = this.onCancelLink;
        this._window.findChildByName("next_step_button").procedure = this.onNextStep;
        this._window.findChildByName("previous_step_link_region").procedure = this.onPreviousStep;
        this._window.findChildByName("buy_button").procedure = this.onBuy;
        this._window.findChildByName("vip_required_region").procedure = this.onGetVip;
        this._window.addEventListener("WE_DEACTIVATED", this.onWindowUnActivated);
        this._window.findChildByName("edit_tab_1").procedure = this.onTab;
        this._window.findChildByName("edit_tab_2").procedure = this.onTab;
        this._window.findChildByName("edit_tab_3").procedure = this.onTab;
        this._window.findChildByName("edit_tab_5").procedure = this.onTab;
        this._window.findChildByName("reset_badge").procedure = this.onBadgeReset;
        this._window.findChildByName("reset_colors").procedure = this.onColorReset;
        this._window.findChildByName("step_1_members_region").procedure = this.onMembersClick;
        this._SafeStr_2825.prepare(this._window);
    }

    public onFlatCreated(param1: number, param2: string): void {
        if (this._window != null && Boolean(this._window.visible) && this._data != null && !this._data.exists) {
            this._data.ownedRooms.splice(0, 0, new RoomEntryData(param1, param2, false));
            this.prepareRoomSelection();
            this.getBaseDropMenu().selection = 0;
        }
    }

    public onSubscriptionChange(): void {
        if (this._window != null && Boolean(this._window.visible) && this._data != null && !this._data.exists && this._SafeStr_2202 == 4) {
            this.refresh();
        }
    }

    public refresh(): void {
        let _loc2_: number = 0;
        let _loc1_: IWindow = null;
        this.prepare();
        let _loc3_: boolean = !this._data.exists || this._data.isOwner;
        this._window.findChildByName("edit_tab_1").visible = _loc3_;
        this._window.findChildByName("edit_tab_2").visible = _loc3_;
        this._window.findChildByName("edit_tab_3").visible = _loc3_;
        this._window.findChildByName("edit_tab_5").visible = _loc3_;
        _loc2_ = 1;
        while (_loc2_ <= 5) {
            this.getStepContainer(_loc2_).visible = this._SafeStr_2202 == _loc2_;
            _loc1_ = this._window.findChildByName("header_pic_bitmap_step_" + _loc2_);
            _loc1_.y = this._data.exists ? 0 : 36;
            _loc1_.visible = this._SafeStr_2202 == _loc2_;
            _loc2_++;
        }
        this._window.findChildByName("header_caption_txt").caption = this.getStepCaption();
        this._window.findChildByName("header_desc_txt").caption = this.getStepDesc();
        this._window.findChildByName("header_pic_bitmap");
        this._window.findChildByName("header_caption_txt").y = 43 + this.getHeaderTextOffset();
        this._window.findChildByName("header_desc_txt").y = 69 + this.getHeaderTextOffset();
        this._window.findChildByName("edit_guild_tab_context").visible = this._data.exists;
        this._window.findChildByName("footer_cont").visible = !this._data.exists;
        this._window.findChildByName("reset_badge").visible = false;
        this._window.findChildByName("reset_colors").visible = false;
        if (this._SafeStr_2202 == 2) {
            if (!this._data.exists) {
                this._manager.trackGoogle("groupPurchase", "step2_badge");
            }
            if (!this._SafeStr_2297.isIntialized) {
                this._SafeStr_2297.createWindow(this.getStepContainer(2), this._data.badgeSettings);
                this._SafeStr_2297.resetLayerOptions(this._data.badgeSettings);
            }
            this._window.findChildByName("reset_badge").visible = this._data.exists;
        }
        if (this._SafeStr_2202 == 3) {
            if (!this._data.exists) {
                this._manager.trackGoogle("groupPurchase", "step3_colors");
            }
            if (!this._SafeStr_2353.isInitialized) {
                this._SafeStr_2353.createAndAttach(this.getStepContainer(3), "guild_primary_color_selector", this._manager.guildEditorData.guildPrimaryColors);
                if (this._data.exists) {
                    this._SafeStr_2353.setSelectedColorById(this._data.primaryColorId);
                } else {
                    this._SafeStr_2353.setSelectedColorById(this._manager.guildEditorData.findMatchingPrimaryColorId(this._SafeStr_2297.primaryColorIndex));
                }
            }
            if (!this._SafeStr_2365.isInitialized) {
                this._SafeStr_2365.createAndAttach(this.getStepContainer(3), "guild_secondary_color_selector", this._manager.guildEditorData.guildSecondaryColors);
                if (this._data.exists) {
                    this._SafeStr_2365.setSelectedColorById(this._data.secondaryColorId);
                } else {
                    this._SafeStr_2365.setSelectedColorById(this._manager.guildEditorData.findMatchingSecondaryColorId(this._SafeStr_2297.secondaryColorIndex));
                }
            }
            this._window.findChildByName("reset_colors").visible = this._data.exists;
        }
        if (this._SafeStr_2202 == 5) {
            if (!this._SafeStr_2825.isInitialized) {
                this._SafeStr_2825.refresh(this._data);
            }
        }
        if (this._SafeStr_2202 == 4) {
            if (!this._data.exists) {
                this._manager.trackGoogle("groupPurchase", "step4_confirm");
            }
            this.updateConfirmPreview();
        }
        if (this._SafeStr_2202 == 1) {
            if (!this._data.exists) {
                this._manager.trackGoogle("groupPurchase", "step1_identity");
            } else {
                this._manager.windowManager.registerLocalizationParameter("group.membercount", "totalMembers", "" + this._data.membershipCount);
                this._window.findChildByName("step_1_members_txt").caption = this._manager.localization.getLocalization("group.membercount");
            }
            this._window.findChildByName("base_label").visible = !this._data.exists;
            this._window.findChildByName("base_dropmenu").visible = !this._data.exists;
            this._window.findChildByName("base_warning").visible = !this._data.exists;
            this._window.findChildByName("create_room_link_region").visible = !this._data.exists;
            this._window.findChildByName("step_1_members_region").visible = this.data.exists;
        }
        this.refreshCreateHeader();
    }

    private updateConfirmPreview(): void {
        let _loc1_: BitmapData = null;
        let _loc5_: IBitmapWrapperWindow = null;
        let _loc2_: GuildColorData = null;
        let _loc4_: IWindow = null;
        let _loc6_: GuildColorData = null;
        let _loc3_: IWindow = null;
        if (this._manager.guildEditorData == null || this._window == null) {
            return;
        }
        if (this._SafeStr_2297.isIntialized) {
            _loc1_ = this._SafeStr_2297.getBadgeBitmap();
            _loc5_ = asGuarded(this._window.findChildByName("badge_preview_image"), isIBitmapWrapperWindow);
            if (_loc1_ != null && _loc5_ != null) {
                _loc5_.bitmap = _loc1_;
            }
        }
        if (this._SafeStr_2353.isInitialized) {
            _loc2_ = this._SafeStr_2353.getSelectedColorData();
            _loc4_ = this._window.findChildByName("badge_preview_primary_color_top");
            if (_loc2_ != null && _loc4_ != null) {
                _loc4_.color = _loc2_.color;
            }
        }
        if (this._SafeStr_2365.isInitialized) {
            _loc6_ = this._SafeStr_2365.getSelectedColorData();
            _loc3_ = this._window.findChildByName("badge_preview_secondary_color_top");
            if (_loc6_ != null && _loc3_ != null) {
                _loc3_.color = _loc6_.color;
            }
        }
        if (this._manager.hasVip) {
            this._window.findChildByName("buy_button").enable();
            this._window.findChildByName("buy_border").color = 16761600;
        } else {
            this._window.findChildByName("buy_border").color = 11184810;
            this._window.findChildByName("buy_button").disable();
        }
        this._window.findChildByName("vip_required_border").visible = !this._manager.hasVip;
        this._window.findChildByName("confirmation_caption").caption = castGuarded(this._window.findChildByName("name_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text;
    }

    private getHeaderTextOffset(): number {
        return this._data.exists ? -20 : 0;
    }

    private refreshCreateHeader(): void {
        let _loc1_: number = 0;
        this._window.findChildByName("steps_header_cont").visible = !this._data.exists;
        if (this._data.exists) {
            return;
        }
        this._window.findChildByName("next_step_button").visible = this.hasNextStep();
        this._window.findChildByName("previous_step_link_region").visible = this.hasPreviousStep();
        this._window.findChildByName("cancel_link_region").visible = !this.hasPreviousStep();
        this._window.findChildByName("buy_border").visible = !this.hasNextStep();
        _loc1_ = 1;
        while (_loc1_ <= 4) {
            this.getStepHeader(_loc1_, false).visible = _loc1_ != this._SafeStr_2202;
            this.getStepHeader(_loc1_, true).visible = _loc1_ == this._SafeStr_2202;
            this._window.findChildByName("step_title_" + _loc1_).y = _loc1_ == this._SafeStr_2202 ? 5 : 9;
            _loc1_++;
        }
        this._window.findChildByName("gcreate_icon_credit").y = this._SafeStr_2202 == 4 ? 6 : 10;
    }

    private getStepHeader(param1: number, param2: boolean): IWindow {
        return this._window.findChildByName("gcreate_" + param1 + "_" + (param2 ? "1" : "0"));
    }

    private getStepContainer(param1: number): IWindowContainer {
        return castGuarded(this._window.findChildByName("step_cont_" + param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private getStepCaption(): string {
        let _loc1_: string = (this._data.exists ? "group.edit.tabcaption." : "group.create.stepcaption.") + this._SafeStr_2202;
        return this._manager.localization.getLocalization(_loc1_, _loc1_);
    }

    private getStepDesc(): string {
        let _loc1_: string = (this._data.exists ? "group.edit.tabdesc." : "group.create.stepdesc.") + this._SafeStr_2202;
        return this._manager.localization.getLocalization(_loc1_, _loc1_);
    }

    public onGuildCreationInfo(param1: GuildCreationData): void {
        this._data = param1;
        this._SafeStr_2202 = 1;
        this._SafeStr_3429 = 0;
        this.refresh();
        this.refreshBadgeImage();
        this.setupInputs();
        this._manager.localization.registerParameter("group.create.confirm.buyinfo", "amount", "" + param1.costInCredits);
        this._window.visible = true;
        this._window.activate();
    }

    public onGuildEditInfo(param1: GuildEditData): void {
        this._data = param1;
        this._SafeStr_2202 = 1;
        this._SafeStr_3429 = 0;
        this.refresh();
        this.refreshBadgeImage();
        this.setupInputs();
        let _loc2_: ITabContextWindow = castGuarded(this._window.findChildByName("edit_guild_tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        let _loc3_: ISelectableWindow = castGuarded(this._window.findChildByName("edit_tab_" + this._SafeStr_2202), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow");
        _loc2_.selector.setSelected(_loc3_);
        this._window.visible = true;
        this._window.activate();
    }

    private setupInputs(): void {
        castGuarded(this._window.findChildByName("name_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this._data.groupName;
        castGuarded(this._window.findChildByName("desc_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this._data.groupDesc;
        this.prepareRoomSelection();
        this._SafeStr_2297.resetLayerOptions(this._data.badgeSettings);
        this._SafeStr_2353.setSelectedColorById(this._data.primaryColorId);
        this._SafeStr_2365.setSelectedColorById(this._data.secondaryColorId);
        this._SafeStr_2825.refresh(this._data);
    }

    private onTab = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_SELECT" || param2.id == this._SafeStr_2202) {
            return;
        }
        if (!this.validateView()) {
            param1.preventDefault();
            return;
        }
        this.saveView();
        this._SafeStr_2202 = param2.id;
        this.refresh();
    };

    private onColorReset = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (this._SafeStr_2353.isInitialized) {
                this._SafeStr_2353.setSelectedColorById(this._data.primaryColorId);
            }
            if (this._SafeStr_2365.isInitialized) {
                this._SafeStr_2365.setSelectedColorById(this._data.secondaryColorId);
            }
        }
    };

    private onBadgeReset = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && this._SafeStr_2297.isIntialized) {
            this._SafeStr_2297.resetLayerOptions(this._data.badgeSettings);
        }
    };

    private onMembersClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && this._data.exists && this._manager.guildMembersWindowCtrl != null) {
            this._manager.trackGoogle("groupManagement", "groupMembers");
            this._manager.guildMembersWindowCtrl.onMembersClick(this._data.groupId, 0);
        }
    };

    private onCancelLink = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.close();
    };

    private onCreateRoomLink = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._manager.navigator.startRoomCreation();
    };

    private onNextStep = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (!this.validateView()) {
            return;
        }
        this._SafeStr_2202 = this.limitStep(this._SafeStr_2202 + 1);
        this.refresh();
    };

    private onPreviousStep = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (!this.validateView()) {
            return;
        }
        this._SafeStr_2202 = this.limitStep(this._SafeStr_2202 - 1);
        this.refresh();
    };

    private onBuy = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (!this._data.exists) {
            this._manager.trackGoogle("groupPurchase", "buyGroup");
        }
        this.sendCreateGuildMessage();
    };

    private onGetVip = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (!this._data.exists) {
            this._manager.trackGoogle("groupPurchase", "buyVip");
        }
        this._manager.openVipPurchase("GuildManagementWindowCtrl");
    };

    private showAlert(param1: string, param2: string): void {
        if (!this._SafeStr_5439) {
            this._SafeStr_5439 = true;
            this._manager.windowManager.alert(param1, param2, 0, this.onAlertClose);
        }
    }

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
        this._SafeStr_5439 = false;
    };

    private validateView(): boolean {
        let _loc2_: string = null;
        let _loc3_: RoomEntryData = null;
        let _loc4_: string = null;
        let _loc1_: any[] = null;
        switch (this._SafeStr_2202 - 1) {
            case 0:
                _loc2_ = castGuarded(this._window.findChildByName("name_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").text;
                if (!this._data.exists) {
                    _loc3_ = this.resolveBaseRoom();
                    if (_loc2_ == null || _loc2_.length == 0 || _loc3_ == null || _loc3_.roomId == 0) {
                        this.showAlert("${group.edit.error.title}", "${group.edit.error.no.name.or.room.selected}");
                        return false;
                    }
                    if (_loc3_.hasControllers && this._SafeStr_3429 != _loc3_.roomId) {
                        this._SafeStr_3429 = _loc3_.roomId;
                        this.showAlert("${group.edit.error.warning}", "${group.edit.error.controllers}");
                        return false;
                    }
                }
                if (_loc2_.length > 30) {
                    this.showAlert("${group.edit.error.title}", "${group.edit.error.name.length}");
                    return false;
                }
                _loc4_ = castGuarded(this._window.findChildByName("desc_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").text;
                if (_loc4_ != null && _loc4_.length >= 255) {
                    this.showAlert("${group.edit.error.title}", "${group.edit.error.desc.length}");
                    return false;
                }
                return true;
                break;
            case 1:
                _loc1_ = this._SafeStr_2297.isIntialized ? this._SafeStr_2297.getBadgeSettings() : this._data.badgeSettings;
                this._SafeStr_2297.onViewChange();
                return true;
            case 2:
                if (this._SafeStr_2353.getSelectedColorData() == null || this._SafeStr_2365.getSelectedColorData() == null) {
                    this.showAlert("${group.edit.error.title}", "${group.edit.error.no.color.selected}");
                    return false;
                }
                return true;
                break;
            default:
                return true;
        }
    }

    private saveView(): void {
        let _loc3_: string = null;
        let _loc5_: string = null;
        let _loc1_: any[] = null;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        switch (this._SafeStr_2202 - 1) {
            case 0:
                _loc3_ = castGuarded(this._window.findChildByName("name_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").text;
                _loc5_ = castGuarded(this._window.findChildByName("desc_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").text;
                if (this._data.isOwner) {
                    this._manager.send(new UpdateGuildIdentityMessageComposer(this._data.groupId, _loc3_, _loc5_));
                }
                this._manager.events.dispatchEvent(new GuildSettingsChangedInManageEvent("GSCIME_GUILD_VISUAL_SETTINGS_CHANGED", this._data.groupId));
                return;
            case 1:
                _loc1_ = this._SafeStr_2297.isIntialized ? this._SafeStr_2297.getBadgeSettings() : this._data.badgeSettings;
                if (this._data.isOwner) {
                    this._manager.send(new UpdateGuildBadgeMessageComposer(this._data.groupId, _loc1_));
                }
                this._manager.events.dispatchEvent(new GuildSettingsChangedInManageEvent("GSCIME_GUILD_VISUAL_SETTINGS_CHANGED", this._data.groupId));
                break;
            case 2:
                _loc2_ = this._SafeStr_2353.isInitialized ? this._SafeStr_2353.getSelectedColorId() : this._data.primaryColorId;
                _loc4_ = this._SafeStr_2365.isInitialized ? this._SafeStr_2365.getSelectedColorId() : this._data.secondaryColorId;
                if (this._data.isOwner) {
                    this._manager.send(new UpdateGuildColorsMessageComposer(this._data.groupId, _loc2_, _loc4_));
                }
                this._manager.events.dispatchEvent(new GuildSettingsChangedInManageEvent("GSCIME_GUILD_VISUAL_SETTINGS_CHANGED", this._data.groupId));
                break;
            case 4:
                if (this._data.isOwner) {
                    this._manager.send(new UpdateGuildSettingsMessageComposer(this._data.groupId, this._SafeStr_2825.guildType, this._SafeStr_2825.rightsLevel));
                }
                this._SafeStr_2825.resetModified();
        }
    }

    private sendCreateGuildMessage(): void {
        let _loc3_: string = castGuarded(this._window.findChildByName("name_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").text;
        let _loc5_: string = castGuarded(this._window.findChildByName("desc_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow").text;
        let _loc6_: RoomEntryData = this.resolveBaseRoom();
        let _loc1_: any[] = this._SafeStr_2297.isIntialized ? this._SafeStr_2297.getBadgeSettings() : this._data.badgeSettings;
        let _loc2_: number = this._SafeStr_2353.isInitialized ? this._SafeStr_2353.getSelectedColorId() : this._data.primaryColorId;
        let _loc4_: number = this._SafeStr_2365.isInitialized ? this._SafeStr_2365.getSelectedColorId() : this._data.secondaryColorId;
        this._SafeStr_3429 = 0;
        this._manager.send(new CreateGuildMessageComposer(_loc3_, _loc5_, _loc6_.roomId, _loc2_, _loc4_, _loc1_));
    }

    private hasPreviousStep(): boolean {
        return this._SafeStr_2202 != this.limitStep(this._SafeStr_2202 - 1);
    }

    private hasNextStep(): boolean {
        return this._SafeStr_2202 != this.limitStep(this._SafeStr_2202 + 1);
    }

    private limitStep(param1: number): number {
        return Math.max(1, Math.min(param1, 4)) | 0;
    }

    private getBaseDropMenu(): IDropMenuWindow {
        return castGuarded(this._window.findChildByName("base_dropmenu"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
    }

    private prepareRoomSelection(): void {
        let _loc2_: number = 0;
        let _loc4_: RoomEntryData = null;
        let _loc1_: IDropMenuWindow = this.getBaseDropMenu();
        let _loc3_: any[] = [];
        let _loc5_: number = 0;
        _loc3_.push(this._manager.localization.getLocalization("group.edit.base.select.room", "group.edit.base.select.room"));
        _loc2_ = 0;
        while (_loc2_ < this._data.ownedRooms.length) {
            _loc4_ = this._data.ownedRooms[_loc2_];
            _loc3_.push(_loc4_.roomName);
            if (_loc4_.roomId == this._data.baseRoomId) {
                _loc5_ = _loc2_ + 1;
            }
            _loc2_++;
        }
        _loc1_.populate(_loc3_);
        if (_loc3_.length > 0) {
            _loc1_.selection = _loc5_;
        }
    }

    private resolveBaseRoom(): RoomEntryData {
        let _loc1_: IDropMenuWindow = castGuarded(this._window.findChildByName("base_dropmenu"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        let _loc2_: number = _loc1_.selection - 1;
        if (_loc2_ >= 0 && _loc2_ < this._data.ownedRooms.length && this._data.ownedRooms[_loc2_] != null) {
            return castTo(this._data.ownedRooms[_loc2_], RoomEntryData);
        }
        return null;
    }

    private onCloseWindow = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._data.exists) {
            if (!this.validateView()) {
                return;
            }
            this.saveView();
        }
        this.close();
    };

    public close(): void {
        if (this._window != null) {
            this._window.visible = false;
        }
    }

    public onPrimaryColorSelected = (param1: ColorGridCtrl): void => {
        let _loc3_: GuildColorData = null;
        let _loc2_: IWindow = this._window.findChildByName("guild_color_primary_color_top");
        if (_loc2_ != null && this._manager.guildEditorData != null && param1.selectedColorIndex >= 0 && param1.selectedColorIndex <= this._manager.guildEditorData.guildPrimaryColors.length) {
            _loc3_ = this._manager.guildEditorData.guildPrimaryColors[param1.selectedColorIndex];
            _loc2_.color = _loc3_.color;
        }
    };

    public onSecondaryColorSelected = (param1: ColorGridCtrl): void => {
        let _loc3_: GuildColorData = null;
        let _loc2_: IWindow = this._window.findChildByName("guild_color_secondary_color_top");
        if (this._manager.guildEditorData != null && param1.selectedColorIndex >= 0 && param1.selectedColorIndex <= this._manager.guildEditorData.guildSecondaryColors.length) {
            _loc3_ = this._manager.guildEditorData.guildSecondaryColors[param1.selectedColorIndex];
            _loc2_.color = _loc3_.color;
        }
    };

    public get data(): IGuildData {
        return this._data;
    }

    private refreshBadgeImage(): void {
        let _loc2_: IWindow = this._window.findChildByName("step_1_badge");
        let _loc1_: IBadgeImageWidget = asGuarded(castGuarded(this._window.findChildByName("group_logo"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        if (_loc1_ == null || _loc2_ == null) {
            return;
        }
        if (!this._data.exists) {
            _loc2_.visible = false;
            _loc2_.invalidate();
        } else {
            _loc1_.badgeId = this._data.badgeCode;
            _loc1_.groupId = this._data.groupId;
            _loc2_.visible = true;
            _loc2_.invalidate();
        }
    }

    private onWindowUnActivated = (param1: WindowEvent): void => {
        if (this._data != null && this._data.exists && this._window != null && Boolean(this._window.visible)) {
            this.saveView();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
