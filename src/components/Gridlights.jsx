import React, { useEffect, useState } from 'react'

let array = new Array(9).fill(false)
async function setbackfun(arr,rev,setArr,setRev){
  
  for(let i = 0;i<rev.length;i++){
    await new Promise((res)=>setTimeout(res,1000))
    setArr((prev) => {
      const newArr = [...prev];
      newArr[rev[i]] = false;
      return newArr;
    });
  }
  setRev([])
}
const Gridlights = () => {
  const [arr,setArr] = useState(array)
  const [rev,setRev] = useState([])
  const btnhandler = (idx)=>{
    let dummyArr = [...arr]
    if(!dummyArr[idx]){
      dummyArr[idx] = true
      setRev((prev)=>{
        return [...prev,idx]
      })
    }
    setArr(dummyArr)

  }
  useEffect(()=>{
    let bool = arr.every(ele=>ele)
    if(bool){
      rev.reverse()
      setbackfun(arr,rev,setArr,setRev)
    }
  },[arr])
  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="w-[300px] h-[300px] flex flex-wrap">
      {
        arr.map((ele,idx)=>{
          return <div className="w-1/3 p-1 " key={idx}>
            <div className='border h-[100px]'  >
            <button onClick={()=>btnhandler(idx)} className={`${ele ? 'bg-emerald-500' : 'bg-amber-100'}  w-full h-full`}></button>

            </div>
          </div>
        })
      }
    </div>
    </div>
  )
}

export default Gridlights