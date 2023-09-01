import "./App.css"
import AdminJS from "./pages/Admin"
import Home from "./pages/Home"
import Products_Technologies from "./pages/Products_Technologies"
import Lab_Technologies from "./pages/Lab_Technologies"
import Technologylicensing from "./pages/Technologylicensing"
import Productize from "./pages/Productize"
import Startups from "./pages/Startups"
import Team from "./pages/Team"
import Technology_Catalogues from "./pages/Technology_Catalogues"
import Products from "./pages/Products"
import Catalogue from "./pages/Catalogue"
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SearchBar from './components/Searchbar';
import Navbar1 from "./components/Navbar"
import Navbar2 from "./components/Navbar2"
import AdminPatent from "./pages/AdminPatents"
import Patent from "./pages/Patents"
import Publications from "./pages/Publications"
import Randomtry from "./pages/use"
import Footbar from "./Footer/Footbar"
import AdminCatalogue from "./pages/AdminCatalogue"
import JobSeeker from "./pages/JobSeeker"
import Entrepreneur from "./pages/Entrepreneur"
import Industry from "./pages/Industry"

function App() {
    return (

        <div className="App" style={{ minWidth: "800px" }}>
            <Router>

                <Navbar1/>
                <Navbar2/> 
                 {/* <Footer/> */}
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/catalogue/admin" exact component={AdminCatalogue} />
                    <Route path="/catalogue" exact component={Catalogue} />
                    <Route path="/patents" exact component={Patent} />
                    <Route path="/publications" exact component={Publications} />
                    <Route path="/patents/admin" exact component={AdminPatent} />
                    <Route path="/try" exact component={Randomtry} />
                    <Route path="/Technologylicensing" component={Technologylicensing}/>
                    <Route path="/Productize" component={Productize} />
                    <Route path="/Startups" component={Startups} />
                    <Route path="/Products" component={Products} />
                    <Route path="/Technology_Catalogues" component={Technology_Catalogues} />
                    <Route path="/Products_Technologies/:LabName/:ProductName" component={Products_Technologies} />
                    <Route path="/Lab_Technologies/:LabName" component={Lab_Technologies} />
                    <Route path="/Team" component={Team} />
                    <Route path="/JobSeeker"component={JobSeeker} />
                    <Route path="/Industry"component={Industry} />
                    <Route path="/Entrepreneur"component={Entrepreneur} />
                    <Route path="/admin" component={AdminJS} />
                   
                    {/* <Route path="/chat" exact component={LoginPage} /> */}
                    {/* <Route path="/chathome" exact component={HomePage} /> */}

                    <h1>asDada</h1>
                </Switch>

                <Footbar/>

            </Router>

        </div>



    );
}
export default App;