import { registerTypeDescriptions } from '@habbo-pixi/runtime/utils/describeType';

export interface IApiListener {
    apiResponse(param1: string, param2: any): void;
    apiRawResponse(param1: string, param2: any): void;
    apiError(param1: string, param2: number, param3: string, param4: any, param5?: boolean): void;
}

registerTypeDescriptions({"com.sulake.habbo.communication::IApiListener":{"interface":true,"instance":[["m","apiResponse","void",[],[["String",false],["Object",false]]],["m","apiRawResponse","void",[],[["String",false],["Object",false]]],["m","apiError","void",[],[["String",false],["int",false],["String",false],["Object",false],["Boolean",true]]]]}});
