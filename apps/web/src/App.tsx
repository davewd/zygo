import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner, Toaster, TooltipProvider } from '@zygo/ui';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
