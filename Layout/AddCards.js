import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { createCard, readDeck } from "../utils/api"
import "./style.css"
import CardForm from "./CardForm"

function AddCards({HomeNavBar}) {
    const [front, seFront] = useState("")
    const [back, setBack] = useState("")
    const [deckName, setDeckName] = useState("")
    const history = useHistory()
    const {deckId} = useParams()


    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
          const response = readDeck(deckId)
          const deckFromAPI = await response
          setDeckName(deckFromAPI.name)
        
        }
        loadDeck();
        return () => abortController.abort();
      }, [deckId]);
   
    const handleFrontChange = (event) => {
        setFront(event.target.value)
    }

    const handleBackChange = (event) => {
        setBack(event.target.value)
    }
    const submitHandler = (event) => {
        event.preventDefault()
        createCard( deckId, {
            front: front,
            back: back,
    })
    setFront("")
    setBack("")
    event.target.reset()
    }
    
    return (
        <div>
            <p><HomeNavBar /> <span>{deckName} </span><span>/ Add Card</span></p>
            <h1><span>{deckName}</span> : <span>Add Card</span></h1>
            <CardForm submitHandler={submitHandler} front={front} back={back} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange}/>
        </div>
    )
}

export default AddCards
