import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'
import util from 'util'

import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const execPromise = util.promisify(exec);

 const outputPath=path.join(__dirname,"outputs");
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true})
}
export const executePython = async (filepath,inputFilePath) => {
    // Adjust the command to handle different drive letters
    const command = `python "${filepath}" < "${inputFilePath}"`;

    try {
        const { stdout, stderr } = await execPromise(command);
        
        if (stderr) {
            throw new Error(stderr);
        }
        // console.log(stdout)
        return stdout;
    } catch (error) {
        throw { error: error.message || error, stderr: error.stderr || '' };
    }
};
