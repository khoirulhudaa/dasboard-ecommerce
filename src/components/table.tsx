import React, { useEffect, useMemo, useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table';
import datas from './data.json';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Table = () => {

  const [sorting, setSorting] = useState([])
  useEffect(() => {
    const thElements = document.querySelectorAll('thead th') as NodeListOf<HTMLTableCellElement>;
    const numberOfColumns = columns.length;
    const widthPercentage = 100 / numberOfColumns;

    thElements.forEach((th) => {
      th.style.width = `${widthPercentage}%`;
    });
  }, [])

  const data = useMemo(() => datas, []);
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      footer: 'ID',
    },
    {
      header: 'Name',
      accessorFn: (row: {first_name: string, last_name: string}) => `${row.first_name} ${row.last_name}`,
      footer: 'Name',
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      footer: 'Gender',
    },
    {
      header: 'IP',
      accessorKey: 'ip_address',
      footer: 'IP',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: (newSorting: any) => {
      setSorting(newSorting)
    }
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className='hover:brightness-[90%]' key={header.id} onClick={header.column.getToggleSortingHandler()}>
                {
                  header.isPlaceholder ? null : (
                    <div className='flex items-center cursor-pointer'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {
                        {
                          asc: (
                          <div className='flex ml-3 items-center'>
                            <FaArrowUp size={8} color='gray' />
                            <FaArrowDown size={8} />
                          </div>
                          ), 
                          desc: (
                            <div className='flex ml-3 items-center'>
                              <FaArrowDown size={8} color='gray' />
                              <FaArrowUp size={8} />
                            </div>
                          )
                        }
                        [
                          header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'
                        ]
                      }
                    </div>
                  )
                }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {
          table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {
                row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
      <div>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button style={{backgroundColor: !table.getCanPreviousPage() ? 'gray' : 'white'}} onClick={() => table.previousPage()}>Prev</button>
        <button style={{backgroundColor: !table.getCanNextPage() ? 'gray' : 'white'}} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
      </div>
    </table>
  );
};

export default Table;
