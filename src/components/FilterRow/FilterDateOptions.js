import { useState } from 'react';
import DatePicker from "react-datepicker";
import './FilterRow.css';
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateRange = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <div className='filter-date-range'>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
    );
};

function FilterDateOptions() {

    const [title, setTitle] = useState('Select an option');

    return (
        <div className='filter-date-options'>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {title}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => setTitle('All')}>All</li>
                    <li onClick={() => setTitle('3-Months')}>3 Months</li>
                    <li onClick={() => setTitle('6-Months')}>6 Months</li>
                    <li onClick={() => setTitle('Custom')}>Custom</li>
                </ul>
            </div>
            {title === 'Custom' && <DateRange />}
        </div>
    )
}

export default FilterDateOptions
