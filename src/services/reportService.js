import Opp from "../models/Opp.js";

const getOpportunityStatus=async(filters) =>{
    const { Type, dateRange, limit } = filters;
    const query = {};

    if (Type) query.type =Type;
    if (dateRange) {
        const [startDate, endDate] = dateRange.split('/');
        query.startDate = { $gte: new Date(startDate) };
        query.endDate = { $lte: new Date(endDate) };
    }

    const opportunities = await Opp.find(query)
        .sort({ startDate: -1 })
        .limit(limit);

    const stats = await Promise.all(
        opportunities.map(async (Opp) => {
            const participants = await Opp.countDocuments({
                OppId: Opp._id,
            });

            const topPerformer = await Opp.findOne({ OppId: Opp._id })
                .sort({ score: -1 }) // Assuming score field exists
                .select('userId')
                .populate('userId', 'name'); // Populate user name

            return {
                name: Opp.name,
                participants,
                startDate: Opp.startDate,
                endDate: Opp.endDate,
                topPerformer: topPerformer?.userId?.name || 'N/A',
            };
        })
    );

    return {
        totalOpportunities: opportunities.length,
        totalParticipants: stats.reduce((sum, stat) => sum + stat.participants, 0),
        opportunities: stats,
    };
}
export default getOpportunityStatus;