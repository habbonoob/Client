import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';

export class AvatarImagePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::AvatarImagePreset'); }

    declare private _container: IWindowContainer;

    declare private _avatarWidget: IAvatarImageWidget;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._container = asGuarded(param2.createLayout("avatar_image_view"), isIWindowContainer);
        let _loc4_: IWidgetWindow = asGuarded(this._container.findChildByName("avatar_image"), isIWidgetWindow);
        if (_loc4_ != null) {
            this._avatarWidget = asGuarded(_loc4_.widget, isIAvatarImageWidget);
        }
    }

    public set figure(param1: string) {
        if (this._avatarWidget != null) {
            this._avatarWidget.figure = param1;
        }
    }

    public get figure(): string {
        return this._avatarWidget?.figure;
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

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._avatarWidget = null;
    }
}
