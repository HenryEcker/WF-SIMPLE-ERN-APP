import {DataItem} from "../../Types";
import "./DataTable.scss";

type DataTableRowTheme = "alert" | "warning" | "okay";

/**
 * @summary Determine which CSS class to apply to the table row based on `number`
 *
 * @param {number} number A numeric value
 * @returns {DataTableRowTheme} CSS class based on the value parameter
 */
const chooseTheme = (number: number): DataTableRowTheme => {
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
 */
const Row = (props: DataItem): JSX.Element => {
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
 */
const DataTable = (props: { data: DataItem[] }): JSX.Element | null => {
    if (props.data.length === 0) {
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
            {props.data.map((rowData) => <Row key={rowData["id"]} {...rowData}/>)}
            </tbody>
        </table>
    )
};

export default DataTable;