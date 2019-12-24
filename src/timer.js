import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

// import './styles.css'

const Timer = () => {
    const [ time, setTime ] = useState({
        min:15,
        sec: 0
    })

    const [ isRunning, setRunning ] = useState( false )

    useEffect(() => {
        if ( time.sec < 0 ) {
            setTime(prevTime => ({ ...prevTime, min: prevTime.min -1, sec:59 }))
        }

        if ( isRunning ) {
            var timerID = setInterval(() => {
                setTime(prevTime => ({ ...prevTime, sec: prevTime.sec -1 }))
            }, 1000)
            if ( time.min === 0 && time.sec === 0 ) {
                setTime({ min:0, sec: 0 })
                setRunning( false )
            }
        }

        console.log(time)

        return () => {
            clearInterval( timerID )
        }
    }, [ time, isRunning ])

    return (
        // <> 
            <div>
                <h1>
                    {String( time.min ).padStart( 2, 0 )}:{String( time.sec ).padStart( 2, 0 )}
                </h1>
                <button onClick = {() => setRunning( true )}>Start Timer</button>
                <button onClick = {() => setTime({ min:15, sec:0 })}>Reset Timer</button>
                <button onClick = {() => setRunning( false )}>Stop Timer</button>
            </div>
        // </>
    )
}

const rootElement = document.getElementById( 'root' )
ReactDOM.render( < Timer />, rootElement )

export default Timer