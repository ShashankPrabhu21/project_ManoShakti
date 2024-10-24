import React from 'react';

function FOMOResult({ result }) {
  return (
    <div className="container">
      <h2>Your FoMO Score: {result.fomo_score}</h2>
      <h3>FoMO Level: {result.fomo_level}</h3>
      <a href="/">Go Back</a>
    </div>
  );
}

export default FOMOResult;
