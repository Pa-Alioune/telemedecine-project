import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const loader = useLoaderData();
  console.log(loader);

  return (
    <div className="container">
      <div>Salut Bootstrap</div>
    </div>
  );
}
