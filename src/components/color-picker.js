import { SketchPicker, BlockPicker  } from "react-color";
import { PositionContext, ItemsContext } from "../context";
import { useContext } from "react";

const ColorPickerComponent = ({ color }) => {
    const [context, setContext] = useContext(PositionContext);
    const [items, setItems] = useContext(ItemsContext);

      
    const handleChangeComplete = (color) => {
        const elem = document.getElementById(context.id);
        elem.style.backgroundColor=color.hex;
        setContext({...context, open: false});
        
        let item = items.filter(el => el.id==elem.id)[0];
        item.color = color.hex;
        setItems(items);
    };

    return (
        <div
            id="color-picker"
            style={{
                position: 'fixed',
                left: `${context.X}px`,
                top: `${context.Y}px`
            }}
        >
            <SketchPicker 
                color={color}
                onChangeComplete={handleChangeComplete}
                triangle="hide"
            />
        </div>
    )
}

export default ColorPickerComponent;