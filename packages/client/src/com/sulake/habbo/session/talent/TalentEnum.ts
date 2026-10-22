import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TalentEnum {
    static { registerClassName(this, 'com.sulake.habbo.session.talent::TalentEnum'); }

    public static readonly HELPER: string = "helper";
    public static readonly CITIZENSHIP: string = "citizenship";

    public static get asArray(): any[] {
        return ["helper", "citizenship"];
    }

    constructor() {
    }
}
