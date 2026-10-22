import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { WiredMenuController } from '@/com/sulake/habbo/roomevents/wired_menu/WiredMenuController';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import type { IPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIBitmapDataContainer } from '@/com/sulake/core/window/utils/IBitmapDataContainer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIAvatarImageWidget } from '@/com/sulake/habbo/window/widgets/IAvatarImageWidget';
import { isIPetImageWidget } from '@/com/sulake/habbo/window/widgets/IPetImageWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class VariableHolderPreviewer implements IGetImageListener, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_menu.tabs.tab_inspection::VariableHolderPreviewer'); }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_3955: number;
    static { (this.prototype as any)._SafeStr_3955 = NaN; }

    declare private _container: IWindowContainer;

    declare private _controller: WiredMenuController;

    private _SafeStr_4062: number = 0;
    private _SafeStr_5212: number = -1;

    constructor(param1: IWindowContainer, param2: WiredMenuController) {
        this._container = param1;
        this._controller = param2;
        this.clearPreviewer();
    }

    public static centerContainer(param1: IWindow): void {
        param1.x = param1.parent.width / 2 - param1.width / 2 | 0;
        param1.y = param1.parent.height / 2 - param1.height / 2 | 0;
    }

    public clearPreviewer(): void {
        this._SafeStr_4062 = 0;
        this._SafeStr_5212 = -1;
        this.previewFurniInstructionText.visible = false;
        this.previewUserInstructionText.visible = false;
        this.previewAvatarWidget.visible = false;
        this.previewPetWidget.visible = false;
        this.previewImageBitmap.visible = false;
        this.previewGlobalPlaceholder.visible = false;
    }

    public setFurniInstructions(): void {
        this.clearPreviewer();
        this.previewFurniInstructionText.visible = true;
    }

    public setUserInstructions(): void {
        this.clearPreviewer();
        this.previewUserInstructionText.visible = true;
    }

    public setPreviewByUserIndex(param1: number): void {
        let _loc4_: IPetImageWidget = null;
        let _loc3_: IAvatarImageWidget = null;
        if (param1 == this._SafeStr_5212) {
            return;
        }
        this.clearPreviewer();
        let _loc2_: IUserData = this._controller.roomEvents.roomSession.userDataManager.getUserDataByIndex(param1);
        if (_loc2_ == null) {
            return;
        }
        switch (_loc2_.type - 1) {
            case 0:
            case 2:
            case 3:
                this.previewAvatarWidget.visible = true;
                _loc3_ = asGuarded(this.previewAvatarWidget.widget, isIAvatarImageWidget);
                _loc3_.figure = _loc2_.figure;
                VariableHolderPreviewer.centerContainer(this.previewAvatarWidget);
                break;
            case 1:
                this.previewPetWidget.visible = true;
                _loc4_ = asGuarded(this.previewPetWidget.widget, isIPetImageWidget);
                _loc4_.figure = _loc2_.figure;
                VariableHolderPreviewer.centerContainer(this.previewPetWidget);
        }
        this._SafeStr_5212 = param1;
    }

    public setFurniByObjectId(param1: number): void {
        let _loc4_: number = 0;
        if (param1 == this._SafeStr_4062 || -param1 == this._SafeStr_4062) {
            return;
        }
        this.clearPreviewer();
        if (param1 >= 0) {
            _loc4_ = 10;
        } else {
            param1 = -param1;
            _loc4_ = 20;
        }
        let _loc3_: IRoomEngine = this._controller.roomEngine;
        let _loc2_: ImageResult = _loc3_.getRoomObjectImage(_loc3_.activeRoomId, param1, _loc4_, new Vector3d(180), 64, null);
        if (_loc2_.data != null) {
            this.previewImageBitmap.bitmap = _loc2_.data.clone();
            if (_loc2_.data.width >= this._container.width - 6 || _loc2_.data.height > this._container.height - 6) {
                (asGuarded(this.previewImageBitmap, isIBitmapDataContainer)).zoomX = 0.5;
                (asGuarded(this.previewImageBitmap, isIBitmapDataContainer)).zoomY = 0.5;
            } else {
                (asGuarded(this.previewImageBitmap, isIBitmapDataContainer)).zoomX = 1;
                (asGuarded(this.previewImageBitmap, isIBitmapDataContainer)).zoomY = 1;
            }
            this.previewImageBitmap.visible = true;
            VariableHolderPreviewer.centerContainer(this.previewImageBitmap);
        }
        this._SafeStr_4062 = param1;
    }

    public setGlobalPlaceholder(): void {
        this.clearPreviewer();
        this.previewGlobalPlaceholder.visible = true;
    }

    public imageReady(param1: number, param2: BitmapData): void {
    }

    public imageFailed(param1: number): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_3955 = -1;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get previewFurniInstructionText(): ITextWindow {
        return asGuarded(this._container.findChildByName("preview_instruction_furni"), isITextWindow);
    }

    private get previewUserInstructionText(): ITextWindow {
        return asGuarded(this._container.findChildByName("preview_instruction_user"), isITextWindow);
    }

    private get previewAvatarWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("preview_avatar"), isIWidgetWindow);
    }

    private get previewPetWidget(): IWidgetWindow {
        return asGuarded(this._container.findChildByName("preview_pet"), isIWidgetWindow);
    }

    private get previewImageBitmap(): IBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("preview_image_bitmap"), isIBitmapWrapperWindow);
    }

    private get previewGlobalPlaceholder(): IStaticBitmapWrapperWindow {
        return asGuarded(this._container.findChildByName("global_placeholder"), isIStaticBitmapWrapperWindow);
    }

    get [IGetImageListener](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
