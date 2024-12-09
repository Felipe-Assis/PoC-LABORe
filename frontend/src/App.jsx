import Body from "./components/Body";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Darkmode from 'darkmode-js';
import darkmodeOptions from "./utils/darkmode-options.js";

const darkmode = new Darkmode(darkmodeOptions);
darkmode.showWidget();

const App = () => {

    return (
        <div className="components-container">
            <Header />
            <Body />
        </div>
    );
}

export default App;