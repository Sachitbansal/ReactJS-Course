import { coffeeOptions } from '../utils'
import { use, useState } from 'react'
import Modal from './Modal'
import Authentication from './Authentication'
import { useAuth } from '../context/AuthContext'
import { db } from '../../firebase'
import { setDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'

export default function CoffeeForm(props) {
  const { isAuthenticated } = props

  const [showModal, setShowModal] = useState(false)

  const [selectedCoffee, setselectedCoffee] = useState(null)

  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false)

  const [coffeeCost, setCoffeeCost] = useState(0)

  const [hour, setHour] = useState(0)
  const [min, setMin] = useState(0)

  const {globalData, setGlobalData, globalUser} = useAuth()

  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true)
      return
    }

    if (!selectedCoffee) {return}
    
    const newGlobalData = {
      ...(globalData || {})
    }

    const nowTime = Date.now()
    const timeToSubtract = (hour * 60 * 60 * 1000) + (min * 60 * 1000)
    const timestamp = nowTime - timeToSubtract
    
    const newData = {
      name: selectedCoffee, 
      cost: coffeeCost
    }
    newGlobalData[timestamp] = newData

    setGlobalData(newGlobalData)

    const userRef = doc(db, 'users', globalUser.uid)
    const res = await setDoc(userRef, {
      [timestamp]: newData
    }, {merge: true})

    setselectedCoffee(null)
    setCoffeeCost(0)
    setHour(0)
    setMin(0)
  }

  return (
    <>

      {showModal && (
        <Modal handleCloseModal={() => setShowModal(false)}>
          <Authentication handleCloseModal={() => setShowModal(false)} />
        </Modal>
      )}
      <div className='section-header'>
        <h2>Start Tracking Today</h2>

      </div>
      <h4>Select coffee type</h4>
      <div className='coffee-grid'>
        {coffeeOptions.slice(0, 5).map((option, optionIndex) => {
          return (
            <button onClick={() => {
              setselectedCoffee(option.name)
              setShowCoffeeTypes(false)
            }} className={'button-card ' + (option.name === selectedCoffee ? 'coffee-button-selected ' : ' ')} key={optionIndex}>
              <h4>{option.name}</h4>
              <p>{option.caffeine}</p>
            </button>
          )
        })}
        <button onClick={() => {
          setShowCoffeeTypes(true)
          setselectedCoffee(null)
        }} className={'button-card ' + (showCoffeeTypes ? 'coffee-button-selected ' : ' ')}>
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeTypes && (<select onChange={(e) => { setselectedCoffee(e.target.value) }} name="coffee-list" id="coffee-list">
        <option value={null}>Select type</option>
        {coffeeOptions.map((option, optionIndex) => {
          return (
            <option value={option.name} key={optionIndex}>
              {option.name} ({option.caffeine}mg )
            </option>
          )
        })}
      </select>)}
      <h4>Add the cost ($)</h4>
      <input className='w-full' type="number" value={coffeeCost} onChange={(e) => {
        setCoffeeCost(e.target.value)
      }} placeholder='4.50' />
      <h4>Time Since consumption</h4>
      <div className='time-entry'>
        <div>
          <h6>Hours</h6>
          <select id="hours-select" onChange={(e) => { setHour(e.target.value) }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,].map((hour, hourIndex) => {
              return (
                <option key={hourIndex} value={hour}>{hour}</option>
              )
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select id="mins-select" onChange={(e) => { setMin(e.target.value) }}>
            {[0, 5, 10, 15, 30, 45].map((min, minIndex) => {
              return (
                <option key={minIndex} value={min}>{min}</option>
              )
            })}
          </select>
        </div>
      </div>
      <button onClick={handleSubmitForm}>
        <p>Add Entry</p>
      </button>
    </>
  )
}
