import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Card } from "./Card";

type StatisticsProps = {
  children: ReactNode;
};

export const Statistics = ({ children }: StatisticsProps) => {
  return (
    <Card heightPixel={350}>
      <Flex my="auto" h="100%" align="center" justify="center">
        {children}
      </Flex>
    </Card>
  );
};
