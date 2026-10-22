import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';

export interface ICatalogWidget {
    set page(param1: ICatalogPage);
    set events(param1: IEventDispatcher);
    get window(): IWindowContainer;
    get events(): IEventDispatcher;
    get page(): ICatalogPage;
    dispose(): void;
    init(): boolean;
    closed(): void;
}
