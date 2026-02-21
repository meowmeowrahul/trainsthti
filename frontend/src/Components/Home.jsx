import { useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";

/* Example shapes (can be replaced by props/API):
   latest: { status, latest: { _id, clients, bt_devices, density, wifi_estimate, bt_estimate, crowd_estimate, crowd_level, timestamp } }
   past:   { status, summary: [ { _id, count, avg_estimate, timestamp? } ] }  _id is level: low|medium|high
*/
const sampleLatest = {
	status: "success",
	latest: {
		_id: "69948caea3f4649e362703ca",
		clients: 27,
		bt_devices: 1,
		density: "medium",
		wifi_estimate: 54,
		bt_estimate: 3,
		crowd_estimate: 39,
		crowd_level: "low",
		timestamp: "2026-02-17T15:43:42.000Z",
	},
};

const samplePast = {
	status: "success",
	summary: [
		{
			_id: "low",
			count: 1,
			avg_estimate: 17,
			timestamp: "2026-02-17T14:30:00.000Z",
		},
		{
			_id: "medium",
			count: 3,
			avg_estimate: 42,
			timestamp: "2026-02-17T13:15:00.000Z",
		},
		{
			_id: "high",
			count: 2,
			avg_estimate: 78,
			timestamp: "2026-02-17T12:00:00.000Z",
		},
	],
};

const formatTime = (iso) => {
	try {
		const d = new Date(iso);
		return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
	} catch {
		return iso;
	}
};

const Slider = ({
	children,
	count,
	index,
	setIndex,
	className = "",
	dots = true,
}) => {
	const goPrev = () => setIndex((i) => (i <= 0 ? count - 1 : i - 1));
	const goNext = () => setIndex((i) => (i >= count - 1 ? 0 : i + 1));
	if (count <= 0) return null;
	return (
		<div className={`slider ${className}`}>
			<button
				type="button"
				className="slider-arrow slider-arrow--prev"
				onClick={goPrev}
				aria-label="Previous">
				<span className="slider-arrow-icon">‹</span>
			</button>
			<div className="slider-viewport">
				<div
					className="slider-track"
					style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
					{children}
				</div>
			</div>
			<button
				type="button"
				className="slider-arrow slider-arrow--next"
				onClick={goNext}
				aria-label="Next">
				<span className="slider-arrow-icon">›</span>
			</button>
			{dots && count > 1 && (
				<div className="slider-dots">
					{Array.from({ length: count }).map((_, i) => (
						<button
							key={i}
							type="button"
							className={`slider-dot ${i === index ? "slider-dot--active" : ""}`}
							onClick={() => setIndex(i)}
							aria-label={`Go to slide ${i + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const Home = () => {
	const latest = sampleLatest?.latest;
	const pastSummary = samplePast?.summary ?? [];
	const [pastIndex, setPastIndex] = useState(0);

	return (
		<div className="home-container">
			<div className="navbar-wrapper">
				<Navbar />
			</div>

			<main className="home-main">
				<div className="content-box">
					<header className="header-box">
						<h1 className="header-title">Sample Station Data</h1>
					</header>

					{/* Latest data */}
					<section
						className="data-slider-section data-slider-section--latest"
						aria-label="Latest data">
						<h2 className="section-heading">Latest Data</h2>
						<div className="data-slider-inner">
							{latest ? (
								<div className="data-card">
									<div className="data-card-glow" />
									<div className="data-meta">
										<span className="data-meta-time">
											{formatTime(latest.timestamp)}
										</span>
										<span
											className={`data-meta-badge data-meta-badge--${latest.crowd_level}`}>
											{latest.crowd_level}
										</span>
									</div>
									<div className="data-stats">
										<div className="data-stat">
											<span className="data-stat-value">{latest.clients}</span>
											<span className="data-stat-label">clients</span>
										</div>
										<div className="data-stat">
											<span className="data-stat-value">
												{latest.bt_devices}
											</span>
											<span className="data-stat-label">BT devices</span>
										</div>
										<div className="data-stat">
											<span className="data-stat-value">
												{latest.wifi_estimate}
											</span>
											<span className="data-stat-label">Wi‑Fi est.</span>
										</div>
										<div className="data-stat">
											<span className="data-stat-value">
												{latest.bt_estimate}
											</span>
											<span className="data-stat-label">BT est.</span>
										</div>
										<div className="data-stat">
											<span className="data-stat-value">
												{latest.crowd_estimate}
											</span>
											<span className="data-stat-label">crowd est.</span>
										</div>
										<div className="data-stat">
											<span className="data-stat-value">{latest.density}</span>
											<span className="data-stat-label">density</span>
										</div>
									</div>
								</div>
							) : (
								<div className="data-card data-card--empty">No latest data</div>
							)}
						</div>
					</section>

					{/* Past data */}
					<section className="data-slider-section" aria-label="Past data">
						<h2 className="section-heading">Past Data</h2>
						{pastSummary.length > 0 ? (
							<Slider
								count={pastSummary.length}
								index={pastIndex}
								setIndex={setPastIndex}
								className="data-slider-wrap">
								{pastSummary.map((item, i) => (
									<div key={item._id ?? i} className="slider-slide data-slide">
										<div className="data-card">
											<div className="data-card-glow" />
											<div className="data-meta">
												<span className="data-meta-time">
													{item.timestamp ? formatTime(item.timestamp) : "—"}
												</span>
												<span
													className={`data-meta-badge data-meta-badge--${["low", "medium", "high"].includes(item._id) ? item._id : "neutral"}`}>
													{item._id}
												</span>
											</div>
											<div className="data-stats">
												<div className="data-stat">
													<span className="data-stat-value">{item.count}</span>
													<span className="data-stat-label">count</span>
												</div>
												<div className="data-stat">
													<span className="data-stat-value">
														{item.avg_estimate}
													</span>
													<span className="data-stat-label">avg estimate</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</Slider>
						) : (
							<div className="data-card data-card--empty">No past data</div>
						)}
					</section>
				</div>
			</main>
		</div>
	);
};

export default Home;
