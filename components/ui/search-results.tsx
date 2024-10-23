// components/SearchResults.tsx
import { Order } from "@/app/admin/components/data/order";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { CheckCircle2, CircleDotDashed } from "lucide-react";


type SearchResultsProps = {
  results: Order[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  console.log(results)
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
      {results.map((order, index) => (
      <Table key={index}>
        <TableCaption>
          <tr key={index} className="grid grid-col border-b border-gray-300">
            <td className="text-left p-2">{order.customer.name}</td>
            <td className="text-right p-2">${order.total.toFixed(2)}</td>
            <td className="text-right p-2">{order.items.map(item => item.office1 )}</td>
          </tr>
        </TableCaption>
        <TableHeader>
          <TableCell className="">
            <TableRow className="">
              <TableCell className=""><CheckCircle2></CheckCircle2> </TableCell>
              <TableCell className="">Điểm giao dịch: {order.items.map(item => item.office1 )}</TableCell>
            </TableRow>
            {order.items.map(item => item.hubs.map((hub, index) => (
              <TableRow key={index} className="">
                <TableCell className=""><CheckCircle2></CheckCircle2> </TableCell>
                <TableCell className="">Điểm tập kết: {hub}</TableCell>
              </TableRow>
            )) )}
            <TableRow>
              <TableCell className=""><CircleDotDashed></CircleDotDashed> </TableCell>
              <TableCell className="">Điểm giao dịch: {order.items.map(item => item.office2 )} </TableCell>
            </TableRow>
            {order.status}
          </TableCell>
        </TableHeader>
      </Table>
      ))}
    </div>
  );
}
