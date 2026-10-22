import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboAvatarEditorDataSaver } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorDataSaver';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface IHabboAvatarEditor extends IUnknown {
    openEditor(param1: number, param2: IHabboAvatarEditorDataSaver, param3?: any[], param4?: boolean, param5?: string, param6?: string): IFrameWindow;
    embedEditorToContext(param1: number, param2: IWindowContainer, param3?: IHabboAvatarEditorDataSaver, param4?: any[], param5?: boolean, param6?: boolean): boolean;
    loadAvatarInEditor(param1: number, param2: string, param3: string, param4?: number): void;
    loadOwnAvatarInEditor(param1: number): void;
    get events(): IEventDispatcher;
    close(param1: number): void;
}
