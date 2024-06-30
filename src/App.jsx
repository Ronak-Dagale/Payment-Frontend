import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const paymentHandler = async (e) => {
    const amount = 500
    const currency = 'INR'
    const receiptId = '1234567890'

    const response = await fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        receipt: receiptId,
      }),
    })

    const order = await response.json()
    console.log(order)

    var option = {
      key: '',
      amount,
      currency,
      name: "Ronak's Shop",
      description: 'Test Transaction',
      image: 'https://i.ibb.co/5Y3m33n/test.png',
      order_id: order.id,
      handler: async function (response) {
        const body = { ...response }

        const validateResponse = await fetch('http://localhost:5000/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })

        const jsonResponse = await validateResponse.json()

        console.log('jsonResponse', jsonResponse)
        // alert('Payment Successfull')
      },
      prefill: {
        name: "Ronak's Shop",
        email: 'ronaksdagale16@gmail.com',
        contact: '9561307404',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    }
    var rzp1 = new Razorpay(option)
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code)
      alert(response.error.description)
      alert(response.error.source)
      alert(response.error.step)
      alert(response.error.reason)
      alert(response.error.metadata.order_id)
      alert(response.error.metadata.payment_id)
    })

    rzp1.open()
    e.preventDefault()
  }

  return (
    <>
      <div className='product'>
        <h1>Razorpay Payment Gatway</h1>
        <button className='button' onClick={paymentHandler}>
          Pay Now
        </button>
      </div>
    </>
  )
}

export default App
