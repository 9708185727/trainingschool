
import oppService from "../services/oppService.js";

const getAllOpportunity= async (req, res) => {
  try {
    const getData = await oppService.getOpportunity(req.query);
    res.status(201).json(getData);
    console.log(req.query)
  } catch (error) {
    res.status(400).send(error.message);
  }
  // res.json(Opportunitys)
};

const getOpportunityById = async (req, res) => {
  // console.log(req.query);
  console.log(req.params.id);

  const id = req.params.id;
  try {
    const Opportunity = await oppService.getOpportunityById(id);
    if (!Opportunity) res.status(404).send("Opportunity not found");

    res.json(Opportunity);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addOpportunity = async (req, res) => {
   console.log(req.body);

  const data = req.body;
  const userId = req.user._id;
  console.log(userId)
  const user = req.user;


  if (!data.title) return res.status(422).send("Opportunity title is required ");
  if (!data.type) return res.status(422).send("Opportunity type is required ");
  if (user.role.includes("Participant")) {
    return res.status(404).send("Access Denied");
  }
  try {
    const createdOpportunity = await oppService.createOpportunity(data,userId);

    res.status(201).json(createdOpportunity);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateOpportunity = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = req.user;
  // console.log(user)

  try {
    const Opportunity = await oppService.getOpportunityById(id);
    if (!Opportunity) return res.status(404).send("Opportunity not Found");
    if (Opportunity.createdBy !=user._id&& !user.role.includes("Admin")) {
      return res.status(404).send("Access Denied");
    }
    const updatedOpportunity = await oppService.updateOpportunityById(id, data);
    res.status(201).json(updatedOpportunity);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteOpportunity = async (req, res) => {
  const id = req.params.id;
  try {
     await oppService.deleteOpportunityById(id);
    res.send(`Opportunity deleted with id ${id} successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getAllType = async (req, res) => {
  try {
    const _type= await oppService.getTypes();
    res.status(201).json(_type);
  } catch (error) {
    res.status(400).send(error.message);
  }
  };
const getTotalSumOpportunity = async (req, res) => {
  try {
    const totalOpportunity= await oppService.getTotalOpportunity();
    res.status(201).json(totalOpportunity);
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
export {
  getAllOpportunity,
  getOpportunityById,
  addOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getAllType,
  getTotalSumOpportunity,
};
