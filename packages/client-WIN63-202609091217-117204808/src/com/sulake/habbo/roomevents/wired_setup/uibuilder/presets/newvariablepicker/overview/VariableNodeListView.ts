import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { IScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import type { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import type { VariableNode } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNode';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIScrollableListWindow } from '@/com/sulake/core/window/components/IScrollableListWindow';
import { VariableNodeView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/overview/VariableNodeListView.group';

export class VariableNodeListView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.newvariablepicker.overview::VariableNodeListView'); }

    private static MAX_HEIGHT: number = 300;
    private static SCROLLBAR_WIDTH: number = 9;

    declare private _window: IBorderWindow;

    declare private _picker: NewVariablePicker;

    declare private _childNodes: VariableNodeView[];

    declare private _currentHoveredNode: VariableNodeView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: NewVariablePicker, param2: VariableNode[], param3: number, param4: boolean = false) {
        let _loc7_: VariableNodeView = null;
        let _loc8_: number = 0;
        let _loc5_: VariableNode = null;
        let _loc6_: number = 0;
        let _loc9_: number = 0;
        this._picker = param1;
        this._window = asGuarded(param1.expandedView.overviewTemplate.clone(), isIBorderWindow);
        if (!param4) {
            this._window.style = 12;
        }
        this._childNodes = [];
        this._window.width = param3;
        if (param2 != null && param2.length > 0) {
            _loc8_ = 0;
            while (_loc8_ < param2.length) {
                _loc5_ = param2[_loc8_];
                _loc7_ = new VariableNodeView(_loc5_, this._picker, this, _loc8_);
                this.nodesList.addListItem(_loc7_.window);
                this._childNodes.push(_loc7_);
                _loc8_ += 1;
            }
            _loc6_ = this._childNodes[0].window.height * param2.length;
            this.nodesList.height = Math.min(_loc6_, VariableNodeListView.MAX_HEIGHT) | 0;
            _loc9_ = param3 - this.scrollbarWidth;
            if (!param4) {
                _loc9_ -= 3;
            }
            for (_loc7_ of this._childNodes ?? []) {
                _loc7_.window.width = _loc9_;
                if (!param4) {
                    _loc7_.window.x = 1;
                }
            }
        } else {
            this.nodesList.height = 10;
        }
    }

    public get scrollbarWidth(): number {
        return this.nodesList.isScrollBarVisible ? VariableNodeListView.SCROLLBAR_WIDTH : 0;
    }

    public setHover(param1: VariableNodeView): void {
        if (param1 == this._currentHoveredNode) {
            return;
        }
        if (this._currentHoveredNode != null) {
            this._currentHoveredNode.hover = false;
            this._currentHoveredNode = null;
        }
        if (param1 != null) {
            this._currentHoveredNode = param1;
            param1.hover = true;
        }
    }

    public get childNodes(): VariableNodeView[] {
        return this._childNodes;
    }

    public get window(): IBorderWindow {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        for (const _loc1_ of this._childNodes ?? []) {
            _loc1_.dispose();
        }
        this.nodesList.removeListItems();
        this._childNodes = null;
        this._picker = null;
        this._window.dispose();
        this._window = null;
        this._currentHoveredNode = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get nodesList(): IScrollableListWindow {
        return asGuarded(this._window.findChildByName("nodes_list"), isIScrollableListWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
