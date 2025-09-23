import { ThemeProvider } from './components/theme-provider/theme-provider'
import { MainLayout } from './components/layout/layout'
import { Grid } from './components/grid/grid'

function App() {
  const {controls, grid} = Grid();
  return (
    <ThemeProvider>
      <MainLayout headerControls={controls}>
        {grid}
      </MainLayout>
    </ThemeProvider>
  )
}

export default App