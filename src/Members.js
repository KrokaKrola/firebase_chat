import React from 'react';
import useCollection from './UseCollection';

const Members = ({ channelId }) => {
  const members = useCollection('users', undefined, [
    `chanels.${channelId}`,
    '==',
    true
  ]);
  console.log(members);
  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map(member => (
          <div key={member.uid} className="Member">
            <div className={`MemberStatus ${member.status.state}`} />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

function sortByName(a, b) {
  return a.displayName > b.displayName
    ? 1
    : a.displayName < b.displayName
    ? -1
    : 0;
}

export default Members;
