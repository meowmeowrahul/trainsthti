import { useState } from "react";
import "../tailwind.css";
import "./Navbar.css";
import clsx from "clsx";

const navItems = [
	{ label: "Home", href: "#home" },
	{ label: "About", href: "#about" },
	{ label: "Contact", href: "#contact" },
];

const Navbar = () => {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [profileOpen, setProfileOpen] = useState(false);

	const handleNavClick = (e, href) => {
		if (href.startsWith("#")) {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		const query = searchQuery.trim();
		if (!query) return;
		// Replace with your actual search logic
		console.log("Searching for:", query);
	};

	const toggleMobile = () => setIsMobileOpen((prev) => !prev);
	const toggleProfile = () => setProfileOpen((prev) => !prev);

	return (
		<nav className="navbar navbar--dark text-slate-100 sticky top-0 z-50 border-b border-slate-600/40 backdrop-blur-md">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* Logo + brand */}
					<div className="flex items-center gap-3">
						<img
							className="h-10 w-10 rounded-lg object-cover shadow-md"
							src="../trainsthti-logo.jpg"
							alt="logo"
						/>
						<span className="hidden sm:inline text-xl font-semibold tracking-tight text-slate-100">
							Trainsthti
						</span>
					</div>

					{/* Desktop nav links */}
					<div className="hidden md:flex items-center gap-6">
						<ul className="flex gap-6 text-sm font-medium">
							{navItems.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										onClick={(e) => handleNavClick(e, item.href)}
										className={clsx(
											"nav-link hover:text-cyan-300 text-slate-300",
										)}>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Search + profile (desktop) */}
					<div className="hidden md:flex items-center gap-4">
						{/* Search bar */}
						<form
							onSubmit={handleSearch}
							className={clsx(
								"nav-search-form flex items-center gap-2",
								"px-3 py-1.5",
								"border border-slate-600/60 rounded-full",
								"bg-slate-800/80",
								"shadow-sm",
							)}>
							<input
								type="text"
								className="bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none w-40 lg:w-56"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button
								type="submit"
								className="nav-search-btn text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 transition-transform">
								Go
							</button>
						</form>

						{/* Profile dropdown */}
						<div className="relative">
							<button
								type="button"
								onClick={toggleProfile}
								className={clsx(
									"nav-profile-btn flex items-center gap-2",
									"px-2 py-1",
									"border border-slate-600/60 hover:border-cyan-400/60 rounded-full",
									"bg-slate-800/80",
								)}>
								<div className="h-8 w-8 flex items-center justify-center rounded-full bg-cyan-500/80 text-slate-900 text-sm font-semibold">
									R
								</div>
								<span className="hidden lg:inline text-sm text-slate-100">
									Rahul
								</span>
								<span className="text-xs text-slate-400">▾</span>
							</button>

							{profileOpen && (
								<div
									className={clsx(
										"nav-profile-dropdown absolute right-0",
										"w-40",
										"mt-2 py-1",
										"border border-slate-600/60 rounded-xl",
										"bg-slate-800/95",
										"text-sm",
										"shadow-xl",
									)}>
									<button
										type="button"
										onClick={() => console.log("Go to profile")}
										className="w-full text-left px-3 py-2 hover:bg-slate-700/80 text-slate-100">
										Profile
									</button>
									<button
										type="button"
										onClick={() => console.log("Open settings")}
										className="w-full text-left px-3 py-2 hover:bg-slate-700/80 text-slate-100">
										Settings
									</button>
									<button
										type="button"
										onClick={() => console.log("Logout")}
										className="w-full text-left px-3 py-2 text-red-400 hover:bg-slate-700/80">
										Logout
									</button>
								</div>
							)}
						</div>
					</div>

					{/* Mobile controls: search icon + menu */}
					<div className="flex items-center gap-2 md:hidden">
						{/* Simple mobile search icon just opens console for now */}
						<button
							type="button"
							onClick={() => console.log("Open mobile search")}
							className="p-2 rounded-full hover:bg-slate-700/80 text-slate-300"
							aria-label="Search">
							S
						</button>
						<button
							type="button"
							onClick={toggleMobile}
							className="p-2 rounded-full hover:bg-slate-700/80 text-slate-300"
							aria-label="Toggle navigation menu">
							{isMobileOpen ? "✕" : "☰"}
						</button>
					</div>
				</div>

				{/* Mobile nav + search + profile */}
				{isMobileOpen && (
					<div className="nav-mobile-panel md:hidden border-t border-slate-600/40 pt-3 pb-4 space-y-3 overflow-hidden">
						<form
							onSubmit={handleSearch}
							className="flex items-center rounded-full bg-slate-800/80 border border-slate-600/60 px-3 py-1.5 gap-2">
							<input
								type="text"
								className="bg-transparent text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none flex-1"
								placeholder="Search..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<button
								type="submit"
								className="nav-search-btn text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 transition-transform">
								Go
							</button>
						</form>

						<ul className="space-y-1 text-sm font-medium">
							{navItems.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										onClick={(e) => {
											handleNavClick(e, item.href);
											setIsMobileOpen(false);
										}}
										className="nav-mobile-link block px-2 py-2 rounded-lg text-slate-200 hover:text-white transition-colors">
										{item.label}
									</a>
								</li>
							))}
						</ul>

						<div className="border-t border-slate-600/40 pt-3">
							<button
								type="button"
								onClick={() => console.log("Go to profile")}
								className="flex items-center gap-3 w-full px-2 py-2 rounded-lg hover:bg-slate-700/80">
								<div className="h-8 w-8 flex items-center justify-center rounded-full bg-cyan-500/80 text-slate-900 text-sm font-semibold">
									R
								</div>
								<div className="flex flex-col">
									<span className="text-sm text-slate-100">Rahul</span>
									<span className="text-xs text-slate-400">View profile</span>
								</div>
							</button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
