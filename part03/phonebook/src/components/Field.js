

const Field = (props) => {
    return(
        <div>
            {props.label}: <input value={props.initialValue} onChange={props.handleChange}/>
        </div>
    )
}

export default Field