import { getYears, getMonths, getDays,getNow } from "./utils"
import {queryFormat} from './format'

Array.prototype.range = function ( start,end ){
  const length = end - start +1;
  let step = start - 1;
  return Array.apply(null,{length:length}).map(()=>{
    step++;
    if(step<10){
      step = `0${step}`
    }
    else{
      step = `${step}`
    }
    return step;
  });
}

function formatDate(startDate,endDate,selected){
  if (Object.prototype.toString.call(startDate) === '[object String]') {
    startDate = new Date(startDate.replace(/-/g, '/'))
  }

  if (Object.prototype.toString.call(endDate) === '[object String]') {
    endDate = new Date(endDate.replace(/-/g, '/'))
  }

  if (Object.prototype.toString.call(selected) === '[object String]') {
    selected = new Date(selected.replace(/-/g, '/'))
  }

  return {startDate,endDate,selected}
}

function makeMinute(_format){
  let _mm = []
  let _ss = [] 
  _mm = _mm.range(0,59)
  _ss = _mm
  let _M_ = {
    "options":[]
  }

  for (let i = 0; i < _mm.length; i++) {
    let _o = {
      value:_mm[i],
      children:{
        options:[]
      }
    }
    _o.children.options = _ss

    _M_.options.push(_o)
  }
  return _M_
}
function makeHour(_format){
  let _hh = []
  let _mm = []
  _mm = _mm.range(0,59)
  _hh = _hh.range(0,23)
  let _H_ = {
    "options":[]
  }

  let _M_ = (_format == 1 || _format == 6) ? null : makeMinute(_format)

  for (let i = 0; i < _hh.length; i++) {
    let _o = {
      value:_hh[i],
      children:{
        options:[]
      }
    }
    if(_M_){
      _o.children = _M_
    }else{
      _o.children.options = _mm
    }

    _H_.options.push(_o)
  }
  return _H_
}

function makeDays(_year,_month,_day,_format){
  let _D_ = {
    "options":[]
  }

  let _H_ = makeHour(_format)

  for (let i = 0; i < _day.length; i++) {
    let _o = {
      value:_day[i],
      children:{

        options:[]
      }
    }
    _o.children = _H_

    _D_.options.push(_o)
  }

  return _D_
}
function makeMonths(_date,_year,_month,_format,y){
  let _day = []
  let _M_ = {
    "options":[]
  }

  for (let i = 0; i < _month.length; i++) {
    const _limitDay = getDays(_date.startDate,_date.endDate,y,_month[i])
    _day = _day.range(_limitDay.minDay,_limitDay.maxDay)
    let _D_ = _format == 2 ? null : makeDays(_year,_month,_day,_format)
    let _o = {
      value:_month[i],
      children:{
        options:[]
      }
    }

    if(_D_){
      _o.children = _D_
    }else{
      _o.children.options = _day
    }
    
    _M_.options.push(_o)
  }
  return _M_
}


function makeYears(_date,_year,_month,_format){
  let _Y_ = {
    "options":[]
  }

  for (let i = 0; i < _year.length; i++) {
    let _M_ = _format == 3 ? null : makeMonths(_date,_year,_month,_format,_year[i])
    let _o = {
      value:_year[i],
      children:{
        options:[]
      }
    }
    if(_M_){
      _o.children = _M_
    }else{
      _o.children.options = _month
    }

    _Y_.options.push(_o)
  }

  return _Y_
}

/**
 *          YYYY-MM-DD HH:mm:ss - 0  
 *          YYYY-MM-DD HH:mm - 1  
 *          YYYY-MM-DD - 2
 *          YYYY-MM - 3
 *          HH:mm:ss - 5 
 *          HH:mm - 6
 */

export default function makeData(data,format) {
  const _date = formatDate(data.startDate,data.endDate,data.selected)
  const _format = queryFormat(format)
  let _year = []
  let _month = []
  const _limitYear = getYears(_date.startDate,_date.endDate)
  const _limitMonth = getMonths(_date.startDate,_date.endDate,1)

  let _DATE_ ={}

  _year = _year.range(_limitYear.minYear,_limitYear.maxYear)
  _month = _month.range(_limitMonth.minMonth,_limitMonth.maxMonth)


  if(_format < 4){
    _DATE_ = makeYears(_date,_year,_month,_format)
  }
  else if(_format > 4){
    _DATE_ = makeHour(_format)
  }
  

  return _DATE_; 
}
