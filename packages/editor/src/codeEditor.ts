// The text editor for the pack's text files (XML layouts and configuration, stored as .bin):
// CodeMirror, with XML highlighting, folding and search.

import { basicSetup, EditorView } from 'codemirror';
import { xml } from '@codemirror/lang-xml';
import { oneDark } from '@codemirror/theme-one-dark';
import { Prec } from '@codemirror/state';
import { keymap } from '@codemirror/view';

export interface CodeEditorOptions {
    xml: boolean;
    onChange: () => void;
    /** Ctrl+S (Cmd+S) in the editor. */
    onSave: () => void;
}

export function createCodeEditor(parent: HTMLElement, text: string, options: CodeEditorOptions): EditorView {
    return new EditorView({
        parent,
        doc: text,
        extensions: [
            basicSetup,
            options.xml ? xml() : [],
            oneDark,
            Prec.highest(keymap.of([{ key: 'Mod-s', run: () => { options.onSave(); return true; } }])),
            EditorView.updateListener.of(update => { if (update.docChanged) options.onChange(); }),
            EditorView.theme({
                '&': { height: '100%' },
                '.cm-scroller': { fontFamily: 'ui-monospace, Consolas, monospace', fontSize: '12px' },
            }),
        ],
    });
}
