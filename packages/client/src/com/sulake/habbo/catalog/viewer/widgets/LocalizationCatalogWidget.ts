import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { WindowLinkEvent } from '@/com/sulake/core/window/events/WindowLinkEvent';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class LocalizationCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::LocalizationCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        LocalizationCatalogWidget.#initStatics();
        return LocalizationCatalogWidget._log;
    }

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._SafeStr_3753 = new Dictionary();
        this._catalog = param2;
    }

    declare private _SafeStr_3753: Map<any, any>;

    declare private _catalog: HabboCatalog;

    public override dispose(): void {
        super.dispose();
        this._catalog = null;
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.initLocalizables();
        this.initStaticImages();
        this.initLinks();
        this.events.addEventListener("SELECT_PRODUCT", this.onProductSelected);
        return true;
    }

    protected initLocalizables(): void {
        let _loc9_: string = null;
        let _loc6_: string = null;
        let _loc8_: IWindow = null;
        let _loc2_: any = null;
        let _loc5_: any = null;
        let _loc4_: number = 0;
        this._SafeStr_3753 = new Dictionary();
        this._catalog.mainContainer.findChildByName("catalog.header.description").caption = "";
        _loc4_ = 0;
        while (_loc4_ < this.page.localization.textCount) {
            _loc9_ = this.page.localization.getTextElementName(_loc4_, this.page.layoutCode);
            _loc6_ = this.page.localization.getTextElementContent(_loc4_);
            if (_loc9_ == "catalog.header.description") {
                _loc8_ = this._catalog.mainContainer.findChildByName(_loc9_);
            } else if (this._window != null) {
                _loc8_ = this._window.findChildByName(_loc9_);
            }
            if (_loc8_ != null) {
                _loc6_ = _loc6_.replace(/\r\n/g, "\n");
                _loc8_.caption = _loc6_;
                if (isIHTMLTextWindow(_loc8_)) {
                    _loc8_.addEventListener("WE_LINK", this.onClickHtmlLink);
                    this.setLinkStyle(isIHTMLTextWindow(_loc8_) ? _loc8_ : null);
                }
            } else {
                LocalizationCatalogWidget._log.warn("[Localization Catalog Widget] Could not place text in layout:  element: " + _loc9_ + ", content: " + _loc6_);
            }
            _loc4_++;
        }
        _loc4_ = 0;
        while (_loc4_ < this.page.localization.imageCount) {
            _loc9_ = this.page.localization.getImageElementName(_loc4_, this.page.layoutCode);
            _loc6_ = this.page.localization.getImageElementContent(_loc4_);
            if (_loc9_ != "") {
                if (_loc6_ != "") {
                    _loc5_ = _loc6_;
                    this._SafeStr_3753.set(_loc5_, _loc9_);
                    if (this.page.viewer.catalog.assets.hasAsset(stringOrNull(_loc5_))) {
                        this.setElementImage(_loc9_, stringOrNull(_loc5_));
                    } else {
                        this.retrieveCatalogImage(stringOrNull(_loc5_));
                    }
                }
            }
            _loc4_++;
        }
        let _loc1_: ICatalogNode = this._catalog.currentCatalogNavigator.getNodeById(this.page.pageId);
        let _loc7_: IWindow = this._catalog.mainContainer.findChildByName("catalog.header.title");
        let _loc3_: IStaticBitmapWrapperWindow = asGuarded(this._catalog.mainContainer.findChildByName("catalog.header.icon"), isIStaticBitmapWrapperWindow);
        if (_loc7_ != null) {
            _loc7_.caption = _loc1_ != null ? _loc1_.localization : (this.page.mode == 1 ? "${catalog.search.header}" : "${catalog.header}");
        }
        if (_loc3_ != null && _loc1_ != null) {
            _loc3_.assetUri = this.page.mode == 1 ? "common_small_pen" : (this._catalog.catalogType == "BUILDERS_CLUB" ? this._catalog.imageGalleryHost + "icon_193.png" : this._catalog.imageGalleryHost + _loc1_.iconName + ".png");
        }
    }

    private initLinks(): void {
        let _loc2_: IWindow = null;
        if (this.page.hasLinks) {
            for (const _loc1_ of this.page.links ?? []) {
                _loc2_ = this._window.findChildByName(stringOrNull(_loc1_));
                if (_loc2_ != null) {
                    _loc2_.setParamFlag(1);
                    _loc2_.mouseThreshold = 0;
                    _loc2_.addEventListener("WME_CLICK", this.onClickLink);
                }
            }
        }
    }

    private onClickLink = (param1: WindowMouseEvent): void => {
        let _loc7_: any;
        let _loc3_: any = null;
        let _loc4_: IHabboLocalizationManager = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).localization;
        let _loc2_: ICoreConfiguration = asInstanceOf(this.page.viewer.catalog, HabboCatalog);
        let _loc6_: string = param1.target.name;
        let _loc5_: string = "";
        switch (this.page.layoutCode) {
            case "frontpage3":
                switch (_loc6_) {
                    case "ctlg_txt3":
                        if (param1.target.caption != "") {
                            _loc5_ = this.page.localization.getTextElementContent(6);
                            this.page.viewer.catalog.openCatalogPage(_loc5_);
                        }
                        break;
                    case "ctlg_txt7":
                        if (param1.target.caption != "") {
                            _loc5_ = this.page.localization.getTextElementContent(10);
                            if (_loc5_.indexOf("http") >= 0) {
                                this.openExternalLink(_loc5_);
                                break;
                            }
                            if (_loc5_ == "credits") {
                                HabboWebTools.openWebPageAndMinimizeClient(this._catalog.getProperty("web.shop.relativeUrl"));
                                break;
                            }
                            this.page.viewer.catalog.openCatalogPage(_loc5_);
                        }
                }
                break;
            case "info_pixels":
                switch (_loc6_) {
                    case "ctlg_text_5":
                        this._catalog.questEngine.showAchievements();
                        break;
                    case "ctlg_text_7":
                        _loc5_ = this.page.localization.getTextElementContent(7);
                        this.page.viewer.catalog.openCatalogPage(_loc5_);
                }
                break;
            case "info_credits":
                switch (_loc6_) {
                    case "ctlg_text_5":
                        HabboWebTools.openWebPageAndMinimizeClient(this._catalog.getProperty("web.shop.relativeUrl"));
                        break;
                    case "ctlg_text_7":
                        _loc5_ = this.page.localization.getTextElementContent(7);
                        this.page.viewer.catalog.openCatalogPage(_loc5_);
                }
                break;
            case "collectibles":
                _loc7_ = _loc6_;
                if ("ctlg_collectibles_link" !== _loc7_) {
                    break;
                }
                _loc5_ = _loc2_.getProperty("link.format.collectibles");
                this.openExternalLink(_loc5_);
                break;
            case "club1":
                _loc7_ = _loc6_;
                if ("ctlg_text_5" !== _loc7_) {
                    break;
                }
                this.page.viewer.catalog.openCatalogPage("hc_membership");
                break;
            case "club_buy":
                _loc7_ = _loc6_;
                if ("club_link" !== _loc7_) {
                    break;
                }
                _loc5_ = _loc2_.getProperty("link.format.club");
                this.openExternalLink(_loc5_);
                break;
            case "mad_money":
                _loc7_ = _loc6_;
                if ("ctlg_madmoney_button" !== _loc7_) {
                    break;
                }
                _loc5_ = _loc2_.getProperty("link.format.madmoney");
                this.openExternalLink(_loc5_);
                break;
            case "monkey":
                switch (_loc6_) {
                    case "ctlg_teaserimg_1_region":
                    case "ctlg_special_img_region":
                        _loc5_ = _loc4_.getLocalization("link.format.monkey", "http://store.apple.com/");
                        this.openExternalLink(_loc5_);
                        break;
                }
                break;
            case "niko":
                switch (_loc6_) {
                    case "ctlg_teaserimg_1_region":
                    case "ctlg_special_img_region":
                        _loc5_ = _loc4_.getLocalization("link.format.niko", "http://itunes.apple.com/us/app/niko/id481670205?mt=8");
                        this.openExternalLink(_loc5_);
                        break;
                }
                break;
            default:
                LocalizationCatalogWidget._log.warn("[Localization Catalog Widget] Unhandled link clicked" + [this.page.layoutCode, _loc6_]);
        }
    };

    private openExternalLink(param1: string): void {
        if (param1 != "") {
            this.page.viewer.catalog.windowManager.alert("${catalog.alert.external.link.title}", "${catalog.alert.external.link.desc}", 0, this.onExternalLink);
            HabboWebTools.navigateToURL(param1, "habboMain");
        }
    }

    private onExternalLink = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private initStaticImages(): void {
        let _loc4_: string = null;
        let _loc2_: string = null;
        let _loc1_: any[] = [];
        this._window.groupChildrenWithTag("STATIC_IMAGE", _loc1_, 10);
        for (const _loc3_ of _loc1_ ?? []) {
            if (isIBitmapWrapperWindow(_loc3_)) {
                _loc4_ = stringOrNull(_loc3_.name);
                _loc2_ = stringOrNull(_loc3_.name);
                this._SafeStr_3753.set(_loc2_, _loc4_);
                if (this.page.viewer.catalog.assets.hasAsset(_loc2_)) {
                    this.setElementImage(_loc4_, _loc2_);
                } else {
                    this.retrieveCatalogImage(_loc2_);
                }
            }
        }
    }

    private onClickHtmlLink = (param1: WindowEvent): void => {
        let _loc2_: WindowLinkEvent = param1 instanceof WindowLinkEvent ? param1 : null;
        if (_loc2_ != null) {
            LocalizationCatalogWidget._log.info("=============== HTML LINK: " + _loc2_.link);
        } else {
            LocalizationCatalogWidget._log.warn("=============== BAD HTML LINK: " + param1.target);
        }
    };

    private setElementImage(param1: string, param2: string): void {
        let _loc9_: IWindow = null;
        let _loc7_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc8_: string = null;
        let _loc6_: string = null;
        LocalizationCatalogWidget._log.info("[Localization Catalog Widget] Set Element Image: " + [param1, param2]);
        if (this._window == null) {
            LocalizationCatalogWidget._log.warn("[Localization Catalog Widget] Window is null! " + [param1, param2]);
            return;
        }
        if (this._window.disposed) {
            LocalizationCatalogWidget._log.warn("[Localization Catalog Widget] Window is disposed! " + [param1, param2, this._window.name]);
            return;
        }
        if (param1 == "catalog.header.image") {
            _loc9_ = this._catalog.mainContainer.findChildByName(param1);
        } else {
            _loc9_ = this._window.findChildByName(param1);
        }
        if (isIBitmapWrapperWindow(_loc9_)) {
            _loc7_ = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param2), BitmapDataAsset);
            if (_loc7_ == null) {
                LocalizationCatalogWidget._log.warn("[Localization Catalog Widget] Asset does not exist (Bitmap window): " + [param1, param2]);
                return;
            }
            _loc4_ = asInstanceOf(_loc7_.content, BitmapData);
            if ((isIBitmapWrapperWindow(_loc9_) ? _loc9_ : null).bitmap == null) {
                (isIBitmapWrapperWindow(_loc9_) ? _loc9_ : null).bitmap = new BitmapData(_loc9_.width, _loc9_.height, true, 16777215);
            }
            (isIBitmapWrapperWindow(_loc9_) ? _loc9_ : null).bitmap.fillRect((isIBitmapWrapperWindow(_loc9_) ? _loc9_ : null).bitmap.rect, 16777215);
            _loc3_ = (_loc9_.width - _loc4_.width) / 2 | 0;
            _loc5_ = (_loc9_.height - _loc4_.height) / 2 | 0;
            (isIBitmapWrapperWindow(_loc9_) ? _loc9_ : null).bitmap.copyPixels(_loc4_, _loc4_.rect, new Point(_loc3_, _loc5_), null, null, true);
        } else if (isIStaticBitmapWrapperWindow(_loc9_)) {
            _loc8_ = this._catalog.getProperty("image.library.catalogue.url");
            _loc6_ = _loc8_ + param2 + ".gif";
            LocalizationCatalogWidget._log.info("[Localization Catalog Widget] Static Image: " + _loc6_);
            (isIStaticBitmapWrapperWindow(_loc9_) ? _loc9_ : null).assetUri = _loc6_;
        } else {
            LocalizationCatalogWidget._log.warn("[Localization Catalog Widget] Could not find element: " + param1);
        }
    }

    private retrieveCatalogImage(param1: string): void {
        let _loc5_: any = null;
        let _loc9_: IWindow = null;
        let _loc6_: string = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).getProperty("image.library.catalogue.url");
        let _loc2_: string = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).getProperty("image.library.url") + "Top_Story_Images/";
        let _loc8_: string = stringOrNull(this._SafeStr_3753.get(param1));
        if (_loc8_ == "catalog.header.image") {
            _loc9_ = this._catalog.mainContainer.findChildByName(_loc8_);
        } else {
            _loc9_ = this._window.findChildByName(_loc8_);
        }
        if (_loc9_ && _loc9_.tags.indexOf("TOP_STORY") > -1) {
            _loc5_ = _loc2_;
        } else {
            _loc5_ = _loc6_;
        }
        let _loc7_: string = _loc5_ + param1 + ".gif";
        LocalizationCatalogWidget._log.info("[Localization Catalog Widget]  : " + _loc7_);
        let _loc3_: URLRequest = new URLRequest(_loc7_);
        let _loc4_: AssetLoaderStruct = this.page.viewer.catalog.assets.loadAssetFromFile(param1, _loc3_, "image/gif");
        _loc4_.addEventListener("AssetLoaderEventComplete", this.onCatalogImageReady);
    }

    private setLinkStyle(param1: ITextWindow): void {
        if (!param1) {
            return;
        }
        let _loc6_: StyleSheet = new StyleSheet();
        let _loc2_: any = {};
        _loc2_.color = "#336a95";
        let _loc3_: any = {};
        _loc3_.textDecoration = "underline";
        _loc3_.color = "#333333";
        let _loc5_: any = {};
        _loc5_.color = "#41b7d9";
        let _loc4_: any = {};
        _loc4_.textDecoration = "underline";
        _loc6_.setStyle("a:link", _loc3_);
        _loc6_.setStyle("a:hover", _loc2_);
        _loc6_.setStyle("a:active", _loc5_);
        _loc6_.setStyle(".visited", _loc4_);
        param1.styleSheet = _loc6_;
    }

    private onProductSelected = (param1: SelectProductEvent): void => {
        if (param1 == null) {
        }
    };

    private onCatalogImageReady = (param1: AssetLoaderEvent): void => {
        let _loc2_: string = null;
        let _loc4_: string = null;
        let _loc3_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc3_ != null) {
            _loc2_ = _loc3_.assetName;
            _loc4_ = stringOrNull(this._SafeStr_3753.get(_loc2_));
            this.setElementImage(_loc4_, _loc2_);
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (LocalizationCatalogWidget.#staticsReady) return;
        LocalizationCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(LocalizationCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.LocalizationCatalogWidget"));
    }
}
