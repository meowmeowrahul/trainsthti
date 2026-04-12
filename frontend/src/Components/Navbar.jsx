import { useState } from "react";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Live metrics", href: "#live" },
  { label: "History", href: "#history" },
];

const Navbar = ({ onRefresh, lastSynced, isRefreshing }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (event, href) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const syncText = lastSynced
    ? `Synced ${new Date(lastSynced).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "Waiting for sync";

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--surface-strong)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4 py-3">
          <a
            href="#overview"
            className="flex items-center gap-3"
            onClick={(event) => handleNavClick(event, "#overview")}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg border"
              style={{
                borderColor: "var(--border-subtle)",
                background: "var(--surface)",
              }}
            >
              <img
                src="/trainsthti-logo.png"
                alt="Trainsthti logo"
                className="h-7 w-7"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">Trainsthti</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Live dashboard
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <ul
              className="ui-nav flex items-center gap-2 rounded-lg p-1 text-sm"
              style={{
                color: "var(--text-muted)",
              }}
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className="ui-navitem inline-flex items-center focus-visible:outline"
                    style={{ opacity: 0.9 }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onRefresh}
              className="ui-button rounded-lg px-4 py-2 text-sm font-medium"
              disabled={isRefreshing}
            >
              {isRefreshing ? "Refreshing" : "Refresh"}
            </button>

            <div
              className="ui-badge ui-card px-3 py-2 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {syncText}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen((value) => !value)}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              className="ui-button inline-flex h-10 w-10 items-center justify-center rounded-lg"
            >
              {isMobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {isMobileOpen ? (
          <div
            id="mobile-nav"
            className="border-t py-3 md:hidden"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <ul
              className="space-y-1 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      handleNavClick(event, item.href);
                      setIsMobileOpen(false);
                    }}
                    className="block rounded-lg px-4 py-3 hover:opacity-100 focus-visible:outline"
                    style={{ opacity: 0.9 }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onRefresh}
                  className="ui-button mt-2 block w-full rounded-lg px-4 py-3 text-left"
                  disabled={isRefreshing}
                >
                  {isRefreshing ? "Refreshing" : "Refresh"}
                </button>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
