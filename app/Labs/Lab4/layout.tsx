import { ReduxProvider } from "./providers";

export default function Lab4Layout({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}