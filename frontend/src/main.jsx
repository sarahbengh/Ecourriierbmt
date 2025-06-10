
import './disableDevTools.js';  
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


import LoginPage from './Pages/LoginPage.jsx';

// sidebar
import UserDashboard from './Pages/UserDashboard.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import EnregistrerUnCourrier from "./Pages/EnregistrerUnCourrier.jsx"
import EnregistrerUnCourrierUser from "./Pages/EnregistrerUnCourrierUser.jsx"
import TraiterUCourrier from "./Pages/TraiterUCourrier.jsx"
import CourriersArrives from './Pages/CourriersArrives.jsx';
import CourriersArrivesUser from './Pages/CourriersArrivesUser.jsx';
import CourriersDepart from './Pages/CourriersDepart.jsx';
import CourriersDepartUser from './Pages/CourriersDepart.jsx';
import Settings from './Pages/Settings.jsx';
import Notifications from './Pages/Settings.jsx';


import AjouterUser from './Pages/AjouterUser.jsx';
import ListeUsers from './Pages/ListeUsers.jsx';
import ListeContacts from './Pages/ListeContacts.jsx';
import AjouterContact from './Pages/AjouterContact.jsx';
import Myprofile from './Pages/Myprofile.jsx';
import Myaccount from './Pages/Myaccount.jsx';
import Contacts from './Pages/Contacts.jsx';
import UpdateContact from './Pages/UpdateContact.jsx';



import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {

    path: "/",
    element: <App />,
  },
 
  {
    path: "/LoginPage",
    element: <LoginPage/>,
  },

  //sidebar
 
  {
    path: "/AdminDashboard",
    element: <AdminDashboard/>,
  },
  {
    path: "/Settings",
    element: <Settings/>,
  },
  {
    path: "/Notifications",
    element: <Notifications/>,
  },
  {
    path: "/EnregistrerUnCourrier",
    element: <EnregistrerUnCourrier/>,
  },
  {
    path: "/EnregistrerUnCourrierUser",
    element: <EnregistrerUnCourrierUser/>,
  },
  {
    path: "/TraiterUCourrier",
    element: <TraiterUCourrier/>,
  },
  {
    path: "/CourriersArrives",
    element: <CourriersArrives/>,
  },
  {
    path: "/CourriersArrivesUser",
    element: <CourriersArrivesUser/>,
  },
  {
    path: "/CourriersDepart",
    element: <CourriersDepart/>,
  },
  {
    path: "/CourriersDepartUser",
    element: <CourriersDepartUser/>,
  },


  {
    path: "/AjouterUser",
    element: <AjouterUser/>,
  },

  {
    path: "/ListeContacts",
    element: <ListeContacts/>,
  },
  {
    path: "/ListeUsers",
    element: <ListeUsers/>,
  },
  {
    path: "/AjouterContact",
    element: <AjouterContact/>,
  },
  {
    path: "/Myprofile",
    element: <Myprofile/>,
  },
  {
    path: "/Myaccount",
    element: <Myaccount/>,
  },
  {
    path: "/Contacts",
    element: <Contacts/>,
  },
  {

    path: "/UpdateContact/:id",
    element: <UpdateContact/>,
  },
  {

    path: "/user/UserDashboard",
    element: <UserDashboard />,
  },








]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);
