import express from "express";
import bodyParser from "body-parser";
import {router} from "./routes/task";
import {ValidationException} from "./exceptions/validation.exception";

const PORT = process.env.PORT || 3000;
export const app = express();

// @ts-ignore
const errorHandler = (err, req, res, next) => {

    if (err instanceof ValidationException) {
        return res
            .status(403)
            .json(err.message);
    }

    return res
        .status(500)
        .json({message: 'Internal error'});
}

app.use(bodyParser());
app.use('/api/tasks', router);
app.use(errorHandler);

export const server = app.listen(PORT, () => {
    console.log("Started at http://localhost:%d", PORT);
});
