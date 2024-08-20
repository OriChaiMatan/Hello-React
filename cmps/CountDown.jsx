const { useState, useEffect, useRef } = React

export function CountDown({ startFrom, onDone }) {
    const [seconds, setSeconds] = useState(startFrom);
    const [closeToEnd, setcloseToEnd] = useState(false)

    const intervalIdRef = useRef();

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setSeconds(prevSec => {
                if (prevSec - 1 === 0){
                    onDone()
                    return 0
                }
                if(prevSec == 0) {
                    return 0
                }
                return prevSec - 1
            });
        }, 1000);
    }, []);

    useEffect(()=>{
        if (seconds <= 6) {
            setcloseToEnd(true)
        }
    },[seconds]) 

    return <span className={"count-down" + (closeToEnd ? ' closeToEnd' : '')}>{seconds.toLocaleString()}</span>;
}
