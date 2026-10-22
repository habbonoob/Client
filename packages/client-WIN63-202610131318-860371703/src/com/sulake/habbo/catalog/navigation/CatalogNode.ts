import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/ICatalogNavigator';
import type { ICatalogNode } from '@/com/sulake/habbo/catalog/navigation/ICatalogNode';
import type { NodeData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/NodeData';

export class CatalogNode implements ICatalogNode {
    static { registerClassName(this, 'com.sulake.habbo.catalog.navigation::CatalogNode'); }

    private static readonly ICON_PREFIX: string = "icon_";
    private _depth: number = 0;
    private _localization: string = "";
    private _pageId: number = -1;
    private _pageName: string = "";
    private _iconId: number = 0;

    declare private _children: ICatalogNode[];

    declare private _offerIds: number[];

    declare private _navigator: ICatalogNavigator;

    declare private _parent: ICatalogNode;

    constructor(param1: ICatalogNavigator, param2: NodeData, param3: number, param4: ICatalogNode) {
        this._depth = param3;
        this._parent = param4;
        this._navigator = param1;
        this._localization = param2.localization;
        this._pageId = param2.pageId;
        this._pageName = param2.pageName;
        this._iconId = param2.icon;
        this._children = new Array<ICatalogNode>(0).fill(null);
        this._offerIds = param2.offerIds;
    }

    public get isOpen(): boolean {
        return false;
    }

    public get depth(): number {
        return this._depth;
    }

    public get isBranch(): boolean {
        return this._children.length > 0;
    }

    public get isLeaf(): boolean {
        return this._children.length == 0;
    }

    public get visible(): boolean {
        return false;
    }

    public get localization(): string {
        return this._localization;
    }

    public get pageId(): number {
        return this._pageId;
    }

    public get pageName(): string {
        return this._pageName;
    }

    public get children(): ICatalogNode[] {
        return this._children;
    }

    public get offerIds(): number[] {
        return this._offerIds;
    }

    public get navigator(): ICatalogNavigator {
        return this._navigator;
    }

    public get parent(): ICatalogNode {
        return this._parent;
    }

    public set parent(param1: ICatalogNode) {
    }

    public dispose(): void {
        for (const _loc1_ of this._children ?? []) {
            _loc1_.dispose();
        }
        this._children = null;
        this._offerIds = null;
        this._navigator = null;
        this._parent = null;
        this._pageName = "";
        this._localization = "";
    }

    public addChild(param1: ICatalogNode): void {
        if (param1 == null) {
            return;
        }
        this._children.push(param1);
    }

    public activate(): void {
    }

    public deactivate(): void {
    }

    public open(): void {
    }

    public close(): void {
    }

    public get iconName(): string {
        if (this._iconId < 1) {
            return "";
        }
        return "icon_" + this._iconId.toString();
    }

    public get offsetV(): number {
        return 0;
    }
}
