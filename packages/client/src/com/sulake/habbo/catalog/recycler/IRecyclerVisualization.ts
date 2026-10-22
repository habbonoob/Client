export interface IRecyclerVisualization {
    get disposed(): boolean;
    updateUI(): void;
    updateSlots(): void;
    updateRecycleButton(): void;
}
