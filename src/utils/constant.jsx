import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ExcelJS from "exceljs";
export const getUniqueKeysWithLanguage = (rowData) => {
    const keysSet = new Set();

    rowData.forEach(item => {
        const languagePrefix = item.language.toLowerCase(); // Convert to lowercase for consistency
        Object.keys(item.content_json).forEach(key => {
            keysSet.add(`${languagePrefix}_${key}`); // Prefix keys with language
        });
    });

    return Array.from(keysSet);
};

export const generateCSVFile = (headers, rowData) => {
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

export const transformDataForCSV = (rowData) => {
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

export const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const processHeaders = (item) => {
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
export const generateHeaderMap = (data) => {
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
export const exportToExcel1 = (data) => {
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
                fill: { fgColor: { rgb: "4F81BD" } },
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

export const exportToExcel = async (data) => {
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
                fgColor: { argb: "CFE2F2" }, // Background color
            };
            cell.font = {
                bold: true,
                color: { argb: "FF000000" }, // Text color (black)
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
        setLoading(false);
    } catch (error) {
        console.error("Error exporting to Excel:", error);
        setLoading(false);
    }
};