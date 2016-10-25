import React from 'react';
import ReactDOM from 'react-dom';
require('es6-promise').polyfill();
require('isomorphic-fetch');

var EnvManager = React.createClass({


render: function(){
    return (
      <div>
        <h1 className="headings" id="heading"> Working </h1>
      </div>
    )
  }
});

ReactDOM.render(
  <EnvManager />, document.getElementById('content')
);
