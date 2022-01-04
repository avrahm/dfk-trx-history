import FilterDateOptions from "./FilterDateOptions";
import FilterLocationOptions from "./FilterLocationOptions";
import FilterRowButtons from "./FilterRowButtons";
import './FilterRow.css';
import { useState } from "react";

function FilterRow({ setTransactions, transactions }) {

    const [filterOptions, setFilterOptions] = useState({
        dateSelection: 'Select Time Range',
        date: null,
        location: null
    });

    return (
        <div className="filter-row">
            <div className="container">
                <div className="row">
                    <FilterDateOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                    {/* <FilterLocationOptions filterOptions={filterOptions} setFilterOptions={setFilterOptions} /> */}
                    <FilterRowButtons filterOptions={filterOptions} setFilterOptions={setFilterOptions} setTransactions={setTransactions} transactions={transactions} />
                </div>
            </div>
        </div>
    )
}

export default FilterRow;
