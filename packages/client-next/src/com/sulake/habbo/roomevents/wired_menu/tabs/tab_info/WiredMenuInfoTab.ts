import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import { WiredMenuDefaultTab } from '@/com/sulake/habbo/roomevents/wired_menu/tabs/WiredMenuDefaultTab';

export class WiredMenuInfoTab extends WiredMenuDefaultTab {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_info::WiredMenuInfoTab'); }

    constructor(param1: WiredMenuController, param2: IWindowContainer) {
        super(param1, param2);
    }
}
