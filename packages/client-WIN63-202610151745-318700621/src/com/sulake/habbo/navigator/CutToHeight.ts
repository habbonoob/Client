import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { BinarySearchTest } from '@/com/sulake/habbo/navigator/BinarySearchTest';

export class CutToHeight implements BinarySearchTest {
    static { registerClassName(this, 'com.sulake.habbo.navigator::CutToHeight'); }

    declare private _value: string;

    declare private _text: ITextWindow;

    declare private _maxHeight: number;
    static { (this.prototype as any)._maxHeight = 0; }

    constructor() {
    }

    public test(param1: number): boolean {
        this._text.text = this._value.substring(0, param1) + "...";
        return this._text.textHeight > this._maxHeight;
    }

    public beforeSearch(param1: string, param2: ITextWindow, param3: number): void {
        this._value = param1;
        this._text = param2;
        this._maxHeight = param3;
    }
}
