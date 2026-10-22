export interface ILinkEventTracker {
    get linkPattern(): string;
    linkReceived(param1: string): void;
}
