import { client } from "../config/redis";
import logger from "../config/logger";

export const redisCheck = async (req, res, next) => {
    const data = await client.get('getalldata');

    if (data != null) {
        // logger.info(`Users Detailsredis get successfully`)
        res.status(200).json({
            code: 200,
            data: JSON.parse(data),
            message: 'All notes fetch sucessfull from redis'
        });
    } else {
        next();
    }
}