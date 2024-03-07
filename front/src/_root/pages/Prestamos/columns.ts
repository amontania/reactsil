import { createColumnHelper } from '@tanstack/react-table'
import { TableCell } from "./TableCell"
import { IRentalBooks } from  "../../../types";
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
    enableGlobalFilter: false
  //  cell: TableCell,
  
  }),
  columnHelper.accessor('name', {
    header: 'Full Name',

 //   cell: TableCell,
  
  }),
  columnHelper.accessor('idBook', {
    header: 'Id Book',
    enableGlobalFilter: false,
    size: 0,
 //   cell: TableCell,
    
  }),
  columnHelper.accessor('nroEjemplar',  {
    header: 'Nro. Book',
    enableGlobalFilter: false,
   
   
    cell: TableCell,
    meta : {
      type: 'text',
      required: true,
      pattern:'^(([0-9]*)|(([0-9]*)\.([0-9]*)))$'
    }
 
  }),
 
  // columnHelper.display({
  //   id: 'edit',
  //   cell: EditCell,
  // }),
]