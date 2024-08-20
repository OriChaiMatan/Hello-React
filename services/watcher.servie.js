import { storageService } from './async-storage.service';

const WATCHERS_KEY = 'watchers';

export const WatcherService = {
  async getAllWatchers() {
    try {
      const watchers = await storageService.query(WATCHERS_KEY);
      return watchers || [];
    } catch (error) {
      console.error('Error getting watchers:', error);
      return [];
    }
  },

  async addWatcher(newWatcher) {
    try {
      newWatcher = { ...newWatcher, id: _makeId() };
      const watchers = await this.getAllWatchers();
      watchers.push(newWatcher);
      await storageService.put(WATCHERS_KEY, watchers);
      return newWatcher;
    } catch (error) {
      console.error('Error adding watcher:', error);
      return null;
    }
  },

  async removeWatcher(watcherId) {
    try {
      const watchers = await this.getAllWatchers();
      const updatedWatchers = watchers.filter(watcher => watcher.id !== watcherId);
      await storageService.put(WATCHERS_KEY, updatedWatchers);
      return updatedWatchers;
    } catch (error) {
      console.error('Error removing watcher:', error);
      return null;
    }
  },

  async updateWatcher(updatedWatcher) {
    try {
      const watchers = await this.getAllWatchers();
      const idx = watchers.findIndex(watcher => watcher.id === updatedWatcher.id);
      if (idx === -1) throw new Error(`Update failed, cannot find entity with id: ${updatedWatcher.id} in: ${WATCHERS_KEY}`);
      watchers.splice(idx, 1, updatedWatcher);
      await storageService.put(WATCHERS_KEY, watchers);
      return updatedWatcher;
    } catch (error) {
      console.error('Error updating watcher:', error);
      return null;
    }
  }
};


