

const Filter = (props) => {
    return(
        <div>
            filter shown with <input value={props.filterValue} onChange={props.handleFilterChange}/>
        </div>
    )
}

export default Filter