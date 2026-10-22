import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';

export class LocalizedTextField extends TextField implements ILocalizable {
    static { registerClassName(this, 'onBoardingHcUi::LocalizedTextField'); }

    private static _localizationManager: ICoreLocalizationManager;
    protected _localized: boolean = false;

    declare private _key: string;

    constructor() {
        super();
    }

    public static set localizationManager(param1: ICoreLocalizationManager) {
        LocalizedTextField._localizationManager = param1;
    }

    public static get localizationManager(): ICoreLocalizationManager {
        return LocalizedTextField._localizationManager;
    }

    public dispose(): void {
        this.removeOldLocalization(this._key);
    }

    public override set htmlText(param1: string) {
        super.htmlText = param1;
        this.checkLocalization(param1);
        if (this._localized) {
        }
    }

    public set localization(param1: string) {
        super.htmlText = param1;
    }

    protected removeOldLocalization(param1: string): void {
        if (this._localized) {
            LocalizedTextField.localizationManager.removeListener(param1.slice(2, param1.indexOf("}")), this);
            this._localized = false;
        }
    }

    protected checkLocalization(param1: string): void {
        if (LocalizedTextField.localizationManager && param1 && param1.charAt(0) == "$" && param1.charAt(1) == "{") {
            this.removeOldLocalization(this._key);
            this._key = param1;
            this._localized = true;
            LocalizedTextField.localizationManager.registerListener(param1.slice(2, param1.indexOf("}")), this);
        }
    }

    public override get htmlText(): string {
        return super.htmlText;
    }

    get [ILocalizable](): true {
        return true;
    }
}
