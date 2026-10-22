import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export class ChestItemTypeRenderableWrapper implements IProductDisplayInfo {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.subcontrollers.views::ChestItemTypeRenderableWrapper'); }

    constructor(param1: ChestItemType) {
        this._chestItemType = param1;
    }

    declare private _chestItemType: ChestItemType;

    public get productTypeId(): number {
        return this._chestItemType.isWallItem ? 0 : 1;
    }

    public get itemTypeId(): string {
        return String(this._chestItemType.typeId);
    }

    public get extraData(): string {
        return this._chestItemType.legacyPosterId;
    }

    public get petFigureString(): string {
        return "";
    }

    public get figureSetIds(): number[] {
        return null;
    }
}
