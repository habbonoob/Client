import { asGuarded, asInstanceOf, isNumber, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { AvatarEditorMessageHandler } from '@/com/sulake/habbo/avatar/AvatarEditorMessageHandler';
import type { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import type { ISideContentModel } from '@/com/sulake/habbo/avatar/common/ISideContentModel';
import type { HabboAvatarEditorManager } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager';
import type { IHabboAvatarEditorDataSaver } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorDataSaver';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import type { NftOutfit } from '@/com/sulake/habbo/avatar/wardrobe/NftOutfit';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarEditorGridColorItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridColorItem';
import { AvatarEditorGridPartItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridPartItem';
import { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import { isIAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';
import { isISideContentModel } from '@/com/sulake/habbo/avatar/common/ISideContentModel';
import { EffectsModel__com_sulake_habbo_avatar_effects as EffectsModel } from '@/com/sulake/habbo/avatar/effects/AvatarEditorGridViewEffects.group';
import { AvatarUpdateEvent } from '@/com/sulake/habbo/avatar/events/AvatarUpdateEvent';
import { FigureData } from '@/com/sulake/habbo/avatar/figuredata/FigureData';
import { BodyModel } from '@/com/sulake/habbo/avatar/generic/BodyModel';
import { AvatarEditorView } from '@/com/sulake/habbo/avatar/HabboAvatarEditorManager.group';
import { HeadModel } from '@/com/sulake/habbo/avatar/head/HeadModel';
import { HotLooksModel } from '@/com/sulake/habbo/avatar/hotlooks/HotLooksModel';
import { LegsModel } from '@/com/sulake/habbo/avatar/legs/LegsModel';
import { MiscModel } from '@/com/sulake/habbo/avatar/misc/MiscModel';
import { NftAvatarsModel } from '@/com/sulake/habbo/avatar/nft/NftAvatarsModel';
import { TorsoModel } from '@/com/sulake/habbo/avatar/torso/TorsoModel';
import { WardrobeModel } from '@/com/sulake/habbo/avatar/wardrobe/WardrobeModel';
import { UserNftWardrobeSelectionMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/nft/UserNftWardrobeSelectionMessageEvent';
import { GetSelectedNftWardrobeOutfitMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nft/GetSelectedNftWardrobeOutfitMessageComposer';
import { SaveUserNftWardrobeMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/nft/SaveUserNftWardrobeMessageComposer';
import { UpdateFigureDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/register/UpdateFigureDataMessageComposer';

export class HabboAvatarEditor {
    static { registerClassName(this, 'com.sulake.habbo.avatar::HabboAvatarEditor'); }

    public static readonly DEFAULT_MALE_FIGURE: string = "hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007";
    public static readonly DEFAULT_FEMALE_FIGURE: string = "hr-515-33.hd-600-1.ch-635-70.lg-716-66-62.sh-735-68";
    private static readonly MAX_COLOR_LAYERS: number = 2;

    declare private _instanceId: number;
    static { (this.prototype as any)._instanceId = 0; }

    declare private _manager: HabboAvatarEditorManager;

    declare private _SafeStr_3735: IFigureSetData;

    declare private _view: AvatarEditorView;

    private _isInitialized: boolean = false;

    declare private _categories: UtilsMap;

    declare private _SafeStr_3215: UtilsMap;

    declare private _figures: Map<any, any>;

    private _gender: string = "M";

    declare private _figureString: string;

    private _SafeStr_3727: IHabboAvatarEditorDataSaver = null;
    private _SafeStr_5499: boolean = false;
    private _SafeStr_5309: boolean = false;
    private _setNftOutfit: NftOutfit = null;

    declare private _clubMemberLevel: number;
    static { (this.prototype as any)._clubMemberLevel = 0; }

    private _SafeStr_6117: boolean = false;

    declare private _SafeStr_4203: UserNftWardrobeSelectionMessageEvent;

    declare private _currentTokenId: string;

    private _SafeStr_5903: string = "hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007";
    private _SafeStr_7223: string = "M";
    private _SafeStr_6032: string = "hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007";
    private _SafeStr_6995: string = "M";

    constructor(param1: number, param2: HabboAvatarEditorManager, param3: boolean = false) {
        this._instanceId = param1;
        this._manager = param2;
        this._SafeStr_3735 = this._manager.avatarRenderManager.getFigureData();
        this._SafeStr_6117 = param3;
    }

    public dispose(): void {
        if (this._SafeStr_4203 != null) {
            this._manager.communication.removeHabboConnectionMessageEvent(this._SafeStr_4203);
            this._SafeStr_4203 = null;
        }
        if (this._categories != null) {
            for (let _loc2_ of valuesOf(this._categories)) {
                _loc2_.dispose();
                _loc2_ = null;
            }
            this._categories = null;
        }
        if (this._SafeStr_3215 != null) {
            for (let _loc1_ of valuesOf(this._SafeStr_3215)) {
                _loc1_.dispose();
                _loc1_ = null;
            }
            this._SafeStr_3215 = null;
        }
        if (this._view != null) {
            this._view.dispose();
            this._view = null;
        }
        this._SafeStr_3735 = null;
        this._figures = null;
        this._SafeStr_3727 = null;
    }

    private init(param1: any[] = null): void {
        if (this._isInitialized) {
            return;
        }
        if (this._manager.communication) {
            this._SafeStr_4203 = new UserNftWardrobeSelectionMessageEvent(this.onUserNftWardrobeMessage);
            this._manager.communication.addHabboConnectionMessageEvent(this._SafeStr_4203);
            this.sendGetSelectedNftWardrobeOutfitMessage();
        }
        this._categories = new UtilsMap();
        this._SafeStr_3215 = new UtilsMap();
        this._SafeStr_3215.add("wardrobe", new WardrobeModel(this));
        this._view = new AvatarEditorView(this, param1);
        this._figures = new Dictionary();
        this._figures.set("M", new FigureData(this));
        this._figures.set("F", new FigureData(this));
        let _loc3_: FigureData = this._figures.get("M");
        let _loc2_: FigureData = this._figures.get("F");
        _loc3_.loadAvatarData("hr-100.hd-180-7.ch-215-66.lg-270-79.sh-305-62.ha-1002-70.wa-2007", "M");
        _loc2_.loadAvatarData("hr-515-33.hd-600-1.ch-635-70.lg-716-66-62.sh-735-68", "F");
        this._categories.add("generic", new BodyModel(this));
        this._categories.add("head", new HeadModel(this));
        this._categories.add("torso", new TorsoModel(this));
        this._categories.add("legs", new LegsModel(this));
        this._categories.add("misc", new MiscModel(this));
        if (param1 == null || param1.indexOf("hotlooks") > -1) {
            this._categories.add("hotlooks", new HotLooksModel(this));
        }
        this._categories.add("effects", new EffectsModel(this));
        this._categories.add("nfts", new NftAvatarsModel(this));
        this._isInitialized = true;
    }

    private sendGetSelectedNftWardrobeOutfitMessage(): void {
        if (this._manager.communication) {
            this._manager.communication.connection.send(new GetSelectedNftWardrobeOutfitMessageComposer());
        }
    }

    private onUserNftWardrobeMessage = (param1: UserNftWardrobeSelectionMessageEvent): void => {
        this._currentTokenId = param1.getParser().currentTokenId;
        this._SafeStr_5903 = param1.getParser().fallbackFigureString;
        this._SafeStr_7223 = param1.getParser().fallbackFigureGender;
        if (this.hasNftOutfit() && this._view.currentViewId != "nfts") {
            this.loadFallbackFigure();
        }
    };

    public loadAvatarInEditor(param1: string, param2: string, param3: number = 0): void {
        switch (param2) {
            case "M":
            case "m":
            case "M":
                param2 = "M";
                break;
            case "F":
            case "f":
            case "F":
                param2 = "F";
                break;
            default:
                param2 = "M";
        }
        this.clubMemberLevel = param3;
        let _loc4_: boolean = false;
        let _loc5_: FigureData = this._figures.get(param2);
        if (_loc5_ == null) {
            return;
        }
        _loc5_.loadAvatarData(param1, param2);
        if (param2 != this.gender) {
            this.gender = param2;
            _loc4_ = true;
        }
        if (this._figureString != param1) {
            this._figureString = param1;
            _loc4_ = true;
        }
        if (this._categories && _loc4_) {
            for (const _loc6_ of valuesOf(this._categories)) {
                _loc6_.reset();
            }
        }
        if (this._view != null) {
            this._view.update();
        }
    }

    public getFigureSetType(param1: string): ISetType {
        if (this._SafeStr_3735 == null) {
            return null;
        }
        return this._SafeStr_3735.getSetType(param1);
    }

    public getPalette(param1: number): IPalette {
        if (this._SafeStr_3735 == null) {
            return null;
        }
        return this._SafeStr_3735.getPalette(param1);
    }

    public openWindow(param1: IHabboAvatarEditorDataSaver, param2: any[] = null, param3: boolean = false, param4: string = null, param5: string = "generic"): IFrameWindow {
        this._SafeStr_3727 = param1;
        this._SafeStr_5499 = param3;
        this.init(param2);
        this.selectDefaultCategory(param2, param5);
        return this._view.getFrame(param2, param4);
    }

    public embedToContext(param1: IWindowContainer = null, param2: IHabboAvatarEditorDataSaver = null, param3: any[] = null, param4: boolean = false): boolean {
        this._SafeStr_3727 = param2;
        this._SafeStr_5499 = param4;
        this.init(param3);
        this._view.embedToContext(param1, param3);
        this.selectDefaultCategory(param3);
        return true;
    }

    private selectDefaultCategory(param1: any[], param2: string = "generic"): void {
        let _loc3_: boolean = param1 != null && param1.length > 0;
        if (param2 != null && (!_loc3_ || param1.indexOf(param2) >= 0)) {
            this.toggleAvatarEditorPage(param2);
        } else if (_loc3_) {
            this.toggleAvatarEditorPage(stringOrNull(param1[0]));
        } else {
            this.toggleAvatarEditorPage("generic");
        }
    }

    public get instanceId(): number {
        return this._instanceId;
    }

    public hide(): void {
        this._view.hide();
    }

    public getCategoryWindowContainer(param1: string): IWindow {
        let _loc2_: IAvatarEditorCategoryModel = asGuarded(this._categories.getValue(param1), isIAvatarEditorCategoryModel);
        if (_loc2_ != null) {
            return _loc2_.getWindowContainer();
        }
        return null;
    }

    public activateCategory(param1: string): void {
        let _loc2_: IAvatarEditorCategoryModel = asGuarded(this._categories.getValue(param1), isIAvatarEditorCategoryModel);
        if (_loc2_) {
            _loc2_.switchCategory();
        }
    }

    public getSideContentWindowContainer(param1: string): IWindowContainer {
        let _loc2_: ISideContentModel = asGuarded(this._SafeStr_3215.getValue(param1), isISideContentModel);
        if (_loc2_ != null) {
            return _loc2_.getWindowContainer();
        }
        return null;
    }

    public toggleAvatarEditorPage(param1: string): void {
        if (this._view) {
            this._view.toggleCategoryView(param1, false);
        }
    }

    public useClubClothing(): void {
        if (this._categories == null) {
            return;
        }
        this.update();
    }

    public disableClubClothing(): void {
        if (this._categories == null) {
            return;
        }
        this.update();
    }

    public get figureData(): FigureData {
        return this._figures.get(this._gender);
    }

    public saveCurrentSelection(): void {
        let _loc1_: string = this.figureData.getFigureString();
        let _loc2_: string = this.figureData.gender;
        if (this._SafeStr_3727 != null) {
            this._SafeStr_3727.saveFigure(_loc1_, _loc2_);
        } else {
            if (this._manager.communication) {
                if (this._setNftOutfit != null) {
                    this._manager.communication.connection.send(new SaveUserNftWardrobeMessageComposer(this._setNftOutfit.id));
                    this.sendGetSelectedNftWardrobeOutfitMessage();
                    this._setNftOutfit = null;
                } else {
                    this._manager.communication.connection.send(new UpdateFigureDataMessageComposer(_loc1_, _loc2_));
                }
            }
            if (this.hasNftOutfit()) {
                this._currentTokenId = null;
            }
            this._manager.events.dispatchEvent(new AvatarUpdateEvent(_loc1_));
            if (this._SafeStr_5309) {
                if (this.figureData.avatarEffectType != -1) {
                    this._manager.inventory.setEffectSelected(this.figureData.avatarEffectType);
                } else {
                    this._manager.inventory.deselectAllEffects(true);
                }
            }
            this._SafeStr_5309 = false;
        }
    }

    public generateDataContent(param1: IAvatarEditorCategoryModel, param2: string): CategoryData {
        let _loc21_: number = 0;
        let _loc14_: IFigurePartSet = null;
        let _loc9_: AvatarEditorGridPartItem = null;
        let _loc22_: ISetType = null;
        let _loc10_: IPalette = null;
        let _loc13_: any[] = null;
        let _loc12_: any[] = null;
        let _loc19_: boolean = false;
        let _loc11_: number = 0;
        let _loc15_: boolean = false;
        let _loc18_: AvatarEditorGridColorItem = null;
        let _loc26_: number = 0;
        let _loc30_: any[] = null;
        let _loc17_: number = 0;
        let _loc32_: boolean = false;
        let _loc33_: BitmapDataAsset = null;
        let _loc25_: BitmapData = null;
        let _loc24_: IWindowContainer = null;
        let _loc29_: boolean = false;
        let _loc31_: UtilsMap = null;
        let _loc16_: number = 0;
        let _loc27_: number = 0;
        let _loc6_: boolean = false;
        let _loc34_: boolean = false;
        let _loc3_: boolean = false;
        let _loc20_: BitmapDataAsset = null;
        let _loc23_: BitmapData = null;
        let _loc7_: IWindowContainer = null;
        let _loc5_: any[] = null;
        if (!param1) {
            return null;
        }
        if (!param2) {
            return null;
        }
        let _loc4_: any[] = [];
        let _loc8_: any[] = [];
        _loc21_ = 0;
        while (_loc21_ < 2) {
            _loc8_.push([]);
            _loc21_++;
        }
        _loc22_ = this.getFigureSetType(param2);
        if (!_loc22_) {
            return null;
        }
        if (_loc22_ != null) {
            _loc10_ = this.getPalette(_loc22_.paletteID);
            if (!_loc10_) {
                return null;
            }
            _loc13_ = this.figureData.getColourIds(param2);
            if (!_loc13_) {
                _loc13_ = [];
            }
            _loc12_ = new Array(_loc13_.length);
            _loc19_ = this.showClubItemsDimmedConfiguration();
            for (const _loc28_ of _loc10_.colors?.values() ?? []) {
                if (_loc28_.isSelectable && (_loc19_ || this.clubMemberLevel >= _loc28_.clubLevel)) {
                    _loc11_ = 0;
                    while (_loc11_ < 2) {
                        _loc15_ = this.clubMemberLevel < _loc28_.clubLevel;
                        _loc18_ = new AvatarEditorGridColorItem(asGuarded(AvatarEditorView.COLOUR_WINDOW.clone(), isIWindowContainer), param1, _loc28_, _loc15_);
                        _loc8_[_loc11_].push(_loc18_);
                        _loc11_++;
                    }
                    if (param2 != "hd") {
                        _loc26_ = 0;
                        while (_loc26_ < _loc13_.length) {
                            if (_loc28_.id == _loc13_[_loc26_]) {
                                _loc12_[_loc26_] = _loc28_;
                            }
                            _loc26_++;
                        }
                    }
                }
            }
            if (_loc19_) {
                _loc17_ = 2;
                _loc30_ = this._manager.avatarRenderManager.getMandatoryAvatarPartSetIds(this.gender, _loc17_);
            } else {
                _loc30_ = this._manager.avatarRenderManager.getMandatoryAvatarPartSetIds(this.gender, this.clubMemberLevel);
            }
            _loc32_ = _loc30_.indexOf(param2) == -1;
            if (_loc32_) {
                _loc33_ = asInstanceOf(this._manager.windowManager.assets.getAssetByName("avatar_editor_generic_remove_selection"), BitmapDataAsset);
                _loc25_ = (asInstanceOf(_loc33_.content, BitmapData)).clone();
                _loc24_ = asGuarded(AvatarEditorView.THUMB_WINDOW.clone(), isIWindowContainer);
                _loc24_.name = "REMOVE_ITEM";
                _loc9_ = new AvatarEditorGridPartItem(_loc24_, param1, null, null, false);
                _loc9_.iconImage = _loc25_;
                _loc4_.push(_loc9_);
            }
            _loc29_ = param2 != "hd";
            _loc31_ = _loc22_.partSets;
            _loc16_ = _loc31_.length | 0;
            _loc27_ = _loc16_ - 1;
            while (_loc27_ >= 0) {
                _loc14_ = _loc31_.getWithIndex(_loc27_);
                _loc6_ = false;
                if (_loc14_.gender == "U") {
                    _loc6_ = true;
                } else if (_loc14_.gender == this.gender) {
                    _loc6_ = true;
                }
                if (_loc14_.isSelectable && _loc6_ && (_loc19_ || this.clubMemberLevel >= _loc14_.clubLevel)) {
                    _loc34_ = this.clubMemberLevel < _loc14_.clubLevel;
                    _loc3_ = true;
                    if (_loc14_.isSellable) {
                        _loc3_ = !!(this.manager.inventory && this._manager.inventory.hasFigureSetIdInInventory(_loc14_.id) || this.isDevelopmentEditor());
                    }
                    if (_loc3_) {
                        _loc9_ = new AvatarEditorGridPartItem(asGuarded(AvatarEditorView.THUMB_WINDOW.clone(), isIWindowContainer), param1, _loc14_, _loc12_, _loc29_, _loc34_);
                        _loc4_.push(_loc9_);
                    }
                }
                _loc27_--;
            }
        }
        _loc4_.sort(this.showClubItemsFirst ? this.orderByClubDesc : this.orderByClubAsc);
        if (this._SafeStr_6117 || this._manager.getBoolean("avatareditor.support.sellablefurni")) {
            _loc20_ = asInstanceOf(this._manager.windowManager.assets.getAssetByName("camera_zoom_in"), BitmapDataAsset);
            _loc23_ = (asInstanceOf(_loc20_.content, BitmapData)).clone();
            _loc7_ = asGuarded(AvatarEditorView.THUMB_WINDOW.clone(), isIWindowContainer);
            _loc7_.name = "GET_MORE";
            _loc9_ = new AvatarEditorGridPartItem(_loc7_, param1, null, null, false);
            _loc9_.iconImage = _loc23_;
            _loc4_.push(_loc9_);
        }
        _loc21_ = 0;
        while (_loc21_ < 2) {
            _loc5_ = asGuarded(_loc8_[_loc21_], Array.isArray);
            _loc5_.sort(this.orderPaletteByClub);
            _loc21_++;
        }
        return new CategoryData(_loc4_, _loc8_);
    }

    public isSideContentEnabled(): boolean {
        return this._SafeStr_5499;
    }

    public hasInvalidClubItems(): boolean {
        let _loc1_: boolean = false;
        for (const _loc2_ of this.getCategoryValues() ?? []) {
            if (_loc2_ != null) {
                _loc1_ = _loc2_.hasClubItemsOverLevel(this.clubMemberLevel);
                if (_loc1_) {
                    return true;
                }
            }
        }
        return false;
    }

    public hasInvalidSellableItems(): boolean {
        let _loc1_: boolean = false;
        for (const _loc2_ of this.getCategoryValues() ?? []) {
            if (_loc2_ != null) {
                _loc1_ = _loc2_.hasInvalidSellableItems(this._manager.inventory);
                if (_loc1_) {
                    return true;
                }
            }
        }
        return false;
    }

    public stripClubItems(): void {
        for (const _loc1_ of this.getCategoryValues() ?? []) {
            if (_loc1_ != null) {
                _loc1_.stripClubItemsOverLevel(this.clubMemberLevel);
            }
        }
        this.figureData.updateView();
    }

    public stripInvalidSellableItems(): void {
        for (const _loc1_ of this.getCategoryValues() ?? []) {
            if (_loc1_ != null) {
                _loc1_.stripInvalidSellableItems();
            }
        }
        this.figureData.updateView();
    }

    private getCategoryValues(): any[] {
        if (this._categories == null) {
            return [];
        }
        let _loc1_: any[] = this._categories.getValues();
        return _loc1_ ?? [];
    }

    public getDefaultColour(param1: string): number {
        let _loc3_: IPalette = null;
        let _loc2_: ISetType = this.getFigureSetType(param1);
        if (_loc2_ != null) {
            _loc3_ = this.getPalette(_loc2_.paletteID);
            for (const _loc4_ of _loc3_.colors?.values() ?? []) {
                if (_loc4_.isSelectable && this.clubMemberLevel >= _loc4_.clubLevel) {
                    return _loc4_.id | 0;
                }
            }
        }
        return -1;
    }

    private orderByClubAsc = (param1: AvatarEditorGridPartItem, param2: AvatarEditorGridPartItem): number => {
        // the editor's own tiles (remove) have no part set: they go first, as the client shows them, and are not
        // compared by id, which threw here and stopped the category from loading
        if (!param1.partSet || !param2.partSet) {
            return (param1.partSet ? 1 : 0) - (param2.partSet ? 1 : 0);
        }
        let _loc4_: number = param1.partSet?.clubLevel;
        let _loc5_: number = param2.partSet?.clubLevel;
        let _loc6_: boolean = param1.partSet?.isSellable;
        let _loc3_: boolean = param2.partSet?.isSellable;
        if (_loc6_ && !_loc3_) {
            return 1;
        }
        if (_loc3_ && !_loc6_) {
            return -1;
        }
        if (_loc4_ < _loc5_) {
            return -1;
        }
        if (_loc4_ > _loc5_) {
            return 1;
        }
        if (param1.partSet.id < param2.partSet.id) {
            return -1;
        }
        if (param1.partSet.id > param2.partSet.id) {
            return 1;
        }
        return 0;
    };

    private orderByClubDesc = (param1: AvatarEditorGridPartItem, param2: AvatarEditorGridPartItem): number => {
        // the editor's own tiles (remove) have no part set: they go first, as the client shows them, and are not
        // compared by id, which threw here and stopped the category from loading
        if (!param1.partSet || !param2.partSet) {
            return (param1.partSet ? 1 : 0) - (param2.partSet ? 1 : 0);
        }
        let _loc4_: number = param1.partSet?.clubLevel;
        let _loc5_: number = param2.partSet?.clubLevel;
        let _loc6_: boolean = param1.partSet?.isSellable;
        let _loc3_: boolean = param2.partSet?.isSellable;
        if (_loc6_ && !_loc3_) {
            return 1;
        }
        if (_loc3_ && !_loc6_) {
            return -1;
        }
        if (_loc4_ > _loc5_) {
            return -1;
        }
        if (_loc4_ < _loc5_) {
            return 1;
        }
        if (param1.partSet.id > param2.partSet.id) {
            return -1;
        }
        if (param1.partSet.id < param2.partSet.id) {
            return 1;
        }
        return 0;
    };

    private orderPaletteByClub = (param1: AvatarEditorGridColorItem, param2: AvatarEditorGridColorItem): number => {
        let _loc3_: number = param1.partColor == null ? -1 : asGuarded(param1.partColor.clubLevel, isNumber);
        let _loc4_: number = param2.partColor == null ? -1 : asGuarded(param2.partColor.clubLevel, isNumber);
        if (_loc3_ < _loc4_) {
            return -1;
        }
        if (_loc3_ > _loc4_) {
            return 1;
        }
        if (param1.partColor.index < param2.partColor.index) {
            return -1;
        }
        if (param1.partColor.index > param2.partColor.index) {
            return 1;
        }
        return 0;
    };

    public get gender(): string {
        return this._gender;
    }

    public set gender(param1: string) {
        if (this._gender == param1) {
            return;
        }
        this._gender = param1;
        for (const _loc2_ of valuesOf(this._categories)) {
            _loc2_.reset();
        }
        if (this._view != null) {
            this._view.update();
        }
    }

    public get handler(): AvatarEditorMessageHandler {
        return this._manager.handler;
    }

    public get wardrobe(): WardrobeModel {
        if (!this._isInitialized) {
            return null;
        }
        return this._SafeStr_3215.getValue("wardrobe");
    }

    public get effects(): EffectsModel {
        if (!this._isInitialized) {
            return null;
        }
        return this._categories.getValue("effects");
    }

    public set clubMemberLevel(param1: number) {
        this._clubMemberLevel = param1;
    }

    public get clubMemberLevel(): number {
        if (!this._clubMemberLevel) {
            return this._manager.sessionData.clubLevel;
        }
        return this._clubMemberLevel;
    }

    public verifyClubLevel(): boolean {
        return this._manager.catalog.verifyClubLevel();
    }

    private get showClubItemsFirst(): boolean {
        return this._manager.getBoolean("avatareditor.show.clubitems.first");
    }

    private showClubItemsDimmedConfiguration(): boolean {
        return this._manager.getBoolean("avatareditor.show.clubitems.dimmed");
    }

    public get manager(): HabboAvatarEditorManager {
        return this._manager;
    }

    public update(): void {
        let _loc1_: any = null;
        let _loc2_: any = null;
        for (_loc1_ of valuesOf(this._categories)) {
            _loc1_.reset();
        }
        for (_loc2_ of valuesOf(this._SafeStr_3215)) {
            _loc2_.reset();
        }
        if (this._view) {
            this._view.update();
        }
    }

    public setAvatarEffectType(param1: number): void {
        this.figureData.avatarEffectType = param1;
        this.figureData.updateView();
        this._SafeStr_5309 = true;
    }

    public setNftOutfit(param1: NftOutfit): void {
        this._setNftOutfit = param1;
        this._SafeStr_6032 = this.figureData.getFigureString();
        this._SafeStr_6995 = this.figureData.gender;
    }

    public hasSetNftOutfitInViewer(): boolean {
        return this._setNftOutfit != null;
    }

    public loadNftFigure(): void {
        let _loc1_: NftAvatarsModel = null;
        let _loc2_: NftOutfit = null;
        if (this._setNftOutfit) {
            this.loadAvatarInEditor(this._setNftOutfit.figure, this._setNftOutfit.gender, this._clubMemberLevel);
        } else if (this._currentTokenId != null) {
            _loc1_ = this._categories.getValue("nfts");
            if (_loc1_) {
                _loc2_ = _loc1_.getNftAvatarByTokenId(this._currentTokenId);
                if (_loc2_) {
                    this.setNftOutfit(_loc2_);
                    this.loadAvatarInEditor(_loc2_.figure, _loc2_.gender, this._clubMemberLevel);
                }
            }
        }
    }

    public loadRollbackFigure(): void {
        if (this._setNftOutfit) {
            this.loadAvatarInEditor(this._SafeStr_6032, this._SafeStr_6995, this._clubMemberLevel);
        }
    }

    public loadFallbackFigure(): void {
        if (this._SafeStr_5903) {
            this.loadAvatarInEditor(this._SafeStr_5903, this._SafeStr_7223, this._clubMemberLevel);
        }
    }

    public hasNftOutfit(): boolean {
        return this._currentTokenId != null;
    }

    public get view(): AvatarEditorView {
        return this._view;
    }

    public openHabboClubAdWindow(): void {
        if (this._manager.catalog) {
            this._manager.catalog.openClubCenter();
        }
    }

    public isDevelopmentEditor(): boolean {
        return this._instanceId == 3;
    }
}
