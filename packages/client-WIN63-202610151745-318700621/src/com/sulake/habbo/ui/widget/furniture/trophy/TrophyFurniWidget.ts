import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetTrophyDataUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetTrophyDataUpdateEvent';
import type { ITrophyFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyFurniWidget';
import type { ITrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { NikoTrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/NikoTrophyView';
import { TrophyTheme } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyTheme';
import { TrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyView';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';

export class TrophyFurniWidget extends RoomWidgetBase implements ITrophyFurniWidget {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.trophy::TrophyFurniWidget'); }

    public static readonly VIEW_NIKO_SILVER: number = 10;
    public static readonly VIEW_NIKO_GOLD: number = 20;

    declare private _name: string;

    declare private _date: string;

    declare private _message: string;

    private _backgroundTheme: number = 0;

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
        return 16777215;
    }

    public get frameTitle(): string {
        return this.localizations.getLocalization("widget.furni.trophy.title", "Trophy");
    }

    public get headerColor(): number {
        return TrophyTheme.getHeaderColor(this._backgroundTheme);
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
        param1.addEventListener("RWTDUE_TROPHY_DATA", this.onObjectUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWTDUE_TROPHY_DATA", this.onObjectUpdate);
    }

    private onObjectUpdate = (param1: RoomWidgetTrophyDataUpdateEvent): void => {
        this._name = param1.name;
        this._date = param1.date;
        this._message = param1.message;
        this._backgroundTheme = TrophyTheme.normalize(param1.color - 1 | 0);
        this._viewType = param1.viewType;
        this.updateInterface();
    };

    private updateInterface(): void {
        if (this._view != null) {
            this._view.dispose();
        }
        switch (this._viewType - 10) {
            case 0:
            case 10:
                this._view = new NikoTrophyView(this, this._viewType);
                break;
            default:
                this._view = new TrophyView(this);
        }
        this._view.showInterface();
    }
}
