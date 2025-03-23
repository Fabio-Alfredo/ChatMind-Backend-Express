import { currentEnv } from "./src/configs/config";
import { connectDb } from "./src/configs/db.config/mongo.config";
import app from "./app";

connectDb();

app.listen(currentEnv.port, () => {
    console.log(`Server is running on http://localhost:${currentEnv.port}`);
})
