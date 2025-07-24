import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Import the new LandingPage
import GeneratorPage from "./pages/GeneratorPage"; // Import the renamed GeneratorPage
import NotFound from "./pages/NotFound";
import { useDevToolsProtection } from "./hooks/useDevToolsProtection";

const queryClient = new QueryClient();

const App = () => {
  useDevToolsProtection();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Landing page as root */}
            <Route path="/generator" element={<GeneratorPage />} /> {/* Generator page */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;