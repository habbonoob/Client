import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';
import { FurnitureContextInfoView } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextInfoView';
import { FurnitureContextMenuWidget } from '@/com/sulake/habbo/ui/widget/furniture/contextmenu/FurnitureContextMenuWidget.group';

export class GuildFurnitureContextMenuView extends FurnitureContextInfoView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.guildfurnicontextmenu::GuildFurnitureContextMenuView'); }

    constructor(param1: IContextMenuParentWidget, param2: IHabboGroupsManager, param3: IHabboWindowManager) {
        super(param1);
        this._SafeStr_2318 = false;
        this._groupsManager = param2;
        this._windowManager = param3;
    }

    public _guildId: number = -1;
    public _guildHomeRoomId: number = -1;
    public _userIsMember: boolean = false;
    public _guildHasReadableForum: boolean = false;

    declare protected _groupsManager: IHabboGroupsManager;

    declare protected _windowManager: IHabboWindowManager;

    private get widget(): FurnitureContextMenuWidget {
        return this._widget instanceof FurnitureContextMenuWidget ? this._widget : null;
    }

    public override dispose(): void {
        this._groupsManager = null;
        this._windowManager = null;
        super.dispose();
    }

    protected override updateWindow(): void {
        let _loc1_: XML = null;
        let _loc2_: IRegionWindow = null;
        if (!this._widget || !this._widget.assets || !this._widget.windowManager) {
            return;
        }
        if (ContextInfoView._SafeStr_2596) {
            this.activeView = this.getMinimizedView();
        } else {
            if (!this._window) {
                _loc1_ = asInstanceOf(castTo(this._widget.assets.getAssetByName("guild_furni_menu"), XmlAsset).content, XML);
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
            _loc2_ = asGuarded(this._window.findChildByName("profile_link"), isIRegionWindow);
            if (_loc2_) {
                _loc2_.procedure = this.buttonEventProc;
                _loc2_.toolTipCaption = this.widget.localizations.getLocalization("infostand.profile.link.tooltip", "Click to view profile");
                _loc2_.toolTipDelay = 100;
            }
            this._window.findChildByName("name").caption = this._title;
            this._window.visible = false;
            this.activeView = this._window;
            this.updateButtons();
            this._SafeStr_2283 = false;
        }
    }

    protected override buttonEventProc(param1: WindowEvent, param2: IWindow): void {
        let _loc4_: Component = null;
        if (this.disposed) {
            return;
        }
        if (!this._window || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = false;
        if (param1.type == "WME_CLICK") {
            if (param2.name == "button") {
                switch (param2.parent.name) {
                    case "join":
                        this.widget.handler.sendJoinToGroupMessage(this._guildId);
                        this.showButton("join", !this._userIsMember, false);
                        break;
                    case "home_room":
                        this.widget.handler.sendGoToHomeRoomMessage(this._guildHomeRoomId);
                        break;
                    case "open_forum":
                        if (this.widget != null && this.widget.roomEngine != null) {
                            _loc4_ = asInstanceOf(this.widget.roomEngine, Component);
                            if (_loc4_.context != null) {
                                _loc4_.context.createLinkEvent("groupforum/" + this._guildId);
                            }
                        }
                }
            }
            if (param2.name == "profile_link") {
                this._groupsManager.openGroupInfo(this._guildId);
            }
            _loc3_ = true;
        } else {
            super.buttonEventProc(param1, param2);
        }
        if (_loc3_) {
            this._widget.removeView(this, false);
        }
    }

    protected updateButtons(): void {
        if (!this._window || !this._buttons) {
            return;
        }
        this._buttons.autoArrangeItems = false;
        this.showButton("join", !this._userIsMember, true);
        this.showButton("open_forum", this._guildHasReadableForum, true);
        this._buttons.autoArrangeItems = true;
        this._buttons.visible = true;
    }
}
