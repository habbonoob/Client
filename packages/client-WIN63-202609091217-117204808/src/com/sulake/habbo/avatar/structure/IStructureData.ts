import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IStructureData {
    parse(param1: XML): boolean;
    appendXML(param1: XML): boolean;
}

export const IStructureData = Symbol('com.sulake.habbo.avatar.structure::IStructureData');
registerClassName(IStructureData, 'com.sulake.habbo.avatar.structure::IStructureData');

export function isIStructureData(value: unknown): value is IStructureData {
    return (value as { [IStructureData]?: true } | null | undefined)?.[IStructureData] === true;
}
