import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class StateController {
    static { registerClassName(this, 'com.sulake.habbo.notifications.feed::StateController'); }

    declare private _isEnabled: boolean;
    static { (this.prototype as any)._isEnabled = false; }

    declare private _isGameMode: boolean;
    static { (this.prototype as any)._isGameMode = false; }

    private _SafeStr_3894: number = 0;
    private _SafeStr_4129: number = 1;

    constructor() {
    }

    private isActive(): boolean {
        return this._isEnabled && !this._isGameMode;
    }

    public setEnabled(param1: boolean): number {
        this._isEnabled = param1;
        if (!this.isActive()) {
            return this.requestState(0);
        }
        return this.setVisible();
    }

    public setGameMode(param1: boolean): number {
        this._isGameMode = param1;
        if (!this.isActive()) {
            return this.requestState(0);
        }
        return this.setVisible();
    }

    public currentState(): number {
        return this._SafeStr_3894;
    }

    public requestState(param1: number): number {
        if (!this.isActive()) {
            this._SafeStr_4129 = param1;
            return this._SafeStr_3894;
        }
        this._SafeStr_3894 = param1;
        this._SafeStr_4129 = param1;
        return this._SafeStr_3894;
    }

    private setVisible(): number {
        let _loc1_: number = this._SafeStr_4129;
        if (_loc1_ == 0) {
            _loc1_ = 1;
        }
        this._SafeStr_3894 = _loc1_;
        this._SafeStr_4129 = _loc1_;
        return _loc1_;
    }
}
