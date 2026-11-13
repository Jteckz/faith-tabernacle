import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Layout route for /ministries — renders the ministries index at /ministries
 * (ministries.index.tsx) and the ministry sub-pages (e.g. /ministries/p&w)
 * inside the <Outlet />.
 */
export const Route = createFileRoute("/ministries")({
  component: MinistriesLayout,
});

function MinistriesLayout() {
  return <Outlet />;
}
