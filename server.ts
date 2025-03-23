import { currentEnv } from "./src/config/config";
import { connectDb } from "./src/config/db.config/mongo.config";
import app from "./app";

connectDb();

app.listen(currentEnv.port, () => {
    console.log(`Server is running on http://localhost:${currentEnv.port}`);
})
