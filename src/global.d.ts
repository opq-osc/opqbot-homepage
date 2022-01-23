declare global {
  interface Window {
    Sharer?: {
      init?: () => void
    }
    qiankunStarted?: any
  }

  declare module '*.svg' {
    const content: any
    export default content
  }
}

export {}
