import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { baseUrl } from '../../../config/api';
import { formatDate } from '../../../util/DatetimeUtil';
import BoardModel from '../model/boardModel';
import './boardDetail.css';

const BoardDetail: React.FC = () => {
  const history = useHistory();
  interface paramsIF {
    id: string;
  }
  const params: paramsIF = useParams();
  const [board, setBoard] = useState<BoardModel>();
  const [ready, setReady] = useState(false);

  console.log(params.id);
  const getBoardItem = async () => {
    const endPoint = '/board/' + params.id;
    const response = await axios.get(baseUrl + endPoint);
    setBoard(response.data);
    setReady(true);
  };

  useEffect(() => {
    getBoardItem();
  }, []);

  if (ready && board != undefined) {
    return (
      <>
        <h2 className="board-detail-title">게시판 상세</h2>
        <Table bordered>
          <tbody>
            <tr>
              <th className="board-title tag">제목</th>
              <td className="board-title value" width={'75%'}>
                {board?.title}
              </td>
            </tr>
            <tr>
              <th className="read-cnt  tag">조회수</th>
              <td className="read-cnt value">{board?.readCnt}</td>
            </tr>
            <tr>
              <th className="writer  tag">작성자</th>
              <td className="writer value">{board?.writer}</td>
            </tr>
            <tr>
              <th className="created  tag">작성일</th>
              <td className="created value">
                {formatDate(board.created, 'yyyy-MM-DD HH:mm:ss')}
              </td>
            </tr>
            <tr>
              <th colSpan={4} className="content  tag">
                내용
              </th>
            </tr>
            <tr>
              <td colSpan={4} className="content value">
                {board.content}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          variant="secondary"
          onClick={() => {
            history.goBack();
          }}
        >
          {' '}
          돌아가기{' '}
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Spinner animation="border" variant="dark" />{' '}
      </>
    );
  }
};

export default BoardDetail;
