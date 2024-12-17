import NavBar from './NavBarPanal'
import { Outlet } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store/Store';

const RootLayout = () => {
    return (
        <>
         <Provider store={store}>
          <NavBar/>

          <main>
            <Outlet/>
          </main>
         </Provider>
        </>
    )
}

export default RootLayout;