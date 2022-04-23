import "./App.scss";
import {useEffect, useState} from "react";
import DataTable from "./components/data-table/DataTable";
import {DataItem} from "./Types";

/**
 * @summary fetches data from the api and updates the data in App
 * @param setData mutator function to update data
 */
const pullDownData = (setData: React.Dispatch<React.SetStateAction<DataItem[]>>): void => {
    // Fetch (append date to avoid any caching issues)
    fetch(`/api/data?${new Date().getTime()}`)
        .then((res: Response) => res.json()) // Resolve JSON
        .then((resData: DataItem[]) => setData(resData)) // update the data value with the new information
        .catch((err: PromiseRejectionEvent) => {
            // On Error (like Status 500) just log to console
            console.error(err);
        });
}

const App = (): JSX.Element => {
    const [data, setData] = useState<DataItem[]>([]);
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

