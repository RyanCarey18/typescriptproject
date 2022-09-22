import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logging from "./config/logging";
import config from "./config/config";
import bookRoutes from "./routes/book";

const NAMESPACE = "Server";
const router = express();

router.use((req, res, next) => {
    logging.info(NAMESPACE, `method - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on("finish", () => {
        logging.info(NAMESPACE, `method - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**rules of API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
        res.header("Access-Control_Allow-Methods", "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }
    next();
});

/**ROUTES */
router.use("/books", bookRoutes);

/**Error Handling */
router.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({
        message: error.message
    });
});

/**Create the Server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));
