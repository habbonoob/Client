import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { AvatarInfoWidgetHandler } from '@/com/sulake/habbo/ui/handler/AvatarInfoWidgetHandler';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { PetInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/PetInfoData';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetPetCommandMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPetCommandMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class OwnPetMenuView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::OwnPetMenuView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        OwnPetMenuView.#initStatics();
        return OwnPetMenuView._log;
    }

    private static readonly MODE_NORMAL: number = 0;
    private static readonly MODE_SADDLED_UP: number = 1;
    private static readonly MODE_RIDING: number = 2;
    private static readonly MODE_MONSTERPLANT: number = 3;

    public static setup_OwnPetMenuView(param1: OwnPetMenuView, param2: number, param3: string, param4: number, param5: number, param6: PetInfoData): void {
        param1._data = param6;
        let _loc7_: boolean = param1.widget.hasFreeSaddle;
        let _loc8_: boolean = param1.widget.isRiding;
        if (param1.widget.isMonsterPlant()) {
            param1._mode = 3;
        } else if (_loc7_ && !_loc8_) {
            param1._mode = 1;
        } else if (_loc8_) {
            param1._mode = 2;
        } else {
            param1._mode = 0;
        }
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    constructor(param1: AvatarInfoWidget, param2: IHabboCatalog) {
        super(param1);
        this._SafeStr_2318 = false;
        this._habboTracking = HabboTracking.getInstance();
        this._catalog = param2;
    }

    declare protected _catalog: IHabboCatalog;

    declare protected _habboTracking: IHabboTracking;

    declare private _data: PetInfoData;

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    declare private _SafeStr_3663: IFurnitureData;

    declare private _SafeStr_5492: IFurnitureData;

    public get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }

    public get petId(): number {
        return this.userId;
    }

    public override dispose(): void {
        this._data = null;
        this._SafeStr_3663 = null;
        this._SafeStr_5492 = null;
        this._catalog = null;
        this._habboTracking = null;
        super.dispose();
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (!this._window) {
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("own_pet_menu"), XmlAsset).content, XML);
                this._window = asGuarded(this._widget.windowManager.buildFromXML(_loc1_, 0), isIWindowContainer);
                if (!this._window) {
                    return;
                }
                this._window.addEventListener("WME_OVER", this.onMouseHoverEvent);
                this._window.addEventListener("WME_OUT", this.onMouseHoverEvent);
                this._window.findChildByName("minimize").addEventListener("WME_CLICK", this.onMinimize);
                this._window.findChildByName("minimize").addEventListener("WME_OVER", this.onMinimizeHover);
                this._window.findChildByName("minimize").addEventListener("WME_OUT", this.onMinimizeHover);
            }
            this._buttons = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
            this._buttons.procedure = this.buttonEventProc;
            this._window.findChildByName("name").caption = this._userName;
            this._window.visible = false;
            this.activeView = this._window;
            this.updateButtons();
        }
    }

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc8_: RoomWidgetMessage = null;
        let _loc5_: ICheckBoxWindow = null;
        let _loc9_: number = 0;
        let _loc6_: string = null;
        let _loc4_: string = null;
        let _loc7_: boolean = false;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc3_ = true;
                OwnPetMenuView._log.info("Own pet menu was clicked: " + param2.parent.name);
                switch (param2.parent.name) {
                    case "respect":
                        this._data.petRespectLeft -= 1;
                        this.updateButtons();
                        _loc8_ = new RoomWidgetUserActionMessage(" RWUAM_RESPECT_PET", this.petId);
                        break;
                    case "treat":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_TREAT_PET", this.petId);
                        break;
                    case "pass_handitem":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_GIVE_CARRY_ITEM_TO_PET", this.petId);
                        break;
                    case "wired_inspect":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_WIRED_INSPECT_PET", this.petId);
                        break;
                    case "train":
                        this.widget.openTrainingView();
                        break;
                    case "pick_up":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_PICKUP_PET", this.petId);
                        this.widget.closeTrainingView();
                        break;
                    case "mount":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_MOUNT_PET", this.petId);
                        break;
                    case "toggle_riding_permission":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_TOGGLE_PET_RIDING_PERMISSION", this.petId);
                        _loc5_ = this.getCheckbox("toggle_riding_permission");
                        if (_loc5_ != null) {
                            this.enableCheckbox("toggle_riding_permission", !_loc5_.isSelected);
                        }
                        break;
                    case "toggle_breeding_permission":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_TOGGLE_PET_BREEDING_PERMISSION", this.petId);
                        _loc5_ = this.getCheckbox("toggle_breeding_permission");
                        if (_loc5_ != null) {
                            this.enableCheckbox("toggle_breeding_permission", !_loc5_.isSelected);
                        }
                        break;
                    case "dismount":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_DISMOUNT_PET", this.petId);
                        break;
                    case "saddle_off":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_SADDLE_OFF", this.petId);
                        break;
                    case "breed":
                        if (this._mode == 0) {
                            _loc9_ = 46;
                            _loc6_ = "pet.command." + _loc9_;
                            _loc4_ = this._widget.catalog.localization.getLocalization(_loc6_);
                            _loc8_ = new RoomWidgetPetCommandMessage("RWPCM_PET_COMMAND", this._data.id, this._data.name + " " + _loc4_);
                            break;
                        }
                        if (this._mode == 3) {
                            _loc8_ = new RoomWidgetUserActionMessage("RWUAM_REQUEST_BREED_PET", this.petId);
                        }
                        break;
                    case "harvest":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_HARVEST_PET", this.petId);
                        break;
                    case "revive":
                        _loc7_ = this.openCatalogPage(this._SafeStr_5492);
                        if (_loc7_) {
                        }
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_REVIVE_PET", this.petId);
                        break;
                    case "compost":
                        _loc8_ = new RoomWidgetUserActionMessage("RWUAM_COMPOST_PLANT", this.petId);
                        break;
                    case "buy_saddle":
                        this.openCatalogPage(this._SafeStr_3663);
                }
            } else if (param2.name == "profile_link") {
                _loc8_ = new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this.petId, "ownPetContextMenu");
            } else if (param2.name == "toggle_riding_permission_checkbox") {
                _loc3_ = true;
                _loc8_ = new RoomWidgetUserActionMessage("RWUAM_TOGGLE_PET_RIDING_PERMISSION", this.petId);
            } else if (param2.name == "toggle_breeding_permission_checkbox") {
                _loc3_ = true;
                _loc8_ = new RoomWidgetUserActionMessage("RWUAM_TOGGLE_PET_BREEDING_PERMISSION", this.petId);
            }
            if (_loc8_) {
                this._widget.messageListener.processWidgetMessage(_loc8_);
            }
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this._widget.removeView(this, false);
        }
    }

    public updateButtons(): void {
        let _loc6_: number = 0;
        let _loc2_: number = NaN;
        let _loc7_: number = NaN;
        let _loc3_: number = 0;
        let _loc8_: IRoomObject = null;
        let _loc4_: number = 0;
        if (!this._window || !this._data || !this._buttons) {
            return;
        }
        this._buttons.autoArrangeItems = false;
        let _loc5_: number = this._buttons.numListItems;
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            this._buttons.getListItemAt(_loc6_ >>> 0).visible = false;
            _loc6_++;
        }
        this._SafeStr_3663 = null;
        let _loc1_: AvatarInfoWidgetHandler = this.widget.handler;
        switch (this._mode) {
            case 0:
                this.showButton("respect", this._data.petRespectLeft > 0);
                this.showButton("train");
                this.showButton("pick_up");
                if (this._data.petType == 15) {
                    this._SafeStr_3663 = this.findFurnitureData(16, 15);
                    if (this._SafeStr_3663 != null) {
                        this.showButton("buy_saddle");
                    }
                }
                if (this.widget.configuration.getBoolean("nest.breeding.bear.enabled")) {
                    if (this._data.petType == 4) {
                        this.showButton("breed");
                    }
                }
                if (this.widget.configuration.getBoolean("nest.breeding.terrier.enabled")) {
                    if (this._data.petType == 3) {
                        this.showButton("breed");
                    }
                }
                if (this.widget.configuration.getBoolean("nest.breeding.cat.enabled")) {
                    if (this._data.petType == 1) {
                        this.showButton("breed");
                    }
                }
                if (this.widget.configuration.getBoolean("nest.breeding.dog.enabled")) {
                    if (this._data.petType == 0) {
                        this.showButton("breed");
                    }
                }
                if (this.widget.configuration.getBoolean("nest.breeding.pig.enabled")) {
                    if (this._data.petType == 5) {
                        this.showButton("breed");
                    }
                }
                break;
            case 1:
                this.showButton("mount");
                if (this.widget.configuration.getBoolean("sharedhorseriding.enabled")) {
                    this.showButton("toggle_riding_permission");
                    this.enableCheckbox("toggle_riding_permission", this._data != null ? this._data.accessRights == 1 : false);
                }
                this.showButton("respect", this._data.petRespectLeft > 0);
                this.showButton("train");
                this.showButton("pick_up");
                this.showButton("saddle_off");
                break;
            case 2:
                this.showButton("dismount");
                this.showButton("respect", this._data.petRespectLeft > 0);
                break;
            case 3:
                this.showButton("pick_up");
                if (this._data.canRevive) {
                    this._SafeStr_5492 = this.findFurnitureData(20, 16);
                    this.showButton("revive");
                    if (this.widget.configuration.getBoolean("monsterplants.composting.enabled") && _loc1_.container.roomSession.isRoomOwner) {
                        this.showButton("compost");
                    }
                    break;
                }
                _loc2_ = typeof this._data.energy === "number" ? this._data.energy : null;
                _loc7_ = typeof this._data.energyMax === "number" ? this._data.energyMax : null;
                this.showButton("treat", true, _loc2_ / _loc7_ < 0.98);
                if (this._data.level == this._data.levelMax) {
                    if (this._data.canBreed) {
                        this.showButton("toggle_breeding_permission");
                        this.enableCheckbox("toggle_breeding_permission", this._data.hasBreedingPermission);
                        this.showButton("breed");
                    }
                }
        }
        if (this.widget.configuration.getBoolean("handitem.give.pet.enabled")) {
            _loc3_ = _loc1_.container.roomSession.ownUserRoomId;
            _loc8_ = _loc1_.container.roomEngine.getRoomObject(_loc1_.roomSession.roomId, _loc3_, 100);
            if (_loc8_ != null) {
                _loc4_ = _loc8_.getModel().getNumber("figure_carry_object") | 0;
                if (_loc4_ > 0 && _loc4_ < 999999) {
                    this.showButton("pass_handitem");
                }
            }
        }
        this.showButton("wired_inspect", _loc1_.container.userDefinedRoomEvents.showInspectButton());
        this.widget.localizations.registerParameter("infostand.button.petrespect", "count", this._data.petRespectLeft.toString());
        this._buttons.autoArrangeItems = true;
        this._buttons.visible = true;
    }

    private findFurnitureData(param1: number, param2: number): IFurnitureData {
        let _loc3_: any[] = null;
        let _loc6_: number = 0;
        let _loc4_: any = null;
        let _loc7_: any[] = this.widget.handler.container.sessionDataManager.getFloorItemsDataByCategory(param1);
        for (const _loc5_ of _loc7_ ?? []) {
            _loc3_ = _loc5_.customParams.split(" ");
            _loc6_ = (_loc3_ && _loc3_.length >= 1 ? parseInt(stringOrNull(_loc3_[0])) : -1) | 0;
            if (_loc6_ == param2) {
                _loc4_ = _loc5_;
                break;
            }
        }
        return _loc4_;
    }

    private openCatalogPage(param1: IFurnitureData): boolean {
        if (this._catalog == null || param1 == null || param1.purchaseOfferId < 0) {
            return false;
        }
        this._catalog.openCatalogPageByOfferId(param1.purchaseOfferId, "NORMAL");
        if (this._habboTracking && !this._habboTracking.disposed) {
            this._habboTracking.trackGoogle("infostandCatalogButton", "offer", param1.purchaseOfferId);
        }
        return true;
    }

    private findRoomObject(param1: IFurnitureData): IRoomObject {
        let _loc5_: number = 0;
        let _loc3_: IRoomObject = null;
        let _loc7_: number = 0;
        if (this.widget == null || param1 == null) {
            return null;
        }
        let _loc2_: IRoomWidgetHandlerContainer = this.widget.handler.container;
        if (_loc2_ == null) {
            return null;
        }
        let _loc6_: IRoomEngine = _loc2_.roomEngine;
        if (_loc6_ == null) {
            return null;
        }
        let _loc8_: number = _loc2_.roomSession.roomId;
        let _loc4_: number = _loc6_.getRoomObjectCount(_loc8_, 10);
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc3_ = _loc6_.getRoomObjectWithIndex(_loc8_, _loc5_, 10);
            if (_loc3_ != null) {
                _loc7_ = _loc3_.getModel().getNumber("furniture_type_id") | 0;
                if (_loc7_ == param1.id) {
                    return _loc3_;
                }
            }
            _loc5_++;
        }
        return null;
    }

    private enableCheckbox(param1: string, param2: boolean): void {
        let _loc3_: ICheckBoxWindow = this.getCheckbox(param1);
        if (!_loc3_) {
            return;
        }
        if (param2) {
            _loc3_.select();
        } else {
            _loc3_.unselect();
        }
    }

    private getCheckbox(param1: string): ICheckBoxWindow {
        if (!this._buttons) {
            return null;
        }
        let _loc2_: IWindowContainer = asGuarded(this._buttons.getListItemByName(param1), isIWindowContainer);
        if (!_loc2_) {
            return null;
        }
        return asGuarded(_loc2_.findChildByName(param1 + "_checkbox"), isICheckBoxWindow);
    }

    private changeMode(param1: number): void {
        this._mode = param1;
        this.updateButtons();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (OwnPetMenuView.#staticsReady) return;
        OwnPetMenuView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(OwnPetMenuView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.avatarinfo.OwnPetMenuView"));
    }
}
