export interface IRoomAreaSelectionManager {
    activate(param1: (...args: any[]) => any, param2: string): boolean;
    deactivate(): void;
    startSelecting(): void;
    clearHighlight(): void;
    setHighlight(param1: number, param2: number, param3: number, param4: number): void;
}
