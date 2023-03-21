import React, {useEffect, useState} from "react";
import Input from './Components/Input.js';
import './App.css';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [date, setDate] = useState('');
  const [trusted, setTrusted] = useState([]);
  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates='+date)
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setPosts(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 {/* add date as dependency to update the api call when date changes*/}
 }, [date]);
  return (
    <div>
      <Input
        type='date'
        label='Date: '
        onChange={e => setDate(e.target.value.replaceAll('-', ''))}
      />
      <label>Trusted:</label>
      <select onChange={e => setTrusted(e.target.value)}>
        <option>Kansas</option>
        <option>Duke</option>
        <option>Texas</option>
      </select>
      <div>{date}</div>
      <div>{trusted}</div>
      {Object.keys(posts.events).map((game, index) => (
        <div className={'Scoreboard'} key={index}>
          <div>{posts.events?.[game]?.competitions?.[0]?.competitors?.[0]?.team?.displayName}: {posts.events?.[game]?.competitions?.[0]?.competitors?.[0]?.score}</div>
          <div>{posts.events?.[game]?.competitions?.[0]?.competitors?.[1]?.team?.displayName}: {posts.events?.[game]?.competitions?.[0]?.competitors?.[1]?.score}</div>
          {/* If game not live, show odds */}
          {posts.events?.[game]?.competitions?.[0]?.odds?.[0]?.details && (
            <div>
              <span>Spread: {posts.events?.[game]?.competitions?.[0]?.odds?.[0]?.details}</span>
              <span>Points: {posts.events?.[game]?.competitions?.[0]?.odds?.[0]?.overUnder}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
