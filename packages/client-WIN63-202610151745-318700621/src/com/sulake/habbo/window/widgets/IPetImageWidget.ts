import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IPetImageWidget extends IWidget {
    get figure(): string;
    set figure(param1: string);
    get scale(): number;
    set scale(param1: number);
    get direction(): number;
    set direction(param1: number);
    get zoomX(): number;
    set zoomX(param1: number);
    get zoomY(): number;
    set zoomY(param1: number);
    get petWidth(): number;
    get petHeight(): number;
    get shrinkOnOverflow(): boolean;
    set shrinkOnOverflow(param1: boolean);
    refresh(): void;
}

export const IPetImageWidget = Symbol('com.sulake.habbo.window.widgets::IPetImageWidget');
registerClassName(IPetImageWidget, 'com.sulake.habbo.window.widgets::IPetImageWidget');

export function isIPetImageWidget(value: unknown): value is IPetImageWidget {
    return (value as { [IPetImageWidget]?: true } | null | undefined)?.[IPetImageWidget] === true;
}
