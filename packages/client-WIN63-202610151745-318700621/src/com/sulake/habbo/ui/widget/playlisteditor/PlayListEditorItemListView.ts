import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { PlayListEditorWidget } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorWidget';
import type { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { PlayListEditorItem } from '@/com/sulake/habbo/ui/widget/playlisteditor/PlayListEditorItem';

export class PlayListEditorItemListView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.playlisteditor::PlayListEditorItemListView'); }

    declare private _SafeStr_3484: IItemListWindow;

    declare private _items: any[];

    declare private _widget: PlayListEditorWidget;

    declare private _selectedItem: PlayListEditorItem;

    private _selectedItemIndex: number = -1;
    private _SafeStr_3949: number = -1;

    constructor(param1: PlayListEditorWidget, param2: IItemListWindow) {
        this._SafeStr_3484 = param2;
        this._widget = param1;
        this._selectedItem = null;
    }

    public get selectedItemIndex(): number {
        return this._selectedItemIndex;
    }

    public destroy(): void {
        if (this._SafeStr_3484 == null) {
            return;
        }
        this._SafeStr_3484.destroyListItems();
    }

    public refresh(param1: any[], param2: number): void {
        let _loc3_: string = null;
        let _loc7_: string = null;
        let _loc5_: ColorTransform = null;
        let _loc4_: PlayListEditorItem = null;
        if (this._SafeStr_3484 == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        this._SafeStr_3949 = -1;
        this._items = [];
        this._SafeStr_3484.destroyListItems();
        for (const _loc6_ of param1 ?? []) {
            _loc3_ = stringOrNull(_loc6_.name);
            _loc7_ = stringOrNull(_loc6_.creator);
            _loc5_ = this._widget.getDiskColorTransformFromSongData(stringOrNull(_loc6_.songData));
            _loc4_ = new PlayListEditorItem(this._widget, _loc3_, _loc7_, _loc5_);
            _loc4_.window.procedure = this.itemEventProc;
            _loc4_.removeButton.procedure = this.itemEventProc;
            this._SafeStr_3484.addListItem(_loc4_.window);
            this._items.push(_loc4_);
        }
        this.setItemIndexPlaying(param2);
    }

    public setItemIndexPlaying(param1: number): void {
        let _loc2_: PlayListEditorItem = null;
        if (this._items == null) {
            return;
        }
        if (param1 < 0) {
            for (const _loc3_ of this._items ?? []) {
                _loc3_.setIconState("PLEI_ICON_STATE_NORMAL");
            }
            return;
        }
        if (param1 >= this._items.length) {
            return;
        }
        if (this._SafeStr_3949 >= 0 && this._SafeStr_3949 < this._items.length) {
            _loc2_ = asInstanceOf(this._items[this._SafeStr_3949], PlayListEditorItem);
            _loc2_.setIconState("PLEI_ICON_STATE_NORMAL");
        }
        _loc2_ = asInstanceOf(this._items[param1], PlayListEditorItem);
        _loc2_.setIconState("PLEI_ICON_STATE_PLAYING");
        this._SafeStr_3949 = param1;
    }

    public deselectAny(): void {
        if (this._selectedItem != null) {
            this._selectedItem.deselect();
            this._selectedItem = null;
            this._selectedItemIndex = -1;
        }
    }

    private itemEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: number = 0;
        let _loc3_: boolean = param1.type == "WME_DOUBLE_CLICK";
        if (param1.type == "WME_CLICK" || _loc3_) {
            if (param2.name == "button_remove_from_playlist" || _loc3_) {
                if (this._selectedItem != null) {
                    this._selectedItem.deselect();
                }
                if (this._selectedItemIndex > -1) {
                    this._widget.sendRemoveFromPlayListMessage(this._selectedItemIndex);
                }
                this._selectedItem = null;
                this._selectedItemIndex = -1;
            } else {
                if (this._selectedItem != null) {
                    this._selectedItem.deselect();
                }
                _loc4_ = this._SafeStr_3484.getListItemIndex(param1.window);
                if (_loc4_ != -1) {
                    this._selectedItemIndex = _loc4_;
                    this._selectedItem = this._items[_loc4_];
                    this._selectedItem.select();
                    if (param2.name == "button_remove_from_playlist") {
                        this._widget.sendRemoveFromPlayListMessage(_loc4_);
                    }
                    if (this._widget.mainWindowHandler != null) {
                        this._widget.mainWindowHandler.musicInventoryView.deselectAny();
                    }
                }
            }
        }
    };
}
