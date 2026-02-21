const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const axios = require("axios");
const { connectDB } = require("./db");
const crowdRouter = require("./routes/crowd");
const userRouter = require("./routes/user");
const crowdController = require("./controllers/crowdController");

const app = express();
app.use(express.json());
const URL = "http://localhost";
const PORT = 3000;

async function startServer() {
	try {
		app.use(cors());
		const db = await connectDB();
		logDb = db.collection("crowdLogs");
		groupDb = db.collection("groupLogs");
		userDb = db.collection("users");
		app.locals.logDb = logDb;
		app.locals.groupDb = groupDb;
		app.locals.userDb = userDb;

		app.use("/api/crowd", crowdRouter);
		app.use("/user", userRouter);

		app.listen(PORT, () => console.log("SERVER STARTED AT PORT:" + PORT));
	} catch (error) {
		console.error("Failed to Start Server:" + error);
		process.exit(1);
	}
}

// Access DBs via app.locals after connectDB

cron.schedule("0 * * * *", async () => {
	// Every hour at minute 0 [web:39]
	const oneHour = new Date(Date.now() - 60 * 60 * 1000);

	crowdController.appendToGroup(oneHour);
});

startServer();
