import React, { useState } from 'react'

const Nestedummy = ({comments,addcomment,deletecomment}) => {
  return (
    <div>
        {
            comments.map((comment)=>{
               return <Nodetree key={comment.id} comment={comment} addcomment={addcomment} deletecomment={deletecomment}/>
            })
        }
    </div>
  )
}

export default Nestedummy

const Nodetree = ({comment,addcomment,deletecomment})=>{
    const [showReply,setShowReply] = useState(false);
    const [text,setText] = useState("")

    const deletehandler=(id)=>{
        deletecomment(id)
    }
    const submithandler=(id,text)=>{
        addcomment(id,text)
        setShowReply(false)
        setText("")
    }
    const cancelhandler=()=>{
        setText("")
    }
    return (
        <>
        <div>
            {comment.text}
            <button onClick={()=>setShowReply(!showReply)}>Reply</button>
            <button onClick={()=>deletehandler(comment.id)}>Delete</button>
        </div>
        {
            showReply && <div>
                <input type="text" className='border ' value={text} onChange={(e)=>setText(e.target.value)} />
                <button onClick={()=>submithandler(comment.id,text)}>Submit</button>
                <button onClick={()=>cancelhandler()}>cancel</button>
            </div>
        }
        {
            comment.replies.length>0 &&
            <Nestedummy comments={comment.replies} addcomment={addcomment} deletecomment={deletecomment}/>
        }
        </>
    )
}