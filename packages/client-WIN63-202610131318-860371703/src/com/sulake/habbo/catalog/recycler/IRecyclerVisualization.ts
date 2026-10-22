export interface IRecyclerVisualization {
    updateUI(): void;
    updateSlots(): void;
    updateRecycleButton(): void;
    get disposed(): boolean;
}
