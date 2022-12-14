import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { convertTimeStampToDate, searchAuthors } from "functions/utils";
import { useCallback, useEffect, useState } from "react";
import { MdTableRows } from "react-icons/md";
import { useBook } from "services/book/useBook";
import { Book, Stack } from "types/api";
import { TableListDataType } from "types/data";
import { words } from "utils/words";
import { Statistics } from "./Statistics";

type Props = {
  stacks: Stack[] | undefined;
  isLoading: boolean;
};

const emptyData: TableListDataType = {
  date: "",
  title: "",
  authors: "",
  price: 0,
  pages: 0,
};

const emptyArray: TableListDataType[] = Array(5).fill(emptyData);

export const BookTableList = ({ stacks, isLoading }: Props) => {
  const { books } = useBook({
    offset: 0,
    pageSize: 5,
  });

  const [tableListData, setTableListData] =
    useState<TableListDataType[]>(emptyArray);

  // 最新の5件を選択
  const selectData = useCallback(
    (stacks: Stack[], books: Book[]): TableListDataType[] => {
      if (stacks.length > 4) {
        const filteredStacks = stacks.slice(0, 5);
        const tableListData: TableListDataType[] = filteredStacks.map(
          (stack) => {
            return {
              date: convertTimeStampToDate(stack.timestamp),
              title: stack.title,
              authors: searchAuthors(stack.isbn, books),
              price: stack.price,
              pages: stack.pages,
            };
          },
        );
        return tableListData;
      } else {
        const initializedArray: TableListDataType[] = Array(5).fill(emptyData);
        stacks.forEach((stack, i) => {
          initializedArray[i] = {
            date: convertTimeStampToDate(stack.timestamp),
            title: stack.title,
            authors: searchAuthors(stack.isbn, books),
            price: stack.price,
            pages: stack.pages,
          };
        });
        return initializedArray;
      }
    },
    [],
  );

  useEffect(() => {
    if (stacks !== undefined && books !== undefined) {
      setTableListData(selectData(stacks, books));
    }
  }, [stacks, books, selectData]);

  return (
    <Statistics
      title={words.dashboard.books.tableTitle}
      icon={MdTableRows}
      isLoading={isLoading}
    >
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>{words.dashboard.books.tableColumns.date}</Th>
              <Th>{words.dashboard.books.tableColumns.title}</Th>
              <Th>{words.dashboard.books.tableColumns.authors}</Th>
              <Th>{words.dashboard.books.tableColumns.price}</Th>
              <Th>{words.dashboard.books.tableColumns.pages}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableListData?.map((data, index) => (
              <Tr
                key={data.title ? data.title : `${data.price}/${index}`}
                height="3rem"
              >
                <Td maxWidth="100px">{data.date}</Td>
                <Td
                  width="450px"
                  maxWidth={{
                    base: "300px",
                    lg: "300px",
                    xl: "400px",
                  }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {data.title}
                </Td>
                <Td
                  maxWidth={{
                    base: "150px",
                    lg: "150px",
                    xl: "200px",
                  }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {data.authors}
                </Td>
                <Td>{data.price ? data.price.toLocaleString() : ""}</Td>
                <Td>{data.pages ? data.pages.toLocaleString() : ""}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Statistics>
  );
};
