import * as dotenv from "dotenv";
dotenv.config();
import { Elysia } from 'elysia';
import { urlController } from "./modules/shortener/shortener.controller";

const app = new Elysia();
app.use(urlController as any);

export default app;