import { NextFunction, Request, Response } from "express";
import mysql from "mysql";
import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";

const NAMESPACE = "Books";

const createBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Creating a book");

    let { author, greeting } = req.body;

    let query = `INSERT INTO greetings (author, greeting) VALUES ("${author}", "${greeting}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end;
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getGreeting = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Getting all books");

    let query = "SELECT * FROM greetings";

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end;
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { getGreeting, createBook };
