import type { VideoOfferTypeEnum } from '@/com/sulake/habbo/catalog/enum/VideoOfferTypeEnum';
import type { IVideoOfferLauncher } from '@/com/sulake/habbo/catalog/IVideoOfferLauncher';

export interface IVideoOfferManager {
    get enabled(): boolean;
    load(param1: IVideoOfferLauncher): void;
    launch(param1: VideoOfferTypeEnum): boolean;
}
