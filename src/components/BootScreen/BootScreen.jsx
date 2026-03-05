import './bootscreen.css'
import { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'

const codeLines = [
    '> Connecting to API...',
    '> Loading Python modules...',
    '> Initializing FastAPI server...',
    '> Syncing MongoDB collections...',
    '> Ready.'
]

function BootScreen({ onComplete }) {
    const [lines, setLines] = useState([])
    const [currentLine, setCurrentLine] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 500)
        return () => clearInterval(cursorInterval)
    }, [])

    useEffect(() => {
        if (currentLine < codeLines.length) {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, codeLines[currentLine]])
                setCurrentLine(prev => prev + 1)
            }, 400 + Math.random() * 200)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => {
                onComplete()
            }, 800)
            return () => clearTimeout(timeout)
        }
    }, [currentLine, onComplete])

    return (
        <Motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                y: -50,
                filter: 'blur(10px)'
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bootscreen"
        >
            <div className="bootscreen__wrapper">
                <Motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bootscreen__terminal"
                >
                    <div className="bootscreen__dots">
                        <div className="bootscreen__dot bootscreen__dot--red" />
                        <div className="bootscreen__dot bootscreen__dot--yellow" />
                        <div className="bootscreen__dot bootscreen__dot--green" />
                    </div>

                    <div className="bootscreen__output">
                        {lines.map((line, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bootscreen__line"
                            >
                                <span className="bootscreen__prompt">{'>'}</span> {line}
                            </Motion.div>
                        ))}
                        {currentLine < codeLines.length && (
                            <div className="bootscreen__line">
                                <span className="bootscreen__prompt">{'>'}</span>{' '}
                                <span className={`bootscreen__cursor ${showCursor ? 'bootscreen__cursor--visible' : ''}`} />
                            </div>
                        )}
                    </div>
                </Motion.div>
            </div>
        </Motion.div>
    )
}

export default BootScreen
