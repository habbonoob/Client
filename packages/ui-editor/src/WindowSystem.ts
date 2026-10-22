import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Core } from '@/com/sulake/core/Core';
import type { ICore } from '@/com/sulake/core/runtime/ICore';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import { HabboConfigurationCom } from '@/com/sulake/habbo/HabboConfigurationCom';
import { HabboLocalizationCom } from '@/com/sulake/habbo/HabboLocalizationCom';
import { HabboWindowManagerCom } from '@/com/sulake/habbo/HabboWindowManagerCom';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';

/** The localization component's flag for not waiting on the server's texts (it uses its embedded defaults). */
const SKIP_EXTERNAL_TEXTS = 0x10000000;

/**
 * The client's window system on its own: the core with just the localization and window manager components, as
 * HabboAir starts them, without a login, a server or rooms. Windows built through it are the client's own, drawn
 * with its skins and fonts.
 */
export class WindowSystem {
    readonly core: ICore;
    readonly windowManager: IHabboWindowManager;

    private constructor(core: ICore, windowManager: IHabboWindowManager) {
        this.core = core;
        this.windowManager = windowManager;
    }

    /** Starts the core on `container` (the stage the windows are shown on) and waits for the window manager. */
    static start(container: DisplayObjectContainer): Promise<WindowSystem> {
        return new Promise((resolve, reject) => {
            const core = Core.instantiate(container, 1);
            core.events.addEventListener('COMPONENT_EVENT_ERROR', () => reject(new Error('The core reported an error while starting.')));
            core.prepareComponent(HabboConfigurationCom);
            core.prepareComponent(HabboLocalizationCom, SKIP_EXTERNAL_TEXTS);
            core.prepareComponent(HabboWindowManagerCom);
            const found = (_iid: unknown, manager: IUnknown) => resolve(new WindowSystem(core, manager as unknown as IHabboWindowManager));
            const ready = core.queueInterface(new IIDHabboWindowManager(), found);
            // no files to load: the core says so at once, and starts the components
            const loading = new EventDispatcher();
            loading.addEventListener('complete', () => core.initialize());
            core.readConfigDocument(new XML(), loading);
            if (ready != null) found(null, ready);
        });
    }
}
