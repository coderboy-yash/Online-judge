import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import axios from 'axios'

const Editor = ({ defaultValue }) => {
    const editorRef = useRef(null);
    const textAreaRef = useRef(null);
    const [output, setOutput] = useState("submit your code to see the output");

    useEffect(() => {
        if (textAreaRef.current && !editorRef.current) {
            editorRef.current = Codemirror.fromTextArea(textAreaRef.current, {
                mode: 'text/x-c++src',
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                // Set the default value here
            });
        }
    }, [defaultValue]);

    const handleSubmit = async () => {
        const code = editorRef.current.getValue();
        const payload = {
            language: '',
            code: code
        };

        try {
            const { data } = await axios.post('http://localhost:3001/code/run', payload);
            console.log(data);
            setOutput(data.output);
        } catch (error) {
            setOutput(error.response.data.error.error)
            console.log(error.response);
        }
    };




    return (
        <div className='w-full '>
            <textarea value={defaultValue} ref={textAreaRef} id="realtimeEditor" rows={0} className="h-1/2"></textarea>
            <button onClick={handleSubmit} className='bg-indigo-700 px-4 py-2 rounded-xl text-white my-4'>Submit</button>
            <div>Output</div>
            {/* <TextArea value="yash"></TextArea> */}
            <div className='overflow-x-auto w-2/3'>
                <pre className='bg-neutral-200 p-4' >{output}</pre>
            </div>
            

        </div>
    );
};

export default Editor;
