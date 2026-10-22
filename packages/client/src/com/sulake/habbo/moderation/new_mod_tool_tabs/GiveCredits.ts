import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { setTimeout } from '@habbo-pixi/runtime/utils/setTimeout';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconButtonWindow } from '@/com/sulake/core/window/components/IIconButtonWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { AbstractModToolTab } from '@/com/sulake/habbo/moderation/new_mod_tool_tabs/AbstractModToolTab';

export class GiveCredits extends AbstractModToolTab {
    static { registerClassName(this, 'com.sulake.habbo.moderation.new_mod_tool_tabs::GiveCredits'); }

    private static PLAY_SOUND_DELAY: number = 250;
    private static PLAY_SOUNDS: any[] = ["HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_pixels", "HBST_message_received", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_pixels", "HBST_pixels", "HBST_pixels", "HBST_pixels", "HBST_pixels", "HBST_purchase", "HBST_purchase", "HBST_purchase", "FURNITURE_cuckoo_clock", "FURNITURE_cuckoo_clock", "FURNITURE_cuckoo_clock", "FURNITURE_cuckoo_clock", "HBST_message_received", "HBST_message_received", "HBST_message_received", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_pixels", "HBST_message_received", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_pixels", "HBST_pixels", "HBST_pixels", "HBST_pixels", "HBST_pixels", "HBST_purchase", "HBST_purchase", "HBST_purchase", "FURNITURE_cuckoo_clock", "FURNITURE_cuckoo_clock", "FURNITURE_cuckoo_clock", "FURNITURE_cuckoo_clock", "HBST_message_received", "HBST_message_received", "HBST_message_received", "HBST_purchase", "HBST_purchase", "HBST_purchase", "HBST_purchase"];

    constructor(param1: NewModerationTool, param2: IWindowContainer) {
        super(param1, param2);
        this.plusButton.addEventListener("WME_CLICK", this.onPlusButtonClick);
        this.minusButton.addEventListener("WME_CLICK", this.onMinusButtonClick);
        this.donateCoinsButton.addEventListener("WME_CLICK", this.onDonateCoinsClick);
    }

    private _originalVolume: number = 0;

    private get amount(): number {
        return parseInt(this.amountCoinsInput.text) | 0;
    }

    private set amount(param1: number) {
        this.amountCoinsInput.text = "" + param1;
    }

    private get usernameInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("give_coins_username_input"), isITextFieldWindow);
    }

    private get amountCoinsInput(): ITextFieldWindow {
        return asGuarded(this.window.findChildByName("amount_coins_input"), isITextFieldWindow);
    }

    private get plusButton(): IIconButtonWindow {
        return asGuarded(this.window.findChildByName("plus_btn_coins"), isIIconButtonWindow);
    }

    private get minusButton(): IIconButtonWindow {
        return asGuarded(this.window.findChildByName("minus_btn_coins"), isIIconButtonWindow);
    }

    private get donateCoinsButton(): IButtonWindow {
        return asGuarded(this.window.findChildByName("add_coins_btn"), isIButtonWindow);
    }

    public override onOpen(): void {
        super.onOpen();
        this.usernameInput.text = this.tool.sessionDataManager.userName;
    }

    private onDonateCoinsClick = (param1: WindowMouseEvent): void => {
        this.amount = 1;
        this.playAllSounds();
        this.donateCoinsButton.disable();
    };

    private playAllSounds(): void {
        let _loc1_: number = 0;
        this._originalVolume = this.tool.soundManager.genericVolume;
        if (this._originalVolume < 0.4) {
            this.tool.soundManager.genericVolume = 0.4;
        } else if (this._originalVolume > 0.6) {
            this.tool.soundManager.genericVolume = 0.6;
        }
        _loc1_ = 0;
        while (_loc1_ < GiveCredits.PLAY_SOUNDS.length) {
            setTimeout(this.playSound, _loc1_ * GiveCredits.PLAY_SOUND_DELAY, GiveCredits.PLAY_SOUNDS[_loc1_]);
            _loc1_++;
        }
        setTimeout(this.halfWay, GiveCredits.PLAY_SOUNDS.length * GiveCredits.PLAY_SOUND_DELAY / 2);
        setTimeout(this.soundsFinished, GiveCredits.PLAY_SOUNDS.length * GiveCredits.PLAY_SOUND_DELAY);
    }

    private playSound = (param1: string): void => {
        this.tool.soundManager.playSound(param1);
    };

    private halfWay = (): void => {
        this.tool.notifications.addItem("${generic.is_this_trax}", "soundmachine");
    };

    private soundsFinished = (): void => {
        this.donateCoinsButton.enable();
        this.tool.setToolCompletion(3);
        if (this.tool.soundManager.genericVolume != this._originalVolume) {
            this.tool.soundManager.genericVolume = this._originalVolume;
        }
    };

    private onPlusButtonClick = (param1: WindowMouseEvent): void => {
        if (this.amount < 99999) {
            this.amount += 1;
        }
    };

    private onMinusButtonClick = (param1: WindowMouseEvent): void => {
        if (this.amount > 1) {
            this.amount -= 1;
        }
    };
}
