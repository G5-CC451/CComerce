import React, { useState } from 'react'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
// Configs
import { allVoiceCommands } from '@/config/voice'

const VoiceContext = React.createContext()
const { Provider } = VoiceContext

const VoiceProvider = ({ children }) => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    commands: allVoiceCommands,
  })
  const [isListening, setIsListening] = useState(false)
  const [active, setIsActive] = useState(false)
  const [microphoneRef, setMicrophoneRef] = useState(null)

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return 'El navegador no soporta la interacción por voz. Por favor, intente entrar usando Google Chrome.'
  }

  const handleListing = (currMicrophoneRef) => {
    setMicrophoneRef(currMicrophoneRef)
    setIsListening(true)
    setIsActive(true)
    if (currMicrophoneRef.current) {
      currMicrophoneRef.current.style.color = 'green'
      SpeechRecognition.startListening({
        continuous: true,
        language: 'es-PE',
      })
    }
  }

  const stopHandle = () => {
    setIsListening(false)
    setIsActive(false)
    if (microphoneRef.current) {
      SpeechRecognition.stopListening()
    }
  }

  const toogleListening = (currMicrophoneRef) => {
    setMicrophoneRef(currMicrophoneRef)
    setIsListening(!active)
    setIsActive(!active)
    if (currMicrophoneRef.current) {
      if (!active) {
        currMicrophoneRef.current.style.color = 'green'
        SpeechRecognition.startListening({
          continuous: true,
          language: 'es-PE',
        })
      } else {
        currMicrophoneRef.current.style.color = 'yellow'
        SpeechRecognition.stopListening()
      }
    }
  }

  const handleReset = () => {
    stopHandle()
    resetTranscript()
    setTimeout(() => {
      handleListing()
    }, 500)
  }

  console.log('transcript', transcript)

  return (
    <Provider
      value={{
        transcript,
        isListening,
        active,
        handleListing,
        stopHandle,
        toogleListening,
        handleReset,
      }}
    >
      {children}
    </Provider>
  )
}

export { VoiceContext, VoiceProvider }
