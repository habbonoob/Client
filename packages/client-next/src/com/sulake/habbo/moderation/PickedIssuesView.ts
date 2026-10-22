import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIssueBrowserView } from '@/com/sulake/habbo/moderation/IIssueBrowserView';
import type { IssueBrowser } from '@/com/sulake/habbo/moderation/IssueBrowser';
import type { IssueManager } from '@/com/sulake/habbo/moderation/IssueManager';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { IssueListView } from '@/com/sulake/habbo/moderation/IssueListView';

export class PickedIssuesView implements IIssueBrowserView {
    static { registerClassName(this, 'com.sulake.habbo.moderation::PickedIssuesView'); }

    declare private _issueManager: IssueManager;

    declare private _SafeStr_3534: IssueBrowser;

    declare private _window: IWindowContainer;

    declare private _SafeStr_6241: IssueListView;

    constructor(param1: IssueManager, param2: IssueBrowser, param3: IWindowContainer) {
        this._issueManager = param1;
        this._SafeStr_3534 = param2;
        this._window = param3;
        this._window.visible = false;
        let _loc4_: IItemListWindow = asGuarded(this._window.findChildByName("issue_list"), isIItemListWindow);
        this._SafeStr_6241 = new IssueListView(param1, param2, _loc4_);
    }

    public get view(): IWindowContainer {
        return this._window;
    }

    public set visible(param1: boolean) {
        this._window.visible = param1;
    }

    public update(): void {
        let _loc1_: any[] = this._issueManager.getBundles("issue_bundle_picked");
        this._SafeStr_6241.update(_loc1_);
    }
}
