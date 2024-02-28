import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import Eventpage from "../components/pages/EventPage/EventPage";
import EventForm from "../components/molecules/UserForm/EventForm";
import AdminPage from "../components/pages/AdminPage/AdminPage";
import Authorities from "../config/Authorities";
import MainPage from "../components/pages/MainPage";
import SingleUserPage from "../components/pages/SingleUserPage";

const Router = () => {

    return (
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<LoginPage />} />

            <Route
                path={"/addevent"}
                element={<PrivateRoute authorities={[]} element={<EventForm />} />}
            />
            <Route
                path={"/adminpage"}
                element={<PrivateRoute authorities={[{ id: Authorities.ADMIN_READ, name: Authorities.ADMIN_READ }]} element={<AdminPage />} />}
            />
            <Route
                path={"/users"}
                element={<PrivateRoute authorities={[]} element={<UserTable />} />}
            />
            <Route
                path="/useredit"
                element={
                    <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
                }
            />
            <Route
                path="/main"
                element={
                    <PrivateRoute authorities={[]} element={<MainPage />}></PrivateRoute>
                }
            />
            <Route
                path="/account"
                element={
                    <PrivateRoute authorities={[]} element={<SingleUserPage />}></PrivateRoute>
                }
            />
            <Route
                path="/event"
                element={
                    <PrivateRoute authorities={[]} element={<Eventpage />}></PrivateRoute>
                }
            />
            <Route
                path="/editevent/:eventId" element={
                <PrivateRoute authorities={[]} element={<EventForm />}></PrivateRoute>} />


            <Route
                path="/useredit/:userId"
                element={
                    <PrivateRoute authorities={[]} element={<UserPage />}></PrivateRoute>
                }
            />

            <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
};

export default Router;