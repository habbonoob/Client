import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { SetMannequinFigureComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetMannequinFigureComposer';
import { SetMannequinNameComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetMannequinNameComposer';
import { MannequinWidgetHandler } from '@/com/sulake/habbo/ui/handler/MannequinWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class MannequinWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.mannequin::MannequinWidget'); }

    private static readonly CONTENT_CONTROLLER_MAIN: number = 0;
    private static readonly CONTENT_CONTROLLER_UPDATE: number = 1;
    private static readonly CONTENT_PEER_MAIN: number = 2;
    private static readonly CONTENT_NO_CLUB: number = 3;
    private static readonly CONTENT_WRONG_GENDER: number = 4;
    private static readonly _SafeStr_7716: string = "header_button_close";
    private static readonly _SafeStr_7593: string = "save_button";
    private static readonly _SafeStr_8698: string = "wear_button";
    private static readonly _SafeStr_7809: string = "configure_button";
    private static readonly _SafeStr_8378: string = "get_club_button";
    private static readonly _SafeStr_7595: string = "cancel_text";
    private static readonly _SafeStr_8266: string = "back_region";
    private static readonly _SafeStr_7683: string = "ok_button";
    private static readonly ELEM_OUTFIT_NAME_SET: string = "outfit_name_set";
    private static readonly _SafeStr_7850: string = "outfit_name_show";
    private static readonly NAME_STATE_HINT: number = 0;
    private static readonly NAME_STATE_WRITING: number = 1;
    private static readonly NAME_STATE_SAVED: number = 2;
    private static readonly NAME_TEXT_COLOR_SAVED: number = 0;
    private static readonly NAME_TEXT_COLOR_WRITING: number = 8956552;
    private static readonly NAME_TEXT_COLOR_HINT: number = 7829367;
    private static readonly ICON_STYLE_CLUB: number = 13;
    private static readonly ICON_STYLE_VIP: number = 14;
    private static readonly MANNEQUIN_CLOTHING_PART_TYPES: any[] = ["ca", "cc", "ch", "lg", "sh", "wa"];
    private static readonly MANNEQUIN_FIGURE: any[] = ["hd", 99999, [99998]];

    declare private _window: IWindowContainer;

    declare private _furniId: number;
    static { (this.prototype as any)._furniId = 0; }

    declare private _SafeStr_4522: string;

    declare private _SafeStr_5794: string;

    declare private _SafeStr_3730: number;
    static { (this.prototype as any)._SafeStr_3730 = 0; }

    declare private _savedOutfitName: string;

    private _SafeStr_5426: number = -1;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
        this.handler.widget = this;
    }

    public get handler(): MannequinWidgetHandler {
        return this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        super.dispose();
    }

    public open(param1: number, param2: string, param3: string, param4: string): void {
        this._furniId = param1;
        this._SafeStr_4522 = param2;
        this._SafeStr_5794 = param3;
        this._savedOutfitName = param4;
        let _loc10_: IRoomSession = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.roomSession;
        let _loc6_: ISessionDataManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.sessionDataManager;
        let _loc11_: boolean = _loc10_.isRoomOwner || _loc10_.roomControllerLevel >= 1 || _loc6_.isAnyRoomController;
        let _loc8_: IAvatarRenderManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.avatarRenderManager;
        let _loc9_: IAvatarFigureContainer = _loc8_.createFigureContainer(param2);
        this._SafeStr_3730 = _loc8_.resolveClubLevel(_loc9_, this._SafeStr_5794, MannequinWidget.MANNEQUIN_CLOTHING_PART_TYPES);
        let _loc7_: number = this.resolveFirstWindowContent(_loc11_, _loc6_.gender, _loc6_.clubLevel, param3, this._SafeStr_3730);
        this.setWindowContent(_loc7_);
        let _loc5_: number = this._savedOutfitName && this._savedOutfitName != "" ? 2 : 0;
        this.setOutfitNameState(_loc5_);
        this._window.visible = true;
    }

    private resolveFirstWindowContent(param1: boolean, param2: string, param3: number, param4: string, param5: number): number {
        if (param1) {
            return 0;
        }
        if (param2.toLowerCase() != param4.toLowerCase()) {
            return 4;
        }
        if (param3 < param5) {
            return 3;
        }
        return 2;
    }

    private setWindowContent(param1: number): void {
        let _loc7_: BitmapData = null;
        let _loc6_: IAvatarFigureContainer = null;
        let _loc3_: ISessionDataManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.sessionDataManager;
        let _loc4_: string = _loc3_.figure;
        let _loc5_: IAvatarRenderManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.avatarRenderManager;
        let _loc2_: number = this._savedOutfitName && this._savedOutfitName != "" ? 2 : 0;
        if (!this._window) {
            this._window = asGuarded(this.windowManager.buildFromXML(asInstanceOf(this.assets.getAssetByName("mannequin_widget_frame_xml").content, XML)), isIWindowContainer);
            this.addClickListener("header_button_close");
            this._window.center();
        }
        (isIFrameWindow(this._window) ? this._window : null).content.removeChildAt(0);
        let _loc8_: IWindowContainer = this.createWindow(param1);
        (isIFrameWindow(this._window) ? this._window : null).content.addChild(_loc8_);
        switch (param1) {
            case 0:
                this.addClickListener("configure_button");
                this.addClickListener("wear_button");
                this.addTextFieldListener("outfit_name_set");
                this.addClickListener("outfit_name_set");
                _loc6_ = _loc5_.createFigureContainer(this._SafeStr_4522);
                this.transformAsMannequinFigure(_loc6_);
                _loc7_ = this.createAvatarImage(_loc6_.getFigureString());
                this.updateClubLevelView(this._SafeStr_3730);
                this.setOutfitNameState(_loc2_);
                this.updateDecorations();
                break;
            case 1:
                this.addClickListener("save_button");
                this.addClickListener("back_region");
                _loc6_ = _loc5_.createFigureContainer(_loc4_);
                this.transformAsMannequinFigure(_loc6_);
                _loc7_ = this.createAvatarImage(_loc6_.getFigureString());
                this.updateClubLevelView(_loc5_.resolveClubLevel(_loc6_, _loc3_.gender, MannequinWidget.MANNEQUIN_CLOTHING_PART_TYPES));
                this.setOutfitNameState(_loc2_);
                break;
            case 2:
                this.addClickListener("wear_button");
                _loc6_ = this.applyMannequinOutfit(_loc4_, this._SafeStr_4522);
                _loc7_ = this.createAvatarImage(_loc6_.getFigureString());
                this.updateClubLevelView(this._SafeStr_3730);
                this.setOutfitNameState(_loc2_);
                break;
            case 3:
                this.addClickListener("get_club_button");
                _loc6_ = this.applyMannequinOutfit(_loc4_, this._SafeStr_4522);
                _loc7_ = this.createAvatarImage(_loc6_.getFigureString());
                this.updateClubLevelView(this._SafeStr_3730);
                break;
            case 4:
                this.addClickListener("ok_button");
                _loc6_ = _loc5_.createFigureContainer(this._SafeStr_4522);
                this.transformAsMannequinFigure(_loc6_);
                _loc7_ = this.createAvatarImage(_loc6_.getFigureString());
                this.updateClubLevelView(this._SafeStr_3730);
                break;
            default:
                throw new Error("Invalid type for mannequin widget content apply: " + param1);
        }
        this.updatePreviewImage(_loc8_, _loc7_);
    }

    private createWindow(param1: number): IWindowContainer {
        let _loc3_: any = null;
        let _loc2_: IAsset = null;
        switch (param1) {
            case 0:
                _loc2_ = this._assets.getAssetByName("mannequin_controller_main_xml");
                break;
            case 1:
                _loc2_ = this._assets.getAssetByName("mannequin_controller_save_xml");
                break;
            case 2:
                _loc2_ = this._assets.getAssetByName("mannequin_peer_main_xml");
                break;
            case 3:
                _loc2_ = this._assets.getAssetByName("mannequin_no_club_xml");
                break;
            case 4:
                _loc2_ = this._assets.getAssetByName("mannequin_wrong_gender_xml");
                break;
            default:
                throw new Error("Invalid type for mannequin widget content creation: " + param1);
        }
        return asGuarded((this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
    }

    private transformAsMannequinFigure(param1: IAvatarFigureContainer): void {
        for (const _loc2_ of param1.getPartTypeIds() ?? []) {
            if (MannequinWidget.MANNEQUIN_CLOTHING_PART_TYPES.indexOf(_loc2_) == -1) {
                param1.removePart(stringOrNull(_loc2_));
            }
        }
        param1.updatePart(stringOrNull(MannequinWidget.MANNEQUIN_FIGURE[0]), MannequinWidget.MANNEQUIN_FIGURE[1] | 0, MannequinWidget.MANNEQUIN_FIGURE[2]);
    }

    private createAvatarImage(param1: string): BitmapData {
        let _loc3_: IAvatarRenderManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.avatarRenderManager;
        let _loc4_: IAvatarImage = _loc3_.createAvatarImage(param1, "h");
        let _loc2_: BitmapData = _loc4_.getCroppedImage("full");
        _loc4_.dispose();
        return _loc2_;
    }

    private applyMannequinOutfit(param1: string, param2: string): IAvatarFigureContainer {
        let _loc5_: any = null;
        let _loc4_: IAvatarRenderManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.avatarRenderManager;
        let _loc3_: IAvatarFigureContainer = _loc4_.createFigureContainer(param1);
        let _loc6_: IAvatarFigureContainer = _loc4_.createFigureContainer(param2);
        for (_loc5_ of MannequinWidget.MANNEQUIN_CLOTHING_PART_TYPES ?? []) {
            _loc3_.removePart(stringOrNull(_loc5_));
        }
        for (_loc5_ of _loc6_.getPartTypeIds() ?? []) {
            _loc3_.updatePart(stringOrNull(_loc5_), _loc6_.getPartSetId(stringOrNull(_loc5_)), _loc6_.getPartColorIds(stringOrNull(_loc5_)));
        }
        return _loc3_;
    }

    private updateClubLevelView(param1: number): void {
        let _loc2_: IIconWindow = asGuarded(this._window.findChildByName("club_icon"), isIIconWindow);
        if (!_loc2_) {
            return;
        }
        switch (param1) {
            case 0:
                _loc2_.visible = false;
                break;
            case 1:
                _loc2_.style = 13;
                _loc2_.visible = true;
                break;
            case 2:
                _loc2_.style = 14;
                _loc2_.visible = true;
        }
    }

    private updatePreviewImage(param1: IWindowContainer, param2: BitmapData): void {
        let _loc5_: BitmapData = null;
        if (!param1 || !param2) {
            return;
        }
        let _loc6_: IBitmapWrapperWindow = asGuarded(param1.findChildByName("preview_image"), isIBitmapWrapperWindow);
        if (_loc6_.bitmap == null) {
            _loc6_.bitmap = new BitmapData(_loc6_.width, _loc6_.height);
        }
        let _loc3_: IAsset = asGuarded(this.assets.getAssetByName("mannequin_preview_bg_png"), isIAsset);
        if (_loc3_) {
            _loc5_ = asInstanceOf(_loc3_.content, BitmapData);
            _loc6_.bitmap.copyPixels(_loc5_, _loc5_.rect, new Point(0, 0));
        }
        let _loc4_: Point = new Point((_loc6_.width - param2.width) / 2, (_loc6_.height - param2.height) / 2);
        _loc6_.bitmap.copyPixels(param2, param2.rect, _loc4_, null, null, true);
    }

    private updateDecorations(): void {
        let _loc1_: BitmapDataAsset = null;
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("write_deco"), isIBitmapWrapperWindow);
        if (_loc2_) {
            _loc1_ = asInstanceOf(this._assets.getAssetByName("small_pen"), BitmapDataAsset);
            _loc2_.bitmap = asInstanceOf(_loc1_.content, BitmapData);
            _loc2_.disposesBitmap = false;
        }
    }

    private close(): void {
        this._window.visible = false;
    }

    private setOutfitNameState(param1: number): void {
        this._SafeStr_5426 = param1;
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName("outfit_name_set"), isITextWindow);
        if (_loc3_) {
            switch (param1) {
                case 0:
                    _loc3_.text = this.handler.container.localization.getLocalization("mannequin.widget.set_name_hint");
                    _loc3_.textColor = 7829367;
                    _loc3_.italic = true;
                    break;
                case 1:
                    _loc3_.textColor = 8956552;
                    _loc3_.italic = false;
                    break;
                case 2:
                    _loc3_.text = this._savedOutfitName;
                    _loc3_.textColor = 0;
                    _loc3_.italic = false;
                    break;
                default:
                    _loc3_.text = this.handler.container.localization.getLocalization("mannequin.widget.set_name_hint");
                    _loc3_.textColor = 7829367;
            }
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("outfit_name_show"), isITextWindow);
        if (_loc2_ && this._savedOutfitName && this._savedOutfitName != "") {
            _loc2_.text = "\'" + this._savedOutfitName + "\'";
        }
    }

    private clearNameField(): void {
        let _loc1_: ITextWindow = asGuarded(this._window.findChildByName("outfit_name_set"), isITextWindow);
        if (_loc1_) {
            _loc1_.text = "";
        }
    }

    private saveOutfit(): void {
        this.handler.container.connection.send(new SetMannequinFigureComposer(this._furniId));
    }

    private saveOutfitName(): void {
        let _loc1_: string = this.getNameFromView();
        this.handler.container.connection.send(new SetMannequinNameComposer(this._furniId, _loc1_));
        this._savedOutfitName = _loc1_;
        this.setOutfitNameState(2);
    }

    private getNameFromView(): string {
        let _loc2_: string = (asGuarded(this._window.findChildByName("outfit_name_set"), isITextWindow)).text;
        let _loc1_: string = this.handler.container.localization.getLocalization("mannequin.widget.set_name_hint");
        return _loc2_ == _loc1_ ? "" : _loc2_;
    }

    private addClickListener(param1: string): void {
        this._window.findChildByName(param1).addEventListener("WME_CLICK", this.onMouseClick);
    }

    private addTextFieldListener(param1: string): void {
        this._window.findChildByName(param1).addEventListener("WKE_KEY_UP", this.onKeyTyped);
    }

    private onKeyTyped = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode == 13) {
            this.saveOutfitName();
        } else if (this._SafeStr_5426 != 1) {
            this.setOutfitNameState(1);
        }
    };

    private onMouseClick = (param1: WindowMouseEvent): void => {
        let _loc2_: ISessionDataManager = (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.sessionDataManager;
        switch (param1.target.name) {
            case "header_button_close":
            case "cancel_text":
            case "ok_button":
                this.close();
                break;
            case "save_button":
                this.saveOutfit();
                this.close();
                break;
            case "wear_button":
                if (_loc2_.clubLevel < this._SafeStr_3730) {
                    this.setWindowContent(3);
                } else if (_loc2_.gender.toLowerCase() != this._SafeStr_5794.toLowerCase()) {
                    this.setWindowContent(4);
                } else {
                    this.handler.container.connection.send(new UseFurnitureMessageComposer(this._furniId));
                    this.close();
                }
                break;
            case "configure_button":
                this.saveOutfitName();
                this.setWindowContent(1);
                break;
            case "back_region":
                this.setWindowContent(0);
                break;
            case "get_club_button":
                (this._SafeStr_2143 instanceof MannequinWidgetHandler ? this._SafeStr_2143 : null).container.catalog.openClubCenter();
                this.close();
                break;
            case "outfit_name_set":
                if (this._SafeStr_5426 == 0) {
                    this.clearNameField();
                    this.setOutfitNameState(1);
                } else if (this._SafeStr_5426 == 2) {
                    this.setOutfitNameState(1);
                }
        }
    };
}
