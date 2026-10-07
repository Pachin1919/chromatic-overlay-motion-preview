import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/editions")({
  component: EditionsLayout,
});

function EditionsLayout() {
  return <Outlet />;
}
