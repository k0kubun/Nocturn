import React from 'react';
import { render } from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return(
      <div className="hello">
        Hello World
      </div>
    );
  }
}

render(
  <HelloWorld />,
  document.getElementById('root')
)
