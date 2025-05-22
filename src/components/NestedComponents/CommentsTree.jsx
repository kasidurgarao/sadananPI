import { useState } from "react";

const CommentsTree = ({ comments, addComment, deleteComment }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentNode
          key={comment.id}
          comment={comment}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

const CommentNode = ({ comment, addComment, deleteComment }) => {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    if (!replyText.trim()) return;
    addComment(comment.id, replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="ml-4 pl-4">
      <div className=" bg-gray-100 p-4 rounded border-l-blue-700 border-l-10">
        <p>{comment.text}</p>
        <div className="flex gap-4 ">
          <button
            className="text-sm text-blue-600 cursor-pointer"
            onClick={() => setShowReply(!showReply)}
          >
            Reply
          </button>
          <button
            className="text-sm text-red-600 cursor-pointer"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>

        {showReply && (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              value={replyText}
              placeholder="Write a reply..."
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleReply();
                if (e.key === "Escape") {
                  setReplyText("");
                  setShowReply(false);
                }
              }}
              className="border px-2 py-1 w-full"
            />
            <div className="flex gap-2">
              <button onClick={handleReply} className="text-sm text-green-700">
                Submit
              </button>
              <button
                onClick={() => {
                  setReplyText("");
                  setShowReply(false);
                }}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render Replies Recursively */}
      {comment.replies.length > 0 && (
        <CommentsTree
          comments={comment.replies}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
};

export default CommentsTree;
