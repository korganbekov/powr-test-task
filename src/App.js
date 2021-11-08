import React, { useState, useContext, useEffect } from 'react';
import { useHistory ,useLocation } from 'react-router-dom';
import './App.css';
import ContainerComponent from './components/container';
import BoxComponent from './components/box'
import ColorPickerComponent from './components/color-picker';
import { PositionContext, ItemsContext } from './context';
import { getThemeProps } from '@mui/system';
import axios from 'axios';



let init = `{"type":"container", "items": [{"type":"box"}, {"type":"container", "items": [{"type":"box","color":"green"},{"type":"box","color":"green"}]}]}`;

const App = ({text_json}) => {
  const [context, setContext] = useState({ X:0, Y:0, open: false });
  const [items, setItems] = useState([{ id: 9999, type: "container", items: [] }]);
  const [element, setElement] = useState(null);
  
  const [color, setColor] = useState("orange");
  const [search , setSearch] = useState(999);
  const [jsonObj, setObj] = useState(null);

  const [jsonPart2, setJsonPart2] = useState(init);
  const divRef = React.useRef();
  
  const [children, setChildren] = useState([]);
  
  const printObject = (obj) => {
    Object.keys(obj).forEach(key => {
      console.log(`key: ${key}, obj[key]:`, obj[key]);
      if (obj[key] instanceof Object)
        printObject(obj[key])
    })
  }

  const getTree = (obj) => {
    console.log('getTree', children);
    
    Object.keys(obj).forEach(key => {
      console.log(`key: ${key}, obj[key]:`, obj[key]);
      if(key === 'type') {
        if(obj[key]==='container') {
          console.log('add container');
          setChildren([...children, <ContainerComponent key={Math.floor(Math.random()*100)}/>]);    
          obj.items.forEach(item => {
            getTree(item)
          })
          // getTree(obj[key])

        }
        if(obj[key] === 'box') {
          console.log('add box');
          setChildren([...children, <BoxComponent key={Math.floor(Math.random()*100)}/>]);
        }
      }
      else {
        console.log(obj[key]);
      }


      
    })
  }

  const doTree = (obj) => {
    Object.keys(obj).forEach(key => {
      console.log('key', key);
      console.log('obj[key]', obj[key]);
      if(Array.isArray(obj[key])){
        obj[key].forEach(item => {
          console.log('item', item);
          if(item && item instanceof Object){
            doTree(item);
          }
        })
      }
    })
  }

  // const [children, setChildren] = useState([]);
  const [htmlElement, renderPart2] = useState(undefined)

  const createJsxElement = (_parentId, _el) => {
    const id=Math.floor(Math.random()*1000)

    if(_el.type === 'box') {
      
      const el=<BoxComponent key={id} _myId={id} _parentId={_parentId} /> 
      setChildren([...children, el]);
      // return <BoxComponent />
    } else if(_el.type === 'container') {
      let el=<ContainerComponent key={id} _myId={id} _parentId={_parentId} _children={<div>qsqwqw</div>}/> 
      // setChildren([...children, el]);
      renderPart2(el)
      const parentHtmlEl = document.getElementById(id);
      console.log(parentHtmlEl);
      // return;

      _el.items.map(item=>{
       parentHtmlEl.append(item.id);
        // setChildren([...children, item]);
        // if(htmlElement){
          
        //   renderPart2(createJsxElement(el.id, item))
        //   parentHtmlEl.append(htmlElement)
        //   renderPart2(parentHtmlEl);
        // }
          
        // else
        //   renderPart2(createJsxElement(el.id, item))
      })  
      setChildren([...children, el]);
    }
  }


  const handlebBuild = () => {
    console.log('handleBuild');

    const obj = JSON.parse(jsonPart2);
    console.log('obj', obj);
    const stroka = JSON.stringify(obj);
    console.log('stroka', stroka);

    renderPart2(createJsxElement(99999999, obj))
    

    return;

    if(obj && obj instanceof Object){
      doTree(obj);
    }

    const child = document.createElement('p');
    child.append('ghjkl;')

    divRef.current.style.width = "200px";
    divRef.current.style.height = "200px";
    divRef.current.style.border = 'solid 1px blue';
    divRef.current.append(child);

    
  }

  useEffect(()=>{
    console.log('useEffect.Obj', jsonObj);
  }, [jsonObj]);

  const getElementInArray = (arr, id) => {
    arr.forEach(element => {
      getElement(element, id);
    })
  }

  const newGetElement = () => {
    setElement(items.filter(el=>el.id == search)[0]);
  }

  const getElement = (obj) => {
    if (obj instanceof Object){
      if (obj.id == search) {
        setElement(obj);
        return obj;
      }
    }

    if(obj.type==='container'){
      getElementInArray(obj.items, search);
    }
  }

  const handleChangeValue = (event) => {
    setSearch(event.target.value);
  }

  const doneArr = (obj, arr=[...items]) => {

    if(!obj.items)
      obj.items = [];
    
    const currentArr = arr.filter(el => el.parentId == obj.id);
    // let _doneArr = [..._doneArr, ...currentArr];
    let nextArr = arr.filter(ar => !currentArr.find(rm => (rm.id === ar.id) ))
    
    currentArr.forEach((item) => {
      // if(obj.items.filter(el=>el.id==item.id).length===0){
        if(item.type === 'box') {
          obj.items.push(item);
        }
        else if (item.type === 'container') {
          let _obj = doneArr(item, nextArr);
          obj.items.push(item);
        }
      // }
    })
  }

  const arrayToJson = (obj = {...items[0]}) => {
    setObj(null);
    obj.items = [];

    doneArr(obj);
    setObj(obj);
  }

  const save = (obj) => {
    const el = document.getElementById("divjson");
    let json = obj ? JSON.stringify(obj) : `"{"type":"container", "items": [{"type":"box"}, {"type":"container", "items": [{"type":"box","color":"green"},{"type":"box","color":"green"}]}]}"`;
    let url = `/save?value=${json}`;
    axios.get(url)
      .then(res=>console.log(res));
  }

  return (
    <ItemsContext.Provider value={[items, setItems]}>
      <PositionContext.Provider value={[context, setContext]}>
        <div style={{"margin": "0"}}>
          <h1 style={{textAlign: "center", marginBottom: "20px"}}>POWR TEST-TASK</h1>
          <section>
            <h2 style={{textAlign: "center"}}>Part 1</h2>
            <div
              style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                right: '0',
              }}        
            >
              { context.open && <ColorPickerComponent color={color} /> }
            </div>
            <ContainerComponent _myId={9999} _parentId={9999} _parentJson={{
              id: 9999, type: 'container', parentId: null, parent: null, items: [] 
            }} /> 
          </section>
          <hr />

          <section>
            <h2 style={{textAlign: "center"}}>Part 2</h2>
            <label style={{marginLeft: "10px"}}>JSON:
              <input 
                  type="text" 
                  value={init}
                  readOnly
                  style={{width: "1000px", border: "solid 1px black", marginLeft: "10px"}}
              />
            </label>
            <div>
              children: { children.map((item, index) => item) }
            </div>
            <div>HTMLElement: {htmlElement}</div>
            <button 
              onClick={handlebBuild}
              // style={{
              //   border: "solid 1px black", 
              //   width:"50px", 
              //   height: "50px",
              //   borderRadius: "20%", 
              //   marginLeft: "10px",
              //   backgroundColor: "black",
              //   color: "#fff" }}
            >Build</button>
            <div
              ref={divRef} 
              id="box-part2"
              style={{border: "solid 1px red"}}
            >Some text</div>
          </section>

          <hr />
          <section>
            <h2 style={{textAlign: "center"}}>Part 3</h2>
            <button onClick={()=>arrayToJson()}>Create JSON</button>
            <div id="divjson">JSON:<br /> {JSON.stringify(jsonObj)}</div>
            <button onClick={() => save(jsonObj)}>SAVE</button>
          </section>
        </div>
      </PositionContext.Provider>
    </ItemsContext.Provider>
    
  );
}

export default App;
