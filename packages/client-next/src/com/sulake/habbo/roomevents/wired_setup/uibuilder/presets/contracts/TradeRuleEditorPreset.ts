import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { TradeRequirementNode } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/nodes/TradeRequirementNode';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { TradeRequirementRule } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/trade/requirements/rules/TradeRequirementRule';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { TradeRuleNodeView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/contracts/TradeRuleNodeView';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class TradeRuleEditorPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.contracts::TradeRuleEditorPreset'); }

    static #staticsReady = false;

    private static readonly NODE_VIEW_POOL_MAX_SIZE: number = 50;
    public static readonly MAX_NODES_IN_RULE: number = 5;

    public static get NODE_VIEW_POOL(): UtilsMap {
        TradeRuleEditorPreset.#initStatics();
        return TradeRuleEditorPreset.NODE_VIEW_POOL;
    }

    declare private _container: IWindow;

    declare private _nodeTemplate: IRegionWindow;

    declare private _SafeStr_2645: TradeRuleNodeView[];

    declare private _SafeStr_4541: (...args: any[]) => any;

    declare private _SafeStr_4352: (...args: any[]) => any;

    declare private _SafeStr_4231: (...args: any[]) => any;

    declare private _SafeStr_4407: (...args: any[]) => any;

    private _hovered: boolean = false;
    private _SafeStr_4163: boolean = false;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: (...args: any[]) => any, param6: (...args: any[]) => any, param7: (...args: any[]) => any = null, param8: (...args: any[]) => any = null) {
        super(param1, param2, param3);
        this._container = param3.createTradeRequirementRule();
        this._SafeStr_2645 = [];
        this._SafeStr_4541 = param5;
        this._SafeStr_4352 = param6;
        this._SafeStr_4231 = param7;
        this._SafeStr_4407 = param8;
        this.updateTitle(param4);
        let _loc9_: IItemGridWindow = this.itemGrid;
        this._nodeTemplate = asGuarded(_loc9_.removeGridItemAt(0), isIRegionWindow);
        this.addMoreButton.addEventListener("WME_CLICK", this.onAddMoreClicked);
        this._container.addEventListener("WME_OVER", this.onHover);
        this._container.addEventListener("WME_OUT", this.onHoverEnd);
        this.closeRegion.addEventListener("WME_OVER", this.onCloseHover);
        this.closeRegion.addEventListener("WME_OUT", this.onCloseHoverEnd);
        this.closeRegion.addEventListener("WME_CLICK", this.onCloseClick);
        if (this.isOneLineMode) {
            _loc9_.setParamFlag(8388608, false);
        }
        this.updateCloseButtonVisibility();
    }

    protected get isOneLineMode(): boolean {
        return true;
    }

    protected get showNodeCloseButton(): boolean {
        return true;
    }

    public set rule(param1: TradeRequirementRule) {
        this.removaAllNodes();
        for (const _loc2_ of param1.nodes ?? []) {
            this.addNode(_loc2_);
        }
    }

    private onAddMoreClicked = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_4352 != null) {
            this._SafeStr_4352(this);
        }
    };

    public editNode(param1: TradeRuleNodeView): void {
        let _loc2_: number = this.itemGrid.getGridItemIndex(param1.window);
        if (_loc2_ == -1) {
            return;
        }
        let _loc3_: number = param1.uniqueID | 0;
        if (this._SafeStr_4541 != null) {
            this._SafeStr_4541(this, _loc3_, param1.node);
        }
    }

    public updateTitle(param1: string): void {
        this.titleWindow.text = param1;
    }

    private fireOnChange(): void {
        if (this._SafeStr_4407 != null) {
            this._SafeStr_4407();
        }
    }

    public addNode(param1: TradeRequirementNode): void {
        if (this.disposed) {
            return;
        }
        let _loc3_: IItemGridWindow = this.itemGrid;
        let _loc2_: TradeRuleNodeView = this.createNodeView(param1.deepCopy(), this.showNodeCloseButton);
        _loc3_.addGridItemAt(_loc2_.window, _loc3_.numGridItems - 1 >>> 0);
        this._SafeStr_2645.push(_loc2_);
        this.onNodeCountChange();
    }

    private createNodeView(param1: TradeRequirementNode, param2: boolean = true): TradeRuleNodeView {
        let _loc3_: TradeRuleNodeView = null;
        let _loc4_: WiredStyle = this._SafeStr_2144;
        if (!TradeRuleEditorPreset.NODE_VIEW_POOL.hasKey(_loc4_.name)) {
            TradeRuleEditorPreset.NODE_VIEW_POOL.add(_loc4_.name, []);
        }
        let _loc5_: TradeRuleNodeView[] = TradeRuleEditorPreset.NODE_VIEW_POOL.getValue(_loc4_.name);
        if (_loc5_.length > 0) {
            _loc3_ = _loc5_.pop();
        } else {
            _loc3_ = new TradeRuleNodeView(this.nodeTemplate);
        }
        _loc3_.initialize(this, param1, param2);
        return _loc3_;
    }

    private releaseNodeView(param1: TradeRuleNodeView): void {
        let _loc2_: WiredStyle = this._SafeStr_2144;
        if (!TradeRuleEditorPreset.NODE_VIEW_POOL.hasKey(_loc2_.name)) {
            TradeRuleEditorPreset.NODE_VIEW_POOL.add(_loc2_.name, []);
        }
        let _loc3_: TradeRuleNodeView[] = TradeRuleEditorPreset.NODE_VIEW_POOL.getValue(_loc2_.name);
        if (_loc3_.length >= 50) {
            param1.dispose();
        } else {
            param1.release();
            _loc3_.push(param1);
        }
    }

    public updateNode(param1: number, param2: TradeRequirementNode): void {
        if (this.disposed) {
            return;
        }
        let _loc3_: TradeRuleNodeView = this.getNodeViewByUniqueId(param1);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.node = param2;
        this.fireOnChange();
    }

    public finalizeRule(): TradeRequirementRule {
        let _loc2_: TradeRequirementNode[] = [];
        for (const _loc1_ of this._SafeStr_2645 ?? []) {
            _loc2_.push(_loc1_.node);
        }
        return new TradeRequirementRule(_loc2_);
    }

    private getNodeViewByUniqueId(param1: number): TradeRuleNodeView {
        for (const _loc2_ of this._SafeStr_2645 ?? []) {
            if (_loc2_.uniqueID == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public removeNode(param1: TradeRuleNodeView): void {
        let _loc2_: number = this._SafeStr_2645.indexOf(param1);
        if (_loc2_ == -1) {
            return;
        }
        this._SafeStr_2645.splice(_loc2_, 1)[0];
        this.itemGrid.removeGridItem(param1.window);
        this.releaseNodeView(param1);
        this.onNodeCountChange();
    }

    private removaAllNodes(): void {
        if (this.addMoreButton != null) {
            while (this.itemGrid.numGridItems > 1) {
                this.itemGrid.removeGridItemAt(0);
            }
        } else {
            this.itemGrid.removeGridItems();
        }
        for (const _loc1_ of this._SafeStr_2645 ?? []) {
            this.releaseNodeView(_loc1_);
        }
        this._SafeStr_2645 = [];
        this.onNodeCountChange();
    }

    protected onNodeCountChange(): void {
        this.itemGrid.rebuildGridStructure();
        if (this.addMoreButton != null) {
            if (this.isOneLineMode) {
                this.addMoreButton.visible = this._SafeStr_2645.length < 5;
            } else {
                Util.disableSection(this.addMoreButton, this._SafeStr_2645.length >= 5);
            }
        }
        this.fireOnChange();
    }

    private onCloseClick = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_4231 != null) {
            this._SafeStr_4231(this);
        }
    };

    private onHoverEnd = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.updateCloseButtonVisibility();
    };

    private onHover = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.updateCloseButtonVisibility();
    };

    private onCloseHoverEnd = (param1: WindowMouseEvent): void => {
        this._SafeStr_4163 = false;
        this.updateCloseButtonVisibility();
    };

    private onCloseHover = (param1: WindowMouseEvent): void => {
        this._SafeStr_4163 = true;
        this.updateCloseButtonVisibility();
    };

    protected updateCloseButtonVisibility(): void {
        this.closeRegion.visible = (this._hovered || this._SafeStr_4163) && this._SafeStr_4231 != null;
    }

    public get nodeTemplate(): IRegionWindow {
        return this._nodeTemplate;
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
    }

    protected override get childPresets(): any[] {
        return [];
    }

    public override dispose(): void {
        this.removaAllNodes();
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2645 = null;
        this._SafeStr_4541 = null;
        this._SafeStr_4352 = null;
        this._SafeStr_4231 = null;
        this._nodeTemplate.dispose();
        this._nodeTemplate = null;
        this._container.dispose();
        this._container = null;
    }

    protected get itemGrid(): IItemGridWindow {
        return asGuarded(this._container.findChildByName("grid"), isIItemGridWindow);
    }

    protected get titleWindow(): ITextWindow {
        return asGuarded(this._container.findChildByName("title"), isITextWindow);
    }

    protected get addMoreContainer(): IWindowContainer {
        return asGuarded(this._container.findChildByName("add_more_container"), isIWindowContainer);
    }

    protected get addMoreButton(): IIconButtonWindow {
        return asGuarded(this._container.findChildByName("add_more"), isIIconButtonWindow);
    }

    protected get closeRegion(): IRegionWindow {
        return asGuarded(this._container.findChildByName("close_rule_region"), isIRegionWindow);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TradeRuleEditorPreset.#staticsReady) return;
        TradeRuleEditorPreset.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TradeRuleEditorPreset, name, { value, writable: true, configurable: true, enumerable: true });
        set("NODE_VIEW_POOL", null);
        set("NODE_VIEW_POOL", new UtilsMap());
    }
}
