import { setGlobalOptions } from "firebase-functions/v2";
import * as functions from "firebase-functions";
import * as express from "express";
import imageRoutes from './routes/imageRoutes';
import errorHandler from './middlewares/errorMiddleware';

setGlobalOptions({ maxInstances: 10 });

const app = express();

app.use('/api', imageRoutes);
app.use(errorHandler);


exports.app = functions.https.onRequest(app);