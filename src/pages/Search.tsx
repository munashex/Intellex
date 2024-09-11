import { useParams } from "react-router-dom" 

const Search = () => {
const {id} = useParams<{id: string}>()
    return (
        <div>
          {id}
        </div>
    )
}

export default Search