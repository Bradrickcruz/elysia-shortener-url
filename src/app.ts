const envVars = Bun.env;
import { Elysia } from 'elysia';
import { urlController } from './modules/shortener/shortener.controller';

const app = new Elysia();
app.use(urlController as any);

export default app;
