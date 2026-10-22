import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IHabboLoadingScreen } from '@/com/sulake/habbo/IHabboLoadingScreen';
import { NativeApplication } from '@habbo-pixi/runtime/desktop/NativeApplication';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFieldAutoSize } from '@habbo-pixi/runtime/text/TextFieldAutoSize';
import { TextFormatAlign } from '@habbo-pixi/runtime/text/TextFormatAlign';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import type { Namespace } from '@habbo-pixi/runtime/xml/Namespace';
import { QName } from '@habbo-pixi/runtime/xml/QName';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibrary, AssetLibraryCollection } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { HabboConfigurationManager } from '@/com/sulake/habbo/configuration/HabboConfigurationManager';
import { FakeContext } from '@/com/sulake/habbo/FakeContext';
import { HabboConfigurationCom } from '@/com/sulake/habbo/HabboConfigurationCom';
import { HabboLocalizationCom } from '@/com/sulake/habbo/HabboLocalizationCom';
import { HabboLocalizationManager } from '@/com/sulake/habbo/localization/HabboLocalizationManager';
import { SimpleLogger } from '@/debug/SimpleLogger';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';
import { PhotoSplashScreen } from '@/splash/PhotoSplashScreen';

export class HabboLoadingScreen extends Sprite implements IDisposable, IHabboLoadingScreen {
    static { registerClassName(this, 'HabboLoadingScreen'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HabboLoadingScreen.#initStatics();
        return HabboLoadingScreen._log;
    }

    private static readonly TITLE_FONT_SIZE: number = 28;
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
    public static readonly TEXT_FIELD: string = "textField";
    public static readonly VERSION_TEXT_FIELD: string = "versionTextField";
    public static readonly LOADING_NUMBER_TEXT_FIELD: string = "loadingNumberTextField";
    public static readonly ERROR_TEXT_FIELD: string = "errorTextField";
    private static readonly BACKGROUND_COLOR: number = 0x0E151C;
    private static readonly BAR_BORDER_COLOR: number = 0xFFFFFF;
    private static readonly BAR_FILL_COLOR: number = 0x26262F;
    private static readonly BAR_GRADIENT_TOP_COLOR: number = 0xBACAD3;
    private static readonly BAR_GRADIENT_BOTTOM_COLOR: number = 0x8CA1AD;
    private static readonly DIM_TEXT_COLOR: number = 0x999999;
    private static readonly ERROR_TEXT_COLOR: number = 0x7ECAEE;
    private static readonly PROGRESS_FONT_SIZE: number = 14;
    private static readonly VERSION_FONT_SIZE: number = 12;
    private static readonly ERROR_FONT_SIZE: number = 16;
    private static readonly BAR_PROGRESS_INTERVAL_MS: number = 750;
    private static readonly ELEMENT_SPACING: number = 10;
    private static readonly TITLE_TOP_MARGIN: number = 50;
    private static readonly TEXT_PADDING: number = 6;
    private static readonly ERROR_TEXT_PADDING: number = 10;
    private static readonly ERROR_MIN_WIDTH: number = 320;
    private static readonly ERROR_MAX_WIDTH: number = 760;
    private static readonly ERROR_STAGE_MARGIN: number = 80;
    private static readonly PROGRESS_COMPLETE: number = 100;
    private static readonly PROGRESS_STEP_MIN: number = 35;
    private static readonly PROGRESS_STEP_CAP_MIN: number = 45;
    private static readonly PROGRESS_STEP_CAP_MAX: number = 55;
    private static readonly REVOLVING_TEXT_SEPARATOR: string = "/";
    private static readonly LOCALIZATION_STARTING: string = "client.starting";
    private static readonly LOCALIZATION_STARTING_REVOLVING: string = "client.starting.revolving";

    private static readonly LOADING_FAILED_TEXT: string = "${client.loading.failed}";

    declare private _barProgressTimer: Timer;

    private _progressPercent: number = 0;

    declare private _photoSplashScreen: PhotoSplashScreen;

    private _revolvingTextIndex: number = 0;
    private _revolvingText: string = null;

    declare private _context: IContext;

    declare private _configuration: HabboConfigurationManager;

    declare private _localization: HabboLocalizationManager;

    private _revolvingTextPending: boolean = false;
    private _disposed: boolean = false;

    constructor(stageWidth: number, stageHeight: number, args: Map<any, any>) {
        super();
        this.createFakeContext(args);
        let background: Sprite = new Sprite();
        background.name = HabboLoadingScreen.BACKGROUND;
        background.graphics.clear();
        background.graphics.beginFill(HabboLoadingScreen.BACKGROUND_COLOR);
        background.graphics.drawRect(0, 0, stageWidth, stageHeight);
        this.addChild(background);
        this._photoSplashScreen = new PhotoSplashScreen(this);
        this._photoSplashScreen.name = HabboLoadingScreen.PHOTO_SPLASH_SCREEN;
        this.addChild(this._photoSplashScreen);
        let loadingBar: Sprite = new Sprite();
        loadingBar.name = HabboLoadingScreen.FILE_LOADING_BAR;
        loadingBar.graphics.lineStyle(1, HabboLoadingScreen.BAR_BORDER_COLOR, 1, true);
        loadingBar.graphics.beginFill(HabboLoadingScreen.BAR_FILL_COLOR);
        loadingBar.graphics.drawRect(1, 0, HabboLoadingScreen.LOADING_BAR_WIDTH - 1, 0);
        loadingBar.graphics.drawRect(HabboLoadingScreen.LOADING_BAR_WIDTH, 1, 0, HabboLoadingScreen.LOADING_BAR_HEIGHT - 1);
        loadingBar.graphics.drawRect(1, HabboLoadingScreen.LOADING_BAR_HEIGHT, HabboLoadingScreen.LOADING_BAR_WIDTH - 1, 0);
        loadingBar.graphics.drawRect(0, 1, 0, HabboLoadingScreen.LOADING_BAR_HEIGHT - 1);
        loadingBar.graphics.endFill();
        this.addChild(loadingBar);
        let revolvingText: string = this._localization.getLocalization(HabboLoadingScreen.LOCALIZATION_STARTING_REVOLVING);
        let startingText: string = this._localization.getLocalization(HabboLoadingScreen.LOCALIZATION_STARTING);
        let titleText: any = null;
        if (revolvingText != null) {
            let phrases: any[] = revolvingText.split(HabboLoadingScreen.REVOLVING_TEXT_SEPARATOR);
            this._revolvingTextIndex = this.randomNumber(0, phrases.length - 1) | 0;
            this._revolvingText = revolvingText;
            titleText = phrases[this._revolvingTextIndex];
        } else {
            titleText = startingText;
        }
        let title: TextField = LoaderUI.createTextField(stringOrNull(titleText), HabboLoadingScreen.TITLE_FONT_SIZE, HabboLoadingScreen.BAR_BORDER_COLOR, true, false, false, false, TextFormatAlign.CENTER);
        title.name = HabboLoadingScreen.TEXT_FIELD;
        this.addChild(title);
        let progressText: TextField = LoaderUI.createTextField("0%", HabboLoadingScreen.PROGRESS_FONT_SIZE, HabboLoadingScreen.DIM_TEXT_COLOR, true, false, false, false, TextFormatAlign.CENTER);
        progressText.name = HabboLoadingScreen.LOADING_NUMBER_TEXT_FIELD;
        this.addChild(progressText);
        let barSprite: Sprite = new Sprite();
        barSprite.name = HabboLoadingScreen.FILE_BAR_SPRITE;
        loadingBar.addChild(barSprite);
        loadingBar.visible = true;
        let descriptor: XML = NativeApplication.nativeApplication.applicationDescriptor;
        let descriptorNs: Namespace = descriptor.namespace();
        let versionNumber: string = descriptor.child(new QName(descriptorNs, "versionNumber")).toString();
        let versionText: TextField = LoaderUI.createTextField(versionNumber, HabboLoadingScreen.VERSION_FONT_SIZE, HabboLoadingScreen.DIM_TEXT_COLOR, true, false, false, false, TextFormatAlign.RIGHT);
        versionText.name = HabboLoadingScreen.VERSION_TEXT_FIELD;
        this.addChild(versionText);
        this.addEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._disposed = true;
        // NOTE: decompiler artifact. The original assigned the stage to this local
        // (it was emitted as a self-assignment), so as decompiled it stays null and
        // the resize listener added in onAddedToStage is never removed.
        let stageRef: Stage = null;
        if (stageRef != null) {
            stageRef.removeEventListener(Event.RESIZE, this.onResize);
        }
        this.removeEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
        this.removeEventListener(Event.REMOVED_FROM_STAGE, this.onRemovedFromStage);
        this.removeElement(HabboLoadingScreen.PHOTO_SPLASH_SCREEN);
        this.removeElement(HabboLoadingScreen.BACKGROUND);
        this.removeElement(HabboLoadingScreen.TEXT_FIELD);
        this.removeElement(HabboLoadingScreen.HABBO_LOGO);
        this.removeElement(HabboLoadingScreen.FILE_LOADING_BAR);
        this.removeElement(HabboLoadingScreen.ERROR_TEXT_FIELD);
        this.removeElement(HabboLoadingScreen.CONTAINER);
        if (this._barProgressTimer != null) {
            this._barProgressTimer.stop();
            this._barProgressTimer.removeEventListener(TimerEvent.TIMER, this.onBarProgressEvent);
            this._barProgressTimer = null;
        }
        if (this._context) {
            this._context.dispose();
            this._context = null;
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
        let stageWidth: number = 0;
        let stageHeight: number = 0;
        let currentStage: Stage = this.stage;
        if (currentStage != null) {
            stageWidth = currentStage.stageWidth;
            stageHeight = currentStage.stageHeight;
        } else {
            stageWidth = this.width | 0;
            stageHeight = this.height | 0;
        }
        let background: Sprite = asInstanceOf(this.getChildByName(HabboLoadingScreen.BACKGROUND), Sprite);
        if (background != null) {
            background.x = 0;
            background.y = 0;
            background.graphics.clear();
            background.graphics.beginFill(HabboLoadingScreen.BACKGROUND_COLOR);
            background.graphics.drawRect(0, 0, stageWidth, stageHeight);
        }
        let widestX: number = 0;
        let widest: number = 0;
        let cursorY: number = 0;
        let splashScreen: Sprite = asInstanceOf(this.getChildByName(HabboLoadingScreen.PHOTO_SPLASH_SCREEN), Sprite);
        if (splashScreen != null) {
            splashScreen.x = (stageWidth - splashScreen.width) / 2;
            cursorY = splashScreen.y + splashScreen.height | 0;
        }
        let title: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.TEXT_FIELD), TextField);
        if (title != null) {
            title.x = (stageWidth - title.width) / 2;
            if (title.width > widest) {
                widest = title.width | 0;
                widestX = title.x | 0;
            }
        }
        let versionText: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.VERSION_TEXT_FIELD), TextField);
        if (versionText != null) {
            versionText.x = stageWidth - versionText.width;
            versionText.y = 0;
        }
        let loadingBar: Sprite = asInstanceOf(this.getChildByName(HabboLoadingScreen.FILE_LOADING_BAR), Sprite);
        if (loadingBar != null) {
            loadingBar.x = (stageWidth - loadingBar.width) / 2;
            loadingBar.y = cursorY;
            cursorY = loadingBar.y + loadingBar.height | 0;
            if (loadingBar.width > widest) {
                widest = loadingBar.width | 0;
                widestX = loadingBar.x | 0;
            }
        }
        let progressText: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.LOADING_NUMBER_TEXT_FIELD), TextField);
        if (progressText != null) {
            progressText.x = (stageWidth - progressText.width) / 2;
            if (progressText.width > widest) {
                widest = progressText.width | 0;
                widestX = progressText.x | 0;
            }
        }
        let errorText: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.ERROR_TEXT_FIELD), TextField);
        if (errorText != null) {
            errorText.x = (stageWidth - errorText.width) / 2;
            if (errorText.width > widest) {
                widest = errorText.width | 0;
                widestX = errorText.x | 0;
            }
        }
        cursorY = (stageHeight - cursorY) / 2 | 0;
        cursorY -= HabboLoadingScreen.ELEMENT_SPACING * 2;
        if (splashScreen != null) {
            splashScreen.y = cursorY;
            cursorY = splashScreen.y + splashScreen.height | 0;
        }
        if (title != null) {
            title.y = cursorY + HabboLoadingScreen.TITLE_TOP_MARGIN;
            cursorY = title.y + title.height + HabboLoadingScreen.ELEMENT_SPACING | 0;
        }
        if (loadingBar != null) {
            loadingBar.y = cursorY;
            cursorY = loadingBar.y + loadingBar.height + HabboLoadingScreen.ELEMENT_SPACING / 2 | 0;
        }
        if (progressText != null) {
            progressText.y = cursorY;
            cursorY = progressText.y + progressText.height + HabboLoadingScreen.ELEMENT_SPACING | 0;
        }
        if (errorText != null) {
            errorText.y = cursorY;
        }
    }

    public updateLoadingBarProgression(progress: number): void {
        let loadingBar: Sprite = asInstanceOf(this.getChildByName(HabboLoadingScreen.FILE_LOADING_BAR), Sprite);
        if (loadingBar == null) {
            return;
        }
        let barSprite: Sprite = asInstanceOf(loadingBar.getChildByName(HabboLoadingScreen.FILE_BAR_SPRITE), Sprite);
        if (barSprite == null) {
            return;
        }
        barSprite.x = HabboLoadingScreen.LOADING_BAR_BORDER_WIDTH + HabboLoadingScreen.LOADING_BAR_BORDER_SPACING;
        barSprite.y = HabboLoadingScreen.LOADING_BAR_BORDER_WIDTH + HabboLoadingScreen.LOADING_BAR_BORDER_SPACING;
        barSprite.graphics.clear();
        let innerHeight: number = HabboLoadingScreen.LOADING_BAR_HEIGHT - HabboLoadingScreen.LOADING_BAR_BORDER_WIDTH * 2 - HabboLoadingScreen.LOADING_BAR_BORDER_SPACING * 2;
        let filledWidth: number = (HabboLoadingScreen.LOADING_BAR_WIDTH - HabboLoadingScreen.LOADING_BAR_BORDER_WIDTH * 2 - HabboLoadingScreen.LOADING_BAR_BORDER_SPACING * 2) * progress | 0;
        barSprite.graphics.beginFill(0);
        barSprite.graphics.drawRect(-1, -1, HabboLoadingScreen.LOADING_BAR_WIDTH - HabboLoadingScreen.LOADING_BAR_BORDER_WIDTH * 2, HabboLoadingScreen.LOADING_BAR_HEIGHT - HabboLoadingScreen.LOADING_BAR_BORDER_SPACING * 2);
        barSprite.graphics.endFill();
        barSprite.graphics.beginFill(HabboLoadingScreen.BAR_GRADIENT_TOP_COLOR);
        barSprite.graphics.drawRect(0, 0, filledWidth, innerHeight / 2);
        barSprite.graphics.endFill();
        barSprite.graphics.beginFill(HabboLoadingScreen.BAR_GRADIENT_BOTTOM_COLOR);
        barSprite.graphics.drawRect(0, innerHeight / 2, filledWidth, innerHeight / 2 + 1);
        barSprite.graphics.endFill();
    }

    public updateLoadingBar(progress: number): void {
        let progressText: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.LOADING_NUMBER_TEXT_FIELD), TextField);
        if (progressText != null) {
            progressText.text = Math.round(progress * HabboLoadingScreen.PROGRESS_COMPLETE) + "%";
        }
    }

    public showError(message: string): void {
        if (this._barProgressTimer != null) {
            this._barProgressTimer.stop();
            this._barProgressTimer.removeEventListener(TimerEvent.TIMER, this.onBarProgressEvent);
            this._barProgressTimer = null;
        }
        let title: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.TEXT_FIELD), TextField);
        if (title != null) {
            title.htmlText = HabboLoadingScreen.LOADING_FAILED_TEXT;
            if (title.text == "" || title.text == "client.loading.failed" || title.text == HabboLoadingScreen.LOADING_FAILED_TEXT) {
                title.text = "Loading failed";
            }
            title.width = title.textWidth + HabboLoadingScreen.TEXT_PADDING;
            title.height = title.textHeight + HabboLoadingScreen.TEXT_PADDING;
        }
        let progressText: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.LOADING_NUMBER_TEXT_FIELD), TextField);
        if (progressText != null) {
            progressText.text = "";
        }
        let errorText: TextField = asInstanceOf(this.getChildByName(HabboLoadingScreen.ERROR_TEXT_FIELD), TextField);
        if (errorText == null) {
            errorText = LoaderUI.createTextField("", HabboLoadingScreen.ERROR_FONT_SIZE, HabboLoadingScreen.ERROR_TEXT_COLOR, false, true, false, false, TextFormatAlign.CENTER);
            errorText.name = HabboLoadingScreen.ERROR_TEXT_FIELD;
            this.addChild(errorText);
        }
        let availableWidth: number = (this.stage != null ? this.stage.stageWidth : this.width) | 0;
        errorText.autoSize = TextFieldAutoSize.NONE;
        errorText.multiline = true;
        errorText.wordWrap = true;
        errorText.width = Math.max(HabboLoadingScreen.ERROR_MIN_WIDTH, Math.min(availableWidth - HabboLoadingScreen.ERROR_STAGE_MARGIN, HabboLoadingScreen.ERROR_MAX_WIDTH));
        errorText.text = message;
        errorText.height = errorText.textHeight + HabboLoadingScreen.ERROR_TEXT_PADDING;
        this.positionLoadingScreenDisplayElements();
    }

    private createFakeContext(args: Map<any, any>): void {
        this._context = new FakeContext(args);
        let manifest: XML = new XML(`<manifest>
                <library/>
            </manifest>`);
        let assets: IAssetLibrary = new AssetLibrary("_assetsTemp@", manifest);
        (asInstanceOf(this._context.assets, AssetLibraryCollection)).addAssetLibrary(assets);
        this._configuration = this.createConfiguration(this._context);
        this._localization = this.createLocalization(this._context);
        this._localization.loadDefaultEmbedLocalizations(this._configuration.getProperty(HabboProperty.ENVIRONMENT_ID));
    }

    private createConfiguration(context: IContext): HabboConfigurationManager {
        let manifest: XML = new XML(`<manifest>
                <library/>
            </manifest>`);
        let manifestBytes: ByteArray = asInstanceOf(new HabboConfigurationCom.manifest(), ByteArray);
        let manifestXml: XML = new XML(manifestBytes.readUTFBytes(manifestBytes.length));
        manifest.child("library").appendChild(manifestXml.child("component").child("assets"));
        let assets: IAssetLibrary = new AssetLibrary("_assetsConfiguration@");
        assets.loadFromResource(manifest, HabboConfigurationCom);
        return new HabboConfigurationManager(context, 0, assets);
    }

    private createLocalization(context: IContext): HabboLocalizationManager {
        let manifest: XML = new XML(`<manifest>
                <library/>
            </manifest>`);
        let manifestBytes: ByteArray = asInstanceOf(new HabboLocalizationCom.manifest(), ByteArray);
        let manifestXml: XML = new XML(manifestBytes.readUTFBytes(manifestBytes.length));
        manifest.child("library").appendChild(manifestXml.child("component").child("assets"));
        let assets: IAssetLibrary = new AssetLibrary("_assetsLocalization@");
        assets.loadFromResource(manifest, HabboLocalizationCom);
        return new HabboLocalizationManager(context, 0, assets);
    }

    private randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private removeElement(name: string): void {
        let child: DisplayObject = this.getChildByName(name);
        if (child != null) {
            this.removeChild(child);
        }
    }

    private onRemovedFromStage = (event: Event): void => {
        HabboLoadingScreen._log.info("Habbo Loading Screen was removed from stage.");
    };

    private onAddedToStage = (event: Event): void => {
        this.removeEventListener(Event.ADDED_TO_STAGE, this.onAddedToStage);
        this.stage.addEventListener(Event.RESIZE, this.onResize);
        this.positionLoadingScreenDisplayElements();
        this._barProgressTimer = new Timer(HabboLoadingScreen.BAR_PROGRESS_INTERVAL_MS);
        this._barProgressTimer.addEventListener(TimerEvent.TIMER, this.onBarProgressEvent);
        this._barProgressTimer.start();
    };

    private onResize = (event: Event): void => {
        this.positionLoadingScreenDisplayElements();
    };

    private onBarProgressEvent = (event: Event): void => {
        let phrases: any[] = null;
        let title: TextField = null;
        let replacement: TextField = null;
        if (this._progressPercent == HabboLoadingScreen.PROGRESS_COMPLETE) {
            if (this._revolvingTextPending) {
                phrases = this._revolvingText.split(HabboLoadingScreen.REVOLVING_TEXT_SEPARATOR);
                title = asInstanceOf(this.getChildByName(HabboLoadingScreen.TEXT_FIELD), TextField);
                if (title != null) {
                    this.removeElement(HabboLoadingScreen.TEXT_FIELD);
                    replacement = LoaderUI.createTextField(stringOrNull(phrases[this._revolvingTextIndex]), HabboLoadingScreen.TITLE_FONT_SIZE, HabboLoadingScreen.BAR_BORDER_COLOR, true, false, false, false, TextFormatAlign.CENTER);
                    replacement.x = (this.width - replacement.width) / 2;
                    replacement.y = title.y;
                    replacement.name = HabboLoadingScreen.TEXT_FIELD;
                    this.addChild(replacement);
                }
                this._revolvingTextPending = false;
            }
            this._progressPercent = 0;
        } else {
            this._progressPercent = this._progressPercent + Math.min(this.randomNumber(HabboLoadingScreen.PROGRESS_STEP_MIN, Math.min(this.randomNumber(HabboLoadingScreen.PROGRESS_STEP_CAP_MIN, HabboLoadingScreen.PROGRESS_STEP_CAP_MAX))), HabboLoadingScreen.PROGRESS_COMPLETE - this._progressPercent) | 0;
        }
        if (this._progressPercent == HabboLoadingScreen.PROGRESS_COMPLETE && this._revolvingText != null) {
            this._revolvingTextPending = true;
            this._revolvingTextIndex = (this._revolvingTextIndex + 1) % (this._revolvingText.split(HabboLoadingScreen.REVOLVING_TEXT_SEPARATOR).length - 1);
        }
        this.updateLoadingBarProgression(this._progressPercent / HabboLoadingScreen.PROGRESS_COMPLETE);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboLoadingScreen.#staticsReady) return;
        HabboLoadingScreen.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboLoadingScreen, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("HabboLoadingScreen"));
    }

    get [IDisposable](): true {
        return true;
    }
}
