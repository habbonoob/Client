import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';

export class KeyboardControl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::KeyboardControl'); }

    private static readonly NUMBER_0: number = 48;
    private static readonly NUMBER_1: number = 49;
    private static readonly NUMBER_2: number = 50;
    private static readonly NUMBER_3: number = 51;
    private static readonly NUMBER_4: number = 52;
    private static readonly NUMBER_5: number = 53;
    private static readonly NUMBER_6: number = 54;
    private static readonly NUMBER_7: number = 55;
    private static readonly NUMBER_8: number = 56;
    private static readonly NUMBER_9: number = 57;
    private static readonly A: number = 65;
    private static readonly B: number = 66;
    private static readonly _SafeStr_8034: number = 67;
    private static readonly D: number = 68;
    private static readonly E: number = 69;
    private static readonly F: number = 70;
    private static readonly _SafeStr_8153: number = 71;
    private static readonly _SafeStr_8160: number = 72;
    private static readonly I: number = 73;
    private static readonly _SafeStr_8258: number = 74;
    private static readonly _SafeStr_8303: number = 75;
    private static readonly _SafeStr_8035: number = 76;
    private static readonly M: number = 77;
    private static readonly N: number = 78;
    private static readonly _SafeStr_7817: number = 79;
    private static readonly _SafeStr_7737: number = 80;
    private static readonly _SafeStr_8554: number = 81;
    private static readonly _SafeStr_8425: number = 82;
    private static readonly S: number = 83;
    private static readonly _SafeStr_8717: number = 84;
    private static readonly U: number = 85;
    private static readonly V: number = 86;
    private static readonly W: number = 87;
    private static readonly X: number = 88;
    private static readonly _SafeStr_7669: number = 89;
    private static readonly _SafeStr_7898: number = 90;
    private static readonly _SafeStr_7925: number = 186;
    private static readonly EQUAL: number = 187;
    private static readonly COMMA: number = 188;
    private static readonly MINUS: number = 189;
    private static readonly PERIOD: number = 190;
    private static readonly SLASH: number = 191;
    private static readonly BACKQUOTE: number = 192;
    private static readonly LEFTBRACKET: number = 219;
    private static readonly BACKSLASH: number = 220;
    private static readonly RIGHTBRACKET: number = 221;
    private static readonly _SafeStr_8314: number = 222;
    private static readonly ALTERNATE: number = 18;
    private static readonly BACKSPACE: number = 8;
    private static readonly CAPS_LOCK: number = 20;
    private static readonly COMMAND: number = 15;
    private static readonly CONTROL: number = 17;
    private static readonly DELETE: number = 46;
    private static readonly DOWN: number = 40;
    private static readonly _SafeStr_7713: number = 35;
    private static readonly ENTER: number = 13;
    private static readonly ESCAPE: number = 27;
    private static readonly F1: number = 112;
    private static readonly F2: number = 113;
    private static readonly F3: number = 114;
    private static readonly F4: number = 115;
    private static readonly F5: number = 116;
    private static readonly F6: number = 117;
    private static readonly F7: number = 118;
    private static readonly F8: number = 119;
    private static readonly F9: number = 120;
    private static readonly F10: number = 121;
    private static readonly F11: number = 122;
    private static readonly F12: number = 123;
    private static readonly F13: number = 124;
    private static readonly F14: number = 125;
    private static readonly F15: number = 126;
    private static readonly HOME: number = 36;
    private static readonly INSERT: number = 45;
    private static readonly _SafeStr_6016: number = 37;
    private static readonly NUMPAD: number = 21;
    private static readonly NUMPAD_0: number = 96;
    private static readonly NUMPAD_1: number = 97;
    private static readonly NUMPAD_2: number = 98;
    private static readonly NUMPAD_3: number = 99;
    private static readonly NUMPAD_4: number = 100;
    private static readonly NUMPAD_5: number = 101;
    private static readonly NUMPAD_6: number = 102;
    private static readonly NUMPAD_7: number = 103;
    private static readonly NUMPAD_8: number = 104;
    private static readonly NUMPAD_9: number = 105;
    private static readonly NUMPAD_ADD: number = 107;
    private static readonly NUMPAD_DECIMAL: number = 110;
    private static readonly NUMPAD_DIVIDE: number = 111;
    private static readonly NUMPAD_ENTER: number = 108;
    private static readonly NUMPAD_MULTIPLY: number = 106;
    private static readonly NUMPAD_SUBTRACT: number = 109;
    private static readonly PAGE_DOWN: number = 34;
    private static readonly PAGE_UP: number = 33;
    private static readonly RIGHT: number = 39;
    private static readonly SHIFT: number = 16;
    private static readonly _SafeStr_8578: number = 32;
    private static readonly TAB: number = 9;
    private static readonly _SafeStr_7416: number = 38;

    constructor(param1: Stage) {
        this._SafeStr_2427 = param1;
        param1.addEventListener("keyDown", this.keyboardEventHandler);
        param1.addEventListener("keyUp", this.keyboardEventHandler);
    }

    declare private _SafeStr_2427: Stage;

    private _SafeStr_3168: any[] = [];

    declare private _direction: Direction8;

    public get disposed(): boolean {
        return false;
    }

    public get direction(): Direction8 {
        return this._direction;
    }

    public dispose(): void {
        this._SafeStr_2427.removeEventListener("keyDown", this.keyboardEventHandler);
        this._SafeStr_2427.removeEventListener("keyUp", this.keyboardEventHandler);
        this._SafeStr_2427 = null;
        this._direction = null;
        this._SafeStr_3168 = [];
    }

    private isDown(param1: number): boolean {
        return this._SafeStr_3168.indexOf(param1) > -1;
    }

    private keyboardEventHandler = (param1: KeyboardEvent): void => {
        let _loc2_: number = this._SafeStr_3168.indexOf(param1.keyCode);
        switch (param1.type) {
            case "keyDown":
                if (_loc2_ == -1) {
                    this._SafeStr_3168.push(param1.keyCode);
                }
                break;
            case "keyUp":
                if (_loc2_ > -1) {
                    this._SafeStr_3168.splice(_loc2_, 1);
                }
        }
        this._direction = null;
        if (this._SafeStr_3168.length == 0) {
            return;
        }
        if (this._SafeStr_3168.length >= 2) {
            if (this.isDown(38) && this.isDown(37)) {
                this._direction = Direction8.W;
            } else if (this.isDown(38) && this.isDown(39)) {
                this._direction = Direction8.N;
            } else if (this.isDown(40) && this.isDown(37)) {
                this._direction = Direction8.S;
            } else if (this.isDown(40) && this.isDown(39)) {
                this._direction = Direction8.E;
            }
        } else if (this.isDown(38)) {
            this._direction = Direction8.NW;
        } else if (this.isDown(40)) {
            this._direction = Direction8.SE;
        } else if (this.isDown(37)) {
            this._direction = Direction8.SW;
        } else if (this.isDown(39)) {
            this._direction = Direction8.NE;
        } else if (this.isDown(81)) {
            this._direction = Direction8.W;
        } else if (this.isDown(87)) {
            this._direction = Direction8.NW;
        } else if (this.isDown(69)) {
            this._direction = Direction8.N;
        } else if (this.isDown(65)) {
            this._direction = Direction8.SW;
        } else if (this.isDown(68)) {
            this._direction = Direction8.NE;
        } else if (this.isDown(90)) {
            this._direction = Direction8.S;
        } else if (this.isDown(88)) {
            this._direction = Direction8.SE;
        } else if (this.isDown(67)) {
            this._direction = Direction8.E;
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
