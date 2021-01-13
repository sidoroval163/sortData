import './style.scss';
import React, { memo } from 'react';
import superman from './../../assets/img/Supermanflying.png';

const CardDrawer = ({ data }) => {
  
  if(data.length!==0){return (
    data.map((elem, index) => {
      const { supervisor, merchandiser, projects, date } = elem;
      return (
        <div className={`card`} key={index.toString()} >
          <div className='card-img'>
            <img src={superman} className='card-img-top' alt='superman' />
          </div>
          <div className='card-body'>
            <p className='card-text'>
              Супервайзер: <span>{supervisor}</span>
            </p>
            <p className='card-text'>
              Мерчендайзер: <span>{merchandiser}</span>
            </p>
            <p className='card-text'>
              Проекты: <span>{projects.join(', ')}</span>
            </p>
            <p className='card-text'>
              Дата: <span>{date}</span>
            </p>
          </div>
        </div>
      )
    })
  );}
  else{return (
    <div className={`card`} >
      <div className='card-img'>
      ЗНАЧЕНИЯ НЕ НАЙДЕНЫ
      </div>
      
    </div>
  )}
  
}

export default memo(CardDrawer);
