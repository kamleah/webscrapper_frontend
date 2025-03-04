
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

const User = () => {
    const dispatch = useDispatch();
    const loggedUserDetails = useSelector((state) => state.auth.loggedUserDetails);
    const [users, setUsers] = useState([])
    const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formType, setFromType] = useState("create");
    const [userDataToEdit, setUserDataToEdit] = useState();

    useEffect(() => {
        const UserList = async () => {
            try {
                const response = await axios.get(`${configurationEndPoints.user_list}?page=1&page_size=100`);
                setUsers(response.data.results)
            } catch (error) {
                console.log("Error fetching users:", error);
            }
        };
        UserList();
    }, [dispatch]);

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
        setUserDataToEdit();
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
            const response = await axios.post(configurationEndPoints.user_resgistration, newUser);
            toast.success("User created successfully!");
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


    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        dispatch(setLoggedUser(updatedUsers));
    };

    const handleEdit = (data) => {
        setUserDataToEdit(data);
        setFromType("edit");
        setCreateModalOpen(true);
    }

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
            {/* <button
                onClick={() => handleDelete(row.id)}
                className="bg-red-100 px-1.5 py-2 rounded-sm"
            >
                <Trash size="20" className="text-red-500" />
            </button> */}
        </div>
    );

    const columns = [
        { field: "first_name", header: "First Name", body: (row) => <h6>{row?.first_name || "--"}</h6>, style: { width: "30%" } },
        { field: "last_name", header: "Last Name", body: (row) => <h6>{row?.last_name || "--"}</h6>, style: { width: "30%" } },
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

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm p-5 sm:p-7">
            <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                <SectionHeader title="User" subtitle="List of Users" />
                <EditCreateButton title="Create User" buttonType="create" toggle={openCreateModal} />
            </div>
            <Table data={users || []} columns={columns} />
            {isCreateModalOpen && (
                <CreateUserModal
                    isOpen={isCreateModalOpen}
                    toggle={closeCreateModal}
                    onUserCreated={handleUserCreated}
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
        </div>
    );
};

export default User;
