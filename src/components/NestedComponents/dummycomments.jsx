import React, { useState } from "react";
import Nestedummy from "./nestedummy";

const Dummycomments = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const texthandler = (e) => {
    let comment = e.target.value;
    if (comment.trim() === "") return;
    setText(comment);
  };
  const addcomment=(id,text)=>{
    let newcomment = {
        id:Date.now(),
        text,
        replies:[]
    }
    if(id === -1){
        setComments((prev)=>[...prev,newcomment])
    }else{
        let update = structuredClone(comments);
        insertcomments(id,newcomment,update)
        setComments(update)
    }
  }
  const insertcomments = (id,text,tree)=>{
    for(let node of tree){
        if(node.id == id){
            node.replies.unshift(text)
            return true
        }
        if(insertcomments(id,text,node.replies)) return true
    }
    return false
  }
const deletcomment = (id)=>{
    let updated = structuredClone(comments)
    removecomment(id,updated)
    setComments(updated)
}
const removecomment = (id, tree) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      tree.splice(i, 1);
      return true;
    }
    if (removecomment(id, tree[i].replies)) {
      return true;
    }
  }
  return false;
};

  return (
    <div>
      <div>
        <input type="text" className="border" onChange={(e) => texthandler(e)} />
        <button onClick={() => addcomment(-1, text)}> Add</button>
      </div>
      <div>
        <Nestedummy
          comments={comments}
          addcomment={addcomment}
          deletecomment={deletcomment}
        />
      </div>
    </div>
  );
};

export default Dummycomments;
