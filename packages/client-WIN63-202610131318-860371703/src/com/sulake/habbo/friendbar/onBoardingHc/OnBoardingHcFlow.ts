import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap, embedFont } from '@habbo-pixi/runtime/embed/embed';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IBoardingContext } from '@/com/sulake/habbo/friendbar/onBoardingHc/IBoardingContext';
import type { NameChangeDialog } from '@/com/sulake/habbo/friendbar/onBoardingHc/NameChangeDialog';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import type { TextField } from '@habbo-pixi/runtime/text/TextField';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { HitchNameChangeDialog } from '@/com/sulake/habbo/friendbar/onBoardingHc/HitchNameChangeDialog';
import { AvatarEditor } from '@/com/sulake/habbo/friendbar/onBoardingHcSteps/AvatarEditor';
import { Background } from '@/com/sulake/habbo/friendbar/onBoardingHcSteps/Background';
import { RoomPicker } from '@/com/sulake/habbo/friendbar/onBoardingHcSteps/RoomPicker';
import { LoaderUI } from '@/onBoardingHcUi/LoaderUI';

const HabboWindowManagerCom_ubuntu_regular_ttfAsset = embedFont("shared/HabboWindowManagerCom_ubuntu_regular.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_ttfAsset = embedFont("shared/ubuntu_bold.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "normal", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_italic_ttfAsset = embedFont("shared/ubuntu_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "normal", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const ubuntu_bold_italic_ttfAsset = embedFont("shared/ubuntu_bold_italic.ttf", { fontName: "Ubuntu", fontFamily: "Ubuntu", fontWeight: "bold", fontStyle: "italic", unicodeRange: "U+0020-007E,U+00A0-017F,U+0192-0192,U+02C6-02C7,U+02C9-02C9,U+02D8-02DD,U+0311-0311,U+0384-0386,U+0388-038A,U+038C-038C,U+038E-0394,U+03A9-03A9,U+03BC-03BC,U+03C0-03C0,U+2013-2015,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2026,U+2030-2030,U+2039-203A,U+2044-2044,U+2070-2070,U+2074-2079,U+2080-2089,U+20AC-20AC,U+20AE-20AE,U+20B4-20B4,U+20B9-20B9,U+2113-2113,U+2116-2116,U+2122-2122,U+2126-2126,U+212E-212E,U+2153-2159,U+2202-2202,U+2206-2206,U+220F-220F,U+2211-2211,U+2219-221A,U+221E-221E,U+222B-222B,U+2248-2248,U+2260-2260,U+2264-2265,U+25CA-25CA,U+F000-F002" });
const habbo_logo_png_pngAsset = embedBitmap("shared/habbo_logo_png.png");

export class OnBoardingHcFlow extends Sprite implements IBoardingContext, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.onBoardingHc::OnBoardingHcFlow'); }

    public static readonly NEW_USER_FLOW_FINISHED_EVENT: string = "NewUserFlowFinished";
    private static readonly LOGO_AREA_HEIGHT: number = 95;
    private static readonly MAIN_AREA_MARGIN: number = 0;
    public static readonly AVATAR_NAME_CHANGE: number = 0;
    public static readonly NEW_ROOM_SELECT: number = 1;

    public static ubuntu_regular = HabboWindowManagerCom_ubuntu_regular_ttfAsset;

    public static ubuntu_bold = ubuntu_bold_ttfAsset;

    public static ubuntu_italic = ubuntu_italic_ttfAsset;

    public static ubuntu_bold_italic = ubuntu_bold_italic_ttfAsset;

    private static readonly habbo_logo_png = habbo_logo_png_pngAsset;

    declare private _background: Background;

    declare private _avatarEditor: AvatarEditor;

    declare private _SafeStr_2548: Sprite;

    declare private _SafeStr_2227: NameChangeDialog;

    declare private _SafeStr_2574: Sprite;

    declare private _roomPicker: RoomPicker;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _SafeStr_2358: Sprite;

    declare private _SafeStr_7322: boolean;
    static { (this.prototype as any)._SafeStr_7322 = false; }

    declare private _SafeStr_6808: boolean;
    static { (this.prototype as any)._SafeStr_6808 = false; }

    declare private _mainSprite: Sprite;

    declare private _SafeStr_5414: Sprite;

    declare private _selectedName: string;

    declare private _isFemale: boolean;
    static { (this.prototype as any)._isFemale = false; }

    declare private _SafeStr_2604: TextField;

    declare private _debugText: TextField;

    declare private _showHcItems: boolean;
    static { (this.prototype as any)._showHcItems = false; }

    private _SafeStr_4344: number = 535;
    private _nameAreaWidth: number = 400;
    private _suggestedLoginActions: any[] = [];

    constructor(param1: IAvatarRenderManager, param2: IHabboLocalizationManager, param3: IHabboCommunicationManager) {
        super();
        this._avatarRenderManager = param1;
        this._localizationManager = param2;
        this._communicationManager = param3;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._background) {
            this.removeChild(this._background);
            this._background.dispose();
            this._background = null;
        }
        if (this._avatarEditor) {
            this._avatarEditor.dispose();
            this._avatarEditor = null;
        }
        if (this._SafeStr_2227) {
            this._SafeStr_2227.dispose();
            this._SafeStr_2227 = null;
        }
        if (this._SafeStr_2548) {
            this._SafeStr_2548 = null;
        }
        if (this._SafeStr_2574 != null) {
            this._SafeStr_2574 = null;
        }
        if (this._mainSprite != null) {
            this.removeChild(this._mainSprite);
            this._mainSprite = null;
        }
        this._avatarRenderManager = null;
        this._localizationManager = null;
        this._communicationManager = null;
        this.stage.removeChild(this);
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public init(param1: any[]): void {
        this._suggestedLoginActions = param1;
        this.stage.addEventListener("resize", this.onStageResize);
        this._background = new Background();
        this.addChild(this._background);
        this._SafeStr_5414 = new Sprite();
        this.addChild(this._SafeStr_5414);
        let _loc2_: Bitmap = new OnBoardingHcFlow.habbo_logo_png();
        _loc2_.x = 40;
        _loc2_.y = 40;
        this._SafeStr_5414.addChild(_loc2_);
        this._mainSprite = new Sprite();
        this.addChild(this._mainSprite);
        this._mainSprite.y = 95;
        this._mainSprite.x = 0;
        this._avatarEditor = new AvatarEditor(this);
        this._avatarEditor.showHcItems(this._showHcItems);
        this._mainSprite.addChild(this._avatarEditor);
        this._SafeStr_2548 = new Sprite();
        this._SafeStr_2548.x = this._SafeStr_4344;
        this._SafeStr_2548.y = 95;
        this._SafeStr_2548.visible = true;
        this._mainSprite.addChild(this._SafeStr_2548);
        this._SafeStr_2574 = new Sprite();
        this._SafeStr_2574.x = 0;
        this._SafeStr_2574.y = 95;
        this._SafeStr_2574.visible = false;
        this._mainSprite.addChild(this._SafeStr_2574);
        if (this.isRoomPickingNeeded) {
            this._roomPicker = new RoomPicker(this, this._SafeStr_2574);
            this._roomPicker.fetchThumbnails();
        }
        if (!this._suggestedLoginActions) {
            this.dispatchEvent(new Event("NewUserFlowFinished"));
            return;
        }
        if (this._suggestedLoginActions.indexOf(0) >= 0) {
        }
        if (this._suggestedLoginActions.indexOf(1) >= 0) {
        }
        if (this._suggestedLoginActions.indexOf(0) >= 0) {
            this.startNameChange();
        } else {
            this.startRoomPicking();
        }
    }

    public setHcVisibility(param1: boolean): void {
        this._showHcItems = param1;
    }

    private onStageResize = (param1: Event): void => {
        if (this.disposed) {
            return;
        }
        this.layoutMainElements();
    };

    private layoutMainElements(): void {
        let _loc2_: number = 0;
        if (this._background != null) {
            this._background.resize();
        }
        if (this._SafeStr_2574) {
            this._SafeStr_2574.x = 0;
        }
        if (!this._SafeStr_2604) {
            this._SafeStr_2604 = LoaderUI.createTextField("intro", 40, 16777215, false, true, false, false, "left");
            this._SafeStr_2604.x = 185;
            this._SafeStr_2604.y = 45;
            this._SafeStr_2604.width = 500;
            this._SafeStr_2604.multiline = false;
            this._SafeStr_2604.thickness = 50;
            this._SafeStr_5414.addChild(this._SafeStr_2604);
        }
        let _loc1_: number = this._mainSprite.width + 20 | 0;
        if (this.stage.stageWidth > _loc1_) {
            _loc2_ = (this.stage.stageWidth - _loc1_) / 2 | 0;
            if (_loc2_ < 0) {
                _loc2_ = 0;
            }
            this._mainSprite.x = _loc2_;
        } else {
            this._mainSprite.x = 0;
        }
        if (this._avatarEditor) {
            this._avatarEditor.x = 0;
            this._SafeStr_4344 = this._avatarEditor.x + this._avatarEditor.width - 125 | 0;
        }
        if (this._SafeStr_2548) {
            this._SafeStr_2548.x = this._SafeStr_4344;
        }
        this._mainSprite.y = 95;
    }

    public getLocalization(param1: string, param2: string = null): string {
        if (!this._localizationManager) {
            return param2;
        }
        return this._localizationManager.getLocalization(param1, param2);
    }

    public getProperty(param1: string, param2: string = null): string {
        if (!this._localizationManager) {
            return param2;
        }
        let _loc3_: string = this._localizationManager.getProperty(param1);
        return _loc3_ ? _loc3_ : param2;
    }

    public showErrorMessage(param1: string): void {
        let _loc3_: TextField = LoaderUI.createTextField(param1, 9, 16777215, true);
        LoaderUI.addEtching(_loc3_, true);
        let _loc2_: Bitmap = LoaderUI.createBalloon(_loc3_.width + 30 | 0, _loc3_.height + 17 | 0, -1, true, 11411485);
        if (this._SafeStr_2358) {
            this.removeChild(this._SafeStr_2358);
        }
        this._SafeStr_2358 = new Sprite();
        this._SafeStr_2358.addChild(_loc2_);
        this._SafeStr_2358.addChild(_loc3_);
        _loc3_.x = 15;
        _loc3_.y = 14;
        this._mainSprite.addChild(this._SafeStr_2358);
        this._SafeStr_2358.x = 766;
        this._SafeStr_2358.y = 577;
        this._SafeStr_2358.filters = [new GlowFilter(0, 0.24, 6, 6)];
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    public get selectedName(): string {
        return this._selectedName;
    }

    public get isFemale(): boolean {
        return this._isFemale;
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public editorFinished(): void {
        if (this.isRoomPickingNeeded) {
            this.startRoomPicking();
        } else {
            this.dispatchEvent(new Event("NewUserFlowFinished"));
        }
    }

    public setHcMembership(param1: boolean): void {
        this._SafeStr_7322 = param1;
    }

    public submitName(): void {
        if (this._SafeStr_2227 != null && Boolean(this._SafeStr_2548.visible)) {
            this._SafeStr_2227.submitName();
        } else {
            this.nameChangeCompleted();
            this.editorFinished();
        }
    }

    private startNameChange(): void {
        if (!this._SafeStr_2227) {
            this._SafeStr_2227 = new HitchNameChangeDialog(this, this._SafeStr_2548, this.getNameAreaWidth());
        }
        if (this._SafeStr_2574) {
            this._SafeStr_2574.visible = false;
        }
        this._SafeStr_2548.visible = true;
        this._SafeStr_2548.x = this._SafeStr_4344;
        this._SafeStr_2227.preSelectedGender = this._avatarEditor.gender;
        this.layoutMainElements();
        this.showChooseStyleHeader();
    }

    public setNameGender(param1: string, param2: boolean): void {
        this._selectedName = param1;
        this._isFemale = param2;
    }

    public setIsFemale(param1: boolean): void {
        this._isFemale = param1;
    }

    public nameChangeCompleted(param1: boolean = true): void {
        this._SafeStr_6808 = param1;
        this._avatarEditor.nameChangeCompleted(param1);
    }

    public showHideButtons(param1: boolean): void {
        this._avatarEditor.showHideButtons(param1);
    }

    private get isRoomPickingNeeded(): boolean {
        return this._suggestedLoginActions.indexOf(1) >= 0;
    }

    private startRoomPicking(): void {
        if (this._roomPicker == null) {
            return;
        }
        this._avatarEditor.visible = false;
        this._avatarEditor.showHideGrid(false);
        this._SafeStr_2548.visible = false;
        this._SafeStr_2574.visible = true;
        this._roomPicker.init();
        this.layoutMainElements();
        this.showPickRoomHeader();
    }

    public showPickRoomHeader(): void {
        if (this._SafeStr_2604) {
            this._SafeStr_2604.width = 650;
            this._SafeStr_2604.htmlText = this.getLocalization("onboarding.choose.your.room", "Choose your room");
        }
    }

    public showChooseStyleHeader(): void {
        if (this._SafeStr_2604) {
            this._SafeStr_2604.width = 650;
            this._SafeStr_2604.htmlText = this.getLocalization("onboarding.choose.your.style", "My looks");
        }
    }

    public roomPickingCompleted(): void {
        this.dispatchEvent(new Event("NewUserFlowFinished"));
    }

    public get debugText(): TextField {
        return null;
    }

    public getNameAreaX(): number {
        return this._SafeStr_4344;
    }

    public getNameAreaWidth(): number {
        return this._nameAreaWidth;
    }

    get [IDisposable](): true {
        return true;
    }
}
