// The File System Access pickers (Chromium; not yet in TypeScript's DOM library). Where they are
// missing, the editor falls back to a file input and downloads.

interface FilePickerType { description?: string; accept: Record<string, string[]> }

interface Window {
    showOpenFilePicker?(options?: { types?: FilePickerType[]; multiple?: boolean }): Promise<FileSystemFileHandle[]>;
    showSaveFilePicker?(options?: { suggestedName?: string; types?: FilePickerType[] }): Promise<FileSystemFileHandle>;
}
