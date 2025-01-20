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
import { LineStringType } from "./OpenLayersMap";

export default function MissionModal({
  data,
  isShow,
  setShow,
}: {
  data: LineStringType[];
  isShow: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isShow} modal={false}>
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
                onClick={() => setShow(false)}
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
          <div className="flex-1 space-y-2">
            <LineStringTable data={data} />
            <MissionModalCallout />
          </div>
        </div>
        <DialogFooter className="flex justify-end">
          <Button
            className="bg-[#6C5CE7] px-5 hover:bg-[#5A4BD1]"
            onClick={() => {
              if (data.length > 0) {
                alert(data);
              } else {
                setShow(false);
              }
            }}
          >
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
