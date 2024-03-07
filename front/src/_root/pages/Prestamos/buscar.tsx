'use client';

//import { list } from '@/actions/clients';
import {  useGetBooks } from "@/lib/react-query/queries";
//import { toaster } from '@/components/form/toaster';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {  Combobox } from "../../../components/shared/ComboBox";
import { ComboBoxItemType } from "@/types";
//import { Label } from '../ui/label';
import { toast ,Label  } from "@/components/ui";
  type ClientAutocompleteProps = {
    value?: string;
    disabled?: boolean;
    setClientId: Dispatch<SetStateAction<string>>;
    required?: boolean;
    // onSearchChange?: (e: string) => void;
  };

export default function ClientAutocomplete({
    value,
    disabled,
    setClientId,
    required = false,
  }: ClientAutocompleteProps) {
  const [clients, setClients] = useState<ComboBoxItemType[]>([]);
  const [search, setSearch] = useState<string>("");

  console.log(value);

  // const {
  //   data:list, 
  //   isPending: isLoadingBooks,
  //   error: errorBooks } = useGetBooks(search);

  const groupsQuery = useGetBooks(search);

  const handleClientSearchChanged = async (busqueda: string) => {
  

    if (busqueda === '' || busqueda.length < 2) {
      return;
    }
    setSearch(busqueda);
    console.log("busqueda : "+ busqueda);
   // const response = await list(1, value);

    if (groupsQuery.error) { 
      toast({
        title: "Error:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Error</code>
          </pre>
        ),
      });
      return;
    }

    // setClients(
    //   response.data?.data.map((client) => ({
    //     value: client.id,
    //     label: client.nomeFantasia,
    //   })) || [],
    // );
  //  console.log(list);
    // setClients(list?.map((client)=>({
    //     value: client.value,
    //    label: client.label,

    // })) || [],
 //   );

  };

  // useEffect(() => {
  //   console.log("use" + value);
  //   if (value) {
  //     handleClientSearchChanged(value);
  //   }
  // }, [value]);

  return (
    <>
    
      <Combobox
        disabled={disabled}
        value={value}
        items={groupsQuery.data}
        onSelect={(value) => setClientId(value)}
        selectItemMsg="Busque por el nombre del libro"
        searchPlaceholder="Bucar libro..."
        onSearchChange={handleClientSearchChanged}
        {...(!required && { unselect: true, unselectMsg: 'No libros' })}
      />
    </>
  );
}