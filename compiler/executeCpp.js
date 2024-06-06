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
export const executeCpp = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    console.log(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`);
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log("1",error)
          reject({ error, stderr });
        }
        if (stderr) {
          console.log("2",error)
          reject(stderr);
        }
        console.log(stdout);
        resolve(stdout);
      }
    );
  });
};
