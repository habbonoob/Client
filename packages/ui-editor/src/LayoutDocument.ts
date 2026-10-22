/** Tags of a layout element that are not windows: its settings, and the list its child windows are in. */
const SETTINGS = new Set(['children', 'variables', 'var', 'params', 'param', 'filters']);

/** The tag every element gets in the copy the preview is built from: built windows are found by it. */
export const ID_TAG = '_UIED_';

/**
 * A window layout as the editor edits it: the XML as a DOM document, so what the editor does not touch (variable
 * references, named params, filters, the order of attributes) is saved as it was. Every window element has an id
 * for the session, which the preview's windows carry as a tag.
 */
export class LayoutDocument {
    readonly #doc: XMLDocument;
    readonly #ids = new Map<Element, number>();
    readonly #elements = new Map<number, Element>();
    #nextId = 1;

    private constructor(doc: XMLDocument) {
        this.#doc = doc;
    }

    /** The layout in `text`; throws when it is not well-formed XML. */
    static parse(text: string): LayoutDocument {
        const doc = new DOMParser().parseFromString(text, 'application/xml');
        const error = doc.querySelector('parsererror');
        if (error) throw new Error(error.textContent?.trim() || 'The XML is not well-formed.');
        return new LayoutDocument(doc);
    }

    get root(): Element {
        return this.#doc.documentElement;
    }

    /** The top-level windows: the <window> list of a <layout> (or of a bare <window>), or a single element root. */
    topElements(): Element[] {
        const root = this.root;
        if (root.tagName === 'layout') {
            const list = [...root.children].find(c => c.tagName === 'window');
            return list ? windowChildren(list) : [];
        }
        if (root.tagName === 'window') return windowChildren(root);
        return [root];
    }

    /** An element's child windows (those in its <children>). */
    childElements(element: Element): Element[] {
        const list = [...element.children].find(c => c.tagName === 'children');
        return list ? windowChildren(list) : [];
    }

    /** Every window element in tree order, with its depth. */
    allElements(): { element: Element; depth: number }[] {
        const out: { element: Element; depth: number }[] = [];
        const walk = (elements: Element[], depth: number) => {
            for (const element of elements) {
                out.push({ element, depth });
                walk(this.childElements(element), depth + 1);
            }
        };
        walk(this.topElements(), 0);
        return out;
    }

    idOf(element: Element): number {
        let id = this.#ids.get(element);
        if (id == null) {
            id = this.#nextId++;
            this.#ids.set(element, id);
            this.#elements.set(id, element);
        }
        return id;
    }

    element(id: number): Element | null {
        const element = this.#elements.get(id);
        return element && this.#doc.contains(element) ? element : null;
    }

    /** Elements from XML text (one element, or several in a row), made this document's: for pasting. */
    importElements(text: string): Element[] {
        const fragment = new DOMParser().parseFromString(`<paste>${text.replace(/^<\?xml[^>]*\?>/, '')}</paste>`, 'application/xml');
        const error = fragment.querySelector('parsererror');
        if (error) throw new Error(error.textContent?.trim() || 'not well-formed XML');
        const elements = [...fragment.documentElement.children];
        if (elements.length === 0) throw new Error('no elements');
        return elements.map(e => this.#doc.importNode(e, true) as Element);
    }

    /** Adds elements at the end of the layout's top-level windows. */
    appendTop(elements: Element[]): void {
        const root = this.root;
        const list = root.tagName === 'layout' ? [...root.children].find(c => c.tagName === 'window') : root.tagName === 'window' ? root : null;
        if (!list) throw new Error('This layout has no window list to add to.');
        list.append(...elements);
    }

    /** The layout as saved. */
    toString(): string {
        return new XMLSerializer().serializeToString(this.#doc);
    }

    /** The layout as the preview builds it: every window element tagged with its id. */
    previewSource(): string {
        const changed: [Element, string | null][] = [];
        for (const { element } of this.allElements()) {
            const tags = element.getAttribute('tags');
            changed.push([element, tags]);
            element.setAttribute('tags', tags ? `${tags},${ID_TAG}${this.idOf(element)}` : `${ID_TAG}${this.idOf(element)}`);
        }
        try {
            return this.toString();
        } finally {
            for (const [element, tags] of changed) {
                if (tags == null) element.removeAttribute('tags');
                else element.setAttribute('tags', tags);
            }
        }
    }
}

function windowChildren(list: Element): Element[] {
    return [...list.children].filter(c => !SETTINGS.has(c.tagName));
}
