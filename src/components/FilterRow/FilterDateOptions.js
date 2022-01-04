import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import './FilterRow.css';
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateRange = ({ filterOptions, setFilterOptions }) => {


    const startDate = filterOptions.date ? filterOptions.date.startDate : '';
    const endDate = filterOptions.date ? filterOptions.date.endDate : '';

    return (
        <div className='filter-date-range col'>
            <div className='row'>
                Start
                <DatePicker selected={startDate} onChange={(date) => setFilterOptions({
                    ...filterOptions, date: {
                        ...filterOptions.date, startDate: date
                    }
                })} />
            </div><div className='row'>
                End
                <DatePicker selected={endDate} onChange={(date) => setFilterOptions({
                    ...filterOptions, date: {
                        ...filterOptions.date, endDate: date
                    }
                })} />
            </div>
        </div>
    );
};

function FilterDateOptions({ filterOptions, setFilterOptions }) {

    const [title, setTitle] = useState(filterOptions.dateSelection || 'Select Time Range');

    function selectDateDropdown(selection) {
        switch (selection) {
            case 'All':
                setFilterOptions({ ...filterOptions, dateSelection: 'All', date: null });
                setTitle(selection);
                break;
            case 'Custom':
                setFilterOptions({ ...filterOptions, dateSelection: 'Custom', date: null });
                setTitle(selection);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setTitle(filterOptions.dateSelection || 'Select Time Range');
    }, [filterOptions.dateSelection]);

    return (
        <div className='filter-date-options col'>
            <div className="dropdown">

                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {title}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => selectDateDropdown('All')}>All</li>
                    {/* <li onClick={() => setTitle('3 Months')}>3 Months</li>
                    <li onClick={() => setTitle('6 Months')}>6 Months</li> */}
                    <li onClick={() => selectDateDropdown('Custom')}>Custom</li>
                </ul>

            </div>
            {
                title === 'Custom' && (
                    <div className='col'>
                        <DateRange filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                    </div>
                )
            }
        </div>
    )
}

export default FilterDateOptions
