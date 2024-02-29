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

const Router = () => {

    return (
        <Routes>
            {/*Not Private Paths*/}
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<LoginPage />} />

            {/*Private Paths*/}
            <Route
                path={"/addevent"}
                element={<PrivateRoute authorities={[]} element={<EventCreatePage />} />}
            />
            <Route
                path={"/admin"}
                element={<PrivateRoute authorities={[]} element={<AdminPage />} />}
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
                    <PrivateRoute authorities={[]} element={<EventPage />}></PrivateRoute>
                }
            />
            <Route
                path="/editevent/:eventId" element={
                <PrivateRoute authorities={[]} element={<EventCreatePage />}></PrivateRoute>} />


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