import moment from 'moment';
import { useState } from 'react';
import './FilterRow.css';

function FilterRowButtons({ filterOptions, setFilterOptions, setTransactions, transactions }) {

    function click(button) {
        alert(button);
    }

    const [allTransactions, setAllTransactions] = useState(transactions);

    function applyFilter() {
        const copyTransactions = [...allTransactions];
        if (filterOptions.date) {
            const startDateFilter = moment(filterOptions.date.startDate).unix();
            const endDateFilter = moment(filterOptions.date.endDate).unix();
            const getFilteredTransactions = copyTransactions.filter(transaction => {
                console.log(startDateFilter, transaction.timestamp, endDateFilter);
                if (filterOptions.date) {
                    return transaction.timestamp >= moment(filterOptions.date.startDate).unix() && transaction.timestamp <= moment(filterOptions.date.endDate).unix();
                }
                return true;
            })
            console.log(getFilteredTransactions);
            setTransactions(getFilteredTransactions);
        }
        else {
            setTransactions(allTransactions);
        }
    }

    function resetFilters() {
        setFilterOptions({
            ...filterOptions,
            dateSelection: 'Select Time Range',
            date: null
        });
        setTransactions(allTransactions);
    }

    return (

        <div className="filter-row-buttons col">
            <button className="btn btn-success" onClick={() => applyFilter()}>Apply</button>

            <button className="btn btn-secondary" onClick={() => resetFilters()}>Reset</button>

            <button className="btn btn-warning" onClick={() => click('Coming Soon')}>Download</button>
        </div>
    )
}

export default FilterRowButtons;
