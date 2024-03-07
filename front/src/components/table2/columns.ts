import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from "./TableCell"
import { IRentalBooks } from  "../../types/index";
import { EditCell } from './EditCell'

const columnHelper = createColumnHelper<IRentalBooks>()

export const columns = [
  columnHelper.accessor('id', {
    header: ' Id',
    enableGlobalFilter: false,
    
   
  //  cell: TableCell,
   
  }),
  columnHelper.accessor('idAlumno', {
    header: 'Student Id',
    enableGlobalFilter: false,
    meta : {className: 'hidden'},
  //  cell: TableCell,
  
  }),
  columnHelper.accessor('name', {
    header: 'Full Name',
 //   cell: TableCell,
  
  }),
  columnHelper.accessor('idBook', {
    header: 'Id Book',
    enableGlobalFilter: false
 //   cell: TableCell,
    
  }),
  columnHelper.accessor('nroEjemplar',  {
    header: 'Nro. Book',
    enableGlobalFilter: false,
   
    cell: TableCell,
    meta : {
      type: 'number',
    }
 
  }),
 
  columnHelper.display({
    id: 'edit',
    cell: EditCell,
  }),
]