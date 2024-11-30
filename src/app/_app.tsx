import { AppProps } from "next/app";
import { NotificationProvider } from "./context/NotificationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;