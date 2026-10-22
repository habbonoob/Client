import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarEditorGridView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorGridView';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarEditorGridView } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridView';
import { AvatarEditorGridViewEffects } from '@/com/sulake/habbo/avatar/effects/AvatarEditorGridViewEffects.group';
import { AvatarEditorNameChangeView } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';

export class AvatarEditorView {
    static { registerClassName(this, 'com.sulake.habbo.avatar::AvatarEditorView'); }

    private static readonly SAVE_TIMEOUT_MS: number = 1500;
    private static readonly DEFAULT_LOCATION: Point = new Point(100, 30);
    public static THUMB_WINDOW: IWindowContainer;
    public static COLOUR_WINDOW: IWindowContainer;
    public static TAB_BACKGROUND_COLOUR: number = 6710886;

    constructor(param1: HabboAvatarEditor, param2: any[]) {
        this._editor = param1;
        this._SafeStr_2900 = new Timer(1500, 1);
        this._SafeStr_2900.addEventListener("timer", this.onUpdate);
        if (param1.manager.getBoolean("effects.in.avatar.editor")) {
            this._allCategories.push("effects");
        }
        if (param1.manager.getBoolean("clothing.misc.tab.enabled")) {
            this._allCategories.push("misc");
        }
        if (param2 == null) {
            param2 = this._allCategories;
        }
        for (const _loc3_ of param2 ?? []) {
            this._availableCategories.push(_loc3_);
        }
        this.createWindow();
    }

    declare private _editor: HabboAvatarEditor;

    declare private _SafeStr_2154: IWindowContainer;

    declare private _currentViewId: string;

    declare private _SafeStr_2536: ITabContextWindow;

    declare private _SafeStr_2229: IFrameWindow;

    declare private _SafeStr_3152: IWindowContainer;

    declare private _SafeStr_2900: Timer;

    private _SafeStr_3946: number = 4;

    declare private _SafeStr_4956: string;

    private _showWardrobeOnUpdate: boolean = true;
    private _availableCategories: any[] = [];
    private _allCategories: any[] = ["generic", "head", "torso", "legs", "hotlooks", "wardrobe", "nfts"];

    declare private _categoryContainers: Map<any, any>;

    declare private _gridView: IAvatarEditorGridView;

    declare private _effectsGridView: IAvatarEditorGridView;

    declare private _avatarEditorNameChangeView: AvatarEditorNameChangeView;

    public get effectsParamViewContainer(): IWindowContainer {
        return castGuarded(this._SafeStr_2154.findChildByName("effectParamsContainer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    public get collectiblesAvatarInfoContainer(): IWindowContainer {
        return castGuarded(this._SafeStr_2154.findChildByName("collectible_avatar_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
    }

    public get gridView(): IAvatarEditorGridView {
        return this._gridView;
    }

    public get effectsGridView(): IAvatarEditorGridView {
        return this._effectsGridView;
    }

    public get editor(): HabboAvatarEditor {
        return this._editor;
    }

    public get avatarEditorNameChangeView(): AvatarEditorNameChangeView {
        return this._avatarEditorNameChangeView;
    }

    public get currentViewId(): string {
        return this._currentViewId;
    }

    public dispose(): void {
        let _loc3_: IWindowContainer = null;
        let _loc2_: IWindowContainer = null;
        let _loc1_: IWindowContainer = null;
        if (this._SafeStr_2900 != null) {
            this._SafeStr_2900.stop();
            this._SafeStr_2900.removeEventListener("timer", this.onUpdate);
            this._SafeStr_2900 = null;
        }
        if (this._SafeStr_2536) {
            this._SafeStr_2536.dispose();
            this._SafeStr_2536 = null;
        }
        if (this._SafeStr_2154) {
            this._SafeStr_2154.dispose();
            this._SafeStr_2154 = null;
        }
        if (this._SafeStr_3152 != null) {
            this._SafeStr_3152.dispose();
            this._SafeStr_3152 = null;
        }
        if (this._SafeStr_2229) {
            this._SafeStr_2229.dispose();
            this._SafeStr_2229 = null;
        }
        if (this._SafeStr_2154 != null) {
            _loc3_ = asGuarded(this._SafeStr_2154.findChildByName("figureContainer"), isIWindowContainer);
            if (_loc3_ != null) {
                while (_loc3_.numChildren > 0) {
                    _loc3_.removeChildAt(0);
                }
            }
            _loc2_ = asGuarded(this._SafeStr_2154.findChildByName("contentArea"), isIWindowContainer);
            if (_loc2_ != null) {
                while (_loc2_.numChildren > 0) {
                    _loc2_.removeChildAt(0);
                }
            }
            _loc1_ = asGuarded(this._SafeStr_2154.findChildByName("sideContainer"), isIWindowContainer);
            if (_loc1_ != null) {
                while (_loc1_.numChildren > 0) {
                    _loc1_.removeChildAt(0);
                }
            }
            this._editor = null;
        }
    }

    public getFrame(param1: any[], param2: string = null): IFrameWindow {
        if (this._SafeStr_2229) {
            this._SafeStr_2229.visible = true;
            this._SafeStr_2229.activate();
            return this._SafeStr_2229;
        }
        if (this._SafeStr_2229) {
            this._SafeStr_2229.dispose();
            this._SafeStr_2229 = null;
        }
        let _loc3_: XmlAsset = asInstanceOf(this._editor.manager.assets.getAssetByName("AvatarEditorFrame"), XmlAsset);
        if (_loc3_) {
            this._SafeStr_2229 = asGuarded(this._editor.manager.windowManager.buildFromXML(asInstanceOf(_loc3_.content, XML)), isIFrameWindow);
        }
        if (this._SafeStr_2229 == null) {
            return null;
        }
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_2229.findChildByName("maincontent"), isIWindowContainer);
        if (!this.embedToContext(_loc4_, param1)) {
            this._SafeStr_2229.dispose();
            this._SafeStr_2229 = null;
            return null;
        }
        if (param2 && this._SafeStr_2229.header != null) {
            this._SafeStr_2229.header.title.text = param2;
        }
        this._SafeStr_2229.position = AvatarEditorView.DEFAULT_LOCATION;
        this._SafeStr_2229.findChildByName("header_button_close").procedure = this.windowEventProc;
        return this._SafeStr_2229;
    }

    public embedToContext(param1: IWindowContainer, param2: any[]): boolean {
        let _loc3_: number = 0;
        if (!this.validateAvailableCategories(param2)) {
            return false;
        }
        if (param1) {
            _loc3_ = param1.getChildIndex(this._SafeStr_2154);
            if (_loc3_) {
                param1.removeChildAt(_loc3_);
            }
            param1.addChild(this._SafeStr_2154);
        } else {
            if (this._SafeStr_3152 == null) {
                this._SafeStr_3152 = asGuarded(this._editor.manager.windowManager.createWindow("avatarEditorContainer", "", 4, 3, (0x020000 | 1) >>> 0, new Rectangle(0, 0, 2, 2), null, 0), isIWindowContainer);
                this._SafeStr_3152.addChild(this._SafeStr_2154);
            }
            _loc3_ = this._SafeStr_3152.getChildIndex(this._SafeStr_2154);
            if (_loc3_) {
                param1.removeChildAt(_loc3_);
            }
            this._SafeStr_3152.visible = true;
        }
        return true;
    }

    public validateAvailableCategories(param1: any[]): boolean {
        if (param1 == null) {
            return this.validateAvailableCategories(this._allCategories);
        }
        if (param1.length != this._availableCategories.length) {
            return false;
        }
        for (const _loc2_ of param1 ?? []) {
            if (this._availableCategories.indexOf(_loc2_) < 0) {
                return false;
            }
        }
        return true;
    }

    public show(): void {
        if (this._SafeStr_2229) {
            this._SafeStr_2229.visible = true;
        } else if (this._SafeStr_2154) {
            this._SafeStr_2154.visible = true;
        }
    }

    public hide(): void {
        if (this._SafeStr_2229) {
            this._SafeStr_2229.visible = false;
        } else if (this._SafeStr_2154) {
            this._SafeStr_2154.visible = false;
        }
    }

    public update(): void {
        let _loc1_: IWindow = asGuarded(this._SafeStr_2154.findChildByName("wardrobeButtonContainer"), isIWindow);
        if (_loc1_ && this._editor.manager.sessionData) {
            _loc1_.visible = this._editor.manager.sessionData.hasClub && this._editor.isSideContentEnabled();
            _loc1_.visible = this._editor.isSideContentEnabled();
        }
        let _loc2_: string = "nothing";
        if (this._SafeStr_4956 == "wardrobe" || this._showWardrobeOnUpdate) {
            _loc2_ = "wardrobe";
        }
        if (!this._editor.isSideContentEnabled()) {
            _loc2_ = "nothing";
        }
        if (this._editor.hasInvalidClubItems()) {
            this._editor.stripClubItems();
            this._editor.disableClubClothing();
        }
        if (this._editor.hasInvalidSellableItems()) {
            this._editor.stripInvalidSellableItems();
        }
        this.setSideContent(_loc2_);
        this.setViewToCategory(this._currentViewId);
    }

    public toggleCategoryView(param1: string, param2: boolean = false): void {
        if (param2) {
        }
        this.setViewToCategory(param1);
    }

    public windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: string = null;
        let _loc6_: boolean = false;
        let _loc4_: boolean = false;
        let _loc5_: boolean = false;
        if (param1.type == "WE_SELECTED") {
            _loc3_ = (isITabContextWindow(param2) ? param2 : null).selector.getSelected().name;
            if (_loc3_ != this._currentViewId) {
                _loc6_ = false;
                _loc4_ = false;
                _loc5_ = false;
                if (_loc3_ != "effects" && _loc3_ != "hotlooks") {
                    if (this._editor.hasNftOutfit() && "nfts" == _loc3_) {
                        _loc5_ = true;
                    } else if (this._editor.hasNftOutfit() && _loc3_ != "nfts") {
                        _loc6_ = true;
                    } else if (this.editor.hasSetNftOutfitInViewer() && _loc3_ != "nfts") {
                        _loc4_ = true;
                    }
                }
                if (this._editor.hasNftOutfit() && _loc3_ == "effects") {
                    _loc5_ = true;
                }
                this._editor.toggleAvatarEditorPage(_loc3_);
                if (_loc6_) {
                    this._editor.loadFallbackFigure();
                } else if (_loc4_) {
                    this._editor.loadRollbackFigure();
                } else if (_loc5_) {
                    this._editor.loadNftFigure();
                }
            }
        } else if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "save":
                    if (!this._editor.isDevelopmentEditor() && this._editor.hasInvalidSellableItems()) {
                        this.startSellablePurchase();
                        this._SafeStr_2900.start();
                        this._SafeStr_2154.findChildByName("save").disable();
                        return;
                    }
                    if (!this._editor.isDevelopmentEditor() && this._editor.hasInvalidClubItems()) {
                        this._editor.openHabboClubAdWindow();
                        this._SafeStr_2900.start();
                        this._SafeStr_2154.findChildByName("save").disable();
                        return;
                    }
                    this._SafeStr_2900.start();
                    this._SafeStr_2154.findChildByName("save").disable();
                    this._editor.saveCurrentSelection();
                    this._editor.manager.close(this._editor.instanceId);
                    break;
                case "cancel":
                case "header_button_close":
                    if (this._editor.hasInvalidClubItems()) {
                        this._editor.stripClubItems();
                        this._editor.disableClubClothing();
                    }
                    this._editor.manager.close(this._editor.instanceId);
                    break;
                case "rotate_avatar":
                    this._SafeStr_3946 = this._SafeStr_3946 + 1;
                    if (this._SafeStr_3946 > 7) {
                        this._SafeStr_3946 = 0;
                    }
                    this._editor.figureData.direction = this._SafeStr_3946;
                    break;
                case "wardrobe":
                    this.toggleWardrobe();
                    break;
                case "avatar_name_change":
                    if (this._avatarEditorNameChangeView != null) {
                        this._avatarEditorNameChangeView.focus();
                        break;
                    }
                    this._avatarEditorNameChangeView = new AvatarEditorNameChangeView(this, this._SafeStr_2154.x + this._SafeStr_2154.width, this._SafeStr_2154.y);
            }
        }
    };

    public getCategoryContainer(param1: string): IWindow {
        return this._categoryContainers.get(param1);
    }

    public getFigureContainer(): IWidgetWindow {
        return asGuarded(this._SafeStr_2154.findChildByName("avatarWidget"), isIWidgetWindow);
    }

    private createWindow(): void {
        let _loc4_: number = 0;
        let _loc3_: ITabButtonWindow = null;
        let _loc5_: number = 0;
        let _loc7_: IWindow = null;
        if (this._SafeStr_2154 == null) {
            this._SafeStr_2154 = asGuarded(this._editor.manager.windowManager.buildFromXML(asInstanceOf((asInstanceOf(this._editor.manager.assets.getAssetByName("AvatarEditorContent"), XmlAsset)).content, XML)), isIWindowContainer);
        }
        if (AvatarEditorView.THUMB_WINDOW == null) {
            AvatarEditorView.THUMB_WINDOW = asGuarded(this._SafeStr_2154.findChildByName("thumb_template"), isIWindowContainer);
            if (AvatarEditorView.THUMB_WINDOW) {
                this._SafeStr_2154.removeChild(AvatarEditorView.THUMB_WINDOW);
            }
        }
        if (AvatarEditorView.COLOUR_WINDOW == null) {
            AvatarEditorView.COLOUR_WINDOW = asGuarded(this._SafeStr_2154.findChildByName("palette_template"), isIWindowContainer);
            if (AvatarEditorView.COLOUR_WINDOW) {
                this._SafeStr_2154.removeChild(AvatarEditorView.COLOUR_WINDOW);
            }
        }
        if (this._editor.manager != null && this._editor.manager.sessionData != null) {
            this._SafeStr_2154.findChildByName("avatar_name").caption = this._editor.manager.sessionData.userName;
            if (this._editor.manager.getBoolean("premium.name.change.enabled")) {
                this._SafeStr_2154.findChildByName("avatar_name_change").visible = true;
            }
        }
        this._SafeStr_2154.procedure = this.windowEventProc;
        this._SafeStr_2536 = asGuarded(this._SafeStr_2154.findChildByName("mainTabs"), isITabContextWindow);
        let _loc1_: string[] = new Array<string>(0).fill(null);
        _loc4_ = this._SafeStr_2536.numTabItems - 1;
        while (_loc4_ >= 0) {
            _loc3_ = this._SafeStr_2536.getTabItemAt(_loc4_ >>> 0);
            _loc1_.push(_loc3_.name);
            if (_loc3_ != null && this._availableCategories.indexOf(_loc3_.name) < 0) {
                this._SafeStr_2536.removeTabItem(_loc3_);
                _loc5_ = _loc4_ + 1;
                while (_loc5_ < this._SafeStr_2536.numTabItems) {
                    this._SafeStr_2536.getTabItemAt(_loc5_ >>> 0).x = this._SafeStr_2536.getTabItemAt(_loc5_ >>> 0).x - _loc3_.width;
                    _loc5_++;
                }
            }
            _loc4_--;
        }
        this._categoryContainers = new Dictionary();
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2154.findChildByName("contentArea"), isIWindowContainer);
        for (const _loc6_ of _loc1_ ?? []) {
            _loc7_ = _loc2_.findChildByName(_loc6_ + "_content");
            if (_loc7_) {
                this._categoryContainers.set(_loc6_, _loc2_.removeChild(_loc7_));
            }
        }
        this._gridView = new AvatarEditorGridView(asGuarded(this._SafeStr_2154.findChildByName("grid_container"), isIWindowContainer));
        this._effectsGridView = new AvatarEditorGridViewEffects(asGuarded(this._SafeStr_2154.findChildByName("grid_container"), isIWindowContainer));
        this._SafeStr_2536.selector.setSelected(this._SafeStr_2536.getTabItemAt(0));
        this.update();
    }

    private toggleWardrobe(): void {
        if (this._SafeStr_4956 == "wardrobe") {
            this._showWardrobeOnUpdate = false;
            this.setSideContent("nothing");
        } else {
            this.setSideContent("wardrobe");
        }
    }

    private setSideContent(param1: string): void {
        let _loc5_: number = 0;
        if (this._SafeStr_4956 == param1) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2154.findChildByName("sideContainer"), isIWindowContainer);
        if (!_loc2_) {
            return;
        }
        let _loc4_: IWindow = null;
        switch (param1) {
            case "nothing":
                break;
            case "wardrobe":
                _loc4_ = this._editor.getSideContentWindowContainer("wardrobe");
        }
        let _loc3_: IWindow = _loc2_.removeChildAt(0);
        if (_loc3_) {
            this._SafeStr_2154.width -= _loc3_.width;
        }
        if (_loc4_) {
            _loc2_.addChild(_loc4_);
            _loc4_.visible = true;
            _loc2_.width = _loc4_.width;
        } else {
            _loc2_.width = 0;
        }
        this._SafeStr_4956 = param1;
        if (this._SafeStr_2229) {
            _loc5_ = 8;
            this._SafeStr_2229.content.width = this._SafeStr_2154.width + _loc5_;
        }
    }

    private setViewToCategory(param1: string): void {
        if (param1 == null || param1 == "") {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2154.findChildByName("contentArea"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        this.effectsParamViewContainer.visible = param1 == "effects";
        this.collectiblesAvatarInfoContainer.visible = false;
        if ("nfts" == param1) {
            this._showWardrobeOnUpdate = false;
            this._SafeStr_2154.findChildByName("wardrobe").disable();
            this.setSideContent("nothing");
        } else {
            this._SafeStr_2154.findChildByName("wardrobe").enable();
        }
        let _loc4_: IWindow = _loc2_.getChildAt(0);
        _loc2_.removeChild(_loc4_);
        _loc2_.invalidate();
        let _loc3_: IWindow = this._editor.getCategoryWindowContainer(param1);
        if (_loc3_ == null) {
            return;
        }
        this._gridView.window.visible = false;
        _loc3_.visible = true;
        _loc2_.addChild(_loc3_);
        this._editor.activateCategory(param1);
        this._currentViewId = param1;
        this._SafeStr_2536.selector.setSelected(this._SafeStr_2536.getTabItemByName(param1));
    }

    private startSellablePurchase(): void {
        if (this._editor.manager.catalog) {
            this._editor.manager.catalog.openCatalogPage(this._editor.manager.getProperty("catalog.clothes.page"));
        }
    }

    private onUpdate = (param1: Event = null): void => {
        this._SafeStr_2900.stop();
        if (this._SafeStr_2154) {
            this._SafeStr_2154.findChildByName("save").enable();
        }
    };
}
