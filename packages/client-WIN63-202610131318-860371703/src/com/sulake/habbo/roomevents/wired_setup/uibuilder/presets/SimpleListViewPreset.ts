import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { IListPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/IListPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class SimpleListViewPreset extends WiredUIPreset implements IListPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::SimpleListViewPreset'); }

    declare private _container: IItemListWindow;

    declare private _elements: WiredUIPreset[];

    declare private _vertical: boolean;
    static { (this.prototype as any)._vertical = false; }

    declare private _center: boolean;
    static { (this.prototype as any)._center = false; }

    declare private _allChildrenStaticWidth: boolean;
    static { (this.prototype as any)._allChildrenStaticWidth = false; }

    declare private _staticWidth: number;
    static { (this.prototype as any)._staticWidth = 0; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: boolean, param5: any[], param6: boolean) {
        let _loc7_: any;
        super(param1, param2, param3);
        this._container = param4 ? asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow) : asGuarded(param2.createLayout("horizontal_list_view"), isIItemListWindow);
        this._vertical = param4;
        this._center = param6;
        this._container.spacing = param4 ? param3.genericHorizontalSpacing : param3.genericVerticalSpacing;
        this._elements = [];
        for (_loc7_ of param5 ?? []) {
            this._elements.push(_loc7_);
            this._container.addListItem(_loc7_.window);
            _loc7_.invisibilityListener = this;
        }
        if (!param4) {
            this._allChildrenStaticWidth = true;
            this._staticWidth = 0;
            for (_loc7_ of this._elements ?? []) {
                if (!_loc7_.hasStaticWidth()) {
                    this._allChildrenStaticWidth = false;
                    break;
                }
                this._staticWidth += _loc7_.staticWidth;
            }
            if (this._allChildrenStaticWidth && this._elements.length > 1) {
                this._staticWidth += this._container.spacing * (this._elements.length - 1);
            }
            if (this._allChildrenStaticWidth) {
                this._container.width = this._staticWidth;
            }
        }
    }

    protected override onInvisibilityChanged(param1: WiredUIPreset, param2: boolean): void {
        this._container.arrangeListItems();
        this.resize();
    }

    public override get window(): IWindow {
        return this._container;
    }

    public set spacing(param1: number) {
        this._container.spacing = param1;
    }

    public get spacing(): number {
        return this._container.spacing;
    }

    public set minHeight(param1: number) {
        this._container.limits.minHeight = param1;
    }

    public override resizeToWidth(param1: number): void {
        let _loc7_: any = null;
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        let _loc9_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        super.resizeToWidth(param1);
        let _loc6_: number = 0;
        for (_loc7_ of this._elements ?? []) {
            if (_loc7_.visible) {
                _loc6_ += 1;
            }
        }
        if (this._vertical) {
            this._container.width = param1;
            for (_loc7_ of this._elements ?? []) {
                _loc7_.resizeToWidth(param1);
            }
            if (this._center) {
                throw new Exception("Centering vertical lists not implemented yet");
            }
        } else {
            _loc8_ = this._allChildrenStaticWidth ? this._staticWidth : param1;
            _loc5_ = _loc8_ - (_loc6_ - 1) * this._container.spacing;
            _loc3_ = 0;
            for (_loc7_ of this._elements ?? []) {
                if (_loc7_.visible) {
                    if (_loc7_.hasStaticWidth()) {
                        _loc5_ -= _loc7_.staticWidth;
                    } else {
                        _loc3_ += 1;
                    }
                }
            }
            _loc9_ = Math.max(0, _loc5_ / _loc3_ | 0) | 0;
            _loc2_ = this._container.limits.minHeight;
            for (_loc7_ of this._elements ?? []) {
                if (_loc7_.visible) {
                    if (_loc7_.hasStaticWidth()) {
                        _loc7_.resizeToWidth(_loc7_.staticWidth);
                    } else {
                        _loc7_.resizeToWidth(_loc9_);
                    }
                    _loc4_ = _loc7_.window.height;
                    if (_loc4_ > _loc2_) {
                        _loc2_ = _loc4_;
                    }
                }
            }
            if (this._center) {
                for (_loc7_ of this._elements ?? []) {
                    _loc7_.window.y = _loc2_ / 2 - _loc7_.window.height / 2 | 0;
                }
            }
            this._container.width = _loc8_;
            this._container.height = _loc2_;
        }
    }

    public set backgroundColor(param1: number) {
        this._container.background = true;
        this._container.color = (0xFF000000 | param1) >>> 0;
    }

    protected override get childPresets(): any[] {
        return WiredUIPreset.toArray(this._elements);
    }

    public override hasStaticWidth(): boolean {
        return this._allChildrenStaticWidth;
    }

    public override get staticWidth(): number {
        if (!this._allChildrenStaticWidth) {
            return -1;
        }
        return this._staticWidth;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._elements = null;
    }
}
