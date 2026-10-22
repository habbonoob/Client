import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { IBoardingContext } from '@/com/sulake/habbo/friendbar/onBoardingHc/IBoardingContext';
import type { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { NameChangeDialog } from '@/com/sulake/habbo/friendbar/onBoardingHc/NameChangeDialog';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { NineSplitSprite } from '@/onBoardingHcUi/NineSplitSprite';
import { WaitIndicator } from '@/onBoardingHcUi/WaitIndicator';

const icon_name_ok_png_pngAsset = embedBitmap("friendbar/icon_name_ok_png.png");
const icon_name_alert_png_pngAsset = embedBitmap("friendbar/icon_name_alert_png.png");

export class HitchNameChangeDialog extends NameChangeDialog {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.onBoardingHc::HitchNameChangeDialog'); }

    constructor(param1: IBoardingContext, param2: Sprite, param3: number) {
        super(param1, param2, param3);
    }

    private icon_name_ok_png = icon_name_ok_png_pngAsset;

    private icon_name_alert_png = icon_name_alert_png_pngAsset;

    protected override init(): void {
        this._style = 2;
        this._SafeStr_2227 = LoaderUI.createFrame("", "", new Rectangle(-this._dialogWidth / 2, 0, this._dialogWidth, 1), this._style);
        this._container.addChild(this._SafeStr_2227);
        let _loc5_: number = 0;
        let _loc4_: number = 330;
        let _loc1_: number = this._dialogWidth - 12;
        let _loc8_: boolean = false;
        let _loc2_: Sprite = new Sprite();
        this._SafeStr_2343 = NineSplitSprite.INPUT_FIELD_HITCH.render(_loc4_, 31);
        _loc2_.addChild(this._SafeStr_2343);
        this._SafeStr_2227.addChild(_loc2_);
        _loc2_.x = _loc5_;
        let _loc7_: Bitmap = null;
        let _loc3_: TextField = LoaderUI.createTextField(this._context.getLocalization("onboarding.characters.tip", "TIP: There are tons of Habbos created every day"), 18, 8309486, false, true, false, false);
        _loc3_.width = _loc4_ - 32;
        let _loc6_: TextField = LoaderUI.createTextField(this._context.getLocalization("onboarding.creative.tip", "be creative! You can also use these special characters"), 18, 8309486, false, true, false, false);
        _loc6_.width = _loc4_ - 32;
        this._SafeStr_2370 = new Sprite();
        let _loc9_: Bitmap = LoaderUI.createBalloon(295, 230, 45, false, 995918, "down");
        _loc9_.y = 90;
        this._SafeStr_2370.addChild(_loc9_);
        this._SafeStr_2370.addChild(_loc3_);
        this._SafeStr_2370.addChild(_loc6_);
        _loc3_.x = 16;
        _loc3_.y = _loc9_.y + (_loc9_.height - (_loc3_.height + _loc6_.height)) / 2;
        _loc3_.width = 250;
        this._SafeStr_2370.visible = false;
        _loc6_.x = 16;
        _loc6_.y = _loc3_.y + _loc3_.height + 20;
        _loc6_.width = 250;
        if (_loc7_ != null) {
            this._SafeStr_2370.addChild(_loc7_);
            _loc7_.x = 16;
            _loc7_.y = (this._SafeStr_2370.height - _loc7_.height) / 2 | 0;
        }
        this._SafeStr_2227.addChild(this._SafeStr_2370);
        this._SafeStr_2370.x = _loc5_;
        this._inputDefaultString = this._context.getLocalization("name", "Enter name here");
        this._SafeStr_2135 = LoaderUI.createTextField(this._inputDefaultString, 18, 6710886, true, false, true, false);
        this._SafeStr_2227.addChild(this._SafeStr_2135);
        this._SafeStr_2135.x = _loc2_.x + 16;
        this._SafeStr_2135.y = _loc2_.y + ((_loc2_.height - this._SafeStr_2135.height) / 2 | 0);
        this._SafeStr_2135.width = _loc2_.width - 30;
        this._SafeStr_2135.addEventListener("click", this.onInputClicked);
        this._SafeStr_2135.addEventListener("change", this.onInputChange);
        this._SafeStr_2431 = new this.icon_name_ok_png();
        this._SafeStr_2227.addChild(this._SafeStr_2431);
        this._SafeStr_2431.y = _loc2_.y + ((_loc2_.height - this._SafeStr_2431.height) / 2 | 0);
        this._SafeStr_2431.x = _loc2_.x + _loc2_.width - this._SafeStr_2431.width - 7;
        this._SafeStr_2993 = new this.icon_name_alert_png();
        this._SafeStr_2227.addChild(this._SafeStr_2993);
        this._SafeStr_2993.x = this._SafeStr_2431.x;
        this._SafeStr_2993.y = this._SafeStr_2431.y;
        this.nameIsCorrect = false;
        this._SafeStr_2350 = new WaitIndicator(this._style);
        this._SafeStr_2227.addChild(this._SafeStr_2350);
        this._SafeStr_2350.y = _loc2_.y + (_loc2_.height / 2 | 0) + 2;
        this._SafeStr_2350.x = _loc2_.x + _loc2_.width - (this._SafeStr_2431.width / 2 | 0) - 7;
        this._SafeStr_2350.visible = false;
        _loc2_.addEventListener("click", this.onInputBackgroundClicked);
        this._SafeStr_2227.y = -50;
    }
}
