import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { INativeApplicationProxy } from '@/com/sulake/habbo/utils/air/INativeApplicationProxy';
import { NativeApplication } from '@habbo-pixi/runtime/desktop/NativeApplication';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import { SoundMixer } from '@habbo-pixi/runtime/media/SoundMixer';

export class NativeApplicationProxy extends EventDispatcher implements INativeApplicationProxy {
    static { registerClassName(this, 'com.sulake.air::NativeApplicationProxy'); }

    public static isDeactivated: boolean = false;
    public static isSuspended: boolean = false;

    constructor() {
        super();
        SoundMixer.audioPlaybackMode = "ambient";
        NativeApplication.nativeApplication.addEventListener("activate", this.onApplicationActivate);
        NativeApplication.nativeApplication.addEventListener("deactivate", this.onApplicationDeactivate);
        NativeApplication.nativeApplication.addEventListener("suspend", this.onApplicationSuspend);
    }

    public dispose(): void {
        NativeApplication.nativeApplication.removeEventListener("activate", this.onApplicationActivate);
        NativeApplication.nativeApplication.removeEventListener("deactivate", this.onApplicationDeactivate);
        NativeApplication.nativeApplication.removeEventListener("suspend", this.onApplicationSuspend);
    }

    public allowBackgroundExecution(param1: boolean): void {
        NativeApplication.nativeApplication.executeInBackground = param1;
    }

    private onApplicationActivate = (param1: Event): void => {
        this.dispatchEvent(new Event("NAE_application_active"));
        NativeApplicationProxy.isDeactivated = false;
        NativeApplicationProxy.isSuspended = false;
    };

    private onApplicationSuspend = (param1: Event): void => {
        this.dispatchEvent(new Event("NAE_application_suspend"));
        NativeApplicationProxy.isSuspended = true;
    };

    private onApplicationDeactivate = (param1: Event): void => {
        this.dispatchEvent(new Event("NAE_application_deactive"));
        NativeApplicationProxy.isDeactivated = true;
    };
}
