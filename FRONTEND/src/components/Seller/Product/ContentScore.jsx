import React from 'react';

function ContentScore({ completed }) {
  const percentage = (completed / 4) * 100;
  return (
    <div>
      <h1>Content Score</h1>
      <div style={{ height: "10px", background: "#ddd", borderRadius: "5px" }}>
        <div style={{
          width: `${percentage}%`,
          background: "blue",
          height: "100%",
          borderRadius: "5px"
        }}></div>
      </div>
      <p>{Math.round(percentage)}% Complete</p>
    </div>
  );
}

export default ContentScore;
