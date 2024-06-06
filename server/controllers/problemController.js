import Problem from "../models/Problem.js";
export const  addProblem = async (req, res) => {
  try {
    const { id, title, description, sampleTestCases, allTestCases,sampleOutput,allTestOutput,constraint,inputFormat,outputFormat } = req.body;

    // Check if the problem with the same ID already exists
    const existingProblem = await Problem.findOne({ id });
    if (existingProblem) {
      return res.status(400).json({ message: 'Problem with this ID already exists.' });
    }

    // Create a new problem
    const newProblem = new Problem({
      id,
      title,
      description,
      sampleTestCases,
      allTestCases,
      sampleOutput,
      allTestOutput,
      constraint,inputFormat,outputFormat
    });

    // Save the new problem to the database
    await newProblem.save();

    res.status(201).json({ message: 'Problem added successfully!', problem: newProblem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding problem.', error: error.message });
  }
};



export const getAllProblems=async (req,res)=>{
  // console.log(2)
     const problems=await   Problem.find({});
    //  console.log(problems);
     res.send(problems);
}
export const getProblemById = async (req, res) => {
  const { id } = req.params;
  console.log(id,"yash");
  try {
    const problem = await Problem.findOne({ id: id });
    if (!problem) {
      return res.status(400).json({ message: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

