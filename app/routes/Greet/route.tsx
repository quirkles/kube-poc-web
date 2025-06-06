import type { Route } from "./+types/route";
import {GreetContainer} from "~/routes/Greet/Container";

export function meta({}: Route.MetaArgs) {
  return [];
}

export default function GreetRoute() {
  return (
        <GreetContainer/>
  )
}
