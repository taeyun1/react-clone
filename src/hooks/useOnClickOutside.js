import React, { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      // console.log("ref", ref.current);
      // ref.current.contains(e.target) => 모달창안쪽을 클릭했을때
      if (!ref.current || ref.current.contains(e.target)) {
        return; // 모달창 안닫히게 그냥 리턴해서 끝내줌
      }
      handler(); // 모달창 밖 클릭시 모달창 닫음
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, []);

  return <div></div>;
}
