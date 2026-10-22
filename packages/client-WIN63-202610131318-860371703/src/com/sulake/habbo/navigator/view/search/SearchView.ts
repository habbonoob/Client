import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { SearchFilterEnum } from '@/com/sulake/habbo/navigator/view/search/SearchFilterEnum';

export class SearchView {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search::SearchView'); }

    private static readonly INPUT_PLACEHOLDER_TEXTCOLOR: number = 10461087;
    private static readonly INPUT_TEXTCOLOR: number = 0;
    private static FILTER_SELECTOR_INDEX_TO_MODE: any[] = [5, 2, 1, 3, 4];
    private static FILTER_MODE_TO_SELECTOR_INDEX: any[] = [0, 2, 1, 3, 4, 0];

    declare private _navigator: HabboNewNavigator;

    declare private _container: IWindowContainer;

    declare private _SafeStr_2135: ITextFieldWindow;

    declare private _SafeStr_4282: IDropMenuWindow;

    declare private _inputFieldPlaceholderText: string;

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
        this._inputFieldPlaceholderText = this._navigator.localization.getLocalizationWithParams("navigator.filter.input.placeholder", "filter rooms by...");
    }

    public set container(param1: IWindowContainer) {
        this._container = param1;
        this._SafeStr_4282 = castGuarded(this._container.findChildByName("filter_type_drop_menu"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this._SafeStr_2135 = castGuarded(this._container.findChildByName("search_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._SafeStr_2135.addEventListener("WKE_KEY_UP", this.keyUpHandler);
        this._SafeStr_2135.addEventListener("WE_CHANGE", this.onInputChanged);
        this._SafeStr_2135.addEventListener("WE_FOCUSED", this.onInputFocused);
        let _loc2_: IWindow = this._container.findChildByName("clear_search_button");
        if (_loc2_) {
            _loc2_.addEventListener("WME_CLICK", this.onClearSearch);
        }
        this.clear();
    }

    private onClearSearch = (param1: WindowMouseEvent = null): void => {
        this._SafeStr_2135.focus();
        this._SafeStr_2135.caption = "";
        let _loc2_: IStaticBitmapWrapperWindow = asGuarded(this._container.findChildByName("search.clear.icon"), isIStaticBitmapWrapperWindow);
        _loc2_.assetUri = "common_small_pen";
    };

    public clear(): void {
        this.setInputToFilterPlaceHolder();
        this._SafeStr_4282.selection = 0;
        this._container.findChildByName("refreshButtonContainer").visible = false;
    }

    public setTextAndSearchModeFromFilter(param1: string, param2: string = ""): void {
        let _loc4_: IStaticBitmapWrapperWindow = null;
        let _loc3_: number = SearchFilterEnum.filterInInput(param1);
        if (_loc3_ != 0) {
            this._SafeStr_4282.selection = SearchView.FILTER_MODE_TO_SELECTOR_INDEX[_loc3_] | 0;
            this._SafeStr_2135.caption = param1.substr(Number(SearchFilterEnum.FILTER_PREFIX[_loc3_].length), param1.length - SearchFilterEnum.FILTER_PREFIX[_loc3_].length);
        } else {
            this._SafeStr_2135.caption = param1;
            this._SafeStr_4282.selection = 0;
        }
        if (param2 != "" && param2 != this._inputFieldPlaceholderText) {
            this._SafeStr_2135.caption = param2;
            this.setInputFieldTextFormattingToPlaceholder(true);
        } else if (this._SafeStr_2135.caption == "") {
            this.setInputToFilterPlaceHolder();
        } else {
            this.setInputFieldTextFormattingToPlaceholder(false);
        }
        if (this._SafeStr_2135.caption.length != 0 && this._SafeStr_2135.caption != this._inputFieldPlaceholderText) {
            this._container.findChildByName("refreshButtonContainer").visible = true;
            _loc4_ = asGuarded(this._container.findChildByName("search.clear.icon"), isIStaticBitmapWrapperWindow);
            _loc4_.assetUri = "icons_close";
        } else {
            this._container.findChildByName("refreshButtonContainer").visible = false;
            _loc4_ = asGuarded(this._container.findChildByName("search.clear.icon"), isIStaticBitmapWrapperWindow);
            _loc4_.assetUri = "common_small_pen";
        }
    }

    private keyUpHandler = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode == 13) {
            this._navigator.performSearch(this._navigator.currentResults.searchCodeOriginal, this.getFilterParameter());
        }
    };

    private getFilterParameter(): string {
        return SearchFilterEnum.FILTER_PREFIX[SearchView.FILTER_SELECTOR_INDEX_TO_MODE[this._SafeStr_4282.selection]] + this._SafeStr_2135.caption;
    }

    private setInputToFilterPlaceHolder(): void {
        this.setInputFieldTextFormattingToPlaceholder(true);
        this._SafeStr_2135.caption = this._inputFieldPlaceholderText;
    }

    private onInputFocused = (param1: WindowEvent): void => {
        this.setInputFieldTextFormattingToPlaceholder(false);
        if (this._SafeStr_2135.caption == this._inputFieldPlaceholderText) {
            this._SafeStr_2135.caption = "";
        }
    };

    private setInputFieldTextFormattingToPlaceholder(param1: boolean): void {
        this._SafeStr_2135.textColor = (param1 ? 10461087 : 0) >>> 0;
        this._SafeStr_2135.italic = param1;
    }

    private onInputChanged = (param1: WindowEvent): void => {
    };

    public get currentInput(): string {
        if (this._SafeStr_2135 != null) {
            return this._SafeStr_2135.caption;
        }
        return this._inputFieldPlaceholderText;
    }
}
