import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboGroupDetailsData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsData';
import type { TalentTrack } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrack';
import type { TalentTrackLevel } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackLevel';
import type { TalentTrackMessageParser } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackMessageParser';
import type { TalentTrackRewardPerk } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardPerk';
import type { TalentTrackRewardProduct } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackRewardProduct';
import type { TalentTrackTask } from '@/com/sulake/habbo/communication/messages/parser/talent/TalentTrackTask';
import type { HabboTalent } from '@/com/sulake/habbo/friendbar/talent/HabboTalent';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TalentTrackMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/talent/TalentTrackMessageEvent';
import { ChangeEmailResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ChangeEmailResultEvent';
import { EmailStatusResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/EmailStatusResultEvent';
import { HabboGroupDetailsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupDetailsMessageEvent';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { GuideAdvertisementReadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GuideAdvertisementReadMessageComposer';
import { ChangeEmailComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/ChangeEmailComposer';
import { GetEmailStatusComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetEmailStatusComposer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { TalentProgressMeter } from '@/com/sulake/habbo/friendbar/talent/TalentProgressMeter';
import { Logger } from '@/com/sulake/habbo/Logger';
import { TalentEnum } from '@/com/sulake/habbo/session/talent/TalentEnum';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class TalentTrackController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.talent::TalentTrackController'); }

    private static readonly MODAL_DIALOG_LAYER: number = 3;
    private static readonly HORIZONTAL_MARGIN: number = 100;
    private static readonly BEGIN_PANE_PREFIX: string = "begin_";
    private static readonly LEVEL_PANE_PREFIX: string = "level_pane_";
    private static readonly NO_CITIZENSHIP_SUFFIX: string = "_no_citizenship";
    private static readonly PROGRESS_BAR_MARGIN: number = 40;
    private static readonly DEFAULT_PADDING: number = 10;
    private static readonly REWARD_WIDTH: number = 200;
    private static readonly BADGE_RECT_SIZE: number = 60;

    declare private _habboTalent: HabboTalent;

    private _disposed: boolean = false;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IWindowContainer;

    declare private _taskProgressPopup: IModalDialog;

    declare private _SafeStr_2319: IItemListWindow;

    declare private _talentTrack: TalentTrack;

    declare private _talentProgressMeter: TalentProgressMeter;

    declare private _SafeStr_3102: IWindowContainer;

    declare private _SafeStr_4037: IBorderWindow;

    declare private _SafeStr_4002: IBorderWindow;

    declare private _SafeStr_3860: IBorderWindow;

    declare private _SafeStr_4010: IBorderWindow;

    declare private _SafeStr_3986: IWindowContainer;

    declare private _SafeStr_4030: IWindowContainer;

    declare private _SafeStr_4194: IWindowContainer;

    declare private _overlayTemplate: IWindow;

    private _SafeStr_5244: number = -1;

    constructor(param1: HabboTalent) {
        this._habboTalent = param1;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._talentProgressMeter) {
                this._talentProgressMeter.dispose();
                this._talentProgressMeter = null;
            }
            this.destroyWindow();
            this._habboTalent = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get talentTrack(): TalentTrack {
        return this._talentTrack;
    }

    public initialize(): void {
        this._habboTalent.communicationManager.addHabboConnectionMessageEvent(new HabboGroupDetailsMessageEvent(this.onGroupDetails));
        this._habboTalent.communicationManager.addHabboConnectionMessageEvent(new EmailStatusResultEvent(this.onEmailStatus));
        this._habboTalent.communicationManager.addHabboConnectionMessageEvent(new TalentTrackMessageEvent(this.onTalentTrack));
        this._habboTalent.communicationManager.addHabboConnectionMessageEvent(new ChangeEmailResultEvent(this.onChangeEmailResult));
    }

    private onEmailStatus = (param1: EmailStatusResultEvent): void => {
        let _loc2_: IWindowContainer = this.getEmailContainer();
        if (_loc2_ != null) {
            this.getEmailText().text = param1.getParser().email;
            _loc2_.findChildByName("unverified_container").visible = !param1.getParser().isVerified;
            _loc2_.findChildByName("verified_txt").visible = param1.getParser().isVerified;
        }
    };

    private onChangeEmailResult = (param1: ChangeEmailResultEvent): void => {
        this.setEmailErrorStatus(true, param1.getParser().result);
    };

    private onTalentTrack = (param1: TalentTrackMessageEvent): void => {
        let _loc2_: TalentTrackMessageParser = param1.getParser();
        this._talentTrack = _loc2_.getTalentTrack();
        this.createWindow();
    };

    private onGroupDetails = (param1: HabboGroupDetailsMessageEvent): void => {
        let _loc2_: HabboGroupDetailsData = param1.data;
        if (_loc2_.groupId == this._SafeStr_5244) {
            this._SafeStr_5244 = -1;
            this._habboTalent.navigator.goToPrivateRoom(_loc2_.roomId);
        }
    };

    private createWindow(): void {
        let _loc1_: IWindowContainer = null;
        let _loc5_: number = 0;
        this.destroyWindow();
        this._SafeStr_2492 = this._habboTalent.getModalXmlWindow("talent_track");
        this._window = castGuarded(this._SafeStr_2492.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.procedure = this.onWindowEvent;
        this._SafeStr_2492.background.procedure = this.onModalWindowBackgroundEvent;
        this._habboTalent.windowManager.getWindowContext(3).getDesktopWindow().addEventListener("WE_RESIZED", this.onDesktopResized);
        this._SafeStr_2319 = castGuarded(this._window.findChildByName("panorama"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_3102 = castGuarded(this._SafeStr_2319.removeListItem(this._SafeStr_2319.getListItemByName("level_pane")), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc2_: IItemListWindow = castGuarded(this._SafeStr_3102.findChildByName("reward_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_4037 = castGuarded(_loc2_.removeListItem(_loc2_.getListItemByName("reward_achieved")), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        this._SafeStr_4002 = castGuarded(_loc2_.removeListItem(_loc2_.getListItemByName("reward_locked")), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        this._SafeStr_3860 = castGuarded(_loc2_.removeListItem(_loc2_.getListItemByName("reward_product")), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        this._SafeStr_4010 = castGuarded(_loc2_.removeListItem(_loc2_.getListItemByName("reward_vip")), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
        let _loc4_: IItemListWindow = castGuarded(this._SafeStr_3102.findChildByName("task_list_top"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_3986 = castGuarded(_loc4_.removeListItem(_loc4_.getListItemByName("task_achieved")), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_4030 = castGuarded(_loc4_.removeListItem(_loc4_.getListItemByName("task_ongoing")), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_4194 = castGuarded(_loc4_.removeListItem(_loc4_.getListItemByName("task_locked")), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._overlayTemplate = this._SafeStr_3102.removeChild(this._SafeStr_3102.findChildByName("action_overlay"));
        let _loc3_: boolean = this._habboTalent.citizenshipEnabled;
        for (const _loc7_ of TalentEnum.asArray ?? []) {
            _loc1_ = asGuarded(this._SafeStr_2319.getListItemByName("begin_" + _loc7_), isIWindowContainer);
            if (_loc1_ != null) {
                _loc1_.visible = _loc7_ == this._talentTrack.name && _loc3_;
                if (_loc1_.visible) {
                    this.showAvatarInContainer(_loc1_);
                }
            }
            if (_loc7_ != "citizenship") {
                _loc1_ = asGuarded(this._SafeStr_2319.getListItemByName("begin_" + _loc7_ + "_no_citizenship"), isIWindowContainer);
                if (_loc1_ != null) {
                    _loc1_.visible = _loc7_ == this._talentTrack.name && !_loc3_;
                    if (_loc1_.visible) {
                        this.showAvatarInContainer(_loc1_);
                    }
                }
            }
        }
        this._window.findChildByName("frame_title").caption = "${talent.track." + this._talentTrack.name + ".frame.title}";
        this._window.findChildByName("frame_subtitle").caption = "${talent.track." + this._talentTrack.name + ".frame.subtitle}";
        this._window.findChildByName("progress_text").caption = "${talent.track." + this._talentTrack.name + ".progress.title}";
        if (_loc3_ && this._talentTrack.name != "citizenship") {
            this._talentTrack.removeFirstLevel();
        }
        let _loc6_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._talentTrack.levels.length) {
            this.createLevelPane(this._talentTrack.levels[_loc5_], _loc5_);
            if (this._talentTrack.levels[_loc5_].state == 1) {
                _loc6_ = _loc5_;
            }
            _loc5_++;
        }
        this._talentProgressMeter = new TalentProgressMeter(this._habboTalent, this);
        this._SafeStr_2319.setListItemIndex(this._SafeStr_2319.getListItemByName("end_padding"), this._SafeStr_2319.numListItems - 1);
        this.resizeWindow();
        this.scrollToLevel(_loc6_);
    }

    private showAvatarInContainer(param1: IWindowContainer): void {
        let _loc2_: IWidgetWindow = asGuarded(param1.findChildByName("avatar_image"), isIWidgetWindow);
        if (_loc2_ != null) {
            castGuarded(_loc2_.widget, isIAvatarImageWidget, "com.sulake.habbo.window.widgets.IAvatarImageWidget").figure = this._habboTalent.sessionManager.figure;
        }
    }

    private createLevelPane(param1: TalentTrackLevel, param2: number): void {
        let _loc16_: IBorderWindow = null;
        let _loc3_: ITextWindow = null;
        let _loc4_: ITextWindow = null;
        let _loc21_: ITextWindow = null;
        let _loc6_: ITextWindow = null;
        let _loc7_: IItemListWindow = null;
        let _loc18_: number = 0;
        let _loc22_: IWindow = null;
        let _loc17_: any = undefined;
        let _loc15_: IWindow = null;
        let _loc5_: Point = null;
        let _loc9_: IWindowContainer = castGuarded(this._SafeStr_3102.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc14_: IItemListWindow = castGuarded(_loc9_.findChildByName("status_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc19_: IWindowContainer = castGuarded(_loc9_.findChildByName("level_reward"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc10_: IWindowContainer = castGuarded(_loc9_.findChildByName("level_task"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc12_: IItemListWindow = castGuarded(_loc9_.findChildByName("task_list_top"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        let _loc20_: IItemListWindow = castGuarded(_loc9_.findChildByName("task_list_bottom"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        _loc9_.name = "level_pane_" + param2;
        _loc9_.findChildByName("level_title").caption = "${talent.track." + this._talentTrack.name + ".level." + param1.level + ".title}";
        _loc9_.findChildByName("level_description").caption = "${talent.track." + this._talentTrack.name + ".level." + param1.level + ".description}";
        if (param2 == 0) {
            _loc19_.width = 0;
            _loc19_.visible = false;
            _loc14_.x = 4 * 10;
        } else {
            _loc16_ = castGuarded(_loc19_.findChildByName("border"), isIBorderWindow, "com.sulake.core.window.components.IBorderWindow");
            _loc3_ = castGuarded(_loc19_.findChildByName("title_locked"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc4_ = castGuarded(_loc19_.findChildByName("title_achieved"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc21_ = castGuarded(_loc19_.findChildByName("description_locked"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc6_ = castGuarded(_loc19_.findChildByName("description_achieved"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            _loc7_ = castGuarded(_loc19_.findChildByName("reward_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
            switch (param1.state) {
                case 0:
                    _loc16_.color = 12434877;
                    _loc16_.findChildByName("unlocked").visible = false;
                    _loc3_.caption = "${talent.track." + this._talentTrack.name + ".level." + param1.level + ".title}";
                    _loc4_.visible = false;
                    _loc21_.caption = "${talent.track." + this._talentTrack.name + ".level." + param1.level + ".unlock}";
                    _loc6_.visible = false;
                    _loc19_.findChildByName("achieved").visible = false;
                    break;
                case 1:
                case 2:
                    _loc16_.color = 4537147;
                    _loc3_.visible = false;
                    _loc4_.caption = this._habboTalent.localizationManager.getLocalization("talent.track.common.unlocked.level.prefix") + " " + this._habboTalent.localizationManager.getLocalization("talent.track." + this._talentTrack.name + ".level." + param1.level + ".title");
                    _loc21_.visible = false;
                    _loc6_.caption = "${talent.track." + this._talentTrack.name + ".level." + param1.level + ".unlock}";
                    _loc19_.findChildByName("locked").visible = false;
            }
            if (param1.rewardCount == 0) {
                _loc18_ = Math.max(200, Math.max(_loc4_.width, _loc3_.width)) | 0;
                _loc21_.width = _loc18_;
                _loc6_.width = _loc18_;
                _loc16_.width = _loc18_ + 2 * 10;
                _loc19_.width = _loc18_ + 2 * 10;
                _loc16_.height = _loc6_.y + Math.max(_loc6_.height, _loc21_.height) + 10 | 0;
                _loc19_.height = _loc16_.height + _loc16_.y;
                _loc7_.visible = false;
            } else if (param1.rewardCount == 1 && param1.rewardProducts.length > 0) {
                _loc18_ = Math.max(200 + 10 * 2, Math.max(_loc4_.width, _loc3_.width)) | 0;
                _loc21_.width = _loc18_;
                _loc6_.width = _loc18_;
                _loc7_.addListItem(this.createRewardProduct(param1, param1.rewardProducts[0]));
                _loc16_.width = _loc18_ + 2 * 10;
                _loc19_.width = _loc18_ + 2 * 10;
            } else if (param1.rewardCount == 1) {
                _loc16_.width = 420;
                _loc21_.width = 200 * 2;
                _loc6_.width = 200 * 2;
                _loc7_.addListItem(param1.rewardPerks.length > 0 ? this.createRewardPerk(param1, param1.rewardPerks[0]) : this.createRewardProduct(param1, param1.rewardProducts[0]));
                _loc7_.arrangeListItems();
                _loc19_.width = _loc7_.width + 2 * 10;
                _loc16_.width = _loc7_.width + 2 * 10;
            } else {
                for (const _loc11_ of param1.rewardPerks ?? []) {
                    _loc7_.addListItem(this.createRewardPerk(param1, _loc11_));
                }
                for (const _loc8_ of param1.rewardProducts ?? []) {
                    _loc7_.addListItem(this.createRewardProduct(param1, _loc8_));
                }
                _loc7_.arrangeListItems();
                _loc19_.width = _loc7_.width + 2 * 10;
                _loc16_.width = _loc7_.width + 2 * 10;
                _loc6_.width = _loc16_.width - 2 * 10;
            }
        }
        if (param1.tasks.length == 0) {
            _loc10_.width = 0;
            _loc10_.visible = false;
        } else {
            _loc17_ = [];
            for (const _loc13_ of param1.tasks ?? []) {
                _loc22_ = this.createTask(param1, _loc13_);
                if (_loc12_.numListItems == _loc20_.numListItems) {
                    _loc12_.addListItem(_loc22_);
                } else {
                    _loc20_.addListItem(_loc22_);
                }
                if (_loc13_.badgeCode == "ACH_SafetyQuizGraduate1" && _loc13_.state == 1) {
                    _loc17_.push(_loc22_);
                }
            }
            _loc12_.arrangeListItems();
            _loc20_.arrangeListItems();
            _loc10_.width = Math.max(_loc12_.width, _loc20_.width) | 0;
            for (_loc22_ of valuesOf(_loc17_)) {
                _loc15_ = this._overlayTemplate.clone();
                _loc5_ = new Point();
                _loc9_.addChild(_loc15_);
                _loc22_.convertPointFromLocalToGlobalSpace(_loc5_);
                _loc9_.convertPointFromGlobalToLocalSpace(_loc5_);
                _loc15_.x += _loc5_.x;
                _loc15_.y += _loc5_.y;
                _loc15_.visible = true;
            }
        }
        _loc14_.arrangeListItems();
        _loc14_.width = _loc19_.width + 10 + _loc10_.width;
        _loc9_.width = _loc14_.x + _loc14_.width + 10;
        this.repositionLevelIllustration(param1, _loc9_);
        this._SafeStr_2319.addListItem(_loc9_);
    }

    private repositionLevelIllustration(param1: TalentTrackLevel, param2: IWindowContainer): void {
        let _loc3_: IWindow = param2.findChildByName("level_description");
        let _loc4_: IStaticBitmapWrapperWindow = castGuarded(param2.findChildByName("level_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        _loc4_.assetUri = "${image.library.url}talent/" + this._talentTrack.name + "_" + param1.level + ".png";
        if (param1.level == 8 && this._talentTrack.name == "helper") {
            _loc4_.width = 220;
            _loc4_.height = 270;
            _loc4_.x = Math.max(_loc3_.right, param2.width) | 0;
        } else if (param1.level == 0 && this._talentTrack.name == "citizenship") {
            _loc4_.width = 0;
            _loc4_.x = Math.max(_loc3_.right, param2.width) | 0;
        } else if (param1.level == 4 && this._talentTrack.name == "citizenship") {
            _loc4_.width = 220;
            _loc4_.height = 280;
            _loc4_.x = Math.max(_loc3_.right, param2.width) | 0;
        } else {
            _loc4_.x = Math.max(_loc3_.right, param2.width - _loc4_.width) | 0;
        }
        param2.width = Math.max(param2.width, _loc4_.right) | 0;
    }

    private createRewardPerk(param1: TalentTrackLevel, param2: TalentTrackRewardPerk): IWindowContainer {
        let _loc3_: IWindowContainer = null;
        switch (param1.state) {
            case 0:
                _loc3_ = castGuarded(this._SafeStr_4002.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                break;
            case 1:
            case 2:
                _loc3_ = castGuarded(this._SafeStr_4037.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                castGuarded(castGuarded(_loc3_.findChildByName("achieved"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = param2.perkId;
        }
        let _loc5_: IWindow = _loc3_.findChildByName("title");
        let _loc4_: IWindow = castGuarded(_loc3_.findChildByName("description"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc5_.caption = "${perk." + param2.perkId + ".name}";
        _loc4_.caption = "${perk." + param2.perkId + ".description}";
        if (param1.rewardCount == 1) {
            _loc3_.width = 200 * 2;
            _loc3_.findChildByName("title").width = 200 * 2 - 60;
            _loc3_.findChildByName("description").width = 200 * 2 - 60;
        } else {
            if (_loc4_.height > 30) {
                _loc4_.width += 4 * 10;
            }
            _loc4_.width = Math.max(_loc4_.width, _loc5_.width) | 0;
            _loc3_.width = Math.max(_loc4_.width, _loc5_.width) + 60 + 10 | 0;
        }
        return _loc3_;
    }

    private createRewardProduct(param1: TalentTrackLevel, param2: TalentTrackRewardProduct): IWindowContainer {
        let _loc3_: IWindowContainer = null;
        if (param2.vipDays == 0) {
            _loc3_ = castGuarded(this._SafeStr_3860.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            castGuarded(_loc3_.findChildByName("product_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}talent/reward_product_" + param2.productCode.toLowerCase().replace(" ", "_") + ".png";
        } else {
            _loc3_ = castGuarded(this._SafeStr_4010.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc3_.findChildByName("vip_length").caption = this._habboTalent.localizationManager.getLocalizationWithParams("catalog.vip.item.header.days", "", "num_days", param2.vipDays);
        }
        if (param1.state == 0) {
            _loc3_.color = 9934743;
            _loc3_.blend = 0.6;
        }
        return _loc3_;
    }

    private createTask(param1: TalentTrackLevel, param2: TalentTrackTask): IWindowContainer {
        let _loc6_: IWindowContainer = null;
        let _loc3_: IRegionWindow = null;
        if (param2.badgeCode == null || param2.badgeCode == "") {
            return null;
        }
        switch (param2.state) {
            case 0:
                _loc6_ = castGuarded(this._SafeStr_4194.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                break;
            case 1:
                _loc6_ = castGuarded(this._SafeStr_4030.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                castGuarded(castGuarded(_loc6_.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = param2.badgeCode;
                _loc6_.findChildByName("task_progress_fg").width = MathUtils.map(param2.currentScore, 0, param2.totalScore, 0, 48) | 0;
                _loc3_ = asGuarded(_loc6_.findChildByName("task_ongoing_region"), isIRegionWindow);
                _loc3_.id = param2.achievementId;
                if (param2.badgeCode == "ACH_SafetyQuizGraduate1") {
                    _loc3_.toolTipCaption = "";
                    _loc3_.name = param2.badgeCode;
                }
                break;
            case 2:
                _loc6_ = castGuarded(this._SafeStr_3986.clone(), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
                castGuarded(castGuarded(_loc6_.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = param2.badgeCode;
        }
        let _loc5_: IWindow = _loc6_.findChildByName("title");
        let _loc4_: IWindow = _loc6_.findChildByName("description");
        _loc5_.caption = this._habboTalent.localizationManager.getAchievementName(param2.badgeCode).toUpperCase();
        _loc4_.caption = this._habboTalent.localizationManager.getAchievementInstruction(param2.badgeCode);
        if (_loc5_.height > 20) {
            _loc5_.y -= 5;
            _loc4_.y += 5;
        } else if (_loc4_.height > 30) {
            _loc5_.y -= 5;
            _loc4_.y -= 5;
        }
        return _loc6_;
    }

    private destroyWindow(): void {
        this.destroyTaskProgressDialog();
        if (this._overlayTemplate != null) {
            this._overlayTemplate.dispose();
            this._overlayTemplate = null;
        }
        if (this._SafeStr_3102) {
            this._SafeStr_3102.dispose();
            this._SafeStr_3102 = null;
        }
        if (this._SafeStr_4037) {
            this._SafeStr_4037.dispose();
            this._SafeStr_4037 = null;
        }
        if (this._SafeStr_4002) {
            this._SafeStr_4002.dispose();
            this._SafeStr_4002 = null;
        }
        if (this._SafeStr_3860) {
            this._SafeStr_3860.dispose();
            this._SafeStr_3860 = null;
        }
        if (this._SafeStr_4010) {
            this._SafeStr_4010.dispose();
            this._SafeStr_4010 = null;
        }
        if (this._SafeStr_3986) {
            this._SafeStr_3986.dispose();
            this._SafeStr_3986 = null;
        }
        if (this._SafeStr_4030) {
            this._SafeStr_4030.dispose();
            this._SafeStr_4030 = null;
        }
        if (this._SafeStr_4194) {
            this._SafeStr_4194.dispose();
            this._SafeStr_4194 = null;
        }
        if (this._SafeStr_2492) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
            this._window = null;
            this._habboTalent.windowManager.getWindowContext(3).getDesktopWindow().removeEventListener("WE_RESIZED", this.onDesktopResized);
        }
    }

    private resizeWindow(): void {
        if (this._SafeStr_2492 == null || Boolean(this._SafeStr_2492.disposed)) {
            return;
        }
        this._window.x = 100;
        this._window.width = this._window.desktop.width - 2 * 100;
        this._window.findChildByName("frame").width = this._window.width;
        this._window.findChildByName("panorama").width = this._window.width;
        this._window.findChildByName("panorama_scrollbar").width = this._window.width;
        this._talentProgressMeter.resize();
        this._SafeStr_2319.arrangeListItems();
        this._window.invalidate();
    }

    private onDesktopResized = (param1: WindowEvent): void => {
        this.resizeWindow();
    };

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (this._window == null || Boolean(this._window.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this.destroyWindow();
                break;
            case "progress_container":
                _loc3_ = castTo(param1, WindowMouseEvent).localX | 0;
                if (_loc3_ < 40) {
                    this._SafeStr_2319.scrollH = 0;
                } else if (_loc3_ > this._talentProgressMeter.width - 40) {
                    this._SafeStr_2319.scrollH = 1;
                } else {
                    this.scrollToLevel(Math.floor(_loc3_ / this._talentProgressMeter.progressPerLevelWidth) | 0);
                }
                break;
            case "task_ongoing_region":
                this.createTaskProgressDialog(param2.id);
                break;
            case "citizenship_button":
                this._habboTalent.tracking.trackTalentTrackOpen("citizenship", "talentrack");
                this._habboTalent.send(new GetTalentTrackMessageComposer("citizenship"));
                break;
            case "button_track_citizenship":
            case "button_track_helper":
                break;
            case "ACH_SafetyQuizGraduate1":
                this.closeAndLog(param2.name);
                this._habboTalent.habboHelp.showSafetyBooklet();
        }
    };

    private onModalWindowBackgroundEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this._window == null || Boolean(this._window.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        this.destroyWindow();
    };

    private scrollToLevel(param1: number): void {
        let _loc2_: IWindow = null;
        if (param1 == 0) {
            this._SafeStr_2319.scrollH = 0;
        } else {
            _loc2_ = this._SafeStr_2319.getListItemByName("level_pane_" + param1);
            if (_loc2_ != null) {
                Logger.log(this._SafeStr_2319.scrollH);
                this._SafeStr_2319.scrollH = MathUtils.map(_loc2_.x - 20, 0, this._SafeStr_2319.scrollableRegion.width - this._SafeStr_2319.visibleRegion.width, 0, 1);
                Logger.log(_loc2_.x + " " + this._SafeStr_2319.scrollableRegion.width + " " + MathUtils.map(_loc2_.x, 0, this._SafeStr_2319.scrollableRegion.width, 0, 1) + " " + this._SafeStr_2319.scrollH);
            }
        }
    }

    private createTaskProgressDialog(param1: number): void {
        let _loc7_: string = null;
        let _loc5_: string = null;
        let _loc4_: boolean = false;
        this.destroyTaskProgressDialog();
        let _loc3_: TalentTrackTask = this._talentTrack.findTaskByAchievementId(param1);
        if (_loc3_ == null || _loc3_.badgeCode == null || _loc3_.badgeCode == "") {
            return;
        }
        this._habboTalent.tracking.trackEventLog("Talent", this.talentTrack.name, "talent.progress.show", _loc3_.badgeCode);
        if (_loc3_.badgeCode == "ACH_GuideAdvertisementReader1") {
            this.setupTourAdvertisement();
            return;
        }
        this._taskProgressPopup = this._habboTalent.getModalXmlWindow("task_progress_dialog");
        this._taskProgressPopup.rootWindow.procedure = this.onTaskProgressWindowEvent;
        this._taskProgressPopup.background.procedure = this.onTaskProgressBackgroundWindowEvent;
        let _loc2_: IWindowContainer = castGuarded(this._taskProgressPopup.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc2_.findChildByName("instruction").caption = this._habboTalent.localizationManager.getAchievementInstruction(_loc3_.badgeCode);
        _loc2_.findChildByName("title").caption = this._habboTalent.localizationManager.getAchievementName(_loc3_.badgeCode);
        _loc2_.findChildByName("progress_text").caption = this._habboTalent.localizationManager.getLocalization("talent.track.task.progress.dialog.progress") + " " + _loc3_.currentScore + "/" + _loc3_.totalScore;
        castGuarded(castGuarded(_loc2_.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget, "com.sulake.habbo.window.widgets.IBadgeImageWidget").badgeId = _loc3_.badgeCode;
        this.getEmailContainer().visible = false;
        if (this._habboTalent.citizenshipEnabled) {
            _loc7_ = this._habboTalent.localizationManager.getLocalization("talent.track.task.action." + this._talentTrack.name + "." + this.mapBadgeCode(_loc3_.badgeCode) + ".description", "");
            _loc5_ = this._habboTalent.localizationManager.getLocalization("talent.track.task.action." + this._talentTrack.name + "." + this.mapBadgeCode(_loc3_.badgeCode) + ".link", "");
            _loc4_ = _loc7_ != "" || _loc5_ != "";
            _loc2_.findChildByName("action_separator").visible = _loc4_;
            _loc2_.findChildByName("action_title").visible = _loc4_;
            this.setText(_loc2_, "action_description", _loc7_);
            this.setText(_loc2_, "action_link", _loc5_);
            _loc2_.findChildByName("action_link").name = _loc3_.badgeCode;
            _loc2_.findChildByName("progress_separator").visible = _loc5_ != "";
            if (_loc3_.badgeCode == "ACH_EmailVerification1" && this.emailChangeEnabled) {
                this.getEmailContainer().visible = true;
                this.getEmailContainer().findChildByName("change_email_region").procedure = this.onChangeEmail;
                this.getEmailText().procedure = this.onEmailTxt;
                this._habboTalent.send(new GetEmailStatusComposer());
                this.setEmailErrorStatus(false);
            }
        } else {
            _loc2_.findChildByName("action_separator").visible = false;
            _loc2_.findChildByName("action_title").visible = false;
            _loc2_.findChildByName("action_description").visible = false;
            _loc2_.findChildByName("action_link").visible = false;
        }
        castGuarded(_loc2_.findChildByName("top_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        if (_loc3_.currentScore <= 0) {
            _loc2_.findChildByName("achieved_left").visible = false;
            _loc2_.findChildByName("achieved_right").visible = false;
            _loc2_.findChildByName("achieved_mid").visible = false;
        } else if (_loc3_.currentScore < _loc3_.totalScore) {
            _loc2_.findChildByName("achieved_right").visible = false;
            _loc2_.findChildByName("achieved_mid").width = MathUtils.map(_loc3_.currentScore, 0, _loc3_.totalScore, 0, _loc2_.findChildByName("unachieved_mid").width) | 0;
        }
        let _loc6_: IItemListWindow = castGuarded(_loc2_.findChildByName("list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (!_loc3_.hasProgressDisplay()) {
            _loc6_.removeListItem(_loc6_.getListItemByName("progress_main_container"));
        }
        _loc6_.arrangeListItems();
    }

    private getEmailContainer(): IWindowContainer {
        if (this._taskProgressPopup == null || this._taskProgressPopup.rootWindow == null) {
            return null;
        }
        let _loc1_: IWindowContainer = castGuarded(this._taskProgressPopup.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        return _loc1_ == null ? null : castGuarded(_loc1_.findChildByName("email_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    private mapBadgeCode(param1: string): string {
        if (param1 == "ACH_RoomEntry1" || param1 == "ACH_RoomEntry2") {
            return "ACH_RoomEntry";
        }
        return param1;
    }

    private setText(param1: IWindowContainer, param2: string, param3: string): void {
        let _loc4_: IWindow = param1.findChildByName(param2);
        _loc4_.caption = param3;
        _loc4_.visible = param3 != "";
    }

    private destroyTaskProgressDialog(): void {
        if (this._taskProgressPopup != null) {
            this._taskProgressPopup.dispose();
            this._taskProgressPopup = null;
        }
    }

    private onTaskProgressWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: number = 0;
        if (this._taskProgressPopup == null || Boolean(this._taskProgressPopup.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
            case "thanks_button":
                this.destroyTaskProgressDialog();
                break;
            case "ACH_HabboWayGraduate1":
                this.closeAndLog(param2.name);
                this._habboTalent.habboHelp.showHabboWay();
                break;
            case "ACH_GuideGroupMember1":
                this.closeAndLog(param2.name);
                _loc3_ = this._habboTalent.getInteger("guide.help.alpha.groupid", 0);
                if (_loc3_ > 0) {
                    this._SafeStr_5244 = _loc3_;
                    this._habboTalent.send(new GetHabboGroupDetailsMessageComposer(_loc3_, false));
                }
                break;
            case "ACH_SafetyQuizGraduate1":
                this.closeAndLog(param2.name);
                this._habboTalent.habboHelp.showSafetyBooklet();
                break;
            case "ACH_RoomEntry1":
            case "ACH_RoomEntry2":
                this.closeAndLog(param2.name);
                this._habboTalent.navigator.openNavigator(null);
                break;
            case "ACH_AvatarLooks1":
                this.closeAndLog(param2.name);
                this._habboTalent.avatarEditor.openEditor(0, null, null, true);
                this._habboTalent.avatarEditor.loadOwnAvatarInEditor(0);
        }
    };

    private closeAndLog(param1: string): void {
        this.destroyWindow();
        this._habboTalent.tracking.trackEventLog("Talent", this._talentTrack.name, "talent.progress.click_activity", param1);
    }

    private setupTourAdvertisement(): void {
        this._taskProgressPopup = this._habboTalent.getModalXmlWindow("tour_task_progress_dialog");
        let _loc1_: IWindowContainer = castGuarded(this._taskProgressPopup.rootWindow, isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc1_.findChildByName("take_tour_button").procedure = this.onTakeTour;
        _loc1_.findChildByName("decline_tour_region").procedure = this.onDeclineTour;
        _loc1_.findChildByName("header_button_close").procedure = this.onCloseTourAd;
    }

    private onTakeTour = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.destroyWindow();
            this.destroyTaskProgressDialog();
            this._habboTalent.send(new GuideAdvertisementReadMessageComposer());
            this._habboTalent.habboHelp.requestGuide();
            this._habboTalent.tracking.trackEventLog("Help", "", "tour.new_user.accept");
            this._habboTalent.tracking.trackGoogle("newbieTourWindow", "click_acceptTour");
        }
    };

    private onCloseTourAd = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.destroyTaskProgressDialog();
        }
    };

    private onDeclineTour = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.destroyWindow();
            this.destroyTaskProgressDialog();
            this._habboTalent.send(new GuideAdvertisementReadMessageComposer());
            this._habboTalent.tracking.trackEventLog("Help", "", "tour.new_user.cancel");
            this._habboTalent.tracking.trackGoogle("newbieTourWindow", "click_refuseTour");
        }
    };

    private onChangeEmail = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this.getEmailText().text;
            this._habboTalent.send(new ChangeEmailComposer(_loc3_));
        }
    };

    private onEmailTxt = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WE_FOCUSED") {
            this.setEmailErrorStatus(false);
        }
    };

    private setEmailErrorStatus(param1: boolean, param2: number = 0): void {
        if (this.getEmailContainer() == null) {
            return;
        }
        let _loc3_: boolean = param1 && param2 != 0;
        let _loc4_: IWindowContainer = this.getEmailContainer();
        let _loc5_: IWindow = _loc4_.findChildByName("error_txt");
        _loc5_.visible = _loc3_;
        _loc5_.caption = "${welcome.gift.email.error." + param2 + "}";
        _loc4_.findChildByName("error_border").visible = _loc3_;
        _loc4_.findChildByName("change_email_region").visible = !param1;
        _loc4_.findChildByName("changed_container").visible = param1 && param2 == 0;
    }

    private getEmailText(): ITextFieldWindow {
        return castGuarded(this.getEmailContainer().findChildByName("email_txt"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
    }

    private onTaskProgressBackgroundWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        if (this._taskProgressPopup == null || Boolean(this._taskProgressPopup.disposed) || param1.type != "WME_CLICK") {
            return;
        }
        this.destroyTaskProgressDialog();
    };

    private get emailChangeEnabled(): boolean {
        return this._habboTalent.getBoolean("talent.progress.emailchange.enabled");
    }

    get [IDisposable](): true {
        return true;
    }
}
