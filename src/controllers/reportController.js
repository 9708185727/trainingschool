import reportService from "../services/reportService.js";
 const getOpportunityStats=async(req, res) =>{
    try {
        const {Type, dateRange, limit } = req.query;

        const stats = await reportService.getOpportunityStatus({
            Type,
            dateRange,
            limit: parseInt(limit) || 10,
        });

        res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export default getOpportunityStats