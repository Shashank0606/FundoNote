import { client } from "../config/redis";
import logger from "../config/logger";

export const allNote = async (req, res, next) => {
    const data = await client.get('getall');

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

// export const singlenote = async (req, res, next) => {
//     const data = await client.get('getdata');

//     if (data != null) {
//         // logger.info(`Users Detailsredis get successfully`)
//         res.status(200).json({
//             code: 200,
//             data: JSON.parse(data),
//             message: 'note fetch sucessfull from redis'
//         });
//     } else {
//         next();
//     }
// }