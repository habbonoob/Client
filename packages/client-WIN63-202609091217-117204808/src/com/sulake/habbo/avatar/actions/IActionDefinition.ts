export interface IActionDefinition {
    get id(): string;
    get state(): string;
    get precedence(): number;
    get activePartSet(): string;
    get isMain(): boolean;
    get isDefault(): boolean;
    get assetPartDefinition(): string;
    get lay(): string;
    get geometryType(): string;
    get isAnimation(): boolean;
    get startFromFrameZero(): boolean;
    isAnimated(param1: string): boolean;
    getPrevents(param1?: string): any[];
    getPreventHeadTurn(param1?: string): boolean;
    setOffsets(param1: string, param2: number, param3: any[]): void;
    getOffsets(param1: string, param2: number): any[];
}
