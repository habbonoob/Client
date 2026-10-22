import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { GroupItem } from '@/com/sulake/habbo/inventory/items/GroupItem';
import { StuffDataBase } from '@/com/sulake/habbo/room/object/data/StuffDataBase';

export class CreditTradingItem extends GroupItem {
    static { registerClassName(this, 'com.sulake.habbo.inventory.items::CreditTradingItem'); }

    private static readonly THUMB_WINDOW_LAYOUT_CreditTradingItem: string = "inventory_thumb_credits_xml";

    constructor(param1: FurniModel, param2: IAssetLibrary, param3: IRoomEngine, param4: number) {
        let _loc5_: BitmapData = null;
        // AS3 stored the assets and called getItemIcon() before super(); that is its body, on the
        // parameter. The type, category and extra it passed were GroupItem's, still at their
        // defaults (0, 0, NaN).
        let _loc6_: IAsset = param2 ? param2.getAssetByName("inventory_furni_icon_credits") : null;
        _loc5_ = _loc6_ != null ? (asInstanceOf(_loc6_.content, BitmapData)).clone() : null;
        super(param1, 0, 0, param3, false, new StuffDataBase(), NaN, _loc5_, false, "center");
        this._creditValue = param4;
        this._assets = param2;
    }

    declare private _creditValue: number;
    static { (this.prototype as any)._creditValue = 0; }

    declare private _assets: IAssetLibrary;

    public override get isGroupable(): boolean {
        return true;
    }

    public override dispose(): void {
        this._assets = null;
        super.dispose();
    }

    public override getTotalCount(): number {
        return this.getTotalCreditValue();
    }

    public override getUnlockedCount(): number {
        return this.getTotalCreditValue();
    }

    protected override createWindow(): void {
        this._window = this._SafeStr_2134.createItemWindow("inventory_thumb_credits_xml");
    }

    public override getMinimumItemsToShowCounter(): number {
        return 1;
    }

    public getItemIcon(): BitmapData {
        if (!this._assets) {
            return null;
        }
        let _loc1_: IAsset = this._assets.getAssetByName("inventory_furni_icon_credits");
        return _loc1_ != null ? (asInstanceOf(_loc1_.content, BitmapData)).clone() : null;
    }

    public getItemTooltipText(): string {
        return "${purse_coins}";
    }

    public getTotalCreditValue(): number {
        return this._creditValue;
    }
}
