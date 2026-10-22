import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';

export class PermanentVariableHolderPreviewer implements IGetImageListener, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.variables_management.detail::PermanentVariableHolderPreviewer'); }

    public static centerContainer(param1: IWindow): void {
        param1.x = param1.parent.width / 2 - param1.width / 2 | 0;
        param1.y = param1.parent.height / 2 - param1.height / 2 | 0;
    }

    constructor(param1: IWindowContainer, param2: WiredMenuController) {
        this._container = param1;
        this._controller = param2;
        this.clearPreviewer();
        this.previewAvatarRegion.addEventListener("WME_CLICK", this.onPreviewAvatarClicked);
    }

    declare private _container: IWindowContainer;

    declare private _controller: WiredMenuController;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get previewAvatarWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("avatar_preview"), isIWidgetWindow);
    }

    private get previewAvatarRegion(): IRegionWindow {
        return asGuarded(this._container.findChildByName("avatar_preview_region"), isIRegionWindow);
    }

    private get previewPetWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("pet_preview"), isIWidgetWindow);
    }

    public clearPreviewer(): void {
        this.previewAvatarWidget.visible = false;
        this.previewPetWidget.visible = false;
    }

    public setPetPreview(param1: string): void {
        this.clearPreviewer();
        this.previewPetWidget.visible = true;
        let _loc2_: IPetImageWidget = asGuarded(this.previewPetWidget.widget, isIPetImageWidget);
        _loc2_.figure = param1;
        PermanentVariableHolderPreviewer.centerContainer(this.previewPetWidget);
    }

    public setUserPreview(param1: string, param2: number = -1): void {
        this.clearPreviewer();
        this.previewAvatarWidget.visible = true;
        let _loc3_: IAvatarImageWidget = asGuarded(this.previewAvatarWidget.widget, isIAvatarImageWidget);
        _loc3_.figure = param1;
        PermanentVariableHolderPreviewer.centerContainer(this.previewAvatarWidget);
        this._userId = param2;
        this.previewAvatarRegion.visible = param2 != -1;
    }

    public imageReady(param1: number, param2: BitmapData): void {
    }

    public imageFailed(param1: number): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._userId = -1;
        this._container = null;
        this._controller = null;
        this._disposed = true;
    }

    private onPreviewAvatarClicked = (param1: WindowMouseEvent): void => {
        this._controller.send(new GetExtendedProfileMessageComposer(this._userId, true));
    };

    get [IGetImageListener](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
