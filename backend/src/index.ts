import { createApp } from './app/app';
import { env } from './config/env';

const app = createApp();

<<<<<<< HEAD
app.listen(env.PORT, () => {
=======
app.listen(env.PORT, "0.0.0.0", () => {
>>>>>>> c97ec9c6f179aa1d6d198eeea1e6472b25fea050
  console.log(`Server started on port ${env.PORT}`);
});