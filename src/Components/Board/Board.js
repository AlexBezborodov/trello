import React, { useState } from 'react';
import moment from 'moment';
import AddBoardButton from '../AddBoardButton/AddBoardButton';
import EditField from '../EditField/EditField';


import '../../App.css';


const Board = () => {
const [boards, setBoards] = useState([
    { id: 1, title: 'Заплановано', items: [{ id: 1, cardDescription: 'Створити репозиторій для тестового', date: '12/26/2020',priority: '' }, { id: 2, cardDescription: 'Створити початковий проект', date: '12/25/2020',priority: '' }, { id: 3, cardDescription: 'Написати структуру проекту', date: '12/28/2020',priority: '' }] },
    { id: 2, title: 'В роботі', items: [{ id: 1, cardDescription: 'Перевірити тестове завдання', date: '12/28/2020',priority: '' }, { id: 2, cardDescription: 'проходження курсів', date: '12/28/2020',priority: '' }, { id: 3, cardDescription: 'Стоврити планувальник витрат', date: '12/28/2020',priority: '' }] },
    { id: 3, title: 'Виконано', items: [{ id: 1, cardDescription: 'Тестове завдання туду лист', date: '01/28/2021',priority: '' }, { id: 1, cardDescription: 'створити додаток по мотивам Зоряних війн', date: '12/27/2020',priority: '' }] }
    ])
const [currentBoard, setCurrentBoard] = useState(null)
const [currentItem, setCurrentItem] = useState(null)
const [editElement, setEditElement] = useState(false)
const [edit, setEdit] = useState(false)
const [editInfo, setEditInfo] = useState({ boardId: null, idx: null})
let color;


  

  function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 0 15px rgba(0,0,0,0.8)';
      e.target.style.background = 'yellow'
    }
  }
  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'lightgrey';
  }
  function dragEndHandler(e) {

  }
  function dropHandler(e, board, item) {
    e.preventDefault()
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'lightgrey';
    const currentIdx = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIdx, 1)
    const dropIdx = board.items.indexOf(item)
    board.items.splice(dropIdx + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
  }
  function dropCardHandle(e, board) {
    e.preventDefault()
    board.items.push(currentItem)
    const currentIdx = currentBoard.items.indexOf(currentItem)
     currentBoard.items.splice(currentIdx, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
     return b
     }))
  }
  function addItem(e, board) {
    const actualDate = moment();   
    const newItem = {
      id:board.items.length + 1,
      cardDescription: 'Edit me',
      date: actualDate.format('L')
    }
    board.items.push(newItem);
    setBoards(boards.map(b => {
        return b
    }))
    
  }
  function EditHandle(e) {
    setEditElement(true)
    e.target.style.background='lightgrey';
    e.target.style.color='black';
  }
  function saveChange (e, board, item){
    const newDescription = e.target.innerText
    item.cardDescription = newDescription
    e.target.style.color='#39c';
    setEditElement(false)
  }
  function saveBoard (e, board){
    const newName = e.target.innerText;
     board.title = newName;
     e.target.style.background='#39c';
     e.target.style.color='white';
    setEditElement(false)
  }
  function boardAdd(e,board) {
    const newBoard = {id: boards.length + 1, title: 'new Board', items:[]} 
    boards.push(newBoard)
    setBoards(boards.map(b => {
     return b
    }))
  }
  function delItem(e, board, item) {
    const idx = board.items.indexOf(item);
    board.items.splice(idx, 1);
    setBoards(boards.map(b => {
      return b
     }))       
  }
  function editItem (e, board, item) {
    const idx = board.items.indexOf(item);
    setEditInfo({
        boardId: board.id,
        idx: idx
    })
    setEdit(true)

  }
  function delBoard(e, board) {
     const idx = boards.indexOf(board);
     boards.splice(idx, 1);
    setBoards(boards.map(b => {
      return b
     }))       
  }
  function cancel (value) {
      setEdit(value)
      setBoards(boards.map(b => {
        return b
    }))
  }
  function save(desc,date,boardId,idx, value) {    
       boards[boardId].items[idx].cardDescription = desc
       boards[boardId].items[idx].date = date
       setEdit(value)
      setBoards(boards.map(b => {
       return b
       }))
  }
  function valid (date) {
    const deadline = moment(date,'MM/DD/YYYY') 
    const today = moment().startOf('day')    
    if (today.diff(deadline,'day') === 0) {
        color = 'orange'
    }else if(today.diff(deadline,'day') === -1) {
        color = 'yellow'
    }else if(today.diff(deadline,'day') > 0 ){
        color = 'red'
    }else {
        color = 'blue'    
    }
} 
function daysLeft(date) {     
const counter = moment().startOf('day').diff(moment(date,'MM/DD/YYYY'),'day') 
if (counter > 0) {
    color = 'blue'
    return 0 
    
}else {
    return -counter
}
}

  const list = boards.map((board, key) =>
        <div className='board'
        key={key}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandle(e, board)}
        >
          <div className='board-section'>
            <div className='flex'>
                <div className='board-title'
                    onClick={(e) => EditHandle(e)} 
                    onBlur={(e) => saveBoard(e, board)}
                    contentEditable={editElement}
                >
                    {board.title}
                </div>
                <div className='btn-del'
                    onClick={(e) => delBoard(e, board)}
                >
                    <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                <div className='line'></div>
                </div> 
            </div> 
            
            {board.items.map((item, key) =>
              <div className='item'
              key={key}
                draggable='true'
                onDragOver={(e) => dragOverHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                onDoubleClick={(e) => EditHandle(e)}
                onBlur={(e) => saveChange(e, board, item)}
              > 
                <span   className='text' 
                      contentEditable={editElement}
                >
                  {item.cardDescription}
                </span>
                <div className='add-info'>

                  <div>Deadline: 
                      {valid(item.date)}
                      <span className={color} >
                            {item.date} 
                      </span>
                  </div>
                  <div className='counter'>Days left:  
                      {valid(item.date)}
                      <span style={{padding: '0 2px'}}>
                            {daysLeft(item.date)} 
                      </span>
                  </div>
                  
                </div>
                <div className='btn-group'>
                  <div className='edit-btn'
                   onClick={(e) => editItem(e, board, item)}
                  >
                      Edit
                  </div>
                  <div 
                    className='edit-btn del-btn'
                    onClick={(e) => delItem(e, board, item)}
                  >
                    Delete
                  </div>
                </div>
                
              </div>

            )}
          </div>
          <div className='btn m-t-70'
            onClick={(e) => addItem(e, board)}
          >+ add item</div>
        </div>
      )
  return (
    <div>
      <div className='App'>
       {edit ?  <EditField data={boards} onSave={save} onCancel={cancel} board={editInfo} /> : list} 
       {edit ? null : <AddBoardButton  onboardAdd={boardAdd} />} 
      </div>
      
    </div>

  );
};

export default Board;