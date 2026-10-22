import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export interface IFurnitureData {
    get type(): string;
    get id(): number;
    get className(): string;
    get fullName(): string;
    get hasIndexedColor(): boolean;
    get colourIndex(): number;
    get revision(): number;
    get tileSizeX(): number;
    get tileSizeY(): number;
    get tileSizeZ(): number;
    get colours(): any[];
    get localizedName(): string;
    get description(): string;
    get adUrl(): string;
    get purchaseOfferId(): number;
    get bcOfferId(): number;
    get rentOfferId(): number;
    get customParams(): string;
    get category(): number;
    get purchaseCouldBeUsedForBuyout(): boolean;
    get rentCouldBeUsedForBuyout(): boolean;
    get availableForBuildersClub(): boolean;
    get canStandOn(): boolean;
    get canSitOn(): boolean;
    get canLayOn(): boolean;
    get isExternalImageType(): boolean;
    get excludedFromDynamic(): boolean;
    get furniLine(): string;
    get tradeable(): boolean;
}

export const IFurnitureData = Symbol('com.sulake.habbo.session.furniture::IFurnitureData');
registerClassName(IFurnitureData, 'com.sulake.habbo.session.furniture::IFurnitureData');

export function isIFurnitureData(value: unknown): value is IFurnitureData {
    return (value as { [IFurnitureData]?: true } | null | undefined)?.[IFurnitureData] === true;
}
