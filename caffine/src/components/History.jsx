import {calculateCurrentCaffeineLevel, coffeeConsumptionHistory, timeSinceConsumption, getCaffeineAmount} from '../utils'

export default function History() {
  return (
    <>
      <div className='section-header'>
        <h2>History</h2>
      </div>
      <p><i>Hover for more information!</i></p>
      <div className="coffee-history">
        {Object.keys(coffeeConsumptionHistory).sort((a,b)=>{b-a}).map((utcTime, coffeeIndex)=>{ 
          const coffee = coffeeConsumptionHistory[utcTime];
          const timesinceConsume = timeSinceConsumption(utcTime)
          const originalAmount = getCaffeineAmount(coffee.name)
          const remainingAmount = calculateCurrentCaffeineLevel({
            [utcTime]: coffee
          })

          const summary = `${coffee.name} - ${originalAmount}mg, ${remainingAmount}mg remaining, consumed ${timesinceConsume} ago` 
          
          return (
            <div key ={coffeeIndex} title={summary}>
              <p>coffee icon</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
