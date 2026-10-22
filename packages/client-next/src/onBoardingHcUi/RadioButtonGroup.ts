import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RadioButton } from '@/onBoardingHcUi/RadioButton';

export class RadioButtonGroup {
    static { registerClassName(this, 'onBoardingHcUi::RadioButtonGroup'); }

    declare private _selectedAction: (...args: any[]) => any;

    public buttons: RadioButton[] = new Array<RadioButton>(0).fill(null);

    constructor(param1: (...args: any[]) => any) {
        this._selectedAction = param1;
    }

    public get selected(): RadioButton {
        for (const _loc1_ of this.buttons ?? []) {
            if (_loc1_.selected) {
                return _loc1_;
            }
        }
        return null;
    }

    public performSelectedAction(): void {
        this._selectedAction();
    }
}
