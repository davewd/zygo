import { Toaster as Sonner, Toaster, TooltipProvider } from '@zygo/ui';
import { RouterProvider } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { routes } from './routes';

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserAuthContextProvider>
        <RouterProvider router={routes} />
      </UserAuthContextProvider>
    </TooltipProvider>
  );
};

export default App;
