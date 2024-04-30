"use client"

import { useEffect } from 'react'
import Modal from './modal'
import dayjs from 'dayjs'
import './page.scss'

export default function Home() {

  const fromDay = '2024-04-20'
  const toDay = '2024-05-01'
  const projects = [{id: 1,name: 'First'}, {id: 2, name:'Second'}, {id: 3, name: 'Ролевая модель2'}];
  const team = [
    {
      id: 1,
      name: 'Команда 1'
    },
    {
      id: 2,
      name: 'Команда 2'
    },
    {
      id: 3,
      name: 'Команда 3'
    },
    {
      id: 4,
      name: 'Команда 4'
    }
  ]

  const people = [
    {id: 1, name: 'Мария О',  team_id: 3},
    {id: 2, name: 'Павел Л',  team_id: 3},
    {id: 3, name: 'Глеб Р',  team_id: 3},
    {id: 4, name: 'Юлия Б',  team_id: 3},
  ]

  const tasks = [
    {id: 1, name: 'Иконки согласно доступам',  people_id: 1, project_id: 3, projected_start: '2024-04-20',projected_stop: '2024-04-28', actual_start: '2024-04-22', actual_stop: '2024-04-29'},
    {id: 2, name: 'Админка',  people: 2, project_id: 3, projected_start: '2024-04-21',projected_stop: '2024-04-22', actual_start: '2024-04-20', actual_stop: '2024-04-23'},
    {id: 3, name: 'Модерация',  people: 3, project_id: 3, projected_start: '2024-04-21',projected_stop: '2024-04-21', actual_start: '2024-04-20', actual_stop: '2024-04-24'},
    {id: 4, name: 'Список главных ролей',  people: 4, project_id: 3, projected_start: '2024-04-22',projected_stop: '2024-04-22', actual_start: '2024-04-20', actual_stop: '2024-04-26'},
  ]

  const days = () => {
    let dFrom = dayjs(fromDay);
    const startFrom = new Date(fromDay);
    // Получаем объект Date() для конечной даты (ms)
    let dTo = dayjs(toDay);
    // Получаем разницу полученных значений (ms)
    let nDif = dTo.valueOf() - dFrom.valueOf();
    // Получаем количество дней
    let nNumDay = Math.ceil(Math.abs(nDif) / 86400000);
    // Очищаем таблицу
    datelist.innerHTML = '';
    // Добавляем строку с заголовками в таблицу
    let oRTH = datelist.insertRow(-1);
    oRTH.innerHTML = '<th>Project</th>'
    console.log('nNumDay', nNumDay)
    for (let d = 0; d <= nNumDay; d++) {
      const currDay = dFrom.add(d,'day')
      // Вычисляем день
      // dFrom.setDate(dFrom.getDate() + (nDif > 0 ? 1 : -1));
      // Добавляем строку для вычисленной даты
      
      oRTH.innerHTML += `<th>${currDay.format('DD')}</th>`;
    }
for (let p=0;p<projects.length;p++) {
  const project = projects[p]

  let oRTD = datelist.insertRow(-1);
  oRTD.innerHTML = `<b>${projects[p].name}</b>`
  for (let d = 0; d <= nNumDay; d++) {
    // Добавляем строку для вычисленной даты
    
    oRTD.innerHTML += `<th></th>`;
  }

  const tasksForProject = tasks.filter(task=> task.project_id === project.id)
  for(let t=0; t<tasksForProject.length; t++) {
    const currTask = tasksForProject[t];
    let oRTD = datelist.insertRow(-1);
    let oRTD2 = datelist.insertRow(-1);
    oRTD.innerHTML = `<th rowspan="2">${currTask.name}</th>`
    let test = dayjs(fromDay);
    console.log('TESSSSSSSSST', test)
    for (let d = 0; d <= nNumDay; d++) {
      const currDay = test.add(d,'day')
      // Добавляем строку для вычисленной даты
      // console.log(new Date(currTask.actual_stop) ,new Date(test.getDate() + d))
      if (dayjs(currTask.projected_start) <=currDay &&  dayjs(currTask.projected_stop) >=currDay) {
        // console.log('dFrom',dFrom)
        oRTD.innerHTML += `<td class="bg-blue-100"></td>`;
        oRTD2.innerHTML += `<td class="bg-yellow-100"></td>`;
      } else {
        oRTD.innerHTML += `<td></td>`;
        oRTD2.innerHTML += `<td></td>`;
      }
    }

  }
}
    
  }

useEffect(()=> days(),[])


  const fCreateDateList = () => {
    console.log('fCreateDateList')
    if (ifrom.value && ito.value) {
      // Получаем объект Date() для начальной даты (ms)
      let dFrom = new Date(ifrom.value);
      // Получаем объект Date() для конечной даты (ms)
      let dTo = new Date(ito.value);
      // Получаем разницу полученных значений (ms)
      let nDif = dTo.getTime() - dFrom.getTime();
      // Получаем количество дней
      let nNumDay = Math.ceil(Math.abs(nDif) / 86400000);
      // Очищаем таблицу
      datelist.innerHTML = '';
      // Добавляем строку с заголовками в таблицу
      let oRTH = datelist.insertRow(-1);
      for (let d = 0; d < nNumDay; d++) {
        // Вычисляем день
        dFrom.setDate(dFrom.getDate() + (nDif > 0 ? 1 : -1));
        // Добавляем строку для вычисленной даты
        let oRTD = datelist.insertRow(-1);
        oRTH.innerHTML += `<th>${dFrom.toLocaleDateString('ru-RU')}</th>`;
      }
      
      // oRTH.innerHTML = `<td>№Дата&nbsp;начиная<br>с&nbsp;${dFrom.toLocaleDateString('ru-RU')}</td>`;
      // /* Перечисляем полученное количество дней */
      // for (let d = 0; d < nNumDay; d++) {
      //   // Вычисляем день
      //   dFrom.setDate(dFrom.getDate() + (nDif > 0 ? 1 : -1));
      //   // Добавляем строку для вычисленной даты
      //   let oRTD = datelist.insertRow(-1);
      //   oRTD.innerHTML = `<th>${dFrom.toLocaleDateString('ru-RU')}</th>`;
      // }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Диаграмма ганта ggg
      <Modal />
      <div id="period">с: <input type="date" id="ifrom" /> по: <input type="date" id="ito" /> <button onClick={fCreateDateList}>Create</button></div>
<table id="datelist"></table>
    </main>
  );
}
