import { useState } from 'react'
import './App.scss'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import "highlight.js/styles/github.css"
import React, { useEffect, useRef } from 'react';

{/* Set the options so that breaks add <br> on a single line break */}
marked.setOptions({
  breaks: true, 
  gfm: true
})

{/* Change plein text into HTML and reder it for the previewer */}
const ChangeText = ({ content }) => {
  const getText = () => {
    const markup = marked(content || "");
    return { __html: DOMPurify.sanitize(markup) }
  };

  return (
    <div
      dangerouslySetInnerHTML={getText()} /* <= usual function so it use () after it's name */
    />
  )
}

{/* Main component */}
function App() {
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e) => {
      setInputValue(e.target.value)
  }  

  return (
    <>
      <div className='main-content'>
        <div className='editor-head'>Editor</div>
        <textarea id="editor" value={inputValue} onChange={handleChange} />
        <div className='previewer-head'>Previewer</div>
{/* The logic of preview markdown */}
        <div id='preview'>{
          <ChangeText content={inputValue} />
        }</div>
      </div>
      
    </>
  )
}

export default App
