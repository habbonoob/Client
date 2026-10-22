import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { UpdateFloorPropertiesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/layout/UpdateFloorPropertiesMessageComposer';
import { BCFloorPlanEditor } from '@/com/sulake/habbo/window/utils/floorplaneditor/BCFloorPlanEditor.group';

export class ImportExportDialog {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.floorplaneditor::ImportExportDialog'); }

    constructor(param1: BCFloorPlanEditor, param2: XML) {
        this._bcFloorPlanEditor = param1;
        this._layout = param2;
    }

    declare private _bcFloorPlanEditor: BCFloorPlanEditor;

    declare private _layout: XML;

    private _window: IFrameWindow = null;

    public get visible(): boolean {
        if (!this._window) {
            return false;
        }
        return this._window.visible;
    }

    public set visible(param1: boolean) {
        if (this._window == null) {
            this._window = castGuarded(this._bcFloorPlanEditor.windowManager.buildFromXML(this._layout), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
            this._window.center();
            this._window.procedure = this.windowProcedure;
        }
        if (param1) {
            this._window.visible = true;
            this._window.findChildByName("data").caption = this._bcFloorPlanEditor.floorPlanCache.getData();
            if (this._bcFloorPlanEditor.bcSecondsLeft > 0 || this._bcFloorPlanEditor.windowManager.sessionDataManager.hasSecurity(4)) {
                this._window.findChildByName("save").enable();
            } else {
                this._window.findChildByName("save").disable();
            }
            this._window.activate();
        } else {
            this._window.visible = false;
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "header_button_close":
                    this.visible = false;
                    break;
                case "revert":
                    this._window.findChildByName("data").caption = this._bcFloorPlanEditor.lastReceivedFloorPlan;
                    break;
                case "save":
                    this._bcFloorPlanEditor.windowManager.communication.connection.send(new UpdateFloorPropertiesMessageComposer(this._window.findChildByName("data").caption, this._bcFloorPlanEditor.floorPlanCache.entryPoint.x | 0, this._bcFloorPlanEditor.floorPlanCache.entryPoint.y | 0, this._bcFloorPlanEditor.floorPlanCache.entryPointDir, BCFloorPlanEditor.getThicknessSettingBySelectionIndex(this._bcFloorPlanEditor.wallThickness), BCFloorPlanEditor.getThicknessSettingBySelectionIndex(this._bcFloorPlanEditor.floorThickness)));
            }
        }
    };
}
