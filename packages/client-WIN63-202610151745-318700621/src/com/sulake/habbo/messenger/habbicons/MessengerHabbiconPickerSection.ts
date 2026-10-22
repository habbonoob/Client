import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class MessengerHabbiconPickerSection {
    static { registerClassName(this, 'com.sulake.habbo.messenger.habbicons::MessengerHabbiconPickerSection'); }

    declare public type: string;

    declare public key: string;

    declare public title: string;

    declare public entries: any[];

    constructor(param1: string, param2: string, param3: string, param4: any[]) {
        this.type = param1;
        this.key = param2;
        this.title = param3;
        this.entries = param4;
    }
}
