import { asGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ErrorEvent } from '@/com/sulake/core/runtime/events/ErrorEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { Clipboard } from '@habbo-pixi/runtime/desktop/Clipboard';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { Base64Encoder } from '@/mx/utils/Base64Encoder';

export class ErrorPopupCtrl extends Component {
    static { registerClassName(this, 'com.sulake.habbo.communication.demo::ErrorPopupCtrl'); }

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _sessionData: ISessionDataManager;

    declare private _SafeStr_2492: IModalDialog;

    declare private _window: IFrameWindow;

    declare private _doNotShowAgain: boolean;

    declare private _disposed_ErrorPopupCtrl: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
    }

    private static base64encode(param1: string): string {
        let _loc2_: ByteArray = new ByteArray();
        _loc2_.writeUTFBytes(param1);
        let _loc3_: Base64Encoder = new Base64Encoder();
        _loc3_.encodeBytes(_loc2_);
        return _loc3_.toString();
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionData = param1;
         })]);
    }

    protected override initComponent(): void {
    }

    private createWindow(): void {
        if (this._SafeStr_2492 == null) {
            this._SafeStr_2492 = this._windowManager.buildModalDialogFromXML(XML.from(castTo(this.assets.getAssetByName("error_popup"), XmlAsset).content));
            this._window = asGuarded(this._SafeStr_2492.rootWindow, isIFrameWindow);
            this.closeButton.addEventListener("WME_CLICK", this.onWindowCloseClicked);
            this.okButton.addEventListener("WME_CLICK", this.onWindowCloseClicked);
            this.copyButton.addEventListener("WME_CLICK", this.onCopyClicked);
        }
        this._window.activate();
        this._window.center();
    }

    private onCopyClicked(param1: WindowMouseEvent): void {
        Clipboard.generalClipboard.setData("air:text", this.errorInfoContents.text);
    }

    private onWindowCloseClicked(param1: WindowMouseEvent): void {
        this._doNotShowAgain = this.doNotShowCheckbox.isSelected;
        this.destroyWindow();
    }

    private destroyWindow(): void {
        if (this._SafeStr_2492 != null) {
            this._SafeStr_2492.dispose();
            this._SafeStr_2492 = null;
        }
    }

    public onError(param1: ErrorEvent, param2: boolean): void {
        if (this._doNotShowAgain) {
            return;
        }
        this.createWindow();
        let _loc3_: boolean = param2 && param1.error != null;
        this.errorInfoBorder.visible = _loc3_;
        this.closeButton.visible = _loc3_;
        this.messageText.text = stringOrNull(param1.error?.message);
        this._window.caption = "Error #" + param1.category;
        if (_loc3_) {
            this.errorInfoContents.text = ErrorPopupCtrl.base64encode(this.createErrorText(param1));
        }
        this._window.height = this.contentList.height + 56;
    }

    public createErrorText(param1: ErrorEvent): string {
        return "Error ID: " + (param1.error.errorID ?? 0) + "\n" + "Critical: " + param1.critical + "\n" + "Message: " + param1.message + "\n" + "User name: " + this._sessionData.userName + "\n" + "User id:" + this._sessionData.userId + "\n" + "Hotel: " + this.getProperty("environment.id") + "\n" + "---------------------" + "\n\n" + param1.error.stack;
    }

    public override dispose(): void {
        if (this._disposed_ErrorPopupCtrl) {
            return;
        }
        this._disposed_ErrorPopupCtrl = true;
        if (this._window) {
            this.destroyWindow();
        }
        this._windowManager = null;
        this._localizationManager = null;
        this._doNotShowAgain = false;
        super.dispose();
    }

    public override get disposed(): boolean {
        return this._disposed_ErrorPopupCtrl;
    }

    public get contentList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("content_list"), isIItemListWindow);
    }

    public get messageText(): ITextWindow {
        return asGuarded(this._window.findChildByName("error_msg_text"), isITextWindow);
    }

    public get errorInfoBorder(): IBorderWindow {
        return asGuarded(this._window.findChildByName("error_info_border"), isIBorderWindow);
    }

    public get errorInfoContents(): ITextFieldWindow {
        return asGuarded(this._window.findChildByName("error_info_contents"), isITextFieldWindow);
    }

    public get doNotShowCheckbox(): ICheckBoxWindow {
        return asGuarded(this._window.findChildByName("do_not_show_cbx"), isICheckBoxWindow);
    }

    public get okButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("ok_button"), isIButtonWindow);
    }

    public get copyButton(): IButtonWindow {
        return asGuarded(this._window.findChildByName("copy_button"), isIButtonWindow);
    }

    public get closeButton(): IWindow {
        return asGuarded(this._window.findChildByName("header_button_close"), isIWindow);
    }

    protected override initInstanceFields(): void {
        this.onCopyClicked = this.onCopyClicked.bind(this);
        this.onWindowCloseClicked = this.onWindowCloseClicked.bind(this);
        this._doNotShowAgain = false;
        this._disposed_ErrorPopupCtrl = false;
        super.initInstanceFields();
    }
}
