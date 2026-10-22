// as3corelib's JSON facade (adobe.serialization.json.JSON). The client only decodes with it.

import { JSONDecoder } from './JSONDecoder';

export class JSON {
    /** Decode a JSON text; strict by default (see JSONDecoder for what lenient mode accepts). */
    static decode(text: string, strict = true): any {
        return new JSONDecoder(text, strict).getValue();
    }
}
