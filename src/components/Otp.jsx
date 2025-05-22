import React, { useRef, useState } from 'react';

function Otp() {
  const [fields, setFields] = useState(Array(6).fill(''));
  const otpInpRef = useRef([])

  const handleOtp = (e, index) => {
    const value = e.target.value;
    const newFields = [...fields];
    newFields[index] = value;
    if(index<fields.length-1 && value){
        otpInpRef.current[index+1].focus()
    }
    setFields(newFields);
  };

  const handlekeydown = (e,index)=>{
    if(e.key === 'Backspace'){
        e.preventDefault()
        let otpfileds = [...fields]
        otpfileds[index] = ''
        if(index>0){
            otpInpRef.current[index-1].focus()
        }
        setFields(otpfileds)
    }else if(e.key === 'ArrowRight' && index<fields.length-1){
        otpInpRef.current[index+1].focus()
    }else if(e.key === 'ArrowLeft' && index>0){
        otpInpRef.current[index-1].focus()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex gap-1">
        {fields.map((ele, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={fields[index]}
            ref={el =>otpInpRef.current[index] = el}
            onKeyDown={e=>handlekeydown(e,index)}
            onChange={(e) => handleOtp(e, index)}
            className="w-12 h-12 text-center border border-amber-300"
          />
        ))}
      </div>
    </div>
  );
}

export default Otp;
