import { WindowTypeTable } from '@/com/sulake/core/window/utils/WindowTypeTable';

/** The element tags the client's window parser knows (its type table), sorted: what an element can be. */
export function windowTypeNames(): string[] {
    const table = new Map<string, number>();
    WindowTypeTable.fillTables(table);
    return [...table.keys()].sort();
}
