import {useSelector} from "react-redux";

export function useFetchParams() {

    const offset = useSelector(state => state.shot.offset)
    const pageSize = useSelector(state => state.shot.pageSize)
    const token = useSelector(state => state.auth.token)
    const totalRecords = useSelector(state => state.shot.totalRecords)

    return {offset, pageSize, token, totalRecords}
}