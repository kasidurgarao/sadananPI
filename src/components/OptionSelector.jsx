import React, { useState } from 'react'
let data = [["India","Hyderabad","Chennai"],["Plv","Tpg","Kvr","Rjy"],["Mango","Banana","Apple"]]
const OptionSelector = () => {
    const [text,setText] = useState(data[0][0]);
    const [count,setCount] = useState(0)
    const [selectOption,setSelectOption] = useState('')


const getrandom=()=>{
    let index = Math.floor(Math.random()*data.length);
    let subIndex = Math.floor(Math.random()*data[index].length)
    setText(data[index][subIndex]) 
    setSelectOption("")
}

    const selecthandler=(e)=>{
        let name = e.target.value;
        console.log(name)
        if(text === name){
            setCount((prev)=>prev+1)
            setSelectOption(name)
            getrandom()
        }
    }



  return (
    <div>

        <div className='flex gap-4 justify-center items-center h-screen flex-col w-full '>
            <div className='border w-40'>
               <span>{text}</span>
            </div>
            <div className='flex gap-4'>
            {
                data.map((ele,idx)=>
                <div  key={idx}>
                    <select className='w-28 border' value={selectOption} onChange={selecthandler}>
                        <option value="select">select</option>
                        {
                            ele.map((val,index)=>
                            <option value={val} key={index} >{val}</option>
                            )
                        }
                    </select>
                </div>
                
                )
            }
            </div>
            {count}
        </div>
    </div>
  )
}

export default OptionSelector