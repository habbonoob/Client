import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';

export interface SpecialItem extends IProductDisplayInfo {
    get index(): number;
    get itemKey(): string;
    get name(): string;
    get description(): string;
    get isValid(): boolean;
}
