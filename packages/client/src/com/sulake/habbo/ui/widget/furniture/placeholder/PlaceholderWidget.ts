import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetShowPlaceholderEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetShowPlaceholderEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { PlaceholderView } from '@/com/sulake/habbo/ui/widget/furniture/placeholder/PlaceholderView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class PlaceholderWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.placeholder::PlaceholderWidget'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
    }

    declare private _view: PlaceholderView;

    public override dispose(): void {
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWSPE_SHOW_PLACEHOLDER", this.onShowEvent);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWSPE_SHOW_PLACEHOLDER", this.onShowEvent);
    }

    private showInterface(): void {
        if (this._view == null) {
            this._view = new PlaceholderView(this.assets, this.windowManager);
        }
        this._view.showWindow();
    }

    private hideInterface(): void {
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
    }

    private onShowEvent = (param1: RoomWidgetShowPlaceholderEvent): void => {
        this.showInterface();
    };
}
