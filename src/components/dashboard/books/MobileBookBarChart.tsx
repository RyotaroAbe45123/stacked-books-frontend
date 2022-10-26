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
import { SpinnerComponent } from "components/SpinnerComponent";
import { MonthlyBookBarChartComponent } from "./MonthlyBookBarChartComponent";
import { DailyBookBarChartComponent } from "./DailyBookBarChartComponent";
import { words } from "utils/words";
import { theme } from "theme/theme";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const MobileBookBarChart = ({ data, isLoading }: Props) => {
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
          <Box color={theme.mainText} fontSize="1.25rem" fontWeight="bold">
            {dataType === "Monthly"
              ? words.dashboard.books.chartTitle.monthly
              : words.dashboard.books.chartTitle.daily}
          </Box>
          <Box>
            <Menu>
              <MenuButton height="36px" as={Button}>
                <IoChevronDownOutline />
              </MenuButton>
              {dataType === "Monthly" ? (
                <MenuList>
                  <MenuItem onClick={() => setDataType("Monthly")}>
                    Monthly
                  </MenuItem>
                  <MenuItem onClick={() => setDataType("Daily")}>
                    Daily
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList>
                  <MenuItem onClick={() => setDataType("Daily")}>
                    Daily
                  </MenuItem>
                  <MenuItem onClick={() => setDataType("Monthly")}>
                    Monthly
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </Box>
        </Flex>
        <Flex
          w="100%"
          h="calc(100% - 36px)"
          justify="center"
          align="center"
          marginTop="10px"
        >
          {isLoading ? (
            <SpinnerComponent />
          ) : (
            <>
              {dataType === "Monthly" ? (
                <MonthlyBookBarChartComponent data={data} />
              ) : (
                <DailyBookBarChartComponent data={data} />
              )}
            </>
          )}
        </Flex>
      </Box>
    </Card>
  );
};
