import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextualButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextualButtonPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class AdvancedSettingsWrapperPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.main_layout::AdvancedSettingsWrapperPreset'); }

    declare private _container: IItemListWindow;

    private _button: TextualButtonPreset = null;
    private _SafeStr_3197: WiredUIPreset = null;

    declare private _subsectionsPreset: SimpleListViewPreset;

    private _isExpanded: boolean = false;
    private _alwaysExpanded: boolean = false;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: boolean) {
        super(param1, param2, param3);
        this._alwaysExpanded = param5;
        this._container = asGuarded(param2.createLayout("vertical_list_view"), isIItemListWindow);
        this._container.spacing = param3.sectionSpacing;
        this._subsectionsPreset = this._presetManager.createSimpleListView(true, param4);
        this._subsectionsPreset.spacing = param3.sectionSpacing;
        this._subsectionsPreset.backgroundColor = param3.advancedBackgroundColor;
        this.blendingBackgroundColor = param3.backgroundColor | 0;
        if (!param5) {
            this._button = this._presetManager.createTextualButtonPreset("${wiredfurni.params.sources.expand}", this.expandOrCollapse);
            this._SafeStr_3197 = this._button.alignCenter();
            this._container.addListItem(this._SafeStr_3197.window);
        } else {
            this.expanded = true;
        }
    }

    public set expanded(param1: boolean) {
        if (this._isExpanded != param1 && !(this._alwaysExpanded && this._isExpanded)) {
            this.expandOrCollapse();
        }
    }

    private expandOrCollapse = (): void => {
        if (this._isExpanded) {
            this._container.removeListItem(this._subsectionsPreset.window);
            this._isExpanded = false;
            this.blendingBackgroundColor = this._SafeStr_2144.backgroundColor | 0;
        } else {
            this._container.addListItem(this._subsectionsPreset.window);
            this._isExpanded = true;
            this.blendingBackgroundColor = this._SafeStr_2144.advancedBackgroundColor | 0;
        }
        if (this._button != null) {
            this._button.text = this._isExpanded ? "${wiredfurni.params.sources.collapse}" : "${wiredfurni.params.sources.expand}";
            this._SafeStr_3197.resizeToWidth(this._container.width);
        }
    };

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
        if (this._SafeStr_3197 != null) {
            this._SafeStr_3197.resizeToWidth(param1);
        }
        this._subsectionsPreset.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        if (this._SafeStr_3197 == null) {
            return [this._subsectionsPreset];
        }
        return [this._SafeStr_3197, this._subsectionsPreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._button = null;
        this._SafeStr_3197 = null;
        this._subsectionsPreset = null;
    }
}
