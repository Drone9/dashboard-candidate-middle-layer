import React, { useEffect, useState } from 'react';


import './table.css';
import Spinner from '../Spinner';

const Table = ({
  data,
  column,
  redirectTo,
  handleScroll,
  loading,
  totalRecords,
  onSortedList
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  useEffect(() => {
    const sorted = sortedData();
    onSortedList(sorted);
  }, [sortConfig]);
  
  const cellStyle = {
    width: `${100 / column?.length}%`,
    padding: '12px',
    fontSize:'15px'
  };

  return (
    <div>
      <div className='list-body' onScroll={handleScroll}>
        <table className='table custom-table'>
        <thead>
          <tr className='header-row'>
          {column.map((tableHead,index) => {
            return(
              <th key={index} style={cellStyle}>
                {tableHead.HeadCell ? (
                  tableHead.HeadCell({ value: tableHead.heading,row:data[index] })
                ) : (
                  <div  onClick={() => handleSort(tableHead.accessor)} className='heading-container'>
                    {tableHead.heading}
                    {/* <img src = {`${ASSET_URL}/arrows-down-up-gray.png`} /> */}
                  </div>
                )}
              </th>
            );
          })}
          </tr>
        </thead>
        <tbody className='table-body'>
          {
            data?.length > 0 ? (
              data.map((row,index) => {
                return (
                  <tr
                    onClick={redirectTo ? () => redirectTo(row): null}
                    key={index}
                  >
                  {
                    column.map((tableData,index) => {
                      return (
                        <td key={index} style={cellStyle}>
                        {
                          tableData.Cell ? (
                            tableData.Cell({ value: row[tableData.accessor], row })
                          ) : (
                            row[tableData.accessor]
                          )
                        }
                        </td>
                      );
                    })
                  }
                </tr>
                );
                })
            ) : data?.length != 0 ? (
              <tr>
                <td colSpan={12}>
                  <Spinner style={{ position: 'absolute' }} />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={column.length}>
                  <div className='no-data-found'>
                    {/* <img src={`${ASSET_URL}/no-data-found.png`} width={100} height={100} /> */}
                    <p>no_data_found</p>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      </div> 
      
      <div className='result-count-container'>
        {
          loading && <Spinner />
        }
        <div className='result-count'>
          {'Showing results'}:
          &nbsp;
          {data.length}
          &nbsp;
          {'of'}
          &nbsp;
          {totalRecords}
        </div>
      </div>
    </div>
  );
};

export default Table;