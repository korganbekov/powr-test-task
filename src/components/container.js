import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import GroupButtonsComponent from './group-buttons';
import BoxComponent from './box';
import { ItemsContext } from '../context';

const ContainerComponent = ({_myId, _parentId, _children }) => {
    const [children, setChildren] = useState(_children ? _children : []);
    const [myId, setId] = useState(_myId ? _myId : Math.floor(Math.random()*100));

    const [items, setItems] = useContext(ItemsContext);

    useEffect(()=>{
      console.log('useEffect.Items', items);
    }, [items]);

    const handleBoxButtonClick = () => {
      // console.log('handleBoxButtonClick');
      const id=Math.floor(Math.random()*1000)
      const el=<BoxComponent key={id} _myId={id} _parentId={myId} /> 
      setChildren([...children, el]);

      setItems([...items, {
        id: id, 
        type: 'box',
        color: 'orange',
        parentId: myId,}
      ])
    }
  
    const handleContainerButtonClick = () => {
      // console.log('handleContainerButtonClick');
      const id=Math.floor(Math.random()*1000)
      setChildren([...children, 
        <ContainerComponent 
          key={id}
          _myId={id}
          _parentId={myId}
        />
      ]);  
      
      setItems([...items, {
        id: id, 
        type: 'container',
        items: [],
        parentId: myId
        // parent: parent
      }])
    }

    return (
      <span 
        id={myId}
        style={{
          position: 'relative',
          display: 'inline-block',
          backgroundColor: '#00FF7F',
          margin: '5px',
          border: 'solid 1px black',
          padding: '0',
        }}
      >
        { children.map((item, index) => item) }
        <span>{myId}</span>
        <GroupButtonsComponent 
            handleBoxButtonClick={handleBoxButtonClick}
            handleContainerButtonClick={handleContainerButtonClick}
        />
      </span>
    );
} 

export default ContainerComponent;