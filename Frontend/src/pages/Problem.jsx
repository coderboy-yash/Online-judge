import React, { useEffect, useState } from 'react'
import Editor from '../components/Editor'
import Navbar from '../components/Navbar'
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [problem, setProblem] = useState("")

  console.log(id);
  useEffect(() => {
    const getProblem = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/problem/${id}`);
        console.log(res);
        setProblem(res.data);

      }
      catch (error) {
        console.log(error);
      }


    }
    getProblem();
  }, [])




  return (
    <div >
      <Navbar></Navbar>
      <div className='flex'>
        <div className='flex-1 p-4 h-96 overscroll-y-auto'>
         <div className='font-bold text-xl'>Problem statement</div>
          {problem != "" && <div>
            <div className='my-4 '>  {problem.description}</div>
            <div>
      {problem.sampleTestCases.map((test, i) => (
        <div key={i} style={styles.testCase}>
          <div style={styles.label}>Input:</div>
          <div style={styles.codeBlock}>{test.input}</div>
          <div style={styles.label}>Output:</div>
          <div style={styles.codeBlock}>{test.output}</div>
        </div>
      ))}
    </div>

          </div>}
        </div>
        <div className='basis-1/2'>
          <Editor
            defaultValue={"print('hello from yash')"}
          />

        </div>

      </div>
    </div>
  )
}

export default Problem