// import React, { useState } from "react";
// import EditCreateButton from "../../components/Button/EditCreateButton";
// import { Eye, Trash } from "iconsax-react";
// import SectionHeader from "../../components/Card/SectionHeader";
// import Table from "../../components/Table/Table";
// import StaticCreateUserForm from "../../components/createUser/createUser";
// import ViewUserModal from "../../components/Modals/viewUserModal/viewUserModal";
// import CreateUserModal from "../../components/createUser/createUser";
// import ViewDetailsModal from "../../components/Modals/viewUserModal/viewUserModal";

// const User = () => {
//     const [data, setData] = useState([
//         { id: 1, name: "John Doe", email: "6lHsD@example.com", phoneNumber: "1234567890" },
//         { id: 2, name: "Jane Smith", email: "ZDyRb@example.com", phoneNumber: "98765403210" },
//         { id: 3, name: "Alice Johnson", email: "ZDyRb@example.com", phoneNumber: "9876543210" },
//         { id: 4, name: "Bob Brown", email: "ZDyRb@example.com", phoneNumber: "9876543210" },
//     ]);
//     const userFields = [
//         { label: 'Name', key: 'name' },
//         { label: 'Email', key: 'email' },
//         { label: 'Phone Number', key: 'phoneNumber' },
//     ];

//     const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
//     const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);


//     const openViewUserModal = (user) => {
//         setSelectedUser(user);
//         setViewUserModalOpen(true);
//     };

//     const openCreateModal = () => {
//         setCreateModalOpen(true);
//     };

//     const closeCreateModal = () => {
//         setCreateModalOpen(false);
//     };

//     const closeViewUserModal = () => {
//         setSelectedUser(null);
//         setViewUserModalOpen(false);
//     };
//     const handleUserCreated = (newUser) => {
//         setData((prevData) => [...prevData, newUser]);
//     };
//     const handleDelete = (id) => {
//         console.log("Delete user with ID:", id);
//         setData((prevData) => prevData.filter((user) => user.id !== id));
//     };

//     const actionBodyTemplate = (row) => (
//         <div className="flex items-center gap-2">
//             <button
//                 onClick={() => openViewUserModal(row)}
//                 className="bg-blue-100 px-1.5 py-2 rounded-sm"
//             >
//                 <Eye size="20" className="text-blue-500" />
//             </button>
//             <EditCreateButton
//                 title="Edit User"
//                 buttonType="edit"
//                 toggle={() => console.log("Edit user:", row)}
//             />
//             <button
//                 onClick={() => handleDelete(row.id)}
//                 className="bg-red-100 px-1.5 py-2 rounded-sm"
//             >
//                 <Trash size="20" className="text-red-500" />
//             </button>
//         </div>
//     );

//     const columns = [
//         { field: "id", header: "ID", body: (row) => <h6>{row?.id}</h6>, sortable: true, style: { width: "20%" } },
//         { field: "name", header: "Name", body: (row) => <h6 className="capitalize">{row?.name || "--"}</h6>, style: { width: "30%" } },
//         { field: "email", header: "Email", body: (row) => <h6 className="capitalize">{row?.email || "--"}</h6>, style: { width: "30%" } },
//         { field: "phoneNumber", header: "Phone Number", body: (row) => <h6 className="capitalize">{row?.phoneNumber || "--"}</h6>, style: { width: "40%" } },
//         { header: "Actions", body: (row) => actionBodyTemplate(row), style: { width: "40%" } },
//     ];

//     return (
//         <div className="bg-white rounded-xl m-4 sm:m-5 shadow-sm  p-5 sm:p-7">
//             <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
//                 <SectionHeader title="User" subtitle="List of Users" />
//                 <EditCreateButton title="Create User" buttonType="create" toggle={openCreateModal} />
//             </div>
//             <Table data={data} columns={columns} />
//             {isCreateModalOpen && (
//                 <CreateUserModal
//                     isOpen={isCreateModalOpen}
//                     toggle={closeCreateModal}
//                     onUserCreated={handleUserCreated}
//                 />
//             )}
//             <ViewDetailsModal
//                 isOpen={isViewUserModalOpen}
//                 toggle={closeViewUserModal}
//                 title="User Details"
//                 fields={userFields}
//                 data={selectedUser}
//             />
//         </div>
//     );
// };

// export default User;
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

const User = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([])
    // const users = useSelector((state) => state.user.logged_user);
    console.log("users",users)
    const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

   useEffect(() => {
    const UserList = async () => {
        try {
            const response = await axios.get("http://192.168.0.181:8000/account/users-list/?page=1&page_size=10");
            // dispatch(setLoggedUser(response.data.results));
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
    ];

    const openViewUserModal = (user) => {
        setSelectedUser(user);
        setViewUserModalOpen(true);
    };

    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };

    const closeViewUserModal = () => {
        setSelectedUser(null);
        setViewUserModalOpen(false);
    };

    const handleUserCreated = (newUser) => {
        // For simplicity, directly add the new user to Redux state
        const updatedUsers = [...users, newUser];
        dispatch(setLoggedUser(updatedUsers));
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        dispatch(setLoggedUser(updatedUsers));
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
                toggle={() => console.log("Edit user:", row)}
            />
            <button
                onClick={() => handleDelete(row.id)}
                className="bg-red-100 px-1.5 py-2 rounded-sm"
            >
                <Trash size="20" className="text-red-500" />
            </button>
        </div>
    );

    const columns = [
        { field: "first_name", header: "First Name", body: (row) => <h6>{row?.first_name || "--"}</h6>, style: { width: "30%" } },
        { field: "last_name", header: "Last Name", body: (row) => <h6>{row?.last_name || "--"}</h6>, style: { width: "30%" } },
        { field: "email", header: "Email", body: (row) => <h6>{row?.email || "--"}</h6>, style: { width: "30%" } },
        { field: "user_role?.name", header: "Role", body: (row) => <h6>{row?.user_role?.name || "--"}</h6>, style: { width: "20%" } },
        { header: "Actions", body: (row) => actionBodyTemplate(row), style: { width: "40%" } },
    ];
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
