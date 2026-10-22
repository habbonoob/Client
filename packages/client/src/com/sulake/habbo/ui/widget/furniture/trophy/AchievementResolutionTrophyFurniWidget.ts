import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetAchievementResolutionTrophyDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetAchievementResolutionTrophyDataUpdateEvent';
import type { ITrophyFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyFurniWidget';
import type { ITrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { TrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class AchievementResolutionTrophyFurniWidget extends RoomWidgetBase implements ITrophyFurniWidget {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.trophy::AchievementResolutionTrophyFurniWidget'); }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration) {
        super(param1, param2, param3, param4);
        this._configuration = param5;
    }

    declare private _date: string;

    declare private _message: string;

    declare private _configuration: ICoreConfiguration;

    declare private _view: ITrophyView;

    declare private _viewType: number;
    static { (this.prototype as any)._viewType = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    public get date(): string {
        return this._date;
    }

    public get message(): string {
        return this._message;
    }

    public get configuration(): ICoreConfiguration {
        return this._configuration;
    }

    public override dispose(): void {
        if (this._view) {
            this._view.dispose();
            this._view = null;
        }
        this._configuration = null;
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWARTDUE_TROPHY_DATA", this.onObjectUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWARTDUE_TROPHY_DATA", this.onObjectUpdate);
    }

    private updateInterface(): void {
        if (this._view != null) {
            this._view.dispose();
        }
        let _loc1_: number = this._viewType;
        this._view = new TrophyView(this);
        this._view.showInterface();
    }

    private onObjectUpdate = (param1: RoomWidgetAchievementResolutionTrophyDataUpdateEvent): void => {
        this._name = param1.name;
        this._date = param1.date;
        this._message = param1.message;
        this._color = param1.color - 1 | 0;
        this._viewType = param1.viewType;
        if (this._color < 0 || this._color > 2) {
            this._color = 0;
        }
        this.updateInterface();
    };
}
