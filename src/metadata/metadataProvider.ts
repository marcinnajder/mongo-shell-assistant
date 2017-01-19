


//var a : number | string & Date;

//  todo:  tutaj uwzglenic & i OR dla "types"", da sie var a : number | string & Date; 
// ciekawe co to znacza


export interface Type {
    typeName?: string;
    properties: Property[];
    extends?: string[];
}

export interface Property {
    propertyName: string;
    isOptional?: boolean;
    isReadonly?: boolean;
    types: PropertyType[]
}

export type PropertyType = NamePropertyType | ValuePropertyType | TypePropertyType;

// export interface PropertyType {
//     kind: string;
//     isArray?: boolean;
// }

export interface PropertyTypeBase {
    isArray?: boolean;
}

export interface NamePropertyType extends PropertyTypeBase {
    typeKind: "name";
    typeName: string;
}
export interface ValuePropertyType extends PropertyTypeBase {
    typeKind: "value";
    typeValue: string[];
}
export interface TypePropertyType extends PropertyTypeBase {
    typeKind: "type";
    typeType: Type;
}




export function extractMatadata(obj) : Property[]{


    
    return null;
}






// interface Album {
//     _id: ObjectId,
//     name: string;
//     tracks: {
//         trackName: string;
//         duration: number;
//     }[];
//     hej: "asd" | "asdads"

// }


// var eee: Type[] = [
//     {
//         typeName: "Album",
//         properties: [
//             {

//                 propertyName: "_id",
//                 isOptional: false,
//                 types: [
//                     {
//                         typeKind: "name", // value,  
//                         typeName: "ObjectId",
//                         isArray: false,
//                     }
//                 ]
//             },
//             {
//                 propertyName: "name",
//                 types: [
//                     {
//                         typeKind: "name",
//                         typeName: "string"
//                     }
//                 ]
//             },
//             {
//                 propertyName: "tracks",
//                 types: [
//                     {
//                         typeKind: "type",
//                         typeType: {
//                             properties: [
//                                 {
//                                     propertyName: "tracks",
//                                     types: [
//                                         {
//                                             typeKind: "name",
//                                             typeName: "string"
//                                         },
//                                     ]
//                                 },
//                                 {
//                                     propertyName: "duration",
//                                     types: [
//                                         {
//                                             typeKind: "name",
//                                             typeName: "number"
//                                         },
//                                     ]
//                                 },],
//                         },
//                         isArray: true

//                     }
//                 ],
//             },
//         ]
//     }
// ]
