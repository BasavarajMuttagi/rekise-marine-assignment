import "./App.css";
import MissionModal from "./components/MissionModal";
import OpenLayersMap from "./components/OpenLayersMap";

function App() {
  return (
    <div className="relative h-screen w-full">
      <OpenLayersMap />
      <MissionModal />
    </div>
  );
}

export default App;
