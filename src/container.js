import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import GroupButtonsComponent from './group-buttons';
import BoxComponent from './box';
import { DataContext, ElementContext } from '../context';

const ContainerComponent = ({_myId, _parentId }) => {
    const [children, setChildren] = useState([]);
    const [myId, setId] = useState(_myId ? _myId : Math.floor(Math.random()*100));
    // const [parentId, setParentId] = useState(_parentId ? _parentId : Math.floor(Math.random()*100));
    const [parentId, setParentId] = useState(_parentId);
    

    const [dataContext, setData] = useContext(DataContext);
    const [element, setElement] = useContext(ElementContext);


    // console.log('ContainerComponent._myId', _myId);
    // console.log('ContainerComponent.myId', myId);

    useEffect(()=>{
      console.log('useEffect', element);
    }, [element]);

    const getElementInArray = (arr, id) => {
      arr.forEach(element => {
        getElement(element, id);
      })
    }

    const getElement = (obj, id) => {
      if (obj instanceof Object){
        if (obj.id === id) {
          setElement(obj);
          console.log('getElement.myId', myId);
          console.log('getElement.id', id);
          console.log('getElement.obj', obj);
          console.log('getElement.Element', element);
          return obj;
        }
      }

      if(obj.type==='container'){
        getElementInArray(obj.items, id);
      }
    }

    const handleBoxButtonClick = () => {
      // console.log('handleBoxButtonClick');
      const id=Math.floor(Math.random()*1000)
      const el=<BoxComponent key={id} _myId={id} _parentId={myId} /> 
      setChildren([...children, el]);

      console.log('handleBoxButtonClick.ParentId', myId);
      let parent = getElement(dataContext, myId);
      console.log('handleBoxButtonClick.Element', element);
      console.log('handleBoxButtonClick.Parent', parent);
      if(!element.items)
        parent.items = [];

      element.items.push({
        id: id, 
        type: 'box',
        color: 'orange',
        parentId: myId,
      });

      setData(dataContext);

      console.log('dataContext', dataContext)
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
      
      console.log('handleContainerButtonClick.ParentId', myId);
      let parent = getElement(dataContext, myId);
      console.log('handleContainerButtonClick.Element', element);
      element.items.push({
        id: id, 
        type: 'container',
        items: [],
        parentId: myId
        // parent: parent
      });

      setData(dataContext);
      console.log('dataContext', dataContext)
      
    }

    // { console.log('children', children) }
  
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
        <GroupButtonsComponent 
            handleBoxButtonClick={handleBoxButtonClick}
            handleContainerButtonClick={handleContainerButtonClick}
        />
      </span>
    );
} 

export default ContainerComponent;