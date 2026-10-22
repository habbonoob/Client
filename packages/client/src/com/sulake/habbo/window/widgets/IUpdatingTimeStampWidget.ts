import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IUpdatingTimeStampWidget extends IWidget {
    get timeStamp(): number;
    set timeStamp(param1: number);
    set align(param1: string);
    reset(): void;
}

export const IUpdatingTimeStampWidget = Symbol('com.sulake.habbo.window.widgets::IUpdatingTimeStampWidget');
registerClassName(IUpdatingTimeStampWidget, 'com.sulake.habbo.window.widgets::IUpdatingTimeStampWidget');

export function isIUpdatingTimeStampWidget(value: unknown): value is IUpdatingTimeStampWidget {
    return (value as { [IUpdatingTimeStampWidget]?: true } | null | undefined)?.[IUpdatingTimeStampWidget] === true;
}
