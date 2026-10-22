import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { ElementTree } from './ElementTree';
import { History, type Snapshot } from './History';
import { isHosted, type LayoutCatalog } from './LayoutCatalog';
import { LayoutDocument } from './LayoutDocument';
import { LayoutGroups } from './LayoutGroups';
import type { LayoutEntry } from './LayoutEntry';
import { LayoutStore } from './LayoutStore';
import { PreviewOverlay } from './PreviewOverlay';
import { PropertyPanel } from './PropertyPanel';
import type { WindowSystem } from './WindowSystem';

/** Width of the layout list and of the inspector: the preview is what is left between them. */
const LIST_WIDTH = 300;
const INSPECTOR_WIDTH = 420;

interface OpenLayout {
    entry: LayoutEntry;
    doc: LayoutDocument;
    /** The layout as last saved (or loaded), serialized as the document serializes it: the edits are the difference. */
    saved: string;
    window: IWindow | null;
    selected: number | null;
}

/** An attribute's number (0 when it is absent, as the parser reads it); null when it holds something else. */
function numberOf(element: Element, name: string): number | null {
    const value = element.getAttribute(name);
    if (value == null || value.trim() === '') return 0;
    return /^-?\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : null;
}

const byId = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

/**
 * The editor's page: the layout list on the left; the open layout in the middle, built by the client's window
 * system from the document being edited; and on the right its element tree and the selected element's settings, or
 * its XML. Built-in layouts save into the asset overlay and the client's pack (LayoutStore).
 */
export class EditorPage {
    readonly #system: WindowSystem;
    readonly #catalog: LayoutCatalog;
    readonly #store: LayoutStore;
    readonly #list = byId('list');
    readonly #search = byId<HTMLInputElement>('search');
    readonly #title = byId('title');
    readonly #status = byId('status');
    readonly #xml = byId<HTMLTextAreaElement>('xml');
    readonly #save = byId<HTMLButtonElement>('save');
    readonly #revert = byId<HTMLButtonElement>('revert');
    readonly #tree: ElementTree;
    readonly #properties: PropertyPanel;
    readonly #overlay: PreviewOverlay;
    readonly #history = new History();
    readonly #undo = byId<HTMLButtonElement>('undo');
    readonly #redo = byId<HTMLButtonElement>('redo');
    /** Layouts saved this session, by name: what they are now (the page's pack still has them as they were). */
    readonly #savedTexts = new Map<string, string>();
    #edited = new Set<string>();
    /** Layouts made in the editor (listed first, saved in its layouts/ folder). */
    #newEntries: LayoutEntry[] = [];
    /** The pieces each layout is built with, listed under it (none until the source has been searched). */
    #groups = LayoutGroups.none();
    /** Parents whose pieces are shown. */
    readonly #expanded = new Set<LayoutEntry>();
    #open: OpenLayout | null = null;

    constructor(system: WindowSystem, catalog: LayoutCatalog, store: LayoutStore) {
        this.#system = system;
        this.#catalog = catalog;
        this.#store = store;
        this.#tree = new ElementTree(byId('tree'));
        this.#properties = new PropertyPanel(byId('properties'));
        this.#overlay = new PreviewOverlay(byId('surface'));
        this.#tree.onSelect = id => this.#select(id);
        this.#overlay.onSelect = id => this.#select(id);
        this.#properties.onChange = select => this.#changed(select);
        this.#overlay.onMoved = (id, dx, dy) => this.#nudge(id, dx, dy);
        this.#overlay.onResized = (id, width, height) => this.#setNumbers(id, { width, height });
        this.#search.addEventListener('input', () => this.#renderList());
        byId('apply-xml').addEventListener('click', () => this.#applyXml());
        this.#save.addEventListener('click', () => void this.#saveLayout());
        this.#revert.addEventListener('click', () => void this.#revertLayout());
        this.#undo.addEventListener('click', () => this.#travel(this.#history.undo()));
        this.#redo.addEventListener('click', () => this.#travel(this.#history.redo()));
        // the clipboard holds elements as XML (so they paste into another layout, or into a text editor, too)
        document.addEventListener('copy', e => this.#copy(e, false));
        document.addEventListener('cut', e => this.#copy(e, true));
        document.addEventListener('paste', e => this.#paste(e));
        for (const tab of document.querySelectorAll<HTMLButtonElement>('#tabs button')) tab.addEventListener('click', () => this.#showTab(tab.dataset.tab!));
        window.addEventListener('resize', () => this.#placeWindow());
        window.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                void this.#saveLayout();
                return;
            }
            // the rest act on the layout, unless a field has the keyboard (it has its own undo, copy and paste)
            const target = e.target as HTMLElement;
            if (target.closest('input, textarea, select') || !this.#open) return;
            const ctrl = e.ctrlKey || e.metaKey;
            const key = e.key.toLowerCase();
            if (ctrl && (key === 'y' || (key === 'z' && e.shiftKey))) {
                e.preventDefault();
                this.#travel(this.#history.redo());
                return;
            }
            if (ctrl && key === 'z') {
                e.preventDefault();
                this.#travel(this.#history.undo());
                return;
            }
            if (this.#open.selected == null) return;
            const id = this.#open.selected;
            const step = e.shiftKey ? 10 : 1;
            const nudges: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
            if (ctrl && key === 'd') {
                e.preventDefault();
                this.#properties.duplicate();
            } else if (e.altKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                this.#selectRelative(id, e.key === 'ArrowUp' ? 'parent' : 'child');
            } else if (e.key in nudges) {
                e.preventDefault();
                this.#nudge(id, ...nudges[e.key]);
            } else if (e.key === 'Delete') {
                e.preventDefault();
                this.#properties.delete();
            } else if (e.key === 'Escape') {
                this.#select(null);
            }
        });
        window.addEventListener('beforeunload', e => { if (this.#dirty()) e.preventDefault(); });
        this.#showTab('edit');
        this.#updateButtons();
        byId('new').addEventListener('click', () => {
            const form = byId<HTMLFormElement>('new-form');
            form.hidden = !form.hidden;
            if (!form.hidden) byId('new-name').focus();
        });
        byId<HTMLFormElement>('new-form').addEventListener('submit', e => {
            e.preventDefault();
            this.#createLayout(byId<HTMLInputElement>('new-name').value.trim());
        });
        void store.newLayouts().then(layouts => {
            this.#newEntries = layouts.map(l => this.#newEntry(l.name, l.text));
            this.#renderList();
        });
        // the element names of every layout: the code names the element it adds a piece into
        const elementNames = new Map<LayoutEntry, Set<string>>();
        for (const entry of catalog.entries) {
            try {
                const doc = LayoutDocument.parse(entry.source());
                elementNames.set(entry, new Set(doc.allElements().map(({ element }) => element.getAttribute('name')).filter((n): n is string => !!n)));
            } catch {
                // not well-formed: no names to go by
            }
        }
        void store.usage(LayoutGroups.strings(catalog.entries, elementNames)).then(usage => {
            this.#groups = LayoutGroups.from(catalog.entries, elementNames, usage);
            this.#renderList();
        });
        void store.edited().then(paths => {
            const set = new Set(paths);
            this.#edited = new Set(catalog.entries.filter(e => e.packPath && set.has(e.packPath)).map(e => e.name));
            this.#renderList();
        });
        this.#renderList();
    }

    /**
     * The layout list, by component. A layout's pieces (the hosted layouts its code adds into it) are listed under
     * it, folded until opened; filtering lists every match on its own.
     */
    #renderList(): void {
        const filter = this.#search.value.trim().toLowerCase();
        this.#list.replaceChildren();
        let group = '';
        let shown = 0;
        // the layouts the open one is a piece of show their pieces, so the open one is in view
        for (let at = this.#open ? this.#groups.parentOf.get(this.#open.entry) : undefined; at; at = this.#groups.parentOf.get(at)) this.#expanded.add(at);
        for (const entry of [...this.#newEntries, ...this.#catalog.entries]) {
            if (filter) {
                if (!entry.name.toLowerCase().includes(filter) && !entry.owner.toLowerCase().includes(filter)) continue;
            } else if (this.#groups.parentOf.has(entry)) {
                continue;   // listed under its parent
            }
            const entryGroup = entry.isNew ? 'New layouts' : entry.owner.replace(/^Habbo/, '').replace(/Com$/, '') + (entry.skinPart ? ' · skin parts' : '');
            if (entryGroup !== group) {
                group = entryGroup;
                const heading = document.createElement('h3');
                heading.textContent = group;
                this.#list.appendChild(heading);
            }
            if (filter) this.#list.appendChild(this.#listButton(entry, 0, 0));
            else this.#appendTree(entry, 0);
            shown++;
        }
        if (shown === 0) {
            const none = document.createElement('h3');
            none.textContent = 'No layouts match';
            this.#list.appendChild(none);
        }
    }

    /** A layout's row, then (when unfolded) its pieces' rows, and theirs. */
    #appendTree(entry: LayoutEntry, depth: number): void {
        const children = this.#groups.childrenOf.get(entry) ?? [];
        this.#list.appendChild(this.#listButton(entry, depth, children.length));
        if (children.length > 0 && this.#expanded.has(entry)) for (const child of children) this.#appendTree(child, depth + 1);
    }

    /** A row of the layout list: a piece is indented; a parent has a fold toggle and says how many pieces it has. */
    #listButton(entry: LayoutEntry, depth: number, pieces: number): HTMLElement {
        const button = document.createElement('button');
        button.className = depth > 0 ? 'piece' : '';
        if (depth > 0) button.style.paddingLeft = `${20 + depth * 16}px`;
        const parent = this.#groups.parentOf.get(entry);
        button.title = `${entry.name} (${entry.owner}${entry.packPath ? `, ${entry.packPath}` : ''})`
            + (parent ? `\nA piece of ${parent.name}: drawn into a window its code adds it to` : '')
            + (entry.hosted && !parent ? '\nDrawn into a window the client adds it to' : '');
        if (pieces > 0) {
            const toggle = document.createElement('span');
            toggle.className = 'fold';
            toggle.textContent = this.#expanded.has(entry) ? '\u25be' : '\u25b8';
            toggle.title = `${pieces} piece${pieces === 1 ? '' : 's'}`;
            toggle.addEventListener('click', e => {
                e.stopPropagation();
                if (this.#expanded.has(entry)) this.#expanded.delete(entry);
                else this.#expanded.add(entry);
                this.#renderList();
            });
            button.appendChild(toggle);
        }
        button.append(entry.name);
        if (pieces > 0) {
            const count = document.createElement('span');
            count.className = 'count';
            count.textContent = String(pieces);
            button.appendChild(count);
        }
        button.classList.toggle('edited', this.#edited.has(entry.name));
        button.classList.toggle('selected', this.#open?.entry === entry);
        button.addEventListener('click', () => this.open(entry));
        return button;
    }

    /** A layout made in the editor, as an entry of the list (its images come from the window manager's assets). */
    #newEntry(name: string, text: string): LayoutEntry {
        const windowManager = this.#catalog.entries.find(e => e.owner === 'HabboWindowManagerCom');
        return { name, owner: 'new', library: windowManager!.library, skinPart: false, hosted: isHosted(text), packPath: null, source: () => text, isNew: true };
    }

    /** Starts a new layout: a frame of the name (styled as the client's own frames, e.g. the HC center's), saved at once so it is in the list. */
    #createLayout(name: string): void {
        if (!/^[A-Za-z][\w-]{0,79}$/.test(name)) {
            this.#problem('A layout name starts with a letter, and has letters, digits, _ and - only.');
            return;
        }
        if ([...this.#newEntries, ...this.#catalog.entries].some(e => e.name === name)) {
            this.#problem(`There is a layout called ${name} already.`);
            return;
        }
        const text = `<?xml version="1.0" encoding="UTF-8"?>
<layout name="${name}" width="320" height="240">
  <window>
    <frame x="0" y="0" width="320" height="240" params="32769" style="3" name="${name}" caption="${name}" color="0xff418db0" treshold="0">
      <children>
        <text x="16" y="16" width="200" height="20" caption="Hello" />
      </children>
    </frame>
  </window>
</layout>
`;
        void this.#store.saveNew(name, text).then(() => {
            const entry = this.#newEntry(name, text);
            this.#newEntries.push(entry);
            this.#newEntries.sort((a, b) => a.name.localeCompare(b.name));
            byId<HTMLFormElement>('new-form').hidden = true;
            byId<HTMLInputElement>('new-name').value = '';
            this.open(entry);
        }, (e: unknown) => this.#problem(`Creating the layout failed: ${e instanceof Error ? e.message : String(e)}`));
    }

    /** Opens a layout (as last saved this session, else as the pack has it). */
    open(entry: LayoutEntry): void {
        if (this.#open?.entry === entry) return;
        if (this.#dirty() && !confirm(`Discard the unsaved changes to ${this.#open!.entry.name}?`)) return;
        let doc: LayoutDocument;
        try {
            doc = LayoutDocument.parse(this.#savedTexts.get(entry.name) ?? entry.source());
        } catch (e) {
            this.#problem(`${entry.name} is not well-formed XML: ${e instanceof Error ? e.message : String(e)}`);
            return;
        }
        this.#disposeWindow();
        this.#open = { entry, doc, saved: doc.toString(), window: null, selected: null };
        this.#title.textContent = entry.name;
        this.#title.title = `${entry.owner}${entry.packPath ? ` — ${entry.packPath}` : ''}`;
        this.#renderList();
        this.#history.reset(this.#snapshot());
        this.#rebuild();
    }

    /** Builds the open document with the client's window system, in place of the last build. */
    #rebuild(): void {
        const open = this.#open;
        if (!open) return;
        this.#disposeWindow();
        try {
            const windowManager = this.#system.windowManager;
            const built = windowManager.buildFromXML(XML.from(open.doc.previewSource()), 1);
            open.window = built;
            this.#status.className = '';
            this.#status.textContent = built ? `${built.width} × ${built.height}` : 'The layout built nothing.';
            // A root that draws into its parent's graphics (use_parent_graphic_context, params 16) is not put on the
            // desktop: the window context gives it a stand-in parent off screen (WindowContext.create), and the
            // client adds it into one of its windows (an item template into its list). Shown here the same way, in
            // a plain container.
            if (built && built.parent !== windowManager.getDesktop(1)) {
                const host = windowManager.buildFromXML(XML.from(
                    `<layout><window><container x="0" y="0" width="${built.width}" height="${built.height}" /></window></layout>`), 1) as unknown as IWindowContainer;
                built.x = 0;
                built.y = 0;
                host.addChild(built);
                open.window = host;
                this.#status.textContent += ' — drawn into its parent (params 16): shown inside a container, as the client places it in another window';
            }
        } catch (e) {
            const detail = e instanceof Error ? e.stack ?? e.message : String(e);
            this.#problem(open.entry.skinPart
                ? `This is a part of a window skin: the skin builds it inside its element (a frame's title bar, a scrollbar), so it does not build on its own.\n\n${detail}`
                : `The client could not build this layout:\n${detail}`);
        }
        this.#placeWindow();
        this.#overlay.setBuild(open.window, open.doc);
        if (open.selected != null && !open.doc.element(open.selected)) open.selected = null;
        this.#tree.show(open.doc, open.selected);
        this.#overlay.select(open.selected);
        this.#properties.show(open.selected == null ? null : open.doc.element(open.selected));
        if (document.activeElement !== this.#xml) this.#xml.value = open.doc.toString();
        this.#updateButtons();
    }

    #select(id: number | null): void {
        const open = this.#open;
        if (!open) return;
        open.selected = id;
        this.#tree.select(id);
        this.#overlay.select(id);
        this.#properties.show(id == null ? null : open.doc.element(id));
    }

    /** The document changed: build it again, and select `select` when given (null: nothing). */
    #changed(select?: Element | null): void {
        const open = this.#open;
        if (open && select !== undefined) open.selected = select ? open.doc.idOf(select) : null;
        this.#commit();
    }

    /** A change is made: it goes into the history, and the preview is built again. */
    #commit(): void {
        this.#history.record(this.#snapshot());
        this.#rebuild();
    }

    /** The open layout now: its XML, and the selection as its place in tree order (ids are not kept across parses). */
    #snapshot(): Snapshot {
        const open = this.#open!;
        const index = open.selected == null ? -1 : open.doc.allElements().findIndex(({ element }) => open.doc.idOf(element) === open.selected);
        return { text: open.doc.toString(), selected: index < 0 ? null : index };
    }

    /** Goes to a state from the history (undo, redo). */
    #travel(state: Snapshot | null): void {
        const open = this.#open;
        if (!open || !state) return;
        open.doc = LayoutDocument.parse(state.text);
        const element = state.selected == null ? undefined : open.doc.allElements()[state.selected]?.element;
        open.selected = element ? open.doc.idOf(element) : null;
        this.#rebuild();
    }

    /** Selects the element the selected one is in, or its first child window. */
    #selectRelative(id: number, to: 'parent' | 'child'): void {
        const open = this.#open!;
        const element = open.doc.element(id);
        if (!element) return;
        const target = to === 'parent'
            ? (element.parentElement?.tagName === 'children' ? element.parentElement.parentElement : null)
            : open.doc.childElements(element)[0] ?? null;
        if (target) this.#select(open.doc.idOf(target));
    }

    /** Copies (or cuts) the selected element to the clipboard, as XML. */
    #copy(e: ClipboardEvent, cut: boolean): void {
        const open = this.#open;
        const target = e.target as HTMLElement | null;
        if (!open || open.selected == null || target?.closest?.('input, textarea, select')) return;
        const element = open.doc.element(open.selected);
        if (!element) return;
        e.preventDefault();
        e.clipboardData?.setData('text/plain', new XMLSerializer().serializeToString(element));
        if (cut) this.#properties.delete();
    }

    /** Pastes elements from the clipboard's XML: after the selected element, or at the top of the layout. */
    #paste(e: ClipboardEvent): void {
        const open = this.#open;
        const target = e.target as HTMLElement | null;
        if (!open || target?.closest?.('input, textarea, select')) return;
        const text = e.clipboardData?.getData('text/plain')?.trim();
        if (!text?.startsWith('<')) return;
        e.preventDefault();
        let pasted: Element[];
        try {
            pasted = open.doc.importElements(text);
        } catch (error) {
            this.#problem(`The clipboard does not hold layout elements: ${error instanceof Error ? error.message : String(error)}`);
            return;
        }
        const anchor = open.selected == null ? null : open.doc.element(open.selected);
        try {
            if (anchor) anchor.after(...pasted);
            else open.doc.appendTop(pasted);
        } catch (error) {
            this.#problem(error instanceof Error ? error.message : String(error));
            return;
        }
        this.#changed(pasted[pasted.length - 1] ?? null);
    }

    /** Moves an element by (dx, dy): its x and y attributes, when they are numbers (not variable references). */
    #nudge(id: number, dx: number, dy: number): void {
        const element = this.#open?.doc.element(id);
        if (!element) return;
        const x = numberOf(element, 'x'), y = numberOf(element, 'y');
        if (x == null || y == null) {
            this.#problem(`This element's position is not plain numbers (x="${element.getAttribute('x')}", y="${element.getAttribute('y')}"): edit it in the attributes.`);
            this.#rebuild();
            return;
        }
        this.#setNumbers(id, { x: x + dx, y: y + dy });
    }

    /** Sets number attributes of an element (a drag's result), unless one holds something else (a variable). */
    #setNumbers(id: number, values: Record<string, number>): void {
        const element = this.#open?.doc.element(id);
        if (!element) return;
        const blocked = Object.keys(values).filter(k => numberOf(element, k) == null);
        if (blocked.length > 0) {
            this.#problem(`Not changed: ${blocked.map(k => `${k}="${element.getAttribute(k)}"`).join(', ')} is not a plain number here.`);
            this.#rebuild();
            return;
        }
        for (const [k, v] of Object.entries(values)) element.setAttribute(k, String(Math.round(v)));
        this.#commit();
    }

    #applyXml(): void {
        const open = this.#open;
        if (!open) return;
        try {
            open.doc = LayoutDocument.parse(this.#xml.value);
        } catch (e) {
            this.#problem(`The XML is not well-formed: ${e instanceof Error ? e.message : String(e)}`);
            return;
        }
        open.selected = null;
        this.#xml.blur();
        this.#commit();
    }

    async #saveLayout(): Promise<void> {
        const open = this.#open;
        if (!open || !this.#dirty()) return;
        if (!open.entry.packPath && !open.entry.isNew) {
            this.#problem(`${open.entry.name} is not a file of its own in the asset pack, so it cannot be saved there.`);
            return;
        }
        const text = open.doc.toString();
        try {
            if (open.entry.isNew) await this.#store.saveNew(open.entry.name, text);
            else await this.#store.save(open.entry.packPath!, text);
        } catch (e) {
            this.#problem(`Saving failed: ${e instanceof Error ? e.message : String(e)}`);
            return;
        }
        open.saved = text;
        this.#savedTexts.set(open.entry.name, text);
        if (!open.entry.isNew) this.#edited.add(open.entry.name);
        this.#renderList();
        this.#updateButtons();
        this.#status.className = '';
        this.#status.textContent = open.entry.isNew
            ? `Saved as packages/ui-editor/layouts/${open.entry.name}.xml.`
            : `Saved to the overlay and the pack (${open.entry.packPath}).`;
    }

    async #revertLayout(): Promise<void> {
        const open = this.#open;
        if (!open?.entry.packPath || !this.#edited.has(open.entry.name)) return;
        if (!confirm(`Put ${open.entry.name} back as the client's build has it? Your saved changes to it go.`)) return;
        let original: string;
        try {
            original = await this.#store.revert(open.entry.packPath);
        } catch (e) {
            this.#problem(`Reverting failed: ${e instanceof Error ? e.message : String(e)}`);
            return;
        }
        this.#savedTexts.set(open.entry.name, original);
        this.#edited.delete(open.entry.name);
        open.doc = LayoutDocument.parse(original);
        open.saved = open.doc.toString();
        open.selected = null;
        this.#renderList();
        this.#history.reset(this.#snapshot());
        this.#rebuild();
        this.#status.textContent = 'Reverted to the original.';
    }

    #dirty(): boolean {
        return !!this.#open && this.#open.doc.toString() !== this.#open.saved;
    }

    #updateButtons(): void {
        const open = this.#open;
        this.#save.disabled = !this.#dirty() || !(open?.entry.packPath || open?.entry.isNew);
        this.#revert.disabled = !open || !this.#edited.has(open.entry.name);
        this.#undo.disabled = !this.#history.canUndo;
        this.#redo.disabled = !this.#history.canRedo;
        this.#title.classList.toggle('dirty', this.#dirty());
    }

    #showTab(tab: string): void {
        for (const button of document.querySelectorAll<HTMLButtonElement>('#tabs button')) button.classList.toggle('active', button.dataset.tab === tab);
        byId('tab-edit').hidden = tab !== 'edit';
        byId('tab-xml').hidden = tab !== 'xml';
    }

    /** Centres the open window in the space between the panels. */
    #placeWindow(): void {
        const w = this.#open?.window;
        if (!w) return;
        const space = Math.max(0, window.innerWidth - LIST_WIDTH - INSPECTOR_WIDTH);
        w.x = Math.round(LIST_WIDTH + Math.max(16, (space - w.width) / 2));
        w.y = Math.round(Math.max(16, (window.innerHeight - w.height) / 2));
        this.#overlay.refresh();
    }

    #disposeWindow(): void {
        if (!this.#open?.window) return;
        this.#overlay.setBuild(null, this.#open.doc);
        this.#open.window.dispose();
        this.#open.window = null;
    }

    #problem(message: string): void {
        this.#status.className = 'error';
        this.#status.textContent = message;
        console.error(message);
    }
}
