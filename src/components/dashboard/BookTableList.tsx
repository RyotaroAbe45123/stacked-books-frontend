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
import { MdTableRows } from "react-icons/md";
import { Stack } from "types/api";
import { TableListDataType } from "types/data";
import { Statistics } from "./Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

const emptyData: TableListDataType = {
  date: "",
  title: "",
  price: 0,
  pages: 0,
};

const initData: TableListDataType[] = Array(5).fill(emptyData);

export const BookTableList = ({ data, isLoading }: Props) => {
  const [tableListData, setTableListData] =
    useState<TableListDataType[]>(initData);

  const convertTimeStampToDate = (timeStamp: string) => {
    const date = new Date(timeStamp);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  };

  // 最新の5件を選択
  const selectData = useCallback((stacks: Stack[]): TableListDataType[] => {
    if (stacks.length > 4) {
      const filteredStacks = stacks.slice(0, 5);
      const tableListData: TableListDataType[] = filteredStacks.map((stack) => {
        return {
          date: convertTimeStampToDate(stack.timestamp),
          title: stack.title,
          price: stack.price,
          pages: stack.pages,
        };
      });
      return tableListData;
    } else {
      const initializedArray: TableListDataType[] = Array(5).fill(emptyData);
      stacks.forEach((stack, i) => {
        initializedArray[i] = {
          date: convertTimeStampToDate(stack.timestamp),
          title: stack.title,
          price: stack.price,
          pages: stack.pages,
        };
      });
      return initializedArray;
    }
    // const st = stacks.slice(0, 5);
    // const tableListData: TableListDataType[] = st.map((stack) => {
    //   return {
    //     date: convertTimeStampToDate(stack.timestamp),
    //     title: stack.title,
    //     price: stack.price,
    //     pages: stack.pages,
    //   };
    // });
    // tableListData.sort(
    //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    // );
    // return tableListData.slice(0, 5);
    // const st = stacks.slice(0, 5);
    // console.log(initData);
    // console.log("l");
    // st.map((s, i) => {
    //   initData[i] = {
    //     date: convertTimeStampToDate(s.timestamp),
    //     title: s.title,
    //     price: s.price,
    //     pages: s.pages,
    //   };
    // });
    // console.log("-");
    // console.log(initData);
    // return initData;
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setTableListData(selectData(data));
    }
  }, [data, selectData]);

  return (
    <Statistics title="Table" icon={MdTableRows} isLoading={isLoading}>
      <TableContainer>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>積んだ日付</Th>
              <Th>タイトル</Th>
              <Th>総金額</Th>
              <Th>総ページ数</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableListData?.map((data, index) => (
              <Tr
                key={data.title ? data.title : `${data.price}/${index}`}
                height="3rem"
                width="90%"
              >
                <Td maxWidth="150px">{data.date}</Td>
                <Td
                  width="500px"
                  maxWidth="500px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {data.title}
                </Td>
                <Td>{data.price ? data.price.toLocaleString() : ""}</Td>
                <Td>{data.price ? data.pages.toLocaleString() : ""}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Statistics>
  );
};
