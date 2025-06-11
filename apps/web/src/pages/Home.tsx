import { NavigationBar } from '@zygo/ui';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <NavigationBar className="bg-primary text-primary-foreground" />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-foreground">Welcome Home</h1>
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-muted-foreground">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Access your most used features</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-muted-foreground">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">View your latest updates</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2 text-muted-foreground">Settings</h3>
                <p className="text-sm text-muted-foreground">Customize your experience</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
