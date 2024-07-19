import React from 'react';

const FollowerItem = ({ follower, onRemove }) => {
  const { username, image, fullname, twubric, join_date } = follower;
  const joinDate = new Date(join_date * 1000).toLocaleDateString();

  return (
    <div className="bg-white shadow-md rounded p-4">
      <div className="flex items-center mb-4">
        <img className="w-16 h-16 rounded-full mr-4" src={image} alt={username} />
        <div>
          <p className="text-lg font-semibold">{fullname}</p>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>
      <p><strong>Twubric Score:</strong> {twubric.total}</p>
      <p><strong>Friends:</strong> {twubric.friends}</p>
      <p><strong>Influence:</strong> {twubric.influence}</p>
      <p><strong>Chirpiness:</strong> {twubric.chirpiness}</p>
      <p><strong>Joined:</strong> {joinDate}</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => onRemove(follower.uid)}
      >
        Remove
      </button>
    </div>
  );
};

export default FollowerItem;
