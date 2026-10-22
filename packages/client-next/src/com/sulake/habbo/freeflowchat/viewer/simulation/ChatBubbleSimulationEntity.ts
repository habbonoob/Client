import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export class ChatBubbleSimulationEntity {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.viewer.simulation::ChatBubbleSimulationEntity'); }

    public static readonly VISUALIZATION_OVERLAP_VERTICAL: number = 10;
    protected readonly MOVE_NEGATIVE_FEEDBACK: number = 0.1;

    declare protected _visualization: PooledChatBubble;

    declare protected _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = NaN; }

    declare protected _y: number;
    static { (this.prototype as any)._y = NaN; }

    protected _visualRect: Rectangle = new Rectangle();
    protected _SafeStr_2190: Rectangle = null;

    declare protected _SafeStr_4609: number;
    static { (this.prototype as any)._SafeStr_4609 = NaN; }

    declare protected _SafeStr_4745: number;
    static { (this.prototype as any)._SafeStr_4745 = NaN; }

    declare protected _SafeStr_14220: number;
    static { (this.prototype as any)._SafeStr_14220 = NaN; }

    protected _SafeStr_14221: boolean = false;
    private readonly _SafeStr_8652: number = 2500;
    private _SafeStr_3801: ChatBubbleSimulationEntity[] = new Array<ChatBubbleSimulationEntity>(0).fill(null);
    private _SafeStr_6741: boolean = false;

    constructor(param1: PooledChatBubble, param2: boolean = false) {
        this._visualization = param1;
        let _loc3_: Rectangle = param1.overlap;
        this._SafeStr_2126 = param1.x + (_loc3_ ? _loc3_.x : 0);
        this._y = param1.y + (_loc3_ ? _loc3_.y : 0);
        this._visualRect.x = this._SafeStr_2126;
        this._visualRect.y = this._y;
        this._visualRect.width = this._visualization.width - (_loc3_ ? _loc3_.x + _loc3_.width : 0);
        this._visualRect.height = this._visualization.displayedHeight - 10 - (_loc3_ ? _loc3_.y + _loc3_.height : 0);
        if (this._visualization.minHeight != -1) {
            this._visualRect.height = this._visualization.minHeight;
        }
        if (param2) {
            this._SafeStr_2190 = new Rectangle();
            this._SafeStr_2190.width = this._visualRect.width + 2 * 2500;
            this._SafeStr_2190.height = this._visualization.minHeight != -1 ? this._visualization.minHeight : this._visualRect.height / 2;
            this._SafeStr_2190.x = this._visualRect.x - 2500;
            this._SafeStr_2190.y = this._visualRect.y;
        }
        this._SafeStr_14220 = this._visualization.scrolledUserPositionX;
    }

    public dispose(): void {
        if (this._visualization) {
            this._visualization.readyToRecycle = true;
        }
        this._visualization = null;
        this._visualRect = null;
        this._SafeStr_3801 = null;
        this._SafeStr_2190 = null;
    }

    public get y(): number {
        return this._y;
    }

    public set y(param1: number) {
        this._y = param1;
        this._visualRect.y = this._y;
        if (this._SafeStr_2190) {
            this._SafeStr_2190.y = this._visualRect.y;
        }
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public set x(param1: number) {
        this._SafeStr_2126 += (param1 - this._SafeStr_2126) * (1 - 0.1);
        this._visualRect.x = this._SafeStr_2126;
        if (this._SafeStr_2190) {
            this._SafeStr_2190.x = this._visualRect.x - 2500;
        }
    }

    public get visualRect(): Rectangle {
        return this._visualRect;
    }

    public get wideRect(): Rectangle {
        return this._SafeStr_2190 ? this._SafeStr_2190 : this._visualRect;
    }

    public get hasWideRect(): boolean {
        return this._SafeStr_2190 != null;
    }

    public get centerX(): number {
        return this._SafeStr_2126 + this._visualRect.width / 2;
    }

    public initializePosition(param1: number, param2: number): void {
        let _loc3_: Rectangle = this._visualization.overlap;
        this._SafeStr_2126 = param1 + (_loc3_ ? _loc3_.x : 0);
        this._y = param2 + (_loc3_ ? _loc3_.y : 0);
        this._visualRect.x = this._SafeStr_2126;
        this._visualRect.y = this._y;
        if (this._SafeStr_2190) {
            this._SafeStr_2190.x = this._visualRect.x - 2500;
            this._SafeStr_2190.y = this._visualRect.y;
        }
    }

    public addHorizontalImpulse(param1: number): void {
        this._SafeStr_4609 += param1;
    }

    public addCollisionHandled(param1: ChatBubbleSimulationEntity): void {
        this._SafeStr_3801.push(param1);
    }

    public hasCollidedWith(param1: ChatBubbleSimulationEntity): boolean {
        return this._SafeStr_3801.indexOf(param1) != -1;
    }

    public addVerticalImpulse(param1: number): void {
        this._SafeStr_4745 += param1;
    }

    public applyImpulseForces(param1: number): void {
        this.x += this._SafeStr_4609;
        this.y += Math.max(this._SafeStr_4745, -param1);
    }

    public resetSimulationStep(): void {
        this._SafeStr_4609 = 0;
        this._SafeStr_4745 = 0;
        this._SafeStr_3801 = new Array<ChatBubbleSimulationEntity>(0).fill(null);
    }

    public syncToVisualization(param1: boolean = false): void {
        let _loc2_: Rectangle = this._visualization.overlap;
        param1 ||= this._SafeStr_14221;
        this._SafeStr_14221 = false;
        if (!param1) {
            this._visualization.moveTo(this._SafeStr_2126 - (_loc2_ ? _loc2_.x : 0) | 0, this._y - (_loc2_ ? _loc2_.y : 0) | 0);
        } else {
            this._visualization.warpTo(this._SafeStr_2126 - (_loc2_ ? _loc2_.x : 0) | 0, this._y - (_loc2_ ? _loc2_.y : 0) | 0);
        }
    }

    public syncToUserScreenPosition(): void {
        let _loc2_: number = this._visualization.scrolledUserPositionX;
        let _loc1_: number = _loc2_ - this._SafeStr_14220;
        if (_loc1_ != 0) {
            this._SafeStr_2126 += _loc1_;
            this._visualRect.x += _loc1_;
            if (this._SafeStr_2190) {
                this._SafeStr_2190.x += _loc1_;
            }
            this._SafeStr_14220 = _loc2_;
            this._SafeStr_14221 = true;
        }
    }

    public set fullHeightCollision(param1: boolean) {
        if (this._SafeStr_2190) {
            this._SafeStr_2190.height = param1 ? this._visualRect.height : this._visualRect.height / 2;
        }
    }

    public get visualizationHasHitMargin(): boolean {
        return this._visualization.hasHitDesktopMargin;
    }

    public set readyToRecycle(param1: boolean) {
        this._visualization.readyToRecycle = param1;
    }

    public get readyToRecycle(): boolean {
        return this._visualization.readyToRecycle;
    }

    public get timeStamp(): number {
        return this._visualization.timeStamp;
    }

    public get isSpacer(): boolean {
        return this._SafeStr_6741;
    }

    public set isSpacer(param1: boolean) {
        this._SafeStr_6741 = param1;
    }

    public intersectsWith(param1: ChatBubbleSimulationEntity): boolean {
        if (this._SafeStr_2190) {
            return this._visualRect.intersects(param1._visualRect) || this._SafeStr_2190.intersects(param1.wideRect);
        }
        if (param1._SafeStr_2190) {
            return this._visualRect.intersects(param1._visualRect) || this._visualRect.intersects(param1._SafeStr_2190);
        }
        return this._visualRect.intersects(param1._visualRect);
    }

    public visualIntertersectsWith(param1: ChatBubbleSimulationEntity): boolean {
        return this._visualRect.intersects(param1._visualRect);
    }
}
