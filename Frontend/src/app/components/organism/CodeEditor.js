import React from 'react'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import {UnControlled as CodeMirror} from 'react-codemirror2' 
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');


function CodeEditor(props){

    return(
        <div>
            <CodeMirror
                value='<h1>I ♥ react-codemirror2</h1>'
                options={{
                    mode: 'xml',
                    theme: 'material',
                    lineNumbers: true
                }}
                onChange={(editor, data, value) => {
                }}
            />
        </div>
    )
}

export default CodeEditor;