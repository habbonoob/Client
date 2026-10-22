import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FigureData } from '@/com/sulake/habbo/avatar/figuredata/FigureData';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import type { IRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRoomPreviewerWidget } from '@/com/sulake/habbo/window/widgets/IRoomPreviewerWidget';

export class FigureDataView implements IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.avatar.figuredata::FigureDataView'); }

    public static readonly PREVIEW_AVATAR_DIRECTION: number = 4;

    declare private _widget: IRoomPreviewerWidget;

    declare private _roomPreviewer: RoomPreviewer;

    declare private _SafeStr_2134: FigureData;

    declare private _figureString: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: FigureData) {
        this._SafeStr_2134 = param1;
        this._widget = asGuarded(param1.avatarEditor.view.getFigureContainer().widget, isIRoomPreviewerWidget);
        this._roomPreviewer = this._widget.roomPreviewer;
        this._roomPreviewer.updateRoomWallsAndFloorVisibility(false, false);
    }

    public update(param1: string, param2: number = 0, param3: number = 4): void {
        let _loc4_: IAvatarImage = null;
        this._figureString = param1;
        if (this._roomPreviewer.isRoomEngineReady) {
            this._roomPreviewer.addAvatarIntoRoom(param1, param2);
            this._roomPreviewer.updateAvatarDirectionAndLocation(param3, param3);
            this._roomPreviewer.updatePreviewRoomView(true);
            this._roomPreviewer.updateRoomEngine();
        } else {
            _loc4_ = this._SafeStr_2134.avatarEditor.manager.avatarRenderManager.createAvatarImage(param1, "h", null, this);
            this._widget.showPreview(_loc4_.getCroppedImage("full"));
        }
    }

    public avatarImageReady(param1: string): void {
        let _loc2_: IAvatarImage = null;
        if (param1 == this._figureString) {
            _loc2_ = this._SafeStr_2134.avatarEditor.manager.avatarRenderManager.createAvatarImage(param1, "h", null, this);
            this._widget.showPreview(_loc2_.getCroppedImage("full"));
        }
    }

    public dispose(): void {
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
