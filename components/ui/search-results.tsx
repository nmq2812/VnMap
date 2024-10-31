import { useEffect, useState } from "react";
import { Order } from "@/app/admin/components/data/order";
import {
  Table,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CheckCircle2, CircleDotDashed } from "lucide-react";

async function fetchCoordinates(location: string) {
  const response = await fetch(`https://tmdt.fimo.edu.vn/nominatim/search?q=${encodeURIComponent(location)}`);
  const data = await response.json();
  return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
}

type SearchResultsProps = {
  results: Order[];
};

export default function SearchResults({ results }: SearchResultsProps) {
  const [routeLinks, setRouteLinks] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const fetchRoutes = async () => {
      const newRouteLinks = new Map<string, string>();
      for (const order of results) {
        const office1 = order.items[0]?.office1; // Safely access office1
        const office2 = order.items[0]?.office2; // Safely access office2

        if (office1 && office2) { // Ensure both offices exist
          const coords1 = await fetchCoordinates(office1);
          const coords2 = await fetchCoordinates(office2);

          if (coords1 && coords2) {
            const link = `https://tmdt.fimo.edu.vn/maps/?point=${coords1.lat}%2C${coords1.lon}&point=${coords2.lat}%2C${coords2.lon}&profile=truck&layer=OpenStreetMap`;
            newRouteLinks.set(`${office1}-${office2}`, link);
          }
        }
      }
      setRouteLinks(newRouteLinks);
    };

    fetchRoutes();
  }, [results]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
      {results.map((order, index) => (
        <Table key={index}>
          <TableCaption>
            <tr className="grid grid-col border-b border-gray-300">
              <td className="text-left p-2">{order.customer.name}</td>
              <td className="text-right p-2">${order.total.toFixed(2)}</td>
              <td className="text-right p-2">{order.items.map(item => item.office1).join(", ")}</td>
            </tr>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>
                <CheckCircle2 />
                Điểm giao dịch: {order.items.map(item => item.office1).join(", ")}
              </TableCell>
            </TableRow>
            {order.items.map(item => item.hubs.map((hub, index) => (
              <TableRow key={index}>
                <TableCell>
                  <CheckCircle2 />
                  Điểm tập kết: {hub}
                </TableCell>
              </TableRow>
            )))}
            <TableRow>
              <TableCell>
                <CircleDotDashed />
                Điểm giao dịch: {order.items.map(item => item.office2).join(", ")}
                <br />
                {routeLinks.get(`${order.items[0]?.office1}-${order.items[0]?.office2}`) ? (
                  <a href={routeLinks.get(`${order.items[0]?.office1}-${order.items[0]?.office2}`)} target="_blank" rel="noopener noreferrer">
                    Xem đường đi
                  </a>
                ) : (
                  "Loading link..."
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>{order.status}</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
      ))}
    </div>
  );
}
