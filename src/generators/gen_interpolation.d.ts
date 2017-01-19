export interface Schema {
    entities: {
        name: string;
        fields: {
            name: string;
            type: string;
        }[];
    }[];
}
export declare function generate(schema: Schema): string;
