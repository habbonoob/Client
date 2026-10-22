import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IWindowParser extends IDisposable {
    parseAndConstruct(param1: XML, param2: IWindow, param3: UtilsMap): IWindow;
    windowToXMLString(param1: IWindow): string;
}
