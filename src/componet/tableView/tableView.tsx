import React from 'react';
import { Spinner } from 'react-bootstrap';
import Pagination from './pagination/pagination';
import Table from './table/table';

import './tableView.css';

const TableView = props => {
  const { ready, columns, responseData, onPageChange, onClickRow } = props; // 각각 아이템(영화목록) 개수, 한 페이지에 보여줄 아이템(영화목록) 개수

  if (!ready) {
    return (
      <>
        <Spinner animation="border" variant="dark" />{' '}
      </>
    );
  } else {
    return (
      <div id="table-view">
        <Table
          columns={columns}
          dataSet={responseData}
          onClickRow={onClickRow}
        />

        <br />
        {/* <Pagination
          itemsCount={responseData.meta.totalItems}
          pageSize={responseData.meta.itemsPerPage}
          currentPage={responseData.meta.currentPage}
          onPageChange={onPageChange}
        /> */}
      </div>
    );
  }
};

export default TableView;
