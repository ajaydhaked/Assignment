import React, { useState } from 'react'
import FlashCard from './FlashCard'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Cards() {
    const [loading, setLoading] = useState(true)
    const [sampleCards, setSampleCards] = useState([])
    const [maxlimit, setMaxLimit] = useState(0)
    useState(() => {
        axios.get('http://localhost:8000/getquestions')
        .then((response) => {
            console.log(response.data.questions)
            if (response.data.questions == null) {
                setLoading(false)
                console.log('Error in Server Side')
                setSampleCards([])
            }
            else {
                setLoading(false)
                // store in json {id, question, answer}
                // response.data.questions is an array of id, question, answer
                let temp = response.data.questions
                let tempCards = []
                for (let i=0; i<temp.length; i++) {
                    let card = {
                        id: temp[i][0],
                        question: temp[i][1],
                        answer: temp[i][2]
                    }
                    tempCards.push(card)
                }
                setMaxLimit(tempCards.length)
                setSampleCards(tempCards)
            }
        })
    }, [])

    const [currentCard, setCurrentCard] = React.useState(0)
    const [flipStates, setFlipStates] = useState([...Array(sampleCards.length)].map(()=>false))
    function nextCard() {
        let newFlip = [...flipStates]
        newFlip[currentCard] = false
        setFlipStates(newFlip)
        setCurrentCard((currentCard+1)%maxlimit)
    }
    function prevCard() {
        let newFlip = [...flipStates]
        newFlip[currentCard] = false
        setFlipStates(newFlip)
        setCurrentCard((currentCard-1+maxlimit)%maxlimit)
    }
    // if(sampleCards.length === 0) {
    //     return (
    //         <div>
    //             <div className="text-center">
    //                 <h1 className="text-2xl font-bold my-24 text-black">No Question in Database</h1>
    //                 <p className="">Click Here to Add Question: <Link  to='/create'><p className='text-red-500'>Add Question</p></Link></p>
    //             </div>
    //         </div>
    //     )
    // }
    
  return (
    <div>
        {loading?
            <div className="text-center">
                <h1 className="text-2xl font-bold my-24 text-black">Loading...</h1>
            </div> 
        :
            sampleCards.length===0?
                <div className="text-center">
                    <h1 className="text-2xl font-bold my-24 text-black">No Question in Database</h1>
                    <p className="">Click Here to Add Question: <Link className='text-red-500'  to='/create'>Add Question</Link></p>
                </div>
            :
                <div id="animation-carousel" className="relative" >
                    <div className="relative h-56 rounded-lg md:h-96 flex flex-wrap justify-center items-center">
                        {sampleCards.map((card,index) => (
                            <FlashCard key={index} id={index} card={card} flip={flipStates} setFlip={setFlipStates} display={`${index===currentCard?'flex':'hidden'}`} />
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <div>
                            <button onClick={()=>{prevCard()}} className='min-w-24 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Previous</button>
                        </div>
                        <div>
                            <button onClick={()=>{nextCard()}} className='min-w-24 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Next</button>
                        </div>
                    </div>
                </div>
        }
    </div>
  )
}

export default Cards