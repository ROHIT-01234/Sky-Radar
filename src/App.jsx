import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./context/theme-provider"
import Layout from "./components/Layout"
import WeatherDashboard from "./pages/dashboard"
import CityPage from "./pages/city_page"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

import { Toaster } from "sonner"

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime : 5*60*1000,
      gcTime : 10*60*1000,
      retry : false,
      refetchOnWindowFocus : false,
    }
  }
});

function App() {
 
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark">
      <Layout>
        <Routes>
          <Route path="/" element={<WeatherDashboard/>}/>
          <Route path="/city/:cityname" element={<CityPage/>}/>
        </Routes>
      </Layout>
      <Toaster richColors/>
    </ThemeProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
