import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICore } from '@/com/sulake/core/runtime/ICore';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IProfiler } from '@/com/sulake/core/runtime/IProfiler';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { ProfilerAgentTask } from '@/com/sulake/core/utils/profiler/ProfilerAgentTask';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowRenderer } from '@/com/sulake/core/window/graphics/IWindowRenderer';
import type { ICoreWindowManager } from '@/com/sulake/core/window/ICoreWindowManager';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IDevTool } from '@/com/sulake/core/window/tools/IDevTool';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICore } from '@/com/sulake/core/runtime/ICore';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IIDProfiler } from '@/com/sulake/core/runtime/IIDProfiler';
import { isIProfiler } from '@/com/sulake/core/runtime/IProfiler';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isILabelWindow } from '@/com/sulake/core/window/components/ILabelWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

const profiler_dialog_xml_binAsset = embedBytes("core/profiler_dialog_xml.bin");
const profiler_task_xml_binAsset = embedBytes("core/profiler_task_xml.bin");

export class ProfilerOutput implements IDevTool {
    static { registerClassName(this, 'com.sulake.core.window.tools::ProfilerOutput'); }

    private static readonly ZERO_POINT: Point = new Point();

    private static profiler_dialog_xml = profiler_dialog_xml_binAsset;

    private static profiler_task_xml = profiler_task_xml_binAsset;

    private _disposed: boolean = false;

    declare private _profilerComponent: IProfiler;

    declare private _core: ICore;

    declare private _window: IFrameWindow;

    declare private _windowItemArray: any[];

    declare private _windowManager: ICoreWindowManager;

    declare private _windowRenderer: IWindowRenderer;

    private _memoryTracking: boolean = false;

    declare private _windowToTaskMap: UtilsMap;

    constructor(param1: IContext, param2: ICoreWindowManager, param3: IWindowRenderer) {
        this._core = isICore(param1) ? param1 : null;
        this._windowItemArray = [];
        this._profilerComponent = this.profiler;
        this._windowManager = param2;
        this._windowRenderer = param3;
        this._windowToTaskMap = new UtilsMap();
    }

    private static padAlign(param1: string, param2: number, param3: string = " ", param4: boolean = false): string {
        let _loc6_: number = 0;
        let _loc5_: number = param2 - param1.length;
        if (_loc5_ <= 0) {
            return param1.substring(0, param2);
        }
        let _loc7_: string = "";
        _loc6_ = 0;
        while (_loc6_ < _loc5_) {
            _loc7_ += param3;
            _loc6_++;
        }
        return param4 ? _loc7_ + param1 : param1 + _loc7_;
    }

    public get caption(): string {
        return "Component Profiler";
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get visible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public set visible(param1: boolean) {
        let bytes: ByteArray;
        let xml: XML;
        let value: boolean = param1;
        if (!this._window && value) {
            bytes = asInstanceOf(new ProfilerOutput.profiler_dialog_xml(), ByteArray);
            xml = new XML(bytes.readUTFBytes(bytes.length));
            this._window = asGuarded(this._windowManager.buildFromXML(xml, 2), isIFrameWindow);
            this._window.procedure = this.profilerWindowEventProc;
            this._window.findChildByName("header").caption = ProfilerOutput.padAlign("task", 28) + "|" + ProfilerOutput.padAlign("#rounds", 8) + "|" + ProfilerOutput.padAlign("latest ms", 8) + "|" + ProfilerOutput.padAlign("total ms", 8) + "|";
            this._window.findChildByName("footer").caption = "<- Click to enable bitmap memory tracking";
            castGuarded(this._window.findChildByName("footer"), isILabelWindow, "com.sulake.core.window.components.ILabelWindow").textColor = 4284900966;
        }
        if (this._window) {
            if (value) {
                this._window.activate();
                this._core.setProfilerMode(true);
                this._core.queueInterface(new IIDProfiler(), (param1: IID, param2: IUnknown): void => {
                   this.profiler = isIProfiler(param2) ? param2 : null;
               });
            } else {
                this._core.setProfilerMode(false);
                this._window.dispose();
                this._window = null;
            }
        }
    }

    public set profiler(param1: IProfiler) {
        if (this._profilerComponent) {
            this._profilerComponent.removeStopEventListener(this.refresh);
            this._profilerComponent = null;
        }
        if (!this._profilerComponent && param1) {
            this._profilerComponent = param1;
            this._profilerComponent.addStopEventListener(this.refresh);
        }
    }

    public get profiler(): IProfiler {
        return this._profilerComponent;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
            this._profilerComponent.removeStopEventListener(this.refresh);
            this._profilerComponent = null;
            this._windowManager = null;
            this._windowRenderer = null;
            this._windowToTaskMap.dispose();
            this._windowToTaskMap = null;
            this._disposed = true;
        }
    }

    private profilerWindowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (param2.tags.indexOf("close") > -1) {
                this.visible = false;
            } else if (param2.name == "button_gc") {
                this._profilerComponent.gc();
            }
        }
        if (param2.name == "footer_enable_toggle") {
            if (param1.type == "WE_SELECTED") {
                this._memoryTracking = true;
                castGuarded(this._window.findChildByName("footer"), isILabelWindow, "com.sulake.core.window.components.ILabelWindow").textColor = 4278190080;
            } else if (param1.type == "WE_UNSELECTED") {
                this._memoryTracking = false;
                castGuarded(this._window.findChildByName("footer"), isILabelWindow, "com.sulake.core.window.components.ILabelWindow").textColor = 4284900966;
            }
        }
    };

    public refresh = (param1: Event): void => {
        if (!this._window) {
            return;
        }
        this._windowToTaskMap.reset();
        let _loc4_: any[] = this._profilerComponent.getProfilerAgentsInArray();
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
        let _loc2_: number = 0;
        while (_loc4_.length > 0) {
            _loc2_ = this.recursiveRedraw(_loc4_.pop(), _loc3_, _loc2_, 0);
        }
        if (this._memoryTracking) {
            this._window.findChildByName("footer").caption = "Assets - Libraries: " + this._profilerComponent.numAssetLibraryInstances + " " + "Bitmaps: " + this._profilerComponent.numBitmapAssetInstances + " / " + this._profilerComponent.numAllocatedBitmapDataBytes + " bytes \n" + "Tracked bitmap data: " + this._profilerComponent.numTrackedBitmapDataInstances + " / " + this._profilerComponent.numTrackedBitmapDataBytes + " bytes";
        }
    };

    private recursiveRedraw(param1: ProfilerAgentTask, param2: IItemListWindow, param3: number, param4: number): number {
        let _loc5_: IWindowContainer = null;
        let _loc6_: IBitmapWrapperWindow = null;
        let _loc8_: any = 0;
        if (param3 >= param2.numListItems) {
            _loc5_ = this.createListItem(param2);
        } else {
            _loc5_ = asGuarded(param2.getListItemAt(param3), isIWindowContainer);
        }
        let _loc7_: string = param1.name;
        if (param4 > 0) {
            _loc7_ = ProfilerOutput.padAlign(_loc7_, param4 + _loc7_.length, "-", true);
        }
        let _loc9_: IWindow = asGuarded(_loc5_.findChildByName("text"), isIWindow);
        _loc9_.caption = ProfilerOutput.padAlign(_loc7_, 28, " ", false) + "|" + ProfilerOutput.padAlign(String(param1.rounds), 8, " ", true) + "|" + ProfilerOutput.padAlign(String(param1.latest), 8, " ", true) + "|" + ProfilerOutput.padAlign(String(param1.total), 8, " ", true) + "|\r";
        _loc5_.findChildByName("caption").caption = param1.caption;
        _loc5_.findChildByName("check").setStateFlag(8, !param1.paused);
        this._windowToTaskMap.add(_loc5_, param1);
        if (!param1.paused) {
            _loc6_ = asGuarded(_loc5_.findChildByName("canvas"), isIBitmapWrapperWindow);
            this.refreshBitmapImage(_loc6_, param1);
        }
        param3++;
        _loc8_ = 0;
        while (_loc8_ < param1.numSubTasks) {
            param3 = this.recursiveRedraw(param1.getSubTaskAt(_loc8_ >>> 0), param2, param3, param4 + 1 >>> 0);
            _loc8_++;
        }
        return param3;
    }

    private refreshBitmapImage(param1: IBitmapWrapperWindow, param2: ProfilerAgentTask): void {
        let _loc4_: BitmapData = param1.bitmap;
        if (_loc4_ == null) {
            _loc4_ = new BitmapData(param1.width, param1.height, false, 4294967295);
            param1.bitmap = _loc4_;
        }
        let _loc3_: Rectangle = _loc4_.rect;
        let _loc6_: number = param2.latest;
        let _loc5_: number = _loc6_ > _loc4_.height ? _loc4_.height : _loc6_;
        _loc3_.x += 1;
        _loc3_.width -= 1;
        _loc4_.copyPixels(_loc4_, _loc3_, ProfilerOutput.ZERO_POINT);
        _loc3_.x += _loc3_.width - 2;
        _loc3_.y += _loc3_.height - _loc5_;
        _loc3_.width = 1;
        _loc3_.height = _loc5_;
        _loc4_.fillRect(_loc3_, _loc6_ > _loc4_.height ? 4294901760 : 4278190335);
        param1.invalidate();
    }

    private createListItem(param1: IItemListWindow): IWindowContainer {
        let _loc3_: ByteArray = null;
        _loc3_ = asInstanceOf(new ProfilerOutput.profiler_task_xml(), ByteArray);
        let _loc4_: XML = new XML(_loc3_.readUTFBytes(_loc3_.length));
        let _loc2_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(_loc4_, 2), isIWindowContainer);
        param1.addListItem(_loc2_);
        let _loc5_: IWindow = _loc2_.findChildByName("check");
        _loc5_.addEventListener("WME_CLICK", this.onCheckMouseClick);
        return _loc2_;
    }

    private onCheckMouseClick = (param1: WindowEvent): void => {
        let _loc3_: IWindow = param1.window;
        let _loc2_: ProfilerAgentTask = this._windowToTaskMap.getValue(_loc3_.parent);
        if (_loc2_) {
            _loc2_.paused = !_loc3_.getStateFlag(8);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
