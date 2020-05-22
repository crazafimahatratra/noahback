import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './logger';
import usersRouter from './routes/users';
import productsRouter from './routes/products';

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(usersRouter);
app.use(productsRouter);

const server = app.listen(7000, () => {
    logger.info("Server started");
});

function exitHandler(exitCode) {
    server.close(() => {
        logger.warn(`Received signal ${exitCode}`);
        logger.info(`HTTP Server closed`);
    })
}

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

export {};
