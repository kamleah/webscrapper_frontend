
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditCreateButton from "../../components/Button/EditCreateButton";
import { Eye, Trash } from "iconsax-react";
import SectionHeader from "../../components/Card/SectionHeader";
import Table from "../../components/Table/Table";
import CreateUserModal from "../../components/createUser/createUser";
import ViewDetailsModal from "../../components/Modals/viewUserModal/viewUserModal";
import { setLoggedUser } from "../../redux/userSlice/userSlice";
import { configurationEndPoints } from "../../endPoints/ConfigurationsEndPoint";
import { toast } from "react-toastify";
import { setUsersRoleList } from "../../redux/historySlice/historySlice";
import { baseURL } from "../../constants";
import Pagination from "../../components/pagination/pagination";
import usePaginatedData from "../../utils/usePaginatedData";
import { authEndPoints } from "../../endPoints/AuthEndPoint";
import DeleteModal from "../../components/Modals/DeleteModal/DeleteModal";
const User = () => {
    const dispatch = useDispatch();
     const { accessToken } = useSelector((state) => state.auth);
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formType, setFromType] = useState("create");
    const [userDataToEdit, setUserDataToEdit] = useState();
    const [open, setOpen] = useState(false);
    const [delId, setDelId] = useState(0);
    const [cantDelete, setCantDelete] = useState(false);
    const [usersList, setUsersList] = useState([]);

    const filterFunction = async (params) => {
        try {
            const response = await axios.get(configurationEndPoints.user_list, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const {
        filterData: users,
        pageNo,
        pageSize,
        totalPages,
        nextIsValid,
        prevIsValid,
        pageChangeHandler,
        fetchData,
    } = usePaginatedData(1, 10, filterFunction, {});
    useEffect(() => {
        setUsersList(users || []);
    }, [users]);

    useEffect(() => {
        fetchData({ page: pageNo, page_size: pageSize });
    }, [pageNo, pageSize]);

    const userFields = [
        { label: "Email", key: "email" },
        { label: "First Name", key: "first_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Role", key: "user_role.name" },
        { label: "Process Type", key: "process_type" },
    ];

    const openViewUserModal = (user) => {
        setSelectedUser(user);
        setViewUserModalOpen(true);
    };

    const openCreateModal = () => {
        setUserDataToEdit(null);
        setFromType("create");
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };

    const closeViewUserModal = () => {
        setSelectedUser(null);
        setViewUserModalOpen(false);
    };

    const handleUserCreated = async (newUser) => {
        newUser.user_created_by = loggedUserDetails?.id;
        try {
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            const response = await axios.post(configurationEndPoints.user_resgistration, newUser, config);
            toast.success("User created successfully!");
            await fetchData({ page: pageNo, page_size: pageSize });
            return true;
        } catch (error) {
            console.error(error);
            const serverResponse = error.response?.data;

            if (serverResponse?.errors) {
                const errorMessages = Object.values(serverResponse.errors)
                    .flat()
                    .join(", ");
                toast.error(errorMessages);
            } else {
                toast.error(serverResponse?.message || "Failed to create user. Please try again.");
            }
            return false;
        }
    };
    const handleUserEdit = async (formData, userId) => {
        formData.user_created_by = loggedUserDetails?.id;
        try {
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            const response = await axios.put(`${authEndPoints.update_user}${userId}/`, formData, config);
            toast.success("User updated successfully!");
            setUsersList(prev => prev.map(user => 
                user.id === userId ? { ...user, ...formData, user_role: { ...user.user_role, id: formData.user_role } } : user
            ));
            return true;
        } catch (error) {
            console.error(error);
            const serverResponse = error.response?.data;
            if (serverResponse?.errors) {
                const errorMessages = Object.values(serverResponse.errors)
                    .flat()
                    .join(", ");
                toast.error(errorMessages);
            } else {
                toast.error(serverResponse?.message || "Failed to update user. Please try again.");
            }
            return false;
        }
    };

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
            };
            if (loggedUserDetails.id === id) {
                alert("Action not allowed: You cannot delete your own account.");
                return;
            }
            await axios.delete(`${authEndPoints.update_user}${id}/`, config);
            setUsersList(prev => prev.filter(user => user.id !== id));
            toast.success("User deleted successfully!");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete user. Please try again.");
        }
    };

    const handleEdit = (data) => {
        setUserDataToEdit(data);
        setFromType("edit");
        setCreateModalOpen(true);
    };

    const toggleModalBtn = (id) => {
        if (loggedUserDetails.id === id) {
            setCantDelete(true);
            return;
        }
        setOpen(!open);
        setDelId(id);
    };
    const deleteData = () => {
        handleDelete(delId);
        setOpen(false);
    };

    const actionBodyTemplate = (row) => (
        <div className="flex items-center gap-2">
            <button
                onClick={() => openViewUserModal(row)}
                className="bg-blue-100 px-1.5 py-2 rounded-sm"
            >
                <Eye size="20" className="text-blue-500" />
            </button>
            <EditCreateButton
                title="Edit User"
                buttonType="edit"
                toggle={() => handleEdit(row)}
            />
            <button
                onClick={() => toggleModalBtn(row.id)}
                className="bg-red-100 px-1.5 py-2 rounded-sm"
            >
                <Trash size="20" className="text-red-500" />
            </button>
        </div>
    );
    const capitalize = (str) => {
        if (!str) return "--";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    const columns = [
        { field: "first_name", header: "First Name", body: (row) => <h6>{capitalize(row?.first_name) || "--"}</h6>, style: { width: "30%" } },
        { field: "last_name", header: "Last Name", body: (row) => <h6>{capitalize(row?.last_name) || "--"}</h6>, style: { width: "30%" } },
        { field: "email", header: "Email", body: (row) => <h6>{row?.email || "--"}</h6>, style: { width: "30%" } },
        { field: "user_role?.name", header: "Role", body: (row) => <h6>{row?.user_role?.name || "--"}</h6>, style: { width: "20%" } },
        { header: "Actions", body: (row) => actionBodyTemplate(row), style: { width: "40%" } },
    ];

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${baseURL}account/role/`);
            if (response.data.status === "success") {
                dispatch(setUsersRoleList(response.data.data));
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleCantDelete = () => setCantDelete(false);

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm p-5 sm:p-7">
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <SectionHeader title="User" subtitle="List of Users" />
                <EditCreateButton title="Create User" buttonType="create" toggle={openCreateModal} />
            </div>
            <Table data={usersList} columns={columns} />
            <Pagination 
                currentPage={pageNo} 
                totalPages={totalPages} 
                onPageChange={(page) => {
                    pageChangeHandler(page);
                    fetchData({ page, page_size: pageSize });
                }}
            />
            {isCreateModalOpen && (
                <CreateUserModal
                    isOpen={isCreateModalOpen}
                    toggle={closeCreateModal}
                    onUserCreated={handleUserCreated}
                    onUserEdit={handleUserEdit}
                    formType={formType}
                    data={userDataToEdit}
                />
            )}
            <ViewDetailsModal
                isOpen={isViewUserModalOpen}
                toggle={closeViewUserModal}
                title="User Details"
                fields={userFields}
                data={selectedUser}
            />
            <DeleteModal
                title="Delete User"
                deleteBtn={deleteData}
                toggleModalBtn={toggleModalBtn}
                description="Are you sure you want to delete this user?"
                open={open}
            />
            <DeleteModal
                title="Action Not Allowed"
                toggleModalBtn={handleCantDelete}
                description="You cannot delete your own account. Please contact an administrator if you need assistance."
                open={cantDelete}
            />
        
        </div>
    );
};

export default User;