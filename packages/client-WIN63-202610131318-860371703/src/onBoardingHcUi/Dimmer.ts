import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';

export class Dimmer extends Sprite {
    static { registerClassName(this, 'onBoardingHcUi::Dimmer'); }

    declare private _fill: BitmapData;

    constructor() {
        super();
        let _loc4_: number = 0.75;
        let _loc3_: number = 0.06;
        let _loc1_: number = 1 - (1 - _loc4_) * (1 - _loc3_);
        let _loc2_: number = 255 * _loc3_ / _loc1_ >>> 0;
        this._fill = new BitmapData(2, 2, true, (_loc4_ * 255 >>> 0 << 24) >>> 0);
        this._fill.setPixel32(0, 0, (_loc1_ * 255 >>> 0 << 24) + _loc2_ * 65793 >>> 0);
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.addEventListener("removedFromStage", this.onRemovedFromStage);
    }

    private onRemovedFromStage = (param1: Event): void => {
        this.stage.removeEventListener("resize", this.onStageResize);
    };

    private onAddedToStage = (param1: Event): void => {
        this.stage.addEventListener("resize", this.onStageResize);
        this.onStageResize(null);
    };

    private onStageResize = (param1: Event): void => {
        this.graphics.clear();
        this.graphics.beginBitmapFill(this._fill);
        this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.graphics.endFill();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.x = -(this.width / 2 | 0);
        this.y = -(this.height / 2 | 0);
    };
}
