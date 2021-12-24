import { useState } from 'react';
import DatePicker from "react-datepicker";
import './FilterRow.css';


function FilterLocationOptions() {

    const [title, setTitle] = useState('Select a location');

    return (
        <div className='filter-locations-options'>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {title}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => setTitle('Master Gardener')}>Master Gardener</li>
                    <li onClick={() => setTitle('Gardens')}>Gardens</li>
                    <li onClick={() => setTitle('Bank')}>Bank</li>
                    <li onClick={() => setTitle('Tavern')}>Tavern</li>
                    <li onClick={() => setTitle('Portal')}>Portal</li>
                    <li onClick={() => setTitle('Professions')}>Professions</li>
                    <li onClick={() => setTitle('Docks')}>Docks</li>
                    <li onClick={() => setTitle('Meditation Circle')}>Meditation Circle</li>
                </ul>
            </div>
        </div>
    )
}

export default FilterLocationOptions;
