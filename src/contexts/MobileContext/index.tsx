import { useBreakpointValue } from "@chakra-ui/react";
import { createContext, PropsWithChildren, useContext } from "react";

type MobileContextType = {
  isMobile: boolean;
};

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
});

export const useMobileContext = () =>
  useContext<MobileContextType>(MobileContext);

export const MobileContextProvider = ({ children }: PropsWithChildren) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <MobileContext.Provider
      value={{ isMobile: isMobile !== undefined ? isMobile : false }}
    >
      {children}
    </MobileContext.Provider>
  );
};
