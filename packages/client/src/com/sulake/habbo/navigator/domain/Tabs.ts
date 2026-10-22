import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import { Tab } from '@/com/sulake/habbo/navigator/domain/Tab';
import { CategoriesTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/CategoriesTabPageDecorator';
import { EventsTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/EventsTabPageDecorator';
import { MyRoomsTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/MyRoomsTabPageDecorator';
import { OfficialTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/OfficialTabPageDecorator';
import { RoomsTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/RoomsTabPageDecorator';
import { SearchTabPageDecorator } from '@/com/sulake/habbo/navigator/mainview/tabpagedecorators/SearchTabPageDecorator';

export class Tabs {
    static { registerClassName(this, 'com.sulake.habbo.navigator.domain::Tabs'); }

    static #staticsReady = false;

    public static get TAB_EVENTS(): number {
        Tabs.#initStatics();
        return Tabs.TAB_EVENTS;
    }

    public static get TAB_ROOMS(): number {
        Tabs.#initStatics();
        return Tabs.TAB_ROOMS;
    }

    public static get TAB_ME(): number {
        Tabs.#initStatics();
        return Tabs.TAB_ME;
    }

    public static get TAB_OFFICIAL(): number {
        Tabs.#initStatics();
        return Tabs.TAB_OFFICIAL;
    }

    public static get TAB_SEARCH(): number {
        Tabs.#initStatics();
        return Tabs.TAB_SEARCH;
    }

    public static get TAB_CATEGORIES(): number {
        Tabs.#initStatics();
        return Tabs.TAB_CATEGORIES;
    }

    public static get SEARCHTYPE_POPULAR_ROOMS(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_POPULAR_ROOMS;
    }

    public static get SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE;
    }

    public static get SEARCHTYPE_MY_FRIENDS_ROOMS(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_MY_FRIENDS_ROOMS;
    }

    public static get SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE;
    }

    public static get SEARCHTYPE_MY_ROOMS(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_MY_ROOMS;
    }

    public static get SEARCHTYPE_MY_FAVOURITES(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_MY_FAVOURITES;
    }

    public static get _SafeStr_7610(): number {
        Tabs.#initStatics();
        return Tabs._SafeStr_7610;
    }

    public static get SEARCHTYPE_TEXT_SEARCH(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_TEXT_SEARCH;
    }

    public static get SEARCHTYPE_TAG_SEARCH(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_TAG_SEARCH;
    }

    public static get SEARCHTYPE_ROOM_NAME_SEARCH(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_ROOM_NAME_SEARCH;
    }

    public static get SEARCHTYPE_OFFICIALROOMS(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_OFFICIALROOMS;
    }

    public static get _SafeStr_8400(): number {
        Tabs.#initStatics();
        return Tabs._SafeStr_8400;
    }

    public static get SEARCHTYPE_GROUP_NAME_SEARCH(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_GROUP_NAME_SEARCH;
    }

    public static get SEARCHTYPE_GUILD_BASES(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_GUILD_BASES;
    }

    public static get SEARCHTYPE_COMPETITION_ROOMS(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_COMPETITION_ROOMS;
    }

    public static get _SafeStr_7620(): number {
        Tabs.#initStatics();
        return Tabs._SafeStr_7620;
    }

    public static get _SafeStr_8691(): number {
        Tabs.#initStatics();
        return Tabs._SafeStr_8691;
    }

    public static get _SafeStr_8501(): number {
        Tabs.#initStatics();
        return Tabs._SafeStr_8501;
    }

    public static get SEARCHTYPE_MY_GUILD_BASES(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_MY_GUILD_BASES;
    }

    public static get SEARCHTYPE_BY_OWNER(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_BY_OWNER;
    }

    public static get SEARCHTYPE_CATEGORIES(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_CATEGORIES;
    }

    public static get SEARCHTYPE_RECOMMENDED_ROOMS(): number {
        Tabs.#initStatics();
        return Tabs.SEARCHTYPE_RECOMMENDED_ROOMS;
    }

    public static get _SafeStr_8762(): number {
        Tabs.#initStatics();
        return Tabs._SafeStr_8762;
    }

    private static get TAB_NAMES(): Map<any, any> {
        Tabs.#initStatics();
        return Tabs.TAB_NAMES;
    }

    public static tabIdFromName(param1: string, param2: number): number {
        return Number(Tabs.TAB_NAMES.has(param1) ? Tabs.TAB_NAMES.get(param1) : param2) | 0;
    }

    constructor(param1: HabboNavigator) {
        this._navigator = param1;
        this._tabs = [];
        this._tabs.push(new Tab(this._navigator, 1, 16, new EventsTabPageDecorator(this._navigator), 1));
        this._tabs.push(new Tab(this._navigator, 6, 21, new CategoriesTabPageDecorator(this._navigator), 5));
        this._tabs.push(new Tab(this._navigator, 2, 1, new RoomsTabPageDecorator(this._navigator), 1));
        this._tabs.push(new Tab(this._navigator, 4, 11, new OfficialTabPageDecorator(this._navigator), 4));
        this._tabs.push(new Tab(this._navigator, 3, 5, new MyRoomsTabPageDecorator(this._navigator), 1));
        this._tabs.push(new Tab(this._navigator, 5, 8, new SearchTabPageDecorator(this._navigator), 2));
        this.setSelectedTab(1);
    }

    declare private _tabs: any[];

    declare private _navigator: HabboNavigator;

    public get tabs(): any[] {
        return this._tabs;
    }

    public onFrontPage(): boolean {
        return this.getSelected().id == 4;
    }

    public setSelectedTab(param1: number): void {
        let _loc2_: Tab = this.getTab(param1);
        if (_loc2_ != null) {
            this.clearSelected();
            _loc2_.selected = true;
        }
    }

    public getSelected(): Tab {
        for (const _loc1_ of this._tabs ?? []) {
            if (_loc1_.selected) {
                return _loc1_;
            }
        }
        return null;
    }

    public getTab(param1: number): Tab {
        for (const _loc2_ of this._tabs ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    private clearSelected(): void {
        for (const _loc1_ of this._tabs ?? []) {
            _loc1_.selected = false;
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Tabs.#staticsReady) return;
        Tabs.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Tabs, name, { value, writable: true, configurable: true, enumerable: true });
        set("TAB_EVENTS", 0);
        set("TAB_ROOMS", 0);
        set("TAB_ME", 0);
        set("TAB_OFFICIAL", 0);
        set("TAB_SEARCH", 0);
        set("TAB_CATEGORIES", 0);
        set("SEARCHTYPE_POPULAR_ROOMS", 0);
        set("SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE", 0);
        set("SEARCHTYPE_MY_FRIENDS_ROOMS", 0);
        set("SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE", 0);
        set("SEARCHTYPE_MY_ROOMS", 0);
        set("SEARCHTYPE_MY_FAVOURITES", 0);
        set("_SafeStr_7610", 0);
        set("SEARCHTYPE_TEXT_SEARCH", 0);
        set("SEARCHTYPE_TAG_SEARCH", 0);
        set("SEARCHTYPE_ROOM_NAME_SEARCH", 0);
        set("SEARCHTYPE_OFFICIALROOMS", 0);
        set("_SafeStr_8400", 0);
        set("SEARCHTYPE_GROUP_NAME_SEARCH", 0);
        set("SEARCHTYPE_GUILD_BASES", 0);
        set("SEARCHTYPE_COMPETITION_ROOMS", 0);
        set("_SafeStr_7620", 0);
        set("_SafeStr_8691", 0);
        set("_SafeStr_8501", 0);
        set("SEARCHTYPE_MY_GUILD_BASES", 0);
        set("SEARCHTYPE_BY_OWNER", 0);
        set("SEARCHTYPE_CATEGORIES", 0);
        set("SEARCHTYPE_RECOMMENDED_ROOMS", 0);
        set("_SafeStr_8762", 0);
        set("TAB_NAMES", null);
        set("TAB_EVENTS", 1);
        set("TAB_ROOMS", 2);
        set("TAB_ME", 3);
        set("TAB_OFFICIAL", 4);
        set("TAB_SEARCH", 5);
        set("TAB_CATEGORIES", 6);
        set("SEARCHTYPE_POPULAR_ROOMS", 1);
        set("SEARCHTYPE_ROOMS_WITH_HIGHEST_SCORE", 2);
        set("SEARCHTYPE_MY_FRIENDS_ROOMS", 3);
        set("SEARCHTYPE_ROOMS_WHERE_MY_FRIENDS_ARE", 4);
        set("SEARCHTYPE_MY_ROOMS", 5);
        set("SEARCHTYPE_MY_FAVOURITES", 6);
        set("_SafeStr_7610", 7);
        set("SEARCHTYPE_TEXT_SEARCH", 8);
        set("SEARCHTYPE_TAG_SEARCH", 9);
        set("SEARCHTYPE_ROOM_NAME_SEARCH", 10);
        set("SEARCHTYPE_OFFICIALROOMS", 11);
        set("_SafeStr_8400", 12);
        set("SEARCHTYPE_GROUP_NAME_SEARCH", 13);
        set("SEARCHTYPE_GUILD_BASES", 14);
        set("SEARCHTYPE_COMPETITION_ROOMS", 15);
        set("_SafeStr_7620", 16);
        set("_SafeStr_8691", 17);
        set("_SafeStr_8501", 18);
        set("SEARCHTYPE_MY_GUILD_BASES", 19);
        set("SEARCHTYPE_BY_OWNER", 20);
        set("SEARCHTYPE_CATEGORIES", 21);
        set("SEARCHTYPE_RECOMMENDED_ROOMS", 22);
        set("_SafeStr_8762", 23);
        set("TAB_NAMES", new Dictionary());
        Tabs.TAB_NAMES.set("popular", 2);
        Tabs.TAB_NAMES.set("official", 4);
        Tabs.TAB_NAMES.set("me", 3);
        Tabs.TAB_NAMES.set("events", 1);
        Tabs.TAB_NAMES.set("search", 5);
        Tabs.TAB_NAMES.set("categories", 6);
    }
}
