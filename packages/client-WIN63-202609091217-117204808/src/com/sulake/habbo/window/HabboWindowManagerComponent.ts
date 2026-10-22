import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IResourceManager } from '@/com/sulake/core/assets/IResourceManager';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IProfiler } from '@/com/sulake/core/runtime/IProfiler';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowRenderer } from '@/com/sulake/core/window/graphics/IWindowRenderer';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { IInputEventTracker } from '@/com/sulake/core/window/IInputEventTracker';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { IWidgetFactory } from '@/com/sulake/core/window/IWidgetFactory';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IWindowContext } from '@/com/sulake/core/window/IWindowContext';
import type { IWindowFactory } from '@/com/sulake/core/window/IWindowFactory';
import type { IThemeManager } from '@/com/sulake/core/window/theme/IThemeManager';
import type { DefaultAttStruct } from '@/com/sulake/core/window/utils/DefaultAttStruct';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IAlertDialogWithLink } from '@/com/sulake/core/window/utils/IAlertDialogWithLink';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { INotify } from '@/com/sulake/core/window/utils/INotify';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IModalDialog } from '@/com/sulake/habbo/window/utils/IModalDialog';
import { Event } from '@habbo-pixi/runtime/events/Event';
import { ExternalInterface } from '@habbo-pixi/runtime/external/ExternalInterface';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import type { StyleSheet } from '@habbo-pixi/runtime/text/StyleSheet';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIAsset } from '@/com/sulake/core/assets/IAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IIDProfiler } from '@/com/sulake/core/runtime/IIDProfiler';
import { isIProfiler } from '@/com/sulake/core/runtime/IProfiler';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { FontEnum } from '@/com/sulake/core/utils/FontEnum';
import { ProfilerAgentTask } from '@/com/sulake/core/utils/profiler/ProfilerAgentTask';
import { HTMLTextController, WindowContext } from '@/com/sulake/core/window/Classes.group';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { SkinContainer } from '@/com/sulake/core/window/graphics/SkinContainer';
import { WindowRenderer } from '@/com/sulake/core/window/graphics/WindowRenderer';
import { ICoreWindowManager } from '@/com/sulake/core/window/ICoreWindowManager';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ProfilerOutput } from '@/com/sulake/core/window/tools/ProfilerOutput';
import { MouseCursorControl } from '@/com/sulake/core/window/utils/MouseCursorControl';
import { Logger } from '@/com/sulake/habbo/Logger';
import { HabbletLinkHandler } from '@/com/sulake/habbo/window/handlers/HabbletLinkHandler';
import { HintManager } from '@/com/sulake/habbo/window/HintManager';
import { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { ResourceManager } from '@/com/sulake/habbo/window/ResourceManager';
import { ThemeManager } from '@/com/sulake/habbo/window/theme/ThemeManager';
import { AlertDialog } from '@/com/sulake/habbo/window/utils/AlertDialog';
import { AlertDialogWithLink } from '@/com/sulake/habbo/window/utils/AlertDialogWithLink';
import { ConfirmDialog } from '@/com/sulake/habbo/window/utils/ConfirmDialog';
import { ElementPointerHandler } from '@/com/sulake/habbo/window/utils/ElementPointerHandler';
import { BCFloorPlanEditor } from '@/com/sulake/habbo/window/utils/floorplaneditor/BCFloorPlanEditor.group';
import { HabboPagesViewer } from '@/com/sulake/habbo/window/utils/habbopedia/HabboPagesViewer';
import { ModalDialog } from '@/com/sulake/habbo/window/utils/ModalDialog';
import { SimpleAlertDialog } from '@/com/sulake/habbo/window/utils/SimpleAlertDialog';
import { SkinParserUtil } from '@/com/sulake/habbo/window/utils/SkinParserUtil';
import { WidgetClasses } from '@/com/sulake/habbo/window/widgets/WidgetClasses';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboWindowManagerComponent extends Component implements IHabboWindowManager, ICoreWindowManager, IWindowFactory, IUpdateReceiver, IInputEventTracker, IWidgetFactory {
    static { registerClassName(this, 'com.sulake.habbo.window::HabboWindowManagerComponent'); }

    private static readonly NUMBER_OF_CONTEXT_LAYERS: number = 4;
    private static readonly DEFAULT_CONTEXT_LAYER_INDEX: number = 1;
    private static readonly TRACKING_EVENT_INPUT: Event = new Event("HABBO_WINDOW_TRACKING_EVENT_INPUT");
    private static readonly TRACKING_EVENT_RENDER: Event = new Event("HABBO_WINDOW_TRACKING_EVENT_RENDER");
    private static readonly TRACKING_EVENT_SLEEP: Event = new Event("HABBO_WINDOW_TRACKING_EVENT_SLEEP");

    declare private _localization: IHabboLocalizationManager;

    declare private _windowContextArray: any[];

    declare private _SafeStr_3152: IWindowContext;

    declare private _windowRenderer: IWindowRenderer;

    declare private _SafeStr_2935: SkinContainer;

    declare private _SafeStr_4300: boolean;

    declare private _SafeStr_5745: ProfilerOutput;

    declare private _profilerAgentTaskUpdate: ProfilerAgentTask;

    declare private _profilerAgentTaskRedraw: ProfilerAgentTask;

    declare private _SafeStr_6684: ThemeManager;

    declare private _resourceManager: ResourceManager;

    declare private _hintManager: HintManager;

    declare private _avatarRenderer: IAvatarRenderManager;

    declare private _communication: IHabboCommunicationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _catalog: IHabboCatalog;

    declare private _isInitialized: boolean;

    declare private _roomEngine: IRoomEngine;

    declare private _SafeStr_8033: number;

    declare private _bcfloorPlanEditor: BCFloorPlanEditor;

    declare private _SafeStr_3829: HabboPagesViewer;

    declare private _SafeStr_3834: HabbletLinkHandler;

    declare private _SafeStr_4591: ElementPointerHandler;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        FontEnum.refresh();
        HTMLTextController.defaultLinkTarget = "habboMain";
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }, false), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }, false), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }, false), new ComponentDependency(new IIDHabboConfigurationManager(), (param1: ICoreConfiguration): void => {
         }, false, [{ "type": "complete", "callback": this.onConfigurationComplete }]), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderer = param1;
         }, false), new ComponentDependency(new IIDHabboCommunicationManager(), this.setCommunicationManager, false), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false)]);
    }

    private setCommunicationManager(param1: IHabboCommunicationManager): void {
        this._communication = param1;
    }

    private onConfigurationComplete(param1: Event): void {
        if (this._communication != null) {
            this._bcfloorPlanEditor = new BCFloorPlanEditor(this);
            this._SafeStr_4591 = new ElementPointerHandler(this);
        }
    }

    protected override initComponent(): void {
        let _loc3_: any = 0;
        let _loc1_: number = getTimer();
        let _loc2_: IAsset = this.assets.getAssetByName("habbo_element_description_xml");
        this._SafeStr_2935 = new SkinContainer();
        SkinParserUtil.parse(asInstanceOf(_loc2_.content, XML), this.assets, this._SafeStr_2935);
        this._SafeStr_6684 = new ThemeManager(this._SafeStr_2935);
        this._resourceManager = new ResourceManager(this);
        this._hintManager = new HintManager(this);
        this._windowRenderer = new WindowRenderer(this._SafeStr_2935);
        this._windowContextArray = new Array(4);
        let _loc4_: Rectangle = new Rectangle(0, 0, this.context.displayObjectContainer.stage.stageWidth, this.context.displayObjectContainer.stage.stageHeight);
        _loc3_ = 0;
        while (_loc3_ < 4) {
            this._windowContextArray[_loc3_] = new WindowContext("layer_" + _loc3_, this._windowRenderer, this, this, this._resourceManager, this._localization, this, this.context.displayObjectContainer, _loc4_, this.context.linkEventTrackers);
            _loc3_++;
        }
        this.assets.removeAsset(_loc2_);
        _loc2_.dispose();
        this._SafeStr_3152 = this._windowContextArray[1];
        this.addMouseEventTracker(this);
        this.registerUpdateReceiver(this, 0);
        this.queueInterface(new IIDProfiler(), this.receiveProfilerInterface);
        _loc1_ = getTimer() - _loc1_;
        Logger.log("initializing window framework took " + _loc1_ + "ms");
        this._isInitialized = true;
        this._SafeStr_3829 = new HabboPagesViewer(this);
        this._SafeStr_3834 = new HabbletLinkHandler(this);
        this.context.addLinkEventTracker(this._SafeStr_3834);
        if (ExternalInterface.available) {
            ExternalInterface.addCallback("openlink", this.context.createLinkEvent);
        }
    }

    public toggleFullScreen(): void {
        if (this.context.displayObjectContainer.stage.displayState == "fullScreenInteractive") {
            this.context.displayObjectContainer.stage.displayState = "normal";
        } else {
            this.context.displayObjectContainer.stage.displayState = "fullScreenInteractive";
        }
    }

    private receiveProfilerInterface(param1: IID, param2: IUnknown): void {
        let _loc3_: IProfiler = isIProfiler(param2) ? param2 : null;
        if (_loc3_ != null) {
            if (!this._SafeStr_5745) {
                this._SafeStr_5745 = new ProfilerOutput(this.context, this, this._windowRenderer);
            }
            this._SafeStr_5745.profiler = _loc3_;
            this._profilerAgentTaskUpdate = new ProfilerAgentTask("Update", "Event processing");
            _loc3_.getProfilerAgentForReceiver(this).addSubTask(this._profilerAgentTaskUpdate);
            this._profilerAgentTaskRedraw = new ProfilerAgentTask("Redraw", "Window rasterizer");
            _loc3_.getProfilerAgentForReceiver(this).addSubTask(this._profilerAgentTaskRedraw);
            this._SafeStr_4300 = true;
        }
    }

    private receiveLoggerInterface(param1: IID, param2: IUnknown): void {
    }

    public override dispose(): void {
        if (!this.disposed) {
            if (this._SafeStr_3834 != null) {
                this.context.removeLinkEventTracker(this._SafeStr_3834);
                this._SafeStr_3834.dispose();
                this._SafeStr_3834 = null;
            }
            if (this._SafeStr_4591 != null) {
                this._SafeStr_4591.dispose();
                this._SafeStr_4591 = null;
            }
            this.removeUpdateReceiver(this);
            if (this._bcfloorPlanEditor != null) {
                this._bcfloorPlanEditor.dispose();
                this._bcfloorPlanEditor = null;
            }
            if (this._SafeStr_3829) {
                this._SafeStr_3829.dispose();
                this._SafeStr_3829 = null;
            }
            if (this._windowContextArray) {
                while (this._windowContextArray.length > 0) {
                    castGuarded(this._windowContextArray.pop(), isIDisposable, "com.sulake.core.runtime.IDisposable").dispose();
                }
            }
            this._windowContextArray = null;
            if (this._windowRenderer) {
                this._windowRenderer.dispose();
                this._windowRenderer = null;
            }
            if (this._SafeStr_2935) {
                this._SafeStr_2935.dispose();
                this._SafeStr_2935 = null;
            }
            if (this._resourceManager != null) {
                this._resourceManager.dispose();
                this._resourceManager = null;
            }
            if (this._hintManager != null) {
                this._hintManager.dispose();
                this._hintManager = null;
            }
            super.dispose();
        }
    }

    public create(param1: string, param2: number, param3: number, param4: number, param5: Rectangle, param6: (...args: any[]) => any = null, param7: string = "", param8: number = 0, param9: any[] = null, param10: IWindow = null, param11: any[] = null, param12: string = ""): IWindow {
        return this._SafeStr_3152.create(param1, param7, param2, param3, param4, param5, param6, param10, param8, param11, param12, param9);
    }

    public destroy(param1: IWindow): void {
        param1.destroy();
    }

    public buildFromXML(param1: XML, param2: number = 1, param3: UtilsMap = null): IWindow {
        let _loc4_: IWindow = this.getWindowContext(param2).getWindowParser().parseAndConstruct(param1, null, param3);
        if (isIFrameWindow(_loc4_)) {
            castGuarded(_loc4_, isIFrameWindow, "com.sulake.core.window.components.IFrameWindow").helpButtonAction = this.openHelpPage;
        }
        return _loc4_;
    }

    public windowToXMLString(param1: IWindow): string {
        return this._SafeStr_3152.getWindowParser().windowToXMLString(param1);
    }

    public getLayoutByTypeAndStyle(param1: number, param2: number): XML {
        return this._SafeStr_2935.getWindowLayoutByTypeAndStyle(param1, param2);
    }

    public getDefaultsByTypeAndStyle(param1: number, param2: number): DefaultAttStruct {
        return this._SafeStr_2935.getDefaultAttributesByTypeAndStyle(param1, param2);
    }

    public getRendererByTypeAndStyle(param1: number, param2: number): ISkinRenderer {
        return this._SafeStr_2935.getSkinRendererByTypeAndStyle(param1, param2);
    }

    public createWindow(param1: string, param2: string = "", param3: number = 0, param4: number = 0, param5: number = 0, param6: Rectangle = null, param7: (...args: any[]) => any = null, param8: number = 0, param9: number = 1, param10: string = ""): IWindow {
        return this._windowContextArray[param9].create(param1, param2, param3, param4, param5, param6, param7, null, param8, null, null, null);
    }

    public removeWindow(param1: string, param2: number = 1): void {
        let _loc3_: IDesktopWindow = null;
        _loc3_ = this._windowContextArray[param2].getDesktopWindow();
        let _loc4_: IWindow = _loc3_.getChildByName(param1);
        if (_loc4_ != null) {
            _loc4_.destroy();
        }
    }

    public getWindowByName(param1: string, param2: number = 1): IWindow {
        return this._windowContextArray[param2].getDesktopWindow().getChildByName(param1);
    }

    public getActiveWindow(param1: number = 1): IWindow {
        return this._windowContextArray[param1].getDesktopWindow().getChildAt(this._SafeStr_3152.getDesktopWindow().numChildren - 1);
    }

    public getWindowContext(param1: number): IWindowContext {
        return this._windowContextArray[param1];
    }

    public getDesktop(param1: number): IDesktopWindow {
        let _loc2_: IWindowContext = this._windowContextArray[param1];
        return _loc2_ ? _loc2_.getDesktopWindow() : null;
    }

    public notify(param1: string, param2: string, param3: (...args: any[]) => any, param4: number = 0): INotify {
        let _loc6_: IAsset = this.assets.getAssetByName("habbo_window_alert_xml");
        if (!_loc6_) {
            throw new Error("Failed to initialize alert dialog; missing asset!");
        }
        let _loc5_: XML = asInstanceOf(_loc6_.content, XML);
        return new AlertDialog(this, _loc5_, param1, param2, param4, param3, false);
    }

    public alert(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IAlertDialog {
        let _loc6_: IAsset = this.assets.getAssetByName("habbo_window_alert_xml");
        if (!_loc6_) {
            throw new Error("Failed to initialize alert dialog; missing asset!");
        }
        let _loc5_: XML = asInstanceOf(_loc6_.content, XML);
        return new AlertDialog(this, _loc5_, param1, param2, param3, param4, false);
    }

    public alertWithModal(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IAlertDialog {
        let _loc6_: IAsset = this.assets.getAssetByName("habbo_window_alert_xml");
        if (!_loc6_) {
            throw new Error("Failed to initialize alert dialog; missing asset!");
        }
        let _loc5_: XML = asInstanceOf(_loc6_.content, XML);
        return new AlertDialog(this, _loc5_, param1, param2, param3, param4, true);
    }

    public alertWithLink(param1: string, param2: string, param3: string, param4: string, param5: number, param6: (...args: any[]) => any): IAlertDialogWithLink {
        let _loc8_: IAsset = this.assets.getAssetByName("habbo_window_alert_link_xml");
        if (!_loc8_) {
            throw new Error("Failed to initialize alert dialog; missing asset!");
        }
        let _loc7_: XML = asInstanceOf(_loc8_.content, XML);
        return new AlertDialogWithLink(this, _loc7_, param1, param2, param3, param4, param5, param6);
    }

    public confirm(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IConfirmDialog {
        let _loc6_: IAsset = this.assets.getAssetByName("habbo_window_confirm_xml");
        if (!_loc6_) {
            throw new Error("Failed to initialize aleret dialog; missing asset!");
        }
        let _loc5_: XML = asInstanceOf(_loc6_.content, XML);
        return new ConfirmDialog(this, _loc5_, param1, param2, param3, param4, false);
    }

    public confirmWithModal(param1: string, param2: string, param3: number, param4: (...args: any[]) => any): IConfirmDialog {
        let _loc6_: IAsset = this.assets.getAssetByName("habbo_window_confirm_xml");
        if (!_loc6_) {
            throw new Error("Failed to initialize alert dialog; missing asset!");
        }
        let _loc5_: XML = asInstanceOf(_loc6_.content, XML);
        return new ConfirmDialog(this, _loc5_, param1, param2, param3, param4, true);
    }

    public registerLocalizationParameter(param1: string, param2: string, param3: string, param4: string = "%"): void {
        this._localization.registerParameter(param1, param2, param3, param4);
    }

    public update(param1: number): void {
        let _loc2_: number = 0;
        if (this._SafeStr_4300) {
            this._profilerAgentTaskUpdate.start();
        }
        if (WindowContext.inputEventQueue.length > 0) {
            this.events.dispatchEvent(HabboWindowManagerComponent.TRACKING_EVENT_INPUT);
            _loc2_ = 4 - 1;
            while (_loc2_ >= 0) {
                this._windowContextArray[_loc2_].update(param1);
                _loc2_--;
            }
        }
        if (this._SafeStr_4300) {
            this._profilerAgentTaskUpdate.stop();
        }
        if (this._SafeStr_4300) {
            this._profilerAgentTaskRedraw.start();
        }
        this.events.dispatchEvent(HabboWindowManagerComponent.TRACKING_EVENT_RENDER);
        _loc2_ = 0;
        while (_loc2_ < 4) {
            this._windowContextArray[_loc2_].render(param1);
            _loc2_++;
        }
        if (this._SafeStr_4300) {
            this._profilerAgentTaskRedraw.stop();
        }
        if (WindowContext.inputEventQueue.length > 0) {
            WindowContext.inputEventQueue.flush();
        }
        MouseCursorControl.change();
        this.events.dispatchEvent(HabboWindowManagerComponent.TRACKING_EVENT_SLEEP);
    }

    public override purge(): void {
        super.purge();
        if (this._windowRenderer) {
            this._windowRenderer.purge();
        }
    }

    public addMouseEventTracker(param1: IInputEventTracker): void {
        for (const _loc2_ of this._windowContextArray ?? []) {
            _loc2_.addMouseEventTracker(param1);
        }
    }

    public removeMouseEventTracker(param1: IInputEventTracker): void {
        for (const _loc2_ of this._windowContextArray ?? []) {
            _loc2_.removeMouseEventTracker(param1);
        }
    }

    public eventReceived(param1: WindowEvent, param2: IWindow): void {
        if (param2 != null) {
            if (param1.type == "WME_CLICK") {
                ErrorReportStorage.setParameter("click_time", new Date().getTime().toString());
                ErrorReportStorage.setParameter("click_target", param2.name + ": " + param2.toString());
            } else if (param1.type == "WME_UP") {
                ErrorReportStorage.setParameter("mouse_up_time", new Date().getTime().toString());
                ErrorReportStorage.setParameter("mouse_up_target", param2.name + ": " + param2.toString());
            }
        }
    }

    private performTestCases(): void {
        Logger.log("type: " + Capabilities.playerType + " debugger: " + Capabilities.isDebugger + " version: " + Capabilities.version);
    }

    public findWindowByName(param1: string): IWindow {
        let _loc2_: IWindow = null;
        for (const _loc3_ of this._windowContextArray ?? []) {
            _loc2_ = _loc3_.findWindowByName(param1);
            if (_loc2_) {
                return _loc2_;
            }
        }
        return null;
    }

    public findWindowByTag(param1: string): IWindow {
        let _loc2_: IWindow = null;
        for (const _loc3_ of this._windowContextArray ?? []) {
            _loc2_ = _loc3_.findWindowByTag(param1);
            if (_loc2_) {
                return _loc2_;
            }
        }
        return null;
    }

    public groupWindowsWithTag(param1: string, param2: any[], param3: number = 0): number {
        let _loc4_: number = 0;
        for (const _loc5_ of this._windowContextArray ?? []) {
            _loc4_ = _loc4_ + _loc5_.groupChildrenWithTag(param1, param2, param3) >>> 0;
        }
        return _loc4_;
    }

    public getThemeManager(): IThemeManager {
        return this._SafeStr_6684;
    }

    public createUnseenItemCounter(): IWindowContainer {
        let _loc1_: IAsset = asGuarded(this.assets.getAssetByName("unseen_item_counter_xml"), isIAsset);
        let _loc2_: XML = asInstanceOf(_loc1_.content, XML);
        return asGuarded(this.buildFromXML(_loc2_), isIWindowContainer);
    }

    public createWidget(param1: string, param2: IWidgetWindow): IWidget {
        let _loc3_: any = WidgetClasses._SafeStr_2228.get(param1);
        if (_loc3_ != null) {
            return new _loc3_(param2, this);
        }
        throw new Error("Unknown widget type " + param1 + "! You might need to update Glaze to be able to work on this layout.");
    }

    public get avatarRenderer(): IAvatarRenderManager {
        return this._avatarRenderer;
    }

    public get resourceManager(): IResourceManager {
        return this._resourceManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public buildModalDialogFromXML(param1: XML): IModalDialog {
        return new ModalDialog(this, param1);
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public simpleAlert(param1: string, param2: string, param3: string, param4: string = null, param5: string = null, param6: UtilsMap = null, param7: string = null, param8: (...args: any[]) => any = null, param9: (...args: any[]) => any = null): void {
        new SimpleAlertDialog(this, param1, param2, param3, param4, param5, param6, param7, param8, param9);
    }

    public registerHintWindow(param1: string, param2: IWindow, param3: number = 1): void {
        this._hintManager.registerWindow(param1, param2, param3);
    }

    public unregisterHintWindow(param1: string): void {
        this._hintManager.unregisterWindow(param1);
    }

    public showHint(param1: string, param2: Rectangle = null): void {
        this._hintManager.showHint(param1, param2);
    }

    public hideHint(): void {
        this._hintManager.hideHint();
    }

    public hideMatchingHint(param1: string): void {
        this._hintManager.hideMatchingHint(param1);
    }

    public displayFloorPlanEditor(): void {
        if (this._bcfloorPlanEditor == null) {
            this._bcfloorPlanEditor = new BCFloorPlanEditor(this);
        }
        if (this._bcfloorPlanEditor != null) {
            this._bcfloorPlanEditor.visible = true;
        }
    }

    public openHelpPage(param1: string): void {
        if (this._SafeStr_3829 != null) {
            this._SafeStr_3829.openPage(param1);
        }
    }

    public get habboPagesStyleSheet(): StyleSheet {
        return HabboPagesViewer.styleSheet;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    protected override initInstanceFields(): void {
        this.setCommunicationManager = this.setCommunicationManager.bind(this);
        this.onConfigurationComplete = this.onConfigurationComplete.bind(this);
        this.receiveProfilerInterface = this.receiveProfilerInterface.bind(this);
        this.openHelpPage = this.openHelpPage.bind(this);
        this._SafeStr_4300 = false;
        this._isInitialized = false;
        this._SafeStr_8033 = 0;
        super.initInstanceFields();
    }

    get [IHabboWindowManager](): true {
        return true;
    }

    get [ICoreWindowManager](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
