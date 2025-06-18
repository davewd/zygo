import { NavigationBar, Toaster as Sonner, Toaster, TooltipProvider } from '@zygo/ui';
import { RouterProvider } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { routes } from './routes';

const App = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    return ['a', 'b', 'c'].filter((item) => item.includes(query));
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UserAuthContextProvider>
        <NavigationBar
          className="bg-primary text-primary-foreground"
          onSearch={handleSearch}
          searchPlaceholder="Search Zygo..."
        />
        <RouterProvider router={routes} />
      </UserAuthContextProvider>
    </TooltipProvider>
  );
};

export default App;
