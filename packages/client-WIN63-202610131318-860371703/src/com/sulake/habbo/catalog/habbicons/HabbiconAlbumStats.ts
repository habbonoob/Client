import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabbiconAlbumStats {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconAlbumStats'); }

    public ownedHabbicons: number = 0;
    public completedSets: number = 0;
    public collected: number = 0;
    public total: number = 0;

    constructor() {
    }

    public get progressRatio(): number {
        return this.total <= 0 ? 0 : Number(Math.max(0, Math.min(1, this.collected / this.total)));
    }
}
