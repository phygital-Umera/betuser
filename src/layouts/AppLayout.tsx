import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import {useAuthContext} from '@/context/AuthContext';
import {Navigate, Outlet} from '@tanstack/react-router';
import {useState} from 'react';

const AppLayout = () => {
  const {isAuthenticated} = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
