import React,{useState} from 'react'
import moment from 'moment';
import DatePicker from 'react-datepicker'

import '../../App.css';
import "react-datepicker/dist/react-datepicker.css";


export default function EditField(props) {
    
    const {boardId, idx} = props.board;
    const {cardDescription, date} = props.data[boardId - 1].items[idx]
    const [startDate, setStartDate] = useState(new Date(date))
    const [newText, setNewText] = useState(cardDescription)
    let color;
    function valid (date) {
        let deadline = moment(date,'MM/DD/YYYY') //дата яка приходить у змінній
        let today = moment().startOf('day')    // сьогодні
        console.log('порівнюємо сьогодні',today.format('L'), ' і дедлайн:',deadline.format('L'),'результат:',today.diff(deadline,'day') );
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
     valid(date)
    return (
        <div className='board'>
            <div className='edit-section'>
                <div className='edit-title'> Ми на Дошці {props.data[boardId - 1].title}</div> 
                <h3 className='h3'>Item editing...</h3>
                <textarea 
                    type='textarea' 
                    value={newText} 
                    onChange={e =>setNewText(e.target.value)}
                    className='editable-text' 
                />

                <DatePicker 
                    selected={startDate} 
                    onChange={newDate => setStartDate(newDate)} 
                    minDate={new Date()}
                    className={`date-picker ${color}`}
                />
                <div className='flex'>
                    <div className='btn-cancel' onClick={()=> props.onCancel(false)}>Cancel</div>
                    <div  className='btn-save' onClick={()=> props.onSave(newText,moment(startDate).format('L'),boardId - 1,idx,false)}>Save</div>
                </div>
            </div>
            
            
        </div>
    )
}