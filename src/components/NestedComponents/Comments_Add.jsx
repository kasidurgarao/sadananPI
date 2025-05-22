import React, { useState } from "react";
import CommentsTree from "./CommentsTree";

function Comments_Add() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const addComment = (id, text) => {
    if (!text) return;

    const newComment = {
      id: Date.now(),
      text,
      replies: [],
    };

    if (id === -1) {
      setComments((prev) => [newComment, ...prev]);
    } else {
      const updated = structuredClone(comments);
      insertReply(updated, id, newComment);
      setComments(updated);
    }
  };

  const insertReply = (tree, id, newComment) => {
    for (const node of tree) {
      if (node.id === id) {
        node.replies.unshift(newComment);
        return true;
      }
      if (insertReply(node.replies, id, newComment)) return true;
    }
    return false;
  };

  const deleteComment = (commentId) => {
    const updated = structuredClone(comments);
    removeComment(updated, commentId);
    setComments(updated);
  };

  const removeComment = (tree, id) => {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === id) {
        tree.splice(i, 1);
        return true;
      }
      if (removeComment(tree[i].replies, id)) return true;
    }
    return false;
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      addComment(-1, commentText);
      setCommentText("");
    }
    if (e.key === "Escape") {
      setCommentText("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Comments</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={commentText}
          placeholder="Enter your comment..."
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={onKeyDown}
          className="border border-black px-2 py-1 w-full"
        />
        <button
          onClick={() => {
            addComment(-1, commentText);
            setCommentText("");
          }}
          className="border border-black px-4"
        >
          Add
        </button>
      </div>

      {/* Show Comments Below Input */}
      <CommentsTree
        comments={comments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
    </div>
  );
}

export default Comments_Add;
