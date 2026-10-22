import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { ILinkEventTracker } from '@/com/sulake/core/runtime/events/ILinkEventTracker';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import type { IFileProxy } from '@/com/sulake/core/utils/IFileProxy';
import type { LibraryLoader } from '@/com/sulake/core/utils/LibraryLoader';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import type { ApplicationDomain } from '@habbo-pixi/runtime/system/ApplicationDomain';
import type { LoaderContext } from '@habbo-pixi/runtime/system/LoaderContext';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { AssetLibraryCollection, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { IContext } from '@/com/sulake/core/runtime/IContext';
import { ICore } from '@/com/sulake/core/runtime/ICore';
import { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUnknown } from '@/com/sulake/core/runtime/IUnknown';

export class FakeContext implements ICore {
    static { registerClassName(this, 'FakeContext'); }

    constructor(param1: Map<any, any>) {
        this._events = new EventDispatcherWrapper();
        this._assets = new AssetLibraryCollection("fakeAssetCollection");
        this._arguments = param1;
    }

    declare private _events: IEventDispatcher;

    declare private _configuration: ICoreConfiguration;

    declare private _arguments: Map<any, any>;

    declare private _assets: AssetLibraryCollection;

    public get assets(): IAssetLibrary {
        return this._assets;
    }

    public get events(): IEventDispatcher {
        return this._events;
    }

    public get root(): IContext {
        return null;
    }

    public get displayObjectContainer(): DisplayObjectContainer {
        return null;
    }

    public get disposed(): boolean {
        return false;
    }

    public get configuration(): ICoreConfiguration {
        return this._configuration;
    }

    public set configuration(param1: ICoreConfiguration) {
        this._configuration = param1;
    }

    public get linkEventTrackers(): ILinkEventTracker[] {
        return null;
    }

    public get arguments(): Map<any, any> {
        return this._arguments;
    }

    public get fileProxy(): IFileProxy {
        return undefined;
    }

    public error(param1: string, param2: boolean, param3: number = -1, param4: Error = null): boolean {
        return false;
    }

    public getLastErrorMessage(): string {
        return "";
    }

    public debug(param1: string): void {
    }

    public getLastDebugMessage(): string {
        return "";
    }

    public warning(param1: string): void {
    }

    public getLastWarningMessage(): string {
        return "";
    }

    public loadFromFile(param1: URLRequest, param2: LoaderContext): LibraryLoader {
        return null;
    }

    public attachComponent(param1: Component, param2: any[]): void {
    }

    public detachComponent(param1: Component): void {
    }

    public prepareComponent(param1: any, param2: number = 0, param3: ApplicationDomain = null): IUnknown {
        return null;
    }

    public prepareAssetLibrary(param1: XML, param2: any): boolean {
        return false;
    }

    public registerUpdateReceiver(param1: IUpdateReceiver, param2: number): void {
    }

    public removeUpdateReceiver(param1: IUpdateReceiver): void {
    }

    public toXMLString(param1: number = 0): string {
        return "";
    }

    public queueInterface(param1: IID, param2: (...args: any[]) => any = null): IUnknown {
        return null;
    }

    public release(param1: IID): number {
        return 0;
    }

    public dispose(): void {
        this._assets.dispose();
        this._events = null;
        this._assets = null;
    }

    public injectDependencies(param1: Component): void {
    }

    public addLinkEventTracker(param1: ILinkEventTracker): void {
    }

    public removeLinkEventTracker(param1: ILinkEventTracker): void {
    }

    public createLinkEvent = (param1: string): void => {
    };

    public initialize(): void {
    }

    public purge(): void {
    }

    public hibernate(param1: number, param2: number = 1): void {
    }

    public resume(): void {
    }

    public readConfigDocument(param1: XML, param2: IEventDispatcher = null): void {
    }

    public writeDictionaryToProxy(param1: string, param2: Map<any, any>): boolean {
        return false;
    }

    public readDictionaryFromProxy(param1: string): Map<any, any> {
        return new Dictionary();
    }

    public writeXMLToProxy(param1: string, param2: XML): boolean {
        return false;
    }

    public readXMLFromProxy(param1: string): XML {
        return new XML();
    }

    public readStringFromProxy(param1: string): string {
        return "";
    }

    public writeStringToProxy(param1: string, param2: string): boolean {
        return false;
    }

    public getNumberOfFilesPending(): number {
        return 0;
    }

    public getNumberOfFilesLoaded(): number {
        return 0;
    }

    public setProfilerMode(param1: boolean): void {
    }

    public clearArguments(): void {
        this._arguments = new Dictionary();
    }

    public propertyExists(param1: string): boolean {
        return false;
    }

    public getProperty(param1: string, param2: Map<any, any> = null): string {
        return "";
    }

    public setProperty(param1: string, param2: string, param3: boolean = false, param4: boolean = false): void {
    }

    public getBoolean(param1: string): boolean {
        return false;
    }

    public getInteger(param1: string, param2: number): number {
        return 0;
    }

    public interpolate(param1: string): string {
        return "";
    }

    public updateUrlProtocol(param1: string): string {
        return "";
    }

    get [ICore](): true {
        return true;
    }

    get [IContext](): true {
        return true;
    }

    get [IUnknown](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [ICoreConfiguration](): true {
        return true;
    }
}
