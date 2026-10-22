import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomWidgetPollUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPollUpdateEvent';
import { PollSession } from '@/com/sulake/habbo/ui/widget/poll/PollSession';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class PollWidget extends RoomWidgetBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.poll::PollWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        PollWidget.#initStatics();
        return PollWidget._log;
    }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary = null, param4: IHabboLocalizationManager = null) {
        super(param1, param2, param3, param4);
        this._SafeStr_2599 = new UtilsMap();
    }

    declare private _SafeStr_2599: UtilsMap;

    public override dispose(): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: PollSession = null;
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2599 != null) {
            _loc2_ = this._SafeStr_2599.length | 0;
            _loc3_ = 0;
            while (_loc3_ < _loc2_) {
                _loc1_ = asInstanceOf(this._SafeStr_2599.getWithIndex(0), PollSession);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc3_++;
            }
            this._SafeStr_2599.dispose();
            this._SafeStr_2599 = null;
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWPUW_OFFER", this.showPollOffer);
        param1.addEventListener("RWPUW_ERROR", this.showPollError);
        param1.addEventListener("RWPUW_CONTENT", this.showPollContent);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWPUW_OFFER", this.showPollOffer);
        param1.removeEventListener("RWPUW_ERROR", this.showPollError);
        param1.removeEventListener("RWPUW_CONTENT", this.showPollContent);
    }

    public pollFinished(param1: number): void {
        let _loc2_: PollSession = asInstanceOf(this._SafeStr_2599.getValue(param1), PollSession);
        if (_loc2_ != null) {
            _loc2_.showThanks();
            _loc2_.dispose();
            this._SafeStr_2599.remove(param1);
        }
    }

    public pollCancelled(param1: number): void {
        let _loc2_: PollSession = asInstanceOf(this._SafeStr_2599.getValue(param1), PollSession);
        if (_loc2_ != null) {
            _loc2_.dispose();
            this._SafeStr_2599.remove(param1);
        }
    }

    private showPollOffer = (param1: Event): void => {
        let _loc4_: number = castTo(param1, RoomWidgetPollUpdateEvent).id;
        let _loc3_: PollSession = asInstanceOf(this._SafeStr_2599.getValue(_loc4_), PollSession);
        let _loc2_: string = castTo(param1, RoomWidgetPollUpdateEvent).summary;
        let _loc5_: string = castTo(param1, RoomWidgetPollUpdateEvent).headline;
        if (!_loc3_) {
            _loc3_ = new PollSession(_loc4_, this);
            this._SafeStr_2599.add(_loc4_, _loc3_);
            _loc3_.showOffer(_loc5_, _loc2_);
        } else {
            PollWidget._log.info("Poll with given id already exists!");
            _loc3_.showOffer(_loc5_, _loc2_);
        }
    };

    private showPollError = (param1: Event): void => {
        let e: Event = param1;
        this.windowManager.alert("${win_error}", castTo(e, RoomWidgetPollUpdateEvent).summary, 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                param1.dispose();
            });
    };

    private showPollContent = (param1: Event): void => {
        let _loc4_: number = 0;
        let _loc2_: PollSession = null;
        let _loc3_: RoomWidgetPollUpdateEvent = param1 instanceof RoomWidgetPollUpdateEvent ? param1 : null;
        if (_loc3_ != null) {
            _loc4_ = _loc3_.id;
            _loc2_ = asInstanceOf(this._SafeStr_2599.getValue(_loc4_), PollSession);
            if (_loc2_ != null) {
                _loc2_.showContent(_loc3_.startMessage, _loc3_.endMessage, _loc3_.questionArray, _loc3_.npsPoll);
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PollWidget.#staticsReady) return;
        PollWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PollWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.poll.PollWidget"));
    }
}
