interface UserProperty<T> {
  value: T;
}

interface UserProperties {
  color?: UserProperty<string>;
  background?: UserProperty<string>;
  fade?: UserProperty<number>;
  speed?: UserProperty<number>;
  font?: UserProperty<string>;
  size?: UserProperty<number>;
}

declare interface Window {
  wallpaperPropertyListener: {
    applyUserProperties?: (properties: UserProperties) => void;
    setPaused?: (paused: boolean) => void;
    setRate?: (rate: number) => void;
  };
}
