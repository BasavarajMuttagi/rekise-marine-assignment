import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useMapStore from "@/store";
import { MoveLeft } from "lucide-react";
import PolygonTable from "./PolygonTable";

export default function PolygonToolModal() {
  const {
    showPolygonModal,
    setShowPolygonModal,
    setShowMissionModal,
    setDrawType,
    setPolygonStringArray,
    setSelectedPolygon,
  } = useMapStore();

  const handleDiscard = () => {
    setShowPolygonModal(false);
    setShowMissionModal(true);
    setDrawType("LineString");
    setPolygonStringArray([]);
    setSelectedPolygon(null);
  };
  return (
    <Dialog modal={false} open={showPolygonModal}>
      <DialogContent className="w-full max-w-xl [&>button]:hidden">
        <DialogHeader>
          <div>
            <div
              onClick={handleDiscard}
              role="button"
              className="inline-flex items-center space-x-2 text-zinc-500"
            >
              <MoveLeft strokeWidth={1.5} /> <span>Mission Creation</span>
            </div>
            <DialogTitle className="text-xl font-semibold">
              Polygon Tool
            </DialogTitle>
          </div>
        </DialogHeader>
        <hr className="border-t-2 border-zinc-200 dark:border-zinc-700" />
        <div className="flex flex-col space-y-4">
          <div className="flex-1">
            <PolygonTable />
            <div className="p-2"></div>
            <PolygonToolCallout />
          </div>
        </div>
        <hr className="border-t border-zinc-200 dark:border-zinc-700" />
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            <Button
              variant="ghost"
              className="text-zinc-500"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button className="bg-[#1A75A8] px-5 hover:bg-[#3e6d89]">
              Import Points
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
const PolygonToolCallout = () => (
  <div className="rounded-md border border-dashed border-zinc-500/40 bg-muted p-4">
    <p className="text-xs text-muted-foreground">
      Click on the map to mark points of the polygon's perimeter, then press ↵
      close and complete the polygon
    </p>
  </div>
);
