import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import {Outlet} from '@tanstack/react-router';
import {useState} from 'react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true); // Set to true

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <main className="flex-1">
            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
