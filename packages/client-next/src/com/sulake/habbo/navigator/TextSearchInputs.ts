import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { TextFieldManager } from '@/com/sulake/habbo/navigator/TextFieldManager';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class TextSearchInputs {
    static { registerClassName(this, 'com.sulake.habbo.navigator::TextSearchInputs'); }

    declare private _navigator: HabboNavigator;

    declare private _searchStr: TextFieldManager;

    declare private _searchType: IDropMenuWindow;

    constructor(param1: HabboNavigator, param2: IWindowContainer) {
        let _loc4_: any[] = null;
        this._navigator = param1;
        let _loc3_: ITextFieldWindow = castGuarded(param2.findChildByName("search_str"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._searchStr = new TextFieldManager(this._navigator, _loc3_, 35, this.searchRooms, this._navigator.getText("navigator.search.info"));
        Util.setProc(param2, "search_but", this.onSearchButtonClick);
        let _loc5_: boolean = true;
        if (_loc5_) {
            this._searchType = asGuarded(param2.findChildByName("search_type"), isIDropMenuWindow);
            _loc4_ = [];
            _loc4_.push(this._navigator.getText("${navigator.navisel.bydefault}"));
            _loc4_.push(this._navigator.getText("${navigator.navisel.byowner}"));
            _loc4_.push(this._navigator.getText("${navigator.navisel.byroomname}"));
            _loc4_.push(this._navigator.getText("${navigator.navisel.bytag}"));
            _loc4_.push(this._navigator.getText("${navigator.navisel.bygroupname}"));
            this._searchType.populate(_loc4_);
            this._searchType.selection = 0;
        }
    }

    public dispose(): void {
        if (this._searchStr) {
            this._searchStr.dispose();
            this._searchStr = null;
        }
        this._navigator = null;
    }

    public setText(param1: string, param2: number): void {
        this._searchStr.setText(param1);
        if (this._searchType != null) {
            switch (param2 - 8) {
                case 0:
                    this._searchType.selection = 0;
                    break;
                case 1:
                    this._searchType.selection = 3;
                    break;
                case 2:
                    this._searchType.selection = 2;
                    break;
                case 5:
                    this._searchType.selection = 4;
                    break;
                case 12:
                    this._searchType.selection = 1;
            }
        }
    }

    private onSearchButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.searchRooms();
    };

    private searchRooms = (): void => {
        let _loc1_: string = this._searchStr.getText();
        if (_loc1_ == "") {
            return;
        }
        if (this._searchType != null) {
            switch (this._searchType.selection) {
                case 0:
                    this._navigator.mainViewCtrl.startSearch(5, 8, _loc1_);
                    break;
                case 1:
                    this._navigator.mainViewCtrl.startSearch(5, 20, _loc1_);
                    break;
                case 2:
                    this._navigator.mainViewCtrl.startSearch(5, 10, _loc1_);
                    break;
                case 3:
                    this._navigator.mainViewCtrl.startSearch(5, 9, _loc1_);
                    break;
                case 4:
                    this._navigator.mainViewCtrl.startSearch(5, 13, _loc1_);
            }
        } else {
            this._navigator.mainViewCtrl.startSearch(5, 8, _loc1_);
        }
        this._navigator.trackNavigationDataPoint("Search", "search", _loc1_);
    };

    public get searchStr(): TextFieldManager {
        return this._searchStr;
    }
}
