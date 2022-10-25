import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Card } from "components/Card";
import { Stack } from "types/api";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MobileBookBarChart = ({ data, isLoading }: Props) => {
  if (isLoading) {
    console.log(data);
  }

  const [dataType, setDataType] = useState<string>("Monthly");

  return (
    <Card heightPixel={400}>
      <Box w="100%" h="100%">
        <Flex
          w="100%"
          h="36px"
          justify="space-between"
          alignItems="center"
          paddingX="10px"
          paddingTop="10px"
        >
          <Box>{dataType}</Box>
          <Box>
            <Menu>
              <MenuButton
                height="36px"
                as={Button}
                rightIcon={<IoChevronDownOutline />}
              >
                Data
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setDataType("Monthly")}>
                  Monthly
                </MenuItem>
                <MenuItem onClick={() => setDataType("Daily")}>Daily</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </Card>
  );
};
