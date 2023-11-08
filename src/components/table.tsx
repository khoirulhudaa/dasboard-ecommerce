import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import lodash from 'lodash';
import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Table = ({
  columns,
  dataTable,
  search
}: {
  columns: Array<any>,
  dataTable: Array<any>,
  search: string
}) => {

  const [sorting, setSorting] = useState([])
  
  useEffect(() => {
    const thElements = document.querySelectorAll('thead th') as NodeListOf<HTMLTableCellElement>;
    const numberOfColumns = columns.length;
    const widthPercentage = 100 / numberOfColumns;

    thElements.forEach((th) => {
      th.style.width = `${widthPercentage}%`;
    });
  }, [])

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>(dataTable);

  const handleSearch = lodash.debounce((term: string) => {
    const filteredResults = lodash.filter(dataTable, (item) => {
      return item.product_name.toLowerCase().includes(term.toLowerCase());
    });

    setFilteredData(filteredResults);
  }, 300); // Gunakan lodash.debounce untuk menunda pencarian

  useEffect(() => {
    setSearchTerm(search); // Perbarui searchTerm dengan nilai search
    handleSearch(searchTerm); // Gunakan searchTerm dalam pencarian
  }, [searchTerm, dataTable, search]);
  
  const data = filteredData;

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
      <div className='flex items-center w-max h-max mt-4'>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button className={`w-[30px] h-[30px] border-[1px] border-gray-300 mx-2 flex justify-center items-center rounded-lg border-box ${!table.getCanPreviousPage() ? 'bg-gray-300' : 'bg-white'}`} onClick={() => table.previousPage()}>
          <FaChevronLeft />
        </button>
        <button className={`w-[30px] h-[30px] border-[1px] border-gray-300 mx-2 flex justify-center items-center rounded-lg border-box ${!table.getCanNextPage() ? 'bg-gray-300' : 'bg-white'}`} disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
          <FaChevronRight/>
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
      </div>
    </table>
  );
};

export default Table;
