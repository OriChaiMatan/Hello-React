const { useState, useEffect } = React
import { watcherService } from "../services/watcher.service.js"  

export function WatchersApp() {
    const [watchers, setWatchers] = useState([]) 
    const [selectedWatcher, setSelectedWatcher] = useState(null) 

    useEffect(() => {
        loadWatchers()
    }, [])

    async function loadWatchers() {
        const watchers = await watcherService.query()
        setWatchers(watchers)
    }

    async function onRemoveWatcher(watcherId) {
        await watcherService.remove(watcherId)
        setWatchers(prevWatcher => prevWatcher.filter(watcher => watcher.id !== watcherId))
    }

    async function onSelectWatcher(watcherId) {
        const watcher = watchers.find(watcher => watcher.id === watcherId);
        setSelectedWatcher(watcher);
    }

    async function onAddNewWatcher(){
        var nameIput = prompt("Enter your full name")
        var moviesInput = prompt("Enter movies separated by commas:")
        var moviesArray = moviesInput.split(",")

        await watcherService.addWatcher(nameIput, moviesArray)
        
        console.log("New watcher add:",nameIput , moviesArray)

        loadWatchers()
    }

    function onCloseWatcherDetails() {
        setSelectedWatcher(null); // Set selectedWatcher back to null to close the watcher details
    }

    if (!watchers) return <div>Loading..</div>
    return (
        <section className="watchers-app">
            <h2>List of watcher</h2>
            <button onClick={onAddNewWatcher}>Add new watcher</button>
            <ul>
                {
                    watchers.map(watcher => <li key={watcher.id}>
                        {watcher.fullname}
                        <button onClick={() => onRemoveWatcher(watcher.id)}>X</button>
                        <button onClick={() => onSelectWatcher(watcher.id)}>Select</button>
                    </li>)
                }
            </ul>
            <div className="slected-watcher">
                {selectedWatcher && (
                    <div>
                        <h3>Selected Watcher</h3>
                        <p>Fullname: {selectedWatcher.fullname}</p>
                        <p>Movies:</p>
                        <ul>
                            {selectedWatcher.movies.map((movie, index) => (
                                <li key={index}>{movie}</li>
                            ))}
                    </ul>
                    <button onClick={onCloseWatcherDetails}>Close</button>
                    </div>
                )}
            </div>
        </section>
    )
}