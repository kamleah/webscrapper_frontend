import EditCreateButton from '../components/Button/EditCreateButton';
import { Trash } from 'iconsax-react';

export const getTableColumns = (toggle, toggleModalBtn) => [
  {
    field: "id",
    header: "ID",
    body: (row) => <h6>{row?.id}</h6>,
    sortable: true,
    style: {
      width: "40%",
    }
  },
  { 
    field: "name", 
    header: "Name", 
    body: (row) => <h6 className="capitalize">{`${row?.name ? row?.name : "--"}`}</h6> 
  },
  {
    header: "Actions",
    body: (row) => actionBodyTemplate(row, toggle, toggleModalBtn),
  },
];

const actionBodyTemplate = (row, toggle, toggleModalBtn) => (
  <div className="flex items-center gap-2">
    <EditCreateButton
      title="Edit Brand"
      buttonType="edit"
      toggle={toggle}
    />
    <button
      onClick={() => toggleModalBtn(row.id)}
      id={row.ID}
      className="bg-red-100  px-1.5 py-2 rounded-sm"
    >
      <Trash size="20" className="text-red-500" />
    </button>
  </div>
);