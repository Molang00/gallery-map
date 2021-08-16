import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../config/api';
import EventMessage from './model/eventMessage';
import './eventMessageView.css';

const EventMessageView: React.FC = () => {
  const [messages, setMessages] = useState<EventMessage[]>([]);
  // "2020.06.30 Tue 😍 1st day",
  const [messageId, setMessageId] = useState(-1);
  useEffect(() => {
    if (messageId != -1) {
      const tick = setInterval(() => {
        setMessageId((messageId + 1) % messages.length);
      }, 3000);

      return () => clearInterval(tick);
    }
  }, [messageId]);

  const getEventMessages = async () => {
    const endPoint = '/event-message';
    const response = await axios.get(baseUrl + endPoint);
    console.log('hi');
    console.log(response);
    setMessages(response.data);
    setMessageId(0);
  };
  useEffect(() => {
    getEventMessages();
  }, []);

  return (
    <>
      {messageId != -1 ? (
        <div className="message">
          <div className="message-content">{messages[messageId].message}</div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default EventMessageView;
