import React, { useState } from 'react'
import { commonStyles } from '../theme'
import { toGwei } from '../utils/index'

interface GasData {
    rapid: number,
    fast: number,
    slow: number,
    standard: number
}

const GasPrice:React.FC = () => {

    const ws = new WebSocket('wss://www.gasnow.org/ws')

    const [gasData,setGasData] = useState({rapid:0,fast:0,slow:0,standard:0})

    const updateGasPriceData = (data:any) => {
        console.log(data.gasPrices)
        setGasData({...data.gasPrices})
    }

    ws.onopen = (evt) => {
        // on connecting, do nothing but log it to the console
        console.log('Connected')
    }

    ws.onmessage = evt => {
        // listen to data sent from the websocket server
        const data = JSON.parse(evt.data)
        if (data.type) {
            updateGasPriceData(data.data)
        }
    }

    ws.onclose = () => {
        console.log('Disconnected')
        // automatically try to reconnect on connection loss

    }

    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <span>R: {toGwei(gasData.rapid)}</span>
            <span>F: {toGwei(gasData.fast)}</span>
            <span>St: {toGwei(gasData.standard)}</span>
        </div>
    )
}

export default GasPrice