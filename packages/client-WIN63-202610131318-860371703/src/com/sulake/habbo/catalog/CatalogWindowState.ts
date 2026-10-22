import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ICatalogNavigator } from '@/com/sulake/habbo/catalog/navigation/ICatalogNavigator';
import type { CatalogViewer } from '@/com/sulake/habbo/catalog/viewer/CatalogViewer';
import { RequestedPage } from '@/com/sulake/habbo/catalog/navigation/RequestedPage';

export class CatalogWindowState {
    static { registerClassName(this, 'com.sulake.habbo.catalog::CatalogWindowState'); }

    declare public catalogType: string;

    declare public mainContainer: IWindowContainer;

    declare public catalogViewer: CatalogViewer;

    declare public catalogNavigator: ICatalogNavigator;

    declare public _SafeStr_2639: RequestedPage;

    public lastPageRequestId: number = -1;

    constructor(param1: string) {
        this.catalogType = param1;
        this._SafeStr_2639 = new RequestedPage();
    }

    public dispose(): void {
        if (this.catalogViewer != null) {
            this.catalogViewer.dispose();
            this.catalogViewer = null;
        }
        if (this.catalogNavigator != null) {
            this.catalogNavigator.dispose();
            this.catalogNavigator = null;
        }
        if (this.mainContainer != null) {
            this.mainContainer.dispose();
            this.mainContainer = null;
        }
        this._SafeStr_2639 = null;
        this.catalogType = null;
        this.lastPageRequestId = -1;
    }
}
