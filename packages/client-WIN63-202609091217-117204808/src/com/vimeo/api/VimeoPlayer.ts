import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { Security } from '@habbo-pixi/runtime/system/Security';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

export class VimeoPlayer extends Sprite {
    static { registerClassName(this, 'com.vimeo.api::VimeoPlayer'); }

    private container: Sprite = new Sprite();
    private _SafeStr_2372: any = false;
    private _SafeStr_3844: Sprite = new Sprite();
    private player_width: number = 400;
    private player_height: number = 300;
    private _SafeStr_7321: number = 2;
    private load_timer: Timer = new Timer(200);

    constructor(param1: string, param2: number, param3: number, param4: number, param5: string = "10", param6: number = 2) {
        super();
        this.setDimensions(param3, param4);
        Security.allowDomain("vimeo.com");
        Security.allowDomain("api.vimeo.com");
        let _loc10_: string = "&js_api=1";
        this._SafeStr_7321 = param6;
        if (param5 != "9") {
            switch (param6 - 2) {
                case 0:
                    _loc10_ = "&api=1";
            }
        } else {
            this._SafeStr_7321 = 1;
        }
        let _loc7_: URLRequest = new URLRequest("http://api.vimeo.com/moogaloop_api.swf?oauth_key=" + param1 + "&clip_id=" + param2 + "&width=" + param3 + "&height=" + param4 + "&fullscreen=0&fp_version=" + param5 + _loc10_ + "&cache_buster=" + Math.random() * 1000);
        let _loc8_: LoaderContext = new LoaderContext(true);
        let _loc9_: Loader = new Loader();
        _loc9_.contentLoaderInfo.addEventListener("complete", this.onComplete, false, 0, true);
        _loc9_.load(_loc7_, _loc8_);
        this.addEventListener("addedToStage", this.addedToStageHandler, false, 0, true);
    }

    public destroy(): void {
        if (this._SafeStr_2372 == null) {
            return;
        }
        if (this._SafeStr_2372["destroy"] != undefined) {
            this._SafeStr_2372.destroy();
        }
        if (this.container.contains(castTo(this._SafeStr_2372, DisplayObject))) {
            this.container.removeChild(castTo(this._SafeStr_2372, DisplayObject));
        }
        if (this.contains(this._SafeStr_3844)) {
            this.removeChild(this._SafeStr_3844);
        }
        if (this.contains(this.container)) {
            this.removeChild(this.container);
        }
        this.stage.removeEventListener("mouseMove", this.mouseMove);
    }

    private setDimensions(param1: number, param2: number): void {
        this.player_width = param1;
        this.player_height = param2;
    }

    private onComplete = (param1: Event): void => {
        this.container.addChild(param1.currentTarget.loader.content);
        this._SafeStr_2372 = param1.currentTarget.loader.content;
        this.addChild(this._SafeStr_3844);
        this.container.mask = this._SafeStr_3844;
        this.addChild(this.container);
        this.redrawMask();
        this.load_timer.addEventListener("timer", this.playerLoadedCheck);
        this.load_timer.start();
    };

    private playerLoadedCheck = (param1: TimerEvent): void => {
        if (this._SafeStr_2372.player_loaded) {
            this.load_timer.stop();
            this.load_timer.removeEventListener("timer", this.playerLoadedCheck);
            this._SafeStr_2372.disableMouseMove();
            if (this.stage) {
                this.stage.addEventListener("mouseMove", this.mouseMove, false, 0, true);
            }
            this.dispatchEvent(new Event("complete"));
        }
    };

    private mouseMove = (param1: Event): void => {
        let _loc2_: Point = null;
        let _loc3_: MouseEvent = param1 instanceof MouseEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        if (this._SafeStr_2372 && this._SafeStr_2372.player_loaded) {
            _loc2_ = this.parent.localToGlobal(new Point(this.x, this.y));
            if (_loc3_.stageX >= _loc2_.x && _loc3_.stageX <= _loc2_.x + this.player_width && _loc3_.stageY >= _loc2_.y && _loc3_.stageY <= _loc2_.y + this.player_height) {
                this._SafeStr_2372.mouseMove(_loc3_);
            } else {
                this._SafeStr_2372.mouseOut();
            }
        }
    };

    private redrawMask(): void {
        const $with1 = this._SafeStr_3844.graphics;
        {
            $with1.beginFill(0, 1);
            $with1.drawRect(this.container.x, this.container.y, this.player_width, this.player_height);
            $with1.endFill();
        }
    }

    public play(): void {
        this._SafeStr_2372.play();
    }

    public pause(): void {
        this._SafeStr_2372.pause();
    }

    public getDuration(): number {
        return this._SafeStr_2372.duration | 0;
    }

    public seekTo(param1: number): void {
        this._SafeStr_2372.seek(param1);
    }

    public changeColor(param1: string): void {
        this._SafeStr_2372.color = Number("0x" + param1) >>> 0;
    }

    public loadVideo(param1: number): void {
        this._SafeStr_2372.loadVideo(param1);
    }

    public setSize(param1: number, param2: number): void {
        this.setDimensions(param1, param2);
        this._SafeStr_2372.setSize(param1, param2);
        this.redrawMask();
    }

    private addedToStageHandler = (param1: Event): void => {
        this.stage.addEventListener("mouseMove", this.mouseMove);
        this.addEventListener("removedFromStage", this.removedFromStageHandler, false, 0, true);
    };

    private removedFromStageHandler = (param1: Event): void => {
        this.stage.removeEventListener("mouseMove", this.mouseMove);
        this.removeEventListener("removedFromStage", this.removedFromStageHandler);
    };
}
