import type { IWidget } from '@/com/sulake/core/window/IWidget';

export interface IIlluminaBorderWidget extends IWidget {
    get borderStyle(): string;
    set borderStyle(param1: string);
    get contentChild(): string;
    set contentChild(param1: string);
    get contentPadding(): number;
    set contentPadding(param1: number);
    get sidePadding(): number;
    set sidePadding(param1: number);
    get childMargin(): number;
    set childMargin(param1: number);
    get topLeftChild(): string;
    set topLeftChild(param1: string);
    get topCenterChild(): string;
    set topCenterChild(param1: string);
    get topRightChild(): string;
    set topRightChild(param1: string);
    get bottomLeftChild(): string;
    set bottomLeftChild(param1: string);
    get bottomCenterChild(): string;
    set bottomCenterChild(param1: string);
    get bottomRightChild(): string;
    set bottomRightChild(param1: string);
    get landingViewMode(): boolean;
    set landingViewMode(param1: boolean);
}
