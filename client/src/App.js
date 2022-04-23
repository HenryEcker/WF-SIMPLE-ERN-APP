import "./App.scss";
import {useEffect, useState} from "react";
import DataTable from "./components/data-table/DataTable";


/**
 * @summary fetches data from the api and updates the data in App
 * @param setData mutator function to update data
 */
const pullDownData = (setData) => {
    // Fetch (append date to avoid any caching issues)
    fetch(`/api/data?${new Date().getTime()}`)
        .then(res => res.json()) // Resolve JSON
        .then(resData => setData(resData)); // update the data value with the new information
};

const App = () => {
    const [data, setData] = useState([]);
    const pollRate = 60; // How frequently to fetch new data (in seconds)

    useEffect(() => {
        pullDownData(setData); // Pull down immediately
        // Start interval to pullDown at set interval
        window.setInterval(() => pullDownData(setData), pollRate * 1000);
    }, []);

    return (
        <>
            <h1>Some Summary Data</h1>
            <DataTable data={data}/>
        </>
    );
};

export default App;
