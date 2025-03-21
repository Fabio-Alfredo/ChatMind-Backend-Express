import { currentEnv } from "./src/config/config";
import app from "./app";

app.listen(currentEnv.port, () => {
    console.log(`Server is running on http://localhost:${currentEnv.port}`);
})
