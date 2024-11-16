import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter,createRoutesFromElements,RouterProvider, Route } from 'react-router-dom';
import Product from './components/product';
import DashBoard from './components/DashBoard';
import Cart from './components/cart';
import RootLayout from './components/RootLayout';

function App() {

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<DashBoard/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/products/:id' element={<Product/>}/>
    </Route>
  ))

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
