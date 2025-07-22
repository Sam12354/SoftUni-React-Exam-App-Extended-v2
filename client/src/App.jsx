import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import EditProduct from "./components/edit-product/EditProduct"
import Details from "./components/details/Details"
import PersonalCatalog from "./components/personal-catalog/PersonalCatalog"
import { Routes, Route } from 'react-router-dom'
import Catalog from "./components/catalog/Catalog"
import Sell from "./components/Sell/Sell"
import { AuthContextProvider } from "./contexts/AuthContext"
import RouteGuard from "./components/common/RouteGuard"
import Logout from "./components/logout/Logout"
import GuestGuard from "./components/common/GuestGuard"
import NotFound from "./components/page-404/NotFound"
import ChangePassword from "./components/repassword/Repass";
import LiveChat from './components/LiveChat/LiveChat';
import ChatGuard from './components/common/ChatGuard'


function App() {

    return (
        <AuthContextProvider>
            <div id="page-top">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<GuestGuard> <Login /> </GuestGuard>} />
                    <Route path="/register" element={<GuestGuard> <Register /> </GuestGuard>} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/logout" element={<RouteGuard> <Logout /> </RouteGuard>} />
                    <Route path="/create" element={<RouteGuard> <Sell /> </RouteGuard>} />
                    <Route path="/personalCatalog" element={<RouteGuard> <PersonalCatalog /> </RouteGuard>} />
                    <Route path="/:itemId/edit" element={<RouteGuard> <EditProduct /> </RouteGuard>} />
                    <Route path="/change-password" element={<RouteGuard><ChangePassword /></RouteGuard>} />
                    <Route path="/:itemId" element={<Details />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatGuard>
                    <LiveChat />
                </ChatGuard>
            </div>
        </AuthContextProvider>
    )
}

export default App