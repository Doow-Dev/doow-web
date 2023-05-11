import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../components/loading/loading";

const withPublicRedirectTo = (WrappedComponent: any, redirectTo?: string) => {
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
      const { accessToken } = localStorage; // update with redux value

      if (accessToken) {
        router.replace(redirectTo ? redirectTo : "/profile");
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withPublicRedirectTo;
