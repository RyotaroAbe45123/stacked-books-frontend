import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { TableListDataType } from "types/data";
import { Statistics } from "./Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const BookTableList = ({ data, isLoading }: Props) => {
  const [tableListData, setTableListData] = useState<TableListDataType[]>();

  const convertTimeStampToDate = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 最新の5件を選択
  const selectData = useCallback((stacks: Stack[]): TableListDataType[] => {
    const tableListData: TableListDataType[] = stacks.map((stack) => {
      return {
        date: convertTimeStampToDate(stack.timestamp),
        price: stack.price,
        pages: stack.pages,
      };
    });
    tableListData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return tableListData.slice(0, 5);
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setTableListData(selectData(data));
    }
  }, [data, selectData]);

  return (
    <Statistics title="Table" icon={MdBarChart} isLoading={isLoading}>
      <TableContainer>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>積んだ日付</Th>
              <Th>総金額</Th>
              <Th>総ページ数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableListData?.map((d, i) => (
              <Tr key={i}>
                <Td>{d.date}</Td>
                <Td>{d.price.toLocaleString()}</Td>
                <Td>{d.pages.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Statistics>
  );
};
