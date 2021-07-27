declare global {
  interface Window {
    _goodshare?: {
      reNewAllInstance?: () => void
    }
  }

  declare module '*.svg' {
    const content: any
    export default content
  }
}

export {}
