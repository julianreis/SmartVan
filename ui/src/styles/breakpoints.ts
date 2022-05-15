export const breakpoints = {
  tiny: 320,
  small: 350,
  medium: 768,
  large: 1024,
  xlarge: 1200,
} as const;

export function upFromBreakpoint(breakpoint: keyof typeof breakpoints): string {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`;
}

export function upToBreakpoint(breakpoint: keyof typeof breakpoints): string {
  return `@media (max-width: ${breakpoints[breakpoint] - 1}px)`;
}
export function betweenBreakpoints(
  minBreakpoint: keyof typeof breakpoints,
  maxBreakpoint: keyof typeof breakpoints
): string {
  return `@media (min-width: ${breakpoints[minBreakpoint]}px) and (max-width: ${
    breakpoints[maxBreakpoint] - 1
  }px)`;
}
