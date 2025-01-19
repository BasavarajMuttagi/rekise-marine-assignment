"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { EllipsisVertical, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

type LineString = {
  wp: string;
  coordinates: {
    x: number;
    y: number;
  };
  distance: number | null;
};

const columns: ColumnDef<LineString>[] = [
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
      const coordinates = row.getValue("coordinates") as {
        x: number;
        y: number;
      };
      return `${coordinates.x}, ${coordinates.y}`;
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
  {
    id: "actions",
    header: () => (
      <div className="flex justify-center">
        <Upload size={16} className="text-blue-500" />
      </div>
    ),
    cell: () => (
      <div className="text-center">
        <Button variant="ghost" size="sm" className="p-1.5">
          <EllipsisVertical className="text-zinc-700" />
        </Button>
      </div>
    ),
  },
];

const data = [
  {
    wp: "00",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: null,
  },
  {
    wp: "01",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 15.5,
  },
  {
    wp: "02",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 8.3,
  },
  {
    wp: "03",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 3.5,
  },
  {
    wp: "04",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: null,
  },
  {
    wp: "05",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 15.5,
  },
  {
    wp: "06",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 8.3,
  },
  {
    wp: "07",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 3.5,
  },

  {
    wp: "08",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: null,
  },
  {
    wp: "09",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 15.5,
  },
  {
    wp: "10",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 8.3,
  },
  {
    wp: "11",
    coordinates: {
      x: 12.97169189,
      y: 12.97169189,
    },
    distance: 3.5,
  },
];

export function LineStringTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className="h-[250px] w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="p-0 text-zinc-800">
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="text-xs text-zinc-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-0">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-8 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default LineStringTable;
