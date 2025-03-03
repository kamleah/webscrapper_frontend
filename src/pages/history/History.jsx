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

const History = () => {
    const dispatch = useDispatch();
    const [isViewHistoryModalOpen, setViewHistoryModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    const [open, setOpen] = useState(false);
    const [delId, setDelId] = useState(0);


    const fetchHistory = async (params) => {
        const payload = {
            ...params,
            user_id: loggedUserDetails?.id
        };
        const response = await axios.get(`${baseURL}scrap/user-scrap-filter/`, { params: payload });
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

    const deleteHistory = (historyId) => {
        try {
            axios.delete(`${configurationEndPoints.delete_history}${historyId}/`).then(async (response) => {
                const updatedHistory = await fetchHistory({
                    "page": pageNo,
                    "page_size": pageSize,
                });
                dispatch(setHistory(updatedHistory.results));
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
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

    // const getUniqueKeys = (arr) => {
    //     const keysSet = new Set();

    //     arr.forEach(obj => {
    //         Object.keys(obj).forEach(key => keysSet.add(key));
    //     });

    //     return Array.from(keysSet);
    // };

    const getUniqueKeysWithLanguage = (rowData) => {
        const keysSet = new Set();

        rowData.forEach(item => {
            const languagePrefix = item.language.toLowerCase(); // Convert to lowercase for consistency
            Object.keys(item.content_json).forEach(key => {
                keysSet.add(`${languagePrefix}_${key}`); // Prefix keys with language
            });
        });

        return Array.from(keysSet);
    };

    const generateCSVFile = (headers, rowData) => {
        let csvContent = headers.join(",") + "\n"; // Add header row

        rowData.forEach(historyData => {
            const row = headers.map(header => {
                let value = historyData[header] || ""; // Get value or empty string if undefined
                return Array.isArray(value) ? `"${value.join("; ")}"` : `"${value}"`; // Handle arrays properly
            });
            csvContent += row.join(",") + "\n"; // Add row data
        });

        return csvContent;
    };

    // const transformDataForCSV_1 = (rowData, headers) => {
    //     return rowData.map(item => {
    //         const transformedItem = {};
    //         const languagePrefix = item.language.toLowerCase();
    
    //         if (item.content_json && Object.keys(item.content_json).length > 0) {
    //             Object.keys(item.content_json).forEach(key => {
    //                 console.log("item.content_json[key]", item.content_json[key]);
    //                 transformedItem[`${languagePrefix}_${key}`] = item.content_json[key];
    //             });
    //         }
    
    //         return transformedItem; // Ensure an object is returned for each item
    //     }).filter(item => Object.keys(item).length > 0); // Remove empty objects
    // };

    // const transformDataForCSV_2 = (rowData, headers) => {
    //     return rowData.map(item => {
    //         const transformedItem = {};
    //         const languagePrefix = item.language.toLowerCase();
        
    //         if (item.content_json && Object.keys(item.content_json).length > 0) {
    //             Object.keys(item.content_json).forEach(key => {
    //                 let value = item.content_json[key];
    
    //                 // Handle arrays by joining them with a comma
    //                 if (Array.isArray(value)) {
    //                     value = value.map(v => 
    //                         typeof v === "object" ? JSON.stringify(v) : v
    //                     ).join(", ");
    //                 }
    
    //                 // Handle objects by converting them into key-value pairs
    //                 else if (typeof value === "object" && value !== null) {
    //                     value = Object.entries(value)
    //                         .map(([objKey, objValue]) => `${objKey}: ${objValue}`)
    //                         .join(" | ");
    //                 }
    
    //                 transformedItem[`${languagePrefix}_${key}`] = value;
    //             });
    //         }
    
    //         return transformedItem; // Ensure an object is returned for each item
    //     }).filter(item => Object.keys(item).length > 0); // Remove empty objects
    // };

    const transformDataForCSV = (rowData) => {
        const transformedItem = {}; // Single row object
    
        rowData.forEach(item => {
            const languagePrefix = item.language.toLowerCase();
            
            if (item.content_json && Object.keys(item.content_json).length > 0) {
                Object.keys(item.content_json).forEach(key => {
                    let value = item.content_json[key];
    
                    // Handle arrays by joining them with a comma
                    if (Array.isArray(value)) {
                        value = value.map(v => 
                            typeof v === "object" ? JSON.stringify(v) : v
                        ).join(", ");
                    }
    
                    // Handle objects by converting them into key-value pairs
                    else if (typeof value === "object" && value !== null) {
                        value = Object.entries(value)
                            .map(([objKey, objValue]) => `${objKey}: ${objValue}`)
                            .join(" | ");
                    }
    
                    // Store in the single row object
                    transformedItem[`${languagePrefix}_${key}`] = value;
                });
            }
        });
    
        return [transformedItem]; // Return as an array containing a single object (one row)
    };
    

    const downloadCSV = (csvContent, filename) => {
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // const downloadInExcel = (rowData) => {
    //     try {
    //         if (rowData.user_scrap_history.length > 0) {
    //             if (Object.keys(rowData.user_scrap_history[0].content_json).length === 0) {
    //                 alert("Scrapped JSON is not generated");
    //             } else {
    //                 const contentJsonArray = rowData.user_scrap_history.map(item => item.content_json);
    //                 const headers = getUniqueKeys(contentJsonArray);
    //                 let csvData = headers.join(",") + "\n"; // CSV headers

    //                 rowData.user_scrap_history.forEach(historyData => {
    //                     if (Object.keys(historyData.content_json).length > 0) {
    //                         console.log(historyData.language);
    //                         console.log(historyData.name);
    //                         console.log(historyData.content_json);

    //                         const data = generateCSVFile(headers, historyData.language, historyData.name, historyData.content_json);
    //                         csvData += data;
    //                     }
    //                 });

    //                 downloadCSV(csvData, "Scrapped_Data.csv");
    //             }
    //         } else {
    //             alert("Scrapped JSON is not generated");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const downloadInExcel = (rowData) => {
        try {
            if (rowData.user_scrap_history.length > 0) {
                if (Object.keys(rowData.user_scrap_history[0].content_json).length === 0) {
                    alert("Scrapped JSON is not generated");
                } else {
                    const headers = getUniqueKeysWithLanguage(rowData.user_scrap_history);
                    const transformedData = transformDataForCSV(rowData.user_scrap_history, headers);
                    console.log(transformedData);


                    const csvData = generateCSVFile(headers, transformedData);
                    downloadCSV(csvData, "Scrapped_Data.csv");
                }
            } else {
                alert("Scrapped JSON is not generated");
            }
        } catch (error) {
            console.log(error);
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
                onClick={() => downloadInExcel(row)}
                id={row.id}
                className="bg-yellow-100 px-1.5 py-2 rounded-sm"
            >
                <ArrowDownToLine size="20" className="text-yellow-500" />
            </button>
            {/* <button
                onClick={() => toggleModalBtn(row.id)}
                id={row.id}
                className="bg-red-100 px-1.5 py-2 rounded-sm">
                <Trash size="20" className="text-red-500" />
            </button> */}
        </div>
    );

    const columns = [
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
            {/* <div className="flex justify-center items-center mt-5 space-x-2">
                <button
                    onClick={() => pageChangeHandler(pageNo - 1)}
                    disabled={!prevIsValid}
                    className={`px-3 py-1 rounded-full ${prevIsValid ? "bg-gray-200" : "bg-gray-100 text-gray-400"}`}
                >
                    {"<"}
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => pageChangeHandler(idx + 1)}
                        className={`px-3 py-1 rounded-full ${idx + 1 === pageNo ? "bg-blue-500 text-white" : "bg-gray-100"
                            }`}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    onClick={() => pageChangeHandler(pageNo + 1)}
                    disabled={!nextIsValid}
                    className={`px-3 py-1 rounded-full ${nextIsValid ? "bg-gray-200" : "bg-gray-100 text-gray-400"}`}
                >
                    {">"}
                </button>
            </div> */}
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

        </div>
    );
};
export default History;