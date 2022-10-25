import { useBreakpointValue } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useContext } from "react";
import { mobileMaxWidth } from "utils/config";

type MobileContextType = {
  isMobile: boolean;
};

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
});

export const useMobileContext = (): MobileContextType =>
  useContext<MobileContextType>(MobileContext);

export const MobileContextProvider = ({ children }: PropsWithChildren) => {
  const isMobile = useBreakpointValue({
    base: window.innerWidth < mobileMaxWidth,
    sm: false,
    md: false,
  });
  return (
    <MobileContext.Provider
      value={{
        isMobile: isMobile ?? window.innerWidth < mobileMaxWidth,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
};
