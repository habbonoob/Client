import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class StaticBitmapAssetWrapperPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::StaticBitmapAssetWrapperPreset'); }

    declare private _container: IStaticBitmapWrapperWindow;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("static_bitmap_view"), isIStaticBitmapWrapperWindow);
        this._container.assetUri = param4;
    }

    public override get window(): IWindow {
        return this._container;
    }

    public get assetUri(): string {
        return this._container.assetUri;
    }

    public set assetUri(param1: string) {
        this._container.assetUri = param1;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
    }
}
