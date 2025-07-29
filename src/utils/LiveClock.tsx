import { useEffect, useState } from "react";

export const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("tr-TR", {
      dateStyle: "medium",
      timeStyle: "medium",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString("tr-TR", {
          dateStyle: "medium",
          timeStyle: "medium",
        })
      );
    }, 1000); // her saniye güncelle

    return () => clearInterval(interval); // component unmount olursa temizle
  }, []);
  return currentTime;
};
