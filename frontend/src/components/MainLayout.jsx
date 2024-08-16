import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div>
         <LeftSidebar/>
        <div>
            <Outlet/>
            
        </div>
    </div>
  )
}
//if we not use outlet then children is not execute
export default MainLayout