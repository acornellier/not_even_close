import { Simulator } from './components/Simulator'
import { ToastProvider } from './components/Common/Toasts/ToastProvider'
import { TailwindBreakpoint } from './components/Header/TailwindBreakpoint'
import { Header } from './components/Header/Header'
import { Toasts } from './components/Common/Toasts/Toasts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SimulatorWithDefaultEnemySpell } from './components/SimulatorWithDefaultEnemySpell.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Simulator />,
  },
  {
    path: 'spell/:spellId',
    element: <SimulatorWithDefaultEnemySpell />,
  },
])

export function App() {
  return (
    <ToastProvider>
      <div className="flex justify-center bg-[#181a1b] px-4 lg:px-0">
        <main className="min-h-screen py-4 flex flex-col gap-4 lg:w-[1125px]">
          <Header />
          <RouterProvider router={router} />
          <TailwindBreakpoint />
        </main>
      </div>
      <Toasts />
    </ToastProvider>
  )
}
