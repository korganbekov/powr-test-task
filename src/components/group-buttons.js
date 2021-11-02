import { useRef } from 'react';

const GroupButtonsComponent = ({ handleBoxButtonClick, handleContainerButtonClick }) => {
    const boxButtonRef = useRef(null);
    const containerButtonRef = useRef(null);

    const handleAddClick = () => {
        if(boxButtonRef.current.style.display === 'block')
            boxButtonRef.current.style.display = 'none';
        else
            boxButtonRef.current.style.display = 'block';

        if(containerButtonRef.current.style.display === 'block')
            containerButtonRef.current.style.display = 'none';
        else
            containerButtonRef.current.style.display = 'block';
    }

    return (
        <div 
            style={{
                position: 'static',
                width: '60px',
                height: '50px',
                display: 'inline-block',
                margin: '5px',
            }}
        >
            <button
                style={{
                    position: 'relative',
                    left: '0',
                    right: '0',
                    bottom: '50%',
                    top: '25%',
                    margin: 'auto',
                    width: '60px', height: '25px',
                    backgroundColor: 'grey',
                    border: 'solid 1px black',
                    display: 'block',
                    borderRadius: "5%", 
                }}
                onClick={handleAddClick}
            >
                <span>Add</span>
    
                <button
                    ref={boxButtonRef}
                    style={{
                        position: 'absolute',
                        left: '-40px',
                        top: '-20px', 
                        width: '60px', height: '25px',
                        backgroundColor: 'green',
                        border: 'solid 1px black',
                        display: 'none',
                        borderRadius: "5%", 
                        fontSize: '10px',
                    }}
                    onClick={handleBoxButtonClick}
                >Box</button>
    
                <button
                    ref={containerButtonRef}
                    style={{
                        position: 'absolute',
                        right: '-40px',
                        top: '-20px',
                        width: '60px', height: '25px',
                        backgroundColor: 'yellow',
                        border: 'solid 1px black',
                        display: 'none',
                        borderRadius: "5%", 
                        fontSize: '10px',
                        padding: '0',
                        zIndex:'99'
                    }}
                    onClick={handleContainerButtonClick}
                >Container</button>
            </button>
        </div>
    )
}

export default GroupButtonsComponent;