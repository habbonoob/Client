import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IContextMenuParentWidget } from '@/com/sulake/habbo/ui/widget/contextmenu/IContextMenuParentWidget';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { ButtonMenuView } from '@/com/sulake/habbo/ui/widget/contextmenu/ButtonMenuView';
import { ContextInfoView } from '@/com/sulake/habbo/ui/widget/contextmenu/ContextInfoView';

export class FurnitureContextInfoView extends ButtonMenuView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.contextmenu::FurnitureContextInfoView'); }

    public static setup(param1: FurnitureContextInfoView, param2: IRoomObject, param3: string = ""): void {
        param1._object = param2;
        param1._title = param3;
        ContextInfoView.setupContext(param1);
    }

    constructor(param1: IContextMenuParentWidget) {
        super(param1);
    }

    declare protected _object: IRoomObject;

    declare protected _title: string;

    protected get roomObject(): IRoomObject {
        return this._object;
    }

    public override dispose(): void {
        this._object = null;
        super.dispose();
    }
}
