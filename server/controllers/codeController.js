import { executePython } from "../executePython.js";
import { generateFile } from "../generateFile.js";

export const runCode =async (req,res)=>{
      const {language="cpp",code}=req.body;
      console.log(1)
      if(code==undefined){
        return res.status(400).json({success:false,error:"bad request, code not found"});
      }
      try{
        const filePath=await generateFile(language,code);
        // console.log(filePath)
        const output=await executePython(filePath);
        res.json({filePath,output});
        
      }
      catch(error){
        res.status(500).json({error:error});
      }

}