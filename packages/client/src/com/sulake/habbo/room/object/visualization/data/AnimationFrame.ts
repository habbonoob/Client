import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AnimationFrame {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.data::AnimationFrame'); }

    public static readonly FRAME_REPEAT_FOREVER: number = -1;
    public static readonly _SafeStr_8369: number = -1;
    private static readonly POOL_SIZE_LIMIT: number = 6000;
    private static readonly _SafeStr_4348: any[] = [];

    public static allocate(param1: number, param2: number, param3: number, param4: number, param5: number, param6: boolean, param7: number = -1, param8: number = 0): AnimationFrame {
        let _loc9_: AnimationFrame = AnimationFrame._SafeStr_4348.length > 0 ? AnimationFrame._SafeStr_4348.pop() : new AnimationFrame();
        _loc9_._SafeStr_5770 = false;
        _loc9_._id = param1;
        _loc9_._SafeStr_2126 = param2;
        _loc9_._y = param3;
        _loc9_._isLastFrame = param6;
        if (param4 < 1) {
            param4 = 1;
        }
        _loc9_._repeats = param4;
        if (param5 < 0) {
            param5 = -1;
        }
        _loc9_._frameRepeats = param5;
        _loc9_._SafeStr_5756 = param5;
        if (param7 >= 0) {
            _loc9_._activeSequence = param7;
            _loc9_._activeSequenceOffset = param8;
        }
        return _loc9_;
    }

    constructor() {
    }

    private _id: number = 0;
    private _SafeStr_2126: number = 0;
    private _y: number = 0;
    private _repeats: number = 1;
    private _frameRepeats: number = 1;
    private _SafeStr_5756: number = 1;
    private _activeSequence: number = -1;
    private _SafeStr_5770: boolean = false;
    private _activeSequenceOffset: number = 0;

    public get activeSequenceOffset(): number {
        return this._activeSequenceOffset;
    }

    private _isLastFrame: boolean = false;

    public get isLastFrame(): boolean {
        return this._isLastFrame;
    }

    public get id(): number {
        if (this._id >= 0) {
            return this._id;
        }
        return -this._id * Math.random() | 0;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }

    public get repeats(): number {
        return this._repeats;
    }

    public get frameRepeats(): number {
        return this._frameRepeats;
    }

    public get remainingFrameRepeats(): number {
        if (this._frameRepeats < 0) {
            return -1;
        }
        return this._SafeStr_5756;
    }

    public set remainingFrameRepeats(param1: number) {
        if (param1 < 0) {
            param1 = 0;
        }
        if (this._frameRepeats > 0 && param1 > this._frameRepeats) {
            param1 = this._frameRepeats;
        }
        this._SafeStr_5756 = param1;
    }

    public get activeSequence(): number {
        return this._activeSequence;
    }

    public recycle(): void {
        if (!this._SafeStr_5770) {
            this._SafeStr_5770 = true;
            if (AnimationFrame._SafeStr_4348.length < 6000) {
                AnimationFrame._SafeStr_4348.push(this);
            }
        }
    }
}
