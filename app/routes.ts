import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Shell/route.tsx"),
    route("greet", "routes/Greet/route.tsx"),
] satisfies RouteConfig;
