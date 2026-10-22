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
import { TrophyTheme } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyTheme';
import { TrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class AchievementResolutionTrophyFurniWidget extends RoomWidgetBase implements ITrophyFurniWidget {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.trophy::AchievementResolutionTrophyFurniWidget'); }

    declare private _name: string;

    declare private _date: string;

    declare private _message: string;

    declare private _frameTitle: string;

    private _headerColor: number = TrophyTheme.getHeaderColor(0);
    private _backgroundTheme: number = 0;
    private _backgroundColor: number = 16777215;

    declare private _configuration: ICoreConfiguration;

    declare private _view: ITrophyView;

    declare private _viewType: number;
    static { (this.prototype as any)._viewType = 0; }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration) {
        super(param1, param2, param3, param4);
        this._configuration = param5;
    }

    public get name(): string {
        return this._name;
    }

    public get date(): string {
        return this._date;
    }

    public get message(): string {
        return this._message;
    }

    public get color(): number {
        return this._backgroundColor | 0;
    }

    public get frameTitle(): string {
        return this._frameTitle;
    }

    public get headerColor(): number {
        return this._headerColor;
    }

    public get backgroundTheme(): number {
        return this._backgroundTheme;
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

    private onObjectUpdate = (param1: RoomWidgetAchievementResolutionTrophyDataUpdateEvent): void => {
        this._name = param1.name;
        this._date = param1.date;
        this._message = param1.message;
        this._viewType = param1.viewType;
        this._backgroundTheme = TrophyTheme.normalize(param1.backgroundTheme >= 0 ? param1.backgroundTheme : (param1.color | 0) - 1);
        this._frameTitle = param1.frameTitle != "" ? param1.frameTitle : this.localizations.getLocalization("widget.furni.trophy.title", "Trophy");
        this._headerColor = param1.headerColor != 0 ? param1.headerColor : TrophyTheme.getHeaderColor(this._backgroundTheme);
        this._backgroundColor = (param1.backgroundColor != 0 ? param1.backgroundColor : 16777215) >>> 0;
        this.updateInterface();
    };

    private updateInterface(): void {
        if (this._view != null) {
            this._view.dispose();
        }
        let _loc1_: number = this._viewType;
        this._view = new TrophyView(this);
        this._view.showInterface();
    }
}
