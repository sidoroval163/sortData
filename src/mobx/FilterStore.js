import { makeAutoObservable } from 'mobx';

class FilterStore {
  filterSet = { date: '', supervisor: '', merchandiser: [], project: '' };
  constructor() {
    makeAutoObservable(this);
  }

  setFilterableValues = (obj) => {
    this.filterSet = obj;
  };
}

export default new FilterStore();
