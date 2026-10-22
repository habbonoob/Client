import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import type { ITabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/ITabPageDecorator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class SearchTabPageDecorator implements ITabPageDecorator {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview.tabpagedecorators::SearchTabPageDecorator'); }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNavigator;

    public get filterCategory(): string {
        return null;
    }

    public refreshCustomContent(param1: IWindowContainer): void {
        this.refreshRoomCompetitionsHeader(param1);
    }

    public tabSelected(): void {
    }

    public refreshFooter(param1: IWindowContainer): void {
    }

    public navigatorOpenedWhileInTab(): void {
        this._navigator.mainViewCtrl.open();
    }

    public setSubSelection(param1: number): void {
    }

    public processSearchParam(param1: string): string {
        return param1;
    }

    private refreshRoomCompetitionsHeader(param1: IWindowContainer): void {
        let _loc2_: IWindowContainer = asGuarded(param1.getChildByName("room_competitions_header"), isIWindowContainer);
        if (this._navigator.data == null || this._navigator.data.competitionRoomsData == null) {
            _loc2_.visible = false;
            return;
        }
        let _loc6_: number = this._navigator.data.competitionRoomsData.pageIndex;
        let _loc4_: number = this._navigator.data.competitionRoomsData.pageCount;
        let _loc5_: number = _loc6_ + 1;
        if (_loc4_ < 2) {
            _loc2_.visible = false;
            return;
        }
        _loc2_.visible = true;
        this._navigator.registerParameter("navigator.roomcompetitionspager", "page", "" + _loc5_);
        this._navigator.registerParameter("navigator.roomcompetitionspager", "total", "" + _loc4_);
        let _loc3_: IWindow = _loc2_.findChildByName("next_button");
        let _loc7_: IWindow = _loc2_.findChildByName("prev_button");
        _loc3_.visible = _loc5_ < _loc4_;
        _loc7_.visible = _loc5_ > 1;
        _loc3_.procedure = this.onNextButton;
        _loc7_.procedure = this.onPrevButton;
    }

    private onNextButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && this._navigator.data.competitionRoomsData != null) {
            this._navigator.performCompetitionRoomsSearch(this._navigator.data.competitionRoomsData.goalId, this._navigator.data.competitionRoomsData.pageIndex + 1);
        }
    };

    private onPrevButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK" && this._navigator.data.competitionRoomsData != null) {
            this._navigator.performCompetitionRoomsSearch(this._navigator.data.competitionRoomsData.goalId, this._navigator.data.competitionRoomsData.pageIndex - 1);
        }
    };
}
