import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CameraPublishStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CameraPublishStatusMessageEvent';
import type { CompetitionStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/CompetitionStatusMessageEvent';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { CameraWidget } from '@/com/sulake/habbo/ui/widget/camera/CameraWidget';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { DateTimeFormatter } from '@habbo-pixi/runtime/globalization/DateTimeFormatter';
import { FileReference } from '@habbo-pixi/runtime/net/FileReference';
import type { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { PNGEncoder } from '@/com/sulake/core/utils/images/PNGEncoder';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { CameraEffect } from '@/com/sulake/habbo/ui/widget/camera/CameraEffect';
import { CameraFxPreloader } from '@/com/sulake/habbo/ui/widget/camera/CameraFxPreloader';
import { CameraFxStrengthSlider } from '@/com/sulake/habbo/ui/widget/camera/CameraFxStrengthSlider';
import { PhotoPurchaseConfirmationDialog } from '@/com/sulake/habbo/ui/widget/camera/PhotoPurchaseConfirmationDialog';

export class CameraPhotoLab implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraPhotoLab'); }

    private static TEXT_WIDTH_MARGIN: number = 6;
    private static _SafeStr_2369: PhotoPurchaseConfirmationDialog;

    public static preloadEffects(param1: string, param2: string, param3: IHabboLocalizationManager): void {
        let _loc5_: any[] = [];
        let _loc4_: UtilsMap = CameraEffect.getEffects(param2, param3);
        for (const _loc6_ of valuesOf(_loc4_)) {
            if (_loc6_.type == "composite" || _loc6_.type == "frame") {
                _loc5_.push(_loc6_.name);
            }
        }
        CameraFxPreloader.init(param1, _loc5_);
    }

    constructor(param1: CameraWidget) {
        this._widget = param1;
    }

    declare private _widget: CameraWidget;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2341: IBitmapWrapperWindow;

    declare private _SafeStr_4538: BitmapData;

    declare private _SafeStr_2779: CameraFxStrengthSlider;

    declare private _sliderEffectInfo: ITextWindow;

    declare private _SafeStr_2442: CameraEffect;

    private _SafeStr_2542: UtilsMap = new UtilsMap();

    declare private _itemGrid: IScrollableGridWindow;

    declare private _SafeStr_4762: Sprite;

    private _SafeStr_4130: UtilsMap = new UtilsMap();
    private _captionInputKeyEvents: number = 0;
    private _SafeStr_6960: string = "";
    private _SafeStr_5333: boolean = false;
    private _SafeStr_2883: FileReference = new FileReference();
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.hide();
        }
        CameraEffect.resetAllEffects();
        this._SafeStr_4538 = null;
        this._widget = null;
        this._SafeStr_2341 = null;
        if (this._SafeStr_2779 != null) {
            this._SafeStr_2779.dispose();
            this._SafeStr_2779 = null;
        }
        this._sliderEffectInfo = null;
        this._SafeStr_2442 = null;
        this._SafeStr_2542 = null;
        this._SafeStr_4130 = null;
        this._disposed = true;
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
    }

    public openPhotoLab(param1: BitmapData): void {
        this._window = asGuarded(this._widget.getXmlWindow("camera_editor"), isIWindowContainer);
        this._window.center();
        if (this._widget.component.getProperty("camera.effects.enabled") != "true") {
            this.openPurchaseConfirmationDialog(null);
            return;
        }
        this._itemGrid = asGuarded(this._window.findChildByName("item_grid"), isIScrollableGridWindow);
        this._itemGrid.spacing = 7;
        this._SafeStr_2341 = asGuarded(this._window.findChildByName("image"), isIBitmapWrapperWindow);
        this._window.procedure = this.windowEventHandler;
        let _loc10_: ITextWindow = castGuarded(this._window.findChildByName("captionInput"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc10_.procedure = this.captionProcedure;
        let _loc6_: IDisplayObjectWrapper = asGuarded(this._window.findChildByName("purchase_display_object"), isIDisplayObjectWrapper);
        this._SafeStr_4762 = new Sprite();
        this._SafeStr_4762.graphics.beginFill(16711680, 0);
        this._SafeStr_4762.graphics.drawRect(0, 0, _loc6_.width, _loc6_.height);
        _loc6_.setDisplayObject(this._SafeStr_4762);
        this._SafeStr_4762.addEventListener("click", this.openPurchaseConfirmationDialog);
        let _loc7_: IRegionWindow = asGuarded(this._window.findChildByName("zoom_button"), isIRegionWindow);
        let _loc11_: IBorderWindow = asGuarded(_loc7_.getChildByName("centerizer"), isIBorderWindow);
        let _loc5_: ITextWindow = asGuarded(_loc11_.getChildByName("zoom_text"), isITextWindow);
        _loc5_.width = _loc5_.textWidth + CameraPhotoLab.TEXT_WIDTH_MARGIN | 0;
        let _loc8_: IRegionWindow = asGuarded(this._window.findChildByName("save_button"), isIRegionWindow);
        let _loc4_: IBorderWindow = asGuarded(_loc8_.getChildByName("centerizer"), isIBorderWindow);
        let _loc9_: ITextWindow = asGuarded(_loc4_.getChildByName("save_text"), isITextWindow);
        _loc9_.width = _loc9_.textWidth + CameraPhotoLab.TEXT_WIDTH_MARGIN | 0;
        let _loc2_: IDisplayObjectWrapper = asGuarded(this._window.findChildByName("save_click_catcher"), isIDisplayObjectWrapper);
        let _loc3_: Sprite = new Sprite();
        _loc3_.graphics.beginFill(16711680, 0);
        _loc3_.graphics.drawRect(0, 0, _loc2_.width, _loc2_.height);
        _loc2_.setDisplayObject(_loc3_);
        _loc3_.addEventListener("click", this.offerSaveAsFile);
        this.buildTypeButtons();
        this.setImageAndFilterButtons(param1);
        this._sliderEffectInfo = asGuarded(this._window.findChildByName("slider_effect_info"), isITextWindow);
        CameraEffect.resetAllEffects();
    }

    public hide(): void {
        this._window.visible = false;
    }

    public show(): void {
        this._window.visible = true;
    }

    public closePurchaseConfirmation(): void {
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.hide();
            CameraPhotoLab._SafeStr_2369 = null;
        }
    }

    public publishingStatus(param1: CameraPublishStatusMessageEvent): void {
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.publishingStatus(param1);
        }
    }

    public competitionStatus(param1: CompetitionStatusMessageEvent): void {
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.competitionStatus(param1);
        }
    }

    public logChosenEffects(): void {
        for (const _loc1_ of valuesOf(this._SafeStr_2542)) {
            if (_loc1_.isOn) {
                HabboTracking.getInstance().trackEventLog("Stories", "camera", "stories.photo.effect.chosen", stringOrNull(_loc1_.name));
            }
        }
    }

    public setRenderedPhotoUrl(param1: string): void {
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.setImageUrl(param1);
        }
    }

    public getEffectDataJson(): string {
        let _loc2_: any = null;
        let _loc1_: any[] = [];
        for (const _loc3_ of valuesOf(this._SafeStr_2542)) {
            if (_loc3_.isOn && _loc3_.type != "frame") {
                _loc2_ = {};
                _loc2_.name = _loc3_.name;
                _loc2_.alpha = _loc3_.getEffectStrength() * 255 | 0;
                _loc1_.push(_loc2_);
            }
        }
        for (const _loc4_ of valuesOf(this._SafeStr_2542)) {
            if (_loc4_.isOn && _loc4_.type == "frame") {
                _loc2_ = {};
                _loc2_.name = _loc4_.name;
                _loc1_.push(_loc2_);
            }
        }
        return JSON.stringify(_loc1_);
    }

    public getZoom(): number {
        return this._SafeStr_5333 ? 2 : 1;
    }

    protected onClose(param1: WindowMouseEvent): void {
        this.dispose();
    }

    public setSelectedFxValue(param1: number): void {
        if (this._SafeStr_2442) {
            this._SafeStr_2442.value = param1 | 0;
            this.updateSliderEffectInfo();
            this.renderAllEffects();
        }
    }

    public setCaptionText(param1: string): void {
        castGuarded(this._window.findChildByName("captionInput"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = param1;
    }

    public animateSuccessfulPurchase(): void {
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.animateIconToToolbar();
        }
    }

    private setImageAndFilterButtons(param1: BitmapData): void {
        this._SafeStr_4538 = param1.clone();
        this._SafeStr_2341.bitmap = param1;
        this.buildFilterButtons();
    }

    private updateSliderEffectInfo(): void {
        this._sliderEffectInfo.text = this._SafeStr_2442.description + " " + (this._SafeStr_2442.getEffectStrength() * 100 | 0) + "%";
        this._sliderEffectInfo.width = this._sliderEffectInfo.textWidth + CameraPhotoLab.TEXT_WIDTH_MARGIN | 0;
    }

    private buildTypeButtons(): void {
        let _loc5_: number = 0;
        _loc5_ = 6;
        let _loc3_: number = 0;
        _loc3_ = 2;
        if (this._SafeStr_4130.length > 0) {
            return;
        }
        let _loc1_: number = (isIFrameWindow(this._window) ? this._window : null).margins.left + this._itemGrid.x;
        let _loc2_: IWindowContainer = this.createTypeButton("colormatrix", "camera_icon_colorfilter");
        _loc2_.x = _loc1_ + (this._itemGrid.width - (2 * (_loc2_.width + 6) - 6)) / 2 | 0;
        _loc2_.y = 50;
        this._window.addChild(_loc2_);
        let _loc4_: IWindowContainer = this.createTypeButton("composite", "camera_icon_compositefilter");
        _loc4_.x = _loc2_.right + 6;
        _loc4_.y = _loc2_.y;
        this._window.addChild(_loc4_);
    }

    private buildFilterButtons = (): void => {
        let _loc1_: IWindowContainer = null;
        let _loc5_: string = null;
        if (CameraFxPreloader.preloadFinished() == false) {
            setTimeout(this.buildFilterButtons, 200);
        }
        let _loc6_: number = 0;
        let _loc7_: IHabboQuestEngine = this._widget.handler.roomDesktop.questEngine;
        if (_loc7_ != null) {
            _loc6_ = _loc7_.getAchievementLevel("explore", "ACH_CameraPhotoCount");
            if (_loc6_ == 0) {
                _loc6_ = _loc7_.getAchievementLevel("archive", "ACH_CameraPhotoCount");
            }
        }
        let _loc2_: UtilsMap = CameraEffect.getEffects(this._widget.component.getProperty("camera.available.effects"), this._widget.localizations);
        for (const _loc4_ of valuesOf(_loc2_)) {
            _loc1_ = this.createFxButton(_loc4_, this._SafeStr_4538.clone(), _loc6_);
            if (_loc1_) {
                _loc5_ = stringOrNull(_loc4_.description);
                if (_loc6_ < _loc4_._SafeStr_5906) {
                    _loc5_ = this._widget.localizations.getLocalization("camera.effect.required.level") + " " + _loc4_._SafeStr_5906;
                }
                castGuarded(_loc1_, isIRegionWindow, "com.sulake.core.window.components.IRegionWindow").toolTipCaption = _loc5_;
            }
        }
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName("slider_container"), isIWindowContainer);
        this._SafeStr_2779 = new CameraFxStrengthSlider(this, _loc3_, this._widget.windowManager.assets);
        this._SafeStr_2779.disable();
        CameraEffect.setMaxValue(this._SafeStr_2779.getScale());
        this.setFilterType("colormatrix");
    };

    private createTypeButton(param1: string, param2: string): IWindowContainer {
        let _loc3_: IRegionWindow = asGuarded(this._widget.getXmlWindow("camera_typebutton"), isIRegionWindow);
        let _loc4_: IBitmapWrapperWindow = asGuarded(_loc3_.findChildByName("icon"), isIBitmapWrapperWindow);
        _loc4_.bitmap = (asInstanceOf(this._widget.windowManager.assets.getAssetByName(param2).content, BitmapData)).clone();
        _loc3_.name = "typebutton," + param1;
        _loc3_.toolTipCaption = param1;
        this._SafeStr_4130.add(param1, _loc3_);
        return _loc3_;
    }

    private createFxButton(param1: CameraEffect, param2: BitmapData, param3: number): IWindowContainer {
        let _loc7_: IBitmapWrapperWindow = null;
        let _loc5_: number = NaN;
        let _loc8_: Matrix = null;
        let _loc9_: Bitmap = null;
        let _loc6_: IWindow = null;
        let _loc4_: IWindowContainer = asGuarded(this._widget.getXmlWindow("camera_filterbutton"), isIWindowContainer);
        if (param3 >= param1._SafeStr_5906) {
            _loc7_ = asGuarded(_loc4_.findChildByName("content"), isIBitmapWrapperWindow);
            _loc7_.bitmap = new BitmapData(_loc7_.width, _loc7_.height, true, 0);
            _loc5_ = _loc7_.width / param2.width;
            _loc8_ = new Matrix();
            _loc8_.scale(_loc5_, _loc5_);
            _loc9_ = new Bitmap(param2, "auto", true);
            switch (param1.type) {
                case "colormatrix":
                    param2.applyFilter(param2, param2.rect, new Point(0, 0), param1.getColorMatrixFilter(true));
                    break;
                case "composite":
                    if (CameraFxPreloader.getImage(param1.name) == null) {
                        return null;
                    }
                    param2.draw(CameraFxPreloader.getImage(param1.name), null, null, param1.blendmode, null, true);
                    break;
                case "frame":
                    if (CameraFxPreloader.getImage(param1.name) == null) {
                        return null;
                    }
                    param2.draw(CameraFxPreloader.getImage(param1.name), null, null, null, null, true);
            }
            _loc7_.bitmap.draw(_loc9_, _loc8_, null, null, null, true);
            _loc4_.procedure = this.effectButtonClick;
        } else {
            _loc6_ = asGuarded(_loc4_.findChildByName("lock_indicator"), isIWindow);
            _loc6_.visible = true;
        }
        _loc4_.name = param1.name;
        param1.button = _loc4_;
        this._SafeStr_2542[_loc4_.name] = param1;
        return _loc4_;
    }

    private effectButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: CameraEffect = null;
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name == "remove_effect_button") {
            if (this._SafeStr_2542.hasKey(param2.parent.name)) {
                _loc3_ = this._SafeStr_2542[param2.parent.name];
                _loc3_.setChosen(false);
                if (this._SafeStr_2442 == _loc3_) {
                    this._SafeStr_2779.disable();
                    this._SafeStr_2442 = null;
                }
                this.renderAllEffects();
                return;
            }
        }
        if (this._SafeStr_2542.hasKey(param2.name)) {
            this.setActiveEffect(this._SafeStr_2542[param2.name]);
        }
    };

    private captionProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WKE_KEY_DOWN") {
            if (castTo(param1, WindowKeyboardEvent).ctrlKey || castTo(param1, WindowKeyboardEvent).charCode == 0) {
                this._captionInputKeyEvents = 0;
            } else {
                this._captionInputKeyEvents = this._captionInputKeyEvents + 1;
            }
        } else if (param1.type == "WKE_KEY_UP") {
            this._captionInputKeyEvents = 0;
        } else if (param1.type == "WE_CHANGE") {
            if (this._captionInputKeyEvents == 1) {
                this._SafeStr_6960 = castGuarded(this._window.findChildByName("captionInput"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text;
            } else {
                this.setCaptionText(this._SafeStr_6960);
            }
            this._captionInputKeyEvents = 0;
        }
    };

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (this._disposed || !this._window || param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "cancel_button":
                this._widget.startTakingPhoto("effectEditorCancel");
                this.dispose();
                break;
            case "header_button_close":
                this.dispose();
                break;
            case "help_button":
                this._widget.component.context.createLinkEvent("habbopages/camera");
                break;
            case "save_button":
            case "slider_container":
                break;
            case "zoom_button":
                this._SafeStr_5333 = !this._SafeStr_5333;
                this.renderAllEffects();
                break;
            default:
                this._SafeStr_2779.disable();
                if (this._SafeStr_2442 != null) {
                    this._SafeStr_2442.turnOffHighlight();
                }
        }
        if (param2.name.indexOf("typebutton") != -1) {
            this.setFilterType(stringOrNull(param2.name.split(",")[1]));
        }
    };

    private setActiveEffect(param1: CameraEffect): void {
        if (this._SafeStr_2442 != null) {
            this._SafeStr_2442.turnOffHighlight();
        }
        this._SafeStr_2442 = param1;
        this._SafeStr_2442.setChosen(true);
        if (param1.usesEffectStrength()) {
            this._SafeStr_2779.enable();
            this._SafeStr_2779.setValue(param1.value);
            this.updateSliderEffectInfo();
        } else {
            this._SafeStr_2779.disable();
        }
        if (param1.allowsOnlyOneInstance()) {
            this.turnOffOtherEffectsOfSameType(param1);
        }
        this.renderAllEffects();
    }

    private turnOffOtherEffectsOfSameType(param1: CameraEffect): void {
        for (const _loc2_ of valuesOf(this._SafeStr_2542)) {
            if (_loc2_.type == param1.type && _loc2_ != param1) {
                _loc2_.setChosen(false);
            }
        }
    }

    private setFilterType(param1: string): void {
        if (this._SafeStr_2442 != null) {
            this._SafeStr_2442.turnOffHighlight();
        }
        this._itemGrid.removeGridItems();
        for (const _loc2_ of valuesOf(this._SafeStr_2542)) {
            if (_loc2_.type == param1) {
                this._itemGrid.addGridItem(_loc2_.button);
            }
        }
        this.highlightSelectedButtonType(param1);
    }

    private highlightSelectedButtonType(param1: string): void {
        let _loc3_: IWindow = null;
        for (const _loc2_ of valuesOf(this._SafeStr_4130)) {
            _loc3_ = _loc2_.findChildByName("active_border");
            _loc3_.visible = _loc2_.name == "typebutton," + param1;
        }
    }

    private renderAllEffects(): void {
        let _loc2_: ColorTransform = null;
        let _loc5_: Matrix = null;
        let _loc3_: BitmapData = null;
        let _loc1_: any = this._SafeStr_4538.clone();
        if (this._SafeStr_5333) {
            _loc5_ = new Matrix();
            _loc5_.a = 2;
            _loc5_.d = 2;
            _loc5_.tx = -_loc1_.width / 2;
            _loc5_.ty = -_loc1_.height / 2;
            _loc3_ = new BitmapData(_loc1_.width | 0, _loc1_.height | 0);
            _loc3_.draw(_loc1_, _loc5_);
            _loc1_ = _loc3_;
        }
        for (const _loc4_ of valuesOf(this._SafeStr_2542)) {
            if (_loc4_.isOn) {
                if (_loc4_.type == "colormatrix") {
                    _loc1_.applyFilter(_loc1_, _loc1_.rect, new Point(0, 0), _loc4_.getColorMatrixFilter());
                }
                if (_loc4_.type == "composite") {
                    _loc2_ = new ColorTransform(1, 1, 1, Number(_loc4_.getEffectStrength()));
                    _loc1_.draw(CameraFxPreloader.getImage(stringOrNull(_loc4_.name)), null, _loc2_, _loc4_.blendmode);
                }
            }
        }
        for (const _loc6_ of valuesOf(this._SafeStr_2542)) {
            if (_loc6_.isOn && _loc6_.type == "frame") {
                _loc1_.draw(CameraFxPreloader.getImage(stringOrNull(_loc6_.name)));
            }
        }
        this._SafeStr_2341.bitmap = _loc1_;
        this._SafeStr_2341.invalidate();
    }

    private openPurchaseConfirmationDialog = (param1: MouseEvent): void => {
        if (CameraPhotoLab._SafeStr_2369) {
            CameraPhotoLab._SafeStr_2369.hide();
        }
        if (this._widget.container.sessionDataManager.isAccountSafetyLocked()) {
            this._widget.windowManager.alert("${generic.alert.title}", "${notifications.text.safety_locked}", 0, null);
            if (this._widget.component.getProperty("camera.effects.enabled") != "true") {
                this.dispose();
            }
            return;
        }
        CameraPhotoLab._SafeStr_2369 = new PhotoPurchaseConfirmationDialog(this._widget, castGuarded(this._window.findChildByName("captionInput"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text);
        let _loc2_: boolean = this._widget.sendPhotoData();
        CameraPhotoLab._SafeStr_2369.setPrices(this._widget.handler.creditPrice, this._widget.handler.ducketPrice, this._widget.handler.publishDucketPrice);
        HabboTracking.getInstance().trackEventLog("Stories", "camera", "stories.photo.purchase_dialog_opened");
        if (!_loc2_) {
            CameraPhotoLab._SafeStr_2369.setRenderingFailed();
            this._widget.windowManager.alert("${generic.alert.title}", "${camera.alert.too_much_stuff}", 0, null);
        }
        this.hide();
    };

    private offerSaveAsFile = (param1: MouseEvent): void => {
        let _loc2_: DateTimeFormatter = null;
        let _loc4_: string = null;
        let _loc3_: BitmapData = this._SafeStr_2341.bitmap.clone();
        let _loc5_: ByteArray = PNGEncoder.encode(_loc3_);
        try {
            _loc2_ = new DateTimeFormatter("i-default");
            _loc2_.setDateTimePattern("yyyy-MM-dd_HH-mm-ss");
            _loc4_ = "Habbo_" + _loc2_.format(new Date()) + ".png";
            this._SafeStr_2883.save(_loc5_, _loc4_);
        } catch (error) {
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
