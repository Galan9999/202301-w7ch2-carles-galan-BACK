import "./loadEnvironment.js";
import createDebug from "debug";
import startServer from "./server/startServer.js";
import connectDataBase from "./database/connectDataBase.js";

export const debug = createDebug("robots:*");

const port = process.env.PORT ?? 4000;
const mongoDdUrl = process.env.MONGODB_CONNECTION_URL;

try {
  await startServer(+port);
  debug(`Server listening on port ${port}`);

  await connectDataBase(mongoDdUrl!);
  debug("Connected to data base");
} catch (error) {
  debug(error.message);
}