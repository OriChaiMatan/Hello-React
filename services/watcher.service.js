import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const WATCHER_KEY = 'watcherDB'
_createWatchers()

export const watcherService = {
    query,
    get,
    remove,
    save,
    getEmptyWatcher,
    getNextWatcherId,
    addWatcher
}

function query() {
    return storageService.query(WATCHER_KEY)
}

function get(watcherId) {
    return storageService.get(WATCHER_KEY, watcherId)
}

function remove(watcherId) {
    return storageService.remove(WATCHER_KEY, watcherId)
}

function save(watcher) {
    if (watcher.id) {
        return storageService.put(WATCHER_KEY, watcher)
    } else {
        return storageService.post(WATCHER_KEY, watcher)
    }
}

function getEmptyWatcher(fullname = '', movies ) {
    return { id: '', fullname, movies }
}


function getNextWatcherId(watcherId) {
    return storageService.query(WATCHER_KEY)
        .then(watchers => {
            var idx = watchers.findIndex(watcher => watcher.id === watcherId)
            if (idx === watchers.length - 1) idx = -1
            return watchers[idx + 1].id
        })
}

async function addWatcher(fullname, movies) {
    const watcher = _createWatcher(fullname, movies)
    const addedwWatcher = await storageService.post(WATCHER_KEY, watcher)
    return addedwWatcher
}

function _createWatcher(fullname, movies) {
    const watcher = getEmptyWatcher(fullname, movies)
    watcher.id = utilService.makeId()
    return watcher
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(WATCHER_KEY)
    if (!watchers || !watchers.length) {
        watchers = []
        watchers.push(createWatcher('Ori Chai Matan', ['Surfs-Up', 'Big wednesday', 'Chasing Mavericks' ]))
        watchers.push(createWatcher('The Rock', ['Jumanji', 'Need for speed' ]))
        watchers.push(createWatcher('Bob Marley', ['No woman no cry', 'I shot the sheriff', 'One love', 'three little birds', 'Jamming' ]))
        watchers.push(createWatcher('Donald Trump', ['Avengers ', 'spiderman', 'Superman', 'The Jocker' ]))
        utilService.saveToStorage(WATCHER_KEY, watchers)
    }
}

