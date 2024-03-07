import { useEffect, useState } from "react";
import { IBooksList, ICourses, IRentalBooks } from  "../../../types";
import "./table.css";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { FooterCell } from "./FooterCell";
import {  useGetBooks, useGetCoursePrestamos, useGetCourses } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,Controller,useFormContext   } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Input,
  Textarea,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
  toast 
} from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PrestamoValidation } from "@/lib/validation";
import {Table} from "@/components/table";
import { setDefaultAutoSelectFamily } from "net";
//import Table from "@/components/table";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import ClientAutocomplete from "./buscar";
import {  Combobox } from "../../../components/shared/ComboBox";

type PostFormProps = z.infer<typeof PrestamoValidation>;
//type Schema = z.infer<typeof schema>

const RentalBooks = () => {
  
  const [globalFilter, setGlobalFilter] = useState("");
  const handleFilter = (value: string | number) =>
  setGlobalFilter(String(value));
  const [open, setOpen] = useState(false);
 // const [value, setValue] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  const [value, setValue] = useState<string>("");
  const [search, setSearch] = useState<string>(" ");

  const {
    data: listcourse,
    isPending: isLoadingCourse,
    error: errorCourse,
  } = useGetCourses();
 //  console.log(listcourse);

  const {
     data:lisbooks, 
     isPending: isLoadingBooks,
     error: errorBooks } = useGetBooks(search);
    console.log(search);
     console.log(lisbooks);

  // const {
  //   data: listStudentOriginal  ,
  //   isPending,
  //   error,
  // } = useGetCoursePrestamos(1, Number(selectedOption));
  const [data, setData] = useState<any[] >([]);

  const [required, setRequired] = useState(false);
  const groupsQuery =useGetCoursePrestamos(1, Number(selectedOption));
  console.log(selectedOption);
  console.log(groupsQuery.data);
 



 
  const form = useForm<z.infer<typeof PrestamoValidation>>({
    resolver: zodResolver(PrestamoValidation),
    defaultValues: {
      idcourse:  "",
      idbook:""
    },
   
  });

  async function onSubmit(data: z.infer<typeof PrestamoValidation>) {
    console.log(data);
    console.log(form.getValues())
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })


  }

  const onValueChange = (value: string) => {
    setSelectedOption(value); 
    
    // Set form value
    form.setValue('idcourse', value);
  }
  const handleChangeBook =(value : string ) => {
    console.log(value); 

    
    setValue(value);
  //   setValue(currentValue === value ? "" : currentValue)
    form.setValue('idbook', value);

  }

  const handleClientSearchChanged = async (busqueda: string) => {
  

    if (busqueda === '' || busqueda.length < 2) {
      return;
    }
    setSearch(busqueda);
    console.log("busqueda : "+ busqueda);
  }

  if (isLoadingCourse || groupsQuery.isPending || isLoadingBooks) {
    return <Loader />;
  }
  if (errorCourse ) return "An error has occurred: " + errorCourse.message;
  if (groupsQuery.error ) return "An error has occurred: " + groupsQuery.error.message;
  if (errorBooks) return "An error has occurred: " + errorBooks.message;

  return (
   
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full max-w-5xl"
        >
          <FormField
            control={form.control}
            name="idcourse"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="shad-form_label">Grado/Curso</FormLabel>
                <Select onValueChange={onValueChange}     value={selectedOption}    defaultValue={field.value}    >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="shad-form_label"
                        placeholder="Selecciona un curso"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="shad-form_label">
                    {listcourse &&
                      listcourse.map((cur: ICourses) => {
                        return (
                          <SelectItem
                            key={cur.value.toString()}
                            value={cur.value.toString()}
                            className="shad-form_label"
                          >
                            {cur.label}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="idbook"
             render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="shad-form_label">Libro</FormLabel>
              <Combobox
                value={field.value}
                items={lisbooks}
                onSelect={handleChangeBook}
                selectItemMsg="Busque por el nombre del libro"
                searchPlaceholder="Buscar libro..."
                onSearchChange={handleClientSearchChanged}
                {...(!required && { unselect: true, unselectMsg: 'No libros' })}
         />
                </FormItem>
          )}/>
      
   
     

     <div className="my-8 container mx-auto">
        {groupsQuery.data && (
          <Table 
              data={groupsQuery.data || []}
              columns={columns}
            >
          </Table>
              
              
        )}
    </div>
        { JSON.stringify(lisbooks) }


          <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4">
              Cancel
            </Button>
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
            >
              Post
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RentalBooks;