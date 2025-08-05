import app from './app';
import { setupSwagger } from './utils/swagger';

const PORT = process.env.PORT || 3001;

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
