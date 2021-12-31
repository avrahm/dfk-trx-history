import './FilterRow.css';

function FilterRowButtons() {

    function click(button) {
        alert(button);
    }

    return (

        <div className="filter-row-buttons col">
            <button className="btn btn-success" onClick={() => click('Apply')}>Apply</button>

            <button className="btn btn-secondary" onClick={() => click('Reset')}>Reset</button>

            <button className="btn btn-warning" onClick={() => click('Download')}>Download</button>
        </div>
    )
}

export default FilterRowButtons;
