export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PlatformAccount {
  id: string;
  name: string;
  enabled: boolean;
}

export interface ResourceLibrary {
  id: string;
  name: string;
  type: string;
}

export interface ResourceInfo {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface LocalResourceConfig {
  path: string;
}

export interface WebDAVResourceConfig {
  url: string;
  username: string;
  password: string;
}
