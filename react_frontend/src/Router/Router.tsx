import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import EventPage from "../components/pages/EventPage/EventPage";
import AdminPage from "../components/pages/AdminPage/AdminPage";
import MainPage from "../components/pages/MainPage";
import SingleUserPage from "../components/pages/SingleUserPage";
import EventCreatePage from "../components/pages/EventPage/EventCreatePage";
import authorities from "../config/Authorities";
import EventPageUser from "../components/pages/EventPage/EventPageUser";
import EventGuestDetail from "../components/pages/EventPage/EventGuestDetail";


const Router = () => {

    return (
        <Routes>
            {/*Not Private Paths*/}
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<LoginPage />} />

            {/*Private Paths*/}
            <Route
                path="/main"
                element={
                    <PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT}]} element={<MainPage />}></PrivateRoute>
                }
            />
            <Route
                path="/event"
                element={
                    <PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT}]} element={<EventPage />}></PrivateRoute>
                }
            />
            <Route
                path="/my-events/:ownerId"
                element={
                    <PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT}]} element={<EventPageUser />}></PrivateRoute>
                }
            />
            <Route
                path={"/event/add"}
                element={<PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT}]} element={<EventCreatePage />} />}
            />
            <Route 
                path="/event/edit/:eventId" 
                element={<PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT}]} element={<EventCreatePage />}></PrivateRoute>} />

            <Route 
                path="/event/guests/:eventId" 
                element={<PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT}]} element={<EventGuestDetail />}></PrivateRoute>} />

            <Route
                path={"/users"}
                element={<PrivateRoute authorities={[{id: authorities.ADMIN_MODIFY, name: authorities.ADMIN_MODIFY},{id: authorities.ADMIN_DELETE, name: authorities.ADMIN_DELETE}]} element={<UserTable />} />}
            />
            <Route
                path="/useredit"
                element={
                    <PrivateRoute authorities={[{id: authorities.ADMIN_MODIFY, name: authorities.ADMIN_MODIFY},{id: authorities.ADMIN_DELETE, name: authorities.ADMIN_DELETE}]} element={<UserPage />}></PrivateRoute>
                }
            />
            <Route
                path="/useredit/:userId"
                element={
                    <PrivateRoute authorities={[{id: authorities.ADMIN_MODIFY, name: authorities.ADMIN_MODIFY}]} element={<UserPage />}></PrivateRoute>
                }
            />
            <Route
                path="/account"
                element={
                    <PrivateRoute authorities={[{id: authorities.DEFAULT, name: authorities.DEFAULT},{id: authorities.ADMIN_READ, name: authorities.ADMIN_READ}]} element={<SingleUserPage />}></PrivateRoute>
                }
            />
            <Route
                path={"/admin"}
                element={<PrivateRoute authorities={[{id: authorities.ADMIN_MODIFY, name: authorities.ADMIN_MODIFY}]} element={<AdminPage />} />}
            />
            
            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
};

export default Router;