import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import { HabboLocalizationManagerBootstrap } from '@/com/sulake/bootstrap/HabboLocalizationManagerBootstrap';
import { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import { HabboLocalizationManager } from '@/com/sulake/habbo/localization/HabboLocalizationManager';
import { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { IIDCoreLocalizationManager } from '@/com/sulake/iid/IIDCoreLocalizationManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { SimpleApplication } from '@/mx/core/SimpleApplication';

const HabboLocalizationCom_manifest_binAsset = embedBytes("localization/HabboLocalizationCom_manifest.bin");
const default_localizations_binAsset = embedBytes("localization/default_localizations.bin");
const default_localizations_pt_binAsset = embedBytes("localization/default_localizations_pt.bin");
const default_localizations_de_binAsset = embedBytes("localization/default_localizations_de.bin");
const default_localizations_tr_binAsset = embedBytes("localization/default_localizations_tr.bin");
const default_localizations_dk_binAsset = embedBytes("localization/default_localizations_dk.bin");
const default_localizations_es_binAsset = embedBytes("localization/default_localizations_es.bin");
const default_localizations_fi_binAsset = embedBytes("localization/default_localizations_fi.bin");
const default_localizations_fr_binAsset = embedBytes("localization/default_localizations_fr.bin");
const default_localizations_it_binAsset = embedBytes("localization/default_localizations_it.bin");
const default_localizations_nl_binAsset = embedBytes("localization/default_localizations_nl.bin");
const default_localizations_no_binAsset = embedBytes("localization/default_localizations_no.bin");
const default_localizations_se_binAsset = embedBytes("localization/default_localizations_se.bin");
const default_localizations_en_binAsset = embedBytes("localization/default_localizations_en.bin");

export class HabboLocalizationCom extends SimpleApplication {
    static { registerClassName(this, 'HabboLocalizationCom'); }

    static #staticsReady = false;

    public static get requiredClasses(): any[] {
        HabboLocalizationCom.#initStatics();
        return HabboLocalizationCom.requiredClasses;
    }
    public static set requiredClasses(value: any[]) {
        HabboLocalizationCom.#initStatics();
        HabboLocalizationCom.requiredClasses = value;
    }

    public static manifest = HabboLocalizationCom_manifest_binAsset;

    public static default_localizations = default_localizations_binAsset;

    public static default_localizations_pt = default_localizations_pt_binAsset;

    public static default_localizations_de = default_localizations_de_binAsset;

    public static default_localizations_tr = default_localizations_tr_binAsset;

    public static default_localizations_dk = default_localizations_dk_binAsset;

    public static default_localizations_es = default_localizations_es_binAsset;

    public static default_localizations_fi = default_localizations_fi_binAsset;

    public static default_localizations_fr = default_localizations_fr_binAsset;

    public static default_localizations_it = default_localizations_it_binAsset;

    public static default_localizations_nl = default_localizations_nl_binAsset;

    public static default_localizations_no = default_localizations_no_binAsset;

    public static default_localizations_se = default_localizations_se_binAsset;

    public static default_localizations_en = default_localizations_en_binAsset;

    constructor() {
        super();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboLocalizationCom.#staticsReady) return;
        HabboLocalizationCom.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboLocalizationCom, name, { value, writable: true, configurable: true, enumerable: true });
        set("requiredClasses", null);
        set("requiredClasses", [HabboLocalizationManagerBootstrap, IIDCoreLocalizationManager, IIDHabboLocalizationManager, ICoreLocalizationManager, IHabboLocalizationManager, HabboLocalizationManager]);
    }
}
