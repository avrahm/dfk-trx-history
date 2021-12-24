import FilterDateOptions from "./FilterDateOptions";
import FilterLocationOptions from "./FilterLocationOptions";
import FilterRowButtons from "./FilterRowButtons";
import './FilterRow.css';

function FilterRow() {
    return (
        <div className="filter-row">
            <FilterDateOptions />
            <FilterLocationOptions />
            <FilterRowButtons />
        </div>
    )
}

export default FilterRow;
