import Problem from "../models/Problem.js";
export const addProblem=async (req,res)=>{
    const problems = req.body.problems;

  if (!Array.isArray(problems)) {
    return res.status(400).send('Invalid request body');
  }

  try {
    const savedProblems = await Problem.insertMany(problems);
    // await Problem.deleteMany({});
    res.status(201).send(savedProblems);
  } catch (err) {
    res.status(400).send('Error saving problems: ' + err.message);
  }

 
    


}