import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ResultsModeEnum {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search.results::ResultsModeEnum'); }

    public static readonly ROWS: number = 0;
    public static readonly TILES: number = 1;

    constructor() {
    }
}
