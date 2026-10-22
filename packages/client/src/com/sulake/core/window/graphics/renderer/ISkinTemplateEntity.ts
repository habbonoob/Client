import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';

export interface ISkinTemplateEntity extends IChildEntity {
    get type(): string;
    get region(): Rectangle;
}

export const ISkinTemplateEntity = Symbol('com.sulake.core.window.graphics.renderer::ISkinTemplateEntity');
registerClassName(ISkinTemplateEntity, 'com.sulake.core.window.graphics.renderer::ISkinTemplateEntity');

export function isISkinTemplateEntity(value: unknown): value is ISkinTemplateEntity {
    return (value as { [ISkinTemplateEntity]?: true } | null | undefined)?.[ISkinTemplateEntity] === true;
}
