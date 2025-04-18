import type { CapacitorConfig, PluginsConfig } from './declarations';

type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

export type ExternalConfig = DeepReadonly<CapacitorConfig>;

export const enum OS {
  Unknown = 'unknown',
  Mac = 'mac',
  Windows = 'windows',
  Linux = 'linux',
}

export interface PackageJson {
  readonly name: string;
  readonly version: string;
  readonly dependencies?: { readonly [key: string]: string | undefined };
  readonly devDependencies?: { readonly [key: string]: string | undefined };
}

export interface WindowsConfig {
  readonly androidStudioPath: string;
}

export interface LinuxConfig {
  readonly androidStudioPath: string;
}

export interface PlatformConfig {
  readonly name: string;
  readonly platformDir: string;
  readonly platformDirAbs: string;
}

export interface PlatformAssetsConfig {
  readonly platformTemplateArchive: string;
  readonly platformTemplateArchiveAbs: string;
  readonly cordovaPluginsTemplateArchive: string;
  readonly cordovaPluginsTemplateArchiveAbs: string;
}

export interface CLIConfig {
  readonly rootDir: string;
  readonly assetsDir: string;
  readonly assetsDirAbs: string;
  readonly assets: {
    readonly ios: PlatformAssetsConfig;
    readonly android: PlatformAssetsConfig;
  };
  readonly package: PackageJson;
  readonly os: OS;
}

export interface AppConfig {
  readonly rootDir: string;
  readonly appId: string;
  readonly appName: string;
  readonly webDir: string;
  readonly webDirAbs: string;
  readonly package: PackageJson;
  readonly extConfigType: 'json' | 'js' | 'ts';
  readonly extConfigName: string;
  readonly extConfigFilePath: string;
  readonly extConfig: ExternalConfig;
}

export interface AndroidConfig extends PlatformConfig {
  readonly cordovaPluginsDir: string;
  readonly cordovaPluginsDirAbs: string;
  readonly studioPath: Promise<string>;
  readonly minVersion: string;
  readonly appDir: string;
  readonly appDirAbs: string;
  readonly srcDir: string;
  readonly srcDirAbs: string;
  readonly srcMainDir: string;
  readonly srcMainDirAbs: string;
  readonly webDir: string;
  readonly webDirAbs: string;
  readonly assetsDir: string;
  readonly assetsDirAbs: string;
  readonly resDir: string;
  readonly resDirAbs: string;
  readonly buildOutputDir: string;
  /**
   * @deprecated Will be removed in Cap. 5 as the `--flavor` option modifies this value.
   */
  readonly buildOutputDirAbs: string;
  /**
   * @deprecated Will be removed in Cap. 5 as the `--flavor` option modifies this value.
   */
  readonly apkName: string;
  readonly flavor: string;
  readonly buildOptions: {
    keystorePath?: string;
    keystorePassword?: string;
    keystoreAlias?: string;
    keystoreAliasPassword?: string;
    releaseType?: 'AAB' | 'APK';
    signingType?: 'apksigner' | 'jarsigner';
  };
}

export enum XcodeExportMethod {
  AppStoreConnect = 'app-store-connect',
  ReleaseTesting = 'release-testing',
  Enterprise = 'enterprise',
  Debugging = 'debugging',
  DeveloperID = 'developer-id',
  MacApplication = 'mac-application',
  Validation = 'validation',
}

export interface IOSConfig extends PlatformConfig {
  readonly cordovaPluginsDir: string;
  readonly cordovaPluginsDirAbs: string;
  readonly minVersion: string;
  readonly podPath: Promise<string>;
  readonly scheme: string;
  readonly webDir: Promise<string>;
  readonly webDirAbs: Promise<string>;
  readonly nativeProjectDir: string;
  readonly nativeProjectDirAbs: string;
  readonly nativeTargetDir: string;
  readonly nativeTargetDirAbs: string;
  readonly nativeXcodeProjDir: string;
  readonly nativeXcodeProjDirAbs: string;
  readonly nativeXcodeWorkspaceDir: Promise<string>;
  readonly nativeXcodeWorkspaceDirAbs: Promise<string>;
  readonly buildOptions: {
    teamId?: string;
    exportMethod?: XcodeExportMethod;
    xcodeSigningStyle?: 'automatic' | 'manual';
    signingCertificate?: string;
    provisioningProfile?: string;
  };
}

export type WebConfig = PlatformConfig;

export interface Config {
  readonly android: AndroidConfig;
  readonly ios: IOSConfig;
  readonly web: WebConfig;
  readonly cli: CLIConfig;
  readonly app: AppConfig;
  readonly plugins?: PluginsConfig;
}

export interface FrameworkConfig {
  name: string;
  isMatch: (config: Config) => boolean;
  webDir: string;
  /**
   * Specific UI libraries (Ionic) and higher-level frameworks (NextJs/Gatsby)
   * should be prioritorized over a more generic framework like React/Angular/Vue.
   * Lower the priorty number the more important it is (1 has more priority over 2).
   * This helps to make sure a specific framework like "NextJs" is chosen before
   * the more generic "React".
   */
  priority: number;
}
