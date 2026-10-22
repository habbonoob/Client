import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIssueBrowserView } from '@/com/sulake/habbo/moderation/IIssueBrowserView';
import type { IssueManager } from '@/com/sulake/habbo/moderation/IssueManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MyIssuesView } from '@/com/sulake/habbo/moderation/MyIssuesView';
import { OpenIssuesView } from '@/com/sulake/habbo/moderation/OpenIssuesView';
import { PickedIssuesView } from '@/com/sulake/habbo/moderation/PickedIssuesView';

export class IssueBrowser {
    static { registerClassName(this, 'com.sulake.habbo.moderation::IssueBrowser'); }

    private readonly MY_ISSUES: string = "my_issues";
    private readonly OPEN_ISSUES: string = "open_issues";
    private readonly PICKED_ISSUES: string = "picked_issues";
    private readonly CLOSED_ISSUES: string = "closed_issues";

    declare private _issueManager: IssueManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _assets: IAssetLibrary;

    declare private _window: IFrameWindow;

    declare private _tabContext: ITabContextWindow;

    declare private _SafeStr_2870: IIssueBrowserView;

    declare private _SafeStr_7210: IIssueBrowserView;

    declare private _SafeStr_6944: IIssueBrowserView;

    declare private _SafeStr_6993: PickedIssuesView;

    constructor(param1: IssueManager, param2: IHabboWindowManager, param3: IAssetLibrary) {
        this._issueManager = param1;
        this._windowManager = param2;
        this._assets = param3;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get assets(): IAssetLibrary {
        return this._assets;
    }

    public get issueManager(): IssueManager {
        return this._issueManager;
    }

    public show(): void {
        if (this._window == null) {
            this.createMainFrame();
        }
        this._window.visible = true;
        this._window.activate();
        this.update();
    }

    public isOpen(): boolean {
        return this._window != null && Boolean(this._window.visible);
    }

    private createMainFrame(): void {
        let _loc1_: IWindow = null;
        let _loc5_: IWindow = null;
        let _loc6_: IWindow = null;
        let _loc2_: ITabButtonWindow = null;
        let _loc4_: number = 0;
        if (this._window == null) {
            this._window = asGuarded(this.createWindow("issue_browser_xml"), isIFrameWindow);
            if (this._window == null) {
                return;
            }
            _loc1_ = this._window.desktop;
            this._window.x = _loc1_.width / 2 - this._window.width / 2 | 0;
            this._window.y = _loc1_.height / 2 - this._window.height / 2 | 0;
            _loc5_ = this._window.findChildByTag("close");
            if (_loc5_ != null) {
                _loc5_.addEventListener("WME_CLICK", this.onClose);
            }
            _loc6_ = this._window.findChildByName("auto_pick");
            if (_loc6_ != null) {
                _loc6_.addEventListener("WME_CLICK", this.onAutoPick);
            }
            this._tabContext = asGuarded(this._window.findChildByName("tab_context"), isITabContextWindow);
            _loc4_ = 0;
            while (_loc4_ < this._tabContext.numTabItems) {
                _loc2_ = this._tabContext.getTabItemAt(_loc4_ >>> 0);
                _loc2_.addEventListener("WE_SELECTED", this.onTabSelected);
                _loc4_++;
            }
            this._SafeStr_7210 = new MyIssuesView(this.issueManager, this, asGuarded(this._window.findChildByName("my_issues_prototype"), isIWindowContainer));
            this._SafeStr_6944 = new OpenIssuesView(this.issueManager, this, asGuarded(this._window.findChildByName("open_issues_prototype"), isIWindowContainer));
            this._SafeStr_6993 = new PickedIssuesView(this.issueManager, this, asGuarded(this._window.findChildByName("picked_issues_prototype"), isIWindowContainer));
        }
        this._tabContext = asGuarded(this._window.findChildByName("tab_context"), isITabContextWindow);
        if (this._tabContext == null || this._tabContext.container == null) {
            return;
        }
        let _loc3_: ISelectableWindow = this._tabContext.selector.getSelectableByName("open_issues");
        this._tabContext.selector.setSelected(_loc3_);
    }

    private selectView(param1: string): void {
        let _loc2_: IIssueBrowserView = this.getView(param1);
        if (this._SafeStr_2870 == _loc2_) {
            return;
        }
        if (this._SafeStr_2870 != null) {
            this._SafeStr_2870.visible = false;
        }
        this._SafeStr_2870 = _loc2_;
        if (this._SafeStr_2870 == null) {
            return;
        }
        this._SafeStr_2870.view.width = this._tabContext.container.width;
        this._SafeStr_2870.view.height = this._tabContext.container.height;
        this._SafeStr_2870.visible = true;
        this._SafeStr_2870.update();
    }

    private getView(param1: string): IIssueBrowserView {
        switch (param1) {
            case "my_issues":
                return this._SafeStr_7210;
            case "open_issues":
                return this._SafeStr_6944;
            case "picked_issues":
                return this._SafeStr_6993;
            default:
                return null;
        }
    }

    private onTabSelected = (param1: WindowEvent): void => {
        if (param1 == null || param1.window == null) {
            return;
        }
        this.selectView(param1.window.name);
    };

    public update(): void {
        if (this._window == null || !this._window.visible) {
            return;
        }
        if (this._SafeStr_2870 == null) {
            return;
        }
        this._SafeStr_2870.update();
    }

    public createWindow(param1: string): IWindow {
        if (this._windowManager == null || this._assets == null) {
            return null;
        }
        let _loc2_: XmlAsset = asInstanceOf(this._assets.getAssetByName(param1), XmlAsset);
        if (_loc2_ == null || _loc2_.content == null) {
            return null;
        }
        return this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML));
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this._window.visible = false;
    };

    private onAutoPick = (param1: WindowMouseEvent): void => {
        if (this._issueManager != null) {
            this._issueManager.autoPick("issue browser pick next");
        }
    };
}
