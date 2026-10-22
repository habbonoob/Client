import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { MessengerHabbiconPickerEntry } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPickerEntry';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { MessengerHabbiconPickerTileView } from '@/com/sulake/habbo/messenger/habbicons/MessengerHabbiconPickerTileView';

export class MessengerHabbiconPickerSectionView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.messenger.habbicons::MessengerHabbiconPickerSectionView'); }

    private static readonly GRID_COLUMNS: number = 5;
    private static readonly SLOT_SIZE: number = 45;
    private static readonly SLOT_SPACING: number = 2;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14325: MessengerHabbiconPickerTileView[];

    declare private _type: string;

    declare private _key: string;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: string, param3: string, param4: string, param5: any[], param6: (...args: any[]) => any, param7: IHabboWindowManager, param8: (...args: any[]) => any, param9: (...args: any[]) => any) {
        let _loc15_: IWindowContainer = null;
        let _loc14_: MessengerHabbiconPickerEntry = null;
        let _loc12_: MessengerHabbiconPickerTileView = null;
        let _loc10_: number = 0;
        let _loc13_: number = 0;
        let _loc16_: number = 0;
        let _loc11_: number = 0;
        this._window = asGuarded(param1.clone(), isIWindowContainer);
        this._SafeStr_14325 = new Array<MessengerHabbiconPickerTileView>(0).fill(null);
        this._type = param2;
        this._key = param3;
        this.sectionTitle.caption = param4;
        _loc15_ = asGuarded(this.habbiconGrid.getGridItemAt(0), isIWindowContainer);
        this.habbiconGrid.removeGridItems();
        _loc10_ = param5.length | 0;
        _loc13_ = Math.max(1, Math.ceil(_loc10_ / 5)) | 0;
        _loc16_ = _loc13_ * 5;
        _loc11_ = 0;
        while (_loc11_ < _loc16_) {
            _loc14_ = _loc11_ < _loc10_ ? param5[_loc11_] : null;
            _loc12_ = new MessengerHabbiconPickerTileView(_loc15_, _loc14_, param6, param7, param8, param9);
            this._SafeStr_14325.push(_loc12_);
            this.habbiconGrid.addGridItem(_loc12_.window);
            _loc11_++;
        }
        this.habbiconGrid.height = _loc13_ * 45 + (_loc13_ - 1) * 2;
        this._window.height = 20 + this.habbiconGrid.height + 2;
        _loc15_.dispose();
        this._window.visible = true;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public get type(): string {
        return this._type;
    }

    public get key(): string {
        return this._key;
    }

    public clearUnseenCounterForHabbicon(param1: number): void {
        let _loc2_: any = null;
        for (_loc2_ of this._SafeStr_14325 ?? []) {
            _loc2_.clearUnseenCounterForHabbicon(param1);
        }
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (this._disposed) {
            return;
        }
        for (_loc1_ of this._SafeStr_14325 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_14325.length = 0;
        if (this._window != null) {
            if (this._window.parent != null) {
                castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._window);
            }
            this._window.dispose();
            this._window = null;
        }
        this._SafeStr_14325 = null;
        this._type = null;
        this._key = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get sectionTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("section_title"), isITextWindow);
    }

    private get habbiconGrid(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("habbicon_grid"), isIItemGridWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
