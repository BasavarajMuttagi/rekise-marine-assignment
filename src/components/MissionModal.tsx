import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import LineStringTable from "./LineStringTable";

export default function MissionModal() {
  return (
    <Dialog open={true} modal={false}>
      <DialogContent className="w-full max-w-xl [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Mission Creation
            </DialogTitle>
            <DialogClose className="outline-none">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-md p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <hr className="border-t-2 border-zinc-200 dark:border-zinc-700" />
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold">Waypoint Navigation</h3>
          <div className="flex-1">
            <LineStringTable data={data} />
            <MissionModalCallout />
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <Button className="bg-[#6C5CE7] px-5 hover:bg-[#5A4BD1]">
            Generate Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const MissionModalCallout = () => (
  <div className="rounded-md border border-dashed border-zinc-500/40 bg-muted p-4">
    <p className="text-xs text-muted-foreground">
      Click on the map to mark points of the route and then press ↵ complete the
      route.
    </p>
  </div>
);

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
