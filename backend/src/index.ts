import { createApp } from './app/app';
import { env } from './config/env';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT}`);
});