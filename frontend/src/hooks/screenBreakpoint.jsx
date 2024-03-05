import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const useBreakpoint = () => {
  const getBreakpoint = (width) => {
    if (width < breakpoints.sm) return 'xs';
    else if (width >= breakpoints.sm && width < breakpoints.md) return 'sm';
    else if (width >= breakpoints.md && width < breakpoints.lg) return 'md';
    else if (width >= breakpoints.lg && width < breakpoints.xl) return 'lg';
    else if (width >= breakpoints.xl && width < breakpoints.xxl) return 'xl';
    else return 'xxl';
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;