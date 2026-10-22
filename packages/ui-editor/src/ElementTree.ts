import type { LayoutDocument } from './LayoutDocument';

/** The open layout's window elements as an indented list: type, and name when it has one. Click to select. */
export class ElementTree {
    readonly #host: HTMLElement;
    #rows = new Map<number, HTMLElement>();
    onSelect: (id: number) => void = () => {};

    constructor(host: HTMLElement) {
        this.#host = host;
    }

    show(doc: LayoutDocument | null, selected: number | null): void {
        this.#host.replaceChildren();
        this.#rows.clear();
        if (!doc) return;
        for (const { element, depth } of doc.allElements()) {
            const id = doc.idOf(element);
            const row = document.createElement('button');
            row.className = 'node';
            row.style.paddingLeft = `${8 + depth * 14}px`;
            const type = document.createElement('span');
            type.className = 'type';
            type.textContent = element.tagName;
            row.appendChild(type);
            const name = element.getAttribute('name');
            if (name) {
                const n = document.createElement('span');
                n.className = 'name';
                n.textContent = name;
                row.appendChild(n);
            }
            row.addEventListener('click', () => this.onSelect(id));
            this.#rows.set(id, row);
            this.#host.appendChild(row);
        }
        this.select(selected);
    }

    select(id: number | null): void {
        for (const [rowId, row] of this.#rows) row.classList.toggle('selected', rowId === id);
        const row = id == null ? undefined : this.#rows.get(id);
        row?.scrollIntoView({ block: 'nearest' });
    }
}
