
import Opportunity from "../models/Opp.js";
const createOpportunity= async (data,userId,user) => {
  return await Opportunity.create({...data, createdBy:userId,participants:user});

};
const getOpportunity = async (query) => {
  const limit = query?.limit || 10;
  const sort = query?.sort ? JSON.parse(query.sort) : {};
  const filters = query?.filters ? JSON.parse(query.filters) : {};
  const page = query?.page || 1;
  const offset = (page - 1) * limit;

  const customQuery = Object.entries(filters).reduce((acc, [key, value]) => {
    const result = { ...acc, [key]: new RegExp(value, "i") };

    return result;
  }, {});

  return await Opportunity.find(customQuery).limit(limit).sort(sort).skip(offset);
};
const getOpportunityById = async (id) => {
  return await Opportunity.findById(id);
};
const getTypes=async ()=>{
 return await Opportunity.distinct("type")
}
const updateOpportunityById = async (id, data) => {
  return await Opportunity.findByIdAndUpdate(id, data);
};
const deleteOpportunityById = async (id) => {
  return await Opportunity.findByIdAndDelete(id);
};

const getTotalOpportunitys=async ()=>{
  return await Opportunity.countDocuments();
}
export default {
  createOpportunity,
  getOpportunity,
  getOpportunityById,
  updateOpportunityById,
  deleteOpportunityById,
  getTypes,
  getTotalOpportunitys,
};
