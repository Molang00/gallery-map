import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableView from '../../componet/tableView/tableView';
import { baseUrl } from '../../config/api';
import BoardModel from './model/boardModel';

const Board: React.FC = props => {
  const [ready, setReady] = useState(false);
  const [responseData, setResponseData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const endPoint = '/board';
    const response = await axios.get(baseUrl + endPoint);
    console.log(response.data.data);
    setResponseData(response.data.data);
    setReady(true);
  };

  const handleClickRow = (e, rowData) => {
    goDetail(rowData);
  };

  const goDetail = data => {
    // props.history.push({
    //   pathname: "/monitoring/timegap/detail",
    //   state: {
    //     detail: data,
    //     date: formatDate(searchDate, queryDateFormat)
    //   }
    // })
  };

  const columns = [
    {
      id: 'id',
      name: 'No',
    },
    {
      id: 'title',
      name: '제목',
    },
    {
      id: 'writer',
      name: '작성자',
    },
    {
      id: 'updated',
      name: '갱신일시',
    },
    {
      id: 'readCnt',
      name: '읽음',
    },
  ];

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div>
      <h1 id="title">게시판</h1>
      <TableView
        columns={columns}
        responseData={responseData}
        ready={ready}
        onPageChange={setCurrentPage}
        onClickRow={handleClickRow}
      />
    </div>
  );
};

export default Board;
