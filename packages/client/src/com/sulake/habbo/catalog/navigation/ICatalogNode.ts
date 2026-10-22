export interface ICatalogNode {
    get isOpen(): boolean;
    get depth(): number;
    get isBranch(): boolean;
    get isLeaf(): boolean;
    get visible(): boolean;
    get localization(): string;
    get pageId(): number;
    get pageName(): string;
    get children(): ICatalogNode[];
    get offerIds(): number[];
    get parent(): ICatalogNode;
    get iconName(): string;
    get offsetV(): number;
    dispose(): void;
    activate(): void;
    deactivate(): void;
    addChild(param1: ICatalogNode): void;
    open(): void;
    close(): void;
}
