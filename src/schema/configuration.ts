export interface Config {
    [serverAddress: string]: ServerConfig;
}

export interface ServerConfig {
    [databaseName: string]: DatabaseConfig | [string, string];
}

export interface DatabaseConfig {
    __includes?: string[];
    __excludes?: string[];
    [collectionName: string]: CollectionConfig;
}

export interface CollectionConfig {
    discriminator?: string;
    skipPaths?: string[];
    depth?: number;
}

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