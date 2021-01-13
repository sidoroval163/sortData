import './App.scss';
import React, { useState, useMemo, useRef } from 'react';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { CardStore } from './mobx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Select from 'react-select';
import CardDrawer from './components/cardDrawer';


const App = observer(() => {
  const selectSuperviserRef = useRef();
  const selectMerchendiserRef = useRef();
  const selectProjectRef = useRef();
  const { cards, filteredCards, setFilterableValues } = CardStore;
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateValue, setDateValue] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    date: '',
    supervisor: '',
    merchandiser: [],
    project: "",
  });
  const uniqueSupervisor = useMemo(() => {
    const unique = [
      ...new Set(
        cards.map((item) => {
          return item.supervisor;
        })
      ),
    ];
    let result = [];

    unique.forEach((value) => {
      let selectorData = {
        value: value,
        label: value,
      };
      result.push(selectorData);
    });
    return result;
  }, [cards]);

  const uniqueMerchandiser = useMemo(() => {
    const unique = [
      ...new Set(
        cards.map((item) => {
          return item.merchandiser;
        })
      ),
    ];
    let result = [];

    unique.forEach((value) => {
      let selectorData = {
        value: value,
        label: value,
      };
      result.push(selectorData);
    });
    return result;
  }, [cards]);

  const uniqueProjects = useMemo(() => {
    let allProjects = [];
    cards.forEach((item) => {
      allProjects.push(item.projects);
    });
    let result = [];
    [...new Set(allProjects.flat())].forEach((value) => {
      let selectorData = {
        value: value,
        label: value,
      };
      result.push(selectorData);
    });
    return result;
  }, [cards]);

  const onClear = () => {
    setSelectedFilters({
      ...selectedFilters,
      date: '',
      supervisor: '',
      merchandiser: [],
      project: '',
    });
    selectSuperviserRef.current.select.clearValue();
    selectProjectRef.current.select.clearValue();
    selectMerchendiserRef.current.select.clearValue();
    setDateValue(new Date());
    setFilterableValues({
      date: '',
      supervisor: '',
      merchandiser: [],
      project: '',
    });
  };
  const onSubmit = () => {
    setFilterableValues(selectedFilters);
  };

  const setFilters = (type) => {
    if (selectedOption) {
      switch (type) {
        case 'supervisor':
          selectedFilters.supervisor = selectedOption.value;
          break;
        case 'merchandiser':
          Array.isArray(selectedOption) &&
            (selectedFilters.merchandiser = selectedOption.map(
              ({ value }) => value
            ));
          break;
        case 'project':
          selectedFilters.project = selectedOption.value;
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className='App'>
      <form id='form' className='App__filters-container'>
        <div className='App__filters App__filters_supervisor col-2'>
          <p>Супервайзер:</p>
          <Select
            ref={selectSuperviserRef}
            options={uniqueSupervisor}
            onChange={setSelectedOption}
            onInputChange={() => setFilters('supervisor')}
          />
        </div>

        <div className='App__filters App__filters_merchandiser col-2'>
          <p>Мерчендайзер:</p>
          <Select
            ref={selectMerchendiserRef}
            options={uniqueMerchandiser}
            onChange={setSelectedOption}
            onInputChange={() => setFilters('merchandiser')}
            isMulti
            className='react-select-container'
            classNamePrefix='react-select'
          />
        </div>

        <div className='App__filters App__filters_project col-2'>
          <p>Проект:</p>
          <Select
            ref={selectProjectRef}
            onInputChange={() => setFilters('project')}
            options={uniqueProjects}
            onChange={setSelectedOption}
          />
        </div>

        <div className='App__filters App__filters_date col-2'>
          <p>Дата:</p>

          <div className='input_date'>
            <input
              value={dateValue.toLocaleDateString()}
              onFocus={() => setShowCalendar(true)}
              onChange={() => setShowCalendar(true)}
            />
            {showCalendar && (
              <button type='close' onClick={() => setShowCalendar(false)}>
                &times;
              </button>
            )}
          </div>

          <Calendar
            onClickDay={(day) => selectedFilters.date = DateTime.fromFormat(day.toLocaleDateString(), "dd.LL.yy")}
            onChange={setDateValue}
            value={dateValue}
            className={showCalendar ? '' : 'hide'}
          />
        </div>

        <div className='App__filters App__filters_buttons '>
          <button
            type='button'
            className='btn btn-success '
            onClick={() => onSubmit()}>
            Применить
          </button>
          <button type='button' className='btn btn-danger' onClick={onClear}>
            Сбросить
          </button>
        </div>
      </form>
      <div className='App__cards-container'>
        <CardDrawer data={filteredCards} />
      </div>
    </div>
  );
});

export default App;