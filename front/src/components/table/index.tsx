import { useEffect, useState } from "react";
import { IRentalBooks } from "../../types";
import "./table.css";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnResizeMode,
} from "@tanstack/react-table";
import { columns } from "../../_root/pages/Prestamos/columns";
import { FooterCell } from "../../_root/pages/Prestamos/FooterCell";

import { useGetCoursePrestamos } from "@/lib/react-query/queries";

export const Table = ({data,columns}:{data:any[] ,columns:any}) => {
  const [data1, setData1] = useState<any[]>(data);
 //const [data1, setData1] = useState<IRentalBooks[]>([]);
  const [validRows, setValidRows] = useState({});

  const [editedRows, setEditedRows] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    columnResizeMode: "onChange",
    meta: {editedRows, setEditedRows,
        updateData: (rowIndex: number, columnId: string, value: string, isValid: boolean) => {
            console.log(rowIndex, columnId, value, isValid);
            setData1((old:any) =>
              old.map((row:any, index:any) => {
                if (index === rowIndex) {
                  return {
                    ...old[rowIndex],
                    [columnId]: value,
                  };
                }
                return row;
              })
            );
            // setValidRows((old) => ({
            //   ...old,
            //   [rowIndex]: { ...old[rowIndex], [columnId]: isValid },
            // }));
          },
    },
    
  });

  console.log(data);

  return (
    <article className="table-container">
      <table width={table.getTotalSize()}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} >
              {headerGroup.headers.map((header) => (
                <th key={header.id} >
                      {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <div  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()} className={`resizer ${
                    header.column.getIsResizing() ? "isResizing" : ""
                  }`}></div>
                     
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}  >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
       
      </table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </article>

  );
};