import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Outlet } from '@tanstack/react-router';
import { useState, useEffect } from 'react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get dynamic padding for content
  const getContentPadding = () => {
    if (isMobile) return 'p-3';
    if (isCollapsed) return 'p-4 md:p-5';
    return 'p-4 md:p-6 lg:p-8';
  };

  // Get margin left
  const getMarginLeft = () => {
    if (isMobile) return 'ml-0';
    if (isCollapsed) return 'ml-20';
    return 'ml-64';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          onCollapseChange={setIsCollapsed}
        />
        
        <div className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ${getMarginLeft()}`}>
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <main className="flex-1">
            <div className={getContentPadding()}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;