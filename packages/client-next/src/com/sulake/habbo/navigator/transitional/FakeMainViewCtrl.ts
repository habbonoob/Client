import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';
import type { ITransitionalMainViewCtrl } from '@/com/sulake/habbo/navigator/mainview/ITransitionalMainViewCtrl';
import type { TextSearchInputs } from '@/com/sulake/habbo/navigator/TextSearchInputs';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export class FakeMainViewCtrl implements ITransitionalMainViewCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.transitional::FakeMainViewCtrl'); }

    declare private _newNavigator: HabboNewNavigator;

    declare private _oldNavigator: HabboNavigator;

    constructor(param1: HabboNewNavigator, param2: HabboNavigator) {
        this._newNavigator = param1;
        this._oldNavigator = param2;
    }

    public get disposed(): boolean {
        return this._newNavigator == null && this._oldNavigator == null;
    }

    public onNavigatorToolBarIconClick(): void {
        this._newNavigator.toggle();
    }

    public dispose(): void {
        this._newNavigator = null;
        this._oldNavigator = null;
    }

    public open(): void {
        this._newNavigator.open();
    }

    public isOpen(): boolean {
        return false;
    }

    public close(): void {
        this._newNavigator.close();
    }

    public get mainWindow(): IFrameWindow {
        return this._newNavigator.mainWindow;
    }

    public refresh(): void {
        this._newNavigator.refresh();
    }

    public reloadRoomList(param1: number): boolean {
        this._newNavigator.refresh();
        return true;
    }

    private getSearchCodeByLegacySearchType(param1: number): string {
        switch (param1) {
            case 1:
                return "popular";
            case 2:
                return "highest_score";
            case 3:
                return "friends_rooms";
            case 4:
                return "with_friends";
            case 5:
                return "my";
            case 6:
                return "favorites";
            case 7:
                return "history";
            case 8:
                return "query";
            case 9:
                return "query";
            case 10:
                return "query";
            case 11:
                return "official";
            case 12:
                return "new_ads";
            case 13:
                return "groups";
            case 14:
                return "groups";
            case 15:
                return "competition";
            case 16:
                return "top_promotions";
            case 17:
                return "new_ads";
            case 18:
                return "with_rights";
            case 19:
                return "my_groups";
            case 20:
                return "query";
            case 21:
                return "all_categories";
            case 22:
                return "recommended";
            case 23:
                return "history_freq";
            default:
                return "query";
        }
    }

    public startSearch(param1: number, param2: number, param3: string = "-1", param4: number = 1): void {
        this._newNavigator.performSearch(this.getSearchCodeByLegacySearchType(param2), param3);
    }

    public update(param1: number): void {
    }

    public get searchInput(): TextSearchInputs {
        return this._oldNavigator.mainViewCtrl.searchInput;
    }

    public openAtPosition(param1: Point): void {
        return this._newNavigator.open();
    }

    public get isPhaseOneNavigator(): boolean {
        return this._oldNavigator.mainViewCtrl.isPhaseOneNavigator;
    }
}
