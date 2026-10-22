import { asGuarded, asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { AvatarInfoWidgetHandler } from '@/com/sulake/habbo/ui/handler/AvatarInfoWidgetHandler';
import type { PetInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/PetInfoData';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { RoomWidgetOpenProfileMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetOpenProfileMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';

export class PetMenuView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::PetMenuView'); }

    protected static readonly MODE_NORMAL: number = 0;
    private static readonly MODE_SADDLED_UP: number = 1;
    private static readonly MODE_RIDING: number = 2;
    private static readonly MODE_MONSTER_PLANT: number = 3;

    public static setup_PetMenuView(param1: PetMenuView, param2: number, param3: string, param4: number, param5: number, param6: PetInfoData): void {
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

    constructor(param1: AvatarInfoWidget) {
        super(param1);
        this._SafeStr_2318 = false;
    }

    declare private _data: PetInfoData;

    private _mode: number = 0;

    private get widget(): AvatarInfoWidget {
        return this._widget instanceof AvatarInfoWidget ? this._widget : null;
    }

    public override dispose(): void {
        if (this._window) {
            this._window.removeEventListener("WME_OVER", this.onMouseHoverEvent);
            this._window.removeEventListener("WME_OUT", this.onMouseHoverEvent);
        }
        this._data = null;
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
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("pet_menu"), XmlAsset).content, XML);
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
        let _loc5_: any = null;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        let _loc4_: RoomWidgetMessage = null;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc3_ = true;
                switch (param2.parent.name) {
                    case "mount":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_MOUNT_PET", this.userId);
                        break;
                    case "dismount":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_DISMOUNT_PET", this.userId);
                        break;
                    case "respect":
                        this._data.petRespectLeft -= 1;
                        this.updateButtons();
                        _loc4_ = new RoomWidgetUserActionMessage(" RWUAM_RESPECT_PET", this.userId);
                        break;
                    case "treat":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_TREAT_PET", this.userId);
                        break;
                    case "pass_handitem":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_GIVE_CARRY_ITEM_TO_PET", this.userId);
                        break;
                    case "pick_up":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_PICKUP_PET", this.userId);
                        break;
                    case "wired_inspect":
                        _loc4_ = new RoomWidgetUserActionMessage("RWUAM_WIRED_INSPECT_PET", this.userId);
                }
            }
            if (param2.name == "profile_link") {
                _loc4_ = new RoomWidgetOpenProfileMessage("RWOPEM_OPEN_USER_PROFILE", this._userId, "petContextMenu");
            }
            if (_loc5_ != null) {
                _loc4_ = new RoomWidgetUserActionMessage(stringOrNull(_loc5_), this._userId);
                HabboTracking.getInstance().trackEventLog("InfoStand", "click", stringOrNull(_loc5_));
            }
            if (_loc4_ != null) {
                this._widget.messageListener.processWidgetMessage(_loc4_);
            }
            this.updateButtons();
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this._widget.removeView(this, false);
        }
    }

    protected updateButtons(): void {
        let _loc8_: number = 0;
        let _loc1_: number = NaN;
        let _loc9_: number = NaN;
        let _loc2_: AvatarInfoWidgetHandler = null;
        let _loc3_: number = 0;
        let _loc11_: IRoomObject = null;
        let _loc5_: number = 0;
        if (!this._window || !this._data) {
            return;
        }
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
        if (!_loc4_) {
            return;
        }
        _loc4_.procedure = this.buttonEventProc;
        _loc4_.autoArrangeItems = false;
        let _loc7_: number = _loc4_.numListItems;
        _loc8_ = 0;
        while (_loc8_ < _loc7_) {
            _loc4_.getListItemAt(_loc8_ >>> 0).visible = false;
            _loc8_++;
        }
        let _loc10_: IRoomSession = this.widget.handler.roomSession;
        let _loc6_: ISessionDataManager = this.widget.handler.container.sessionDataManager;
        if (_loc10_.isRoomOwner || _loc6_.isAnyRoomController || _loc10_.roomControllerLevel >= 1) {
            this.showButton("pick_up");
        }
        switch (this._mode) {
            case 0:
                this.showButton("respect", this._data.petRespectLeft > 0);
                break;
            case 1:
                if (this.widget.configuration.getBoolean("sharedhorseriding.enabled")) {
                    this.showButton("mount");
                }
                this.showButton("respect", this._data.petRespectLeft > 0);
                break;
            case 2:
                if (this.widget.configuration.getBoolean("sharedhorseriding.enabled")) {
                    this.showButton("dismount");
                }
                this.showButton("respect", this._data.petRespectLeft > 0);
                break;
            case 3:
                if (!this._data.canRevive) {
                    this.showButton("respect", false);
                    _loc1_ = typeof this._data.energy === "number" ? this._data.energy : null;
                    _loc9_ = typeof this._data.energyMax === "number" ? this._data.energyMax : null;
                    this.showButton("treat", true, _loc1_ / _loc9_ < 0.98);
                }
        }
        this.widget.localizations.registerParameter("infostand.button.petrespect", "count", this._data.petRespectLeft.toString());
        if (this.widget.configuration.getBoolean("handitem.give.pet.enabled")) {
            _loc2_ = this.widget.handler;
            _loc3_ = _loc2_.container.roomSession.ownUserRoomId;
            _loc11_ = _loc2_.container.roomEngine.getRoomObject(_loc2_.roomSession.roomId, _loc3_, 100);
            if (_loc11_ != null) {
                _loc5_ = _loc11_.getModel().getNumber("figure_carry_object") | 0;
                if (_loc5_ > 0 && _loc5_ < 999999) {
                    this.showButton("pass_handitem");
                }
            }
        }
        this.showButton("wired_inspect", this.widget.handler.container.userDefinedRoomEvents.showInspectButton());
        _loc4_.autoArrangeItems = true;
        _loc4_.visible = true;
    }
}
