import { ThemeProvider } from './components/theme-provider/theme-provider'
import { MainLayout } from './components/layout/layout'
import { Grid } from './components/grid/grid'

function App() {
  return (
    <ThemeProvider>
      <MainLayout>
        <Grid />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App