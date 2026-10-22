import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';

export interface ICatalogNavigator {
    get catalog(): IHabboCatalog;
    get initialized(): boolean;
    get listTemplate(): IWindow;
    get isDeepHierarchy(): boolean;
    dispose(): void;
    buildCatalogIndex(param1: NodeData): void;
    showIndex(): void;
    activateNode(param1: ICatalogNode): void;
    loadFrontPage(): void;
    getNodesByOfferId(param1: number, param2?: boolean): ICatalogNode[];
    getNodeByName(param1: string): ICatalogNode;
    getOptionalNodeByName(param1: string): ICatalogNode;
    getNodeById(param1: number, param2?: ICatalogNode): ICatalogNode;
    openPage(param1: string): void;
    openPageById(param1: number, param2: number): void;
    openPageByOfferId(param1: number): void;
    deactivateCurrentNode(): void;
    filter(param1: string, param2: any[]): void;
    getItemTemplate(param1: number): IWindow;
}
