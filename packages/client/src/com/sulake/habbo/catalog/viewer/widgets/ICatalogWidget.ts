import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface ICatalogWidget {
    get window(): IWindowContainer;
    get events(): IEventDispatcher;
    set events(param1: IEventDispatcher);
    get page(): ICatalogPage;
    set page(param1: ICatalogPage);
    dispose(): void;
    init(): boolean;
    closed(): void;
}
