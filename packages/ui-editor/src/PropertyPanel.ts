import { windowTypeNames } from './elementTypes';
import { describeParams, windowParamNames } from './windowParams';

/** Attributes shown first, in this order, when an element has them (the rest follow as they are in the XML). */
const LEADING = ['name', 'x', 'y', 'width', 'height', 'style', 'caption', 'visible', 'params', 'tags', 'id'];

/**
 * The selected element's settings, edited in place in the layout document: its attributes, its <variables>
 * (<var key value type>) and its named <params>. Every change calls onChange, which rebuilds the preview.
 */
export class PropertyPanel {
    readonly #host: HTMLElement;
    #element: Element | null = null;
    /** The document changed; `select` is the element to select after (undefined: keep the selection). */
    onChange: (select?: Element | null) => void = () => {};

    constructor(host: HTMLElement) {
        this.#host = host;
    }

    show(element: Element | null): void {
        this.#element = element;
        this.#render();
    }

    #render(): void {
        const element = this.#element;
        this.#host.replaceChildren();
        if (!element) {
            this.#host.appendChild(note('Click an element in the preview, or in the tree, to edit it.'));
            return;
        }
        this.#host.appendChild(heading(`<${element.tagName}>`));
        this.#actions(element);
        this.#attributes(element);
        this.#variables(element);
        this.#params(element);
    }

    /** Add a child window, duplicate the element, delete it. */
    #actions(element: Element): void {
        const types = document.createElement('select');
        for (const type of windowTypeNames()) types.appendChild(new Option(type, type, type === 'container', type === 'container'));
        const add = button('+ child', () => {
            const child = element.ownerDocument.createElement(types.value);
            for (const [k, v] of [['x', '0'], ['y', '0'], ['width', '100'], ['height', '24']]) child.setAttribute(k, v);
            ensureList(element, 'children').appendChild(child);
            this.onChange(child);
        });
        const duplicate = button('Duplicate', () => this.duplicate());
        const del = button('Delete', () => this.delete());
        del.classList.add('danger');
        const div = row([types, add, duplicate, del]);
        div.classList.add('actions');
        this.#host.appendChild(div);
    }

    /** Puts a copy of the element (and its child windows) after it, and selects the copy. */
    duplicate(): void {
        const element = this.#element;
        if (!element?.parentElement) return;
        const copy = element.cloneNode(true) as Element;
        element.after(copy);
        this.onChange(copy);
    }

    /** Removes the element (and its child windows); selects the element it was in. */
    delete(): void {
        const element = this.#element;
        if (!element?.parentElement) return;
        const list = element.parentElement;
        const owner = list.tagName === 'children' ? list.parentElement : null;
        element.remove();
        this.onChange(owner);
    }

    #attributes(element: Element): void {
        const section = this.#section('Attributes');
        const names = element.getAttributeNames().sort((a, b) => rank(a) - rank(b));
        for (const name of names) {
            section.appendChild(row([
                label(name),
                input(element.getAttribute(name) ?? '', value => {
                    element.setAttribute(name, value);
                    this.onChange();
                }),
                remove(() => {
                    element.removeAttribute(name);
                    this.onChange();
                    this.#render();
                }),
            ]));
            const hint = hintFor(name, element.getAttribute(name) ?? '');
            if (hint) section.appendChild(hint);
        }
        section.appendChild(adder('attribute', ['name', 'value'], ([name, value]) => {
            if (!/^[A-Za-z_][\w.-]*$/.test(name)) return false;
            element.setAttribute(name, value);
            this.onChange();
            this.#render();
            return true;
        }));
    }

    #variables(element: Element): void {
        const section = this.#section('Variables');
        const list = settingsList(element, 'variables');
        for (const v of list ? [...list.children].filter(c => c.tagName === 'var') : []) {
            section.appendChild(row([
                input(v.getAttribute('key') ?? '', value => { v.setAttribute('key', value); this.onChange(); }, 'key'),
                input(v.getAttribute('value') ?? '', value => { v.setAttribute('value', value); this.onChange(); }, 'value'),
                input(v.getAttribute('type') ?? '', value => {
                    if (value) v.setAttribute('type', value);
                    else v.removeAttribute('type');
                    this.onChange();
                }, 'type', 'narrow'),
                remove(() => { v.remove(); this.onChange(); this.#render(); }),
            ]));
        }
        section.appendChild(adder('variable', ['key', 'value', 'type'], ([key, value, type]) => {
            if (!key) return false;
            const v = element.ownerDocument.createElement('var');
            v.setAttribute('key', key);
            v.setAttribute('value', value);
            if (type) v.setAttribute('type', type);
            ensureList(element, 'variables').appendChild(v);
            this.onChange();
            this.#render();
            return true;
        }));
    }

    #params(element: Element): void {
        const section = this.#section('Params');
        const list = settingsList(element, 'params');
        for (const p of list ? [...list.children].filter(c => c.tagName === 'param') : []) {
            section.appendChild(row([
                withNames(input(p.getAttribute('name') ?? '', value => { p.setAttribute('name', value); this.onChange(); })),
                remove(() => { p.remove(); this.onChange(); this.#render(); }),
            ]));
        }
        const add = adder('param', ['name'], ([name]) => {
            if (!name) return false;
            const p = element.ownerDocument.createElement('param');
            p.setAttribute('name', name);
            ensureList(element, 'params').appendChild(p);
            this.onChange();
            this.#render();
            return true;
        });
        withNames(add.querySelector('input')!);
        section.appendChild(add);
    }

    #section(title: string): HTMLElement {
        const section = document.createElement('section');
        section.appendChild(heading(title, 'h4'));
        this.#host.appendChild(section);
        return section;
    }
}

/** What an attribute's raw value means, when that is not plain: a caption's text unescaped, params' names. */
function hintFor(name: string, value: string): HTMLElement | null {
    let text = '';
    if (name === 'caption' && /%[0-9a-f]{2}/i.test(value)) {
        try { text = decodeURIComponent(value); } catch { text = ''; }
    } else if (name === 'params' && /^\d+$/.test(value) && Number(value) !== 0) {
        text = describeParams(Number(value)).join(' · ');
    }
    if (!text) return null;
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = text;
    return hint;
}

/** A field suggesting the client's param names. */
function withNames(field: HTMLInputElement): HTMLInputElement {
    let list = document.getElementById('param-names');
    if (!list) {
        list = document.createElement('datalist');
        list.id = 'param-names';
        for (const name of windowParamNames()) list.appendChild(new Option(name));
        document.body.appendChild(list);
    }
    field.setAttribute('list', 'param-names');
    return field;
}

function rank(name: string): number {
    const i = LEADING.indexOf(name);
    return i < 0 ? LEADING.length : i;
}

/** The element's own <variables>, <params>, … list (not a child window's). */
function settingsList(element: Element, tag: string): Element | null {
    return [...element.children].find(c => c.tagName === tag) ?? null;
}

function ensureList(element: Element, tag: string): Element {
    const found = settingsList(element, tag);
    if (found) return found;
    const list = element.ownerDocument.createElement(tag);
    // settings go before the element's child windows, as the client's layouts have them
    const children = settingsList(element, 'children');
    element.insertBefore(list, children);
    return list;
}

function heading(text: string, tag = 'h3'): HTMLElement {
    const h = document.createElement(tag);
    h.textContent = text;
    return h;
}

function note(text: string): HTMLElement {
    const p = document.createElement('p');
    p.className = 'note';
    p.textContent = text;
    return p;
}

function label(text: string): HTMLElement {
    const span = document.createElement('span');
    span.className = 'label';
    span.textContent = text;
    span.title = text;
    return span;
}

/** A field that commits on Enter or when it loses focus. */
function input(value: string, commit: (value: string) => void, placeholder = '', className = ''): HTMLInputElement {
    const field = document.createElement('input');
    field.value = value;
    field.placeholder = placeholder;
    field.spellcheck = false;
    if (className) field.className = className;
    let last = value;
    const apply = () => {
        if (field.value === last) return;
        last = field.value;
        commit(field.value);
    };
    field.addEventListener('change', apply);
    field.addEventListener('keydown', e => { if (e.key === 'Enter') apply(); });
    return field;
}

function button(text: string, action: () => void): HTMLButtonElement {
    const b = document.createElement('button');
    b.className = 'add';
    b.textContent = text;
    b.addEventListener('click', action);
    return b;
}

function remove(action: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'remove';
    button.textContent = '×';
    button.title = 'Remove';
    button.addEventListener('click', action);
    return button;
}

function row(children: HTMLElement[]): HTMLElement {
    const div = document.createElement('div');
    div.className = 'row';
    div.append(...children);
    return div;
}

/** A row of empty fields and an add button; `add` returns whether it took them. */
function adder(what: string, fields: string[], add: (values: string[]) => boolean): HTMLElement {
    const inputs = fields.map(f => {
        const field = document.createElement('input');
        field.placeholder = f;
        field.spellcheck = false;
        return field;
    });
    const button = document.createElement('button');
    button.className = 'add';
    button.textContent = `+ ${what}`;
    const submit = () => { if (add(inputs.map(i => i.value.trim()))) inputs.forEach(i => { i.value = ''; }); };
    button.addEventListener('click', submit);
    inputs.forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); }));
    const div = row([...inputs, button]);
    div.classList.add('adder');
    return div;
}
