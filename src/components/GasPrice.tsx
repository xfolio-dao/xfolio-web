import React, { useState, useEffect } from 'react'
import { commonStyles } from '../theme'
import { toGwei } from '../utils/index'
import useWebSocket from 'react-use-websocket'

interface GasData {
    rapid: number,
    fast: number,
    slow: number,
    standard: number
}

const GasPrice:React.FC = () => {

    const socketUrl = 'wss://gasgas.io/prices'

    const {
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket
      } = useWebSocket(socketUrl, {
        onOpen: () => console.log('opened'),
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent:Event) => true,
        retryOnError: true
      });

    // const ws = new WebSocket('wss://www.gasnow.org/ws')

    const [gasData,setGasData] = useState({rapid:0,fast:0,slow:0,standard:0})

    useEffect(() => {
        console.log(lastJsonMessage)
        if (lastJsonMessage) {
            setGasData({...lastJsonMessage.data})
        }
    },[lastJsonMessage])

    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <span style={commonStyles.tileText}>R: {toGwei(gasData.rapid)}</span>
            <span style={commonStyles.tileText}>F: {toGwei(gasData.fast)}</span>
            <span style={commonStyles.tileText}> St: {toGwei(gasData.standard)}</span>
            <span style={commonStyles.tileText}> Sl: {toGwei(gasData.slow)}</span>
        </div>
    )
}

export default GasPrice