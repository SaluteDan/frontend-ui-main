import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {  
  
  const { draw, ...rest } = props
  const { attributes } = props
  const ref = useCanvas(draw, attributes)
  
  return <canvas ref={ref} attributes={attributes} {...rest}/>
}

export default Canvas