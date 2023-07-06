import { useEffect, useState } from "react";
import useActionPrivate from "./useActionPrivate";

export default function useConnected() {
  const [user, setUser] = useState(null);
  const privateaxios = useActionPrivate();
  useEffect(() => {
    privateaxios
      .get("http://127.0.0.1:8000/api/connected-user/")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => console.log(error));
  });

  return user;
}
