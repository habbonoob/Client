import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PromoArticleData } from '@/com/sulake/habbo/communication/messages/incoming/landingview/PromoArticleData';

export class PromoArticlesMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.landingview::PromoArticlesMessageParser'); }

    declare private _articles: any[];

    constructor() {
    }

    public get articles(): any[] {
        return this._articles;
    }

    public flush(): boolean {
        this._articles = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            this._articles.push(new PromoArticleData(param1));
            _loc3_++;
        }
        return true;
    }
}
