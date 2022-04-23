import "./App.scss";
import {useEffect, useState} from "react";

/**
 * @summary Determine which CSS class to apply to the table row based on `number`
 *
 * @param {number} number A numeric value
 * @returns {"alert" | "warning" | "okay"} CSS class based on the value parameter
 */
const chooseTheme = number => {
    if (number > 50) {
        return "alert";
    } else if (number > 25) {
        return "warning";
    } else {
        return "okay";
    }
}

/**
 * @summary Unpacks each object from data and produces a tr
 * @returns {JSX.Element}
 */
const Row = props => {
    const {id, name, number, description} = props;
    return (
        <tr data-row-id={id} className={chooseTheme(number)}>
            <td>{name}</td>
            <td>{number}</td>
            <td>{description}</td>
        </tr>
    );
}
/**
 * @summary Display the data. Return nothing if there is no data, or returns a populated Table with the values
 * @returns {JSX.Element | null}
 */
const Table = props => {
    if (!props.data || props.data.length === 0) {
        return null; // Render nothing if no data
    }
    return (
        <table className="data-table">
            <thead>
            <th>Name</th>
            <th>Number</th>
            <th>Description</th>
            </thead>
            <tbody>
            {props.data.map(rowData => <Row key={rowData["id"]} {...rowData}/>)}
            </tbody>
        </table>
    )
};


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
            <Table data={data}/>
        </>
    );
};

export default App;
