import { useEffect, useState } from "react";
import { IRentalBooks } from "../../types";
import "./table.css";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { FooterCell } from "./FooterCell";
import useStudents from "./useStudents";
import { useGetCoursePrestamos } from "@/lib/react-query/queries";

export const Table = () => {
  const { data: originalData, isPending} = useGetCoursePrestamos(1,20);
  const [data, setData] = useState<IRentalBooks[]>([]);
  const [editedRows, setEditedRows] = useState({});
  const [validRows, setValidRows] = useState({});

  useEffect(() => {
    if (isPending) return;
    setData([...originalData]);
  }, [isPending]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    
  });

  return (
    <article className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={table.getCenterLeafColumns().length} align="right">
              <FooterCell table={table} />
            </th>
          </tr>
        </tfoot>
      </table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </article>

  );
};