import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { IAvatarEditorGridView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorGridView';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';

export class AvatarEditorGridView implements IAvatarEditorGridView {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::AvatarEditorGridView'); }

    public static readonly REMOVE_ITEM: string = "REMOVE_ITEM";
    public static readonly GET_MORE: string = "GET_MORE";
    private readonly MAX_COLOR_LAYERS: number = 2;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: IAvatarEditorCategoryModel;

    declare private _SafeStr_2835: IItemGridWindow;

    declare private _SafeStr_2948: any[];

    declare private _categoryId: string;

    declare private _notification: IWindow;

    declare private _title: IWindow;

    constructor(param1: IWindowContainer) {
        this._view = param1;
        this._SafeStr_2835 = asGuarded(this._view.findChildByName("thumbs"), isIItemGridWindow);
        this._SafeStr_2948 = [];
        this._SafeStr_2948.push(asGuarded(this._view.findChildByName("palette0"), isIItemGridWindow));
        this._SafeStr_2948.push(asGuarded(this._view.findChildByName("palette1"), isIItemGridWindow));
        this._notification = this._view.findChildByName("content_notification");
        this._title = this._view.findChildByName("content_title");
        this._notification.visible = false;
        this._title.visible = false;
    }

    public dispose(): void {
        if (this._SafeStr_2835) {
            this._SafeStr_2835.dispose();
            this._SafeStr_2835 = null;
        }
        if (this._SafeStr_2948) {
            for (let _loc1_ of this._SafeStr_2948 ?? []) {
                if (_loc1_ != null) {
                    _loc1_.dispose();
                    _loc1_ = null;
                }
            }
            this._SafeStr_2948 = null;
        }
        this._SafeStr_2134 = null;
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
    }

    public get window(): IWindowContainer {
        if (this._view == null) {
            return null;
        }
        if (this._view.disposed) {
            return null;
        }
        return this._view;
    }

    public initFromList(param1: IAvatarEditorCategoryModel, param2: string): void {
        let _loc8_: any;
        let _loc7_: any;
        let _loc3_: number = 0;
        let _loc6_: any[] = null;
        let _loc4_: CategoryData = param1.getCategoryData(param2);
        if (!_loc4_) {
            return;
        }
        this._view.visible = true;
        this._SafeStr_2134 = param1;
        this._categoryId = param2;
        this._SafeStr_2835.removeGridItems();
        if (_loc4_.parts.length == 0) {
            this._title.visible = true;
            this._notification.visible = true;
            this.showPalettes(0);
        } else {
            this._title.visible = false;
            this._notification.visible = false;
            for (_loc8_ of this._SafeStr_2948 ?? []) {
                _loc8_.removeGridItems();
            }
            for (const _loc5_ of _loc4_.parts ?? []) {
                if (_loc5_) {
                    this._SafeStr_2835.addGridItem(_loc5_.view);
                    _loc5_.view.addEventListener("WME_CLICK", this.onGridItemClicked);
                    if (_loc5_.isSelected) {
                        this.showPalettes(_loc5_.colorLayerCount | 0);
                    }
                }
            }
            _loc3_ = 0;
            while (_loc3_ < 2) {
                _loc6_ = _loc4_.getPalette(_loc3_);
                _loc8_ = asGuarded(this._SafeStr_2948[_loc3_], isIItemGridWindow);
                if (!(!_loc6_ || !_loc8_)) {
                    for (_loc7_ of _loc6_ ?? []) {
                        _loc8_.addGridItem(_loc7_.view);
                        _loc7_.view.procedure = this.paletteEventProc;
                    }
                }
                _loc3_++;
            }
        }
    }

    public showPalettes(param1: number): void {
        let _loc4_: IScrollableGridWindow = asGuarded(this._view.findChildByName("palette0"), isIScrollableGridWindow);
        let _loc3_: IScrollableGridWindow = asGuarded(this._view.findChildByName("palette1"), isIScrollableGridWindow);
        if (_loc4_ == null || _loc3_ == null) {
            return;
        }
        let _loc5_: number = this._SafeStr_2835.width;
        let _loc2_: number = (this._SafeStr_2835.width - 10) / 2 | 0;
        if (param1 <= 0) {
            _loc4_.visible = false;
            _loc3_.visible = false;
        } else if (param1 == 1) {
            _loc4_.width = _loc5_;
            _loc4_.visible = true;
            _loc3_.visible = false;
        } else {
            _loc4_.width = _loc2_;
            _loc3_.width = _loc2_;
            _loc3_.x = _loc4_.right + 10;
            _loc4_.visible = true;
            _loc3_.visible = true;
        }
    }

    public updatePart(param1: number, param2: IWindowContainer): void {
        let _loc3_: IWindow = this._SafeStr_2835.getGridItemAt(param1 >>> 0);
        if (!_loc3_) {
            return;
        }
        _loc3_ = param2;
    }

    private onGridItemClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: number = 0;
        switch (param1.target.name) {
            case "REMOVE_ITEM":
                _loc2_ = this._SafeStr_2835.getGridItemIndex(param1.window);
                this._SafeStr_2134.selectPart(this._categoryId, _loc2_);
                break;
            case "GET_MORE":
                this._SafeStr_2134.controller.manager.catalog.openCatalogPage(this._SafeStr_2134.controller.manager.getProperty("catalog.clothes.page"));
                break;
            default:
                _loc2_ = this._SafeStr_2835.getGridItemIndex(param1.window);
                this._SafeStr_2134.selectPart(this._categoryId, _loc2_);
        }
    };

    private paletteEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc5_: number = 0;
        let _loc4_: IItemGridWindow = null;
        let _loc7_: number = 0;
        let _loc3_: IWindow = null;
        let _loc6_: number = 0;
        if (param1.type == "WME_CLICK") {
            _loc3_ = param1.window;
            _loc6_ = 0;
            while (_loc6_ < 2) {
                if (this._SafeStr_2948.length > _loc6_) {
                    _loc4_ = asGuarded(this._SafeStr_2948[_loc6_], isIItemGridWindow);
                    _loc7_ = _loc4_.getGridItemIndex(_loc3_);
                    if (_loc7_ > -1) {
                        this._SafeStr_2134.selectColor(this._categoryId, _loc7_, _loc6_);
                        return;
                    }
                }
                _loc6_++;
            }
        }
    };
}
