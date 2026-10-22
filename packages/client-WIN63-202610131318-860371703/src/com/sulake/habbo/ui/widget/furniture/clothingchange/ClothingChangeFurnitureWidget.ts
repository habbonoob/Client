import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetClothingChangeUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetClothingChangeUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomWidgetClothingChangeMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetClothingChangeMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class ClothingChangeFurnitureWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.clothingchange::ClothingChangeFurnitureWidget'); }

    private static readonly _SafeStr_7829: string = "Boy";
    private static readonly _SafeStr_8720: string = "Girl";

    declare private _SafeStr_2946: IWindowContainer;

    private _objectId: number = 0;
    private _objectCategory: number = 0;
    private _roomId: number = 0;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
    }

    public override dispose(): void {
        this.hideGenderSelectionInterface();
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWCCUE_SHOW_GENDER_SELECTION", this.onUpdate);
        param1.addEventListener("RWCCUE_SHOW_CLOTHING_EDITOR", this.onUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWCCUE_SHOW_GENDER_SELECTION", this.onUpdate);
        param1.removeEventListener("RWCCUE_SHOW_CLOTHING_EDITOR", this.onUpdate);
    }

    private onUpdate = (param1: RoomWidgetClothingChangeUpdateEvent): void => {
        let _loc2_: any = param1.type;
        if ("RWCCUE_SHOW_GENDER_SELECTION" === _loc2_) {
            this.showGenderSelectionInterface(param1);
        }
    };

    private showGenderSelectionInterface(param1: RoomWidgetClothingChangeUpdateEvent): void {
        this.hideGenderSelectionInterface();
        this._objectId = param1.objectId;
        this._objectCategory = param1.objectCategory;
        this._roomId = param1.roomId;
        let _loc4_: IAsset = this.assets.getAssetByName("boygirl");
        let _loc2_: XmlAsset = castTo(_loc4_, XmlAsset);
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_2946 = asGuarded(this.windowManager.createWindow("clothing change gender selection", "", 4, 0, (0x8000 | 1 | 0x020000 | 1) >>> 0, new Rectangle(100, 100, 200, 200), null, 0), isIWindowContainer);
        this._SafeStr_2946.buildFromXML(XML.from(_loc2_.content));
        this._SafeStr_2946.addEventListener("WME_CLICK", this.onGenderSelectionMouseEvent);
        this._SafeStr_2946.center();
        let _loc3_: IWindow = this._SafeStr_2946.findChildByTag("close");
        if (_loc3_ != null) {
            _loc3_.procedure = this.onGenderSelectionWindowClose;
        }
        _loc3_ = this._SafeStr_2946.findChildByName("Boy");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onGenderSelectionMouseEvent);
        }
        _loc3_ = this._SafeStr_2946.findChildByName("Girl");
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", this.onGenderSelectionMouseEvent);
        }
    }

    private hideGenderSelectionInterface(): void {
        if (this._SafeStr_2946 != null) {
            this._SafeStr_2946.dispose();
            this._SafeStr_2946 = null;
        }
    }

    private onGenderSelectionWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideGenderSelectionInterface();
    };

    private onGenderSelectionMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "Boy":
                this.requestEditor("M");
                this.hideGenderSelectionInterface();
                break;
            case "Girl":
                this.requestEditor("F");
                this.hideGenderSelectionInterface();
                break;
            case "close":
            case "close_btn":
                this.hideGenderSelectionInterface();
        }
    };

    private requestEditor(param1: string): void {
        let _loc2_: RoomWidgetClothingChangeMessage = new RoomWidgetClothingChangeMessage("RWCCM_REQUEST_EDITOR", param1, this._objectId, this._objectCategory, this._roomId);
        this.messageListener.processWidgetMessage(_loc2_);
    }
}
