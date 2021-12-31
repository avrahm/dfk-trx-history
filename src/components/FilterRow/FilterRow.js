import FilterDateOptions from "./FilterDateOptions";
import FilterLocationOptions from "./FilterLocationOptions";
import FilterRowButtons from "./FilterRowButtons";
import './FilterRow.css';

function FilterRow() {
    return (
        <div className="filter-row">
            <div className="container">
                <div className="row">
                    <FilterDateOptions />
                    <FilterLocationOptions />
                    <FilterRowButtons />
                </div>
            </div>
        </div>
    )
}

export default FilterRow;
