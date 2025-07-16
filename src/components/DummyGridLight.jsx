import React, { use, useEffect, useState } from 'react'

async function setBackFun(index,setArray,setIndex){
    
    for(let i = 0;i<index.length;i++){
        await new Promise((res)=>setTimeout(res,1000))
        setArray((prev)=>{
            let dummy = [...prev]
            dummy[index[i]]=false
            return dummy
        })
    }
    setIndex([])

}
const DummyGridLight = () => {
    const [arr,setArray] = useState(new Array(9).fill(false))
    const [index,setIndex] = useState([])

    const indexhandler=(idx)=>{
        let dummy = [...arr]
        if(!dummy[idx]){
            dummy[idx] = true;
            setIndex((prev)=>{
                return [...prev,idx]
            })
        }
        setArray(dummy)   
    }

    useEffect(()=>{
        let boolean = arr.every((ele)=>ele)
        if(boolean){
            index.reverse()
            setBackFun(index,setArray,setIndex)
        }
    },[arr])
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-wrap w-96 gap-2'>
            {
                arr.map((ele,idx)=>
                <div className="w-28 h-12" key={idx}>
                    <button onClick={()=>indexhandler(idx)} className={`${ele ? "bg-amber-500":"bg-emerald-500"} border w-full h-full `}></button>
                </div>
                )
            }
        </div>
    </div>
  )
}

export default DummyGridLight