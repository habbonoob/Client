import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';

const cloud_1_1_png_pngAsset = embedBitmap("friendbar/cloud_1_1_png.png");
const cloud_1_2_png_pngAsset = embedBitmap("friendbar/cloud_1_2_png.png");
const cloud_1_3_png_pngAsset = embedBitmap("friendbar/cloud_1_3_png.png");
const cloud_1_4_png_pngAsset = embedBitmap("friendbar/cloud_1_4_png.png");
const cloud_2_1_png_pngAsset = embedBitmap("friendbar/cloud_2_1_png.png");
const cloud_2_2_png_pngAsset = embedBitmap("friendbar/cloud_2_2_png.png");
const cloud_2_3_png_pngAsset = embedBitmap("friendbar/cloud_2_3_png.png");
const cloud_2_4_png_pngAsset = embedBitmap("friendbar/cloud_2_4_png.png");
const cloud_3_1_png_pngAsset = embedBitmap("friendbar/cloud_3_1_png.png");
const cloud_3_2_png_pngAsset = embedBitmap("friendbar/cloud_3_2_png.png");
const cloud_3_3_png_pngAsset = embedBitmap("friendbar/cloud_3_3_png.png");
const cloud_3_4_png_pngAsset = embedBitmap("friendbar/cloud_3_4_png.png");
const cloud_4_1_png_pngAsset = embedBitmap("friendbar/cloud_4_1_png.png");
const cloud_4_2_png_pngAsset = embedBitmap("friendbar/cloud_4_2_png.png");
const cloud_4_3_png_pngAsset = embedBitmap("friendbar/cloud_4_3_png.png");
const cloud_4_4_png_pngAsset = embedBitmap("friendbar/cloud_4_4_png.png");

export class RandomAvatarCloudsAnimation extends Sprite {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.onBoardingHcSteps::RandomAvatarCloudsAnimation'); }

    private static readonly cloud_1_1_png = cloud_1_1_png_pngAsset;

    private static readonly cloud_1_2_png = cloud_1_2_png_pngAsset;

    private static readonly cloud_1_3_png = cloud_1_3_png_pngAsset;

    private static readonly cloud_1_4_png = cloud_1_4_png_pngAsset;

    private static readonly cloud_2_1_png = cloud_2_1_png_pngAsset;

    private static readonly cloud_2_2_png = cloud_2_2_png_pngAsset;

    private static readonly cloud_2_3_png = cloud_2_3_png_pngAsset;

    private static readonly cloud_2_4_png = cloud_2_4_png_pngAsset;

    private static readonly cloud_3_1_png = cloud_3_1_png_pngAsset;

    private static readonly cloud_3_2_png = cloud_3_2_png_pngAsset;

    private static readonly cloud_3_3_png = cloud_3_3_png_pngAsset;

    private static readonly cloud_3_4_png = cloud_3_4_png_pngAsset;

    private static readonly cloud_4_1_png = cloud_4_1_png_pngAsset;

    private static readonly cloud_4_2_png = cloud_4_2_png_pngAsset;

    private static readonly cloud_4_3_png = cloud_4_3_png_pngAsset;

    private static readonly cloud_4_4_png = cloud_4_4_png_pngAsset;

    declare private _leftFrames: any[];

    declare private _rightFrames: any[];

    declare private _downFrames: any[];

    declare private _altFrames: any[];

    declare private _SafeStr_3128: Timer;

    declare private _SafeStr_2746: number;
    static { (this.prototype as any)._SafeStr_2746 = 0; }

    declare private _animationFrame: number;
    static { (this.prototype as any)._animationFrame = 0; }

    declare private _SafeStr_2714: Sprite;

    declare private _SafeStr_2505: Sprite;

    declare private _SafeStr_2689: Sprite;

    private _SafeStr_14953: any[] = [-9, -8, -5, -3, 3, 5, 8, 9];

    declare private _SafeStr_5325: number;
    static { (this.prototype as any)._SafeStr_5325 = 0; }

    constructor() {
        super();
        this._rightFrames = [new RandomAvatarCloudsAnimation.cloud_1_1_png(), new RandomAvatarCloudsAnimation.cloud_1_2_png(), new RandomAvatarCloudsAnimation.cloud_1_3_png(), new RandomAvatarCloudsAnimation.cloud_1_4_png()];
        this._leftFrames = [new RandomAvatarCloudsAnimation.cloud_2_1_png(), new RandomAvatarCloudsAnimation.cloud_2_2_png(), new RandomAvatarCloudsAnimation.cloud_2_3_png(), new RandomAvatarCloudsAnimation.cloud_2_4_png()];
        this._downFrames = [new RandomAvatarCloudsAnimation.cloud_3_1_png(), new RandomAvatarCloudsAnimation.cloud_3_2_png(), new RandomAvatarCloudsAnimation.cloud_3_3_png(), new RandomAvatarCloudsAnimation.cloud_3_4_png()];
        this._altFrames = [new RandomAvatarCloudsAnimation.cloud_4_1_png(), new RandomAvatarCloudsAnimation.cloud_4_2_png(), new RandomAvatarCloudsAnimation.cloud_4_3_png(), new RandomAvatarCloudsAnimation.cloud_4_4_png()];
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    private dispose(): void {
        if (this._SafeStr_3128) {
            this._SafeStr_3128.reset();
            this._SafeStr_3128 = null;
        }
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    }

    protected onAddedToStage = (param1: Event): void => {
        this._SafeStr_2689 = new Sprite();
        this.addChild(this._SafeStr_2689);
        this._SafeStr_2714 = new Sprite();
        this.addChild(this._SafeStr_2714);
        this._SafeStr_2505 = new Sprite();
        this.addChild(this._SafeStr_2505);
        this.resetAnimation();
    };

    private resetAnimation(): void {
        this._SafeStr_2746 = 0;
        this._animationFrame = 0;
        this._SafeStr_2689.addChild(this._downFrames[0]);
        this._SafeStr_2689.x = 75;
        this._SafeStr_2689.y = 140;
        this._SafeStr_2714.addChild(this._leftFrames[0]);
        this._SafeStr_2714.x = 30;
        this._SafeStr_2714.y = 115;
        this._SafeStr_2505.addChild(this._rightFrames[0]);
        this._SafeStr_2505.x = 85;
        this._SafeStr_2505.y = 110;
        this._SafeStr_2689.visible = true;
        this._SafeStr_2714.visible = true;
        this._SafeStr_2505.visible = true;
    }

    public startAnimation(): void {
        this.resetAnimation();
        if (!this._SafeStr_3128) {
            this._SafeStr_3128 = new Timer(80);
            this._SafeStr_3128.addEventListener("timer", this.onAnimateTimer);
        }
        let _loc1_: number = Math.round(Math.random() * (this._SafeStr_14953.length - 1)) | 0;
        this._SafeStr_5325 = this._SafeStr_14953[_loc1_] | 0;
        this._SafeStr_3128.start();
    }

    private onAnimateTimer = (param1: TimerEvent): void => {
        if (this._SafeStr_3128 == null) {
            return;
        }
        this._SafeStr_2746 = this._SafeStr_2746 + 1;
        if (this._SafeStr_2746 > 2 && this._SafeStr_2746 < 5) {
            this._animationFrame = 1;
        } else if (this._SafeStr_2746 > 4 && this._SafeStr_2746 < 7) {
            this._animationFrame = 2;
        } else if (this._SafeStr_2746 > 6 && this._SafeStr_2746 < 9) {
            this._animationFrame = 3;
        } else if (this._SafeStr_2746 >= 9) {
            this._SafeStr_2689.visible = false;
            this._SafeStr_2714.visible = false;
            this._SafeStr_2505.visible = false;
        }
        this._SafeStr_2689.removeChildAt(0);
        this._SafeStr_2714.removeChildAt(0);
        this._SafeStr_2505.removeChildAt(0);
        this._SafeStr_2689.addChild(this._downFrames[this._animationFrame]);
        this._SafeStr_2714.addChild(this._leftFrames[this._animationFrame]);
        this._SafeStr_2505.addChild(this._rightFrames[this._animationFrame]);
        let _loc2_: number = Math.round(Math.random() * 10) | 0;
        if (_loc2_ % 2 != 0) {
            this._SafeStr_2505.removeChildAt(0);
            this._SafeStr_2505.addChild(this._altFrames[this._animationFrame]);
        } else {
            this._SafeStr_2689.removeChildAt(0);
            this._SafeStr_2689.addChild(this._altFrames[this._animationFrame]);
        }
        if (this._SafeStr_2746 <= 9) {
            this._SafeStr_2505.x += 10 + Math.random() * 5;
            this._SafeStr_2505.y -= this._SafeStr_5325;
            this._SafeStr_2714.x -= 10 + Math.random() * 5;
            this._SafeStr_2714.y -= this._SafeStr_5325;
            this._SafeStr_2689.y += this._SafeStr_5325 * 1.3;
        }
    };
}
