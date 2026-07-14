import { useState } from "react";

export const useImageWithFallback = () => {
  const [hasError, setHasError] = useState(false);

  const onError = () => setHasError(true);

  return { hasError, onError };
};