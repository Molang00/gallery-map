import React from 'react';
import TableBT from 'react-bootstrap/Table';

const Table = props => {
  const { itemsCount, pageSize, currentPage, columns, dataSet, onClickRow } =
    props;

  const handleClick = (e, data) => {
    if (onClickRow == undefined) {
      console.log('event : ', e);
      console.log('table row data : ', data);
    } else {
      onClickRow(e, data);
    }
  };

  return (
    <TableBT striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          {columns.map(column => {
            return <th key={column.id}>{column.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSet.map((data, index) => (
          <tr onClick={e => handleClick(e, data)}>
            <td key={index} width={'5%'}>
              <pre>{itemsCount - pageSize * (currentPage - 1) - index}</pre>
            </td>
            {columns.map((column, idx) => {
              return (
                <td key={column.id + '-' + idx} width={column.width}>
                  <pre>{data[column.id]}</pre>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </TableBT>
  );
};

export default Table;
