import { asGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetEcotronBoxDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetEcotronBoxDataUpdateEvent';
import type { RoomWidgetPresentDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPresentDataUpdateEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetEcotronBoxOpenMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetEcotronBoxOpenMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class EcotronBoxFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.ecotronbox::EcotronBoxFurniWidget'); }

    private static readonly _SafeStr_7717: number = 100;
    private static readonly _SafeStr_8215: number = 100;

    declare private _window: IWindowContainer;

    private _objectId: number = -1;

    declare private _text: string;

    declare private _controller: boolean;
    static { (this.prototype as any)._controller = false; }

    private _SafeStr_2538: boolean = false;
    private _furniTypeName: string = "ecotron_box";
    private _interfaceMapByFurniTypeName: UtilsMap = new UtilsMap();

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._interfaceMapByFurniTypeName.add("", "ecotronbox_card");
        this._interfaceMapByFurniTypeName.add("ecotron_box", "ecotronbox_card");
        this._interfaceMapByFurniTypeName.add("matic_box", "ecotronbox_card_furnimatic");
    }

    public override dispose(): void {
        this.hideInterface();
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWEBDUE_PACKAGEINFO", this.onObjectUpdate);
        param1.addEventListener("RWEBDUE_CONTENTS", this.onObjectUpdate);
        param1.addEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectRemoved);
        param1.addEventListener("RWPDUE_PACKAGEINFO", this.onPresentUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWEBDUE_PACKAGEINFO", this.onObjectUpdate);
        param1.removeEventListener("RWEBDUE_CONTENTS", this.onObjectUpdate);
        param1.removeEventListener("RWPDUE_PACKAGEINFO", this.onPresentUpdate);
        param1.removeEventListener("RWROUE_FURNI_REMOVED", this.onRoomObjectRemoved);
    }

    private onObjectUpdate = (param1: RoomWidgetEcotronBoxDataUpdateEvent): void => {
        this.hideInterface();
        switch (param1.type) {
            case "RWEBDUE_PACKAGEINFO":
                this._SafeStr_2538 = false;
                this._objectId = param1.objectId;
                this._text = param1.text;
                this._controller = param1.controller;
                this._furniTypeName = param1.furniTypeName;
                this.showInterface();
                break;
            case "RWEBDUE_CONTENTS":
                if (!this._SafeStr_2538) {
                    return;
                }
                this._objectId = param1.objectId;
                this.showInterface();
                this.showIcon(param1.iconBitmapData);
                this.showDescription(param1.text);
                this.setOpenButton(false);
        }
    };

    private onRoomObjectRemoved = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        if (param1.id == this._objectId) {
            this.hideInterface();
        }
    };

    private onPresentUpdate = (param1: RoomWidgetPresentDataUpdateEvent): void => {
        let _loc2_: string = param1.type;
        if ("RWPDUE_PACKAGEINFO" === _loc2_) {
            this.hideInterface();
        }
    };

    private showIcon(param1: BitmapData): void {
        if (param1 == null) {
            param1 = new BitmapData(1, 1);
        }
        if (this._window == null) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("ecotronbox_card_preview"), isIBitmapWrapperWindow);
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: number = (_loc4_.width - param1.width) / 2 | 0;
        let _loc3_: number = (_loc4_.height - param1.height) / 2 | 0;
        if (_loc4_.bitmap == null) {
            _loc4_.bitmap = new BitmapData(_loc4_.width, _loc4_.height, true, 16777215);
        }
        _loc4_.bitmap.fillRect(_loc4_.bitmap.rect, 16777215);
        _loc4_.bitmap.copyPixels(param1, param1.rect, new Point(_loc2_, _loc3_), null, null, false);
    }

    private showDescription(param1: string): void {
        let _loc2_: ITextWindow = null;
        _loc2_ = asGuarded(this._window.findChildByName("ecotronbox_card_msg"), isITextWindow);
        if (_loc2_ != null && param1 != null) {
            _loc2_.caption = param1;
        }
    }

    private showInterface(): void {
        let _loc3_: ITextWindow = null;
        let _loc2_: IWindow = null;
        if (this._objectId < 0) {
            return;
        }
        let _loc4_: IAsset = this.assets.getAssetByName(stringOrNull(this._interfaceMapByFurniTypeName.getValue(this._furniTypeName)));
        let _loc1_: XmlAsset = castTo(_loc4_, XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._window = asGuarded(this.windowManager.createWindow("ecotronboxcardui_container", "", 4, 0, (0x020000 | 1) >>> 0, new Rectangle(100, 100, 2, 2), null, 0), isIWindowContainer);
        this._window.buildFromXML(XML.from(_loc1_.content));
        _loc3_ = asGuarded(this._window.findChildByName("ecotronbox_card_date"), isITextWindow);
        if (_loc3_ != null && this._text != null) {
            _loc3_.caption = this._text;
        }
        _loc2_ = this._window.findChildByName("ecotronbox_card_btn_close");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        this.setOpenButton(true);
    }

    private setOpenButton(param1: boolean): void {
        let _loc2_: IWindow = null;
        if (this._window == null) {
            return;
        }
        _loc2_ = this._window.findChildByName("ecotronbox_card_btn_open");
        if (_loc2_ != null) {
            if (this._controller && param1) {
                _loc2_.visible = true;
                _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
            } else {
                _loc2_.visible = false;
            }
        }
    }

    private hideInterface(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (!this._SafeStr_2538) {
            this._objectId = -1;
        }
        this._text = "";
        this._controller = false;
    }

    private sendOpen(): void {
        let _loc1_: RoomWidgetEcotronBoxOpenMessage = null;
        if (this._SafeStr_2538 || this._objectId == -1 || !this._controller) {
            return;
        }
        this._SafeStr_2538 = true;
        if (this.messageListener != null) {
            _loc1_ = new RoomWidgetEcotronBoxOpenMessage("RWEBOM_OPEN_ECOTRONBOX", this._objectId);
            this.messageListener.processWidgetMessage(_loc1_);
        }
    }

    private onMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "ecotronbox_card_btn_open":
                this.sendOpen();
                break;
            case "ecotronbox_card_btn_close":
            default:
                this._SafeStr_2538 = false;
                this.hideInterface();
        }
    };
}
