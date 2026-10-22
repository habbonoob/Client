import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { MessageEditorColorSwatchView } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/MessageEditorColorSwatchView';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MessageEditorPalettePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::MessageEditorPalettePreset'); }

    private static readonly COLOR_OPTIONS: any[] = [["red", 9115929, 10239036, "${wiredfurni.params.message_editor.color.red.tooltip}"], ["orange", 10238720, 11229215, "${wiredfurni.params.message_editor.color.orange.tooltip}"], ["yellow", 7297792, 8746022, "${wiredfurni.params.message_editor.color.yellow.tooltip}"], ["green", 32768, 2528038, "${wiredfurni.params.message_editor.color.green.tooltip}"], ["cyan", 32639, 2527890, "${wiredfurni.params.message_editor.color.cyan.tooltip}"], ["blue", 19609, 2516904, "${wiredfurni.params.message_editor.color.blue.tooltip}"], ["purple", 4980812, 6760039, "${wiredfurni.params.message_editor.color.purple.tooltip}"], ["pink", 10228827, 11220852, "${wiredfurni.params.message_editor.color.pink.tooltip}"]];

    declare private _container: IWindowContainer;

    declare private _SafeStr_14345: (...args: any[]) => any;

    declare private _SafeStr_14374: (...args: any[]) => any;

    declare private _swatches: MessageEditorColorSwatchView[];

    declare private _SafeStr_14375: boolean;
    static { (this.prototype as any)._SafeStr_14375 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any, param5: (...args: any[]) => any) {
        let _loc7_: MessageEditorColorSwatchView = null;
        super(param1, param2, param3);
        this._SafeStr_14345 = param4;
        this._SafeStr_14374 = param5;
        this._container = param3.createMessageEditorPalette();
        this._container.enableLookupCache();
        this._container.visible = false;
        this._swatches = [];
        let _loc6_: IRegionWindow = asGuarded(this.swatchList.removeListItem(this.swatchList.findChildByName("swatch_template")), isIRegionWindow);
        for (const _loc8_ of MessageEditorPalettePreset.COLOR_OPTIONS ?? []) {
            _loc7_ = new MessageEditorColorSwatchView(asGuarded(_loc6_.clone(), isIRegionWindow), stringOrNull(_loc8_[0]), _loc8_[1] >>> 0, _loc8_[2] >>> 0, stringOrNull(_loc8_[3]), this.onSwatchSelected, this.onSwatchHoverChanged);
            this._swatches.push(_loc7_);
            this.swatchList.addListItem(_loc7_.window);
        }
        _loc6_.dispose();
    }

    public toggle(): void {
        this.visible = !this.visible;
    }

    public hide(): void {
        this.onSwatchHoverChanged(false);
        this.visible = false;
    }

    public get isOpen(): boolean {
        return this.visible;
    }

    private onSwatchSelected = (param1: string, param2: number): void => {
        this.hide();
        this._SafeStr_14345(param1, param2);
    };

    private onSwatchHoverChanged = (param1: boolean): void => {
        if (this._SafeStr_14375 == param1) {
            return;
        }
        this._SafeStr_14375 = param1;
        this._SafeStr_14374(param1);
    };

    public override get window(): IWindow {
        return this._container;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide();
        for (const _loc1_ of this._swatches ?? []) {
            this.swatchList.removeListItem(_loc1_.window);
            _loc1_.dispose();
        }
        this._container.dispose();
        this._container = null;
        this._SafeStr_14345 = null;
        this._SafeStr_14374 = null;
        this._swatches = null;
        super.dispose();
    }

    private get swatchList(): IItemListWindow {
        return asGuarded(this._container.findChildByName("swatch_list"), isIItemListWindow);
    }
}
