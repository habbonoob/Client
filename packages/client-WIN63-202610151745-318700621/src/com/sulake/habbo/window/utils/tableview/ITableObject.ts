import type { TableCell } from '@/com/sulake/habbo/window/utils/tableview/TableCell';

export interface ITableObject {
    get identifier(): string;
    getTableCell(param1: string): TableCell;
    isPropertyUpdated(param1: string, param2: any): boolean;
    isUpdated(param1: any): boolean;
}
