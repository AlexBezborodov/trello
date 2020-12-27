import React from 'react'

 function AddBoardButton(props) {
    return (
        <div className='add-board'>
            <div 
                className='btn'
                onClick={(e) => props.onboardAdd()}
            >
                 + add board   
            </div>
        </div>
    )
}

export default AddBoardButton;