import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IssueMessageData } from '@/com/sulake/habbo/communication/messages/parser/moderation/IssueMessageData';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { ModMessageMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/moderator/ModMessageMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ITrackedWindow } from '@/com/sulake/habbo/moderation/ITrackedWindow';

export class SendMsgsCtrl implements IDisposable, ITrackedWindow {
    static { registerClassName(this, 'com.sulake.habbo.moderation::SendMsgsCtrl'); }

    private static readonly TOPIC_ID_NOT_SELECTED: number = -999;

    declare private _main: ModerationManager;

    declare private _SafeStr_2815: number;
    static { (this.prototype as any)._SafeStr_2815 = 0; }

    declare private _targetUserName: string;

    declare private _SafeStr_4861: IssueMessageData;

    declare private _frame: IFrameWindow;

    declare private _msgSelect: IDropMenuWindow;

    declare private _SafeStr_2861: ITextFieldWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    private _placeHolderMessage: boolean = true;

    constructor(param1: ModerationManager, param2: number, param3: string, param4: IssueMessageData) {
        this._main = param1;
        this._SafeStr_2815 = param2;
        this._targetUserName = param3;
        this._SafeStr_4861 = param4;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public show(): void {
        this._frame = castGuarded(this._main.getXmlWindow("send_msgs"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._frame.caption = "Msg To: " + this._targetUserName;
        this._frame.findChildByName("send_message_but").procedure = this.onSendMessageButton;
        this._SafeStr_2861 = castGuarded(this._frame.findChildByName("message_input"), isITextFieldWindow, "com.sulake.core.window.components.ITextFieldWindow");
        this._SafeStr_2861.procedure = this.onInputClick;
        this._msgSelect = castGuarded(this._frame.findChildByName("msgTemplatesSelect"), isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow");
        this.prepareMessageSelection(this._msgSelect);
        this._msgSelect.procedure = this.onSelectTemplate;
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        _loc1_.procedure = this.onClose;
        this._frame.visible = true;
    }

    public getType(): number {
        return 2;
    }

    public getId(): string {
        return this._targetUserName;
    }

    public getFrame(): IFrameWindow {
        return this._frame;
    }

    private prepareMessageSelection(param1: IDropMenuWindow): void {
        Logger.log("MSG TEMPLATES: " + this._main.initMsg.messageTemplates.length);
        param1.populate(this._main.initMsg.messageTemplates);
    }

    private onSelectTemplate = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_SELECTED") {
            return;
        }
        let _loc3_: string = stringOrNull(this._main.initMsg.messageTemplates[this._msgSelect.selection]);
        if (_loc3_ != null) {
            this._placeHolderMessage = false;
            this._SafeStr_2861.text = _loc3_;
        }
    };

    private onSendMessageButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (this._placeHolderMessage || this._SafeStr_2861.text == "") {
            this._main.windowManager.alert("Alert", "You must input a message to the user", 0, this.onAlertClose);
            return;
        }
        Logger.log("Sending message...");
        this._main.connection.send(new ModMessageMessageComposer(this._SafeStr_2815, this._SafeStr_2861.text, -999, this._SafeStr_4861 != null ? this._SafeStr_4861.issueId : -1));
        this.dispose();
    };

    private onClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.dispose();
    };

    private onInputClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_FOCUSED") {
            return;
        }
        if (this._placeHolderMessage) {
            this._SafeStr_2861.text = "";
            this._placeHolderMessage = false;
        }
    };

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._frame != null) {
            this._frame.destroy();
            this._frame = null;
        }
        this._msgSelect = null;
        this._SafeStr_2861 = null;
        this._main = null;
    }

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    get [IDisposable](): true {
        return true;
    }

    get [ITrackedWindow](): true {
        return true;
    }
}
