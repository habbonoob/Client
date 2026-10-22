import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class DefaultSelectorType extends DefaultElement implements SelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::DefaultSelectorType'); }

    constructor() {
        super();
    }
}
