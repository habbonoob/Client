import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { LinearMovingBackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/LinearMovingBackgroundObject';
import { RandomWalkMovingBackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/RandomWalkMovingBackgroundObject';
import { SpiralMovingBackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/SpiralMovingBackgroundObject';
import { StaticAnimatedBackgroundObject } from '@/com/sulake/habbo/friendbar/landingview/layout/backgroundobjects/StaticAnimatedBackgroundObject';

export class MovingBackgroundObjectType {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.layout.backgroundobjects::MovingBackgroundObjectType'); }

    static #staticsReady = false;

    public static readonly LINEAR: string = "line";
    public static readonly SPIRAL: string = "spiral";
    public static readonly STATIC_ANIMATED: string = "animated";
    public static readonly RANDOM_WALK: string = "randomwalk";

    public static get CLASS_LINEAR(): any {
        MovingBackgroundObjectType.#initStatics();
        return MovingBackgroundObjectType.CLASS_LINEAR;
    }

    public static get CLASS_SPIRAL(): any {
        MovingBackgroundObjectType.#initStatics();
        return MovingBackgroundObjectType.CLASS_SPIRAL;
    }

    public static get CLASS_STATIC_ANIMATED(): any {
        MovingBackgroundObjectType.#initStatics();
        return MovingBackgroundObjectType.CLASS_STATIC_ANIMATED;
    }

    public static get CLASS_RANDOM_WALK(): any {
        MovingBackgroundObjectType.#initStatics();
        return MovingBackgroundObjectType.CLASS_RANDOM_WALK;
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (MovingBackgroundObjectType.#staticsReady) return;
        MovingBackgroundObjectType.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(MovingBackgroundObjectType, name, { value, writable: true, configurable: true, enumerable: true });
        set("CLASS_LINEAR", null);
        set("CLASS_SPIRAL", null);
        set("CLASS_STATIC_ANIMATED", null);
        set("CLASS_RANDOM_WALK", null);
        set("CLASS_LINEAR", LinearMovingBackgroundObject);
        set("CLASS_SPIRAL", SpiralMovingBackgroundObject);
        set("CLASS_STATIC_ANIMATED", StaticAnimatedBackgroundObject);
        set("CLASS_RANDOM_WALK", RandomWalkMovingBackgroundObject);
    }
}
