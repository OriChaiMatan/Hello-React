import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React

export function GetSeasonClock(){

    const [isDark, setIsDark] = useState(false);
    const [date, setDate] = useState(new Date())

    const intervalIdRef = useRef()

    useEffect(() => {
      intervalIdRef.current = setInterval(() => {
            setDate(new Date());
        }, 1000);
    }, []); 

    const currentDate = new Date();

    const toggleIsDark = () => {
        setIsDark(prevIsDark => !prevIsDark);
      };

      return (
        <div
          onClick={toggleIsDark}
          className={"season-container" + (isDark ? ' dark' : '')}
        >
          <p>Month: {utilService.getMonthName(currentDate)} ({utilService.getSeason(currentDate)})</p>
          <img src={`assets/seasons/${utilService.getSeason(currentDate)}.png`} alt=""/>
          <p>Day: {utilService.getDayName(currentDate)}</p>
          <span>{date.toLocaleString()}</span>
        </div>
      );
      
}

