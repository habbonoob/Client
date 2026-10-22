import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboHelp extends IUnknown {
    requestGuide(): void;
    get events(): IEventDispatcher;
    reportBully(param1: number): void;
    startPhotoReportingInNewCfhFlow(param1: number, param2: string, param3: string, param4: number): void;
    reportUser(param1: number, param2: number, param3: string): void;
    reportUserName(param1: number, param2: string): void;
    reportUserFromIM(param1: number): void;
    reportRoom(param1: number, param2: string, param3: string): void;
    reportThread(param1: number, param2: number): void;
    reportMessage(param1: number, param2: number, param3: number): void;
    reportSelfie(param1: string, param2: string, param3: number, param4: number, param5: number): boolean;
    reportPhoto(param1: string, param2: number, param3: number, param4: number, param5: number): boolean;
    startNameChange(): void;
    showWelcomeScreen(param1: string, param2: string, param3: number, param4?: string): void;
    set outsideRoom(param1: boolean);
    showHabboWay(): void;
    showSafetyBooklet(): void;
    showTourPopup(): void;
}

export const IHabboHelp = Symbol('com.sulake.habbo.help::IHabboHelp');
registerClassName(IHabboHelp, 'com.sulake.habbo.help::IHabboHelp');

export function isIHabboHelp(value: unknown): value is IHabboHelp {
    return (value as { [IHabboHelp]?: true } | null | undefined)?.[IHabboHelp] === true;
}
