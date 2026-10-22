import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import type { ILoginContext } from '@/login/ILoginContext';
import type { Button } from '@/onBoardingHcUi/Button';
import type { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { LoaderInfo } from '@habbo-pixi/runtime/display/LoaderInfo';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { ErrorEvent } from '@habbo-pixi/runtime/events/ErrorEvent';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

const avatar_halo_png_pngAsset = embedBitmap("shared/avatar_halo_png.png");
const avatar_glow_png_pngAsset = embedBitmap("shared/avatar_glow_png.png");
const placeholder_avatar_pngAsset = embedBitmap("login/placeholder_avatar.png");

export class AvatarView extends Sprite {
    static { registerClassName(this, 'login::AvatarView'); }

    private static readonly avatar_halo_png = avatar_halo_png_pngAsset;

    private static readonly avatar_glow_png = avatar_glow_png_pngAsset;

    private static readonly placeholder_avatar = placeholder_avatar_pngAsset;

    declare private _context: ILoginContext;

    declare private _SafeStr_3395: TextField;

    declare private _SafeStr_2570: ColouredButton;

    declare private _SafeStr_3902: ColouredButton;

    declare private _initialized: boolean;
    static { (this.prototype as any)._initialized = false; }

    declare private _accounts: AvatarData[];

    private _spaceBetweenImages: number = 10;

    declare private _baseUrl: string;

    declare private _SafeStr_2823: Sprite;

    declare private _SafeStr_4137: TextField;

    declare private _avatarName: TextField;

    declare private _SafeStr_3065: number;
    static { (this.prototype as any)._SafeStr_3065 = 0; }

    declare private _avatarImages: DisplayObjectContainer[];

    declare private _SafeStr_2965: Bitmap;

    declare private _avatarGlow: Bitmap;

    constructor(param1: ILoginContext) {
        super();
        this._context = param1;
        this.init();
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    public set baseUrl(param1: string) {
        this._baseUrl = param1;
    }

    public dispose(): void {
        this._SafeStr_2570.dispose();
        this._SafeStr_3902.dispose();
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: Timer = new Timer(20, 1);
        _loc2_.addEventListener("timerComplete", this.onAlignElements);
        _loc2_.start();
    };

    private onAlignElements = (param1: TimerEvent): void => {
        LoaderUI.lineUpVerticallyRevers(this._SafeStr_2570, 20, this._SafeStr_2823);
        LoaderUI.alignAnchors(this._SafeStr_2823, 0, "r", this._SafeStr_2570);
        LoaderUI.lineUpHorizontallyRevers(this._SafeStr_2570, 20, this._SafeStr_3902);
        Logger.log("(avatar) Information panel: " + [this._SafeStr_2823.x, this._SafeStr_2823.y, this._SafeStr_2823.width, this._SafeStr_2823.height]);
    };

    public init(): void {
        this._SafeStr_3065 = 0;
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._SafeStr_2823 = new Sprite();
        this.addChild(this._SafeStr_2823);
        let _loc1_: Bitmap = LoaderUI.createBalloon(640, 100, 0, false, 995918, "none");
        this._SafeStr_2823.addChild(_loc1_);
        this._SafeStr_2823.y = 180;
        this._SafeStr_4137 = LoaderUI.createTextField("", 18, 8309486, false);
        this._avatarName = LoaderUI.createTextField("", 20, 16777215, false, true, false, false);
        this._avatarName.width = 260;
        this._avatarName.x = 50;
        this._SafeStr_4137.x = 50;
        this._SafeStr_4137.width = 260;
        this._SafeStr_2823.addChild(this._SafeStr_4137);
        this._SafeStr_2823.addChild(this._avatarName);
        LoaderUI.lineUpVertically(_loc1_, 15 - _loc1_.height, this._avatarName, 20, this._SafeStr_4137);
        this._avatarGlow = new AvatarView.avatar_glow_png();
        this._avatarGlow.blendMode = "add";
        this._avatarGlow.visible = false;
        this._SafeStr_2965 = new AvatarView.avatar_halo_png();
        this._SafeStr_2965.blendMode = "overlay";
        this._SafeStr_2965.visible = false;
        this.addTitleField();
        this.addChild(this._SafeStr_2965);
        this.addChild(this._avatarGlow);
        this.addButtons();
    }

    private onRemovedFromStage(param1: Event): void {
    }

    private addTitleField(): void {
        if (!this._SafeStr_3395) {
            this._SafeStr_3395 = LoaderUI.createTextField("${connection.login.account.choose}", 40, 16777215, false, true, false, false, "left");
            this._SafeStr_3395.x = 0;
            this._SafeStr_3395.y = 0;
            this._SafeStr_3395.width = 500;
            this._SafeStr_3395.multiline = false;
            this._SafeStr_3395.thickness = 50;
            this.addChild(this._SafeStr_3395);
        }
    }

    public addButtons(): void {
        this._SafeStr_3902 = new ColouredButton("red", "${generic.cancel}", new Rectangle(0, 300, 0, 40), true, this.onCancel, 14211288);
        this.addChild(this._SafeStr_3902);
        this._SafeStr_2570 = new ColouredButton("gfreen", "${connection.login.play}", new Rectangle(0, 300, 0, 40), true, this.onChooseAvatar, 14211288);
        this._SafeStr_2570.active = false;
        this.addChild(this._SafeStr_2570);
    }

    public populateAvatars(param1: AvatarData[]): void {
        let _loc4_: Loader = null;
        let _loc5_: URLRequest = null;
        let _loc3_: Sprite = null;
        let _loc8_: Bitmap = null;
        let _loc2_: number = 0;
        this._avatarImages = new Array<DisplayObjectContainer>(0).fill(null);
        this._accounts = param1;
        let _loc6_: number = 0;
        for (const _loc7_ of param1 ?? []) {
            if (_loc6_ > 6) {
                break;
            }
            Logger.log("Adding avatar: " + _loc7_.name);
            _loc4_ = new Loader();
            _loc4_.name = String(_loc6_);
            _loc5_ = new URLRequest(this.getAvatarUrl(_loc7_));
            _loc4_.load(_loc5_);
            _loc4_.contentLoaderInfo.addEventListener("complete", this.avatarImageLoadCompleteHandler);
            _loc4_.contentLoaderInfo.addEventListener("error", this.onImageError);
            _loc4_.contentLoaderInfo.addEventListener("ioError", this.onImageError);
            _loc4_.contentLoaderInfo.addEventListener("securityError", this.onImageError);
            _loc3_ = new Sprite();
            this._avatarImages.push(_loc3_);
            _loc8_ = new AvatarView.placeholder_avatar();
            _loc3_.addChild(_loc8_);
            _loc3_.addChild(_loc4_);
            this.addChild(_loc3_);
            _loc3_.name = String(_loc6_);
            _loc3_.addEventListener("click", this.onAvatarClick);
            _loc2_ = (_loc6_ + 1) * this._spaceBetweenImages + _loc6_ * 100;
            _loc3_.x = _loc2_;
            _loc3_.y = 50;
            _loc6_++;
        }
        if (param1.length > 0) {
            this.updateDescription();
            this._SafeStr_3065 = 0;
            this._SafeStr_2570.active = true;
            this._avatarGlow.visible = true;
            this._SafeStr_2965.visible = true;
            this.hilightAvatar(this._avatarImages[this._SafeStr_3065]);
        } else {
            this._SafeStr_2570.active = false;
        }
    }

    private onImageError = (param1: ErrorEvent): void => {
        Logger.log("Failed to load image " + param1.text);
    };

    private onAvatarClick = (param1: MouseEvent): void => {
        this._SafeStr_3065 = param1.currentTarget.name | 0;
        this.updateDescription();
        this.hilightAvatar(this._avatarImages[this._SafeStr_3065]);
        this._SafeStr_2570.active = true;
    };

    private avatarImageLoadCompleteHandler = (param1: Event): void => {
        (asInstanceOf(param1.currentTarget, LoaderInfo)).loader.parent.removeChildAt(0);
        this._avatarGlow.visible = true;
        this._SafeStr_2965.visible = true;
        this.hilightAvatar(this._avatarImages[this._SafeStr_3065]);
    };

    private updateDescription(): void {
        if (this._accounts == null || this._accounts.length == 0) {
            return;
        }
        let _loc1_: AvatarData = this._accounts[this._SafeStr_3065];
        this._avatarName.text = _loc1_.name;
        this._SafeStr_4137.text = _loc1_.motto;
    }

    private hilightAvatar(param1: DisplayObject): void {
        let _loc2_: number = param1.x + Number(param1.width) / 2 | 0;
        let _loc3_: number = param1.y + Number(param1.height) / 2 | 0;
        this._avatarGlow.x = _loc2_ - this._avatarGlow.width / 2;
        this._avatarGlow.y = _loc3_ - this._avatarGlow.height / 2 + 15;
        this._SafeStr_2965.x = _loc2_ - this._SafeStr_2965.width / 2;
        this._SafeStr_2965.y = _loc3_ + this._SafeStr_2965.height - 40;
    }

    private getAvatarUrl(param1: AvatarData): string {
        let _loc3_: string = null;
        let _loc2_: string = this._baseUrl + "/habbo-imaging/avatarimage?user=" + param1.name;
        if (this._baseUrl.indexOf("local") > -1 || this._baseUrl.indexOf("127.0.0.1") > -1) {
            _loc3_ = "s-0.g-1.d-3.h-3.a-0";
            _loc2_ = "https://www.habbo.com/habbo-imaging/avatarimage?size=m&figure=" + param1.figure + "&direction=2";
        }
        return _loc2_;
    }

    private onCancel = (param1: Button): void => {
        this._context.showScreen(2);
    };

    private onChooseAvatar = (param1: Button): void => {
        let _loc2_: number = this._SafeStr_3065;
        this._context.loginWithAvatar(this._accounts[_loc2_]);
    };
}
