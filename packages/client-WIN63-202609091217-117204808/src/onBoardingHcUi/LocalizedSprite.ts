import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import { Button } from '@/onBoardingHcUi/LocalizedSprite.group';

export class LocalizedSprite extends Sprite implements ILocalizable {
    static { registerClassName(this, 'onBoardingHcUi::LocalizedSprite'); }

    private static _localizationManager: ICoreLocalizationManager;
    protected _localized: boolean = false;

    constructor() {
        super();
        this.initInstanceFields();
    }

    public static set localizationManager(param1: ICoreLocalizationManager) {
        LocalizedSprite._localizationManager = param1;
    }

    public static get localizationManager(): ICoreLocalizationManager {
        return LocalizedSprite._localizationManager;
    }

    public dispose(): void {
        let _loc1_: string = "";
        if (this instanceof Button) {
            _loc1_ = (this instanceof Button ? this : null).label;
        }
        this.removeOldLocalization(_loc1_);
    }

    public set localization(param1: string) {
        if (this instanceof Button) {
            (this instanceof Button ? this : null).localizedText = param1;
        }
    }

    protected removeOldLocalization(param1: string): void {
        if (this._localized) {
            LocalizedSprite.localizationManager.removeListener(param1.slice(2, param1.indexOf("}")), this);
            this._localized = false;
        }
    }

    protected checkLocalization(param1: string): void {
        if (LocalizedSprite.localizationManager && param1 && param1.charAt(0) == "$" && param1.charAt(1) == "{") {
            this._localized = true;
            LocalizedSprite.localizationManager.registerListener(param1.slice(2, param1.indexOf("}")), this);
        }
    }

    /** Subclasses whose fields an ancestor constructor can observe initialise them here, first. */
    protected initInstanceFields(): void {
    }

    get [ILocalizable](): true {
        return true;
    }
}
