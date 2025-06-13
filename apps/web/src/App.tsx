import { NavigationBar, Toaster as Sonner, Toaster, TooltipProvider } from '@zygo/ui';
import { RouterProvider } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { routes } from './routes';
const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <UserAuthContextProvider>
      <NavigationBar className="bg-primary text-primary-foreground" />
      <RouterProvider router={routes} />
    </UserAuthContextProvider>
  </TooltipProvider>
);

export default App;
