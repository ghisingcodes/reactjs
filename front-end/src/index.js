import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Link, Outlet, createRootRoute, createRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from "@tanstack/router-devtools";     


const rootRoute = createRootRoute({
  component: ()=> (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&:active]:font-bold">Home</Link>{" "}
        <Link to="/about" className="[&:active]:font-bold">About</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
});

const indexRoute = createRoute({
  getParentRoute: ()=> rootRoute,
  path:"/",
  component:function Index(){
    return (
      <div className='p-2'>
        <h3>Welcome Home</h3>
      </div>
    )
  },
});

const aboutRoute = createRoute({
  getParentRoute: ()=> rootRoute,
  path:"/about",
  component:function About(){
    return (
      <div className="p-2">Hello From About</div>
    )
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
