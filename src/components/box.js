import { useState, useContext } from 'react';
import { PositionContext } from '../context';

const BoxComponent = ({_myId}) => {
  const [context, setContext] = useContext(PositionContext);
  // const [id, setId] = useState(Math.floor(Math.random() * 1000));
  const [myId, setId] = useState(_myId ? _myId : Math.floor(Math.random()*100));

  const [color, setColor] = useState("orange");

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  const openBox = () => {
    let el = document.getElementById(myId);
    let xy = getOffset(el);
    let position = {};
    position.X = xy.left;
    position.Y = xy.top;
    position.open = true;
    position.id = myId;

    setContext(position)
  }

  return (
    <>
      <div 
        id={myId}
        style={{
            position: 'relative',
            left: '0',
            right: '0',
            bottom: '50%',
            top: '25%',
            width: '50px',
            height: '50px',
            backgroundColor: color,
            border: 'solid 1px black',
            display: 'inline-block',
            margin: '5px',
            textAlign: 'center',
        }}
        onClick={()=>openBox()}
      >
        {/* <span>BOX</span> */}
        <span>{myId}</span>
      </div>
    </>
  )
}

export default BoxComponent;