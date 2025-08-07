import React from "react";

function Loading() {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    </div>
  );
}

export default Loading;
