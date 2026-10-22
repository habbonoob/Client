import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AlertIllustration {
    static { registerClassName(this, 'com.sulake.habbo.window.enum::AlertIllustration'); }

    public static readonly FRANK_NEUTRAL: string = "illumina_alert_illustrations_frank_neutral_png";

    constructor() {
    }
}
