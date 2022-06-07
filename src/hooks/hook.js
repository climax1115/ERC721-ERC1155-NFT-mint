import { useEffect, useState } from "react";

export const customToFixed = (x, len) => {
    if (x.toString().indexOf(".") > 0) {
        return x.toString().slice(0, x.toString().indexOf(".") + (len + 1));
    } else {
        return x;
    }
}

export const useMobileStatus = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 700);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, [])

    return isMobile;
}