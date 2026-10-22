import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes, embedSound } from '@habbo-pixi/runtime/embed/embed';
import { HabboSoundManagerFlash10Bootstrap } from '@/com/sulake/bootstrap/HabboSoundManagerFlash10Bootstrap';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboSoundManagerFlash10Com_manifest_binAsset = embedBytes("sound/HabboSoundManagerFlash10Com_manifest.bin");
const sound_call_for_help_mp3Asset = embedSound("sound/sound_call_for_help.mp3");
const sound_catalogue_cash_mp3Asset = embedSound("sound/sound_catalogue_cash.mp3");
const sound_catalogue_duckets_mp3Asset = embedSound("sound/sound_catalogue_duckets.mp3");
const sound_console_message_sent_mp3Asset = embedSound("sound/sound_console_message_sent.mp3");
const sound_console_new_message_mp3Asset = embedSound("sound/sound_console_new_message.mp3");
const sound_guide_received_invitation_mp3Asset = embedSound("sound/sound_guide_received_invitation.mp3");
const sound_guide_help_requested_mp3Asset = embedSound("sound/sound_guide_help_requested.mp3");
const sound_respect_received_mp3Asset = embedSound("sound/sound_respect_received.mp3");
const HBSTG_snowwar_get_snowball_mp3Asset = embedSound("sound/HBSTG_snowwar_get_snowball.mp3");
const HBSTG_snowwar_hit1_mp3Asset = embedSound("sound/HBSTG_snowwar_hit1.mp3");
const HBSTG_snowwar_hit2_mp3Asset = embedSound("sound/HBSTG_snowwar_hit2.mp3");
const HBSTG_snowwar_hit3_mp3Asset = embedSound("sound/HBSTG_snowwar_hit3.mp3");
const HBSTG_snowwar_make_snowball_mp3Asset = embedSound("sound/HBSTG_snowwar_make_snowball.mp3");
const HBSTG_snowwar_miss_mp3Asset = embedSound("sound/HBSTG_snowwar_miss.mp3");
const HBSTG_snowwar_throw_mp3Asset = embedSound("sound/HBSTG_snowwar_throw.mp3");
const HBSTG_snowwar_walk_mp3Asset = embedSound("sound/HBSTG_snowwar_walk.mp3");
const HBSTG_ig_countdown_mp3Asset = embedSound("sound/HBSTG_ig_countdown.mp3");
const HBSTG_ig_losing_mp3Asset = embedSound("sound/HBSTG_ig_losing.mp3");
const HBSTG_ig_winning_mp3Asset = embedSound("sound/HBSTG_ig_winning.mp3");
const FURNITURE_cuckoo_clock_mp3Asset = embedSound("sound/FURNITURE_cuckoo_clock.mp3");
const sound_camera_shutter_mp3Asset = embedSound("sound/sound_camera_shutter.mp3");

export class HabboSoundManagerFlash10Com extends SimpleApplication {
    static { registerClassName(this, 'HabboSoundManagerFlash10Com'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboSoundManagerFlash10Com.#initStatics();
        return HabboSoundManagerFlash10Com.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboSoundManagerFlash10Com.#initStatics();
        HabboSoundManagerFlash10Com.requiredClasses = value;
    }

    public static manifest = HabboSoundManagerFlash10Com_manifest_binAsset;

    public static sound_call_for_help = sound_call_for_help_mp3Asset;

    public static sound_catalogue_cash = sound_catalogue_cash_mp3Asset;

    public static sound_catalogue_duckets = sound_catalogue_duckets_mp3Asset;

    public static sound_console_message_sent = sound_console_message_sent_mp3Asset;

    public static sound_console_new_message = sound_console_new_message_mp3Asset;

    public static sound_guide_received_invitation = sound_guide_received_invitation_mp3Asset;

    public static sound_guide_help_requested = sound_guide_help_requested_mp3Asset;

    public static sound_respect_received = sound_respect_received_mp3Asset;

    public static HBSTG_snowwar_get_snowball = HBSTG_snowwar_get_snowball_mp3Asset;

    public static HBSTG_snowwar_hit1 = HBSTG_snowwar_hit1_mp3Asset;

    public static HBSTG_snowwar_hit2 = HBSTG_snowwar_hit2_mp3Asset;

    public static HBSTG_snowwar_hit3 = HBSTG_snowwar_hit3_mp3Asset;

    public static HBSTG_snowwar_make_snowball = HBSTG_snowwar_make_snowball_mp3Asset;

    public static HBSTG_snowwar_miss = HBSTG_snowwar_miss_mp3Asset;

    public static HBSTG_snowwar_throw = HBSTG_snowwar_throw_mp3Asset;

    public static HBSTG_snowwar_walk = HBSTG_snowwar_walk_mp3Asset;

    public static HBSTG_ig_countdown = HBSTG_ig_countdown_mp3Asset;

    public static HBSTG_ig_losing = HBSTG_ig_losing_mp3Asset;

    public static HBSTG_ig_winning = HBSTG_ig_winning_mp3Asset;

    public static FURNITURE_cuckoo_clock = FURNITURE_cuckoo_clock_mp3Asset;

    public static sound_camera_shutter = sound_camera_shutter_mp3Asset;

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboSoundManagerFlash10Com.#staticsReady) return;
        HabboSoundManagerFlash10Com.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboSoundManagerFlash10Com, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboSoundManagerFlash10Bootstrap, IIDHabboSoundManager]);
    }
}
