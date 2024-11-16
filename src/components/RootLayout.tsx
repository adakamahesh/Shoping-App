import NavBar from './NavBarPanal'
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
          <NavBar/>

          <main>
            <Outlet/>
          </main>
        </>
    )
}

export default RootLayout;