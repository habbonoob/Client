import { asGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetPetPackageUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPetPackageUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { RoomWidgetOpenPetPackageMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenPetPackageMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class PetPackageFurniWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.petpackage::PetPackageFurniWidget'); }

    private static readonly GNOME_SPECIES_TYPE_ID: number = 26;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
    }

    declare private _window: IFrameWindow;

    private _typeId: number = -1;
    private _objectId: number = -1;

    declare private _SafeStr_2892: BitmapData;

    private _SafeStr_3565: boolean = false;

    public override dispose(): void {
        this.hideInterface();
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWOPPUE_OPEN_PET_PACKAGE_REQUESTED", this.onObjectUpdate);
        param1.addEventListener("RWOPPUE_OPEN_PET_PACKAGE_RESULT", this.onObjectUpdate);
        param1.addEventListener("RWOPPUE_OPEN_PET_PACKAGE_UPDATE_PET_IMAGE", this.onObjectUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWOPPUE_OPEN_PET_PACKAGE_REQUESTED", this.onObjectUpdate);
        param1.removeEventListener("RWOPPUE_OPEN_PET_PACKAGE_RESULT", this.onObjectUpdate);
        param1.removeEventListener("RWOPPUE_OPEN_PET_PACKAGE_UPDATE_PET_IMAGE", this.onObjectUpdate);
        super.unregisterUpdateEvents(param1);
    }

    private constructErrorMessage(param1: string, param2: string): string {
        let _loc3_: string = "catalog.alert.petname." + param1;
        let _loc5_: string = _loc3_ + ".additionalInfo";
        this.localizations.registerParameter(_loc5_, "additional_info", param2);
        let _loc6_: any = this.localizations.getLocalization(_loc3_);
        let _loc4_: string = this.localizations.getLocalization(_loc5_);
        if (param2 != null && param2.length > 0 && _loc4_ != null && _loc4_.length > 0) {
            _loc6_ = _loc4_;
        }
        return stringOrNull(_loc6_);
    }

    private hideInterface(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._objectId = -1;
        this._SafeStr_3565 = false;
        this._SafeStr_2892 = null;
    }

    private showInterface(): void {
        let _loc2_: IWindow = null;
        if (this._objectId < 0) {
            return;
        }
        let _loc3_: IAsset = this._SafeStr_2892 != null ? this.assets.getAssetByName("petpackage") : this.assets.getAssetByName("petpackage_new");
        let _loc1_: XmlAsset = castTo(_loc3_, XmlAsset);
        if (_loc1_ == null) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._window = asGuarded(this.windowManager.buildFromXML(XML.from(_loc1_.content)), isIFrameWindow);
        this._window.center();
        let _loc4_: IWindow = this._window.header.findChildByTag("close");
        if (_loc4_) {
            _loc4_.addEventListener("WME_CLICK", this.onWindowClose);
        }
        _loc2_ = this._window.findChildByName("pick_name");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc2_ = this._window.findChildByName("cancel");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        this._window.addEventListener("WME_CLICK", this.onMouseEvent);
        this.showPetImage();
    }

    private showPetImage(): void {
        let _loc2_: Point = null;
        if (this._SafeStr_2892 == null || this._window == null) {
            return;
        }
        let _loc1_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("pet_image"), isIBitmapWrapperWindow);
        if (_loc1_ != null) {
            _loc1_.bitmap = new BitmapData(_loc1_.width, _loc1_.height, true, 0);
            _loc2_ = new Point((_loc1_.width - this._SafeStr_2892.width) / 2, (_loc1_.height - this._SafeStr_2892.height) / 2);
            _loc1_.bitmap.copyPixels(this._SafeStr_2892, this._SafeStr_2892.rect, _loc2_);
        }
    }

    private onWindowClose = (param1: WindowEvent): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideInterface();
    };

    private onMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc3_: string = _loc2_.name;
        switch (_loc3_) {
            case "pick_name":
                this.sendOpenPetPackage();
                break;
            case "cancel":
                this.hideInterface();
        }
    };

    private sendOpenPetPackage(): void {
        let name: string;
        let message: RoomWidgetOpenPetPackageMessage;
        if (this._SafeStr_3565 || this._objectId == -1) {
            return;
        }
        name = this.getName();
        if (name == null || name.length < 1) {
            this.windowManager.alert("${widgets.petpackage.alert.petname.title}", "${catalog.alert.petname.short}", 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                    param1.dispose();
                });
            return;
        }
        if (this.messageListener != null) {
            this._SafeStr_3565 = true;
            message = new RoomWidgetOpenPetPackageMessage("RWOPPM_OPEN_PET_PACKAGE", this._objectId, name);
            this.messageListener.processWidgetMessage(message);
        }
    }

    private getName(): string {
        let _loc1_: ITextFieldWindow = null;
        if (this._window) {
            _loc1_ = asGuarded(this._window.findChildByName("input"), isITextFieldWindow);
            if (_loc1_) {
                return _loc1_.text;
            }
        }
        return null;
    }

    private onObjectUpdate = (param1: RoomWidgetPetPackageUpdateEvent): void => {
        let nameValidationStatus: number = 0;
        let nameValidationInfo: string;
        let error: string;
        let resultMessage: string;
        let event: RoomWidgetPetPackageUpdateEvent = param1;
        switch (event.type) {
            case "RWOPPUE_OPEN_PET_PACKAGE_REQUESTED":
                this.hideInterface();
                this._objectId = event.objectId;
                this._SafeStr_2892 = event.image;
                this._typeId = event.typeId;
                this.showInterface();
                this.showPetImage();
                break;
            case "RWOPPUE_OPEN_PET_PACKAGE_RESULT":
                if (!this._SafeStr_3565) {
                    return;
                }
                this._SafeStr_3565 = false;
                nameValidationStatus = event.nameValidationStatus;
                nameValidationInfo = event.nameValidationInfo;
                switch (nameValidationStatus) {
                    case 0:
                        this.hideInterface();
                        return;
                    case 1:
                        error = "long";
                        break;
                    case 2:
                        error = "short";
                        break;
                    case 3:
                        error = "chars";
                        break;
                    default:
                        error = "bobba";
                }
                resultMessage = this.constructErrorMessage(error, nameValidationInfo);
                this.windowManager.alert("${widgets.petpackage.alert.petname.title}", resultMessage, 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                        param1.dispose();
                    });
                break;
            case "RWOPPUE_OPEN_PET_PACKAGE_UPDATE_PET_IMAGE":
                if (event.objectId != this._objectId) {
                    return;
                }
                this._SafeStr_2892 = event.image;
                this.showPetImage();
        }
    };
}
