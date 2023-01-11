import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export function useShots() {

    const shots = useSelector(state => state.shot.shots)
    const pageSize = useSelector(state => state.shot.pageSize)
    const offset = useSelector(state => state.shot.offset)
    const totalRecords = useSelector(state => state.shot.totalRecords)
    const [pageSizeIsExhausted, setPageSizeIsExhausted] = useState(false)
    const [lastPageOffset, setLastPageOffset] = useState(0)

    useEffect(() => {
        if (totalRecords > pageSize) {
            let value = totalRecords % pageSize === 0
                ? Math.trunc(totalRecords / pageSize) - 1
                : Math.trunc(totalRecords / pageSize)
            setLastPageOffset(value)
        } else {
            setLastPageOffset(0)
        }
    }, [pageSize, totalRecords])

    useEffect(() => {
        if (shots.length === pageSize) {
            setPageSizeIsExhausted(true)
        } else {
            setPageSizeIsExhausted(false)
        }
    }, [pageSize, shots, offset])

    return {shots, pageSizeIsExhausted, offset, pageSize, totalRecords, lastPageOffset}
}