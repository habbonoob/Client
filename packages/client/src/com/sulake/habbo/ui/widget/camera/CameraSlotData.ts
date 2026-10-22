import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';

export class CameraSlotData {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.camera::CameraSlotData'); }

    constructor() {
    }

    declare public image: BitmapData;

    declare public isEmpty: boolean;
    static { (this.prototype as any).isEmpty = false; }

    declare private _date: Date;

    public get dateString(): string {
        return this._date.getDate() + "/" + (this._date.getMonth() + 1) + "/" + this._date.getFullYear() + " " + this._date.getHours() + ":" + this.addLeadingZero(this._date.getMinutes() | 0);
    }

    public setDate(param1: Date): void {
        this._date = param1;
    }

    public getDateTimestamp(): number {
        return this._date.getTime() | 0;
    }

    private addLeadingZero(param1: number): string {
        let _loc2_: string = param1.toString();
        if (_loc2_.length == 1) {
            _loc2_ = "0" + _loc2_;
        }
        return _loc2_;
    }
}
