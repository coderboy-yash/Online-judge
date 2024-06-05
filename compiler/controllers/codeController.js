import { executeCpp } from "../executeCpp.js";
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
    
        if(language==py){
          const output=await executePython(filePath);
          res.json({filePath,output});
        }
        if(language==cpp){
          const inputPath = await generateInputFile(input);
        const output = await executeCpp(filePath, inputPath);
        res.json({ filePath, inputPath, output });
        }
     
        
      }
      catch(error){
        res.status(500).json({error:error});
      }

}