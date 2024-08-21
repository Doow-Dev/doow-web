import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading/loading";

const withAuth = (WrappedComponent: any) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return <Loading />; //@todo: add loading component
    }

    if (typeof window !== "undefined") {
      const router = useRouter();
      const path = router.pathname;
      const { accessToken, me } = localStorage; // update with the redux value
      if (!accessToken) {
        window.location.assign("https://dashboard.doow.co/");
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
