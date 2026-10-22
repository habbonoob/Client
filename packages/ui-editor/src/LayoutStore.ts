import type { SourceUsage } from './LayoutGroups';

/** The editor's server side (layoutApi.ts): where saved layouts go. */
export class LayoutStore {
    /** The pack paths the overlay has edits for. */
    async edited(): Promise<string[]> {
        const response = await fetch('api/edited');
        return response.ok ? await response.json() as string[] : [];
    }

    /** Saves a layout's text at its pack path. */
    async save(packPath: string, text: string): Promise<void> {
        const response = await fetch(`api/layout?path=${encodeURIComponent(packPath)}`, { method: 'PUT', body: new TextEncoder().encode(text) });
        if (!response.ok) throw new Error(await response.text());
    }

    /** The layouts made in the editor (saved in its layouts/ folder). */
    async newLayouts(): Promise<{ name: string; text: string }[]> {
        const response = await fetch('api/new');
        return response.ok ? await response.json() as { name: string; text: string }[] : [];
    }

    /** Saves a layout made in the editor. */
    async saveNew(name: string, text: string): Promise<void> {
        const response = await fetch(`api/new?name=${encodeURIComponent(name)}`, { method: 'PUT', body: new TextEncoder().encode(text) });
        if (!response.ok) throw new Error(await response.text());
    }

    /** Where the client's source names these strings, and what imports those files (for grouping pieces). */
    async usage(strings: string[]): Promise<SourceUsage> {
        const response = await fetch('api/usage', { method: 'POST', body: JSON.stringify(strings) });
        return response.ok ? await response.json() as SourceUsage : { files: {}, importers: {} };
    }

    /** Undoes every edit to a layout; resolves with the original text. */
    async revert(packPath: string): Promise<string> {
        const response = await fetch(`api/revert?path=${encodeURIComponent(packPath)}`, { method: 'POST' });
        if (!response.ok) throw new Error(await response.text());
        return new TextDecoder().decode(await response.arrayBuffer());
    }
}
