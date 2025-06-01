import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner } from '@zygo/ui/sonner';
import { Toaster } from '@zygo/ui/toaster';
import { TooltipProvider } from '@zygo/ui/tooltip';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
