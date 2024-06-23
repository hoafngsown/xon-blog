import { useEffect, useState } from "react";

interface Props {
  limitScrollY?: number;
}

export const useHeaderScroll = (props: Props) => {
  const limitScrollY: number = props?.limitScrollY ?? 50;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > limitScrollY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [limitScrollY]);

  return isScrolled;
};
