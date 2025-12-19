import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position,setPosition] = useState({x:0,y:0});

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({x: e.clientX , y: e.clientY })
    };
    window.addEventListener('mousemove',moveHandler);
    return () => window.removeEventListener('mousemove',moveHandler);
  })


  return (
    <div className="pointer-events-none fixed left-0 top-0 z-9999 " style={{transform:`translate(${position.x - 40}px, ${position.y - 40}px)`}} >
      <div className="h-20 w-20 bg-linear-to-r from-pink-500 to-blue-500 rounded-full opacity-80 blur-3xl " />
    </div>
  )
}