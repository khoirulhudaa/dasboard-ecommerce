import { useEffect, useState } from 'react';
import Table from '../../components/table';
import data from './data.json'

const AltPagination = () => {

    const [search, setSearch] = useState("")
   
    useEffect(() => {
      
    }, [search]);

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

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Alt Pagination</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <Table columns={columns} dataTable={data}/>
            </div>
        </div>
    );
};

export default AltPagination;
