import { Button } from "@/components/ui/button";
import { log } from "@/lib/logger";

function App() {
  log.debug("Hello, world!");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button>Hello, world!</Button>
    </div>
  );
}

export default App;
