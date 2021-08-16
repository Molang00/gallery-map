import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TableView from '../../componet/tableView/tableView';
import { baseUrl } from '../../config/api';
import { datetimeStrToDate, formatDate } from '../../util/DatetimeUtil';
import BoardModel from './model/boardModel';
import { Button } from 'react-bootstrap';
import './board.css';

const Board: React.FC = () => {
  const history = useHistory();
  const [ready, setReady] = useState(false);
  const [responseData, setResponseData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const getBoardList = async () => {
    const endPoint = '/board?page=' + currentPage;
    const response = await axios.get(baseUrl + endPoint);

    const datetimeFormat = 'yyyy-MM-DD HH:mm:ss';
    const dateFormat = 'yyyy-MM-DD';
    const timeFormat = 'HH:mm:ss';
    const today = formatDate(new Date(), dateFormat);

    response.data.items.map(it => {
      const createdDate = formatDate(it.created, datetimeFormat);
      console.log(createdDate.startsWith(today));
      if (createdDate.startsWith(today))
        it.created = formatDate(it.created, timeFormat);
      else it.created = formatDate(it.created, dateFormat);
    });
    setResponseData(response.data);
    setReady(true);
  };

  const handleClickRow = (e, rowData) => {
    goDetail(rowData);
  };

  const goDetail = (data: BoardModel) => {
    history.push({
      pathname: '/board/' + data.id,
      state: {
        board: data,
      },
    });
  };

  const handleWriteBoard = () => {
    history.push({
      pathname: '/board/write',
    });
  };

  const columns = [
    {
      id: 'title',
      name: '제목',
      width: '50%',
    },
    {
      id: 'writer',
      name: '작성자',
      width: '10%',
    },
    {
      id: 'created',
      name: '작성일',
      width: '10%',
    },
    {
      id: 'readCnt',
      name: '조회수',
      width: '5%',
    },
  ];

  useEffect(() => {
    getBoardList();
  }, [currentPage]);

  return (
    <div>
      <div className="board-header">
        <h2 className="board-title">게시판</h2>
        {/* <Button className="board-write" onClick={handleWriteBoard}>
          글쓰기
        </Button> */}
      </div>
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
