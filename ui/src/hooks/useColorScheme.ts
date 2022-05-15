import { useEffect } from "react";

export const colorSchemes = ["dark", "light"];

function getMediaQuery(scheme: string) {
  return `(prefers-color-scheme: ${scheme})`;
}

export default function useColorScheme(onChange: (scheme: string) => void) {
  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    function listener(e: MediaQueryListEvent | MediaQueryList) {
      if (!e || !e.matches) {
        return;
      }
      const scheme = colorSchemes.find(s => e.media === getMediaQuery(s));
      if (onChange && scheme) onChange(scheme);
    }

    const queries = colorSchemes.map(name => {
      const mq = window.matchMedia(getMediaQuery(name));
      mq.addListener(listener);
      listener(mq);
      return mq;
    });

    return () => {
      queries.forEach(mq => mq.removeListener(listener));
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  // NOTE: We exclude `onChange` from the deps as it potentially changes on each render.
}
