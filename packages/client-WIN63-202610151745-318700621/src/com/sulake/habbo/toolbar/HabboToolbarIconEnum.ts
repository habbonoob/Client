import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboToolbarIconEnum {
    static { registerClassName(this, 'com.sulake.habbo.toolbar::HabboToolbarIconEnum'); }

    static #staticsReady = false;

    public static get HELP(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.HELP;
    }

    public static get NAVIGATOR(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.NAVIGATOR;
    }

    public static get CATALOGUE(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.CATALOGUE;
    }

    public static get INVENTORY(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.INVENTORY;
    }

    public static get PROGRESSION(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.PROGRESSION;
    }

    public static get ACHIEVEMENTS(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.ACHIEVEMENTS;
    }

    public static get MEMENU(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.MEMENU;
    }

    public static get GAMES(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.GAMES;
    }

    public static get STORIES(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.STORIES;
    }

    public static get RECEPTION(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.RECEPTION;
    }

    public static get HOME(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.HOME;
    }

    public static get GUIDE(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.GUIDE;
    }

    public static get BUILDER(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.BUILDER;
    }

    public static get CAMERA(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.CAMERA;
    }

    public static get WIRED_MENU(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.WIRED_MENU;
    }

    public static get ROOMINFO(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.ROOMINFO;
    }

    public static get _SafeStr_8018(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum._SafeStr_8018;
    }

    public static get NAVIGATOR_ME_TAB(): string {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum.NAVIGATOR_ME_TAB;
    }

    private static get _TOOLBAR_NAMES(): Map<any, any> {
        HabboToolbarIconEnum.#initStatics();
        return HabboToolbarIconEnum._TOOLBAR_NAMES;
    }

    constructor() {
    }

    public static getIconName(param1: string): string {
        return stringOrNull(HabboToolbarIconEnum._TOOLBAR_NAMES.get(param1));
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboToolbarIconEnum.#staticsReady) return;
        HabboToolbarIconEnum.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboToolbarIconEnum, name, { value, writable: true, configurable: true, enumerable: true });
        set("HELP", null);
        set("NAVIGATOR", null);
        set("CATALOGUE", null);
        set("INVENTORY", null);
        set("PROGRESSION", null);
        set("ACHIEVEMENTS", null);
        set("MEMENU", null);
        set("GAMES", null);
        set("STORIES", null);
        set("RECEPTION", null);
        set("HOME", null);
        set("GUIDE", null);
        set("BUILDER", null);
        set("CAMERA", null);
        set("WIRED_MENU", null);
        set("ROOMINFO", null);
        set("_SafeStr_8018", null);
        set("NAVIGATOR_ME_TAB", null);
        set("_TOOLBAR_NAMES", null);
        set("HELP", "HTIE_ICON_HELP");
        set("NAVIGATOR", "HTIE_ICON_NAVIGATOR");
        set("CATALOGUE", "HTIE_ICON_CATALOGUE");
        set("INVENTORY", "HTIE_ICON_INVENTORY");
        set("PROGRESSION", "HTIE_ICON_PROGRESSION");
        set("ACHIEVEMENTS", "HTIE_ICON_ACHIEVEMENTS");
        set("MEMENU", "HTIE_ICON_MEMENU");
        set("GAMES", "HTIE_ICON_GAMES");
        set("STORIES", "HTIE_ICON_STORIES");
        set("RECEPTION", "HTIE_ICON_RECEPTION");
        set("HOME", "HTIE_ICON_HOME");
        set("GUIDE", "HTIE_ICON_GUIDE");
        set("BUILDER", "HTIE_ICON_BUILDER");
        set("CAMERA", "HTIE_ICON_CAMERA");
        set("WIRED_MENU", "HTIE_ICON_WIRED_MENU");
        set("ROOMINFO", "HTIE_ICON_ROOMINFO");
        set("_SafeStr_8018", "HTIE_EXT_GROUP");
        set("NAVIGATOR_ME_TAB", "HTIE_ICON_NAVIGATOR_ME_TAB");
        set("_TOOLBAR_NAMES", new Dictionary());
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_HELP", "HELP");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_NAVIGATOR", "NAVIGATOR");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_CATALOGUE", "CATALOGUE");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_INVENTORY", "INVENTORY");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_PROGRESSION", "PROGRESSION");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_ACHIEVEMENTS", "ACHIEVEMENTS");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_MEMENU", "MEMENU");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_GAMES", "GAMES");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_STORIES", "STORIES");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_RECEPTION", "RECEPTION");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_HOME", "HOME");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_GUIDE", "GUIDE");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_BUILDER", "BUILDER");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_CAMERA", "CAMERA");
        HabboToolbarIconEnum._TOOLBAR_NAMES.set("HTIE_ICON_WIRED_MENU", "WIRED_MENU");
    }
}
