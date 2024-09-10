import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  console.log(pathname)

  useLayoutEffect(() => {
    window.scrollTo({top:0, behavior: "auto"});
  }, [pathname]);

  return null;
}

export default ScrollToTop;