import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PopularTagData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PopularTagData';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { IViewCtrl } from '@/com/sulake/habbo/navigator/IViewCtrl';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TagRenderer } from '@/com/sulake/habbo/navigator/TagRenderer';
import { Util } from '@/com/sulake/habbo/navigator/Util';

export class PopularTagsListCtrl implements IViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::PopularTagsListCtrl'); }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._SafeStr_3603 = new TagRenderer(this._navigator);
    }

    declare private _navigator: HabboNavigator;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_8223: number;
    static { (this.prototype as any)._SafeStr_8223 = 0; }

    declare private _SafeStr_3603: TagRenderer;

    declare private _content: IWindowContainer;

    public get content(): IWindowContainer {
        return this._content;
    }

    public set content(param1: IWindowContainer) {
        this._content = param1;
        this._SafeStr_2221 = this._content ? castGuarded(this._content.findChildByName("item_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow") : null;
    }

    public dispose(): void {
        if (this._SafeStr_3603) {
            this._SafeStr_3603.dispose();
            this._SafeStr_3603 = null;
        }
    }

    public refresh(): void {
        let _loc3_: number = 0;
        let _loc1_: PopularTagData = null;
        this._SafeStr_3603.useHashTags = true;
        let _loc4_: any[] = this._navigator.data.popularTags.tags;
        let _loc2_: IWindowContainer = castGuarded(this._SafeStr_2221.getListItemAt(0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc2_ == null) {
            _loc2_ = castGuarded(this._navigator.getXmlWindow("grs_popular_tag_row"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            this._SafeStr_2221.addListItem(_loc2_);
        }
        Util.hideChildren(_loc2_);
        _loc3_ = 0;
        while (_loc3_ < this._navigator.data.popularTags.tags.length) {
            _loc1_ = this._navigator.data.popularTags.tags[_loc3_];
            this._SafeStr_3603.refreshTag(_loc2_, _loc3_, _loc1_.tagName);
            _loc3_++;
        }
        Util.layoutChildrenInArea(_loc2_, _loc2_.width, 18, 3);
        _loc2_.height = Util.getLowestPoint(_loc2_);
        this._content.findChildByName("no_tags_found").visible = _loc4_.length < 1;
    }

    private refreshTagName(param1: IWindowContainer, param2: PopularTagData): void {
        let _loc3_: string = "txt";
        let _loc4_: ITextWindow = castGuarded(param1.findChildByName(_loc3_), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (param2 == null) {
            return;
        }
        _loc4_.visible = true;
        _loc4_.text = param2.tagName;
    }
}
