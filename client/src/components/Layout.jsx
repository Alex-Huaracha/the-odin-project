import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-spotter-base flex justify-center">
      <div className="w-full max-w-7xl flex">
        {/* LEFT SIDEBAR (Navigation) */}
        <Navbar />

        {/* Feed */}
        <main className="flex-1 min-w-0 border-r border-spotter-border">
          {children}
        </main>

        {/* Widgets */}
        {/* Visible only on large screens (lg) */}
        <aside className="hidden lg:block w-[350px] pl-8 py-4 h-screen sticky top-0">
          <div className="bg-spotter-dark rounded-xl p-4 sticky top-4">
            <h2 className="font-bold text-xl mb-4">Who to follow</h2>
            {/* Suggestions will be fetched from the backend later */}
            <div className="text-spotter-textGray text-sm">
              Loading suggestions...
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
