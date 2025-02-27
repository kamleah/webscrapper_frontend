import React, { useEffect, useState } from "react";
import EditCreateButton from "../../components/Button/EditCreateButton";
import { Eye, Trash } from "iconsax-react";
import SectionHeader from "../../components/Card/SectionHeader";
import Table from "../../components/Table/Table";
import ViewDetailsModal from "../../components/Modals/viewUserModal/viewUserModal";
import { setHistory } from "../../redux/historySlice/historySlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const History = () => {
    const dispatch = useDispatch();
    const history = useSelector((state) => state.history.history);
    const historyFields = [
        { label: "Email", key: "user.email" },
        { label: "First Name", key: "user.first_name" },
        { label: "Last Name", key: "user.last_name" },
        { label: "Role", key: "user.user_role.name" },
        { label: "Urls" , key:"urls"},
        { label: "search Keywords" , key:"search_keywords"},
    ];

    const [isViewHistoryModalOpen, setViewHistoryModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    useEffect(() => {
        const historyList = async () => {
            try {
                const response = await axios.get("http://192.168.0.181:8000/scrap/user-scrap-filter/?page=1&page_size=10")
                 dispatch(setHistory(response.data.results));
                 console.log("response", response.data.results);
            } catch (error) {
                console.log("Error fetching history:", error);
            }
        }
        historyList()
    }, [dispatch])

    const openViewHistoryModal = (history) => {
        setSelectedHistory(history);
        setViewHistoryModalOpen(true);
    };
    const closeViewHistoryModal = () => {
        setSelectedHistory(null);
        setViewHistoryModalOpen(false);
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
                onClick={() => handleDelete(row.id)}
                id={row.id}
                className="bg-red-100 px-1.5 py-2 rounded-sm"
            >
                <Trash size="20" className="text-red-500" />
            </button>
        </div>
    );

    const handleDelete = (id) => {
        console.log("Delete user with ID:", id);
        setData((prevData) => prevData.filter((user) => user.id !== id));
    };
   
    const columns = [
        { field: "first_name", header: "First Name", body: (row) => <h6>{row?.user?.first_name || "--"}</h6>, style: { width: "20%" } },
        { field: "last_name", header: "Last Name", body: (row) => <h6>{row?.user?.last_name || "--"}</h6>, style: { width: "20%" } },
        { field: "email", header: "Email", body: (row) => <h6>{row?.user?.email || "--"}</h6>, style: { width: "20%" } },
        { 
            field: "search_keywords", 
            header: "Search Keywords", 
            body: (row) => (
                <h6>
                    {row?.search_keywords && row.search_keywords.length > 0 
                        ? row.search_keywords[0].length > 30 
                        ? `${row.search_keywords[0].substring(0, 30)}...` 
                        : row.search_keywords[0] 
                        : "--"}
                </h6>
            ), 
            style: { width: "20%" } 
        },
        { 
            field: "urls", 
            header: "Urls", 
            body: (row) => (
                <h6>
                    {row?.urls && row.urls.length > 0 
                        ? row.urls[0].length > 50 
                        ? `${row.urls[0].substring(0, 50)}...` 
                        : row.urls[0] 
                        : "--"}
                </h6>
            ), 
            style: { width: "20%" } 
        },
        { header: "Actions", body: (row) => actionBodyTemplate(row), style: { width: "40%" } },
    ];
    return (
        <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7">
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <SectionHeader title="History" />
            </div>
            <Table data={history} columns={columns} />

            <ViewDetailsModal
                isOpen={isViewHistoryModalOpen}
                toggle={closeViewHistoryModal}
                title="History Details"
                fields={historyFields}
                data={selectedHistory}
            />

        </div>
    );
};
export default History;
