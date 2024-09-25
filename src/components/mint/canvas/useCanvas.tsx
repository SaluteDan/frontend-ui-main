import { useRef, useEffect } from 'react'
import React from 'react'

const useCanvas = (draw, attributes) => {
  
  const ref = useRef(null)
  
  useEffect(() => {
    
    const canvas = ref.current
    const context = canvas.getContext('2d')
    
    const renderer = () => {
      draw(context, attributes)
    }
    renderer()
  }, [draw])
  
  return ref
}

export default useCanvas