import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ChangeUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/ChangeUserNameResultMessageParser';
import type { CheckUserNameResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/avatar/CheckUserNameResultMessageParser';
import type { IBoardingContext } from '@/com/sulake/habbo/friendbar/onBoardingHc/IBoardingContext';
import type { Button } from '@/onBoardingHcUi/Button';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { Shape } from '@habbo-pixi/runtime/display/Shape';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ChangeUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/ChangeUserNameResultMessageEvent';
import { CheckUserNameResultMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/avatar/CheckUserNameResultMessageEvent';
import { ChangeUserNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/ChangeUserNameMessageComposer';
import { CheckUserNameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/avatar/CheckUserNameMessageComposer';
import { Dimmer } from '@/onBoardingHcUi/Dimmer';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { NineSplitSprite } from '@/onBoardingHcUi/NineSplitSprite';
import { WaitIndicator } from '@/onBoardingHcUi/WaitIndicator';

const input_error_alert_hitch_png_pngAsset = embedBitmap("friendbar/input_error_alert_hitch_png.png");

export class NameChangeDialog implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.onBoardingHc::NameChangeDialog'); }

    private static readonly IDLE_TIME_MS: number = 500;

    constructor(param1: IBoardingContext, param2: Sprite, param3: number) {
        this.initInstanceFields();
        this._context = param1;
        this._container = param2;
        this._dialogWidth = param3;
        this.init();
        this._SafeStr_6750 = param1.communicationManager.addHabboConnectionMessageEvent(new ChangeUserNameResultMessageEvent(this.onChangeUserNameResult));
        this._SafeStr_7105 = param1.communicationManager.addHabboConnectionMessageEvent(new CheckUserNameResultMessageEvent(this.onCheckUserNameResult));
        this._SafeStr_2696 = new Timer(500, 1);
        this._SafeStr_2696.addEventListener("timer", this.onIdleTimer);
    }

    protected _style: number = 1;

    declare protected _context: IBoardingContext;

    declare protected _SafeStr_2227: Sprite;

    declare protected _SafeStr_2135: TextField;

    declare protected _submitButton: Button;

    declare protected _skipButton: Button;

    declare protected _SafeStr_2431: Bitmap;

    declare protected _SafeStr_2993: Bitmap;

    declare protected _SafeStr_2343: Bitmap;

    declare protected _SafeStr_2350: WaitIndicator;

    declare protected _container: Sprite;

    declare protected _inputDefaultString: string;

    declare protected _SafeStr_2370: Sprite;

    declare protected _dialogWidth: number;
    static { (this.prototype as any)._dialogWidth = 0; }

    private input_error_alert_hitch_png = input_error_alert_hitch_png_pngAsset;

    declare private _SafeStr_6808: boolean;
    static { (this.prototype as any)._SafeStr_6808 = false; }

    declare private _SafeStr_4315: Dimmer;

    declare private _SafeStr_2358: Sprite;

    declare private _inputClickedAlready: boolean;
    static { (this.prototype as any)._inputClickedAlready = false; }

    declare private _SafeStr_2696: Timer;

    declare private _preSelectedGender: string;

    declare private _SafeStr_6750: IMessageEvent;

    declare private _SafeStr_7105: IMessageEvent;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set preSelectedGender(param1: string) {
        this._preSelectedGender = param1;
    }

    protected get nameIsCorrect(): boolean {
        return this._SafeStr_2431 != null && this._SafeStr_2431.visible;
    }

    protected set nameIsCorrect(param1: boolean) {
        param1 = true;
        if (this._SafeStr_2431 != null) {
            this._SafeStr_2431.visible = param1;
        }
        if (this._SafeStr_2993 != null) {
            this._SafeStr_2993.visible = !param1;
        }
        if (this._submitButton != null) {
            this._submitButton.active = true;
            if (this._style == 2) {
                this._submitButton.visible = true;
                this._submitButton.active = this.nameChanged ? param1 : true;
            } else {
                this._submitButton.visible = param1 && this.nameChanged;
            }
        }
        if (this._skipButton != null) {
            if (this._style == 2) {
                this._skipButton.visible = this.nameChanged;
            }
        }
    }

    private get nameChanged(): boolean {
        return this._SafeStr_2135 != null && this._SafeStr_2135.text != this._context.getLocalization("name", this._inputDefaultString);
    }

    public setNameClaimed(param1: boolean): void {
        this._SafeStr_6808 = param1;
    }

    public submitName(): void {
        this.claimName(this._SafeStr_2135.text);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._context.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_6750);
        this._context.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_7105);
        if (this._SafeStr_4315) {
            this._container.removeChild(this._SafeStr_4315);
        }
        if (this._SafeStr_2227) {
            this._container.removeChild(this._SafeStr_2227);
        }
        if (this._SafeStr_2350 != null) {
            this._SafeStr_2350.dispose();
            this._SafeStr_2350 = null;
        }
        this._SafeStr_4315 = null;
        this._SafeStr_2135 = null;
        this._submitButton = null;
        this._skipButton = null;
        this._SafeStr_2358 = null;
        this._SafeStr_2431 = null;
        this._SafeStr_2343 = null;
        this._SafeStr_2227 = null;
        this._context = null;
        this._disposed = true;
    }

    public claimNameResponse(param1: number, param2: any, param3: any[]): void {
        this.nameIsCorrect = false;
        switch (param1) {
            case ChangeUserNameResultMessageEvent._SafeStr_4064:
                this.nameIsCorrect = true;
                this._context.nameChangeCompleted();
                this._context.editorFinished();
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5263:
                this.showErrorMessage(this._context.getLocalization("rename.error.too_long", "OOPS! YOUR NAME\'S TOO LONG TO REMEMBER"));
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5378:
                this.showErrorMessage(this._context.getLocalization("rename.error.too_short", "OOPS! YOUR NAME\'S TOO SHORT TO PRONOUNCE."));
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_4985:
                this.showErrorMessage(this._context.getLocalization("rename.error.words", "OOPS! THINK HARDER - THAT\'S NOT A VERY NICE NAME."));
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5350:
            case ChangeUserNameResultMessageEvent._SafeStr_4702:
                this.showErrorMessage(this._context.getLocalization("rename.error.taken", "OOPS! SOMEONE\'S ALREADY USING THAT NAME."));
        }
    }

    public claimNameFailed(param1: string): void {
    }

    public checkNameResponse(param1: number, param2: string, param3: any[]): void {
        if (this._SafeStr_2135 == null || this._SafeStr_2135.text != param2) {
            return;
        }
        if (this._SafeStr_2350 != null) {
            this._SafeStr_2350.visible = false;
        }
        this.nameIsCorrect = false;
        switch (param1) {
            case ChangeUserNameResultMessageEvent._SafeStr_4064:
                this.nameIsCorrect = true;
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5263:
                this.showErrorMessage(this._context.getLocalization("rename.error.too_long", "OOPS! YOUR NAME\'S TOO LONG TO REMEMBER"));
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5378:
                this.showErrorMessage(this._context.getLocalization("rename.error.too_short", "OOPS! YOUR NAME\'S TOO SHORT TO PRONOUNCE."));
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_4985:
                this.showErrorMessage(this._context.getLocalization("rename.error.words", "OOPS! THINK HARDER - THAT\'S NOT A VERY NICE NAME."));
                break;
            case ChangeUserNameResultMessageEvent._SafeStr_5350:
            case ChangeUserNameResultMessageEvent._SafeStr_4702:
                this.showErrorMessage(this._context.getLocalization("rename.error.taken", "OOPS! SOMEONE\'S ALREADY USING THAT NAME."));
        }
        if (this._SafeStr_2370 != null) {
            this._SafeStr_2370.visible = !this.nameIsCorrect;
            this._context.showHideButtons(this.nameIsCorrect);
        }
    }

    public checkNameFailed(param1: string): void {
    }

    protected init(): void {
        let _loc5_: Bitmap = null;
        this._SafeStr_2227 = LoaderUI.createFrame(this._context.getLocalization("rename.title", "Pick a name for your character"), "", new Rectangle(-this._dialogWidth / 2, 0, this._dialogWidth, 1), this._style);
        let _loc4_: number = 23;
        let _loc3_: number = this._dialogWidth - _loc4_ * 2;
        let _loc1_: number = this._dialogWidth - 12;
        this._SafeStr_2227.x = 5;
        let _loc10_: boolean = false;
        let _loc6_: TextField = LoaderUI.createTextField(this._context.getLocalization("rename.subtitle", "You are a unique and beautiful snowflake."), 20, 0, true, false, false, _loc10_);
        _loc6_.x = _loc4_;
        LoaderUI.addEtching(_loc6_);
        let _loc8_: TextField = LoaderUI.createTextField(this._context.getLocalization("rename.description", "In Habbo, we all sign in using a unique name, so go ahead and enter yours. There\'s no need to use your real one - stage names are perfectly ok."), 12, 0, false, true, false, _loc10_);
        this._SafeStr_2227.addChild(_loc8_);
        _loc8_.x = _loc4_;
        _loc8_.width = _loc3_;
        LoaderUI.addEtching(_loc8_);
        let _loc2_: Sprite = new Sprite();
        this._SafeStr_2343 = NineSplitSprite.INPUT_FIELD.render(_loc3_, 50);
        _loc2_.addChild(this._SafeStr_2343);
        this._SafeStr_2227.addChild(_loc2_);
        _loc2_.x = _loc4_;
        let _loc7_: TextField = LoaderUI.createTextField(this._context.getLocalization("rename.accepted", "WE ACCEPT LETTERS AND NUMBERS. NOT VISA OR MASTERCARD."), 9, 4342338, true, false, false, _loc10_);
        this._SafeStr_2227.addChild(_loc7_);
        _loc7_.x = _loc4_ + 5;
        LoaderUI.addEtching(_loc7_);
        let _loc11_: TextField = LoaderUI.createTextField(this._context.getLocalization("rename.warning", "Once you\'ve selected a name for your character, you can\'t change it anymore, so please pay a bit of attention to your selection."), 16, 4342338, false, true, false, false);
        _loc11_.width = _loc3_ - 66;
        LoaderUI.addEtching(_loc11_);
        _loc5_ = NineSplitSprite.BORDER_SUNK.render(_loc3_, _loc11_.height + 24 | 0);
        this._SafeStr_2370 = new Sprite();
        if (_loc5_) {
            this._SafeStr_2370.addChild(_loc5_);
        }
        this._SafeStr_2370.addChild(_loc11_);
        _loc11_.x = 50;
        _loc11_.y = 12;
        this._SafeStr_2227.addChild(this._SafeStr_2370);
        this._SafeStr_2370.x = _loc4_;
        this._inputDefaultString = this._context.getLocalization("name", "Click here to type a name");
        this._SafeStr_2135 = LoaderUI.createTextField(this._inputDefaultString, 14, 8947848, true, false, true, false);
        this._SafeStr_2227.addChild(this._SafeStr_2135);
        this._SafeStr_2135.x = _loc2_.x + 16;
        this._SafeStr_2135.y = _loc2_.y + ((_loc2_.height - this._SafeStr_2135.height) / 2 | 0);
        this._SafeStr_2135.width = _loc2_.width - 30;
        this._SafeStr_2135.addEventListener("click", this.onInputClicked);
        this._SafeStr_2135.addEventListener("change", this.onInputChange);
        this._SafeStr_2350 = new WaitIndicator(this._style);
        this._SafeStr_2227.addChild(this._SafeStr_2350);
        this._SafeStr_2350.y = _loc2_.y + (_loc2_.height / 2 | 0);
        this._SafeStr_2350.x = _loc2_.x + _loc2_.width - (this._SafeStr_2431.width / 2 | 0) - 15;
        this._SafeStr_2350.visible = false;
        _loc2_.addEventListener("click", this.onInputBackgroundClicked);
        let _loc9_: number = -50;
        LoaderUI.resizeFrame(this._SafeStr_2227, this._dialogWidth, _loc9_);
        this._SafeStr_2227.y = -(_loc9_ / 2 | 0);
        this._SafeStr_4315 = new Dimmer();
        this._container.addChild(this._SafeStr_2227);
    }

    private onChangeUserNameResult = (param1: ChangeUserNameResultMessageEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: ChangeUserNameResultMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        this.claimNameResponse(_loc2_.resultCode, _loc2_.name, _loc2_.nameSuggestions);
    };

    private onCheckUserNameResult = (param1: CheckUserNameResultMessageEvent): void => {
        if (param1 == null) {
            return;
        }
        let _loc2_: CheckUserNameResultMessageParser = param1.getParser();
        if (_loc2_ == null) {
            return;
        }
        this.checkNameResponse(_loc2_.resultCode, _loc2_.name, _loc2_.nameSuggestions);
    };

    private claimName(param1: string): void {
        if (this._SafeStr_6808) {
            this._context.nameChangeCompleted();
        }
        this._context.communicationManager.connection.send(new ChangeUserNameMessageComposer(param1));
        this._context.nameChangeCompleted();
    }

    private checkName(param1: string): void {
        if (!param1 || param1.length == 0) {
            return;
        }
        this._context.communicationManager.connection.send(new CheckUserNameMessageComposer(param1));
        if (this._SafeStr_2350 != null) {
            this._SafeStr_2350.visible = true;
        }
    }

    private showErrorMessage(param1: string): void {
        let _loc5_: TextField = null;
        let _loc4_: Bitmap = null;
        let _loc2_: Shape = null;
        let _loc3_: number = this._SafeStr_2343.width | 0;
        let _loc6_: number = this._SafeStr_2343.height | 0;
        this._SafeStr_2343.bitmapData = this._style == 2 ? NineSplitSprite.INPUT_ERROR_HITCH.render(_loc3_, _loc6_).bitmapData : NineSplitSprite.INPUT_ERROR.render(_loc3_, _loc6_).bitmapData;
        this.removeIndicators();
        if (this._SafeStr_2993 != null) {
            this._SafeStr_2993.visible = true;
        }
        if (this._style == 1) {
            _loc5_ = LoaderUI.createTextField(param1, 9, 16777215, true);
            _loc4_ = LoaderUI.createBalloon(_loc5_.width + 30 | 0, _loc5_.height + 17 | 0, -1, true, 11411485);
            this._SafeStr_2358 = new Sprite();
            this._SafeStr_2358.addChild(_loc4_);
            this._SafeStr_2358.addChild(_loc5_);
            _loc5_.x = 15;
            _loc5_.y = 14;
        } else {
            _loc5_ = LoaderUI.createTextField(param1, 10, 16777215);
            _loc2_ = LoaderUI.createScale9GridShapeFromImage(castTo(new this.input_error_alert_hitch_png(), Bitmap).bitmapData, new Rectangle(3, 3, 5, 5));
            _loc3_ = this._SafeStr_2343.width | 0;
            if (_loc5_.width > _loc3_) {
                _loc3_ = _loc5_.width + 20 | 0;
            }
            _loc2_.width = _loc3_;
            _loc2_.height = this._SafeStr_2343.height - 11;
            this._SafeStr_2358 = new Sprite();
            this._SafeStr_2358.addChild(_loc2_);
            this._SafeStr_2358.addChild(_loc5_);
            _loc5_.x = 16;
            _loc5_.y = (_loc2_.height - _loc5_.height) / 2 | 0;
        }
        this._SafeStr_2227.addChild(this._SafeStr_2358);
        if (this._style == 1) {
            this._SafeStr_2358.x = (this._SafeStr_2227.width - this._SafeStr_2358.width) / 2 | 0;
            this._SafeStr_2358.y = this._SafeStr_2343.parent.y + this._SafeStr_2343.height;
            this._SafeStr_2358.filters = [new GlowFilter(0, 0.24, 6, 6)];
        } else {
            this._SafeStr_2358.x = this._SafeStr_2343.parent.x;
            this._SafeStr_2358.y = this._SafeStr_2343.parent.y + this._SafeStr_2343.height + 4;
        }
    }

    private removeIndicators(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        if (this._SafeStr_2358 != null && this._SafeStr_2227.contains(this._SafeStr_2358)) {
            _loc1_ = this._SafeStr_2343.width | 0;
            _loc2_ = this._SafeStr_2343.height | 0;
            this._SafeStr_2343.bitmapData = this._style == 2 ? NineSplitSprite.INPUT_CORRECTED_HITCH.render(_loc1_, _loc2_).bitmapData : NineSplitSprite.INPUT_CORRECTED.render(_loc1_, _loc2_).bitmapData;
            this._SafeStr_2227.removeChild(this._SafeStr_2358);
        }
        this._SafeStr_2431.visible = false;
        if (this._SafeStr_2993 != null) {
            this._SafeStr_2993.visible = false;
        }
    }

    protected onInputChange = (param1: Event): void => {
        if (this._SafeStr_2696 != null) {
            this._SafeStr_2696.reset();
            this._SafeStr_2696.start();
        }
        this.removeIndicators();
    };

    protected onInputBackgroundClicked = (param1: MouseEvent): void => {
        this._context.stage.focus = this._SafeStr_2135;
        this.onInputClicked(null);
    };

    protected onInputClicked = (param1: Event): void => {
        if (this._inputClickedAlready) {
            return;
        }
        this._inputClickedAlready = true;
        this._SafeStr_2135.text = "";
        this._SafeStr_2135.textColor = (this._style == 2 ? 6710886 : 0) >>> 0;
        this._SafeStr_2135.removeEventListener("click", this.onInputClicked);
        this.onInputChange(null);
    };

    private onIdleTimer = (param1: TimerEvent): void => {
        this.checkName(this._SafeStr_2135.text);
    };

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [IDisposable](): true {
        return true;
    }
}
