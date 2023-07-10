import { useEffect, useState } from "react";
import useActionPrivate from "./useActionPrivate";
import { API_ROUTES, API_URL } from "../utils/url";

export default function useConnected() {
  const [user, setUser] = useState(null);
  const privateaxios = useActionPrivate();

  useEffect(() => {
    privateaxios
      .get(API_URL + API_ROUTES.CONNECTEDUSER)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((error) => console.log(error));
  }, [privateaxios]);

  return user;
}
