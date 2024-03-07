'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ComboBoxItemType } from '@/types';



type ComboboxProps = {
  value?: string;
  onSelect: (value: string ) => void;
  items: ComboBoxItemType[];
  searchPlaceholder?: string;
  noResultsMsg?: string;
  selectItemMsg?: string;
  className?: string;
  unselect?: boolean;
  unselectMsg?: string;
  onSearchChange?: (e: string) => void;
  disabled?: boolean;
};

const popOverStyles = {
  width: 'var(--radix-popover-trigger-width)',
};

export function Combobox({
  value,
  onSelect,
  items,
  searchPlaceholder = 'Buscar item...',
  noResultsMsg = 'Ningun item encontrado',
  selectItemMsg = 'Selecione um item',
  className,
  unselect = false,
  unselectMsg = 'Ninguno',
  onSearchChange,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  console.log(items);
  console.log(value);
  const handleOnSearchChange = useDebouncedCallback((e: string) => {
    if (onSearchChange) {
      onSearchChange(e);
    }
  }, 300);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between', className)}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : selectItemMsg}
           
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={popOverStyles}
        className="popover-content-width-same-as-its-trigger p-0"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={handleOnSearchChange}
          />
          <ScrollArea className="max-h-[220px] overflow-auto">
            <CommandEmpty>{noResultsMsg}</CommandEmpty>
            <CommandGroup>
              {unselect && (
                <CommandItem
                  key="unselect"
                  value=""
                  onSelect={() => {
                    onSelect('');
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === '' ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {unselectMsg}
                </CommandItem>
              )}
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={currentValue => {
                
                    onSelect(
                      currentValue.toLowerCase() === item.label.toLowerCase()
                        ? item.value
                        : '',
                        
                    );

                     console.log(currentValue); 
                 //   setValue(value ?? "");
              //      setOpen(false);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}