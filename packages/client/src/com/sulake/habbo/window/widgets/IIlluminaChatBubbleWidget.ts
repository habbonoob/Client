import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IIlluminaChatBubbleWidget extends IWidget {
    get flipped(): boolean;
    set flipped(param1: boolean);
    get userName(): string;
    set userName(param1: string);
    get userId(): number;
    set userId(param1: number);
    get figure(): string;
    set figure(param1: string);
    get numMessages(): number;
    get timeStamp(): number;
    set timeStamp(param1: number);
    set friendOnlineStatus(param1: boolean);
    getMessage(param1: number): string;
    setMessage(param1: number, param2: string): void;
    appendMessage(param1: string, param2?: boolean, param3?: number): void;
    setAwaitingConfirmationId(param1: number, param2: number): void;
    clearAwaitingConfirmationId(param1: number): void;
    getAwaitingConfirmationId(param1: number): number;
}

export const IIlluminaChatBubbleWidget = Symbol('com.sulake.habbo.window.widgets::IIlluminaChatBubbleWidget');
registerClassName(IIlluminaChatBubbleWidget, 'com.sulake.habbo.window.widgets::IIlluminaChatBubbleWidget');

export function isIIlluminaChatBubbleWidget(value: unknown): value is IIlluminaChatBubbleWidget {
    return (value as { [IIlluminaChatBubbleWidget]?: true } | null | undefined)?.[IIlluminaChatBubbleWidget] === true;
}
