import { asGuarded, asInstanceOf, castGuarded, isNumber, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { CommandConfiguration } from '@/com/sulake/habbo/ui/widget/infostand/CommandConfiguration';
import type { InfoStandWidget } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { InfoStandPetData } from '@/com/sulake/habbo/ui/widget/infostand/InfoStandPetData';
import { PetCommandTool } from '@/com/sulake/habbo/ui/widget/infostand/PetCommandTool';
import { WellBeingSecondsFormatter } from '@/com/sulake/habbo/ui/widget/infostand/WellBeingSecondsFormatter';
import { RoomWidgetFurniActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniActionMessage';
import { RoomWidgetUserActionMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetUserActionMessage';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { isIRarityItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemPreviewOverlayWidget';

export class InfoStandPetView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.infostand::InfoStandPetView'); }

    private static readonly STATUS_BAR_WIDTH: number = 162;
    private static readonly STATUS_BAR_HEIGTH: number = 16;
    private static readonly STATUS_BAR_HIGHLIGHT_HEIGHT: number = 4;
    private static readonly STATUS_BAR_BORDER_COLOR: number = 14342874;
    private static readonly STATUS_BAR_BG_COLOR: number = 3815994;
    private static readonly STATUS_BAR_HAPPINESS_HIGHLIGHT_COLOR: number = 2085362;
    private static readonly STATUS_BAR_HAPPINESS_CONTENT_COLOR: number = 39616;
    private static readonly STATUS_BAR_EXPERIENCE_HIGHLIGHT_COLOR: number = 10513106;
    private static readonly STATUS_BAR_EXPERIENCE_CONTENT_COLOR: number = 8734654;
    private static readonly STATUS_BAR_ENERGY_HIGHLIGHT_COLOR: number = 9094430;
    private static readonly STATUS_BAR_ENERGY_CONTENT_COLOR: number = 6200576;
    private static readonly STATUS_BAR_WELLBEING_HIGHLIGHT_COLOR: number = 9094430;
    private static readonly STATUS_BAR_WELLBEING_CONTENT_COLOR: number = 6200576;
    private static readonly STATE_HAPPINESS: string = "happiness";
    private static readonly STATE_EXPERIENCE: string = "experience";
    private static readonly STATE_ENERGY: string = "energy";
    private static readonly STATE_WELLBEING: string = "wellbeing";
    private static readonly STATE_GROWTH: string = "growth";
    private static readonly BUTTONS_MAX_WIDTH: number = 250;
    private static readonly BUTTON_HEIGHT: number = 25;
    private static readonly BUTTON_MARGIN: number = 5;

    declare private _catalog: IHabboCatalog;

    declare private _habboTracking: IHabboTracking;

    declare private _widget: InfoStandWidget;

    declare private _window: IItemListWindow;

    declare private _border: IBorderWindow;

    declare private _buttonsContainer: IWindowContainer;

    declare private _SafeStr_2212: IItemListWindow;

    declare private _SafeStr_2268: PetCommandTool;

    declare private _SafeStr_2395: UtilsMap;

    declare private _SafeStr_3368: number;
    static { (this.prototype as any)._SafeStr_3368 = 0; }

    constructor(param1: InfoStandWidget, param2: string, param3: IHabboCatalog) {
        this._widget = param1;
        this._catalog = param3;
        this._habboTracking = HabboTracking.getInstance();
        this.createWindow(param2);
        this._SafeStr_2395 = new UtilsMap();
    }

    public dispose(): void {
        this._widget = null;
        this._catalog = null;
        this._habboTracking = null;
        this._border = null;
        this._buttonsContainer = null;
        this._SafeStr_2212 = null;
        if (this._window) {
            this._window.dispose();
        }
        this._window = null;
        if (this._SafeStr_2268) {
            this._SafeStr_2268.dispose();
        }
        this._SafeStr_2268 = null;
        if (this._SafeStr_2395) {
            this._SafeStr_2395.dispose();
            this._SafeStr_2395 = null;
        }
    }

    public get window(): IItemListWindow {
        return this._window;
    }

    private updateWindow(): void {
        if (this._SafeStr_2212 == null || this._border == null || this._buttonsContainer == null) {
            return;
        }
        this._buttonsContainer.width = this._buttonsContainer.width;
        this._buttonsContainer.visible = this._buttonsContainer.width > 0;
        this._SafeStr_2212.height = this._SafeStr_2212.scrollableRegion.height | 0;
        this._border.height = this._SafeStr_2212.height + 20;
        this._window.width = Math.max(this._border.width, this._buttonsContainer.width) | 0;
        this._window.height = this._window.scrollableRegion.height | 0;
        if (this._border.width < this._buttonsContainer.width) {
            this._border.x = this._window.width - this._border.width;
            this._buttonsContainer.x = 0;
        } else {
            this._buttonsContainer.x = this._window.width - this._buttonsContainer.width;
            this._border.x = 0;
        }
        this._widget.refreshContainer();
    }

    public updateImage(param1: number, param2: BitmapData): void {
        if (this._SafeStr_3368 == param1) {
            this.image = param2;
            this.updateWindow();
            this.updatePetCommandToolImage(param2);
        }
    }

    private updatePetCommandToolImage(param1: BitmapData): void {
        if (this._SafeStr_2268 != null) {
            this._SafeStr_2268.updatePetImage(param1);
        }
    }

    public update(param1: InfoStandPetData): void {
        let _loc6_: string = null;
        let _loc2_: number = NaN;
        let _loc9_: number = NaN;
        let _loc10_: number = 0;
        let _loc7_: number = NaN;
        this.name = param1.name;
        this.image = param1.image;
        this.ownerName = param1.ownerName;
        this.breedText = this._widget.localizations.getLocalization(this.getBreedLocalizationKey(param1.type, param1.breedId));
        this.updatePetRespect(param1.petRespect, param1.type != 16);
        this.ageText = param1.age;
        this.setLevelText(param1.level, param1.levelMax, param1.type != 16);
        this.setSpecialSkillLevel(param1.level, param1.skillTresholds, param1.type);
        this.setRarityLevel(param1.rarityLevel, param1.type);
        if (param1.type == 16) {
            this.showStatusContainer("default", false);
            this.showStatusContainer("monsterplant", true);
            _loc6_ = WellBeingSecondsFormatter.formatSeconds(param1.remainingWellBeingSeconds);
            this.updateStateElement("wellbeing", param1.remainingWellBeingSeconds, param1.maxWellBeingSeconds, 6200576, 9094430, _loc6_);
            this.updateStateWidget("growth", param1.remainingGrowingSeconds);
            this.showButton("petrespect", false);
            if (param1.energy > 0) {
                _loc2_ = asGuarded(param1.energy, isNumber);
                _loc9_ = asGuarded(param1.energyMax, isNumber);
                this.showButton("pettreat", _loc2_ / _loc9_ < 0.98);
            } else {
                this.showButton("pettreat", false);
            }
            this.showButton("train", false);
            this.showButton("buy_food", false);
            this.showButton("kick", false);
            this.showButton("pick", param1.canRemovePet);
            this.showRarityItem(param1.rarityLevel >= 0, param1);
        } else {
            this.showStatusContainer("default", true);
            this.showStatusContainer("monsterplant", false);
            this.showButton("petrespect", true);
            this.showButton("pettreat", false);
            this.showButton("train", param1.isOwnPet);
            this.showButton("pick", param1.isOwnPet);
            this.showButton("buy_food", true);
            this.showButton("kick", param1.canRemovePet);
            this.updateStateElement("happiness", param1.nutrition, param1.nutritionMax, 39616, 2085362);
            this.updateStateElement("experience", param1.experience, param1.experienceMax, 8734654, 10513106);
            this.updateStateElement("energy", param1.energy, param1.energyMax, 6200576, 9094430);
            this.updateRespectButton();
        }
        let _loc11_: IRoomSession = this._widget.handler.container.roomSession;
        let _loc5_: boolean = _loc11_ != null && _loc11_.playTestMode;
        let _loc3_: number = _loc11_.roomControllerLevel;
        let _loc8_: boolean = this._widget.handler.container.sessionDataManager.isAnyRoomController;
        let _loc4_: boolean = !_loc5_ && (_loc3_ >= 1 || param1.isOwnPet || _loc8_);
        this.showButton("move", _loc4_ && param1.type == 16);
        this.showButton("rotate", _loc4_ && param1.type == 16);
        this.updateWindow();
        this._SafeStr_3368 = param1.id;
        this._SafeStr_2395.remove(param1.id);
        this._SafeStr_2395.add(param1.id, param1);
        if (this._SafeStr_2268 && this._SafeStr_2268.isVisible() && param1.isOwnPet) {
            _loc10_ = this.getLowerSkillTreshold(param1.level, param1.skillTresholds);
            _loc7_ = param1.experience / param1.experienceMax;
            this._SafeStr_2268.showCommandToolForPet(param1.id, param1.name, param1.image, param1.type, param1.level - _loc10_, _loc7_, this.getUpperSkillTreshold(param1.level, param1.skillTresholds) - _loc10_, param1.skillTresholds);
        }
    }

    private setRarityLevel(param1: number, param2: number): void {
        let _loc6_: any[] = [16, 26];
        let _loc5_: string = param2 != 16 ? "default" : "monsterplant";
        let _loc3_: IItemListWindow = this.getStatusContainer(_loc5_);
        let _loc4_: ITextWindow = asGuarded(_loc3_.getListItemByName("status_rarity_level"), isITextWindow);
        if (_loc4_ == null) {
            return;
        }
        _loc4_.visible = _loc6_.indexOf(param2) > -1;
        this._widget.localizations.registerParameter("infostand.pet.text.raritylevel", "level", this._widget.localizations.getLocalization("infostand.pet.raritylevel." + param1));
        this.updateWindow();
    }

    public getCurrentPetId(): number {
        return this._SafeStr_3368;
    }

    public updateEnabledTrainingCommands(param1: number, param2: CommandConfiguration): void {
        if (this._SafeStr_2268 == null) {
            return;
        }
        this._SafeStr_2268.setEnabledCommands(param1, param2);
    }

    private getBreedLocalizationKey(param1: number, param2: number): string {
        return "pet.breed." + param1 + "." + param2;
    }

    private createPercentageBar(param1: number, param2: number, param3: number, param4: number): BitmapData {
        param2 = Math.max(param2, 1) | 0;
        param1 = Math.max(param1, 0) | 0;
        if (param1 > param2) {
            param1 = param2;
        }
        let _loc10_: number = param1 / param2;
        let _loc9_: number = 1;
        let _loc7_: BitmapData = new BitmapData(162, 16, false);
        _loc7_.fillRect(new Rectangle(0, 0, _loc7_.width, _loc7_.height), 14342874);
        let _loc8_: Rectangle = new Rectangle(_loc9_, _loc9_, _loc7_.width - _loc9_ * 2, _loc7_.height - _loc9_ * 2);
        _loc7_.fillRect(_loc8_, 3815994);
        let _loc6_: Rectangle = new Rectangle(_loc9_, _loc9_ + 4, _loc7_.width - _loc9_ * 2, _loc7_.height - _loc9_ * 2 - 4);
        _loc6_.width = _loc10_ * _loc6_.width;
        _loc7_.fillRect(_loc6_, param3);
        let _loc5_: Rectangle = new Rectangle(_loc9_, _loc9_, _loc7_.width - _loc9_ * 2, 4);
        _loc5_.width = _loc10_ * _loc5_.width;
        _loc7_.fillRect(_loc5_, param4);
        return _loc7_;
    }

    public openTrainView(): void {
        let _loc3_: number = 0;
        let _loc2_: number = NaN;
        if (this._SafeStr_2268 == null) {
            this._SafeStr_2268 = new PetCommandTool(this._widget);
        }
        let _loc1_: InfoStandPetData = asInstanceOf(this._SafeStr_2395.getValue(this._SafeStr_3368), InfoStandPetData);
        if (_loc1_ != null) {
            this._SafeStr_2268.showWindow(true);
            _loc3_ = this.getLowerSkillTreshold(_loc1_.level, _loc1_.skillTresholds);
            _loc2_ = _loc1_.experience / _loc1_.experienceMax;
            this._SafeStr_2268.showCommandToolForPet(_loc1_.id, _loc1_.name, _loc1_.image, _loc1_.type, _loc1_.level - _loc3_, _loc2_, this.getUpperSkillTreshold(_loc1_.level, _loc1_.skillTresholds) - _loc3_, _loc1_.skillTresholds);
        }
    }

    public closeTrainView(): void {
        if (this._SafeStr_2268 && this._SafeStr_2268.getPetId() == this._SafeStr_3368) {
            this._SafeStr_2268.showWindow(false);
        }
    }

    private createWindow(param1: string): void {
        let _loc22_: BitmapDataAsset = null;
        let _loc20_: BitmapData = null;
        let _loc14_: BitmapDataAsset = null;
        let _loc9_: BitmapData = null;
        let _loc2_: BitmapDataAsset = null;
        let _loc4_: BitmapData = null;
        let _loc11_: BitmapDataAsset = null;
        let _loc3_: BitmapData = null;
        let _loc10_: BitmapDataAsset = null;
        let _loc7_: BitmapData = null;
        let _loc8_: BitmapDataAsset = null;
        let _loc5_: BitmapData = null;
        let _loc18_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName("pet_view"), XmlAsset);
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc18_.content, XML)), isIItemListWindow);
        if (this._window == null) {
            throw new Error("Failed to construct window from XML!");
        }
        this._border = asGuarded(this._window.getListItemByName("info_border"), isIBorderWindow);
        if (this._border != null) {
            this._SafeStr_2212 = asGuarded(this._border.findChildByName("infostand_element_list"), isIItemListWindow);
        }
        this._window.name = param1;
        this._widget.mainContainer.addChild(this._window);
        let _loc16_: IWindow = this._border.findChildByTag("close");
        if (_loc16_ != null) {
            _loc16_.addEventListener("WME_CLICK", this.onClose);
        }
        this._buttonsContainer = asGuarded(this._window.getListItemByName("button_list"), isIWindowContainer);
        if (this._buttonsContainer == null) {
            return;
        }
        let _loc6_: any[] = [];
        this._buttonsContainer.groupChildrenWithTag("CMD_BUTTON", _loc6_, -1);
        for (const _loc15_ of _loc6_ ?? []) {
            _loc15_.addEventListener("WME_CLICK", this.onButtonClicked);
        }
        let _loc19_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("petrespect_icon"), isIBitmapWrapperWindow);
        if (_loc19_ != null) {
            _loc22_ = asInstanceOf(this._widget.assets.getAssetByName("icon_petrespect"), BitmapDataAsset);
            _loc20_ = asInstanceOf(_loc22_.content, BitmapData);
            _loc19_.bitmap = _loc20_.clone();
        }
        let _loc24_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("status_happiness_icon"), isIBitmapWrapperWindow);
        if (_loc24_ != null) {
            _loc14_ = asInstanceOf(this._widget.assets.getAssetByName("icon_pet_happiness"), BitmapDataAsset);
            _loc9_ = asInstanceOf(_loc14_.content, BitmapData);
            _loc24_.bitmap = _loc9_.clone();
        }
        let _loc17_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("status_experience_icon"), isIBitmapWrapperWindow);
        if (_loc17_ != null) {
            _loc2_ = asInstanceOf(this._widget.assets.getAssetByName("icon_pet_experience"), BitmapDataAsset);
            _loc4_ = asInstanceOf(_loc2_.content, BitmapData);
            _loc17_.bitmap = _loc4_.clone();
        }
        let _loc21_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("status_energy_icon"), isIBitmapWrapperWindow);
        if (_loc21_ != null) {
            _loc11_ = asInstanceOf(this._widget.assets.getAssetByName("icon_pet_energy"), BitmapDataAsset);
            _loc3_ = asInstanceOf(_loc11_.content, BitmapData);
            _loc21_.bitmap = _loc3_.clone();
        }
        let _loc13_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("skill_level_indicator"), isIBitmapWrapperWindow);
        if (_loc13_ != null) {
            _loc10_ = asInstanceOf(this._widget.assets.getAssetByName("pet_skill_level_0"), BitmapDataAsset);
            _loc7_ = asInstanceOf(_loc10_.content, BitmapData);
            _loc13_.bitmap = _loc7_.clone();
        }
        let _loc12_: IBitmapWrapperWindow = asGuarded(this._border.findChildByName("status_wellbeing_icon"), isIBitmapWrapperWindow);
        if (_loc12_ != null) {
            _loc8_ = asInstanceOf(this._widget.assets.getAssetByName("icon_pet_wellbeing"), BitmapDataAsset);
            _loc5_ = asInstanceOf(_loc8_.content, BitmapData);
            _loc12_.bitmap = _loc5_.clone();
        }
        for (const _loc23_ of _loc6_ ?? []) {
            if (_loc23_.parent) {
                _loc23_.parent.width = _loc23_.width;
            }
            _loc23_.addEventListener("WE_RESIZED", this.onButtonResized);
        }
    }

    private set name(param1: string) {
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("name_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = param1;
        _loc2_.visible = true;
    }

    private set image(param1: BitmapData) {
        if (this._SafeStr_2212 == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("image_container"), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(_loc2_.findChildByName("avatar_image"), isIBitmapWrapperWindow);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: BitmapData = new BitmapData(_loc4_.width, _loc4_.height, true, 0);
        let _loc5_: Point = new Point(0, 0);
        _loc5_.x = Math.round((_loc4_.width - param1.width) / 2);
        _loc5_.y = Math.round((_loc4_.height - param1.height) / 2);
        _loc3_.copyPixels(param1, param1.rect, _loc5_);
        _loc4_.bitmap = _loc3_;
        _loc4_.invalidate();
        this.updateWindow();
    }

    private setLevelText(param1: number, param2: number, param3: boolean = true): void {
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc5_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("image_container"), isIWindowContainer);
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: ITextWindow = asGuarded(_loc5_.findChildByName("level_text"), isITextWindow);
        if (_loc4_ == null) {
            return;
        }
        _loc4_.visible = param3;
        this._widget.localizations.registerParameter("pet.level", "level", param1.toString());
        this._widget.localizations.registerParameter("pet.level", "maxlevel", param2.toString());
        this.updateWindow();
    }

    private setSpecialSkillLevel(param1: number, param2: any[], param3: number): void {
        let _loc9_: number = 0;
        let _loc10_: BitmapDataAsset = null;
        let _loc6_: BitmapData = null;
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("image_container"), isIWindowContainer);
        if (_loc4_ == null) {
            return;
        }
        let _loc5_: IWindow = _loc4_.findChildByName("status_skill_text");
        _loc5_.visible = this._widget.config.getBoolean("pet.enhancements.enabled") && param3 == 15;
        let _loc7_: ITextWindow = asGuarded(_loc4_.findChildByName("status_skill_text"), isITextWindow);
        if (_loc7_ != null) {
            _loc7_.caption = "${infostand.pet.text.skill." + param3 + "}";
        }
        let _loc8_: IBitmapWrapperWindow = asGuarded(_loc4_.findChildByName("skill_level_indicator"), isIBitmapWrapperWindow);
        if (_loc8_ != null) {
            _loc8_.visible = this._widget.config.getBoolean("pet.enhancements.enabled") && param3 == 15;
            _loc9_ = this.getSkillLevelIndex(param1, param2);
            _loc10_ = asInstanceOf(this._widget.assets.getAssetByName("pet_skill_level_" + _loc9_), BitmapDataAsset);
            _loc6_ = asInstanceOf(_loc10_.content, BitmapData);
            _loc8_.bitmap = _loc6_.clone();
        }
        this.updateWindow();
    }

    private set ownerName(param1: string) {
        this._widget.localizations.registerParameter("infostand.text.petowner", "name", param1);
        this.updateWindow();
    }

    private set breedText(param1: string) {
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("breed_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.text = param1;
        this.updateWindow();
    }

    private set ageText(param1: number) {
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._SafeStr_2212.getListItemByName("age_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        this._widget.localizations.registerParameter("pet.age", "age", param1.toString());
        this.updateWindow();
    }

    private updatePetRespect(param1: number, param2: boolean): void {
        this._widget.localizations.registerParameter("infostand.text.petrespect", "count", param1.toString());
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc5_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("petrespect_container"), isIWindowContainer);
        let _loc3_: ITextWindow = asGuarded(_loc5_.findChildByName("petrespect_text"), isITextWindow);
        let _loc4_: IBitmapWrapperWindow = asGuarded(_loc5_.findChildByName("petrespect_icon"), isIBitmapWrapperWindow);
        _loc3_.visible = param2;
        _loc4_.visible = param2;
        _loc4_.x = _loc3_.x + _loc3_.width + 2;
        this.updateWindow();
    }

    private showStatusContainer(param1: string, param2: boolean): void {
        let _loc3_: IItemListWindow = this.getStatusContainer(param1);
        if (_loc3_ != null) {
            _loc3_.visible = param2;
        }
    }

    private getStatusContainer(param1: string): IItemListWindow {
        if (this._SafeStr_2212 == null) {
            return null;
        }
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("status_container"), isIWindowContainer);
        if (_loc2_ == null) {
            return null;
        }
        return asGuarded(_loc2_.findChildByName("status_item_list_" + param1), isIItemListWindow);
    }

    private updateStateWidget(param1: string, param2: number): void {
        let _loc6_: boolean = false;
        let _loc9_: boolean = false;
        let _loc8_: ITextWindow = null;
        let _loc7_: IItemListWindow = null;
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("status_container"), isIWindowContainer);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: IWidgetWindow = asGuarded(_loc3_.findChildByName(param1 + "_status_widget"), isIWidgetWindow);
        let _loc5_: IWidget = _loc4_.widget;
        if (_loc5_ == null) {
            return;
        }
        let _loc10_: string = param1;
        if ("growth" === _loc10_) {
            (isICountdownWidget(_loc5_) ? _loc5_ : null).seconds = param2;
            _loc6_ = param2 > 0;
            _loc9_ = _loc4_.visible != _loc6_;
            _loc4_.visible = _loc6_;
            _loc8_ = asGuarded(_loc3_.findChildByName(param1 + "_status_text"), isITextWindow);
            if (_loc8_ != null) {
                _loc8_.visible = _loc6_;
            }
            if (_loc9_) {
                _loc7_ = asGuarded(_loc3_.findChildByName("status_item_list_monsterplant"), isIItemListWindow);
                if (_loc7_ != null) {
                    _loc7_.arrangeListItems();
                }
            }
        }
    }

    private updateStateElement(param1: string, param2: number, param3: number, param4: number, param5: number, param6: string = null): void {
        let _loc8_: BitmapData = null;
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc7_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("status_container"), isIWindowContainer);
        if (_loc7_ == null) {
            return;
        }
        let _loc10_: ITextWindow = asGuarded(_loc7_.findChildByName("status_" + param1 + "_value_text"), isITextWindow);
        if (_loc10_ != null) {
            _loc10_.text = param6 ?? param2 + "/" + param3;
        }
        let _loc9_: IBitmapWrapperWindow = asGuarded(_loc7_.findChildByName("status_" + param1 + "_bitmap"), isIBitmapWrapperWindow);
        if (_loc9_ != null) {
            _loc8_ = this.createPercentageBar(param2, param3, param4, param5);
            if (_loc8_ != null) {
                _loc9_.bitmap = _loc8_;
                _loc9_.width = _loc8_.width;
                _loc9_.height = _loc8_.height;
                _loc9_.invalidate();
            }
        }
        this.updateWindow();
    }

    protected onButtonClicked = (param1: WindowMouseEvent): void => {
        let _loc5_: RoomWidgetMessage = null;
        let _loc6_: string = null;
        let _loc3_: any = null;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        switch (_loc2_.name) {
            case "btn_move":
                _loc6_ = "RWFAM_MOVE";
                break;
            case "btn_rotate":
                _loc6_ = "RWFUAM_ROTATE";
                break;
            case "btn_pick":
                _loc6_ = "RWUAM_PICKUP_PET";
                if (this._SafeStr_2268 && this._SafeStr_2268.getPetId() == this._SafeStr_3368) {
                    this._SafeStr_2268.showWindow(false);
                }
                break;
            case "btn_kick":
                _loc6_ = "RWUAM_PICKUP_PET";
                if (this._SafeStr_2268 && this._SafeStr_2268.getPetId() == this._SafeStr_3368) {
                    this._SafeStr_2268.showWindow(false);
                }
                break;
            case "btn_train":
                this.openTrainView();
                break;
            case "btn_buy_food":
                if (this._catalog) {
                    this._catalog.openCatalogPage("pet_accessories");
                    if (this._habboTracking && !this._habboTracking.disposed) {
                        this._habboTracking.trackGoogle("infostandBuyPetFoodButton", "click");
                    }
                }
                break;
            case "btn_petrespect":
                this._widget.userData.petRespectLeft -= 1;
                this.updateRespectButton();
                _loc6_ = " RWUAM_RESPECT_PET";
                break;
            case "btn_pettreat":
                _loc6_ = "RWUAM_TREAT_PET";
        }
        if (_loc6_ != null) {
            if (_loc6_ == "RWFAM_MOVE" || _loc6_ == "RWFUAM_ROTATE") {
                _loc4_ = this._widget.petData.roomIndex;
                _loc7_ = 100;
                _loc5_ = new RoomWidgetFurniActionMessage(_loc6_, _loc4_, _loc7_, -1, stringOrNull(_loc3_));
                this._widget.messageListener.processWidgetMessage(_loc5_);
            } else {
                _loc8_ = this._widget.petData.id;
                _loc5_ = new RoomWidgetUserActionMessage(_loc6_, _loc8_);
                this._widget.messageListener.processWidgetMessage(_loc5_);
            }
        }
        this.updateWindow();
    };

    private onClose = (param1: WindowMouseEvent): void => {
        this._widget.close();
    };

    private updateRespectButton(): void {
        let _loc1_: number = this._widget.userData.petRespectLeft;
        this._widget.localizations.registerParameter("infostand.button.petrespect", "count", _loc1_.toString());
        this.showButton("petrespect", _loc1_ > 0);
    }

    protected showButton(param1: string, param2: boolean): void {
        if (this._buttonsContainer == null) {
            return;
        }
        let _loc3_: IWindow = this._buttonsContainer.getChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.visible = param2;
            this.arrangeButtons();
        }
    }

    protected onButtonResized = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.window.parent;
        if (_loc2_ && _loc2_.tags.indexOf("CMD_BUTTON_REGION") > -1) {
            _loc2_.width = param1.window.width;
        }
    };

    private arrangeButtons(): void {
        let _loc5_: number = 250;
        this._buttonsContainer.width = _loc5_;
        let _loc2_: any[] = [];
        this._buttonsContainer.groupChildrenWithTag("CMD_BUTTON_REGION", _loc2_, -1);
        let _loc1_: number = _loc5_;
        let _loc3_: number = 0;
        for (const _loc4_ of _loc2_ ?? []) {
            if (_loc4_.visible) {
                if (_loc1_ - _loc4_.width < 0) {
                    _loc1_ = _loc5_;
                    _loc3_ += 25 + 5;
                }
                _loc4_.x = _loc1_ - _loc4_.width;
                _loc4_.y = _loc3_;
                _loc1_ = _loc4_.x - 5 | 0;
            }
        }
        this._buttonsContainer.height = _loc3_ + 25;
        this.updateWindow();
    }

    private getSkillLevelIndex(param1: number, param2: any[]): number {
        let _loc3_: number = 0;
        for (const _loc4_ of param2 ?? []) {
            if (_loc4_ > 0 && param1 >= _loc4_) {
                _loc3_++;
            }
        }
        return _loc3_;
    }

    private getLowerSkillTreshold(param1: number, param2: any[]): number {
        let _loc3_: number = 0;
        for (const _loc4_ of param2 ?? []) {
            if (_loc4_ > param1) {
                break;
            }
            _loc3_ = _loc4_ | 0;
        }
        return _loc3_;
    }

    private getUpperSkillTreshold(param1: number, param2: any[]): number {
        let _loc5_: number = this.getLowerSkillTreshold(param1, param2);
        let _loc4_: number = param2.indexOf(_loc5_);
        let _loc3_: number = _loc5_;
        if (_loc4_ < param2.length - 1) {
            _loc3_ = param2[_loc4_ + 1] | 0;
        }
        return _loc3_;
    }

    private showRarityItem(param1: boolean, param2: InfoStandPetData): void {
        if (this._SafeStr_2212 == null) {
            return;
        }
        let _loc3_: IWindowContainer = asGuarded(this._SafeStr_2212.getListItemByName("status_container"), isIWindowContainer);
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: IWidgetWindow = asGuarded(_loc3_.findChildByName("rarity_item_overlay_widget"), isIWidgetWindow);
        let _loc6_: IWidget = _loc4_.widget;
        if (_loc6_ == null) {
            return;
        }
        let _loc5_: IRarityItemPreviewOverlayWidget = castGuarded(_loc6_, isIRarityItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemPreviewOverlayWidget");
        _loc5_.rarityLevel = param2.rarityLevel;
    }
}
