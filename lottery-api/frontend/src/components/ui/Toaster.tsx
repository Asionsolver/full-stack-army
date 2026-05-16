import { Toaster as ReactHotToaster } from 'react-hot-toast'

export const Toaster = () => (
  <ReactHotToaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '12px 16px',
      },
      success: {
        iconTheme: {
          primary: '#22c55e',
          secondary: 'var(--bg-card)',
        },
      },
      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: 'var(--bg-card)',
        },
      },
    }}
  />
)

export default Toaster