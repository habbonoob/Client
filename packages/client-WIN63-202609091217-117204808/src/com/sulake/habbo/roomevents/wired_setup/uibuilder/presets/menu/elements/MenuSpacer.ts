import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMenuElement } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/menu/elements/IMenuElement';

export class MenuSpacer implements IMenuElement {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.menu.elements::MenuSpacer'); }

    constructor() {
    }
}
