declare global {
  interface Window {
    _goodshare?: {
      reNewAllInstance?: () => void
    }
    qiankunStarted?: any
  }

  declare module '*.svg' {
    const content: any
    export default content
  }
}

export {}
