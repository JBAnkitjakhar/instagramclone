 


// // MainLayout.jsx
// import { Outlet } from 'react-router-dom'
// import LeftSidebar from './LeftSidebar'
// import RightSidebar from './RightSidebar'
// import { useState } from 'react';
// import { Menu, X } from 'lucide-react';

// const MainLayout = () => {
//   const [showRightSidebar, setShowRightSidebar] = useState(false);
//   return (
//     <div className="flex min-h-screen">
//       <LeftSidebar />
//       <main className="flex-grow px-4 py-8 md:px-8 lg:px-12">
//         <Outlet />
//       </main>
//       <button 
//         className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md"
//         onClick={() => setShowRightSidebar(!showRightSidebar)}
//       >
//         {showRightSidebar ? <X size={24} /> : <Menu size={24} />}
//       </button>
//       <div className={`${showRightSidebar ? 'block' : 'hidden'} lg:block w-80 fixed right-0 top-0 h-full bg-white overflow-y-auto transition-transform duration-300 ease-in-out ${showRightSidebar ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`}>
//         <RightSidebar />
//       </div>
//     </div>
//   )
// }

// export default MainLayout