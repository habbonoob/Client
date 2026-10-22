import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import type { IRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';

export class EffectPreviewer implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.collectibles.tabs.subviews::EffectPreviewer'); }

    private static _SafeStr_7315: number = 2;

    constructor(param1: IWidgetWindow, param2: IAvatarRenderManager) {
        this._SafeStr_2225 = param1;
        this._avatarRenderManager = param2;
        this.roomPreviewer.updateRoomWallsAndFloorVisibility(false, false);
    }

    declare private _SafeStr_2225: IWidgetWindow;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set visible(param1: boolean) {
        this._SafeStr_2225.visible = param1;
    }

    private get widget(): IRoomPreviewerWidget {
        return asGuarded(this._SafeStr_2225.widget, isIRoomPreviewerWidget);
    }

    private get roomPreviewer(): RoomPreviewer {
        return this.widget.roomPreviewer;
    }

    public update(param1: string, param2: number): void {
        let _loc3_: IAvatarImage = null;
        let _loc4_: RoomPreviewer = this.roomPreviewer;
        if (_loc4_.isRoomEngineReady) {
            _loc4_.addAvatarIntoRoom(param1, param2);
            _loc4_.updateAvatarDirection(EffectPreviewer._SafeStr_7315, EffectPreviewer._SafeStr_7315);
            _loc4_.updatePreviewRoomView(true);
            _loc4_.updateRoomEngine();
        } else {
            _loc3_ = this._avatarRenderManager.createAvatarImage(param1, "h", null, this);
            this.widget.showPreview(_loc3_.getCroppedImage("full"));
        }
    }

    public avatarImageReady(param1: string): void {
        let _loc2_: IAvatarImage = null;
        if (!this._disposed) {
            _loc2_ = this._avatarRenderManager.createAvatarImage(param1, "h", null, this);
            this.widget.showPreview(_loc2_.getCroppedImage("full"));
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this.roomPreviewer.reset(true);
    }

    get [IDisposable](): true {
        return true;
    }
}
