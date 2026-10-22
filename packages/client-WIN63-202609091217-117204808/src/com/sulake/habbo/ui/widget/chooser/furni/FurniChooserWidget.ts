import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { ChooserItem } from '@/com/sulake/habbo/ui/widget/chooser/ChooserItem';
import type { RoomWidgetChooserContentEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChooserContentEvent';
import type { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { ChooserWidgetBase } from '@/com/sulake/habbo/ui/widget/chooser/ChooserWidgetBase';
import { FurniView__com_sulake_habbo_ui_widget_chooser_furni as FurniView } from '@/com/sulake/habbo/ui/widget/chooser/furni/FurniChooserTableObject.group';
import { RoomWidgetRequestWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRequestWidgetMessage';

export class FurniChooserWidget extends ChooserWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser.furni::FurniChooserWidget'); }

    declare private _SafeStr_2757: FurniView;

    declare private _items: any[];

    declare private _SafeStr_4346: Map<any, any>;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
    }

    public override dispose(): void {
        if (this._SafeStr_2757 != null) {
            this._SafeStr_2757.dispose();
            this._SafeStr_2757 = null;
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWCCE_FURNI_CHOOSER_CONTENT", this.onChooserContent);
        param1.addEventListener("RWCCE_FURNI_CHOOSER_CONTENT_ADD", this.onChooserContentAdded);
        param1.addEventListener("RWROUE_FURNI_REMOVED", this.onUpdateFurniChooser);
        param1.addEventListener("RWROUE_FURNI_ADDED", this.onUpdateFurniChooser);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWCCE_FURNI_CHOOSER_CONTENT", this.onChooserContent);
        param1.removeEventListener("RWCCE_FURNI_CHOOSER_CONTENT_ADD", this.onChooserContentAdded);
        param1.removeEventListener("RWROUE_FURNI_REMOVED", this.onUpdateFurniChooser);
        param1.removeEventListener("RWROUE_FURNI_ADDED", this.onUpdateFurniChooser);
    }

    private onChooserContent = (param1: RoomWidgetChooserContentEvent): void => {
        if (param1 == null || param1.items == null) {
            return;
        }
        if (this._SafeStr_2757 == null) {
            this._SafeStr_2757 = new FurniView(this, "${widget.chooser.furni.title}");
        }
        this._items = [];
        this._SafeStr_4346 = new Dictionary();
        for (const _loc2_ of param1.items ?? []) {
            if (_loc2_.id > 0) {
                this._items.push(_loc2_);
                this._SafeStr_4346.set(_loc2_.id, true);
            }
        }
        this._items.sort((a, b) => (String(a.lowerCaseName) < String(b.lowerCaseName) ? -1 : String(a.lowerCaseName) > String(b.lowerCaseName) ? 1 : 0) || a.id - b.id);
        this._SafeStr_2757.onItemsChanged();
    };

    private onChooserContentAdded = (param1: RoomWidgetChooserContentEvent): void => {
        if (param1 == null || param1.items == null || this._SafeStr_2757 == null || this._items == null) {
            return;
        }
        let _loc3_: boolean = false;
        for (const _loc2_ of param1.items ?? []) {
            if (_loc2_.id > 0 && !(this._SafeStr_4346.has(_loc2_.id))) {
                this._items.push(_loc2_);
                this._SafeStr_4346.set(_loc2_.id, true);
                _loc3_ = true;
            }
        }
        if (_loc3_) {
            this._SafeStr_2757.onItemsChanged();
        }
    };

    public get items(): any[] {
        return this._items;
    }

    private onUpdateFurniChooser = (param1: RoomWidgetRoomObjectUpdateEvent): void => {
        let _loc3_: number = 0;
        let _loc2_: ChooserItem = null;
        let _loc4_: RoomWidgetRequestWidgetMessage = null;
        if (this._SafeStr_2757 == null || !this._SafeStr_2757.isOpen()) {
            return;
        }
        if (param1.type == "RWROUE_FURNI_REMOVED") {
            if (this._items != null) {
                _loc3_ = 0;
                while (_loc3_ < this._items.length) {
                    _loc2_ = this._items[_loc3_];
                    if (_loc2_.id == param1.id && _loc2_.category == param1.category) {
                        this._items.splice(_loc3_, 1)[0];
                        this._SafeStr_4346.delete(_loc2_.id);
                        this._SafeStr_2757.onItemsChanged();
                        return;
                    }
                    _loc3_ += 1;
                }
            }
        } else if (param1.type == "RWROUE_FURNI_ADDED") {
            _loc4_ = new RoomWidgetRequestWidgetMessage("RWRWM_FURNI_CHOOSER_ADD", param1.id, param1.category);
            this.messageListener.processWidgetMessage(_loc4_);
        }
    };
}
