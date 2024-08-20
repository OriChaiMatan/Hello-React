import { GetAnimalsList } from "./AnimalsList.jsx"
import { GetSeasonClock } from "./SeasonClock.jsx"
import { CountDown } from "./CountDown.jsx"
import { MouseMonitor } from "./MouseMonitor.jsx"
import { WatchersApp } from "./WatchersApp.jsx"
import { Home } from "./Home.jsx"

const { useState, useEffect } = React

export function App() {
  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
        case 'home':
            return <Home />
        case 'clock':
            return <GetSeasonClock />
        case 'animals':
            return <GetAnimalsList />
        case 'countdown':
            return <CountDown startFrom={10} onDone={()=>{ 
                console.log('Done!') 
                }}  />
        case 'watcher-app':
            return <WatchersApp />
        case 'mouse-monitor':
            return <MouseMonitor />
        default:
            return <Home />
    }
  };

  return (
    <div>
        <div className="navbar">
            <button onClick={() => setPage('home')}> Home</button>
            <button onClick={() => setPage('clock')}>Season Clock</button>
            <button onClick={() => setPage('animals')}>Animals list</button>
            <button onClick={() => setPage('countdown')}>Countdown</button>
            <button onClick={() => setPage('watcher-app')}>Watcher App</button>
            <button onClick={() => setPage('mouse-monitor')}>Mouse monitor</button>
        </div>
        <div>
            {renderPage()}
        </div>
    </div>
   )
}



