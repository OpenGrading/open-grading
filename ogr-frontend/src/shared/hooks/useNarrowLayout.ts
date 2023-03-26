import { useBreakpointValue } from "@chakra-ui/react";

export default function useNarrowLayout() {
  return useBreakpointValue({ sm: true, md: false, base: true }, { ssr: false });
}
