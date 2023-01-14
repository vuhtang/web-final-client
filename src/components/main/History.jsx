import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import '../../style/main/table.css'
import {useDispatch} from "react-redux";
import {MyMessage} from "../util/MyMessage";
import {clear, fetchShots, setOffset} from "../../store/actions/actionsShots";
import {useShots} from "../../hooks/shots";


export function History() {

    const {shots, offset, pageSize, totalRecords, token} = useShots()

    const [empty, setEmpty] = useState(true)
    const [firstButtonDisabled, setFirstButtonDisabled] = useState(true)
    const [lastButtonDisabled, setLastButtonDisabled] = useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (offset === 0) {
            setFirstButtonDisabled(true)
            setPrevButtonDisabled(true)
        } else {
            setFirstButtonDisabled(false)
            setPrevButtonDisabled(false)
        }

        if ((offset + 1) * pageSize < totalRecords) {
            setNextButtonDisabled(false)
            setLastButtonDisabled(false)
        } else {
            setNextButtonDisabled(true)
            setLastButtonDisabled(true)
        }
    }, [offset, pageSize, totalRecords])

    function firstPageButtonOnClick() {
        dispatch(setOffset(0))
        dispatch(fetchShots(0, pageSize, token))
    }

    function lastPageButtonOnClick() {
        let lastPageOffset = totalRecords % pageSize === 0
            ? Math.trunc(totalRecords / pageSize) - 1
            : Math.trunc(totalRecords / pageSize)
        dispatch(setOffset(lastPageOffset))
        dispatch(fetchShots(lastPageOffset, pageSize, token))
    }

    function nextPageButtonOnClick() {
        dispatch(setOffset(offset + 1))
        dispatch(fetchShots(offset + 1, pageSize, token))
    }

    function prevPageButtonOnClick() {
        dispatch(setOffset(offset - 1))
        dispatch(fetchShots(offset - 1, pageSize, token))
    }

    const template = {
        layout: 'CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink',

        'FirstPageLink': () => {
            return (
                <button type="button" className={'paginator-buttons'} onClick={firstPageButtonOnClick}
                        disabled={firstButtonDisabled}>
                    <span className="p-3">First</span>
                </button>
            )
        },
        'PrevPageLink': () => {
            return (
                <button type="button" className={'paginator-buttons'} onClick={prevPageButtonOnClick}
                        disabled={prevButtonDisabled}>
                    <span className="p-3">Prev</span>
                </button>
            )
        },
        'NextPageLink': () => {
            return (
                <button type="button" className={'paginator-buttons'} onClick={nextPageButtonOnClick}
                        disabled={nextButtonDisabled}>
                    <span className="p-3">Next</span>
                </button>
            )
        },
        'LastPageLink': () => {
            return (
                <button type="button" className={'paginator-buttons'} onClick={lastPageButtonOnClick}
                        disabled={lastButtonDisabled}>
                    <span className="p-3">Last</span>
                </button>
            )
        }
    }


    useEffect(() => {
        if (shots.length !== 0) setEmpty(false)
        else setEmpty(true)
    }, [shots.length]);

    function submitHandler(event) {
        event.preventDefault()
        dispatch(clear(token))
    }


    return (
        <>
            <div className="panel-element">
                {empty && <MyMessage message={'Our storage is empty'} className={'message'}/>}
                {!empty && <DataTable value={shots} paginator responsiveLayout="scroll"
                                      paginatorTemplate={template} paginatorPosition="top"
                                      currentPageReportTemplate={`Showing ${offset * pageSize + 1} to ${offset * pageSize + shots.length} of ${totalRecords}`}
                                      rows={10}>
                    <Column field="id" header="Id"></Column>
                    <Column field="x" header="X"></Column>
                    <Column field="y" header="Y"></Column>
                    <Column field="r" header="R"></Column>
                    <Column field="result" header="Result"></Column>
                    <Column field="execTime" header="Execution time"></Column>
                    <Column field="currDate" header="Shot date"></Column>
                </DataTable>}
            </div>
            <div className="panel-element">
                <form onSubmit={submitHandler}>
                    <button type="submit">Clear history</button>
                </form>
            </div>
        </>
    )
}
