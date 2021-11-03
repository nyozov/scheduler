import React, { useState } from "react";



export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false){
    console.log(replace)
    setMode(newMode)
   if (replace){
   
    history.pop()
    setHistory(prev => [...prev, newMode])
   
   } else {
    setHistory(prev => [...prev, newMode])
   }
    
  }
  const back = function(){
    if (history.length > 1){
    history.pop()
    setMode(history[history.length - 1])
    
    
    }
  }

  return { mode, transition, back };
}