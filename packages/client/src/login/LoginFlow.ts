import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedFont } from '@habbo-pixi/runtime/embed/embed';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { AvatarData } from '@/com/sulake/habbo/communication/login/AvatarData';
import type { ICaptchaView } from '@/com/sulake/habbo/communication/login/ICaptchaView';
import type { ILoginProvider } from '@/com/sulake/habbo/communication/login/ILoginProvider';
import type { ILoginViewer } from '@/com/sulake/habbo/communication/login/ILoginViewer';
import type { SsoTokenAvailableEvent } from '@/com/sulake/habbo/communication/login/SsoTokenAvailableEvent';
import type { ILoginContext } from '@/login/ILoginContext';
import type { ImageLoaderEvent } from '@/login/ImageLoaderEvent';
import type { Button } from '@/onBoardingHcUi/Button';
import type { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { Loader } from '@habbo-pixi/runtime/display/Loader';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibrary, AssetLibraryCollection } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HabboCommunicationManager } from '@/com/sulake/habbo/communication/HabboCommunicationManager';
import { WebApiLoginProvider } from '@/com/sulake/habbo/communication/login/WebApiLoginProvider';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { HabboConfigurationManager } from '@/com/sulake/habbo/configuration/HabboConfigurationManager';
import { FakeContext } from '@/com/sulake/habbo/FakeContext';
import { HabboCommunicationCom } from '@/com/sulake/habbo/HabboCommunicationCom';
import { HabboConfigurationCom } from '@/com/sulake/habbo/HabboConfigurationCom';
import { HabboLocalizationCom } from '@/com/sulake/habbo/HabboLocalizationCom';
import { HabboLocalizationManager } from '@/com/sulake/habbo/localization/HabboLocalizationManager';
import { TweenUtils } from '@/com/sulake/habbo/utils/animation/TweenUtils';
import { CommunicationUtils } from '@/com/sulake/habbo/utils/CommunicationUtils';
import { SimpleLogger } from '@/debug/SimpleLogger';
import { AvatarView } from '@/login/AvatarView';
import { Background } from '@/login/Background';
import { EnvironmentView } from '@/login/EnvironmentView';
import { ImageLoader } from '@/login/ImageLoader';
import { LoginView } from '@/login/LoginView';
import { SsoTokenView } from '@/login/SsoTokenView';
import { WebCaptchaView } from '@/login/WebCaptchaView';
import { ColouredButton } from '@/onBoardingHcUi/ColouredButton';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { LocalizedSprite } from '@/onBoardingHcUi/LocalizedSprite.group';
import { LocalizedTextField } from '@/onBoardingHcUi/LocalizedTextField';

const LoginFlow_ubuntu_regular_ttfAsset = embedFont("shared/LoginFlow_ubuntu_regular.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_ttfAsset = embedFont("shared/ubuntu_bold.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_italic_ttfAsset = embedFont("shared/ubuntu_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_italic_ttfAsset = embedFont("shared/ubuntu_bold_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const habbo_logo_png_pngAsset = embedBitmap("shared/habbo_logo_png.png");

export class LoginFlow extends Sprite implements ILoginContext, IDisposable, ILoginViewer {
    static { registerClassName(this, 'login::LoginFlow'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        LoginFlow.#initStatics();
        return LoginFlow._log;
    }

    public static readonly LOGIN_FLOW_FINISHED_EVENT: string = "LOGIN_FLOW_FINISHED_EVENT";
    private static readonly ERROR_TYPE_IO_ERROR: string = "ioError";
    private static readonly LOGO_AREA_HEIGHT: number = 50;
    private static readonly MAIN_AREA_MARGIN: number = 5;
    public static readonly SCREEN_ENVIRONMENT: number = 1;
    public static readonly SCREEN_LOGIN: number = 2;
    public static readonly SCREEN_AVATARS: number = 3;
    public static readonly SCREEN_SSO_TOKEN: number = 4;

    public static ubuntu_regular = LoginFlow_ubuntu_regular_ttfAsset;

    public static ubuntu_bold = ubuntu_bold_ttfAsset;

    public static ubuntu_italic = ubuntu_italic_ttfAsset;

    public static ubuntu_bold_italic = ubuntu_bold_italic_ttfAsset;

    private static readonly habbo_logo_png = habbo_logo_png_pngAsset;

    declare private _background: Background;

    declare private _SafeStr_2939: Sprite;

    declare private _SafeStr_3592: EnvironmentView;

    declare private _loginView: LoginView;

    declare private _SafeStr_5306: SsoTokenView;

    declare private _SafeStr_4135: AvatarView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_3155: IContext;

    declare private _SafeStr_2358: Sprite;

    declare private _mainSprite: Sprite;

    declare private _SafeStr_5414: Sprite;

    declare private _configuration: HabboConfigurationManager;

    declare private _communication: HabboCommunicationManager;

    declare private _localization: HabboLocalizationManager;

    declare private _SafeStr_3245: ILoginProvider;

    declare private _ssoToken: string;

    declare private _SafeStr_2511: ColouredButton;

    declare private _SafeStr_3428: Loader;

    declare private _SafeStr_3218: Loader;

    declare private _lastFrameTime: number;
    static { (this.prototype as any)._lastFrameTime = 0; }

    constructor(param1: Map<any, any>) {
        super();
        this.createFakeContext(param1);
    }

    public get ssoToken(): string {
        return this._ssoToken;
    }

    public dispose(): void {
        this.removeEventListener("enterFrame", this.onEnterFrame);
        if (this._disposed) {
            return;
        }
        if (this._SafeStr_3155) {
            this._SafeStr_3155.dispose();
            this._SafeStr_3155 = null;
        }
        if (this._background) {
            this.removeChild(this._background);
            this._background.dispose();
            this._background = null;
        }
        if (this._mainSprite != null) {
            this.removeChild(this._mainSprite);
            this._mainSprite = null;
        }
        this.hideViews();
        this._SafeStr_3592.dispose();
        this._loginView.dispose();
        this._SafeStr_4135.dispose();
        this._SafeStr_5306.dispose();
        this._SafeStr_3245 = null;
        this.stage.removeChild(this);
        this._disposed = true;
        LocalizedSprite.localizationManager = null;
        LocalizedTextField.localizationManager = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private createConfiguration(param1: IContext): HabboConfigurationManager {
        let _loc5_: XML = new XML(`<manifest><library /></manifest>`);
        let _loc2_: ByteArray = asInstanceOf(new HabboConfigurationCom.manifest(), ByteArray);
        let _loc3_: XML = new XML(_loc2_.readUTFBytes(_loc2_.length));
        _loc5_.child("library").appendChild(_loc3_.child("component").child("assets"));
        let _loc4_: IAssetLibrary = new AssetLibrary("_assetsConfiguration@");
        _loc4_.loadFromResource(_loc5_, HabboConfigurationCom);
        return new HabboConfigurationManager(param1, 0, _loc4_);
    }

    private createLocalization(param1: IContext): HabboLocalizationManager {
        let _loc5_: XML = new XML(`<manifest><library /></manifest>`);
        let _loc2_: ByteArray = asInstanceOf(new HabboLocalizationCom.manifest(), ByteArray);
        let _loc3_: XML = new XML(_loc2_.readUTFBytes(_loc2_.length));
        _loc5_.child("library").appendChild(_loc3_.child("component").child("assets"));
        let _loc4_: IAssetLibrary = new AssetLibrary("_assetsLocalization@");
        _loc4_.loadFromResource(_loc5_, HabboLocalizationCom);
        return new HabboLocalizationManager(param1, 0, _loc4_);
    }

    private createCommunication(param1: IContext): HabboCommunicationManager {
        let _loc3_: ByteArray = asInstanceOf(new HabboCommunicationCom.manifest(), ByteArray);
        let _loc4_: XML = new XML(_loc3_.readUTFBytes(_loc3_.length));
        let _loc2_: XML = new XML(`<manifest><library /></manifest>`);
        _loc2_.child("library").appendChild(_loc4_.child("component").child("assets"));
        let _loc5_: IAssetLibrary = new AssetLibrary("_assetsTemp@", _loc2_);
        _loc5_.loadFromResource(_loc2_, HabboCommunicationCom);
        return new HabboCommunicationManager(param1, 0, _loc5_);
    }

    private createFakeContext(param1: Map<any, any>): void {
        this._SafeStr_3155 = new FakeContext(param1);
        let _loc3_: XML = new XML(`<manifest><library /></manifest>`);
        let _loc2_: IAssetLibrary = new AssetLibrary("_assetsTemp@", _loc3_);
        (asInstanceOf(this._SafeStr_3155.assets, AssetLibraryCollection)).addAssetLibrary(_loc2_);
        this._configuration = this.createConfiguration(this._SafeStr_3155);
        this._localization = this.createLocalization(this._SafeStr_3155);
        this._communication = this.createCommunication(this._SafeStr_3155);
        LocalizedSprite.localizationManager = this._localization;
        LocalizedTextField.localizationManager = this._localization;
        this._localization.loadDefaultEmbedLocalizations(this._configuration.getProperty(HabboProperty.ENVIRONMENT_ID));
        this._SafeStr_3245 = new WebApiLoginProvider(this);
        this._SafeStr_3245.addEventListener("SSO_TOKEN_AVAILABLE", this.onSsoTokenAvailable);
    }

    private onSsoTokenAvailable = (param1: SsoTokenAvailableEvent): void => {
        this._ssoToken = param1.ssoToken;
        this.dispatchEvent(new Event(LoginFlow.LOGIN_FLOW_FINISHED_EVENT));
    };

    public initLoginWithSsoToken(param1: string, param2: string): void {
        this.updateEnvironment(param1, false);
        this._ssoToken = param2;
        this.dispatchEvent(new Event(LoginFlow.LOGIN_FLOW_FINISHED_EVENT));
    }

    public init(): void {
        this.stage.addEventListener("resize", this.onStageResize);
        this._background = new Background();
        this.addChild(this._background);
        this._SafeStr_3428 = new Loader();
        this._SafeStr_3428.visible = false;
        this._SafeStr_3428.alpha = 0;
        this.addChild(this._SafeStr_3428);
        this._SafeStr_3218 = new Loader();
        this._SafeStr_3218.visible = false;
        this._SafeStr_3218.alpha = 0;
        this.addChild(this._SafeStr_3218);
        this._SafeStr_5414 = new Sprite();
        this.addChild(this._SafeStr_5414);
        let _loc1_: Bitmap = new LoginFlow.habbo_logo_png();
        _loc1_.x = 40;
        _loc1_.y = 40;
        this._SafeStr_5414.addChild(_loc1_);
        this._mainSprite = new Sprite();
        this.addChild(this._mainSprite);
        this._mainSprite.y = 50;
        this._mainSprite.x = 5;
        this._SafeStr_2939 = new Sprite();
        this._SafeStr_2939.x = 0;
        this._SafeStr_2939.y = 50;
        this._SafeStr_2939.visible = true;
        this._mainSprite.addChild(this._SafeStr_2939);
        this._SafeStr_3592 = new EnvironmentView(this);
        this._loginView = new LoginView(this);
        this._SafeStr_4135 = new AvatarView(this);
        this._SafeStr_5306 = new SsoTokenView(this);
        this._SafeStr_2511 = new ColouredButton("red", "X", new Rectangle(0, 0, 0, 40), true, this.onClose, 14211288);
        this._SafeStr_3592.init();
        this.loadImages();
        this.showScreen(4);
        this.layoutMainElements();
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.addEventListener("enterFrame", this.onEnterFrame);
    }

    private loadImages(): void {
        ImageLoader.CreateLoader(this._SafeStr_3218, this.getProperty("landing.view.background_right.uri"), this.onImageComplete);
        ImageLoader.CreateLoader(this._SafeStr_3428, this.getProperty("landing.view.background_left.uri"), this.onImageComplete);
    }

    private onImageComplete = (param1: ImageLoaderEvent): void => {
        LoginFlow._log.info("Image complete: " + param1.url);
        param1.loader.visible = true;
        TweenUtils.alphaTweenVisible(param1.loader, 0, 1.2);
        this.layoutMainElements();
    };

    private onAddedToStage = (param1: Event): void => {
        this.removeEventListener("addedToStage", this.onAddedToStage);
        this._lastFrameTime = getTimer();
        this.layoutMainElements();
    };

    private onEnterFrame = (param1: Event): void => {
        TweenUtils._SafeStr_4376.advanceTime((getTimer() - this._lastFrameTime) / 1000);
        this._lastFrameTime = getTimer();
    };

    private onStageResize = (param1: Event): void => {
        if (this.disposed) {
            return;
        }
        this.layoutMainElements();
    };

    private layoutMainElements(): void {
        let _loc2_: number = 0;
        if (this.disposed) {
            return;
        }
        if (this._disposed) {
            return;
        }
        if (this._background != null) {
            this._background.resize();
        }
        let _loc1_: number = this._mainSprite.width + 20 | 0;
        if (this.stage.stageWidth > _loc1_) {
            _loc2_ = (this.stage.stageWidth - _loc1_) / 2 | 0;
            if (_loc2_ < 5) {
                _loc2_ = 5;
            }
            this._mainSprite.x = _loc2_;
        } else {
            this._mainSprite.x = 5;
        }
        this._mainSprite.y = 50;
        this._SafeStr_2511.y = 30;
        this._SafeStr_2511.x = this.stage.stageWidth - this._SafeStr_2511.width - 30;
        this._SafeStr_3218.x = Math.max(400, this.stage.stageWidth - this._SafeStr_3218.width + 50);
        this._SafeStr_3218.y = this.stage.stageHeight - this._SafeStr_3218.height + 50;
        this._SafeStr_3428.x = -50;
        this._SafeStr_3428.y = this.stage.stageHeight - this._SafeStr_3428.height + 50;
    }

    public showErrorMessage(param1: string): void {
        let _loc4_: TextField = null;
        let _loc3_: Bitmap = null;
        if (this._SafeStr_2358 == null) {
            _loc4_ = LoaderUI.createTextField(param1, 12, 16777215, true);
            LoaderUI.addEtching(_loc4_, true);
            _loc3_ = LoaderUI.createBalloon(_loc4_.width + 30 | 0, _loc4_.height + 17 | 0, -1, true, 11411485, "down");
            this._SafeStr_2358 = new Sprite();
            this._SafeStr_2358.addChild(_loc3_);
            this._SafeStr_2358.addChild(_loc4_);
            _loc4_.x = 15;
            _loc4_.y = 14;
            this._mainSprite.addChild(this._SafeStr_2358);
            this._SafeStr_2358.x = 300;
            this._SafeStr_2358.y = 300;
            this._SafeStr_2358.filters = [new GlowFilter(0, 0.24, 6, 6)];
        }
        let _loc2_: Timer = new Timer(3000, 1);
        _loc2_.addEventListener("timerComplete", this.onHideError);
        _loc2_.start();
        this._SafeStr_2358.visible = true;
    }

    private onHideError = (param1: TimerEvent): void => {
        if (this._SafeStr_2358) {
            this._SafeStr_2358.visible = false;
        }
    };

    public editorFinished(): void {
        this.dispatchEvent(new Event(LoginFlow.LOGIN_FLOW_FINISHED_EVENT));
    }

    public showScreen(param1: number): void {
        this.hideViews();
        let _loc2_: string = "";
        let _loc3_: string = "";
        switch (param1 - 1) {
            case 0:
                this._SafeStr_2939.addChild(this._SafeStr_3592);
                this._SafeStr_3592.init();
                break;
            case 1:
                this._SafeStr_2939.addChild(this._loginView);
                this._loginView.init();
                this._SafeStr_3245.init(this._communication);
                break;
            case 2:
                this._SafeStr_2939.addChild(this._SafeStr_4135);
                this._SafeStr_4135.init();
                this._SafeStr_4135.baseUrl = this.getProperty(HabboProperty.WEB_API);
                this.layoutMainElements();
                break;
            case 3:
                this._SafeStr_2939.addChild(this._SafeStr_5306);
                this._SafeStr_5306.init();
        }
        this.layoutMainElements();
    }

    public get debugText(): TextField {
        return null;
    }

    private hideViews(): void {
        while (this._SafeStr_2939.numChildren > 0) {
            this._SafeStr_2939.removeChildAt(0);
        }
    }

    public initLogin(param1: string, param2: string): void {
        this._SafeStr_3245.loginWithCredentials(param1, param2);
    }

    public loginWithAvatar(param1: AvatarData): void {
        this._SafeStr_3245.loginWithCredentialsWeb(param1.uniqueId);
    }

    public showLoginScreen(): void {
    }

    public showRegistrationError(param1: any): void {
        this.showError(param1);
    }

    public showInvalidLoginError(param1: any): void {
        this.showError(param1);
    }

    public nameCheckResponse(param1: any, param2: boolean): void {
    }

    public showAccountError(param1: any): void {
        this.showError(param1);
    }

    public showLoadingScreen(): void {
    }

    public saveLooksError(param1: any): void {
        this.showError(param1);
    }

    public showTOS(): void {
        this.showErrorMessage("Need to show TOS");
    }

    public environmentReady(): void {
        this._loginView.ready();
    }

    public populateCharacterList(param1: AvatarData[]): void {
        this.showScreen(3);
        this._SafeStr_4135.populateAvatars(param1);
    }

    public showSelectAvatar(param1: any): void {
    }

    public showPromoHabbos(param1: XML): void {
    }

    public showSelectRoom(): void {
    }

    public showCaptchaError(): void {
        this.showScreen(2);
        this.showErrorMessage("Error with captcha");
    }

    private showError(param1: any): void {
        let _loc3_: string = null;
        let _loc4_: any[] = param1.errors;
        let _loc2_: string = stringOrNull(_loc4_ && _loc4_.length > 0 ? _loc4_[0] : "");
        if (_loc2_ == "" && param1 != null) {
            if (param1.error != null) {
                _loc2_ = stringOrNull(param1.error);
            } else if (param1.message != null) {
                _loc2_ = stringOrNull(param1.message);
            }
        }
        switch (_loc2_) {
            case "invalid-captcha":
                this.showCaptchaError();
                break;
            case "login.user_banned":
                _loc3_ = "connection.login.error.banned.desc";
                break;
            case "login.blocked":
                _loc3_ = "connection.login.error.blocked.desc";
                break;
            case "unauthorized-staff-login":
                _loc3_ = "connection.login.error.unauthorized.staff";
                break;
            case "pocket.auth.login_failed":
                _loc3_ = "connection.login.error.-3.desc";
                break;
            case "pocket.auth.no_avatars":
                _loc3_ = "connection.login.missing_avatars";
                break;
            case "pocket.auth.valid_email_required":
                _loc3_ = "connection.login.missing_credentials";
                break;
            case "pocket.auth.password_required":
                _loc3_ = "connection.login.missing_credentials";
                break;
            case "pocket.auth.facebook_disabled":
                _loc3_ = "connection.login.error.facebook_disabled.desc";
                break;
            case "pocket.auth.facebook_not_connected":
                break;
            case "pocket.auth.access_token_required":
                _loc3_ = "connection.login.error.facebook_accesstoken.desc";
                break;
            case "ioError":
                _loc3_ = "connection.login.error.-400.desc";
                break;
            case "account_issue":
                _loc3_ = "generic.error";
                break;
            default:
                _loc3_ = "generic.error";
        }
        if (_loc3_ && _loc3_.length > 0) {
            this.showErrorMessage(this._localization.getLocalization(_loc3_));
        }
    }

    public getProperty(param1: string, param2: Map<any, any> = null): string {
        let _loc3_: string = this._configuration ? this._configuration.getProperty(param1, param2) : "";
        if (!_loc3_ || _loc3_.length == 0) {
            LoginFlow._log.info("Add property: " + param1);
        }
        return _loc3_;
    }

    public createCaptchaView(): ICaptchaView {
        this.addChild(this._SafeStr_2511);
        let _loc1_: WebCaptchaView = new WebCaptchaView(this._SafeStr_3245 instanceof WebApiLoginProvider ? this._SafeStr_3245 : null);
        this.addChild(_loc1_);
        this.layoutMainElements();
        return _loc1_;
    }

    public captchaReady(): void {
        this.removeChild(this._SafeStr_2511);
        this.showScreen(2);
    }

    private onClose = (param1: Button): void => {
        this.removeChild(this._SafeStr_2511);
        this._SafeStr_3245.closeCaptcha();
        this.showScreen(2);
    };

    public updateEnvironment(param1: string, param2: boolean): void {
        if (param2) {
            this._localization.loadDefaultEmbedLocalizations(param1);
            return;
        }
        CommunicationUtils.writeSOLProperty("environment", param1);
        this._configuration.updateEnvironmentId(param1);
        if (this._SafeStr_3592) {
            this._SafeStr_3592.updateEnvironment();
        }
        this._localization.loadDefaultEmbedLocalizations(this._configuration.getProperty(HabboProperty.ENVIRONMENT_ID));
        LoginFlow._log.info("updated environment to: " + param1);
        this._communication.updateHostParameters();
        this._localization.requestLocalizationInit();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (LoginFlow.#staticsReady) return;
        LoginFlow.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(LoginFlow, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("login.LoginFlow"));
    }

    get [IDisposable](): true {
        return true;
    }
}
