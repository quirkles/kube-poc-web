import type { Route } from "./+types/route";
import {HomeContainer} from "./Container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My app" },
    { name: "description", content: "Dummy app." },
  ];
}

export default function HomeRoute() {
  return <HomeContainer />;
}
