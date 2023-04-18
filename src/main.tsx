import React from "react"
import ReactDOM from "react-dom/client"
import { RootRoute, Route, Router, Outlet, RouterProvider, useRouter } from "@tanstack/router"

const RootComp: React.FC = () => {
	const { state } = useRouter()

	return <>
		<dl>
			<dt>Current Path:</dt>
			<dd>"{state.currentLocation.pathname}"</dd>

			<dt>Current Matches:</dt>
			<dd>"{state.currentMatches.map(m => m.id).join(", ")}"</dd>
		</dl>
		<p>
			If matching nests layout routes correctly, you should see "A B Index" below.<br />
			However, as of beta.84 only the last layout-route is matched - so "A" will be missing.
		</p>
		<Outlet />
	</>
}

const rootRoute = new RootRoute({
	component: RootComp
})

const layoutA = new Route({
	getParentRoute: () => rootRoute,
	id: "layout-a",
	component: () => <><div>A</div><Outlet /></>
})

const layoutB = new Route({
	getParentRoute: () => layoutA,
	id: "layout-b",
	component: () => <><div>B</div><Outlet /></>
})

const indexRoute = new Route({
	getParentRoute: () => layoutB,
	path: "/",
	component: () => <>Index</>
})

const routeTree = rootRoute.addChildren([
	layoutA.addChildren([
		layoutB.addChildren([
			indexRoute,
		]),
	]),
])

const router = new Router({
	routeTree: routeTree
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router as any} />
	</React.StrictMode>
)
