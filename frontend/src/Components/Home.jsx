import { useContext, useState } from "react";
import "./Home.css";
import Navbar from "./Navbar";
import { AppContext } from "../Context";

/* Example shapes (can be replaced by props/API):
   latest: { status, latest: { _id, clients, bt_devices, density, wifi_estimate, bt_estimate, crowd_estimate, crowd_level, timestamp } }
   past:   { status, summary: [ { _id, count, avg_estimate, timestamp? } ] }  _id is level: low|medium|high
*/

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
	const { latest, past } = useContext(AppContext);
	const pastSummary = past;
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
						<h2 className="section-heading">Past Data (Current Hour)</h2>
						{pastSummary.length > 0 ? (
							<Slider
								count={pastSummary.length}
								index={pastIndex}
								setIndex={setPastIndex}
								className="data-slider-wrap">
								{pastSummary.map((item, i) => {
									const fromTime = item.from ? formatTime(item.from) : "—";
									const toTime = item.to ? formatTime(item.to) : "—";

									return (
										<div
											key={item.chunkIndex ?? i}
											className="slider-slide data-slide">
											<div className="data-card">
												<div className="data-card-glow" />
												<div className="data-meta">
													<span className="data-meta-time">
														{fromTime} – {toTime}
													</span>
													<span
														className={`data-meta-badge data-meta-badge--${item.crowd_level}`}>
														{item.crowd_level}
													</span>
												</div>
												<div className="data-stats">
													<div className="data-stat">
														<span className="data-stat-value">
															{item.count ?? 0}
														</span>
														<span className="data-stat-label">samples</span>
													</div>
													<div className="data-stat">
														<span className="data-stat-value">
															{item.avgCrowd != null
																? Math.round(item.avgCrowd)
																: "—"}
														</span>
														<span className="data-stat-label">avg crowd</span>
													</div>
												</div>
											</div>
										</div>
									);
								})}
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
