import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Combo } from '@/com/sulake/core/window/motion/Combo';
import { EaseOut } from '@/com/sulake/core/window/motion/EaseOut';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { MoveBy } from '@/com/sulake/core/window/motion/MoveBy';
import { ResizeTo } from '@/com/sulake/core/window/motion/ResizeTo';
import { Tab } from '@/com/sulake/habbo/friendbar/view/tabs/Tab';

export class AddFriendsTab extends Tab {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs::AddFriendsTab'); }

    protected static readonly ICON: string = "icon";
    protected static readonly _SafeStr_8370: string = "text";
    protected static readonly HEADER: string = "header";
    protected static readonly LABEL: string = "label";
    protected static readonly _SafeStr_7529: string = "button";
    private static readonly _SafeStr_7753: string = "add_friends_tab_xml";
    private static readonly ICON_RESOURCE: string = "find_friends_icon_png";
    private static _SafeStr_4474: number = -1;
    private static readonly DEFAULT_COLOR: number = 8374494;
    private static readonly _SafeStr_7659: number = 9560569;
    private static readonly _SafeStr_4348: any[] = [];
    private static readonly _SafeStr_4377: any[] = [];

    constructor() {
        super();
    }

    public static allocate(): AddFriendsTab {
        let _loc1_: AddFriendsTab = AddFriendsTab._SafeStr_4348.length > 0 ? AddFriendsTab._SafeStr_4348.pop() : new AddFriendsTab();
        _loc1_._recycled = false;
        _loc1_._window = _loc1_.allocateEntityWindow();
        return _loc1_;
    }

    public allocateEntityWindow(): IWindowContainer {
        let _loc1_: IWindowContainer = AddFriendsTab._SafeStr_4377.length > 0 ? AddFriendsTab._SafeStr_4377.pop() : asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("add_friends_tab_xml").content, XML)), isIWindowContainer);
        let _loc4_: IRegionWindow = castGuarded(_loc1_.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc1_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc1_.addEventListener("WME_OVER", this.onMouseOver);
        _loc1_.addEventListener("WME_OUT", this.onMouseOut);
        _loc4_.addEventListener("WME_CLICK", this.onMouseClick);
        _loc4_.addEventListener("WME_OVER", this.onMouseOver);
        _loc4_.addEventListener("WME_OUT", this.onMouseOut);
        if (AddFriendsTab._SafeStr_4474 < 0) {
            AddFriendsTab._SafeStr_4474 = _loc1_.height;
        }
        _loc1_.height = Tab.HEIGHT;
        let _loc3_: IBitmapWrapperWindow = asGuarded(_loc1_.findChildByName("icon"), isIBitmapWrapperWindow);
        _loc3_.disposesBitmap = false;
        if (Tab.ASSETS.getAssetByName("find_friends_icon_png") != null) {
            _loc3_.bitmap = asInstanceOf(Tab.ASSETS.getAssetByName("find_friends_icon_png").content, BitmapData);
        }
        let _loc2_: IWindow = _loc1_.findChildByName("button");
        _loc2_.addEventListener("WME_CLICK", this.onButtonClick);
        let _loc5_: IWindow = _loc1_.findChildByName("text");
        _loc5_.visible = false;
        return _loc1_;
    }

    private releaseEntityWindow(param1: IWindowContainer): void {
        let _loc2_: IRegionWindow = null;
        if (param1 && !param1.disposed) {
            param1.procedure = null;
            param1.removeEventListener("WME_CLICK", this.onMouseClick);
            param1.removeEventListener("WME_OVER", this.onMouseOver);
            param1.removeEventListener("WME_OUT", this.onMouseOut);
            _loc2_ = castGuarded(param1.findChildByName("header"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            _loc2_.removeEventListener("WME_CLICK", this.onMouseClick);
            _loc2_.removeEventListener("WME_OVER", this.onMouseOver);
            _loc2_.removeEventListener("WME_OUT", this.onMouseOut);
            param1.findChildByName("button").removeEventListener("WME_CLICK", this.onButtonClick);
            param1.findChildByName("text").visible = false;
            param1.width = Tab.WIDTH;
            param1.height = Tab.HEIGHT;
            if (AddFriendsTab._SafeStr_4377.indexOf(param1) == -1) {
                AddFriendsTab._SafeStr_4377.push(param1);
            }
        }
    }

    public override select(param1: boolean): void {
        if (!this.selected) {
            if (param1 && false && Motions.getMotionByTarget(this._window) == null) {
                Motions.runMotion(new Combo(new EaseOut(new ResizeTo(this._window, 80, this._window.width, AddFriendsTab._SafeStr_4474), 3), new EaseOut(new MoveBy(this._window, 80, this._window.x, -(AddFriendsTab._SafeStr_4474 - Tab.HEIGHT)), 3)));
            } else {
                this._window.height = AddFriendsTab._SafeStr_4474;
                this._window.y = Tab.HEIGHT - this._window.height;
            }
            this._window.findChildByName("text").visible = true;
            super.select(param1);
        }
    }

    public override deselect(param1: boolean): void {
        if (this.selected) {
            this._window.findChildByName("text").visible = false;
            this._window.height = Tab.HEIGHT;
            this._window.y = 0;
            super.deselect(param1);
        }
    }

    public override recycle(): void {
        if (!this.disposed) {
            if (!this._recycled) {
                if (this._window) {
                    this.releaseEntityWindow(this._window);
                    this._window = null;
                }
                this._recycled = true;
                AddFriendsTab._SafeStr_4348.push(this);
            }
        }
    }

    protected override expose(): void {
        super.expose();
        castGuarded(this._window.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = this.exposed;
        this._window.color = (this.exposed ? 9560569 : 8374494) >>> 0;
    }

    protected override conceal(): void {
        super.conceal();
        castGuarded(this._window.findChildByTag("label"), isITextWindow, "com.sulake.core.window.components.ITextWindow").underline = this.exposed;
        this._window.color = (this.exposed ? 9560569 : 8374494) >>> 0;
    }

    private onButtonClick = (param1: WindowMouseEvent): void => {
        if (!this.disposed && !this.recycled) {
            Tab.DATA.findNewFriends();
            this.deselect(true);
        }
    };
}
