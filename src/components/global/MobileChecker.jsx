import { useContext, useEffect } from "react";
import { MobileContext } from "../../providers/MobileProvider";

export default function MobileChecker() {
  const { isMobile, setIsMobile } = useContext(MobileContext);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 950);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
}
