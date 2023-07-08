import { Outlet } from "react-router-dom";
import useConnected from "../hooks/useConnected";

export default function Radiologue() {
  const user = useConnected();
  return user?.type == "radiologue" ? <Outlet /> : <h1>Unauthorised</h1>;
}
