import { Constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case Constants.VALIDATION_ERROR:
            res.json({
                title: "Validation field",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case Constants.NOT_FOUND:
            res.json(
                {
                    title: "Not Found",
                    message: err.message,
                    stackTrace: err.stack
                }
            );
            break;

        case Constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case Constants.UNAUTORISED:
            res.json({
                title: "UNAUTORISED Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case Constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            console.log("NO error , All Good..");
            break;
    }
}

export default errorHandler;