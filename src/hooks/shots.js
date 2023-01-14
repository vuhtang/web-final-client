import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useFetchParams} from "./fetchParams";


export function useShots() {


    const {offset, pageSize, token, totalRecords} = useFetchParams()
    const shots = useSelector(state => state.shot.shots)
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

    return {shots, pageSizeIsExhausted, offset, pageSize, totalRecords, lastPageOffset, token}
}