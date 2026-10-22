import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Tab } from '@/com/sulake/habbo/friendbar/view/tabs/Tab';

export class NewOpenMessengerTab extends Tab {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.tabs::NewOpenMessengerTab'); }

    protected static readonly ICON: string = "icon";
    protected static readonly HEADER: string = "header";
    private static readonly _SafeStr_7753: string = "new_open_messenger_tab_xml";
    private static readonly DEFAULT_COLOR: number = 8374494;
    private static readonly _SafeStr_7659: number = 9560569;
    private static readonly FRIENDS_Y_PADDING: number = 10;
    private static readonly _SafeStr_4348: any[] = [];
    private static readonly _SafeStr_4377: any[] = [];

    constructor() {
        super();
    }

    public static allocate(): NewOpenMessengerTab {
        let _loc1_: NewOpenMessengerTab = NewOpenMessengerTab._SafeStr_4348.length > 0 ? NewOpenMessengerTab._SafeStr_4348.pop() : new NewOpenMessengerTab();
        _loc1_._recycled = false;
        _loc1_._window = _loc1_.allocateEntityWindow();
        return _loc1_;
    }

    public allocateEntityWindow(): IWindowContainer {
        let _loc1_: IWindowContainer = NewOpenMessengerTab._SafeStr_4377.length > 0 ? NewOpenMessengerTab._SafeStr_4377.pop() : asGuarded(Tab.WINDOWING.buildFromXML(asInstanceOf(Tab.ASSETS.getAssetByName("new_open_messenger_tab_xml").content, XML)), isIWindowContainer);
        _loc1_.addEventListener("WME_CLICK", this.onButtonClick);
        _loc1_.addEventListener("WME_OVER", this.onMouseOver);
        _loc1_.addEventListener("WME_OUT", this.onMouseOut);
        _loc1_.height = Tab.HEIGHT;
        return _loc1_;
    }

    private releaseEntityWindow(param1: IWindowContainer): void {
        if (param1 && !param1.disposed) {
            param1.procedure = null;
            param1.removeEventListener("WME_CLICK", this.onMouseClick);
            param1.removeEventListener("WME_OVER", this.onMouseOver);
            param1.removeEventListener("WME_OUT", this.onMouseOut);
            param1.width = Tab.WIDTH;
            param1.height = Tab.HEIGHT;
            if (NewOpenMessengerTab._SafeStr_4377.indexOf(param1) == -1) {
                NewOpenMessengerTab._SafeStr_4377.push(param1);
            }
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
                NewOpenMessengerTab._SafeStr_4348.push(this);
            }
        }
    }

    protected override expose(): void {
        super.expose();
        this._window.color = (this.exposed ? 9560569 : 8374494) >>> 0;
    }

    protected override conceal(): void {
        super.conceal();
        this._window.color = (this.exposed ? 9560569 : 8374494) >>> 0;
    }

    private onButtonClick = (param1: WindowMouseEvent): void => {
        if (!this.disposed && !this.recycled) {
            Tab.DATA.toggleMessenger();
        }
    };
}
