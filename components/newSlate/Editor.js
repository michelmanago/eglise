import {useCallback, useMemo} from 'react';
import {createEditor} from 'slate';
import {Editable, Slate, withReact} from 'slate-react';
import isUrl from 'is-url';
import Toolbar from './Toolbar';
import useEditorConfig from './useEditorConfig';
import useSelection from './useSelection';

import {wrapLink, insertImage} from './EditorUtils';

/*const withLinks = editor => {
    const {insertData, insertText, isInline, isVoid} = editor;

    editor.isVoid = element => {
        return element.type === 'image' ? true : element.type === 'video' ? true : isVoid(element);
    };

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element);
    };

    editor.insertText = text => {
        // TODO: check if isUrl don't break the code
        if (text && false) {
            //&& isUrl(text)
            wrapLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result;
                        CustomEditor.insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } else if (CustomEditor.isImageUrl(text)) {
            insertImage(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};*/

const withLinks = editor => {
    const {insertData, insertText, isInline} = editor;

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element);
    };

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');

        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

const withImages = editor => {
    const {insertData, isVoid} = editor;

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element);
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result;
                        insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

export default function Editor({document, onChange}) {
    const editor = useMemo(() => withLinks(withImages(withReact(createEditor()))), []);
    const {renderElement, renderLeaf, onKeyDown} = useEditorConfig(editor);
    const [selection, setSelection] = useSelection(editor);

    const onChangeHandler = useCallback(
        document => {
            onChange(document);
            setSelection(editor.selection);
        },
        [editor.selection, onChange, setSelection],
    );

    return (
        <Slate editor={editor} value={document} onChange={onChangeHandler}>
            <Toolbar selection={selection} />
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={onKeyDown} />
        </Slate>
    );
}
