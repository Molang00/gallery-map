import React from 'react';
import TableBT from 'react-bootstrap/Table';

const Table = props => {
  const { columns, dataSet, onClickRow } = props;

  const handleClick = (e, data) => {
    if (onClickRow == undefined) {
      console.log('event : ', e);
      console.log('table row data : ', data);
    } else {
      onClickRow(e, data);
    }
  };

  console.log(dataSet);

  return (
    <TableBT striped bordered hover>
      <thead>
        <tr>
          {columns.map(column => {
            return <th key={column.id}>{column.name}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSet.map(data => (
          <tr onClick={e => handleClick(e, data)}>
            {columns.map((column, idx) => {
              return (
                <td key={column.id + '-' + idx}>
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
