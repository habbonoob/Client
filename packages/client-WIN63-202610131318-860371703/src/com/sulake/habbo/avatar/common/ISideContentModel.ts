import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';

export interface ISideContentModel {
    dispose(): void;
    reset(): void;
    get controller(): HabboAvatarEditor;
    getWindowContainer(): IWindowContainer;
}

export const ISideContentModel = Symbol('com.sulake.habbo.avatar.common::ISideContentModel');
registerClassName(ISideContentModel, 'com.sulake.habbo.avatar.common::ISideContentModel');

export function isISideContentModel(value: unknown): value is ISideContentModel {
    return (value as { [ISideContentModel]?: true } | null | undefined)?.[ISideContentModel] === true;
}
