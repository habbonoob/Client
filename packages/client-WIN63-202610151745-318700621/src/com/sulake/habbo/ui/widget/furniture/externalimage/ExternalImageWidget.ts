import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { ILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowLinkEvent } from '@/com/sulake/core/window/events/WindowLinkEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { HTTPStatusEvent } from '@habbo-pixi/runtime/events/HTTPStatusEvent';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { JSONDecoder } from '@habbo-pixi/runtime/json/JSONDecoder';
import { navigateToURL } from '@habbo-pixi/runtime/net/navigateToURL';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapFileLoader } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { ExternalImageWidgetHandler } from '@/com/sulake/habbo/ui/handler/ExternalImageWidgetHandler';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { AlertDialogCaption } from '@/com/sulake/habbo/window/utils/AlertDialogCaption';
import { isIIlluminaInputWidget } from '@/com/sulake/habbo/window/widgets/IIlluminaInputWidget';

export class ExternalImageWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.externalimage::ExternalImageWidget'); }

    private static readonly TYPE_PHOTO_POSTER: string = "photo_poster";
    private static readonly TYPE_SELFIE: string = "selfie";
    private static readonly TYPE_LEGACY: string = "legacy";
    private static readonly HORIZONTAL_ITEM_SPACING: number = 10;
    private static readonly VERTICAL_SPACE: number = 71;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2265: IBitmapWrapperWindow;

    declare private _moderationText: IHTMLTextWindow;

    declare private _makeOwnButton: IWindow;

    declare private _SafeStr_2511: IWindow;

    declare private _SafeStr_4620: IWindowContainer;

    declare private _bgBorder: IWindow;

    declare private _buttonContainer: IWindowContainer;

    declare private _shareArea: IWindowContainer;

    declare private _shareButton: IWindow;

    declare private _senderNameButton: IRegionWindow;

    declare private _senderNameText: ILabelWindow;

    declare private _SafeStr_3532: TextField;

    declare private _creationDateText: ILabelWindow;

    declare private _SafeStr_4099: BitmapFileLoader;

    declare private _SafeStr_5275: Bitmap;

    declare private _inventory: IHabboInventory;

    declare private _SafeStr_3682: number;
    static { (this.prototype as any)._SafeStr_3682 = 0; }

    declare private _SafeStr_3699: string;

    declare private _caption: string;

    declare private _senderId: number;
    static { (this.prototype as any)._senderId = 0; }

    declare private _SafeStr_3157: string;

    declare private _SafeStr_4821: IWindowContainer;

    declare private _SafeStr_3312: string;

    declare private _SafeStr_8491: IBitmapWrapperWindow;

    declare private _habboHelp: IHabboHelp;

    declare private _roomEngine: IRoomEngine;

    declare private reportWindow: IWindowContainer;

    private _SafeStr_2512: number = 0;
    private _SafeStr_5225: boolean = false;

    declare private _component: Component;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: IHabboInventory, param6: IHabboHelp, param7: IRoomEngine, param8: Component) {
        let _loc9_: IDisplayObjectWrapper = null;
        super(param1, param2, param3, param4);
        this._window = asGuarded(param2.buildFromXML(asInstanceOf(param3.getAssetByName("stories_image_widget_xml").content, XML)), isIWindowContainer);
        this.ownHandler.widget = this;
        this._SafeStr_2511 = asGuarded(this._window.findChildByName("closebutton"), isIWindow);
        this._SafeStr_2265 = asGuarded(this._window.findChildByName("imageLoader"), isIBitmapWrapperWindow);
        this._moderationText = asGuarded(this._window.findChildByName("moderationText"), isIHTMLTextWindow);
        this._moderationText.addEventListener("WE_LINK", this.onClickModerationInfoLink);
        this._shareArea = asGuarded(this._window.findChildByName("shareArea"), isIWindowContainer);
        this._SafeStr_4620 = asGuarded(this._window.findChildByName("removeButtonContainer"), isIWindowContainer);
        this._makeOwnButton = asGuarded(this._window.findChildByName("makeOwnButton"), isIWindow);
        this._shareButton = asGuarded(this._window.findChildByName("shareButtonContainer"), isIWindow);
        this._bgBorder = asGuarded(this._window.findChildByName("bgBorder"), isIWindow);
        this._senderNameButton = asGuarded(this._window.findChildByName("senderNameButton"), isIRegionWindow);
        this._senderNameText = asGuarded(this._window.findChildByName("senderName"), isILabelWindow);
        this._SafeStr_3532 = new TextField();
        if (this.ownHandler.container.roomSession.roomControllerLevel == 5) {
            _loc9_ = asGuarded(this._window.findChildByName("name_copy_wrapper"), isIDisplayObjectWrapper);
            this._SafeStr_3532.textColor = 10061943;
            this._SafeStr_3532.text = "";
            _loc9_.setDisplayObject(this._SafeStr_3532);
        }
        this._creationDateText = asGuarded(this._window.findChildByName("creationDate"), isILabelWindow);
        this._buttonContainer = asGuarded(this._window.findChildByName("buttonContainer"), isIWindowContainer);
        this._inventory = param5;
        this._habboHelp = param6;
        this._roomEngine = param7;
        this._SafeStr_4821 = asGuarded(this._window.findChildByName("reportButtonContainer"), isIWindowContainer);
        this._window.procedure = this.onWindowEvent;
        this._window.center();
        this._shareArea.visible = false;
        this._component = param8;
        this.hide();
    }

    private get ownHandler(): ExternalImageWidgetHandler {
        return this._SafeStr_2143 instanceof ExternalImageWidgetHandler ? this._SafeStr_2143 : null;
    }

    public showWithRoomObject(param1: IRoomObject): void {
        this._SafeStr_3682 = param1.getId();
        this._SafeStr_3312 = param1.getType();
        this._SafeStr_5225 = false;
        this._SafeStr_4620.visible = this.ownHandler.hasRightsToRemove();
        if (this.getType() == "photo_poster") {
            this._SafeStr_4821.visible = true;
        } else {
            this._SafeStr_4821.visible = this.ownHandler.isSelfieReportingEnabled();
        }
        this.show(param1.getModel().getString("furniture_data"));
        let _loc2_: IRoomObject[] = this.getWallItemsOfCurrentTypeInRoom();
        if (_loc2_.indexOf(param1) != -1) {
            this._SafeStr_2512 = _loc2_.indexOf(param1);
        }
    }

    public showWithFurniID(param1: number): void {
        let _loc2_: IFurnitureItem = this._inventory.getWallItemById(param1);
        if (_loc2_) {
            this._SafeStr_3682 = param1;
            this._SafeStr_3312 = this._roomEngine.getWallItemType(_loc2_.type);
            this._SafeStr_5225 = true;
            this._SafeStr_4620.visible = false;
            this._SafeStr_4821.visible = false;
            this.show(_loc2_.stuffData.getLegacyString());
        }
    }

    private show(param1: string): void {
        if (this.ownHandler.storiesImageUrlBase == "disabled") {
            return;
        }
        this.clearImage();
        if (param1 != null) {
            this.readFurniJson(param1);
        }
    }

    private showNext(): void {
        let _loc1_: IRoomObject[] = this.getWallItemsOfCurrentTypeInRoom();
        if (_loc1_.length > 0) {
            this._SafeStr_2512 = this._SafeStr_2512 + 1;
            if (this._SafeStr_2512 > _loc1_.length - 1) {
                this._SafeStr_2512 = 0;
            }
            this.showWithRoomObject(_loc1_[this._SafeStr_2512]);
        }
    }

    private showPrevious(): void {
        let _loc1_: IRoomObject[] = this.getWallItemsOfCurrentTypeInRoom();
        if (_loc1_.length > 0) {
            this._SafeStr_2512 = this._SafeStr_2512 - 1;
            if (this._SafeStr_2512 < 0) {
                this._SafeStr_2512 = _loc1_.length - 1;
            }
            this.showWithRoomObject(_loc1_[this._SafeStr_2512]);
        }
    }

    private getWallItemsOfCurrentTypeInRoom(): IRoomObject[] {
        let _loc2_: IRoomObject[] = [];
        let _loc3_: any[] = this._roomEngine.getObjectsByCategory(20);
        for (const _loc1_ of _loc3_ ?? []) {
            if (_loc1_.getType() == this._SafeStr_3312) {
                _loc2_.push(_loc1_);
            }
        }
        return _loc2_;
    }

    private clearImage(): void {
        this._SafeStr_3699 = null;
        this._caption = "";
        let _loc1_: ITextWindow = asGuarded(this._window.findChildByName("captionText"), isITextWindow);
        _loc1_.text = "";
        this._senderNameButton.visible = false;
        this._senderId = 0;
        this._senderNameText.caption = "";
        this._SafeStr_3532.text = "";
        this._creationDateText.caption = "";
        this._SafeStr_3157 = null;
        this._moderationText.visible = false;
        this.drawImage(new Bitmap(new BitmapData(this._SafeStr_2265.width - 2, this._SafeStr_2265.height - 2, false, 0)));
    }

    private readFurniJson(param1: string): void {
        try {
            this._SafeStr_3699 = stringOrNull(new JSONDecoder(param1, false).getValue().id);
            if (this._SafeStr_3699) {
                this.loadExternalData();
                return;
            }
            this.loadPhoto(param1, this.getImageUrl(new JSONDecoder(param1, false).getValue()));
        } catch (error) {
        }
    }

    private getImageUrl(param1: any): string {
        let _loc3_: string = null;
        let _loc2_: string = this.getJsonValue(param1, "w", "url");
        if (_loc2_.indexOf("http") != 0) {
            _loc3_ = "postcards/selfie/";
            if (this.getType() == "photo_poster") {
                _loc3_ = "";
            }
            if (_loc2_.indexOf(".png") == -1) {
                _loc2_ += ".png";
            }
            _loc2_ = this.ownHandler.storiesImageUrlBase + _loc3_ + _loc2_;
        }
        return _loc2_;
    }

    private loadPhoto(param1: string, param2: string): void {
        let _loc8_: any = null;
        let _loc3_: IWindow = null;
        let _loc10_: string = null;
        let _loc7_: ITextWindow = null;
        try {
            _loc8_ = new JSONDecoder(param1, false).getValue();
        } catch (error) {
            return;
        }
        if (!param2) {
            param2 = this.getImageUrl(_loc8_);
        }
        this._SafeStr_4099 = new BitmapFileLoader("image/png", new URLRequest(param2));
        this._SafeStr_4099.addEventListener("AssetLoaderEventComplete", this.onImageLoaded);
        let _loc4_: string = this.getJsonValue(_loc8_, "n", "creator_name");
        let _loc5_: string = this.getJsonValue(_loc8_, "s", "creator_id");
        let _loc11_: string = this.getJsonValue(_loc8_, "u", "unique_id");
        let _loc6_: string = this.getJsonValue(_loc8_, "t", "time");
        let _loc9_: Date = new Date(Number(_loc6_));
        if (_loc4_) {
            this._senderNameText.caption = _loc4_;
            this._senderNameButton.visible = true;
            this._SafeStr_3532.text = _loc4_;
            this._senderId = Number(_loc5_) | 0;
            this._creationDateText.caption = _loc9_.getDate() + "-" + (_loc9_.getMonth() + 1) + "-" + _loc9_.getFullYear();
        }
        if (this.ownHandler.storiesImageShareUrl && this.ownHandler.storiesImageShareUrl.length > 4) {
            _loc3_ = asGuarded(this._window.findChildByName("urlField"), isIWindow);
            _loc10_ = this.ownHandler.storiesImageShareUrl.replace("%id%", _loc11_);
            _loc3_.caption = _loc10_;
            this._SafeStr_3157 = _loc10_;
        }
        this._caption = this.getJsonValue(_loc8_, "m", "caption");
        if (this._caption) {
            _loc7_ = asGuarded(this._window.findChildByName("captionText"), isITextWindow);
            _loc7_.text = this._caption;
        }
    }

    private getJsonValue(param1: any, param2: string, param3: string = null): string {
        let _loc4_: string = null;
        _loc4_ = stringOrNull(param1[param2]);
        if (!_loc4_ && param3) {
            _loc4_ = stringOrNull(param1[param3]);
        }
        return _loc4_;
    }

    private onImageLoaded = (param1: AssetLoaderEvent): void => {
        let _loc2_: Bitmap = null;
        if (this._SafeStr_4099) {
            _loc2_ = asInstanceOf(this._SafeStr_4099.content, Bitmap);
            if (_loc2_) {
                this._SafeStr_2265.width = _loc2_.width + 2 | 0;
                this._SafeStr_2265.height = _loc2_.height + 2 | 0;
                this.drawImage(_loc2_);
            }
        }
    };

    private drawImage(param1: Bitmap): void {
        this._SafeStr_5275 = param1;
        this._SafeStr_2265.bitmap = new BitmapData(this._SafeStr_2265.width, this._SafeStr_2265.height, true, 0);
        this._window.visible = true;
        let _loc3_: IWindow = this._window.findChildByName("previousButton");
        let _loc2_: IWindow = this._window.findChildByName("nextButton");
        _loc3_.x = 10;
        this._bgBorder.y = this._bgBorder.x = 0;
        this._SafeStr_2265.x = 10 * 2 + _loc3_.width;
        this._SafeStr_2265.y = 71;
        this._bgBorder.height = this._window.height = this._SafeStr_2265.height + 71 * 2;
        this._bgBorder.width = this._window.width = this._SafeStr_2265.width + 10 * 4 + _loc3_.width * 2;
        this._senderNameButton.x = this._SafeStr_2265.right - this._senderNameButton.width - 3;
        this._senderNameButton.y = this._SafeStr_2265.bottom + 3;
        this._creationDateText.x = this._SafeStr_2265.x + 3;
        this._creationDateText.y = this._senderNameButton.y = this._SafeStr_2265.bottom;
        this._buttonContainer.y = 0;
        this._buttonContainer.x = this._bgBorder.right - this._buttonContainer.width;
        _loc2_.x = this._SafeStr_2265.right + 10;
        if (this._SafeStr_5225) {
            _loc2_.visible = _loc3_.visible = false;
        } else {
            _loc2_.visible = _loc3_.visible = this.getWallItemsOfCurrentTypeInRoom().length > 1;
        }
        let _loc4_: Matrix = new Matrix();
        let _loc5_: ColorTransform = new ColorTransform();
        _loc5_.color = 0;
        _loc4_.ty += 1;
        this._SafeStr_2265.bitmap.draw(param1, _loc4_, _loc5_);
        _loc4_.tx += 1;
        _loc4_.ty -= 1;
        this._SafeStr_2265.bitmap.draw(param1, _loc4_, _loc5_);
        _loc4_.ty += 2;
        this._SafeStr_2265.bitmap.draw(param1, _loc4_, _loc5_);
        _loc4_.ty -= 1;
        _loc4_.tx += 1;
        this._SafeStr_2265.bitmap.draw(param1, _loc4_, _loc5_);
        _loc4_.tx -= 1;
        this._SafeStr_2265.bitmap.draw(param1, _loc4_);
        this._window.activate();
        this.updateWindowPosition();
    }

    private loadExternalData(): void {
        let _loc2_: string = this.ownHandler.extraDataServiceUrl + this._SafeStr_3699;
        let _loc1_: URLLoader = new URLLoader(new URLRequest(_loc2_));
        _loc1_.addEventListener("httpStatus", this.onExternalDataHttpStatus);
        _loc1_.addEventListener("complete", this.onExternalDataLoaded);
        _loc1_.addEventListener("ioError", this.onExternalDataError);
    }

    private onExternalDataHttpStatus = (param1: HTTPStatusEvent): void => {
        if (param1.status == 403 && this.ownHandler.hasRightsToRemove()) {
            this._moderationText.visible = true;
        }
    };

    private onExternalDataError = (param1: Event): void => {
        if (!this._moderationText.visible) {
            Logger.log("Extra data loading failed: " + param1.toString());
        }
    };

    private onExternalDataLoaded = (param1: Event): void => {
        let _loc2_: string = stringOrNull(castTo(param1.target, URLLoader).data);
        if (_loc2_.length == 0) {
            return;
        }
        this.loadPhoto(_loc2_, null);
    };

    public override dispose(): void {
        if (!this._window) {
            return;
        }
        this._SafeStr_2265 = null;
        this._SafeStr_2511 = null;
        this._bgBorder = null;
        this._makeOwnButton = null;
        this._SafeStr_4620 = null;
        this._SafeStr_4099 = null;
        this._inventory = null;
        this._habboHelp = null;
        this._roomEngine = null;
        this._senderId = 0;
        this._senderNameButton = null;
        this._SafeStr_3532 = null;
        this._buttonContainer = null;
        this._shareArea = null;
        this._window.procedure = null;
        this._window.dispose();
        this._component = null;
        super.dispose();
        if (this.reportWindow) {
            this.reportWindow.destroy();
        }
    }

    public hide(): void {
        this._window.visible = false;
    }

    private updateWindowPosition(): void {
        if (!this._SafeStr_5275) {
            this._window.center();
            return;
        }
        let _loc5_: Stage = this._component.context.displayObjectContainer.stage;
        let _loc1_: number = (_loc5_.stageWidth - 100) / this._SafeStr_5275.width;
        let _loc3_: number = (_loc5_.stageHeight - 200) / this._SafeStr_5275.height;
        if (_loc1_ < 1) {
            this._window.x = 50;
        } else {
            this._window.x = (_loc5_.stageWidth - this._window.width) * 0.5 | 0;
        }
        if (_loc3_ < 1) {
            this._window.y = 50;
        } else {
            this._window.y = (_loc5_.stageHeight - this._window.height) * 0.5 | 0;
        }
        let _loc4_: IWindow = this._window.findChildByName("previousButton");
        let _loc2_: IWindow = this._window.findChildByName("nextButton");
        let _loc6_: number = this._component.context.displayObjectContainer.stage.stageHeight;
        if (this._bgBorder.height > _loc6_) {
            _loc4_.y = _loc2_.y = _loc6_ / 2 - _loc4_.height / 2 | 0;
        } else {
            _loc4_.y = _loc2_.y = this._bgBorder.height / 2 - _loc4_.height / 2 | 0;
        }
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IConfirmDialog = null;
        let _loc4_: HabboToolbarEvent = null;
        let _loc5_: ITextFieldWindow = null;
        if (param2 == this._window) {
            let _loc6_: string = param1.type;
            if ("WE_PARENT_RESIZED" === _loc6_) {
                this.updateWindowPosition();
            }
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "closebutton":
                this.hide();
                break;
            case "removebutton":
                _loc3_ = this.windowManager.confirm(this._SafeStr_2259.getLocalization("inventory.remove.external_image_wallitem_header"), this._SafeStr_2259.getLocalization("inventory.remove.external_image_wallitem_body"), 0, this.onDeleteConfirm);
                _loc3_.setButtonCaption(16, new AlertDialogCaption(this._SafeStr_2259.getLocalization("inventory.remove.external_image_wallitem_delete"), "", true));
                break;
            case "makeOwnButton":
                if (this.getType() == "photo_poster") {
                    _loc4_ = new HabboToolbarEvent("HTE_ICON_CAMERA");
                    _loc4_.iconName = "imageWidgetMakeOwn";
                    this.ownHandler.container.toolbar.events.dispatchEvent(_loc4_);
                    this.hide();
                } else if (this._component.getInteger("spaweb", 0) == 1) {
                    HabboWebTools.openPage("/stories/cards/selfie/edit");
                } else {
                    this._component.context.createLinkEvent("games/play/elisa_habbo_stories?ref=btn_selfie_myo");
                }
                break;
            case "shareButton":
                this._shareArea.visible = true;
                HabboTracking.getInstance().trackEventLog("Stories", "shareopened", "stories.share.clicked", this._SafeStr_3312);
                break;
            case "twitterShare":
                navigateToURL(new URLRequest("http://www.twitter.com/share?url=" + this._SafeStr_3157), "_blank");
                HabboTracking.getInstance().trackEventLog("Stories", "twitter", "stories.share.clicked", this._SafeStr_3312);
                break;
            case "fbShare":
                navigateToURL(new URLRequest("https://www.facebook.com/sharer/sharer.php?u=" + this._SafeStr_3157), "_blank");
                HabboTracking.getInstance().trackEventLog("Stories", "facebook", "stories.share.clicked", this._SafeStr_3312);
                break;
            case "senderNameButton":
                this.ownHandler.sendMessage(new GetExtendedProfileMessageComposer(this._senderId));
                break;
            case "urlField":
                _loc5_ = asGuarded(this._window.findChildByName("urlField"), isITextFieldWindow);
                _loc5_.setSelection(0, _loc5_.length);
                HabboTracking.getInstance().trackEventLog("Stories", "fieldselected", "stories.share.clicked", this._SafeStr_3312);
                break;
            case "reportButton":
                this.openReportImage();
                break;
            case "nextButton":
                this.showNext();
                break;
            case "previousButton":
                this.showPrevious();
        }
    };

    private onClickModerationInfoLink = (param1: WindowLinkEvent): void => {
        if (param1 != null && !StringUtil.isBlank(param1.link)) {
            navigateToURL(new URLRequest(param1.link), "_blank");
        }
    };

    private openReportImage(): void {
        this._habboHelp.startPhotoReportingInNewCfhFlow(this._senderId, this._senderNameText.caption, this._SafeStr_3699, this._SafeStr_3682);
    }

    private getType(): string {
        switch (this._SafeStr_3312) {
            case "external_image_wallitem_poster":
            case "external_image_wallitem_poster_small":
                break;
            case "external_image_wallitem":
                return "selfie";
            default:
                return "legacy";
        }
        return "photo_poster";
    }

    private onReportWindowEvent(param1: WindowEvent, param2: IWindow): void {
        let _loc3_: number = 0;
        let _loc9_: IWindow = null;
        let _loc8_: ISelectableWindow = null;
        let _loc6_: string = null;
        let _loc4_: IWindow = null;
        let _loc7_: IIlluminaInputWidget = null;
        let _loc5_: boolean = false;
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "header_button_close":
                this.reportWindow.destroy();
                break;
            case "report_confirm":
                _loc3_ = 0;
                _loc9_ = this.reportWindow.findChildByName("reporting_reason");
                if (_loc9_ != null) {
                    _loc8_ = castGuarded(_loc9_, isISelectorWindow, "com.sulake.core.window.components.ISelectorWindow").getSelected();
                    if (_loc8_ != null) {
                        _loc3_ = Number(_loc8_.name) | 0;
                    }
                }
                _loc6_ = null;
                _loc4_ = this.reportWindow.findChildByName("input_widget");
                if (_loc4_ != null) {
                    _loc7_ = asGuarded((isIWidgetWindow(_loc4_) ? _loc4_ : null).widget, isIIlluminaInputWidget);
                    _loc6_ = _loc7_.message;
                }
                if (!this._SafeStr_3157) {
                    this._SafeStr_3157 = "url not available";
                }
                if (this.getType() == "photo_poster") {
                    _loc5_ = this._habboHelp.reportPhoto(this._SafeStr_3699, _loc3_, this._roomEngine.activeRoomId, this._senderId, this._SafeStr_3682);
                } else {
                    _loc5_ = this._habboHelp.reportSelfie(this._SafeStr_3157, _loc6_, this._roomEngine.activeRoomId, this._senderId, this._SafeStr_3682);
                }
                if (_loc5_) {
                    this.reportWindow.destroy();
                }
        }
    }

    private onDeleteConfirm = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this.ownHandler.deleteCard(this._SafeStr_3682);
        }
    };

    public override release(): void {
        this.hide();
        super.release();
    }
}
