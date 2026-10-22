import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboLoadingScreen } from '@/com/sulake/habbo/IHabboLoadingScreen';
import { NativeApplication } from '@habbo-pixi/runtime/desktop/NativeApplication';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import type { Namespace } from '@habbo-pixi/runtime/xml/Namespace';
import { QName } from '@habbo-pixi/runtime/xml/QName';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibrary, AssetLibraryCollection } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HabboConfigurationManager } from '@/com/sulake/habbo/configuration/HabboConfigurationManager';
import { FakeContext } from '@/com/sulake/habbo/FakeContext';
import { HabboConfigurationCom } from '@/com/sulake/habbo/HabboConfigurationCom';
import { HabboLocalizationCom } from '@/com/sulake/habbo/HabboLocalizationCom';
import { HabboLocalizationManager } from '@/com/sulake/habbo/localization/HabboLocalizationManager';
import { Logger } from '@/com/sulake/habbo/Logger';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { PhotoSplashScreen } from '@/splash/PhotoSplashScreen';

export class HabboLoadingScreen extends Sprite implements IDisposable, IHabboLoadingScreen {
    static { registerClassName(this, 'HabboLoadingScreen'); }

    private static readonly _log: number = 28;
    public static readonly LOADING_BAR_WIDTH: number = 400;
    public static readonly LOADING_BAR_HEIGHT: number = 25;
    public static readonly LOADING_BAR_BORDER_WIDTH: number = 2;
    public static readonly LOADING_BAR_BORDER_SPACING: number = 2;
    public static readonly CONTAINER: string = "container";
    public static readonly FILE_LOADING_BAR: string = "fileLoadingBar";
    public static readonly FILE_BAR_SPRITE: string = "fileBarSprite";
    public static readonly PHOTO_SPLASH_SCREEN: string = "photoSplashScreen";
    public static readonly BACKGROUND: string = "background";
    public static readonly HABBO_LOGO: string = "habboLogo";
    public static readonly _SafeStr_7570: string = "textField";
    public static readonly VERSION_TEXT_FIELD: string = "versionTextField";
    public static readonly LOADING_NUMBER_TEXT_FIELD: string = "loadingNumberTextField";
    public static readonly ERROR_TEXT_FIELD: string = "errorTextField";

    declare private _barProgressTimer: Timer;

    private _SafeStr_3505: number = 0;

    declare private _SafeStr_5902: PhotoSplashScreen;

    private _disposed: boolean = false;
    private _SafeStr_3978: number = 0;
    private _revolvingLoadingText: string = null;

    declare private _SafeStr_3155: IContext;

    declare private _configuration: HabboConfigurationManager;

    declare private _localization: HabboLocalizationManager;

    private _SafeStr_5157: boolean = false;

    constructor(param1: number, param2: number, param3: Map<any, any>) {
        let _loc5_: Sprite = null;
        let _loc13_: Sprite = null;
        let _loc9_: any[] = null;
        super();
        this.createFakeContext(param3);
        let _loc14_: Sprite = new Sprite();
        _loc14_.name = "background";
        _loc14_.graphics.clear();
        _loc14_.graphics.beginFill(922908);
        _loc14_.graphics.drawRect(0, 0, param1, param2);
        this.addChild(_loc14_);
        this._SafeStr_5902 = new PhotoSplashScreen(this);
        this._SafeStr_5902.name = "photoSplashScreen";
        this.addChild(this._SafeStr_5902);
        _loc5_ = new Sprite();
        _loc5_.name = "fileLoadingBar";
        _loc5_.graphics.lineStyle(1, 16777215, 1, true);
        _loc5_.graphics.beginFill(2500143);
        _loc5_.graphics.drawRect(1, 0, 400 - 1, 0);
        _loc5_.graphics.drawRect(400, 1, 0, 25 - 1);
        _loc5_.graphics.drawRect(1, 25, 400 - 1, 0);
        _loc5_.graphics.drawRect(0, 1, 0, 25 - 1);
        _loc5_.graphics.endFill();
        this.addChild(_loc5_);
        let _loc10_: string = this._localization.getLocalization("client.starting.revolving");
        let _loc4_: string = this._localization.getLocalization("client.starting");
        let _loc11_: string = null;
        if (_loc10_ != null) {
            _loc9_ = _loc10_.split("/");
            this._SafeStr_3978 = this.randomNumber(0, _loc9_.length - 1) | 0;
            this._revolvingLoadingText = _loc10_;
            _loc11_ = stringOrNull(_loc9_[this._SafeStr_3978]);
        } else {
            _loc11_ = _loc4_;
        }
        let _loc6_: TextField = LoaderUI.createTextField(_loc11_, 28, 16777215, true, false, false, false, "center");
        _loc6_.name = "textField";
        this.addChild(_loc6_);
        let _loc7_: TextField = LoaderUI.createTextField("0%", 14, 10066329, true, false, false, false, "center");
        _loc7_.name = "loadingNumberTextField";
        this.addChild(_loc7_);
        _loc13_ = new Sprite();
        _loc13_.name = "fileBarSprite";
        _loc5_.addChild(_loc13_);
        _loc5_.visible = true;
        let _loc12_: XML = NativeApplication.nativeApplication.applicationDescriptor;
        let _loc8_: Namespace = _loc12_.namespace();
        let _loc16_: string = _loc12_.child(new QName(_loc8_, "versionNumber")).toString();
        let _loc15_: TextField = LoaderUI.createTextField(_loc16_, 12, 10066329, true, false, false, false, "right");
        _loc15_.name = "versionTextField";
        this.addChild(_loc15_);
        this.addEventListener("addedToStage", this.onAddedToStage);
    }

    private createFakeContext(param1: Map<any, any>): void {
        this._SafeStr_3155 = new FakeContext(param1);
        let _loc3_: XML = new XML(`<manifest><library /></manifest>`);
        let _loc2_: IAssetLibrary = new AssetLibrary("_assetsTemp@", _loc3_);
        (asInstanceOf(this._SafeStr_3155.assets, AssetLibraryCollection)).addAssetLibrary(_loc2_);
        this._configuration = this.createConfiguration(this._SafeStr_3155);
        this._localization = this.createLocalization(this._SafeStr_3155);
        this._localization.loadDefaultEmbedLocalizations(this._configuration.getProperty("environment.id"));
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

    private onRemovedFromStage = (param1: Event): void => {
        Logger.log("Habbo Loading Screen was removed from stage.");
    };

    private onAddedToStage = (param1: Event): void => {
        this.removeEventListener("addedToStage", this.onAddedToStage);
        this.stage.addEventListener("resize", this.onResize);
        this.positionLoadingScreenDisplayElements();
        this._barProgressTimer = new Timer(750);
        this._barProgressTimer.addEventListener("timer", this.onBarProgressEvent);
        this._barProgressTimer.start();
    };

    private onResize = (param1: Event): void => {
        this.positionLoadingScreenDisplayElements();
    };

    private onBarProgressEvent = (param1: Event): void => {
        let _loc4_: any[] = null;
        let _loc2_: TextField = null;
        let _loc3_: TextField = null;
        if (this._SafeStr_3505 == 100) {
            if (this._SafeStr_5157) {
                _loc4_ = this._revolvingLoadingText.split("/");
                _loc2_ = asInstanceOf(this.getChildByName("textField"), TextField);
                if (_loc2_ != null) {
                    this.removeElement("textField");
                    _loc3_ = LoaderUI.createTextField(stringOrNull(_loc4_[this._SafeStr_3978]), 28, 16777215, true, false, false, false, "center");
                    _loc3_.x = (this.width - _loc3_.width) / 2;
                    _loc3_.y = _loc2_.y;
                    _loc3_.name = "textField";
                    this.addChild(_loc3_);
                }
                this._SafeStr_5157 = false;
            }
            this._SafeStr_3505 = 0;
        } else {
            this._SafeStr_3505 = this._SafeStr_3505 + Math.min(this.randomNumber(35, Math.min(this.randomNumber(45, 55))), 100 - this._SafeStr_3505) | 0;
        }
        if (this._SafeStr_3505 == 100 && this._revolvingLoadingText != null) {
            this._SafeStr_5157 = true;
            this._SafeStr_3978 = (this._SafeStr_3978 + 1) % (this._revolvingLoadingText.split("/").length - 1);
        }
        this.updateLoadingBarProgression(this._SafeStr_3505 / 100);
    };

    private randomNumber(param1: number, param2: number): number {
        return Math.floor(Math.random() * (param2 - param1 + 1)) + param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private removeElement(param1: string): void {
        let _loc2_: DisplayObject = this.getChildByName(param1);
        if (_loc2_ != null) {
            this.removeChild(_loc2_);
        }
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (this.disposed) {
            return;
        }
        this._disposed = true;
        _loc1_ = _loc1_;
        if (_loc1_ != null) {
            _loc1_.removeEventListener("resize", this.onResize);
        }
        this.removeEventListener("addedToStage", this.onAddedToStage);
        this.removeEventListener("removedFromStage", this.onRemovedFromStage);
        this.removeElement("photoSplashScreen");
        this.removeElement("background");
        this.removeElement("textField");
        this.removeElement("habboLogo");
        this.removeElement("fileLoadingBar");
        this.removeElement("errorTextField");
        this.removeElement("container");
        if (this._barProgressTimer != null) {
            this._barProgressTimer.stop();
            this._barProgressTimer.removeEventListener("timer", this.onBarProgressEvent);
            this._barProgressTimer = null;
        }
        if (this._SafeStr_3155) {
            this._SafeStr_3155.dispose();
            this._SafeStr_3155 = null;
        }
        if (this._localization) {
            this._localization.dispose();
            this._localization = null;
        }
        if (this._configuration) {
            this._configuration.dispose();
            this._configuration = null;
        }
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    public positionLoadingScreenDisplayElements(): void {
        let _loc12_: number = 0;
        let _loc15_: number = 0;
        let _loc9_: Stage = this.stage;
        if (_loc9_ != null) {
            _loc12_ = _loc9_.stageWidth;
            _loc15_ = _loc9_.stageHeight;
        } else {
            _loc12_ = this.width | 0;
            _loc15_ = this.height | 0;
        }
        let _loc10_: Sprite = asInstanceOf(this.getChildByName("background"), Sprite);
        if (_loc10_ != null) {
            _loc10_.x = 0;
            _loc10_.y = 0;
            _loc10_.graphics.clear();
            _loc10_.graphics.beginFill(922908);
            _loc10_.graphics.drawRect(0, 0, _loc12_, _loc15_);
        }
        let _loc16_: number = 0;
        let _loc7_: number = 0;
        let _loc13_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 10;
        let _loc8_: Sprite = asInstanceOf(this.getChildByName("photoSplashScreen"), Sprite);
        if (_loc8_ != null) {
            _loc8_.x = (_loc12_ - _loc8_.width) / 2;
            _loc2_ = _loc8_.y + _loc8_.height | 0;
        }
        let _loc6_: TextField = asInstanceOf(this.getChildByName("textField"), TextField);
        if (_loc6_ != null) {
            _loc6_.x = (_loc12_ - _loc6_.width) / 2;
            if (_loc6_.width > _loc13_) {
                _loc13_ = _loc6_.width | 0;
                _loc16_ = _loc6_.x | 0;
            }
        }
        let _loc3_: TextField = asInstanceOf(this.getChildByName("versionTextField"), TextField);
        if (_loc3_ != null) {
            _loc3_.x = _loc12_ - _loc3_.width;
            _loc3_.y = 0;
        }
        let _loc14_: Sprite = asInstanceOf(this.getChildByName("fileLoadingBar"), Sprite);
        if (_loc14_ != null) {
            _loc14_.x = (_loc12_ - _loc14_.width) / 2;
            _loc14_.y = _loc2_;
            _loc2_ = _loc14_.y + _loc14_.height | 0;
            if (_loc14_.width > _loc13_) {
                _loc13_ = _loc14_.width | 0;
                _loc16_ = _loc14_.x | 0;
            }
        }
        let _loc11_: TextField = asInstanceOf(this.getChildByName("loadingNumberTextField"), TextField);
        if (_loc11_ != null) {
            _loc11_.x = (_loc12_ - _loc11_.width) / 2;
            if (_loc11_.width > _loc13_) {
                _loc13_ = _loc11_.width | 0;
                _loc16_ = _loc11_.x | 0;
            }
        }
        let _loc1_: TextField = asInstanceOf(this.getChildByName("errorTextField"), TextField);
        if (_loc1_ != null) {
            _loc1_.x = (_loc12_ - _loc1_.width) / 2;
            if (_loc1_.width > _loc13_) {
                _loc13_ = _loc1_.width | 0;
                _loc16_ = _loc1_.x | 0;
            }
        }
        _loc2_ = (_loc15_ - _loc2_) / 2 | 0;
        _loc2_ -= _loc4_ * 2;
        if (_loc8_ != null) {
            _loc8_.y = _loc2_;
            _loc2_ = _loc8_.y + _loc8_.height | 0;
        }
        if (_loc6_ != null) {
            _loc6_.y = _loc2_ + 50;
            _loc2_ = _loc6_.y + _loc6_.height + _loc4_ | 0;
        }
        if (_loc14_ != null) {
            _loc14_.y = _loc2_;
            _loc2_ = _loc14_.y + _loc14_.height + _loc4_ / 2 | 0;
        }
        if (_loc11_ != null) {
            _loc11_.y = _loc2_;
            _loc2_ = _loc11_.y + _loc11_.height + _loc4_ | 0;
        }
        if (_loc1_ != null) {
            _loc1_.y = _loc2_;
        }
    }

    public updateLoadingBarProgression(param1: number): void {
        let _loc6_: number = 400;
        let _loc9_: number = 25;
        let _loc5_: number = 2;
        let _loc3_: number = 2;
        let _loc8_: Sprite = asInstanceOf(this.getChildByName("fileLoadingBar"), Sprite);
        if (_loc8_ == null) {
            return;
        }
        let _loc7_: Sprite = asInstanceOf(_loc8_.getChildByName("fileBarSprite"), Sprite);
        if (_loc7_ == null) {
            return;
        }
        _loc7_.x = _loc5_ + _loc3_;
        _loc7_.y = _loc5_ + _loc3_;
        _loc7_.graphics.clear();
        let _loc4_: number = _loc9_ - _loc5_ * 2 - _loc3_ * 2;
        let _loc2_: number = (_loc6_ - _loc5_ * 2 - _loc3_ * 2) * param1 | 0;
        _loc7_.graphics.beginFill(0);
        _loc7_.graphics.drawRect(-1, -1, _loc6_ - _loc5_ * 2, _loc9_ - _loc3_ * 2);
        _loc7_.graphics.endFill();
        _loc7_.graphics.beginFill(12241619);
        _loc7_.graphics.drawRect(0, 0, _loc2_, _loc4_ / 2);
        _loc7_.graphics.endFill();
        _loc7_.graphics.beginFill(9216429);
        _loc7_.graphics.drawRect(0, _loc4_ / 2, _loc2_, _loc4_ / 2 + 1);
        _loc7_.graphics.endFill();
    }

    public updateLoadingBar(param1: number): void {
        let _loc2_: TextField = asInstanceOf(this.getChildByName("loadingNumberTextField"), TextField);
        if (_loc2_ != null) {
            _loc2_.text = Math.round(param1 * 100) + "%";
        }
    }

    public showError(param1: string): void {
        if (this._barProgressTimer != null) {
            this._barProgressTimer.stop();
            this._barProgressTimer.removeEventListener("timer", this.onBarProgressEvent);
            this._barProgressTimer = null;
        }
        let _loc2_: TextField = asInstanceOf(this.getChildByName("textField"), TextField);
        if (_loc2_ != null) {
            _loc2_.htmlText = "${client.loading.failed}";
            if (_loc2_.text == "" || _loc2_.text == "client.loading.failed" || _loc2_.text == "${client.loading.failed}") {
                _loc2_.text = "Loading failed";
            }
            _loc2_.width = _loc2_.textWidth + 6;
            _loc2_.height = _loc2_.textHeight + 6;
        }
        let _loc5_: TextField = asInstanceOf(this.getChildByName("loadingNumberTextField"), TextField);
        if (_loc5_ != null) {
            _loc5_.text = "";
        }
        let _loc3_: TextField = asInstanceOf(this.getChildByName("errorTextField"), TextField);
        if (_loc3_ == null) {
            _loc3_ = LoaderUI.createTextField("", 16, 8309486, false, true, false, false, "center");
            _loc3_.name = "errorTextField";
            this.addChild(_loc3_);
        }
        let _loc4_: number = (this.stage != null ? this.stage.stageWidth : this.width) | 0;
        _loc3_.autoSize = "none";
        _loc3_.multiline = true;
        _loc3_.wordWrap = true;
        _loc3_.width = Math.max(320, Math.min(_loc4_ - 80, 760));
        _loc3_.text = param1;
        _loc3_.height = _loc3_.textHeight + 10;
        this.positionLoadingScreenDisplayElements();
    }

    get [IDisposable](): true {
        return true;
    }
}
