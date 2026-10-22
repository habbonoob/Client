import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { ISkinRenderer } from '@/com/sulake/core/window/graphics/renderer/ISkinRenderer';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IThemeManager } from '@/com/sulake/core/window/theme/IThemeManager';
import type { DefaultAttStruct } from '@/com/sulake/core/window/utils/DefaultAttStruct';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IWindowFactory {
    create(param1: string, param2: number, param3: number, param4: number, param5: Rectangle, param6?: (...args: any[]) => any, param7?: string, param8?: number, param9?: any[], param10?: IWindow, param11?: any[], param12?: string): IWindow;
    destroy(param1: IWindow): void;
    buildFromXML(param1: XML, param2?: number, param3?: UtilsMap): IWindow;
    windowToXMLString(param1: IWindow): string;
    getLayoutByTypeAndStyle(param1: number, param2: number): XML;
    getDefaultsByTypeAndStyle(param1: number, param2: number): DefaultAttStruct;
    getRendererByTypeAndStyle(param1: number, param2: number): ISkinRenderer;
    getThemeManager(): IThemeManager;
}
