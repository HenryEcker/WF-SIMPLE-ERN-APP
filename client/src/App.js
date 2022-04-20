import './App.scss';
import {useEffect, useState} from "react";


const buildRow = ({id, name, number, description}) => {
    return (
        <tr data-row-id={id} key={id}>
            <td>{name}</td>
            <td>{number}</td>
            <td>{description}</td>
        </tr>
    );
}

const buildTable = data => {
    if (!data || data.length === 0) {
        return; // Render nothing if no data
    }
    return (
        <table className="data-table">
            <thead>
            <th>Name</th>
            <th>Number</th>
            <th>Description</th>
            </thead>
            <tbody>
            {data.map(buildRow)}
            </tbody>
        </table>
    )
};


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
            {buildTable(data)}
        </>
    );
};

export default App;
