
import app from './appExpress';
import { connectToDB } from './app';

const PORT = process.env.PORT || 3000;

// Connect to the database
connectToDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
