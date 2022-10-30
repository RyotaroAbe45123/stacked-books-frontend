import { IoChevronDownOutline } from "react-icons/io5";
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
import { useState } from "react";
import { theme } from "theme/theme";
import { Stack } from "types/api";
import { words } from "utils/words";
import { SpinnerComponent } from "components/SpinnerComponent";
import { MonthlyBookBarChartComponent } from "./MonthlyBookBarChartComponent";
import { DailyBookBarChartComponent } from "./DailyBookBarChartComponent";
import { useMobileContext } from "contexts/MobileContext";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const StacksChart = ({ data, isLoading }: Props) => {
  const { isMobile } = useMobileContext();

  const [dataType, setDataType] = useState<string>(
    words.dashboard.books.chartButton.monthly,
  );

  const dataTypeArray = [
    words.dashboard.books.chartButton.monthly,
    words.dashboard.books.chartButton.daily,
  ];

  return (
    <Card heightPixel={400}>
      <Box w="100%" h="100%" padding={isMobile ? "10px" : "20px"}>
        <Flex
          w="100%"
          h="36px"
          justify="space-between"
          alignItems="center"
          paddingX={isMobile ? "10px" : "0px"}
          paddingTop="10px"
        >
          <Box
            color={theme.mainText}
            fontSize={isMobile ? "1.25rem" : "1.5rem"}
            fontWeight="bold"
          >
            {dataType === words.dashboard.books.chartButton.monthly
              ? words.dashboard.books.chartTitle.monthly
              : words.dashboard.books.chartTitle.daily}
          </Box>
          <Box>
            <Menu>
              <MenuButton height="36px" as={Button}>
                <IoChevronDownOutline />
              </MenuButton>
              {dataType === words.dashboard.books.chartButton.monthly ? (
                <MenuList>
                  {dataTypeArray.map((d) => (
                    <MenuItem key={d} onClick={() => setDataType(d)}>
                      {d}
                    </MenuItem>
                  ))}
                </MenuList>
              ) : (
                <MenuList>
                  {dataTypeArray.reverse().map((d) => (
                    <MenuItem key={d} onClick={() => setDataType(d)}>
                      {d}
                    </MenuItem>
                  ))}
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
              {dataType === words.dashboard.books.chartButton.monthly ? (
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
