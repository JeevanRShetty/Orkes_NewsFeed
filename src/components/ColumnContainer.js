// MyComponent.js
import React from 'react';
import { useMachine } from '@xstate/react';
import feedDataMachine from '../machines/feedDataMachine';
import { useEffect } from 'react';
import ColumnCard from './ColumnCard'
import Shimmer from './Shimmer'

const ColumnContainer = () => {
  const [state, send] = useMachine(feedDataMachine);

  useEffect(() => {
    send({ type: "FETCH"})
  },[])

  useEffect(() => {
    const handleScroll = () => {
    const isAtEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (isAtEnd) {
        send({ type: "INCREMENT_PAGE"})
      }
    };
    window.addEventListener('scroll', handleScroll);
  
    // Cleaning up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]); 

  return state.context.feedData?.length === 0 ?  <Shimmer /> : (
    <div className="App" >
      {
        state.context.feedData?.map((node, index) => ( <ColumnCard key={index} colData={node}/>))
      }
    </div>
  );
};

export default ColumnContainer;
