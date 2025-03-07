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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ExcelJS from "exceljs";

const History = () => {
    const dispatch = useDispatch();
    const [isViewHistoryModalOpen, setViewHistoryModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    const [open, setOpen] = useState(false);
    const [delId, setDelId] = useState(0);
    const [loading, setLoading] = useState(false);

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
            await axios.delete(`${configurationEndPoints.delete_history}${historyId}/`);
            await fetchData({ page: pageNo, page_size: pageSize });
            const updatedHistory = await fetchHistory({
                page: pageNo,
                page_size: pageSize,
            });
            dispatch(setHistory(updatedHistory.results));
        } catch (error) {
            console.log("Error deleting history:", error);
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

    // // Function to convert JSON to CSV format
    // const convertToCSV_V2 = (jsonArray) => {
    //     const headers = Object.keys(jsonArray[0]).join(",");
    //     const rows = jsonArray.map((obj) =>
    //         Object.values(obj)
    //             .map((val) => `"${val}"`)
    //             .join(",")
    //     );
    //     return [headers, ...rows].join("\n");
    // };

    // const downloadCSV_V2 = (jsonData) => {
    //     try {
    //         setLoading(true);
    //         const csvData = convertToCSV_V2(jsonData);
    //         const blob = new Blob([csvData], { type: "text/csv" });
    //         const url = window.URL.createObjectURL(blob);

    //         // Generate filename with current date & time
    //         const now = new Date();
    //         const formattedDate = now
    //             .toISOString()
    //             .replace(/T/, "_") // Replace 'T' with '_'
    //             .replace(/:/g, "-") // Replace colons with dashes
    //             .split(".")[0]; // Remove milliseconds
    //         const fileName = `Scrapped_Content_${formattedDate}.xlsx`;

    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = fileName;
    //         a.click();
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // };

    // Process JSON keys to human-readable headers
    const processHeaders = (item) => {
        try {
            const headerMap = generateHeaderMap([item]); // Pass item as an array
            return Object.keys(item).reduce((acc, key) => {
                acc[headerMap[key] || key] = item[key];
                return acc;
            }, {});
        } catch (error) {
            console.error('Error processing headers:', error);
            setLoading(false);
            return {};
        }
    };

    // Generate dynamic header map
    const generateHeaderMap = (data) => {
        try {
            if (!data || data.length === 0) {
                throw new Error('No data available to generate headers.');
            }

            const keys = Object.keys(data[0]);
            return keys.reduce((acc, key) => {
                acc[key] = key
                    .replace(/_/g, ' ') // Replace underscores with spaces
                    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
                return acc;
            }, {});
        } catch (error) {
            console.error('Error generating header map:', error);
            setLoading(false);
            return {};
        }
    };

    // Export data to Excel
    const exportToExcelOld = (data) => {
        try {
            if (!data || data.length === 0) {
                throw new Error('No data to export.');
            }

            // 1. Process data
            const processedData = data.map((item) => processHeaders(item));
            const headerMap = generateHeaderMap(data);

            // 2. Create worksheet
            const ws = XLSX.utils.json_to_sheet(processedData, { header: Object.values(headerMap) });

            // 3. Add bold headers
            const headerRange = XLSX.utils.decode_range(ws['!ref']);
            for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
                const address = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
                if (!ws[address]) continue;
                // ws[address].s = { font: { bold: true } };
                ws[address].s = {
                    font: { bold: true, color: { rgb: "FFFFFF" } },
                    fill: { fgColor: { rgb: "FF0000" } }, 
                    alignment: { horizontal: "center" } 
                };
            }

            // 4. Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Products");

            // 5. Generate Excel file
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            // 6. Trigger download
            saveAs(blob, "products.xlsx");
            setLoading(false);
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            setLoading(false);
        }
    };

    const exportToExcel = async (data) => {
        try {
            if (!data || data.length === 0) {
                throw new Error("No data to export.");
            }
    
            // 1. Create a new workbook and worksheet
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Scraped Data");
    
            // 2. Process Data & Headers
            const processedData = data.map((item) => processHeaders(item));
            const headerMap = generateHeaderMap(data);
            const headers = Object.values(headerMap);
    
            // 3. Apply Red Styling to Headers
            const headerRow = worksheet.addRow(headers);
            headerRow.eachCell((cell) => {
                cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FF0000" }, // Red background
                };
                cell.font = {
                    bold: true,
                    color: { argb: "FFFFFF" }, // White text
                };
                cell.alignment = { horizontal: "center", vertical: "middle" };
            });
    
            // 4. Add Data Rows
            processedData.forEach((rowData) => {
                worksheet.addRow(Object.values(rowData));
            });
    
            // 5. Adjust Column Widths
            worksheet.columns.forEach((column) => {
                column.width = 20;
            });
    
            // 6. Generate Excel File & Trigger Download
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
    
            saveAs(blob, "Scraped_Data.xlsx");
        } catch (error) {
            console.error("Error exporting to Excel:", error);
        }
    };

    // Download data from API and export to Excel
    const downloadInExcelV2 = (row) => {
        try {
            setLoading(true);
            axios
                .post(configurationEndPoints.download_scrap, { scrapped_id: row.id })
                .then((response) => {
                    if (response.data && response.data.data) {
                        exportToExcel(response.data.data);
                    } else {
                        throw new Error('No data received from the API.');
                    }
                })
                .catch((error) => {
                    console.error('API Error:', error);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error in downloadInExcelV2:', error);
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