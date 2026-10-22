import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VariableManagementConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.overview::VariableManagementConfig'); }

    public static PAGE_SIZE: number = 50;

    constructor() {
    }
}
