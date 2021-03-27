import { createGlobalStyle, ThemeProvider } from "styled-components"
import { theme } from "../styles/theme"

const GlobalStyle = createGlobalStyle`

:root {
	--primary: ${theme.colors.primary}
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default function App({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}
