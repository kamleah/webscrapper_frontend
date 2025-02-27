import { useState, useEffect } from 'react';

const usePaginatedData = (initialPageNo = 1, initialRecords = 10, filterFunction, filterObject) => {
    const [filterData, setFilterData] = useState([]);
    const [pageNo, setPageNo] = useState(initialPageNo);
    const [pageSize, setPageSize] = useState(initialRecords);
    const [nextIsValid, setNextIsValid] = useState(false);
    const [prevIsValid, setPrevIsValid] = useState(false);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = () => {
        if(filterObject){
            fetchData(filterObject);
        }else{
            fetchData({})
        }
    };

    const fetchData = async (filterObj = {}) => {
        const params = { page: pageNo, page_size:pageSize, ...filterObj };
        setPageNo(params.page);
        setPageSize(params.page_size);
        filterFunction(params).then((res) => {
            if (res?.next != null) {
                setNextIsValid(true);
            } else {
                setNextIsValid(false);
            }
            if (res?.previous != null) {
                setPrevIsValid(true);
            } else {
                setPrevIsValid(false);
            }
            setFilterData(res?.results);
        }).catch(err => {
            console.log("error: ", err);
        });
    };

    const pageChangeHandler = (localPageNo) => {
        if (((pageNo < localPageNo) && nextIsValid) || ((pageNo > localPageNo) && prevIsValid)) {
            fetchData({ ...filterObject, page: localPageNo});
        }
    };

    const recordChangeHandler = (page_size) => {
        setPageSize(page_size);
        setPageNo(1);
        fetchData({ ...filterObject, page: 1, page_size: page_size});
    };

    return {
        filterData,
        pageNo,
        pageSize,
        nextIsValid,
        prevIsValid,
        pageChangeHandler,
        recordChangeHandler,
        fetchData,
    };
};

export default usePaginatedData;