import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabbiconSelectorEntry {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput.habbiconselector::HabbiconSelectorEntry'); }

    declare public habbiconId: number;
    static { (this.prototype as any).habbiconId = 0; }

    declare public name: string;

    declare public searchName: string;

    declare public color: number;
    static { (this.prototype as any).color = 0; }

    declare public favorite: boolean;
    static { (this.prototype as any).favorite = false; }

    constructor(param1: number, param2: string, param3: number, param4: boolean) {
        this.habbiconId = param1;
        this.name = param2;
        this.searchName = param2 != null ? param2.toLowerCase() : "";
        this.color = param3;
        this.favorite = param4;
    }
}
