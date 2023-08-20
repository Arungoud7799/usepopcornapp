import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    // Return a cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
