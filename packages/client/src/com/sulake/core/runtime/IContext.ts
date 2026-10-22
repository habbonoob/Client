import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import type { LibraryLoader } from '@/com/sulake/core/utils/LibraryLoader';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import type { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import type { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export interface IContext extends IUnknown {
    get assets(): IAssetLibrary;
    get events(): IEventDispatcher;
    get root(): IContext;
    get displayObjectContainer(): DisplayObjectContainer;
    get configuration(): ICoreConfiguration;
    set configuration(param1: ICoreConfiguration);
    get linkEventTrackers(): ILinkEventTracker[];
    error(param1: string, param2: boolean, param3?: number, param4?: Error): boolean;
    getLastErrorMessage(): string;
    debug(param1: string): void;
    getLastDebugMessage(): string;
    warning(param1: string): void;
    getLastWarningMessage(): string;
    loadFromFile(param1: URLRequest, param2: LoaderContext): LibraryLoader;
    attachComponent(param1: Component, param2: any[]): void;
    detachComponent(param1: Component): void;
    prepareComponent(param1: any, param2?: number, param3?: ApplicationDomain): IUnknown;
    prepareAssetLibrary(param1: XML, param2: any): boolean;
    registerUpdateReceiver(param1: IUpdateReceiver, param2: number): void;
    removeUpdateReceiver(param1: IUpdateReceiver): void;
    toXMLString(param1?: number): string;
    addLinkEventTracker(param1: ILinkEventTracker): void;
    removeLinkEventTracker(param1: ILinkEventTracker): void;
    createLinkEvent(param1: string): void;
}

export const IContext = Symbol('com.sulake.core.runtime::IContext');
registerClassName(IContext, 'com.sulake.core.runtime::IContext');

export function isIContext(value: unknown): value is IContext {
    return (value as { [IContext]?: true } | null | undefined)?.[IContext] === true;
}
