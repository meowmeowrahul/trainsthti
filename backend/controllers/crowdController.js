exports.getFiveMinutesAgo = async (req, res) => {
	try {
		const logDb = req.app.locals.logDb;
		if (!logDb) {
			return res.status(500).json({ error: "DB not connected" });
		}

		// Look at the last 5 minutes of logs
		const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

		const summary = await logDb
			.aggregate([
				{ $match: { timestamp: { $gte: fiveMinutesAgo } } },
				{
					$group: {
						_id: "$crowd_level", // e.g., 'low', 'medium', 'high'
						count: { $sum: 1 },
						avg_estimate: { $avg: "$crowd_estimate" },
					},
				},
				{ $sort: { count: -1 } },
			])
			.toArray();

		res.json({ status: "success", summary });
	} catch (error) {
		console.error("getFiveMinutesAgo error:", error);
		res.status(500).json({ error: error.message });
	}
};

exports.postCrowd = async (req, res) => {
	const logDb = req.app.locals.logDb;
	if (!logDb) {
		return res.status(500).json({ error: "DB not connected" });
	}

	const { clients, bt_devices, density, timestamp } = req.body;

	// Tuning factors (calibrate per station later)
	const WIFI_MULTIPLIER = 2; // 1 WiFi MAC ≈ 2 people (radios off ~50%)
	const BT_MULTIPLIER = 3; // 1 BT MAC ≈ 3 people (BT less common)
	const WIFI_WEIGHT = 0.7; // WiFi more reliable than BT
	const BT_WEIGHT = 0.3;

	// Adjusted estimates
	const wifi_estimate = clients * WIFI_MULTIPLIER;
	const bt_estimate = bt_devices * BT_MULTIPLIER;

	// Weighted fusion (WiFi gets 70% influence)
	const crowd_estimate = Math.round(
		wifi_estimate * WIFI_WEIGHT + bt_estimate * BT_WEIGHT,
	);

	// Density labels
	const crowd_level =
		crowd_estimate < 50 ? "low" : crowd_estimate < 150 ? "medium" : "high";

	const log = {
		clients,
		bt_devices,
		density,
		wifi_estimate,
		bt_estimate,
		crowd_estimate,
		crowd_level,
		timestamp: new Date(timestamp),
	};

	// Fire-and-forget insert so scan.sh isn't blocked
	logDb
		.insertOne(log)
		.then(() => {
			console.log(
				`Final Crowd: ~${crowd_estimate} people (${crowd_level}) at ${timestamp}`,
			);
		})
		.catch((err) => console.error("Failed to insert crowd log:", err));

	res.json({
		status: "logged",
		crowd_estimate,
		crowd_level,
	});
};

exports.getLatest = async (req, res) => {
	try {
		const logDb = req.app.locals.logDb;
		if (!logDb) {
			return res.status(500).json({ error: "DB not connected" });
		}

		const latest = await logDb
			.find({})
			.sort({ timestamp: -1 })
			.limit(1)
			.toArray();

		if (!latest.length) {
			return res.json({ status: "success", latest: null });
		}

		return res.json({ status: "success", latest: latest[0] });
	} catch (error) {
		console.error("getLatest error:", error);
		res.status(500).json({ error: error.message });
	}
};
