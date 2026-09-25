"use client";

import { useEffect, useState } from "react";

/** Live Riyadh time, e.g. 04:55 AST. Empty until mounted, so no hydration mismatch. */
export default function Clock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Riyadh",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return (
    <time className="tnum" suppressHydrationWarning>
      {now || "--:--"} AST
    </time>
  );
}
