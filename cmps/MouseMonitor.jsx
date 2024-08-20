const { useState, useEffect, useRef } = React

export function MouseMonitor() {
    const [isOn, setIsOn] = useState(true) 
    const [pos, setPos] = useState({ 
        x: 0, 
        y: 0 
    }) 

    useEffect(() => {
        const updatePos = (e) => {
          setPos({
            x: e.clientX,
            y: e.clientY
          });
        };
    
        const addMouseListener = () => {
          document.addEventListener('mousemove', updatePos);
        };
    
        if (isOn) {
          addMouseListener();
        } else {
          document.removeEventListener('mousemove', updatePos);
        }
    }, [isOn]);
    
    const handlePauseClick = () => {
        setIsOn(!isOn);
    };
    
    return (
        <div className="mouse-monitor">
            <h1>Mouse Position:</h1>
            <button onClick={handlePauseClick}>{isOn ? 'Pause' : 'Resume'}</button>
            {isOn && (
                <div>
                    x: {pos.x}, y: {pos.y}
                </div>
            )}
        </div>
    );
}