import type { IPropertyMap } from '@/com/sulake/core/window/theme/IPropertyMap';

export interface IThemeManager {
    getStyle(param1: string, param2: number, param3: string): number;
    getThemeAndIntent(param1: number, param2: number): any;
    getIntents(param1: number, param2: string, param3: number): any[];
    getPropertyDefaults(param1: number): IPropertyMap;
    getThemes(): any[];
}
