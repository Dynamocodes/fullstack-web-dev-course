import { useDispatch, useSelector } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {

  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const handleFilterChange = (event) => {
    dispatch(updateFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return(
    <div style={style}>
      filter <input name='filter' onChange={handleFilterChange} value={filter}/>
    </div>
  )
}

export default Filter