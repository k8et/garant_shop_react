import {Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/ui/header";
import Footer from "./components/ui/Footer";
import Delivery from "./pages/delivery/page";
import Finish from "./pages/finish/page";

function App() {
    return (
        <div className={"app"}>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/delivery"} element={<Delivery/>}/>
                <Route path={"/finish"} element={<Finish/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
