"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMapStore, { LineStringType } from "@/store";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

const columns: ColumnDef<LineStringType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "wp",
    header: "WP",
  },
  {
    accessorKey: "coordinates",
    header: "Coordinates",
    cell: ({ row }) => {
      const coordinates = row.getValue("coordinates");
      if (Array.isArray(coordinates)) return;
      const data = coordinates as { x: number; y: number };
      return `${data.x}, ${data.y}`;
    },
  },
  {
    accessorKey: "distance",
    header: "Distance (m)",
    cell: ({ row }) => {
      const distance = row.getValue("distance") as number;
      return <div className="text-center">{distance ?? "--"}</div>;
    },
  },
];

export function PolygonTable() {
  const { polygonStringArray } = useMapStore();
  const table = useReactTable({
    data: polygonStringArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (polygonStringArray.length <= 0) {
    return null;
  }

  return (
    <ScrollArea className="max-h-64 w-full">
      <div className="max-h-64">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-zinc-800">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="text-xs text-zinc-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}

export default PolygonTable;
