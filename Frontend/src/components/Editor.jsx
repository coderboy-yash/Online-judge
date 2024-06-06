import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import axios from 'axios';
import Loader from './Loader';

const Editor = ({ defaultValue, id, language }) => {
    const host=import.meta.env.VITE_compilerhost;
    const editorRef = useRef(null);
    const textAreaRef = useRef(null);
    const [output, setOutput] = useState("Run your code to see the output");
    const [input, setInput] = useState("");
    const [result, setResult] = useState();
    const [visibleArea, setVisibleArea] = useState(1);


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

    const handleRun = async () => {
        setVisibleArea(2)
        const code = editorRef.current.getValue();
        const payload = {
            language: language,
            code: code,
            input: input // Include the input data
        };

        try {
            console.log("Submitting code");
            console.log(host)
            const response = await axios.post(`${host}/code/run`, payload);
            console.log("Received response", response);
            setOutput(response.data.output);
        } catch (error) {
            console.log(error)
            setOutput(error.response.data.error.stderr);
            console.log(error.response.data.error.stderr);
        }
    };
    const handleSubmit = async () => {
        setVisibleArea(3)
        const code = editorRef.current.getValue();
        const payload = {
            language: language,
            code: code,
            problemId: id
        };

        try {
            console.log("Submitting code");
            const res = await axios.post(`${host}/code/submit`, payload);
            console.log("Received response", res);
            setResult(res.data);

            // setOutput(data.data.output);
        } catch (error) {
            console.log(error)
            // setOutput(error.response.data.error.stderr);
            // console.log(error.response.data.error.stderr);
        }

    }
    return (
        <div className='w-full relative '>

            <textarea value={defaultValue} ref={textAreaRef} id="realtimeEditor" rows={0} className="h-1/2"></textarea>
            <div className='border border-gray-300 my-4 p-2'>
                <div className='flex w-full gap-1 mb-1 '>
                    <button onClick={()=>setVisibleArea(1)}  className={` ${visibleArea == 1 ? "bg-indigo-500 text-white" : "bg-gray-300 text-white"} py-2 px-4`}>input</button>
                    <button onClick={()=>setVisibleArea(2)}  className={` ${visibleArea == 2 ? "bg-indigo-500 text-white" : "bg-gray-300 text-white"} py-2 px-4`}>output</button>
                    <button   className={` ${visibleArea == 3 ? "bg-indigo-500 text-white" : "bg-gray-300 text-white"} py-2 px-4`}>result</button>
                </div>
                {visibleArea == 1 && <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter input for your code here"
                    rows={5}
                    className="w-full mt-4 p-2 border border-gray-300 rounded"
                />}
                {
                    visibleArea == 2 &&
                    <div className='overflow-x-auto bg-neutral-200 '>
                        <pre className='bg-neutral-200 min-h-40 w-96 p-4'>{output}</pre>
                    </div>
                }
                {
                    visibleArea == 3 &&
                    (result?.error?
                        <div className='overflow-x-auto bg-neutral-200 '>

                        <pre className='bg-neutral-200 min-h-40 w-96 p-4'>{result.error.stderr}</pre>
                        </div>
                        :
                        ( result?
                            <div className='overflow-x-auto bg-white '>
                                <p className='flex gap-2 my-4 items-center'>
                                    Result:{result.allPass ? <div className='text-green-400 font-bold text-lg'>Accepted</div> : <div className='text-red-600 font-bold text-lg'>Wrong answer</div>}
                                </p>
                                <div className='mb-2'>Test cases:</div>
                                <div className='flex gap-3 flex-wrap'>
        
        
                                    {result?.results.map((item, i) => (
                                        <div className={`${item.result == "fail" ? "bg-red-500" : "bg-green-500"} text-white px-4 py-1 rounded-lg text-sm`}>test case {i + 1}</div>
        
                                    ))
        
                                    }
                                </div>
        
        
                            </div>
                            :<div>          <Loader />
                            </div>)
                    )
           
                }
            </div>

            <div className='w-full flex justify-end gap-4 font-semibold'>
                <button onClick={handleRun} className='bg-indigo-500 px-4 py-2 w-40 active:bg-indigo-400 rounded-xl text-white my-4'>Run</button>
                <button onClick={handleSubmit} className='bg-indigo-500 px-4 py-2 w-40 active:bg-indigo-400 rounded-xl text-white my-4'>Submit</button>
            </div>

            {/* <div>Output</div>
 */}
        </div>
    );
};

export default Editor;
