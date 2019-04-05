import React from 'react';
import { Link } from 'react-router-dom';

export default function() {
  return (
    <div>
      <h2>Sorry this page does not exist</h2>
      <Link to="/">Return to home page</Link>
    </div>
  );
}