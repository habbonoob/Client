import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';

export interface ICatalogNavigator {
    dispose(): void;
    get catalog(): IHabboCatalog;
    buildCatalogIndex(param1: NodeData): void;
    showIndex(): void;
    activateNode(param1: ICatalogNode): void;
    loadFrontPage(): void;
    get initialized(): boolean;
    getNodesByOfferId(param1: number, param2?: boolean): ICatalogNode[];
    getNodeByName(param1: string): ICatalogNode;
    getOptionalNodeByName(param1: string): ICatalogNode;
    getNodeById(param1: number, param2?: ICatalogNode): ICatalogNode;
    openPage(param1: string): void;
    openPageById(param1: number, param2: number): void;
    openPageByOfferId(param1: number): void;
    deactivateCurrentNode(): void;
    filter(param1: string, param2: any[], param3?: Map<any, any>): void;
    get listTemplate(): IWindow;
    getItemTemplate(param1: number): IWindow;
    get isDeepHierarchy(): boolean;
}
