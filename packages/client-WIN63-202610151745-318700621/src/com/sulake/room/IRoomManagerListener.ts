export interface IRoomManagerListener {
    roomManagerInitialized(param1: boolean): void;
    contentLoaded(param1: string, param2: boolean): void;
    objectInitialized(param1: string, param2: number, param3: number): void;
    objectsInitialized(param1: string): void;
}
