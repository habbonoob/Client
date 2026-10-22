import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { keysOf, valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IPalette } from '@/com/sulake/habbo/avatar/structure/figure/IPalette';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { ISetType } from '@/com/sulake/habbo/avatar/structure/figure/ISetType';
import type { IFigureSetData } from '@/com/sulake/habbo/avatar/structure/IFigureSetData';
import type { OnBoardingHcFlow } from '@/com/sulake/habbo/friendbar/onBoardingHc/OnBoardingHcFlow';
import type { Button } from '@/onBoardingHcUi/Button';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { AvatarFigurePartType } from '@/com/sulake/habbo/avatar/enum/AvatarFigurePartType';
import { UpdateFigureDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/register/UpdateFigureDataMessageComposer';
import { RandomAvatarCloudsAnimation } from '@/com/sulake/habbo/friendbar/onBoardingHcSteps/RandomAvatarCloudsAnimation';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { ColorButton } from '@/onBoardingHcUi/ColorButton';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { RadioButton } from '@/onBoardingHcUi/RadioButton';
import { RadioButtonGroup } from '@/onBoardingHcUi/RadioButtonGroup';
import { randomizeButton } from '@/onBoardingHcUi/randomizeButton';
import { RoundButton } from '@/onBoardingHcUi/RoundButton';

const button_boy_png_pngAsset = embedBitmap("friendbar/button_boy_png.png");
const button_girl_png_pngAsset = embedBitmap("friendbar/button_girl_png.png");
const button_boy_active_png_pngAsset = embedBitmap("friendbar/button_boy_active_png.png");
const button_girl_active_png_pngAsset = embedBitmap("friendbar/button_girl_active_png.png");
const avatar_halo_png_pngAsset = embedBitmap("shared/avatar_halo_png.png");
const avatar_glow_png_pngAsset = embedBitmap("shared/avatar_glow_png.png");
const hc_header_png_pngAsset = embedBitmap("friendbar/hc_header_png.png");
const hc_teaser_png_pngAsset = embedBitmap("friendbar/hc_teaser_png.png");
const block_alert_png_pngAsset = embedBitmap("friendbar/block_alert_png.png");
const icon_alert_png_pngAsset = embedBitmap("friendbar/icon_alert_png.png");
const rnd_button_png_pngAsset = embedBitmap("shared/rnd_button_png.png");

export class AvatarEditor extends Sprite implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.onBoardingHcSteps::AvatarEditor'); }

    private static readonly SAVE_OUTFIT_FUNCTION: string = "NewUserReception.saveOutfit";
    private static readonly SAVE_OUTFIT_RESPONSE_CALLBACK: string = "newUserReceptionSaveOutfitResponse";
    private static readonly SAVE_OUTFIT_FAILED_CALLBACK: string = "newUserReceptionSaveOutfitFailed";
    private static readonly RETURN_FROM_PAYMENT: string = "newUserReturnFromPayment";
    private static readonly CHECK_FOR_HC_MEMBERSHIP_FUNCTION: string = "NewUserReception.newUserCheckHcMembership";
    private static readonly CHECK_FOR_HC_MEMBERSHIP_CALLBACK: string = "checkForHcMembership";
    public static readonly GENDER_MALE: string = "M";
    public static readonly GENDER_FEMALE: string = "F";
    public static readonly GENDER_UNISEX: string = "U";
    private static readonly NORMAL_ITEMS_TO_SHOW: number = 5;
    private static readonly THUMBS_PER_ROW: number = 5;
    private static readonly COLORS_PER_ROW: number = 4;
    private static readonly COLOR_ROWS: number = 4;
    private static readonly CLUB_COLOR_ROWS: number = 3;
    private static readonly RANDOM_MALE_FIGURES: any[] = ["hr-891-34.hd-209-10.ch-255-71.lg-280-81", "hr-893-42.hd-209-19.ch-230-80.lg-3290-82.sh-906-64", "hr-889-34.hd-200-1.ch-3030-73.lg-3023-88.sh-300-64", "hr-145-42.hd-185-1.ch-230-66.lg-270-82.sh-290-81", "hr-110-38.hd-190-1.ch-3030-85.lg-275-84.sh-290-74", "hr-891-42.hd-190-14.ch-230-64.lg-3290-64.sh-906-64", "hr-110-35.hd-185-1.ch-3110-80-25.lg-270-84.sh-905-80", "hr-145-43.hd-209-1.ch-809-80.lg-275-82.sh-906-64", "hr-889-42.hd-207-1370.ch-230-80.lg-280-80.sh-906-64", "hr-891-48.hd-200-1370.ch-809-84.lg-3290-84.sh-300-84", "hd-190-30.ch-230-82.lg-275-72.sh-905-88", "hd-185-10.ch-3110-85-25.lg-275-82.sh-300-84", "hr-893-40.hd-200-14.ch-255-75.lg-280-75.sh-906-75", "hr-889-45.hd-190-1370.ch-255-68.lg-3023-88.sh-906-68", "hr-110-45.hd-200-1371.ch-255-85.lg-280-84.sh-3068-85-25", "hr-893-35.hd-185-10.ch-230-1408.lg-275-72", "hr-145-42.hd-200-10.ch-255-64.lg-3290-64.sh-906-64", "hr-889-42.hd-209-10.ch-809-81.lg-3290-64.sh-300-64", "hr-110-39.hd-190-1371.ch-3110-80-25.lg-275-81.sh-3068-83-25", "hr-891-48.hd-185-20.ch-3030-71.lg-3023-80.sh-300-81", "hr-145-37.hd-200-1.ch-3030-75.lg-270-80.sh-3068-83-25", "hr-891-44.hd-207-1.ch-809-76.lg-270-76.sh-3068-76-25", "hr-145-48.hd-185-20.ch-3110-76-25.lg-270-74.sh-290-75", "hr-110-44.hd-200-30.ch-809-83.lg-270-84.sh-300-64", "hr-891-34.hd-207-14.ch-230-81.lg-270-76.sh-290-80"];
    private static readonly RANDOM_FEMALE_FIGURES: any[] = ["hr-891-40.hd-627-1371.ch-665-66.lg-700-82.sh-3068-68-25", "hr-515-48.hd-628-1.ch-635-73.lg-695-81.sh-735-83", "hr-891-35.hd-625-8.ch-685-73.lg-715-73.sh-907-73", "hr-837-45.hd-627-14.ch-670-76.lg-695-71.sh-907-73", "hr-892-48.hd-605-14.ch-685-64.lg-700-72.sh-906-64", "hr-893-32.hd-628-20.ch-823-76.lg-710-82.sh-735-76", "hr-892-32.hd-628-1.ch-665-81.lg-700-80.sh-3068-81-25", "hr-893-40.hd-610-12.ch-670-81.lg-716-81-25.sh-725-83", "hr-891-42.hd-625-10.ch-635-64.lg-695-64.sh-906-64", "hd-625-1370.ch-823-72.lg-710-74.sh-725-74", "hr-515-45.hd-628-1.ch-823-75.lg-710-73.sh-3068-84-25", "hr-893-34.hd-605-19.ch-685-84.lg-695-85.sh-906-85", "hr-837-39.hd-610-1.ch-685-91.lg-695-90.sh-906-80", "hr-891-34.hd-610-1369.ch-635-74.lg-695-82.sh-906-71", "hr-892-39.hd-628-1370.ch-670-64.lg-716-64-25.sh-907-64", "hr-837-46.hd-627-20.ch-665-76.lg-716-68-25", "hr-892-37.hd-605-10.ch-665-88.lg-700-88", "hr-892-48.hd-628-1371.ch-823-82.lg-700-71.sh-725-81", "hr-891-36.hd-625-8.ch-670-80.lg-715-80.sh-907-80", "hr-891-48.hd-628-12.ch-823-64.lg-715-64.sh-907-76", "hr-837-48.hd-627-14.ch-685-73.lg-695-76.sh-907-82", "hr-893-48.hd-605-1371.ch-665-74.lg-700-72.sh-725-74", "hr-515-35.hd-625-10.ch-665-72.lg-695-72.sh-906-64", "hr-837-35.hd-628-1.ch-635-81.lg-710-75.sh-735-81", "hr-893-44.hd-628-30.ch-670-76.lg-715-76.sh-907-76"];

    private static readonly button_boy_png = button_boy_png_pngAsset;

    private static readonly button_girl_png = button_girl_png_pngAsset;

    private static readonly button_boy_active_png = button_boy_active_png_pngAsset;

    private static readonly button_girl_active_png = button_girl_active_png_pngAsset;

    private static readonly avatar_halo_png = avatar_halo_png_pngAsset;

    private static readonly avatar_glow_png = avatar_glow_png_pngAsset;

    private static readonly hc_header_png = hc_header_png_pngAsset;

    private static readonly hc_teaser_png = hc_teaser_png_pngAsset;

    private static readonly block_alert_png = block_alert_png_pngAsset;

    private static readonly icon_alert_png = icon_alert_png_pngAsset;

    private static readonly rnd_button_png = rnd_button_png_pngAsset;

    private static readonly CATEGORIES: any[] = ["hr", "hd", "ch", "lg", "sh"];
    private static readonly EXTRA_CATEGORIES: any[] = [];

    declare private _SafeStr_3466: Sprite;

    declare private _SafeStr_2428: Button;

    private _gender: string = "M";

    declare private _thumbs: Map<any, any>;

    declare private _colors: Map<any, any>;

    declare private _SafeStr_2496: Map<any, any>;

    declare private _SafeStr_3459: Map<any, any>;

    private _SafeStr_4063: string = "hr";

    declare private _grid: Sprite;

    declare private _SafeStr_3627: Sprite;

    declare private _figureContainer: Bitmap;

    declare private _SafeStr_5804: randomizeButton;

    declare private _context: OnBoardingHcFlow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_2570: ColouredButton;

    declare private _SafeStr_4110: RadioButton;

    declare private _SafeStr_4628: RadioButton;

    declare private _genderButtonGroup: RadioButtonGroup;

    private _SafeStr_6597: any[] = [];

    declare private _SafeStr_7322: boolean;
    static { (this.prototype as any)._SafeStr_7322 = false; }

    declare private _SafeStr_3015: Sprite;

    declare private _SafeStr_7371: Sprite;

    declare private _showHcItems: boolean;
    static { (this.prototype as any)._showHcItems = false; }

    private _SafeStr_5017: any[] = [];
    private _SafeStr_4314: any[] = [];
    private _selectedColors: Map<any, any> = new Dictionary();

    declare private _SafeStr_3774: RandomAvatarCloudsAnimation;

    private _SafeStr_5016: Map<any, any> = new Dictionary();

    constructor(param1: OnBoardingHcFlow) {
        super();
        this._context = param1;
        this._gender = "M";
        this._SafeStr_2496 = new Dictionary();
        this._SafeStr_3459 = new Dictionary();
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.addEventListener("removedFromStage", this.onRemovedFromStage);
    }

    public dispose(): void {
        this._disposed = true;
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private onRemovedFromStage = (param1: Event): void => {
    };

    public showHcItems(param1: boolean): void {
        this._showHcItems = param1;
    }

    private addFigureImage(): void {
        let _loc1_: number = this._context.getNameAreaX();
        let _loc4_: number = this._context.getNameAreaWidth();
        this._figureContainer = new Bitmap();
        this._figureContainer.x = _loc1_ + _loc4_ / 2 + 15;
        this._figureContainer.y = 90;
        this._figureContainer.scaleX = 2;
        this._figureContainer.scaleY = 2;
        let _loc3_: Bitmap = new AvatarEditor.avatar_halo_png();
        _loc3_.x = this._figureContainer.x + 35;
        _loc3_.y = 290;
        _loc3_.blendMode = "overlay";
        let _loc2_: Bitmap = new AvatarEditor.avatar_glow_png();
        _loc2_.x = this._figureContainer.x - 55;
        _loc2_.y = 90;
        _loc2_.blendMode = "add";
        this.addChild(_loc3_);
        this.addChild(_loc2_);
        this.addChild(this._figureContainer);
        this._SafeStr_3774 = new RandomAvatarCloudsAnimation();
        this._SafeStr_3774.x = this._figureContainer.x;
        this._SafeStr_3774.y = this._figureContainer.y;
        this.addChild(this._SafeStr_3774);
        this._SafeStr_3774.visible = false;
    }

    private addHeaders(): void {
        let _loc3_: TextField = LoaderUI.createTextField("headerText", 24, 8309486, false, true, false, false);
        _loc3_.width = 300;
        _loc3_.thickness = 50;
        this.addChild(_loc3_);
        _loc3_.htmlText = this._context.getLocalization("onboarding.your.looks", "Choose looks");
        _loc3_.x = 35;
        _loc3_.y = 5;
        let _loc1_: TextField = LoaderUI.createTextField("headerText", 24, 8309486, false, true, false, false);
        _loc1_.width = 300;
        _loc1_.thickness = 50;
        this.addChild(_loc1_);
        _loc1_.htmlText = this._context.getLocalization("onboarding.your.colour", "Choose colour");
        _loc1_.x = 370;
        _loc1_.y = 5;
        let _loc2_: TextField = LoaderUI.createTextField("headerText", 24, 8309486, false, true, false, false);
        _loc2_.width = 300;
        _loc2_.thickness = 50;
        this.addChild(_loc2_);
        _loc2_.htmlText = this._context.getLocalization("onboarding.this.is.your.habbo", "This is your Habbo");
        _loc2_.x = 650;
        _loc2_.y = 5;
    }

    public addGenderButtons(): void {
        let _loc2_: number = this._context.getNameAreaX();
        let _loc6_: number = this._context.getNameAreaWidth();
        this._genderButtonGroup = new RadioButtonGroup(this.onChooseGender);
        let _loc1_: BitmapData = castTo(new AvatarEditor.button_boy_active_png(), Bitmap).bitmapData;
        let _loc8_: BitmapData = castTo(new AvatarEditor.button_boy_png(), Bitmap).bitmapData;
        let _loc7_: BitmapData = castTo(new AvatarEditor.button_girl_active_png(), Bitmap).bitmapData;
        let _loc4_: BitmapData = castTo(new AvatarEditor.button_girl_png(), Bitmap).bitmapData;
        let _loc3_: Sprite = new Sprite();
        _loc3_.y = 105;
        this._SafeStr_4110 = new RadioButton(this._context.getLocalization("gender.male", "Male"), this._genderButtonGroup, 2, _loc1_, _loc8_, 8231575);
        this._SafeStr_4110.name = "M";
        this._SafeStr_4628 = new RadioButton(this._context.getLocalization("gender.female", "Female"), this._genderButtonGroup, 2, _loc7_, _loc4_, 8231575);
        this._SafeStr_4628.name = "F";
        _loc3_.addChild(this._SafeStr_4110);
        _loc3_.addChild(this._SafeStr_4628);
        _loc3_.x = _loc2_ + 120;
        this.addChild(_loc3_);
        this._SafeStr_2570 = new ColouredButton("gfreen", this._context.getLocalization("onboarding.button.ready", "I\'m ready"), new Rectangle(685, 435, 0, 40), true, this.saveOutfit, 14211288);
        this._SafeStr_2570.x = _loc2_ + (_loc6_ - this._SafeStr_2570.width) / 2 + 20;
        this.addChild(this._SafeStr_2570);
        this._SafeStr_5804 = new randomizeButton(0, -10, this.onRandomize, 14211288);
        _loc3_.addChild(this._SafeStr_5804);
        LoaderUI.lineUpHorizontally(this._SafeStr_4110, 60, this._SafeStr_4628, 30, this._SafeStr_5804);
        let _loc5_: TextField = LoaderUI.createTextField("bottomText", 12, 16777215, true, true, false, false);
        _loc5_.htmlText = this._context.getLocalization("onboarding.cant.decide", "Can\'t decide? Don\'t worry, you can change your clothes later!");
        _loc5_.width = 300;
        _loc5_.x = 715;
        _loc5_.y = 380;
        this.addChild(_loc5_);
    }

    private addHcTeaserBox(): void {
        let _loc5_: Bitmap = castTo(new AvatarEditor.hc_teaser_png(), Bitmap);
        this._SafeStr_3015 = new Sprite();
        this.addChild(this._SafeStr_3015);
        let _loc6_: Bitmap = LoaderUI.createBalloon(650, 160, 0, false, 861246, "none");
        this._SafeStr_3015.addChild(_loc6_);
        this._SafeStr_3015.addChild(_loc5_);
        _loc5_.x = 20;
        _loc5_.y = 24;
        this._SafeStr_3015.x = 41;
        this._SafeStr_3015.y = 385;
        this._SafeStr_3015.visible = true;
        let _loc4_: TextField = LoaderUI.createTextField(this._context.getLocalization("onboard.what.is.hc.header", "Much more inside... "), 24, 8309486, true, true, false, false);
        let _loc2_: string = this._context.getLocalization("onboard.what.is.hc.description", "onboard.what.is.hc.description");
        let _loc3_: TextField = LoaderUI.createTextField(_loc2_, 12, 16777215, true, true, false, false);
        _loc3_.multiline = true;
        _loc3_.width = 300;
        _loc4_.width = 300;
        _loc4_.x = 320;
        _loc4_.y = 15;
        _loc3_.x = 320;
        _loc3_.y = 45;
        this._SafeStr_3015.addChild(_loc4_);
        this._SafeStr_3015.addChild(_loc3_);
        let _loc1_: Bitmap = new AvatarEditor.hc_header_png();
        _loc1_.x = 320;
        _loc1_.y = -45;
        this._SafeStr_3015.addChild(_loc1_);
    }

    protected onAddedToStage = (param1: Event): void => {
        this.addFigureImage();
        this.addHeaders();
        this.addGenderButtons();
        this._grid = new Sprite();
        this._grid.x = 40;
        this._grid.y = 50;
        this.addChild(this._grid);
        this._SafeStr_3627 = new Sprite();
        this._SafeStr_3627.x = 40;
        this._SafeStr_3627.y = 365;
        this.addChild(this._SafeStr_3627);
        this._SafeStr_3466 = new Sprite();
        this._SafeStr_3466.x = 375;
        this._SafeStr_3466.y = 50;
        this.addChild(this._SafeStr_3466);
        this.populateColors();
        this.renderColors();
        this._SafeStr_4110.selected = true;
        this._SafeStr_2496.set(this._gender, new Dictionary());
        this._SafeStr_3459.set(this._gender, new Dictionary());
        this.setRandomFigure();
    };

    private onChooseGender = (): void => {
        let _loc1_: RadioButton = this._genderButtonGroup.selected;
        if (_loc1_ == null) {
            return;
        }
        this._gender = _loc1_.name;
        this._context.setIsFemale(this._gender == "F");
        if (this._SafeStr_2496.get(this._gender) == null) {
            this._SafeStr_2496.set(this._gender, new Dictionary());
            this._SafeStr_3459.set(this._gender, new Dictionary());
        }
        this.setRandomFigure();
    };

    private clearGrids(): void {
        while (this._grid.numChildren > 0) {
            this._grid.removeChildAt(0);
        }
        while (this._SafeStr_3627.numChildren > 0) {
            this._SafeStr_3627.removeChildAt(0);
        }
        this._thumbs = new Dictionary();
    }

    private updateGrids(param1: boolean): void {
        let _loc12_: number = 0;
        let _loc13_: number = 0;
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        let _loc17_: any[] = null;
        let _loc4_: string = null;
        let _loc8_: any[] = null;
        let _loc14_: string = null;
        let _loc11_: string = null;
        let _loc5_: RoundButton = null;
        let _loc6_: IAvatarImage = null;
        let _loc3_: BitmapData = null;
        let _loc7_: any[] = null;
        let _loc2_: number = 0;
        let _loc16_: number = 0;
        let _loc15_: string = null;
        this.clearGrids();
        this.populateThumbs();
        _loc13_ = 0;
        while (_loc13_ < AvatarEditor.CATEGORIES.length) {
            _loc14_ = stringOrNull(AvatarEditor.CATEGORIES[_loc13_]);
            _loc17_ = this._thumbs.get(_loc14_);
            _loc7_ = this._SafeStr_3459.get(this._gender)[_loc14_];
            if (_loc14_ == "hr") {
                this._SafeStr_4314 = [];
            }
            _loc2_ = 5;
            _loc16_ = Math.min(_loc17_.length, _loc2_) | 0;
            _loc12_ = 0;
            while (_loc12_ < _loc16_) {
                _loc4_ = stringOrNull(_loc17_[_loc12_]);
                _loc8_ = _loc4_.split("-");
                _loc14_ = stringOrNull(_loc8_[0]);
                _loc11_ = stringOrNull(_loc8_[1]);
                if (_loc7_ && _loc7_.length > 1) {
                    this._SafeStr_5016.set(_loc11_, _loc7_);
                }
                _loc9_ = _loc12_ * 50 + _loc12_ * 10;
                _loc10_ = _loc13_ * 53 + _loc13_ * 10;
                _loc5_ = new RoundButton(_loc9_, _loc10_, this.gridClick);
                this._grid.addChild(_loc5_);
                this._SafeStr_5017.push(_loc5_);
                if (_loc14_ == "hr") {
                    this._SafeStr_4314.push(_loc5_);
                }
                if (param1) {
                    _loc6_ = this._context.avatarRenderManager.createAvatarImage(_loc8_.concat(_loc7_).join("-"), "h", null, this);
                } else {
                    _loc6_ = this._context.avatarRenderManager.createAvatarImage(_loc8_.concat(_loc7_).join("-"), "h");
                }
                _loc3_ = _loc6_.getCroppedImage(_loc14_ == "hd" ? "head" : "full");
                _loc5_.addIcon(_loc3_);
                _loc5_.name = _loc14_ + "_" + _loc11_;
                if (this._SafeStr_2428 != null && _loc5_.name == this._SafeStr_2428.name) {
                    _loc5_.select();
                    this._SafeStr_2428 = _loc5_;
                    this._SafeStr_2428.currentlyEditing();
                }
                _loc12_++;
            }
            _loc13_++;
        }
        _loc9_ = 0;
        _loc13_ = 0;
        while (_loc13_ < AvatarEditor.EXTRA_CATEGORIES.length) {
            _loc14_ = stringOrNull(AvatarEditor.EXTRA_CATEGORIES[_loc13_]);
            _loc17_ = this._thumbs.get(_loc14_);
            _loc7_ = this._SafeStr_3459.get(this._gender)[_loc14_];
            _loc12_ = 0;
            while (_loc12_ < _loc17_.length) {
                _loc4_ = stringOrNull(_loc17_[_loc12_]);
                _loc8_ = _loc4_.split("-");
                _loc14_ = stringOrNull(_loc8_[0]);
                _loc11_ = stringOrNull(_loc8_[1]);
                _loc9_ += 60;
                _loc10_ = 0;
                _loc5_ = new RoundButton(_loc9_, _loc10_, this.gridClick);
                this._SafeStr_3627.addChild(_loc5_);
                this._SafeStr_5017.push(_loc5_);
                _loc15_ = _loc7_ != null ? _loc8_.concat(_loc7_).join("-") : _loc4_;
                if (param1) {
                    _loc6_ = this._context.avatarRenderManager.createAvatarImage(_loc15_, "h", null, this);
                } else {
                    _loc6_ = this._context.avatarRenderManager.createAvatarImage(_loc15_, "h");
                }
                _loc5_.addIcon(_loc6_.getCroppedImage(_loc14_ == "hd" ? "head" : "full"));
                _loc5_.name = _loc14_ + "_" + _loc11_;
                if (this._SafeStr_2428 != null && _loc5_.name == this._SafeStr_2428.name) {
                    _loc5_.select();
                    this._SafeStr_2428 = _loc5_;
                }
                _loc12_++;
            }
            _loc13_++;
        }
        this.updateSelections();
    }

    private updateFigure(): void {
        let _loc2_: BitmapData = null;
        let _loc1_: IAvatarImage = this._context.avatarRenderManager.createAvatarImage(this.getFigure(), "h", this._gender, this);
        if (_loc1_) {
            _loc1_.setDirection("full", 4);
            _loc2_ = _loc1_.getImage("full", false);
            if (_loc2_) {
                this._figureContainer.bitmapData = _loc2_;
            }
        }
        this.updateSelections();
    }

    public getFigure(): string {
        let _loc2_: number = 0;
        let _loc6_: any[] = null;
        let _loc5_: ColorButton = null;
        let _loc4_: boolean = false;
        let _loc1_: any[] = [];
        if (this._SafeStr_2496 && this._SafeStr_2496.get(this._gender)) {
            for (const _loc3_ of keysOf(this._SafeStr_2496.get(this._gender))) {
                _loc2_ = this._SafeStr_2496.get(this._gender)[_loc3_] | 0;
                _loc6_ = this._SafeStr_3459.get(this._gender)[_loc3_];
                if (_loc6_ && _loc6_.length > 1) {
                    _loc6_[1] = "25";
                }
                _loc1_.push([_loc3_, _loc2_].concat(_loc6_).join("-"));
                if (!_loc4_) {
                    _loc4_ = this._SafeStr_6597.indexOf(_loc2_) > -1;
                    _loc5_ = this._selectedColors.get(_loc3_);
                    if (_loc5_ != null && _loc5_.club) {
                        _loc4_ = true;
                    }
                }
            }
        }
        return _loc1_.join(".");
    }

    public setRandomFigure(): void {
        let _loc2_: any[] = null;
        let _loc14_: ColorButton = null;
        let _loc12_: ColorButton = null;
        let _loc10_: string = null;
        let _loc5_: number = 0;
        let _loc3_: any[] = null;
        let _loc7_: any[] = null;
        let _loc13_: string = null;
        let _loc4_: number = 0;
        let _loc8_: string = this.getRandomFigureData();
        let _loc9_: any[] = _loc8_.split(".");
        let _loc6_: Map<any, any> = this._SafeStr_2496.get(this._gender);
        let _loc11_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < _loc9_.length) {
            _loc3_ = String(_loc9_[_loc5_]).split("-");
            _loc7_ = [];
            if (_loc3_.length >= 3) {
                _loc13_ = stringOrNull(_loc3_[0]);
                if (_loc6_.get(_loc13_) == _loc3_[1]) {
                    _loc11_++;
                }
                this._SafeStr_2496.get(this._gender)[_loc13_] = _loc3_[1];
                _loc7_.push(_loc3_[2]);
                _loc2_ = this._colors.get(_loc13_);
                _loc4_ = 0;
                while (_loc4_ < _loc2_.length) {
                    _loc14_ = _loc2_[_loc4_];
                    if (_loc14_.name == _loc13_ + "_" + _loc3_[2]) {
                        this.colorSelected(_loc14_);
                    }
                    _loc4_++;
                }
                if (_loc3_.length > 3) {
                    _loc7_.push(_loc3_[3]);
                }
                this._SafeStr_3459.get(this._gender)[_loc13_] = _loc7_;
            }
            if (_loc13_ == "hr") {
                _loc10_ = _loc13_ + "_" + _loc3_[1];
                _loc12_ = _loc14_;
            }
            _loc5_++;
        }
        this._SafeStr_4063 = "hr";
        for (const _loc1_ of this._SafeStr_4314 ?? []) {
            if (_loc1_.name == _loc10_) {
                this.gridClick(_loc1_);
                this.gridClick(_loc1_);
            }
        }
        this._SafeStr_3774.visible = true;
        this._SafeStr_3774.startAnimation();
        if (_loc11_ >= _loc9_.length - 1) {
            this.setRandomFigure();
        }
    }

    private getRandomFigureData(): string {
        let _loc2_: any[] = null;
        let _loc3_: number = 0;
        if (this._gender == "M") {
            _loc2_ = AvatarEditor.RANDOM_MALE_FIGURES;
        } else {
            _loc2_ = AvatarEditor.RANDOM_FEMALE_FIGURES;
        }
        let _loc1_: number = Math.random() * (_loc2_.length - 1) | 0;
        return stringOrNull(_loc2_[_loc1_]);
    }

    private populateThumbs(): void {
        let _loc1_: any[] = null;
        this._thumbs = new Dictionary();
        for (const _loc2_ of AvatarEditor.CATEGORIES ?? []) {
            _loc1_ = this.populateCategory(stringOrNull(_loc2_));
            this._thumbs.set(_loc2_, _loc1_);
        }
        this._thumbs.set("ea", this.populateCategory("ea"));
        this._thumbs.set("fa", this.populateCategory("fa"));
        this._thumbs.set("ha", this.populateCategory("ha"));
    }

    private populateColors(): void {
        let _loc11_: any;
        let _loc3_: ISetType = null;
        let _loc6_: IPalette = null;
        let _loc7_: any[] = null;
        let _loc9_: any[] = null;
        let _loc2_: any[] = null;
        let _loc10_: IFigureSetData = this._context.avatarRenderManager.getFigureData();
        this._colors = new Dictionary();
        let _loc8_: number = 16;
        let _loc4_: number = 12;
        let _loc1_: number = _loc8_ - _loc4_;
        for (const _loc5_ of AvatarFigurePartType.FIGURE_SETS ?? []) {
            _loc3_ = _loc10_.getSetType(stringOrNull(_loc5_));
            if (_loc3_ != null) {
                _loc6_ = _loc10_.getPalette(_loc3_.paletteID);
                if (_loc6_ != null) {
                    _loc7_ = [];
                    _loc9_ = [];
                    _loc2_ = [];
                    for (_loc11_ of _loc6_.colors?.values() ?? []) {
                        if (_loc11_.isSelectable && _loc2_.length + _loc9_.length < _loc8_) {
                            _loc9_.push(this.createColorButton(_loc11_, stringOrNull(_loc5_)));
                        }
                    }
                    _loc2_.sort(this.orderPaletteByIndex);
                    _loc9_.sort(this.orderPaletteByIndex);
                    _loc7_ = _loc9_.concat(_loc2_);
                    this._colors.set(_loc5_, _loc7_);
                }
            }
        }
    }

    private createColorButton(param1: IPartColor, param2: string): ColorButton {
        let _loc3_: ColorButton = new ColorButton(0, 0, this.colorSelected, 16777215, param1.rgb);
        _loc3_.name = param2 + "_" + param1.id;
        _loc3_.setColor(param1.rgb);
        _loc3_.index = param1.index;
        _loc3_.club = param1.clubLevel > 0;
        return _loc3_;
    }

    private orderPaletteByIndex = (param1: ColorButton, param2: ColorButton): number => {
        if (param1.index < param2.index) {
            return -1;
        }
        if (param1.index > param2.index) {
            return 1;
        }
        return 0;
    };

    private colorSelected = (param1: ColorButton): void => {
        let _loc3_: any[] = null;
        let _loc8_: string = null;
        let _loc7_: any[] = param1.name.split("_");
        let _loc6_: string = stringOrNull(_loc7_[0]);
        let _loc4_: string = stringOrNull(_loc7_[1]);
        let _loc9_: any[] = [];
        _loc9_.push(_loc4_);
        for (const _loc5_ of keysOf(this._SafeStr_2496.get(this._gender))) {
            _loc8_ = stringOrNull(this._SafeStr_2496.get(this._gender)[_loc5_]);
            _loc3_ = this._SafeStr_5016.get(_loc8_);
            if (_loc6_ == _loc5_) {
                _loc3_ = this._SafeStr_5016.get(_loc8_);
                if (_loc3_ && _loc3_.length > 1) {
                    _loc9_.push("25");
                }
            }
        }
        this._SafeStr_3459.get(this._gender)[_loc6_] = _loc9_;
        let _loc2_: ColorButton = this._selectedColors.get(_loc6_);
        if (_loc2_) {
            _loc2_.unselect();
        }
        this._selectedColors.set(_loc6_, param1);
        param1.select();
        this.updateGrids(true);
        this.updateFigure();
    };

    private renderColors(): void {
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        while (this._SafeStr_3466.numChildren > 0) {
            this._SafeStr_3466.removeChildAt(0);
        }
        let _loc7_: any[] = this._colors.get(this._SafeStr_4063);
        if (_loc7_ == null) {
            return;
        }
        let _loc5_: number = 0;
        for (const _loc1_ of _loc7_ ?? []) {
            this._SafeStr_3466.addChild(_loc1_);
            _loc4_ = _loc5_ % 4;
            _loc6_ = _loc5_ / 4 | 0;
            _loc2_ = _loc4_ * 50 + _loc4_ * 2;
            _loc3_ = _loc6_ * 53 + _loc6_ * 10;
            _loc1_.x = _loc2_;
            _loc1_.y = _loc3_;
            _loc5_++;
        }
    }

    private populateCategory(param1: string): any[] {
        let _loc15_: any;
        let _loc10_: any;
        let _loc14_: any = null;
        let _loc6_: boolean = false;
        let _loc13_: number = 0;
        let _loc4_: any[] = null;
        let _loc11_: any[] = null;
        let _loc8_: number = 0;
        let _loc2_: IPartColor = null;
        let _loc9_: number = 0;
        let _loc12_: any[] = [];
        let _loc16_: IFigureSetData = this._context.avatarRenderManager.getFigureData();
        let _loc5_: ISetType = _loc16_.getSetType(param1);
        let _loc7_: IPalette = _loc16_.getPalette(_loc5_.paletteID);
        let _loc3_: number = 0;
        if (_loc5_ && _loc7_) {
            for (_loc14_ of valuesOf(_loc5_.partSets)) {
                _loc6_ = true;
                if (_loc14_.clubLevel > 0) {
                    _loc6_ = this._showHcItems;
                }
                if (_loc6_ && _loc14_.isPreSelectable && (_loc14_.gender == this._gender || _loc14_.gender == "U")) {
                    _loc13_ = 0;
                    for (_loc15_ of valuesOf(_loc14_.parts)) {
                        _loc13_ = Math.max(_loc13_, Number(_loc15_.colorLayerIndex)) | 0;
                    }
                    _loc4_ = [];
                    for (_loc10_ of _loc7_.colors?.values() ?? []) {
                        if (_loc10_.isSelectable) {
                            _loc4_.push(_loc10_);
                        }
                    }
                    _loc11_ = [];
                    if (_loc4_.length > 0) {
                        _loc8_ = Math.random() * (_loc4_.length - 1) | 0;
                        _loc2_ = _loc4_[_loc8_];
                        _loc9_ = 0;
                        while (_loc9_ < _loc13_) {
                            _loc9_++;
                        }
                    }
                    _loc12_.push([param1, _loc14_.id].concat(_loc11_).join("-"));
                    if (++_loc3_ == 5) {
                        break;
                    }
                }
            }
        }
        return _loc12_;
    }

    private getCurrentlySelectedItems(): any[] {
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < AvatarEditor.CATEGORIES.length) {
            _loc1_.push("" + this._SafeStr_2496.get(this._gender)[AvatarEditor.CATEGORIES[_loc2_]]);
            _loc2_++;
        }
        _loc2_ = 0;
        while (_loc2_ < AvatarEditor.EXTRA_CATEGORIES.length) {
            _loc1_.push("" + this._SafeStr_2496.get(this._gender)[AvatarEditor.EXTRA_CATEGORIES[_loc2_]]);
            _loc2_++;
        }
        return _loc1_;
    }

    private updateSelections(): void {
        let _loc3_: any[] = null;
        let _loc4_: string = null;
        let _loc2_: string = null;
        let _loc1_: any[] = this.getCurrentlySelectedItems();
        for (const _loc5_ of this._SafeStr_5017 ?? []) {
            _loc3_ = _loc5_.name.split("_");
            _loc4_ = stringOrNull(_loc3_[0]);
            _loc2_ = stringOrNull(_loc3_[1]);
            if (_loc1_.indexOf(_loc2_) > -1) {
                _loc5_.select();
            } else {
                _loc5_.unselect();
            }
        }
    }

    private gridClick = (param1: Button): void => {
        let _loc4_: any[] = param1.name.split("_");
        let _loc5_: string = stringOrNull(_loc4_[0]);
        let _loc3_: string = stringOrNull(_loc4_[1]);
        let _loc2_: any[] = this.getCurrentlySelectedItems();
        if (this._SafeStr_2428) {
            this._SafeStr_2428.unselect();
        }
        let _loc6_: boolean = this._SafeStr_2428 == param1;
        _loc6_ = _loc2_.indexOf(_loc3_) > -1;
        this._SafeStr_2428 = param1;
        if (_loc5_ == "hd" || _loc5_ == "lg" || this._gender == "F" && _loc5_ == "ch") {
            _loc6_ = false;
        }
        this._SafeStr_4063 = _loc5_;
        if (_loc6_) {
            delete this._SafeStr_2496.get(this._gender)[this._SafeStr_4063];
            this._SafeStr_2428 = null;
        } else {
            this._SafeStr_2496.get(this._gender)[this._SafeStr_4063] = _loc3_;
            this._SafeStr_2428.select();
            this._SafeStr_2428.currentlyEditing();
        }
        this.updateFigure();
        this.renderColors();
    };

    public avatarImageReady(param1: string): void {
        let _loc2_: IAvatarImage = null;
        let _loc3_: BitmapData = null;
        if (param1 == this.getFigure() || param1.replace("-25", "") == this.getFigure()) {
            _loc2_ = this._context.avatarRenderManager.createAvatarImage(param1, "h");
            _loc2_.setDirection("full", 4);
            _loc3_ = _loc2_.getImage("full", false);
            if (_loc3_) {
                this._figureContainer.bitmapData = _loc3_;
            }
        } else {
            this.updateGrids(false);
        }
    }

    public returnFromPayment(): void {
        HabboWebTools.closeWebPageAndRestoreClient();
        if (ExternalInterface.available) {
            ExternalInterface.call("NewUserReception.newUserCheckHcMembership");
        }
    }

    public checkForHcMembership(param1: string): void {
        let _loc2_: string = param1;
        if ("OK" === _loc2_) {
            this._SafeStr_7322 = true;
            this.populateColors();
            if (this._SafeStr_7371) {
                this._SafeStr_7371.visible = false;
            }
        }
    }

    private saveOutfit = (param1: Button): void => {
        this._context.communicationManager.connection.send(new UpdateFigureDataMessageComposer(this.getFigure(), this._gender.toLowerCase()));
        this._context.submitName();
    };

    public nameChangeCompleted(param1: boolean = false): void {
        this._context.editorFinished();
    }

    public showHideGrid(param1: boolean = false): void {
        this._grid.visible = param1;
        this._SafeStr_3466.visible = param1;
        this._SafeStr_4110.visible = param1;
        this._SafeStr_4628.visible = param1;
        this._SafeStr_2570.visible = param1;
    }

    public get gender(): string {
        return this._gender;
    }

    public showHideButtons(param1: boolean): void {
        this._SafeStr_2570.visible = param1;
    }

    public onRandomize = (param1: Button): void => {
        this.setRandomFigure();
    };

    get [IDisposable](): true {
        return true;
    }
}
