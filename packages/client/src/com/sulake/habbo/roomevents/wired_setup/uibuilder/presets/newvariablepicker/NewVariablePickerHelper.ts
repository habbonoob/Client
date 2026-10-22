import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';

export class NewVariablePickerHelper {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker::NewVariablePickerHelper'); }

    private static MAX_HISTORY: number = 20;

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        this._SafeStr_4192 = new UtilsMap();
        this._windowTemplates = new UtilsMap();
        this._SafeStr_4122 = new UtilsMap();
    }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _SafeStr_4122: UtilsMap;

    declare private _windowTemplates: UtilsMap;

    declare private _SafeStr_4192: UtilsMap;

    public addToHistory(param1: WiredVariable): void {
        let _loc3_: number = param1.variableTarget;
        let _loc5_: string = param1.variableId;
        let _loc6_: number = this._roomEvents.roomId;
        if (_loc6_ == 0) {
            return;
        }
        if (!this._SafeStr_4122.hasKey(_loc6_)) {
            this._SafeStr_4122.add(_loc6_, new UtilsMap());
        }
        let _loc2_: UtilsMap = this._SafeStr_4122.getValue(_loc6_);
        if (!_loc2_.hasKey(_loc3_)) {
            _loc2_.add(_loc3_, []);
        }
        let _loc4_: string[] = _loc2_.getValue(_loc3_);
        let _loc7_: number = _loc4_.indexOf(_loc5_);
        if (_loc7_ >= 0) {
            _loc4_.splice(_loc7_, 1)[0];
        }
        _loc4_.splice(0, 0, _loc5_);
        if (_loc4_.length > NewVariablePickerHelper.MAX_HISTORY) {
            _loc4_.pop();
        }
    }

    public getHistory(param1: number): string[] {
        let _loc3_: number = this._roomEvents.roomId;
        if (_loc3_ == 0) {
            return Array.from([]);
        }
        if (!this._SafeStr_4122.hasKey(_loc3_)) {
            return Array.from([]);
        }
        let _loc2_: UtilsMap = this._SafeStr_4122.getValue(_loc3_);
        if (!_loc2_.hasKey(param1)) {
            return Array.from([]);
        }
        return _loc2_.getValue(param1);
    }

    public acquireNodeView(param1: WiredStyle): IRegionWindow {
        let _loc3_: any = undefined;
        let _loc4_: IWindow = null;
        if (this._SafeStr_4192.hasKey(param1)) {
            _loc3_ = this._SafeStr_4192.getValue(param1);
            if (_loc3_.length > 0) {
                return _loc3_.pop();
            }
        }
        if (!this._windowTemplates.hasKey(param1)) {
            _loc4_ = this._roomEvents.wiredCtrl.presetManager.createLayout("search_tree_dropdown");
            this._windowTemplates.add(param1, _loc4_.findChildByName("node_template"));
        }
        let _loc2_: IRegionWindow = this._windowTemplates.getValue(param1);
        return asGuarded(_loc2_.clone(), isIRegionWindow);
    }

    public releaseNodeView(param1: WiredStyle, param2: IRegionWindow): void {
        if (!this._SafeStr_4192.hasKey(param1)) {
            this._SafeStr_4192.add(param1, []);
        }
        this._SafeStr_4192.getValue(param1).push(param2);
    }
}
