declare interface Window {
  wallpaperPropertyListener: {
    applyUserProperties?: (properties: any) => void;
    setPaused?: (paused: boolean) => void;
    setRate?: (rate: number) => void;
  }
}