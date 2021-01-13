import { DateTime } from 'luxon';
import { makeAutoObservable } from 'mobx';
import { FilterStore } from './';
import { checkFieldsInObject } from '../helpers';
class CardStore {
  cards = [
    {
      supervisor: 'Дуц Л.С.',
      merchandiser: 'Евдокимова О.Ф.',
      projects: ['Кампина', 'Хохланд', 'СТМ'],
      date: '03.01.2021',
    },
    {
      supervisor: 'Петров Л.С.',
      merchandiser: 'Анатольев О.Ф.',
      projects: ['Кампина', 'Хохланд'],
      date: '06.01.21',
    },
    {
      supervisor: 'Дуц Л.С.',
      merchandiser: 'Силаньтьев О.Ф.',
      projects: ['Хохланд', 'СТМ'],
      date: '07.01.21',
    },
    {
      supervisor: 'Петров Л.С.',
      merchandiser: 'Анатольев О.Ф.',
      projects: ['Кампина', 'Хохланд'],
      date: '06.01.21',
    },
    {
      supervisor: 'Андреев Л.С.',
      merchandiser: 'Силаньтьев О.Ф.',
      projects: ['Хохланд', 'ТЕСТОВЫЙ ПРОЕКТ'],
      date: '07.01.21',
    },
    {
      supervisor: 'Андреев Л.С.',
      merchandiser: 'Силаньтьев О.Ф.',
      projects: ['Хохланд', 'ТЕСТОВЫЙ ПРОЕКТ'],
      date: '07.01.21',
    },
    {
      supervisor: 'Дуц Л.С.',
      merchandiser: 'Евдокимова О.Ф.',
      projects: ['Кампина', 'Хохланд', 'СТМ'],
      date: '06.01.21',
    },
    {
      supervisor: 'Петров Л.С.',
      merchandiser: 'Анатольев О.Ф.',
      projects: ['Кампина', 'Хохланд'],
      date: '06.01.21',
    },
    {
      supervisor: 'Дуц Л.С.',
      merchandiser: 'Силаньтьев О.Ф.',
      projects: ['Хохланд', 'СТМ'],
      date: '07.01.21',
    },
    {
      supervisor: 'Петров Л.С.',
      merchandiser: 'Анатольев О.Ф.',
      projects: ['Кампина', 'Хохланд'],
      date: '06.01.21',
    },
    {
      supervisor: 'Филимонов Л.С.',
      merchandiser: 'ПУПКИН О.Ф.',
      projects: ['Тест', 'ТЕСТОВЫЙ ПРОЕКТ'],
      date: '07.01.21',
    },
    {
      supervisor: 'Андреев Л.С.',
      merchandiser: 'Силаньтьев О.Ф.',
      projects: ['Тест', 'ТЕСТОВЫЙ ПРОЕКТ'],
      date: '09.01.21',
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  get filteredCards() {
    const { filterSet } = FilterStore;
    let result = [];
    result = this.cards;
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
    else {

      if (filterSet.supervisor !== '') {
        result = result.filter(elem =>
          elem.supervisor === filterSet.supervisor
        );

      }
      if (filterSet.merchandiser.length !== 0) {

        result = result.filter((elem) =>
          filterSet.merchandiser.includes(elem.merchandiser)
        );
        
      }

      if (filterSet.project !== '') {
        result = result.filter((elem) =>
          elem.projects.includes(filterSet.project)
        );
        
      }





      if (filterSet.date !== '') {

        result = result.filter((elem) => filterSet.date <= DateTime.fromFormat(elem.date, "dd.LL.yy"));
      }

      return result;
    }
  }
}

export default new CardStore();