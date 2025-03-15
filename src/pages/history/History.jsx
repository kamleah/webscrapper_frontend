import React, { useEffect, useState } from "react";
import EditCreateButton from "../../components/Button/EditCreateButton";
import { ArrowDown, Eye, Trash } from "iconsax-react";
import SectionHeader from "../../components/Card/SectionHeader";
import Table from "../../components/Table/Table";
import ViewDetailsModal from "../../components/Modals/viewUserModal/viewUserModal";
import { setHistory } from "../../redux/historySlice/historySlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { ArrowDownToLine } from "lucide-react";
import usePaginatedData from "../../utils/usePaginatedData";
import ViewHistoryDetails from "../../components/Modals/viewHistoryDetails/viewHistoryDetails";
import Pagination from "../../components/pagination/pagination";
import { baseURL } from "../../constants";
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';
import { configurationEndPoints } from "../../endPoints/ConfigurationsEndPoint";
import PageLoader from "../../components/Loader/PageLoader";
import { exportToExcel } from "../../utils/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
    const dispatch = useDispatch();
    const [isViewHistoryModalOpen, setViewHistoryModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    const [open, setOpen] = useState(false);
    const [delId, setDelId] = useState(0);
    const [loading, setLoading] = useState(false);
     const { accessToken } = useSelector((state) => state.auth);

    const fetchHistory = async (params) => {
        const payload = {
            ...params,
            user_id: loggedUserDetails?.id
        };
        // const response = await axios.get(`${baseURL}scrap/user-scrap-filter/`, { params: payload });
        const response = await axios.get(configurationEndPoints.firecrawl_scrap_filter, { params: payload });
        console.log(response.data, "K><><MJIKM<>");
        return response.data;
    };

    const {
        filterData: history,
        pageNo,
        pageSize,
        totalPages,
        nextIsValid,
        prevIsValid,
        pageChangeHandler,
        fetchData,
    } = usePaginatedData(1, 10, fetchHistory);

    useEffect(() => {
        dispatch(setHistory(history));
    }, [history, dispatch]);


    const openViewHistoryModal = (history) => {
        setSelectedHistory(history);
        setViewHistoryModalOpen(true);
    };
    const closeViewHistoryModal = () => {
        setSelectedHistory(null);
        setViewHistoryModalOpen(false);
    };

    const deleteHistory = async (historyId) => {
        try {
            await axios.delete(`${configurationEndPoints.firecrawl_delete_delete_history}${historyId}/`);
            await fetchData({ page: pageNo, page_size: pageSize });
            const updatedHistory = await fetchHistory({
                page: pageNo,
                page_size: pageSize,
            });
            dispatch(setHistory(updatedHistory.results));
            toast.success("History deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.log("Error deleting history:", error);
            toast.error(error.response?.data?.message || "Failed to delete history.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    const deleteData = () => {
        deleteHistory(delId);
        setOpen(!open);
    };

    const toggleModalBtn = (id) => {
        try {
            setOpen(!open);
            setDelId(id);
        } catch (error) {
            console.log("error", error);
        }
    };

    const downloadInExcelV2 = (row) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            setLoading(true);
                 axios.get(`${configurationEndPoints.firecrawl_scrap_download}${row.id}/`,config)
                .then((response) => {
                    if (response.data && response.data.data) {
                        exportToExcel(response.data.data);
                        setLoading(false);
                        toast.success("Data downloaded successfully!");
                    } else {
                        throw new Error('No data received from the API.');
                    }
                })
                .catch((error) => {
                    console.error('API Error:', error);
                    toast.error(error.response?.data?.message || "Failed to download data.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error in downloadInExcelV2:', error);
            toast.error("An unexpected error occurred during download.", {
                position: "top-right",
                autoClose: 3000,
            });
            setLoading(false);
        }
    };

    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <button
                onClick={() => openViewHistoryModal(row)}
                id={row.id}
                className="bg-blue-100 px-1.5 py-2 rounded-sm"
            >
                <Eye size="20" className="text-blue-500" />
            </button>
            <button
                onClick={() => downloadInExcelV2(row)}
                id={row.id}
                className="bg-yellow-100 px-1.5 py-2 rounded-sm"
            >
                <ArrowDownToLine size="20" className="text-yellow-500" />
            </button>
            <button
                onClick={() => toggleModalBtn(row.id)}
                id={row.id}
                className="bg-red-100 px-1.5 py-2 rounded-sm">
                <Trash size="20" className="text-red-500" />
            </button>
        </div>
    );

    const columns = [
        {
            field: "urls",
            header: "Urls",
            body: (row) => (
                <div>
                    <h6>
                        {row?.urls
                            ? row.urls.length > 50
                                ? `${row.urls.substring(0, 50)}...`
                                : row.urls
                            : "--"}
                    </h6>
                    {row?.name?.length > 0 ? (
                        row.name.map((name, index) => (
                            <h6 key={index}>
                                {name.length > 50 ? `${name.substring(0, 50)}...` : name}
                                
                            </h6>
                        ))
                    ) : (
                        <h6>--</h6>
                    )}
                </div>
            ),
            style: { width: "20%" }
        },
        {
            field: "userInfo",
            header: "User Info",
            body: (row) => (
                <div>
                    <h6>{`${row?.user?.first_name || "--"} ${row?.user?.last_name || "--"}`}</h6>
                    <h6>{row?.user?.email || "--"}</h6>
                </div>
            ),
            style: { width: "40%" }
        },
        { field: "date", header: "Date", body: (row) => <h6>{(moment(row?.created_at).format('YYYY-MM-DD')) || "--"}</h6>, style: { width: "20%" } },
        { header: "Actions", body: (row) => actionBodyTemplate(row), style: { width: "40%" } },
    ];
    return (
        <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7">
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <SectionHeader title="History" />
            </div>
            <Table data={history} columns={columns} />
            <Pagination currentPage={pageNo} totalPages={totalPages} onPageChange={pageChangeHandler} />
            <ViewHistoryDetails isOpen={isViewHistoryModalOpen}
                toggle={closeViewHistoryModal}
                title="History Details"
                data={selectedHistory} />

            <DeleteModal
                title="Delete History"
                deleteBtn={deleteData}
                toggleModalBtn={toggleModalBtn}
                description={
                    "Are you sure you want to delete this scrap history."
                }
                open={open}
            />
            {loading && <PageLoader />}
          
        </div>
    );
};
export default History;