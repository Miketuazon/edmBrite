import React from 'react';
import "./404.css"
function NotFoundPage() {
  return (
      <div className="error-page">
        <div className="error-details">
          <h1 className='error-404'>404</h1>
          <h2>Sorry, you must be lost. Click below to go back!</h2>
          <a href="/events" className="btn-go-home">
            GO BACK HOME
          </a>
        </div>
      </div>
  );
}

export default NotFoundPage;
