import { useState } from 'react'
import './App.css'

function Content({income,tax}){
  return(
    <div className='result mt-2 gap-2' >
              <div className='mb-4'>
                <h3>Tus ingresos anuales fueron de:</h3>
                <h2 className='text-lg'>${income.toLocaleString()} COP</h2>
              </div>

              <div className="mb-4">
                <h3>El impuesto que debes pagar en 2024 es de:</h3>
                <h2 className='text-lg'>${tax.toLocaleString()} COP</h2>
              </div>
  
              <div className="mb-4">
                <h3>Tus ingresos netos anuales son </h3>
                <h2 className='text-lg'>${(income - tax).toLocaleString()} COP</h2>
              </div>
      </div>
  )
}

function App() {
  const [grossIncome, setGrossIncome] = useState(0)
  const [annualGrossIncome, setAnnualGrossIncome] = useState(0)
  const [annualNetIncome, setAnnualNetIncome] = useState(0)
  const [tax, setTax] = useState(0)
  const UVT = 47065

  const handleChange = (e)=>{
    setGrossIncome(e.target.value)
  }
  
  const calculateTax = () => {
    let grossUVTIncome = grossIncome * 12 / UVT
    let marginalTaxRate = 0
    let additionalTax = 0
    
    if (grossUVTIncome > 1090 && grossUVTIncome <= 1700) {
      marginalTaxRate = 19
    } else if (grossUVTIncome > 1700 && grossUVTIncome <= 4100) {
      marginalTaxRate = 28
      additionalTax = 116 * UVT
    } else if (grossUVTIncome > 4100 && grossUVTIncome <= 8670) {
      marginalTaxRate = 33
      additionalTax = 788 * UVT
    } else if (grossUVTIncome > 8670 && grossUVTIncome <= 18970) {
      marginalTaxRate = 35
      additionalTax = 2296 * UVT
    } else if (grossUVTIncome > 18970 && grossUVTIncome <= 31000) {
      marginalTaxRate = 37
      additionalTax = 5901 * UVT
    }
    else if (grossUVTIncome > 31000) {
      marginalTaxRate = 39
      additionalTax = 10352 * UVT
    }

    setTax(marginalTaxRate / 100 * grossIncome + additionalTax)
    setAnnualGrossIncome(e.target.value * 12)
    // setAnnualNetIncome(annualGrossIncome - tax)
  }

  return (
    <>
      <div className='flex flex-col max-w-2/5 items-center justify-center h-screen p-4'>
        <h1 className='text-2xl text-primary'>Calculadora de Impuesto de Renta Colombia 2024</h1>

        <div className='content mt-4'>
          <div className='form flex flex-col items-center justify-center' >
            <label className='mb-2'>¿Cuales son tus ingresos mensuales?</label>
            <input type="number" className='input input-bordered w-full mb-2' value={grossIncome.toLocaleString()} onChange={(e) => setGrossIncome(e.target.value)} />
            <button onClick={calculateTax} className='btn w-full mb-2 btn-primary'>Calcular</button>
          </div>

          {(grossIncome != 0)&&<Content income={annualGrossIncome} tax={tax}/>}
        </div>
      </div>
    </>
  )
}

export default App
