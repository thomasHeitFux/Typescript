import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App'

interface AppProps {
  title: string;
}

function Index() {

  return <div>
    <App title={'front'}/>
  </div>;
}


ReactDOM.render(<Index/>, document.querySelector('#root'));