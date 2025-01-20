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
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  EllipsisVertical,
  Upload,
} from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
      if (!coordinates) return "Polygon";

      if (Array.isArray(coordinates)) {
        return (
          <div className="pl-4">
            <LineStringTable data={coordinates} />
          </div>
        );
      }

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
  {
    id: "actions",
    header: () => (
      <div className="flex justify-center">
        <Upload size={16} className="text-blue-500" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Options {...row.original} />
        </div>
      );
    },
  },
];

export function LineStringTable({ data }: { data: LineStringType[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (data.length <= 0) {
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
            {table.getRowModel().rows.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
}

export default LineStringTable;

const Options = (row: LineStringType) => {
  const {
    setSelectedPolygon,
    setShowMissionModal,
    setShowPolygonModal,
    setDrawType,
  } = useMapStore();
  const handleSelect = (value: "before" | "after") => {
    setSelectedPolygon({ LineString: row, position: value });
    setShowMissionModal(false);
    setShowPolygonModal(true);
    setDrawType("Polygon");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1.5">
          <EllipsisVertical className="text-zinc-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem
          textValue="before"
          onSelect={() => handleSelect("before")}
        >
          <ArrowLeftToLine />
          <span>Insert Polygon Before</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="after"
          onSelect={() => handleSelect("after")}
        >
          <ArrowRightToLine /> <span>Insert Polygon After</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
