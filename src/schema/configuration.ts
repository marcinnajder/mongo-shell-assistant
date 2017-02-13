export type Config = {
    [serverName: string]: ServerConfig
};
export type ServerConfig = {
    [databasenName: string]: DatabaseConfig | [string, string];
};
export type DatabaseConfig = {
    [collectionName: string]: CollectionConfig;
    __includes?: string[];
    __excludes?: string[];
};
export type CollectionConfig = {
    discriminator?: string;
    skipPaths?: string[];
    depth?: number;
};


export const defaultConfig: Config = {
    "localhost:27017": {
        "sampleDatabase": {
            "__excludes": ["excludedCollection1", "excludedCollection2"],
            "someCollection": {
            }
        },
        "sampleDatabase2": ["localhost:27017", "sampleDatabase"]
    }
};


export function validateConfiguration(config: Config): string[] {
    // todo:
    // - include or exclude
    // - referenced database must exist
    return [];
}