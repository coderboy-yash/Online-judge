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


export const getAllProblems=async (req,res)=>{
  console.log(2)
     const problems=await   Problem.find({});
     console.log(problems);
     res.send("problems");
}
export const getProblemById = async (req, res) => {
  const { id } = req.params;
  console.log(id,"yash");
  try {
    const problem = await Problem.findOne({ id: id });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
