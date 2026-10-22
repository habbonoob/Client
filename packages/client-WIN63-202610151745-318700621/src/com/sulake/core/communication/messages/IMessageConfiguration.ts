import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';

export interface IMessageConfiguration {
    get events(): UtilsMap;
    get composers(): UtilsMap;
}
