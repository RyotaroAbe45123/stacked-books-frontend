import { Flex, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { Card } from "./Card";

type StatisticsProps = {
  title: string;
  icon: IconType;
  children: ReactNode;
};

export const Statistics = ({ title, icon, children }: StatisticsProps) => {
  return (
    <Card heightPixel={350}>
      <Flex my="auto" h="100%" align="center" justify="center">
        <>
          <div>{title}</div>
          <Icon as={icon} w="24px" h="24px" />
          {children}
        </>
      </Flex>
    </Card>
  );
};
