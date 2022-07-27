import { useState, useEffect } from "react";

// Debounce란 : 검색 입력을 할때 입력 결과가 나타날 때까지 지연이 있음.
// 사용자가 미리 결정된 시간동안 타이핑을 멈출때 까지 Keyup이벤트의 처리를 지연시킴
// 이렇게 하면 UI코드가 모든 이벤트 처리할 필요가 없고, 서버로 전송되는 API 호출 수도 크게 줄어듬.
// 모든 문자를 처리하면 성능이 저하되고 백엔드에 불필요한 코드가 추가될 수 있음.

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  // value, delay가 바뀌면 handler를 클리어 해줌(셋타임아웃 초기화)

  return debounceValue;
};
