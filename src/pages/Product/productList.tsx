import { useEffect, useState } from 'react';
import Table from '../../components/table';

const AltPagination = () => {

    const [search, setSearch] = useState("")
   
    useEffect(() => {
      
    }, [search]);

    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">Alt Pagination</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <Table />
            </div>
        </div>
    );
};

export default AltPagination;
