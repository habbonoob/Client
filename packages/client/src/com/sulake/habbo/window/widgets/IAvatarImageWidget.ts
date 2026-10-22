import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IAvatarImageWidget extends IWidget {
    get figure(): string;
    set figure(param1: string);
    get scale(): string;
    set scale(param1: string);
    get onlyHead(): boolean;
    set onlyHead(param1: boolean);
    get cropped(): boolean;
    set cropped(param1: boolean);
    get direction(): number;
    set direction(param1: number);
    get userId(): number;
    set userId(param1: number);
}

export const IAvatarImageWidget = Symbol('com.sulake.habbo.window.widgets::IAvatarImageWidget');
registerClassName(IAvatarImageWidget, 'com.sulake.habbo.window.widgets::IAvatarImageWidget');

export function isIAvatarImageWidget(value: unknown): value is IAvatarImageWidget {
    return (value as { [IAvatarImageWidget]?: true } | null | undefined)?.[IAvatarImageWidget] === true;
}
