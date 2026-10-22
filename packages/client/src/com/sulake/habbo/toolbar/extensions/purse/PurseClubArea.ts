import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DropBounce } from '@/com/sulake/core/window/motion/DropBounce';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { HabboInventoryHabboClubEvent } from '@/com/sulake/habbo/inventory/events/HabboInventoryHabboClubEvent';
import { CurrencyIndicatorBase } from '@/com/sulake/habbo/toolbar/extensions/purse/CurrencyIndicatorBase';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class PurseClubArea extends CurrencyIndicatorBase {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.extensions.purse::PurseClubArea'); }

    private static readonly BG_COLOR_LIGHT: number = 4286084205;
    private static readonly BG_COLOR_DARK: number = 4283781966;
    private static readonly ICON_STYLE_CLUB: number = 13;
    private static readonly ICON_STYLE_VIP: number = 14;
    private static readonly ICON_ANIMATION: any[] = ["toolbar_hc_icon_0", "toolbar_hc_icon_1", "toolbar_hc_icon_2", "toolbar_hc_icon_1", "toolbar_hc_icon_0"];

    constructor(param1: HabboToolbar, param2: IWindowContainer) {
        super(param1.windowManager, param1.assets);
        this._toolbar = param1;
        this._window = param2;
        this.bgColorLight = 4286084205;
        this.bgColorDark = 4283781966;
        this.textElementName = "days";
        this.iconAnimationSequence = PurseClubArea.ICON_ANIMATION;
        this.iconAnimationDelay = 50;
        this.amountZeroText = this._toolbar.localization.getLocalization("purse.clubdays.zero.amount.text", "Get");
        this.onClubChanged(new HabboInventoryHabboClubEvent());
    }

    declare private _clubDays: number;

    declare private _toolbar: HabboToolbar;

    declare private _clubMinutes: number;

    protected override setAmount(param1: number, param2: number = -1): void {
        if (param1 < 1) {
            this._window.findChildByName("days").visible = false;
            this._window.findChildByName("join").visible = true;
            this.textElementName = "join";
            this.setText(this.amountZeroText);
        } else {
            this._window.findChildByName("days").visible = true;
            this._window.findChildByName("join").visible = false;
            this.textElementName = "days";
            if (param2 != -1 && param2 < 1440) {
                this.setText(FriendlyTime.getShortFriendlyTime(this._toolbar.catalog.localization, param2 * 60));
            } else {
                this.setText(FriendlyTime.getShortFriendlyTime(this._toolbar.catalog.localization, param1 * 86400));
            }
        }
    }

    public override dispose(): void {
        this._toolbar = null;
        super.dispose();
    }

    private setClubIcon(param1: number): void {
        let _loc2_: IIconWindow = asGuarded(this._window.findChildByName("club_icon"), isIIconWindow);
        if (_loc2_) {
            _loc2_.style = param1 >>> 0;
            _loc2_.invalidate();
        }
    }

    public onClubChanged(param1: HabboInventoryHabboClubEvent = null): void {
        let _loc3_: IWindowContainer = null;
        if (!this._toolbar.inventory) {
            return;
        }
        let _loc4_: number = this._toolbar.inventory.clubPeriods * 31 + this._toolbar.inventory.clubDays;
        let _loc2_: number = this._toolbar.inventory.clubMinutesUntilExpiration;
        if (this._clubDays != -1 && this._toolbar.inventory.clubLevel != 0) {
            this.setAmount(_loc4_, _loc2_);
            _loc3_ = asGuarded(this._window.findChildByName("hc_join_button"), isIWindowContainer);
            if (Motions.getMotionByTarget(_loc3_) == null) {
                Motions.runMotion(new DropBounce(_loc3_, 900, 16));
            }
        }
        this._clubDays = _loc4_;
        this._clubMinutes = _loc2_;
        switch (this._toolbar.inventory.clubLevel) {
            case 0:
                this.setClubIcon(14);
                this.setText(this.amountZeroText);
                break;
            case 1:
                this.setClubIcon(13);
                break;
            case 2:
                this.setClubIcon(14);
        }
    }

    protected override initInstanceFields(): void {
        this._clubDays = -1;
        this._clubMinutes = 0;
        super.initInstanceFields();
    }
}
