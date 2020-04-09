import React from 'react';

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools';

const Editor = props => {
    console.log(props)
    const { setInstanceRef } = props;
    const data = props.data ? JSON.parse(props.data) : {};
    console.log(data)

    return (
        <EditorJs
            tools={{
                ...EDITOR_JS_TOOLS,
            }}
            data={data}
            autofocus={true}
            hideToolbar={true}
            instanceRef={setInstanceRef}
        />
    )
};

export default Editor;
