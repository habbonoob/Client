import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboEpicPopupView } from '@/com/sulake/habbo/friendbar/IHabboEpicPopupView';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { EpicPopupMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/EpicPopupMessageEvent';
import { AbstractView } from '@/com/sulake/habbo/friendbar/view/AbstractView';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';

export class HabboEpicPopupView extends AbstractView implements IHabboEpicPopupView {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.popup::HabboEpicPopupView'); }

    constructor(param1: IContext, param2: number, param3: IAssetLibrary) {
        super(param1, param2, param3);
    }

    declare private _communicationManager: IHabboCommunicationManager;

    declare private _activeFrame: IWindowContainer;

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
                this._communicationManager = param1;
            })]);
    }

    public override dispose(): void {
        if (this._activeFrame != null) {
            this._activeFrame.dispose();
            this._activeFrame = null;
        }
        super.dispose();
    }

    protected override initComponent(): void {
        this._communicationManager.addHabboConnectionMessageEvent(new EpicPopupMessageEvent(this.onEpicPopupMessageEvent));
    }

    public showPopup(param1: string): void {
        if (this._activeFrame != null) {
            this._activeFrame.dispose();
        }
        this._activeFrame = asGuarded(this._windowManager.buildFromXML(asInstanceOf(this.assets.getAssetByName("epic_popup_frame_xml").content, XML)), isIWindowContainer);
        castGuarded(this._activeFrame.findChildByName("content_static_bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = param1;
        this._activeFrame.procedure = this.windowProc;
        this._activeFrame.center();
    }

    private onEpicPopupMessageEvent(param1: EpicPopupMessageEvent): void {
        this.showPopup(param1.getParser().imageUri);
    }

    private windowProc(param1: WindowEvent, param2: IWindow): void {
        if (this._activeFrame != null && param1.type == "WME_CLICK") {
            switch (param1.target.name) {
                case "close_button":
                case "header_button_close":
                    this._activeFrame.dispose();
                    this._activeFrame = null;
            }
        }
    }

    protected override initInstanceFields(): void {
        this.onEpicPopupMessageEvent = this.onEpicPopupMessageEvent.bind(this);
        this.windowProc = this.windowProc.bind(this);
        super.initInstanceFields();
    }
}
