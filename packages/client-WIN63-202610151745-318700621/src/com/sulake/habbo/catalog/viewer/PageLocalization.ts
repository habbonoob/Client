import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPageLocalization } from '@/com/sulake/habbo/catalog/viewer/IPageLocalization';

export class PageLocalization implements IPageLocalization {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::PageLocalization'); }

    static #staticsReady = false;

    public static get HEADER_IMAGE(): string {
        PageLocalization.#initStatics();
        return PageLocalization.HEADER_IMAGE;
    }

    public static get _SafeStr_7670(): string {
        PageLocalization.#initStatics();
        return PageLocalization._SafeStr_7670;
    }

    public static get HEADER_TITLE(): string {
        PageLocalization.#initStatics();
        return PageLocalization.HEADER_TITLE;
    }

    public static get _SafeStr_7851(): string {
        PageLocalization.#initStatics();
        return PageLocalization._SafeStr_7851;
    }

    private static get DEFAULT_TEXT_FIELDS(): any[] {
        PageLocalization.#initStatics();
        return PageLocalization.DEFAULT_TEXT_FIELDS;
    }

    private static get DEFAULT_IMAGE_FIELDS(): any[] {
        PageLocalization.#initStatics();
        return PageLocalization.DEFAULT_IMAGE_FIELDS;
    }

    private static get LAYOUTS_IMAGE_FIELDS(): Map<any, any> {
        PageLocalization.#initStatics();
        return PageLocalization.LAYOUTS_IMAGE_FIELDS;
    }

    private static get LAYOUTS_TEXT_FIELDS(): Map<any, any> {
        PageLocalization.#initStatics();
        return PageLocalization.LAYOUTS_TEXT_FIELDS;
    }

    private static get LAYOUT_LINKS(): Map<any, any> {
        PageLocalization.#initStatics();
        return PageLocalization.LAYOUT_LINKS;
    }

    declare private _images: any[];

    declare private _texts: any[];

    constructor(param1: any[], param2: any[]) {
        this._images = param1;
        this._texts = param2;
    }

    public get imageCount(): number {
        return this._images.length | 0;
    }

    public get textCount(): number {
        return this._texts.length | 0;
    }

    public dispose(): void {
        this._images = null;
        this._texts = null;
    }

    public hasLinks(param1: string): boolean {
        return PageLocalization.LAYOUT_LINKS.get(param1) != null;
    }

    public getLinks(param1: string): any[] {
        return PageLocalization.LAYOUT_LINKS.get(param1);
    }

    public getTextElementName(param1: number, param2: string): string {
        let _loc3_: any[] = PageLocalization.LAYOUTS_TEXT_FIELDS.get(param2);
        if (_loc3_ == null) {
            _loc3_ = PageLocalization.DEFAULT_TEXT_FIELDS;
        }
        if (param1 < _loc3_.length) {
            return stringOrNull(_loc3_[param1]);
        }
        return "";
    }

    public getImageElementName(param1: number, param2: string): string {
        let _loc3_: any[] = PageLocalization.LAYOUTS_IMAGE_FIELDS.get(param2);
        if (_loc3_ == null) {
            _loc3_ = PageLocalization.DEFAULT_IMAGE_FIELDS;
        }
        if (param1 < _loc3_.length) {
            return stringOrNull(_loc3_[param1]);
        }
        return "";
    }

    public getTextElementContent(param1: number): string {
        if (param1 < this._texts.length) {
            return stringOrNull(this._texts[param1]);
        }
        return "";
    }

    public getImageElementContent(param1: number): string {
        if (param1 < this._images.length) {
            return stringOrNull(this._images[param1]);
        }
        return "";
    }

    public getColorUintFromText(param1: number): number {
        let _loc2_: string = null;
        if (param1 < this._texts.length) {
            _loc2_ = String(this._texts[param1]).replace("#", "0x");
            return Number(_loc2_) >>> 0;
        }
        return 0;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (PageLocalization.#staticsReady) return;
        PageLocalization.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(PageLocalization, name, { value, writable: true, configurable: true, enumerable: true });
        set("HEADER_IMAGE", null);
        set("_SafeStr_7670", null);
        set("HEADER_TITLE", null);
        set("_SafeStr_7851", null);
        set("DEFAULT_TEXT_FIELDS", null);
        set("DEFAULT_IMAGE_FIELDS", null);
        set("LAYOUTS_IMAGE_FIELDS", null);
        set("LAYOUTS_TEXT_FIELDS", null);
        set("LAYOUT_LINKS", null);
        set("HEADER_IMAGE", "catalog.header.image");
        set("_SafeStr_7670", "catalog.header.icon");
        set("HEADER_TITLE", "catalog.header.title");
        set("_SafeStr_7851", "catalog.header.description");
        set("DEFAULT_TEXT_FIELDS", ["catalog.header.description", "ctlg_description", "ctlg_special_txt", "ctlg_text_1", "ctlg_text_2"]);
        set("DEFAULT_IMAGE_FIELDS", ["catalog.header.image", "ctlg_teaserimg_1", "ctlg_special_img", "ctlg_teaserimg_2", "ctlg_teaserimg_3"]);
        set("LAYOUTS_IMAGE_FIELDS", new Dictionary());
        set("LAYOUTS_TEXT_FIELDS", new Dictionary());
        set("LAYOUT_LINKS", new Dictionary());
        PageLocalization.LAYOUTS_IMAGE_FIELDS.set("frontpage4", ["catalog.header.image", "ctlg_teaserimg_1"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("camera1", ["catalog.header.description", "ctlg_text_1"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("presents", ["catalog.header.description", "ctlg_text1"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("pets", ["catalog.header.description", "ctlg_text_1", "ctlg_text_2", "ctlg_text_3"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("pets2", ["catalog.header.description", "ctlg_text_1", "ctlg_text_2", "ctlg_text_3"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("pets3", ["catalog.header.description", "ctlg_text_1", "ctlg_text_2", "ctlg_text_3"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("info_rentables", ["catalog.header.description", "ctlg_text_1", "ctlg_text_2", "ctlg_text_3", "ctlg_text_4", "ctlg_text_5"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("info_duckets", ["ctlg_description"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("info_loyalty", ["ctlg_description"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("trophies", ["trophy.description", "trophy.enscription"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("frontpage4", ["ctlg_txt1", "ctlg_txt2"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("builders_club_frontpage", ["ctlg_description"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("builders_club_addons", ["ctlg_description"]);
        PageLocalization.LAYOUTS_TEXT_FIELDS.set("builders_club_loyalty", ["ctlg_description"]);
        PageLocalization.LAYOUT_LINKS.set("club_buy", ["club_link"]);
        PageLocalization.LAYOUT_LINKS.set("mad_money", ["ctlg_madmoney_button"]);
        PageLocalization.LAYOUT_LINKS.set("monkey", ["ctlg_teaserimg_1_region", "ctlg_special_img_region"]);
        PageLocalization.LAYOUT_LINKS.set("niko", ["ctlg_teaserimg_1_region", "ctlg_special_img_region"]);
        PageLocalization.LAYOUT_LINKS.set("pets3", ["ctlg_text_3"]);
    }
}
