import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ChatBubbleSimulationEntity } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatBubbleSimulationEntity';

export class ChatBubbleSimulationWithLimitedWideRect extends ChatBubbleSimulationEntity {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.simulation::ChatBubbleSimulationWithLimitedWideRect'); }

    public static readonly WIDERECT_WIDTH: number = 240;

    constructor(param1: PooledChatBubble) {
        super(param1, false);
        this._SafeStr_2190 = new Rectangle();
        this._SafeStr_2190.width = 240;
        this._SafeStr_2190.height = this._visualRect.height / 2;
        this._wideRectOffset = -(240 - this._visualRect.width) / 2;
        this._SafeStr_2190.x = this._visualRect.x + this._wideRectOffset;
        this._SafeStr_2190.y = this._visualRect.y;
    }

    public override set x(param1: number) {
        this._SafeStr_2126 += (param1 - this._SafeStr_2126) * (1 - 0.1);
        this._visualRect.x = this._SafeStr_2126;
        if (this._SafeStr_2190) {
            this._SafeStr_2190.x = this._visualRect.x + this._wideRectOffset;
        }
    }

    declare private _wideRectOffset: number;
    static { (this.prototype as any)._wideRectOffset = NaN; }

    public get wideRectOffset(): number {
        return this._wideRectOffset;
    }

    public set wideRectOffset(param1: number) {
        this._wideRectOffset = param1;
    }

    public override initializePosition(param1: number, param2: number): void {
        let _loc3_: Rectangle = this._visualization.overlap;
        this._SafeStr_2126 = param1 + (_loc3_ ? _loc3_.x : 0);
        this._y = param2 + (_loc3_ ? _loc3_.y : 0);
        this._visualRect.x = this._SafeStr_2126;
        this._visualRect.y = this._y;
        if (this._SafeStr_2190) {
            this._SafeStr_2190.x = this._visualRect.x + this._wideRectOffset;
            this._SafeStr_2190.y = this._visualRect.y;
        }
    }

    public override get x(): number {
        return super.x;
    }
}
