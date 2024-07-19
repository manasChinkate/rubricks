import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FollowerItem from './FollowerItem';
import DateFilter from './DateFilter';

const FollowerList = () => {
  const [followers, setFollowers] = useState([]);
  const [filteredFollowers, setFilteredFollowers] = useState([]);

  useEffect(() => {
    axios.get('/twubric.json')
      .then(response => {
        setFollowers(response.data);
        setFilteredFollowers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSort = (criteria) => {
    const sortedFollowers = [...filteredFollowers].sort((a, b) => b[criteria] - a[criteria]);
    setFilteredFollowers(sortedFollowers);
  };

  const handleRemove = (id) => {
    const updatedFollowers = filteredFollowers.filter(follower => follower.id !== id);
    setFilteredFollowers(updatedFollowers);
  };

  const handleFilter = (startDate, endDate) => {
    const filtered = followers.filter(follower => {
      const joinDate = new Date(follower.joined);
      return joinDate >= new Date(startDate) && joinDate <= new Date(endDate);
    });
    setFilteredFollowers(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <DateFilter onFilter={handleFilter} />
      <div className="flex space-x-2 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('twubricScore')}>Sort by Twubric Score</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('friends')}>Sort by Friends</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('influence')}>Sort by Influence</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('chirpiness')}>Sort by Chirpiness</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFollowers.map(follower => (
          <FollowerItem key={follower.id} follower={follower} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default FollowerList;
