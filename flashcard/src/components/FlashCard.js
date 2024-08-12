import React from 'react'



function FlashCard({display,flip, setFlip,card,id}) {
    function flipCard() {
        let newFlip = [...flip]
        newFlip[id] = !newFlip[id]
        setFlip(newFlip)
    }
    return (
    <div className={`card ${display} ${flip[id]?'flip':''}`} onClick={()=>{flipCard()}} key={card.id} >
        <div className='front'>
            <div className=''>
                {card.question}
            </div>
        </div>
        <div className='back'>
            {card.answer}
        </div>
    </div>
  )
}

export default FlashCard