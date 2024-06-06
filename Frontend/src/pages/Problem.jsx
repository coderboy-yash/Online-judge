import React, { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaRegCopy } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const styles = {
  testCase: {
    marginBottom: '1em',
    padding: '1em',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5em',
  },
  codeBlock: {
    fontFamily: 'monospace',
    backgroundColor: '#f4f4f4',
    padding: '0.5em',
    borderRadius: '3px',
    whiteSpace: 'pre-wrap', // to preserve whitespace and line breaks
    marginBottom: '0.5em',
  },
};

const Problem = () => {
  const host=import.meta.env.VITE_host
  const navigate = useNavigate();
 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [problem, setProblem] = useState("")
  const [language,setLanguage]=useState("py");

  console.log(id);
  useEffect(() => {
    const getProblem = async () => {
      try {
        if(!id){
          navigate("/")
        }
        const res = await axios.get(`${host}/problem/${id}`);
        // console.log(res.axioserror.response.status);
        // if(res.axioserror.response.status){
        //   navigate("/")
        // }
       
        setProblem(res.data);

      }
      catch (error) {
        console.log(error);
        navigate("/")
      }


    }
    getProblem();
  }, [])

  // /////////
  const [copiedTestCases, setCopiedTestCases] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);

  const copyText = (text, setStateFunc) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setStateFunc(true);
        setTimeout(() => setStateFunc(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => console.error('Failed to copy:', err));
  };




  return (
    <div >
      <Navbar></Navbar>
      <div className='flex'>
        <div className='flex-1 p-4 h-96 overscroll-y-auto'>
          {problem != "" &&
            <div>

              <div className="problem-description p-4  rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold mb-4 underline-offset-2 ">{problem.title}</h1>
                <p className="mb-4">{problem.description}</p>

                <h2 className="text-xl font-semibold mb-2">Input Format:</h2>
                <p className="mb-4">{problem.inputFormat}</p>

                <h2 className="text-xl font-semibold mb-2">Output Format:</h2>
                <p className="mb-4">{problem.outputFormat}</p>

                <h2 className="text-xl font-semibold mb-2">Constraints:</h2>
                <p className="mb-4">{problem.constraint}</p>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Sample Test Cases:</h2>
                  <div className="flex items-center mb-2 relative">
                    <pre className="mb-0 bg-gray-900 text-white p-2 rounded-md overflow-x-auto flex-grow">
                      {problem.sampleTestCases}
                    </pre>
                    <button
                      className="ml-2 absolute right-0 top-2   text-white font-bold py-2 px-4 rounded"
                      onClick={() => copyText(problem.sampleTestCases, setCopiedTestCases)}
                    >
                      {copiedTestCases ? <FaCopy /> : <FaRegCopy />}
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Sample Output:</h3>
                  <div className="flex items-center">
                    <pre className="bg-gray-900 text-white p-2 rounded-md overflow-x-auto flex-grow">
                      {problem.sampleOutput}
                    </pre>
                    {/* <button
                      className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => copyText(problem.sampleOutput, setCopiedOutput)}
                    >
                      {copiedOutput ? 'Copied!' : 'Copy'}
                    </button> */}
                  </div>
                </div>



              </div>


            </div>}
        </div>
        <div className='basis-1/2 border border-gray-100 p-4 m-2 '>
           <div className=' mb-4 flex gap-4'>
                <button onClick={()=>setLanguage("cpp")} className={`px-4 py-2 rounded-xl ${language=="cpp"?"bg-indigo-500 text-white":"bg-gray-300 text-white"} `}>Cpp</button>
                <button onClick={()=>setLanguage("py")} className={`px-4 py-2 rounded-xl ${language=="py"?"bg-indigo-500 text-white":"bg-gray-300 text-white"} `}>Python</button>
            </div>
          <Editor
            defaultValue={"print('hello from yash')"} id={id} language={language}
          />
         
        </div>

      </div>
    </div>
  )
}

export default Problem