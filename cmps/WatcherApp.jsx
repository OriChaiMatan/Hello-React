import React, { useEffect, useState } from 'react';
import WatcherService from './watcher.service';

function WatcherComponent() {
  const [watchers, setWatchers] = useState([]);
  const [newWatcherName, setNewWatcherName] = useState('');

  useEffect(() => {
    async function fetchWatchers() {
      const allWatchers = await WatcherService.getAllWatchers();
      setWatchers(allWatchers);
    }
    fetchWatchers();
  }, []);

  const handleAddWatcher = async () => {
    if (newWatcherName.trim() === '') return;
    const newWatcher = { id: '', fullname: newWatcherName, movies: [] };
    const addedWatcher = await WatcherService.addWatcher(newWatcher);
    if (addedWatcher) {
      setWatchers(prevWatchers => [...prevWatchers, addedWatcher]);
      setNewWatcherName('');
    }
  };

  const handleRemoveWatcher = async (watcherId) => {
    const updatedWatchers = await WatcherService.removeWatcher(watcherId);
    if (updatedWatchers) {
      setWatchers(updatedWatchers);
    }
  };

  return (
    <div>
      <h2>Watchers</h2>
      <ul>
        {watchers.map(watcher => (
          <li key={watcher.id}>
            {watcher.fullname}
            <button onClick={() => handleRemoveWatcher(watcher.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newWatcherName}
          onChange={(e) => setNewWatcherName(e.target.value)}
          placeholder="Enter watcher name"
        />
        <button onClick={handleAddWatcher}>Add Watcher</button>
      </div>
    </div>
  );
}

export default WatcherComponent;
