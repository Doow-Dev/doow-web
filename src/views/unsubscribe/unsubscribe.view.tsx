import Image from "next/image";
import React from "react";

export default function UnsubscribeView() {
  return (
    <div>
      <Image src="../images/congrats" alt="Unsubscribe" />

      <h2>We are sad to see you go</h2>

      <p>
        You have successfully unsubscribed, you will no longer receive this type
        of emails from Doow. If you unsubscrribed by mistake, please subscribe
        back.
      </p>
    </div>
  );
}
