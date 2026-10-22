import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { LoginFlow } from '@/login/LoginFlow';
import type { Button } from '@/onBoardingHcUi/Button';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { SimpleLogger } from '@/debug/SimpleLogger';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

const flag_icon_de_png_pngAsset = embedBitmap("login/flag_icon_de_png.png");
const flag_icon_dev_png_pngAsset = embedBitmap("login/flag_icon_dev_png.png");
const flag_icon_en_png_pngAsset = embedBitmap("login/flag_icon_en_png.png");
const flag_icon_es_png_pngAsset = embedBitmap("login/flag_icon_es_png.png");
const flag_icon_fi_png_pngAsset = embedBitmap("login/flag_icon_fi_png.png");
const flag_icon_fr_png_pngAsset = embedBitmap("login/flag_icon_fr_png.png");
const flag_icon_it_png_pngAsset = embedBitmap("login/flag_icon_it_png.png");
const flag_icon_nl_png_pngAsset = embedBitmap("login/flag_icon_nl_png.png");
const flag_icon_pt_png_pngAsset = embedBitmap("login/flag_icon_pt_png.png");
const flag_icon_tr_png_pngAsset = embedBitmap("login/flag_icon_tr_png.png");
const flag_icon_selected_png_pngAsset = embedBitmap("login/flag_icon_selected_png.png");

export class EnvironmentView extends Sprite implements IDisposable {
    static { registerClassName(this, 'login::EnvironmentView'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        EnvironmentView.#initStatics();
        return EnvironmentView._log;
    }

    private static readonly ITEMS_PER_ROW: number = 9;
    private static readonly THUMB_SIZE: number = 160;
    private static readonly THUMB_SCALE: number = 0.5;
    private static readonly SPACING: number = 10;

    private static readonly flag_icon_de_png = flag_icon_de_png_pngAsset;

    private static readonly flag_icon_dev_png = flag_icon_dev_png_pngAsset;

    private static readonly flag_icon_en_png = flag_icon_en_png_pngAsset;

    private static readonly flag_icon_es_png = flag_icon_es_png_pngAsset;

    private static readonly flag_icon_fi_png = flag_icon_fi_png_pngAsset;

    private static readonly flag_icon_fr_png = flag_icon_fr_png_pngAsset;

    private static readonly flag_icon_it_png = flag_icon_it_png_pngAsset;

    private static readonly flag_icon_nl_png = flag_icon_nl_png_pngAsset;

    private static readonly flag_icon_pt_png = flag_icon_pt_png_pngAsset;

    private static readonly flag_icon_tr_png = flag_icon_tr_png_pngAsset;

    private static readonly flag_icon_selected_png = flag_icon_selected_png_pngAsset;

    declare private _environmentImages: Bitmap[];

    declare private _context: LoginFlow;

    declare private _SafeStr_3395: TextField;

    declare private _SafeStr_3848: Bitmap;

    declare private _environmentName: TextField;

    private _SafeStr_2961: number = 0;

    declare private _SafeStr_2998: Button;

    declare private _SafeStr_4694: Button;

    private _environmentImageContainers: any[] = [];

    declare private _SafeStr_3773: Bitmap;

    private _spaceBetweenImages: number = 10;

    declare private _environmentTypes: any[];

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    declare private _SafeStr_3097: Sprite;

    constructor(param1: LoginFlow) {
        super();
        this._context = param1;
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: Timer = new Timer(20, 1);
        _loc2_.addEventListener("timerComplete", this.onAlignElements);
        _loc2_.start();
    };

    private onAlignElements = (param1: TimerEvent = null): void => {
        LoaderUI.alignAnchors(this, 0, "c", this._SafeStr_3848);
        if (this._SafeStr_2998) {
            LoaderUI.alignAnchors(this._SafeStr_3848, 0, "r", this._SafeStr_2998);
            LoaderUI.lineUpHorizontallyRevers(this._SafeStr_2998, 20, this._SafeStr_4694);
        } else {
            LoaderUI.alignAnchors(this._SafeStr_3848, 0, "r", this._SafeStr_4694);
        }
    };

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2998) {
            this._SafeStr_2998.dispose();
        }
        this._SafeStr_4694.dispose();
        for (const _loc1_ of this._environmentImages ?? []) {
        }
        this._environmentImages = null;
        this._context = null;
    }

    public get disposed(): boolean {
        return this._context == null;
    }

    private initEnvironmentImages(): void {
        this._environmentTypes = this._context.getProperty(HabboProperty.LIVE_ENVIRONMENTS).split("/");
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_en_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_pt_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_de_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_es_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_fi_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_fr_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_it_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_nl_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_tr_png(), Bitmap));
        this._environmentImages.push(castTo(new EnvironmentView.flag_icon_dev_png(), Bitmap));
    }

    public init(): void {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._environmentImages = [];
        if (this._environmentTypes == null) {
            this.initEnvironmentImages();
        }
        this.updateEnvironment();
        this.initView();
    }

    public updateEnvironment(): void {
        let _loc1_: string = this._context.getProperty(HabboProperty.ENVIRONMENT_ID);
        let _loc2_: number = this._environmentTypes.indexOf(_loc1_);
        if (_loc2_ == -1) {
            EnvironmentView._log.warn("Missing environment, require hotel selection! " + _loc1_);
            this._SafeStr_2961 = 0;
        } else {
            this._SafeStr_2961 = _loc2_;
        }
        this.chooseEnvironment();
    }

    public initView(): void {
        let _loc7_: number = 0;
        let _loc8_: Sprite = null;
        let _loc10_: Bitmap = null;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc9_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        this.addTitleField();
        this._SafeStr_3848 = LoaderUI.createBalloon(640, 100, 0, false, 995918, "none");
        this._SafeStr_3848.visible = false;
        this.addChild(this._SafeStr_3848);
        this._SafeStr_3097 = new Sprite();
        this.addChild(this._SafeStr_3097);
        this._SafeStr_3773 = castTo(new EnvironmentView.flag_icon_selected_png(), Bitmap);
        this._SafeStr_3097.addChild(this._SafeStr_3773);
        this._SafeStr_3097.scaleX = this._SafeStr_3097.scaleY = 0.5;
        let _loc1_: number = 100;
        _loc7_ = 0;
        while (_loc7_ < this._environmentImages.length) {
            _loc8_ = new Sprite();
            _loc10_ = asInstanceOf(this._environmentImages[_loc7_], Bitmap);
            if (_loc10_ != null) {
                _loc8_.addChild(_loc10_);
            }
            this.addChild(_loc8_);
            this._environmentImageContainers.push(_loc8_);
            _loc8_.name = String(_loc7_);
            _loc8_.addEventListener("click", this.onEnvironmentClick);
            _loc8_.scaleX = _loc8_.scaleY = 0.5;
            _loc3_ = 80;
            _loc2_ = 5;
            _loc6_ = _loc7_ % 9;
            _loc9_ = _loc7_ / 9 | 0;
            _loc4_ = _loc6_ * _loc3_ + _loc6_ * _loc2_;
            _loc5_ = _loc9_ * _loc3_ + _loc9_ * _loc2_;
            _loc8_.x = _loc4_;
            _loc8_.y = _loc1_ + _loc5_;
            _loc7_++;
        }
        this._environmentName = LoaderUI.createTextField("Title", 20, 16777215, false, true, false, false);
        this._environmentName.width = 260;
        this._environmentName.y = 300;
        this.addChild(this._environmentName);
        this._SafeStr_4694 = new ColouredButton("gfreen", "${connection.login.useTicket}", new Rectangle(0, 300, 0, 40), true, this.onButtonSelectToken);
        this.addChild(this._SafeStr_4694);
        this.chooseEnvironment();
    }

    private addTitleField(): void {
        if (!this._SafeStr_3395) {
            this._SafeStr_3395 = LoaderUI.createTextField("${connection.login.environment.choose}", 40, 16777215, false, true, false, false, "left");
            this._SafeStr_3395.x = 0;
            this._SafeStr_3395.y = 0;
            this._SafeStr_3395.width = 500;
            this._SafeStr_3395.multiline = false;
            this._SafeStr_3395.thickness = 50;
            this.addChild(this._SafeStr_3395);
        }
    }

    private onEnvironmentClick = (param1: Event): void => {
        this._SafeStr_2961 = param1.currentTarget.name | 0;
        this.chooseEnvironment();
        this._context.updateEnvironment(stringOrNull(this._environmentTypes[this._SafeStr_2961]), true);
        this.onAlignElements();
    };

    private chooseEnvironment(): void {
        let _loc1_: Sprite = this._environmentImageContainers[this._SafeStr_2961];
        if (_loc1_ == null) {
            return;
        }
        this._SafeStr_3097.x = _loc1_.x - (this._SafeStr_3097.width - _loc1_.width) / 2 - 1;
        this._SafeStr_3097.y = _loc1_.y - (this._SafeStr_3097.height - _loc1_.height) / 2 - 1;
        this._SafeStr_3097.visible = true;
        if (this._SafeStr_2998) {
            this._SafeStr_2998.active = true;
        }
        this.updateDescription();
    }

    private onButtonSelect(param1: DisplayObject): void {
        this._context.updateEnvironment(stringOrNull(this._environmentTypes[this._SafeStr_2961]), false);
        this._context.showScreen(2);
    }

    private onButtonSelectToken = (param1: DisplayObject): void => {
        this._context.updateEnvironment(stringOrNull(this._environmentTypes[this._SafeStr_2961]), false);
        this._context.showScreen(4);
    };

    private updateDescription(): void {
        let _loc1_: string = stringOrNull(this._environmentTypes[this._SafeStr_2961]);
        this._environmentName.text = this._context.getProperty("connection.info.name." + _loc1_);
    }

    public get environmentId(): string {
        return stringOrNull(this._environmentTypes[this._SafeStr_2961]);
    }

    public get environmentAvailable(): boolean {
        let _loc1_: string = this._context.getProperty(HabboProperty.ENVIRONMENT_ID);
        return this._environmentTypes.indexOf(_loc1_) > -1;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (EnvironmentView.#staticsReady) return;
        EnvironmentView.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(EnvironmentView, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("login.EnvironmentView"));
    }

    get [IDisposable](): true {
        return true;
    }
}
