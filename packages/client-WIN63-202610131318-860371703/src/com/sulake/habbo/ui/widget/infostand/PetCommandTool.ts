import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CommandConfiguration } from '@/com/sulake/habbo/ui/widget/infostand/CommandConfiguration';
import { RoomWidgetPetCommandMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPetCommandMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';

export class PetCommandTool {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::PetCommandTool'); }

    private static readonly STATUS_BAR_WIDTH: number = 162;
    private static readonly STATUS_BAR_HEIGHT: number = 16;
    private static readonly STATUS_BAR_HIGHLIGHT_HEIGHT: number = 4;
    private static readonly STATUS_BAR_BORDER_COLOR: number = 14342874;
    private static readonly STATUS_BAR_BG_COLOR: number = 3815994;
    private static readonly STATUS_BAR_SKILL_HIGHLIGHT_COLOR: number = 10513106;
    private static readonly STATUS_BAR_SKILL_CONTENT_COLOR: number = 8734654;
    private static readonly STATE_SKILL: string = "skill";
    private static readonly PET_TYPE_HORSE: number = 15;
    private static readonly DEFAULT_LOCATION: Point = new Point(100, 70);

    declare private _widget: InfoStandWidget;

    declare private _SafeStr_2168: IFrameWindow;

    declare private _SafeStr_6770: IWindow;

    declare private _SafeStr_4496: UtilsMap;

    declare private _SafeStr_3368: number;
    static { (this.prototype as any)._SafeStr_3368 = 0; }

    declare private _currentPetName: string;

    declare private _SafeStr_2869: Timer;

    private readonly BUTTONS_DISABLED_MS: number = 1100;

    constructor(param1: InfoStandWidget) {
        this._widget = param1;
        this._SafeStr_4496 = new UtilsMap();
        this._SafeStr_2869 = new Timer(1100);
        this._SafeStr_2869.addEventListener("timer", this.onButtonDisableTimeout);
    }

    public static hideChildren(param1: IWindowContainer): void {
        let _loc2_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            param1.getChildAt(_loc2_).visible = false;
            _loc2_++;
        }
    }

    public static getLowestPoint(param1: IWindowContainer): number {
        let _loc2_: number = 0;
        let _loc4_: IWindow = null;
        let _loc3_: number = 0;
        _loc2_ = 0;
        while (_loc2_ < param1.numChildren) {
            _loc4_ = param1.getChildAt(_loc2_);
            if (_loc4_.visible) {
                _loc3_ = Math.max(_loc3_, _loc4_.y + _loc4_.height) | 0;
            }
            _loc2_++;
        }
        return _loc3_;
    }

    private static createPercentageBar(param1: number, param2: number, param3: number, param4: number): BitmapData {
        param2 = Math.max(param2, 1) | 0;
        param1 = Math.max(param1, 0) | 0;
        if (param1 > param2) {
            param1 = param2;
        }
        let _loc10_: number = param1 / param2;
        let _loc9_: number = 1;
        let _loc7_: BitmapData = new BitmapData(162, 16, false);
        _loc7_.fillRect(new Rectangle(0, 0, _loc7_.width, _loc7_.height), 14342874);
        let _loc8_: Rectangle = new Rectangle(_loc9_, _loc9_, _loc7_.width - _loc9_ * 2, _loc7_.height - _loc9_ * 2);
        _loc7_.fillRect(_loc8_, 3815994);
        let _loc6_: Rectangle = new Rectangle(_loc9_, _loc9_ + 4, _loc7_.width - _loc9_ * 2, _loc7_.height - _loc9_ * 2 - 4);
        _loc6_.width = _loc10_ * _loc6_.width;
        _loc7_.fillRect(_loc6_, param3);
        let _loc5_: Rectangle = new Rectangle(_loc9_, _loc9_, _loc7_.width - _loc9_ * 2, 4);
        _loc5_.width = _loc10_ * _loc5_.width;
        _loc7_.fillRect(_loc5_, param4);
        return _loc7_;
    }

    public dispose(): void {
        if (this._SafeStr_2869) {
            this._SafeStr_2869.stop();
            this._SafeStr_2869 = null;
        }
        if (this._widget) {
            this._widget = null;
        }
        if (this._SafeStr_2168) {
            this._SafeStr_2168.dispose();
        }
        this._SafeStr_2168 = null;
    }

    public getPetId(): number {
        return this._SafeStr_3368;
    }

    public isVisible(): boolean {
        if (this._SafeStr_2168 == null) {
            return false;
        }
        return this._SafeStr_2168.visible;
    }

    public showCommandToolForPet(param1: number, param2: string, param3: BitmapData, param4: number, param5: number, param6: number, param7: number, param8: any[]): void {
        if (this._SafeStr_2168 == null) {
            return;
        }
        this.updateStateElement("skill", (param5 + param6) * 100 | 0, param7 * 100, 8734654, 10513106, param4);
        if (this._SafeStr_3368 == param1) {
            return;
        }
        this._SafeStr_3368 = param1;
        this._currentPetName = param2;
        let _loc10_: ITextWindow = asGuarded(this._SafeStr_2168.findChildByName("pet_name"), isITextWindow);
        if (_loc10_ != null) {
            _loc10_.text = param2;
        }
        this.updatePetImage(param3);
        let _loc9_: CommandConfiguration = asInstanceOf(this._SafeStr_4496.getValue(param1), CommandConfiguration);
        if (_loc9_ == null) {
            this.disableAllButtons();
            this.requestEnabledCommands(this._SafeStr_3368);
        } else {
            this.updateCommandButtonsViewState(_loc9_);
        }
    }

    public updatePetImage(param1: BitmapData): void {
        let _loc2_: BitmapData = null;
        let _loc4_: Point = null;
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._SafeStr_2168.findChildByName("avatar_image"), isIBitmapWrapperWindow);
        if (_loc3_ != null) {
            if (param1 != null) {
                _loc2_ = new BitmapData(_loc3_.width, _loc3_.height, true, 0);
                _loc4_ = new Point(0, 0);
                _loc4_.x = Math.round((_loc3_.width - param1.width) / 2);
                _loc4_.y = Math.round((_loc3_.height - param1.height) / 2);
                _loc2_.copyPixels(param1, param1.rect, _loc4_);
                _loc3_.bitmap = _loc2_;
            } else {
                _loc3_.bitmap = null;
            }
            _loc3_.invalidate();
        }
    }

    private onButtonDisableTimeout = (param1: TimerEvent): void => {
        let _loc2_: CommandConfiguration = asInstanceOf(this._SafeStr_4496.getValue(this._SafeStr_3368), CommandConfiguration);
        this.updateCommandButtonsViewState(_loc2_);
        this._SafeStr_2869.stop();
    };

    public setEnabledCommands(param1: number, param2: CommandConfiguration): void {
        this._SafeStr_4496.remove(param1);
        this._SafeStr_4496.add(param1, param2);
        if (param1 != this._SafeStr_3368) {
            return;
        }
        this.updateCommandButtonsViewState(param2);
        this._SafeStr_2869.stop();
    }

    public showWindow(param1: boolean): void {
        if (param1) {
            if (this._SafeStr_2168 == null) {
                this.createCommandWindow();
            }
            this._SafeStr_2168.visible = true;
        } else if (this._SafeStr_2168 != null) {
            this._SafeStr_2168.visible = false;
        }
        this._SafeStr_2869.stop();
    }

    private requestEnabledCommands(param1: number): void {
        let _loc2_: RoomWidgetPetCommandMessage = new RoomWidgetPetCommandMessage("RWPCM_REQUEST_PET_COMMANDS", param1);
        this._widget.messageListener.processWidgetMessage(_loc2_);
    }

    private createCommandWindow(): void {
        let _loc7_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        let _loc3_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("pet_commands"), XmlAsset);
        this._SafeStr_2168 = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIFrameWindow);
        if (this._SafeStr_2168 == null) {
            throw new Error("Failed to construct command window from XML!");
        }
        this._SafeStr_2168.context.getDesktopWindow().addEventListener("WE_RESIZED", this.onWindowDesktopResized);
        this._SafeStr_6770 = castGuarded(this._SafeStr_2168.findChildByName("commands_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChildAt(0);
        let _loc1_: IWindow = this._SafeStr_2168.findChildByName("header_button_close");
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.onCommandWindowClose);
        }
        let _loc5_: IWindow = this._SafeStr_2168.findChildByName("description_link");
        if (_loc5_ != null) {
            _loc5_.addEventListener("WME_CLICK", this.onCommandWindowDescriptionLink);
        }
        let _loc2_: IWindow = this._SafeStr_2168.findChildByName("avatar_image");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onCommandWindowAvatarImageClick);
        }
        let _loc6_: IBitmapWrapperWindow = asGuarded(this._SafeStr_2168.findChildByName("status_skill_icon"), isIBitmapWrapperWindow);
        if (_loc6_ != null) {
            _loc7_ = asInstanceOf(this._widget.assets.getAssetByName("icon_pet_skill"), BitmapDataAsset);
            _loc4_ = asInstanceOf(_loc7_.content, BitmapData);
            _loc6_.bitmap = _loc4_.clone();
        }
        this._SafeStr_2168.position = PetCommandTool.DEFAULT_LOCATION;
    }

    private updateCommandButtonsViewState(param1: CommandConfiguration): void {
        let _loc7_: number = 0;
        let _loc3_: IButtonWindow = null;
        let _loc10_: number = 0;
        if (this._SafeStr_2168 == null) {
            return;
        }
        let _loc6_: IWindowContainer = castGuarded(this._SafeStr_2168.findChildByName("commands_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        PetCommandTool.hideChildren(_loc6_);
        let _loc8_: any[] = param1.allCommandIds;
        let _loc12_: number = 25;
        let _loc11_: number = 0;
        let _loc2_: number = 86;
        let _loc9_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < _loc8_.length) {
            _loc3_ = asGuarded(_loc6_.getChildAt(_loc7_), isIButtonWindow);
            if (_loc3_ == null) {
                _loc3_ = asGuarded(this._SafeStr_6770.clone(), isIButtonWindow);
                _loc3_.addEventListener("WME_CLICK", this.onTrainButtonMouseClick);
                _loc6_.addChild(_loc3_);
            }
            _loc3_.visible = true;
            _loc10_ = _loc8_[_loc7_] | 0;
            _loc3_.id = _loc10_;
            _loc3_.caption = this._widget.localizations.getLocalization("pet.command." + _loc10_);
            if (param1.isEnabled(_loc10_)) {
                _loc3_.enable();
            } else {
                _loc3_.disable();
            }
            _loc3_.y = _loc9_;
            if (_loc7_ % 2 == 1) {
                _loc9_ += _loc12_;
                _loc3_.x = _loc2_;
            } else {
                _loc3_.x = _loc11_;
            }
            _loc7_++;
        }
        let _loc4_: boolean = this._widget.config.getBoolean("pet.enhancements.enabled");
        let _loc5_: number = _loc4_ ? 180 : 160;
        _loc6_.height = PetCommandTool.getLowestPoint(_loc6_);
        this._SafeStr_2168.height = _loc6_.height + _loc5_;
        this._SafeStr_2869.stop();
    }

    private disableAllButtons(): void {
        let _loc3_: number = 0;
        let _loc1_: IButtonWindow = null;
        if (this._SafeStr_2168 == null) {
            return;
        }
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_2168.findChildByName("commands_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_ = 0;
        while (_loc3_ < _loc2_.numChildren) {
            _loc1_ = castGuarded(_loc2_.getChildAt(_loc3_), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
            _loc1_.disable();
            _loc3_++;
        }
    }

    private onCommandWindowClose = (param1: WindowMouseEvent): void => {
        this._SafeStr_2168.visible = false;
    };

    private onCommandWindowDescriptionLink = (param1: WindowMouseEvent): void => {
        this._widget.windowManager.openHelpPage("help/pets/training");
    };

    private onCommandWindowAvatarImageClick = (param1: WindowMouseEvent): void => {
        this._widget.messageListener.processWidgetMessage(new RoomWidgetUserActionMessage("RWUAM_REQUEST_PET_UPDATE", this._SafeStr_3368));
    };

    private onTrainButtonMouseClick = (param1: WindowMouseEvent): void => {
        let _loc6_: IWindow = param1.target;
        let _loc5_: number = _loc6_.id;
        let _loc3_: string = "pet.command." + _loc5_;
        let _loc2_: string = this._widget.localizations.getLocalization(_loc3_);
        let _loc4_: RoomWidgetPetCommandMessage = new RoomWidgetPetCommandMessage("RWPCM_PET_COMMAND", this._SafeStr_3368, this._currentPetName + " " + _loc2_);
        this._widget.messageListener.processWidgetMessage(_loc4_);
        this.disableAllButtons();
        this._SafeStr_2869.start();
    };

    private onWindowDesktopResized = (param1: WindowEvent): void => {
        let _loc2_: IWindow = null;
        let _loc3_: Rectangle = null;
        if (this._SafeStr_2168 && !this._SafeStr_2168.disposed) {
            _loc2_ = param1.window;
            _loc3_ = new Rectangle();
            this._SafeStr_2168.getGlobalRectangle(_loc3_);
            if (_loc3_.x > _loc2_.width) {
                this._SafeStr_2168.x = _loc2_.width - this._SafeStr_2168.width;
                this._SafeStr_2168.getGlobalRectangle(_loc3_);
            }
            if (_loc3_.x + _loc3_.width <= 0) {
                this._SafeStr_2168.x = 0;
                this._SafeStr_2168.getGlobalRectangle(_loc3_);
            }
            if (_loc3_.y > _loc2_.height) {
                this._SafeStr_2168.y = 0;
                this._SafeStr_2168.getGlobalRectangle(_loc3_);
            }
            if (_loc3_.y + _loc3_.height <= 0) {
                this._SafeStr_2168.y = 0;
                this._SafeStr_2168.getGlobalRectangle(_loc3_);
            }
        }
    };

    private updateStateElement(param1: string, param2: number, param3: number, param4: number, param5: number, param6: number): void {
        let _loc8_: BitmapData = null;
        if (this._SafeStr_2168 == null) {
            return;
        }
        let _loc7_: IWindowContainer = asGuarded(this._SafeStr_2168.findChildByName("status_" + param1 + "_container"), isIWindowContainer);
        if (_loc7_ == null) {
            return;
        }
        _loc7_.visible = this._widget.config.getBoolean("pet.enhancements.enabled") && param6 == 15;
        let _loc10_: ITextWindow = asGuarded(_loc7_.findChildByName("status_" + param1 + "_value_text"), isITextWindow);
        if (_loc10_ != null) {
            _loc10_.text = param2 + "/" + param3;
        }
        let _loc11_: ITextWindow = asGuarded(_loc7_.findChildByName("status_" + param1 + "_text"), isITextWindow);
        if (_loc11_ != null) {
            _loc11_.caption = "${infostand.pet.text.skill.next." + param6 + "}";
        }
        let _loc9_: IBitmapWrapperWindow = asGuarded(_loc7_.findChildByName("status_" + param1 + "_bitmap"), isIBitmapWrapperWindow);
        if (_loc9_ != null) {
            _loc8_ = PetCommandTool.createPercentageBar(param2, param3, param4, param5);
            if (_loc8_ != null) {
                _loc9_.bitmap = _loc8_;
                _loc9_.width = _loc8_.width;
                _loc9_.height = _loc8_.height;
                _loc9_.invalidate();
            }
        }
    }
}
