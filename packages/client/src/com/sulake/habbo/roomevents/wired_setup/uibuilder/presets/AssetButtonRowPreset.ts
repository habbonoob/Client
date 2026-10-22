import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { AssetButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/AssetButtonPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VerticalSplitterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VerticalSplitterPreset';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class AssetButtonRowPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::AssetButtonRowPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[]) {
        let _loc5_: AssetButtonPreset = null;
        let _loc6_: number = 0;
        super(param1, param2, param3);
        this._buttons = [];
        this._elements = [];
        for (const _loc7_ of param4 ?? []) {
            _loc5_ = param2.createAssetButtonPreset(stringOrNull(_loc7_.assetName), stringOrNull(_loc7_.tooltip), _loc7_.onClick);
            this._buttons.push(_loc5_);
            if (_loc7_.alignRight) {
                this._elements.push(_loc5_.alignRight());
            } else {
                this._elements.push(_loc5_);
            }
            if (_loc7_.isFollowedBySplitter) {
                _loc6_ = _loc5_.window.height;
                if (_loc6_ == 0) {
                    throw new Error("AssetButtonRowPreset requires button height to resolve splitter height");
                }
                this._elements.push(new VerticalSplitterPreset(param1, param2, param3, _loc6_));
            }
        }
        this._SafeStr_2221 = param2.createSimpleListView(false, this._elements);
        this._SafeStr_2221.spacing = param3.genericHorizontalSpacing;
        this._container = asGuarded(param2.createLayout("growing_container_view"), isIWindowContainer);
        this._container.addChild(this._SafeStr_2221.window);
    }

    declare private _container: IWindowContainer;

    declare private _SafeStr_2221: SimpleListViewPreset;

    declare private _buttons: AssetButtonPreset[];

    declare private _elements: any[];

    public override get window(): IWindow {
        return this._container;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2221];
    }

    public get buttons(): AssetButtonPreset[] {
        return this._buttons;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2221.resizeToWidth(param1);
        this._container.width = this._SafeStr_2221.window.width;
        this._container.height = this._SafeStr_2221.window.height;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._SafeStr_2221 = null;
        this._buttons = null;
        this._elements = null;
    }
}
