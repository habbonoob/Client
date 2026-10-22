import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class NodeData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.catalog::NodeData'); }

    constructor(param1: IMessageDataWrapper) {
        let _loc3_: number = 0;
        this._visible = param1.readBoolean();
        this._icon = param1.readInteger();
        this._pageId = param1.readInteger();
        this._pageName = param1.readString();
        this._localization = param1.readString();
        this._offerIds = new Array<number>(0).fill(0);
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._offerIds.push(param1.readInteger());
            _loc3_++;
        }
        this._children = new Array<NodeData>(0).fill(null);
        let _loc4_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc4_) {
            this._children.push(new NodeData(param1));
            _loc3_++;
        }
    }

    declare private _visible: boolean;
    static { (this.prototype as any)._visible = false; }

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _icon: number;
    static { (this.prototype as any)._icon = 0; }

    public get icon(): number {
        return this._icon;
    }

    declare private _pageName: string;

    public get pageName(): string {
        return this._pageName;
    }

    declare private _localization: string;

    public get localization(): string {
        return this._localization;
    }

    declare private _children: NodeData[];

    public get children(): NodeData[] {
        return this._children;
    }

    declare private _offerIds: number[];

    public get offerIds(): number[] {
        return this._offerIds;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public get pageId(): number {
        return this._pageId;
    }
}
