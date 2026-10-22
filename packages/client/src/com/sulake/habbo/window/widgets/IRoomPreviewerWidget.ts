import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';
import type { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export interface IRoomPreviewerWidget extends IWidget {
    get scale(): number;
    set scale(param1: number);
    get roomPreviewer(): RoomPreviewer;
    get offsetX(): number;
    set offsetX(param1: number);
    get offsetY(): number;
    set offsetY(param1: number);
    get zoom(): number;
    set zoom(param1: number);
    showPreview(param1: BitmapData): void;
}

export const IRoomPreviewerWidget = Symbol('com.sulake.habbo.window.widgets::IRoomPreviewerWidget');
registerClassName(IRoomPreviewerWidget, 'com.sulake.habbo.window.widgets::IRoomPreviewerWidget');

export function isIRoomPreviewerWidget(value: unknown): value is IRoomPreviewerWidget {
    return (value as { [IRoomPreviewerWidget]?: true } | null | undefined)?.[IRoomPreviewerWidget] === true;
}
