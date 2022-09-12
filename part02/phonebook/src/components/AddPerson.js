import Field from './Field'

const AddPerson = (props) => {
    return(
        <form onSubmit={props.form.onSubmit}>
            <div>
                {props.form.fields.map((field) => <Field key={field.id} label={field.label} initialValue={field.initialValue} handleChange={field.handleChange}/>)}
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPerson