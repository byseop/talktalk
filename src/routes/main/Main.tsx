import React from 'react';

export default function Main() {
  const { REACT_APP_CLIENT_ID } = process.env;
  return (
    <div className="App">
      <div>
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}`}
        >
          로그인???
        </a>
      </div>
    </div>
  );
}