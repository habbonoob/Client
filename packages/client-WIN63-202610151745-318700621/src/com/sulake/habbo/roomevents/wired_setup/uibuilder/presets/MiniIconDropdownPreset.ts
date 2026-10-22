import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { MiniAssetIconButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniAssetIconButtonPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class MiniIconDropdownPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::MiniIconDropdownPreset'); }

    declare private _container: IWindowContainer;

    declare private _button: MiniAssetIconButtonPreset;

    declare private _dropdown: DropdownPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: DropdownParam, param5: string, param6: string) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._dropdown = param2.createDropdown(param4);
        this._button = param2.createMiniAssetIconButtonPreset(param5, param6, this.onButtonClicked);
        this._container.addChild(this._dropdown.window);
        this._container.addChild(this._button.window);
        this._container.width = this._button.window.width;
        this._container.height = this._button.window.height;
        this._dropdown.window.x = this._container.width - this._dropdown.staticWidth;
        this._dropdown.window.y = this._container.height;
        this._dropdown.visible = false;
    }

    private onButtonClicked = (): void => {
        this._dropdown.requestOpen();
        this._dropdown.visible = false;
    };

    public get selectedId(): number {
        return this._dropdown.selectedId;
    }

    public set selectedId(param1: number) {
        this._dropdown.selectedId = param1;
    }

    public set assetName(param1: string) {
        this._button.assetName = param1;
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    protected override get childPresets(): any[] {
        return [this._button, this._dropdown];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._button = null;
        this._dropdown = null;
    }
}
