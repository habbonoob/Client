import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class ChooserWidgetBase extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chooser::ChooserWidgetBase'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
    }

    public choose(param1: number, param2: number): void {
        let _loc3_: RoomWidgetRoomObjectMessage = new RoomWidgetRoomObjectMessage("RWROM_SELECT_OBJECT", param1, param2);
        this.messageListener.processWidgetMessage(_loc3_);
    }
}
