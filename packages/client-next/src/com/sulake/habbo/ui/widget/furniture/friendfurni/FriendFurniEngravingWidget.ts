import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { FriendFurniEngravingView } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniEngravingView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { FriendFurniEngravingWidgetHandler } from '@/com/sulake/habbo/ui/handler/FriendFurniEngravingWidgetHandler';
import { HabboweenEngravingView } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/HabboweenEngravingView';
import { LoveLockEngravingView } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/LoveLockEngravingView';
import { WildWestEngravingView } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/WildWestEngravingView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class FriendFurniEngravingWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.friendfurni::FriendFurniEngravingWidget'); }

    private _stuffId: number = -1;

    declare private _SafeStr_3047: FriendFurniEngravingView;

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager) {
        super(param1, param2, param3, param4);
        this.engravingWidgetHandler.widget = this;
    }

    public get stuffId(): number {
        return this._stuffId;
    }

    public get engravingWidgetHandler(): FriendFurniEngravingWidgetHandler {
        return this._SafeStr_2143 instanceof FriendFurniEngravingWidgetHandler ? this._SafeStr_2143 : null;
    }

    public open(param1: number, param2: number, param3: StringArrayStuffData): void {
        this.close(this._stuffId);
        this._stuffId = param1;
        switch (param2) {
            case 0:
                this._SafeStr_3047 = new LoveLockEngravingView(this, param3);
                break;
            case 1:
            case 2:
                break;
            case 3:
                this._SafeStr_3047 = new WildWestEngravingView(this, param3);
                break;
            case 4:
                this._SafeStr_3047 = new HabboweenEngravingView(this, param3);
        }
        this._SafeStr_3047.open();
    }

    public close(param1: number): void {
        if (param1 == this._stuffId && this._SafeStr_3047) {
            this._SafeStr_3047.dispose();
            this._SafeStr_3047 = null;
            this._stuffId = -1;
        }
    }
}
