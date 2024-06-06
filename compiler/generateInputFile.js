import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirCodes=path.join(__dirname,"inputs")

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
export const generateInputFile=async (format,content)=>{
    const jobId=randomUUID();
    const filename=`${jobId}.txt`;
    const filePath =path.join(dirCodes,filename);
    await fs.writeFileSync(filePath,content);
    return filePath;
}