import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { BackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/BackgroundObject';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MovingBackgroundObjectType } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/MovingBackgroundObjectType';

export class MovingBackgroundObjects implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout::MovingBackgroundObjects'); }

    private static readonly MAX_OBJECTS: number = 20;

    declare private _landingView: HabboLandingView;

    private _SafeStr_2502: any[] = [];
    private _SafeStr_3232: UtilsMap = new UtilsMap();
    private _events: EventDispatcher = new EventDispatcher();
    private _timingCode: string = "";

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
        this.initializeObjectTypeMapping();
    }

    private initializeObjectTypeMapping(): void {
        this._SafeStr_3232.add("line", MovingBackgroundObjectType.CLASS_LINEAR);
        this._SafeStr_3232.add("spiral", MovingBackgroundObjectType.CLASS_SPIRAL);
        this._SafeStr_3232.add("animated", MovingBackgroundObjectType.CLASS_STATIC_ANIMATED);
        this._SafeStr_3232.add("randomwalk", MovingBackgroundObjectType.CLASS_RANDOM_WALK);
    }

    public dispose(): void {
        this._landingView = null;
        for (const _loc1_ of this._SafeStr_2502 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_2502 = null;
        this._SafeStr_3232.reset();
        this._SafeStr_3232 = null;
        this._events = null;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public initialize(param1: IWindowContainer): void {
        let _loc4_: number = 0;
        let _loc2_: string = null;
        let _loc3_: BackgroundObject = null;
        param1 = castGuarded(param1.findChildByName("moving_objects_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (param1 == null) {
            return;
        }
        if (this._SafeStr_2502.length > 0) {
            return;
        }
        _loc4_ = 1;
        while (_loc4_ <= 20) {
            if (this._timingCode == "") {
                _loc2_ = this._landingView.getProperty("landing.view.bgobject." + _loc4_);
            } else {
                _loc2_ = this._landingView.getProperty("landing.view." + this._timingCode + ".bgobject." + _loc4_);
            }
            if (_loc2_ != "") {
                _loc3_ = this.getObjectByDataContent(_loc4_, _loc2_, param1);
                if (_loc3_ != null) {
                    this._SafeStr_2502.push(_loc3_);
                }
            }
            _loc4_++;
        }
    }

    public update(param1: number): void {
        for (const _loc2_ of this._SafeStr_2502 ?? []) {
            _loc2_.update(param1);
        }
    }

    private getObjectByDataContent(param1: number, param2: string, param3: IWindowContainer): BackgroundObject {
        let _loc6_: string = null;
        let _loc5_: any = null;
        let _loc4_: any[] = param2.split(";");
        if (_loc4_.length >= 2) {
            _loc6_ = stringOrNull(_loc4_[1]);
            _loc5_ = this._SafeStr_3232.getValue(_loc6_);
            if (_loc5_ != null) {
                return new _loc5_(param1, param3, this._events, this._landingView, param2);
            }
        }
        return null;
    }

    public set timingCode(param1: string) {
        this._timingCode = param1;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
