import React, {useState} from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import './App.css';


function getUpdateDate(date) {
  let result;
  let curDate = '2018-03-03T12:46:00+03:00';     //   Date.now() or '2018-03-03T12:46:00+03:00'
  const timeDifference = moment(curDate) - moment(date);

  if (timeDifference >= 86400000) result = `${Math.floor(timeDifference / 86400000)} дней назад`;
  if (timeDifference < 86400000) result = `${Math.floor((timeDifference / 3600000) % 24)} часов назад`;
  if (timeDifference < 3600000) result = `${Math.floor((timeDifference / 60000) % 60)} минут назад`;
  return result;
}

function DateTime(props) {
  return (
    <p className="date">{props.date}</p>
  );
};

function DateTimePretty(Component, props) {
  const newDateTime = getUpdateDate(props);

  return class NewDate extends React.Component{
    render() {
      return (
        <Component date={newDateTime}/>
      )
    };
  };
};

function Video(props) {
  const UpdateDateTime = DateTimePretty(DateTime, props.date);

  return (
    <div className="video">
      <iframe src={props.url} allow="autoplay; encrypted-media" allowfullscreen></iframe>
      <UpdateDateTime/>
    </div>
  );
};

function VideoList(props) {
  return props.list.map((item, i) => <Video url={item.url} date={item.date} key={i}/>);
};

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/MB80ZuIJATI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 09:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
    <VideoList list={list} />
  );
};
