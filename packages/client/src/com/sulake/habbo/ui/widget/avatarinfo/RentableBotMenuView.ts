import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RentableBotInfoData } from '@/com/sulake/habbo/ui/widget/avatarinfo/RentableBotInfoData';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CommandBotComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/bots/CommandBotComposer';
import { RemoveBotFromFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/RemoveBotFromFlatMessageComposer';
import { AvatarContextInfoButtonView } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoButtonView';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';

export class RentableBotMenuView extends AvatarContextInfoButtonView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.avatarinfo::RentableBotMenuView'); }

    public static setup_RentableBotMenuView(param1: RentableBotMenuView, param2: number, param3: string, param4: number, param5: number, param6: RentableBotInfoData): void {
        param1._data = param6;
        AvatarContextInfoButtonView.setup(param1, param2, param3, param4, param5, false);
    }

    constructor(param1: AvatarInfoWidget) {
        super(param1);
        this._SafeStr_2318 = false;
    }

    declare protected _data: RentableBotInfoData;

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
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("avatar_menu_widget"), XmlAsset).content, XML);
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
        let _loc4_: Point = null;
        let _loc5_: Rectangle = null;
        let _loc6_: RoomWidgetMessage = null;
        let _loc8_: string = null;
        let _loc7_: string = null;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                _loc5_ = null;
                switch (param2.parent.name) {
                    case "pick":
                        _loc3_ = true;
                        this.widget.handler.container.connection.send(new RemoveBotFromFlatMessageComposer(this._data.id));
                        break;
                    case "setup_chat":
                        _loc3_ = true;
                        _loc5_ = new Rectangle();
                        this._window.getGlobalRectangle(_loc5_);
                        _loc4_ = new Point(_loc5_.x + _loc5_.width / 2, _loc5_.y + _loc5_.height);
                        this.widget.openBotSkillConfigurationView(this._data.id, 2, _loc4_);
                        break;
                    case "random_walk":
                        _loc3_ = true;
                        this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 3, ""));
                        break;
                    case "dress_up":
                        _loc3_ = true;
                        this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 1, ""));
                        break;
                    case "dance":
                        _loc3_ = true;
                        this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 4, ""));
                        break;
                    case "donate_to_all":
                        _loc3_ = true;
                        this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 25, ""));
                        break;
                    case "donate_to_user":
                        _loc3_ = true;
                        this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 24, ""));
                        break;
                    case "nux_take_tour":
                        _loc3_ = true;
                        this.widget.component.context.createLinkEvent("help/tour");
                        this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 10, ""));
                        break;
                    case "wired_inspect":
                        _loc3_ = true;
                        _loc6_ = new RoomWidgetUserActionMessage("RWUAM_WIRED_INSPECT_BOT", this._data.id);
                        this.widget.messageListener.processWidgetMessage(_loc6_);
                        break;
                    case "change_bot_name":
                        _loc3_ = true;
                        _loc5_ = new Rectangle();
                        this._window.getGlobalRectangle(_loc5_);
                        _loc4_ = new Point(_loc5_.x + _loc5_.width / 2, _loc5_.y + _loc5_.height);
                        this.widget.openBotSkillConfigurationView(this._data.id, 5, _loc4_);
                }
                if (param2.parent.name.indexOf(":link ") != -1) {
                    _loc8_ = param2.parent.name.substr(6, param2.parent.name.length - 6);
                    this.widget.component.context.createLinkEvent(_loc8_);
                    _loc3_ = true;
                }
                if (param2.parent.name.indexOf("nux_proceed_") != -1) {
                    _loc7_ = param2.parent.name.substr(12, param2.parent.name.length - 12);
                    this.widget.handler.container.connection.send(new CommandBotComposer(this._data.id, 8, _loc7_));
                    _loc3_ = true;
                }
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
        let _loc6_: number = 0;
        let _loc9_: any[] = null;
        let _loc4_: IWindowContainer = null;
        let _loc10_: number = 0;
        if (!this._window || !this._data) {
            return;
        }
        let _loc2_: IItemListWindow = asGuarded(this._window.findChildByName("buttons"), isIItemListWindow);
        if (!_loc2_) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this._buttons.getListItemByName("link_template"), isIWindowContainer);
        let _loc1_: IWindowContainer = asGuarded(this._buttons.getListItemByName("nux_proceed_1"), isIWindowContainer);
        _loc2_.procedure = this.buttonEventProc;
        _loc2_.autoArrangeItems = false;
        let _loc5_: number = _loc2_.numListItems;
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc2_.getListItemAt(_loc6_ >>> 0).visible = false;
            _loc6_++;
        }
        let _loc7_: boolean = this._data.amIOwner || this._data.amIAnyRoomController;
        this.showButton("pick", !this._data.botSkills ? _loc7_ : this._data.botSkills.indexOf(12) == -1 && _loc7_);
        if (this._data.botSkills) {
            this.showButton("donate_to_all", this._data.botSkills.indexOf(25) != -1);
            this.showButton("donate_to_user", this._data.botSkills.indexOf(24) != -1);
            if (this._data.amIOwner) {
                this.showButton("change_bot_name", this._data.botSkills.indexOf(5) != -1);
                this.showButton("dress_up", this._data.botSkills.indexOf(1) != -1);
                this.showButton("random_walk", this._data.botSkills.indexOf(3) != -1);
                this.showButton("setup_chat", this._data.botSkills.indexOf(2) != -1);
                this.showButton("dance", this._data.botSkills.indexOf(4) != -1);
            }
            this.showButton("nux_take_tour", this._data.botSkills.indexOf(10) != -1);
        }
        this.showButton("wired_inspect", this.widget.handler.container.userDefinedRoomEvents.showInspectButton());
        for (const _loc8_ of this._data.botSkillsWithCommands ?? []) {
            if (_loc8_.id == 7) {
                _loc4_ = asGuarded(_loc3_.clone(), isIWindowContainer);
                _loc9_ = _loc8_.data.split(",");
                if (_loc9_.length == 2) {
                    _loc4_.findChildByName("label").caption = stringOrNull(_loc9_[0]);
                    _loc4_.name = ":link " + _loc9_[1];
                    _loc4_.visible = true;
                    _loc2_.addListItem(_loc4_);
                }
            }
            if (_loc8_.id == 8) {
                if (_loc8_.data == "") {
                    this.showButton("nux_proceed_1", true);
                } else {
                    _loc9_ = _loc8_.data.split(",");
                    if (_loc9_.length == 2) {
                        _loc10_ = parseInt(stringOrNull(_loc9_[1])) | 0;
                        if (_loc10_ == 1) {
                            this.showButton("nux_proceed_1", true);
                            castGuarded(_loc2_.getListItemByName("nux_proceed_1"), isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("label").caption = stringOrNull(_loc9_[0]);
                        } else {
                            _loc4_ = asGuarded(_loc1_.clone(), isIWindowContainer);
                            _loc4_.visible = true;
                            _loc4_.name = "nux_proceed_" + _loc10_;
                            _loc4_.findChildByName("label").caption = stringOrNull(_loc9_[0]);
                            _loc2_.addListItemAt(_loc4_, _loc2_.getListItemIndex(_loc2_.getListItemByName("nux_proceed_1")) + _loc10_ - 1 >>> 0);
                        }
                    }
                }
            }
            if (_loc8_.id == 14) {
                _loc4_ = asGuarded(_loc3_.clone(), isIWindowContainer);
                _loc9_ = _loc8_.data.split(",");
                if (_loc9_.length == 2) {
                    _loc4_.findChildByName("label").caption = stringOrNull(_loc9_[0]);
                    _loc4_.name = ":link navigator/search/" + _loc9_[1];
                    _loc4_.visible = true;
                    _loc2_.addListItem(_loc4_);
                }
            }
        }
        _loc2_.autoArrangeItems = true;
        _loc2_.visible = true;
    }
}
