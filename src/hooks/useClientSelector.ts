import { useEffect } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";

const useClientSelector = () => {
  const { data: sessionData } = useSession();

  useEffect(() => {
    const checkClient = () => {
      if (!sessionData) {
        return;
      }
      if (
        sessionData.user.activeClient === null ||
        sessionData.user.activeClient === 0
      ) {
        Router.push("/select_client").catch((err) => console.log(err));
      }
      if (
        sessionData.user.activeClient != null &&
        sessionData.user.activeClient != 0
      ) {
        const currentUrl = window.location.href;
        Router.push(currentUrl).catch((err) => console.log(err));
      }
    };

    checkClient();
  }, [sessionData]);
};

export default useClientSelector;
