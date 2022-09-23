import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MdBarChart } from "react-icons/md";
import { Stack } from "types/api";
import { Statistics } from "./Statistics";

type Props = {
  data: Stack[] | undefined;
  isLoading: boolean;
};

export const BookTableList = ({ data, isLoading }: Props) => {
  return (
    <Statistics title="table" icon={MdBarChart} isLoading={isLoading}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>time</Th>
              <Th>price</Th>
              <Th>pages</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((d, i) => (
              <Tr key={i}>
                <Td>{d.timestamp}</Td>
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
