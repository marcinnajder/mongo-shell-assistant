export interface DocumentSchema {
    [fieldName: string]: any[];
}
/** zalozenie jest takie ze tutaj nie przyjdzie null */
export declare function parseDocument(currentSchema: DocumentSchema, document: any): DocumentSchema;
