import { DateTime } from 'luxon';
import { makeAutoObservable } from 'mobx';
import { checkFieldsInObject } from '../helpers';
import cards from '../consts/cards';


class CardStore {
  filterSet = { date: '', supervisor: '', merchandiser: [], project: '' };
  constructor(cards) {
    makeAutoObservable(this);
    this.cards = cards;
  }
  setFilterableValues = (obj) => {
    this.filterSet = obj;
  };

  get filteredCards() {
    const filterSet = this.filterSet;
    let result = this.cards;

    if (
      checkFieldsInObject(filterSet, [
        'date',
        'supervisor',
        'merchandiser',
        'project'
      ])
    ) {
      return result
    }

    if (filterSet.supervisor) {
      result = result.filter(({ supervisor }) =>
        supervisor === filterSet.supervisor
      );
    }

    if (filterSet.merchandiser.length) {
      result = result.filter(({ merchandiser }) =>
        filterSet.merchandiser.includes(merchandiser)
      );

    }

    if (filterSet.project) {
      result = result.filter(({ projects }) =>
        projects.includes(filterSet.project)
      );
    }

    if (filterSet.date) {
      result = result.filter(({ date }) => filterSet.date <= DateTime.fromFormat(date, "dd.LL.yy"));
    }

    return result;

  }
}

export default new CardStore(cards);