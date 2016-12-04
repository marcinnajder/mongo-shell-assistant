/// <references path="./_all.d.ts" />

declare var doc123;

declare module e {
    function usersDoc(doc?:UserDb):UserDb;
}




declare class FakeDocumentDb{
    _id: ObjectId;
    name:string;
    address:{
        city:string;
    }
}

declare class FakeDocumentDb_Flattened{
    _id;
    name;
    address;
    "address.city";
}


// ------------------------------------------------------------------------------------------------------------------------------------

declare interface UserDb {
    _id: ObjectId;
    name: string;
    login: string;
    password?: string;
    roles?: string[];
    permissions?: string[];
    isActive: boolean;
    creationDate: Date;
    expirationDate?: Date;
    firstLogin?: boolean;
}

declare interface UserDb_Flattened{
    _id;
    name;
    login;
    password;
    roles;
    permissions;
    isActive;
    creationDate;
    expirationDate;
    firstLogin;
    "patientProfile";
    "patientProfile.firstName";
    
    "patientProfile.surname";
    "patientProfile.pesel";
    "patientProfile.email";
    "patientProfile.birthDate";
    "patientProfile.phone";

    "patientProfile.address"
    "patientProfile.address.city";
    "patientProfile.address.street";
    "patientProfile.address.houseNumber";
    "patientProfile.address.apartmentNumber";
    "patientProfile.address.postalCode";
}

declare interface PatientUserDb extends UserDb {
    patientProfile: PatientProfileDb;
}

declare interface PatientProfileDb {
    firstName: string;
    surname: string;
    pesel?: string;
    email: string;
    birthDate: Date;
    phone?: string;
    address?: {
        city: string;
        street: string;
        houseNumber: string;
        apartmentNumber: string;
        postalCode: string;
    };
    identityDocumentId?: string;
    identityDocumentTypeId?: string;
    sex: string;
    patientHisId: string;
    status: ObjectId;
    termsVersion: number;
    hasAgreement: boolean;
    communicationChannel?: string[];
    incorrectLoginCount?: number;
    sendMePromotionalOffers: boolean;
    processMyDataForMarketingPurposes: boolean;
    privacyPolicyAccepted:boolean;
}

// ------------------------------------------------------------------------------------------------------------------------------------

declare interface ConfigurationDb{
    _id:string;
}

// ------------------------------------------------------------------------------------------------------------------------------------

declare interface MigrationDb{
	_id:string,
	lastUpdate:Date,
	version:number
}

// ------------------------------------------------------------------------------------------------------------------------------------


interface Dictionary<T> { [key: string]: T; }

declare interface SectionDb {
    _id: ObjectId;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    content: any;
    contentLinks: Dictionary<string>;
}


// ------------------------------------------------------------------------------------------------------------------------------------

declare interface TicketDb<T> {
    _id: ObjectId;
    type: string;
    data: T;
    createdDate: Date;
    expirationDate: Date;
}
// declare interface RegistrationTicketDb extends TicketDb<RegisterByPatientDto|RegisterByHisEmployeeDto>{
//     /** kod przeslany SMSem lub wygenerowany PIN */
//     authCode?: string;
//     smsNumerOfTries?: number; 
//     smsSentAt?: Date;
//     authCodeNumerOfTries?: number;
// }
// declare interface PasswordRemindTicketDb extends TicketDb<{userId:string}>{
    
// }


// ------------------------------------------------------------------------------------------------------------------------------------

declare interface FileDb {
    _id: ObjectId;
    mimeType: string;
    ext: string;
    path: string;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    albumIds: ObjectId[];
    author: string;
    size: {
        width: number;
        height: number;
    };
    preview?: string;
    thumbnail?: string;
}

declare interface AlbumDb {
    _id: ObjectId;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
}


// ------------------------------------------------------------------------------------------------------------------------------------

declare interface CommentDb {
    _id: ObjectId;
    contentItemId: ObjectId;
    content: string;
    status: string;
    createdDate: Date;
    modifiedDate: Date;
    ipaddress: string;
}

// ------------------------------------------------------------------------------------------------------------------------------------

declare interface AuditFeatureDb {
    createdDate: Date;
    modifiedDate: Date;
    author: string;
}
declare interface MenuFeatureDb {
    position?: number;
    showInMenu: boolean;
}
declare interface SlugFeatureDb {
    slug?: string;
}
declare interface RenderFeatureDb {
    publishDate?: Date; //tego nie ma widget
    published: boolean; //tego nie ma widget
    content: any;
    layout?: string;
    contentLinks?: Dictionary<string>; // czy to powinno byc zwracane do/z klienta
}
declare interface ContentItemDb extends AuditFeatureDb {
    _id: ObjectId;
    type: string;
    name: string;
    loginRequired: boolean;
    parentId?: ObjectId;
}
declare interface LinkDb extends ContentItemDb, MenuFeatureDb {
    link?: string;
    linkId?: string;
}
declare interface GroupDb extends ContentItemDb, MenuFeatureDb, SlugFeatureDb { }
declare interface PageDb extends ContentItemDb, MenuFeatureDb, RenderFeatureDb, SlugFeatureDb { }
declare interface BlogDb extends ContentItemDb, MenuFeatureDb, RenderFeatureDb, SlugFeatureDb {
    commentingArticles: boolean
    newCommentsRequireApproval: boolean
    subscribersList?: string[];
    allowSubscribers: boolean;
}
declare interface ArticleDb extends ContentItemDb, RenderFeatureDb, SlugFeatureDb {
    tags: string[];
    categories: string[];
    postImage?: string;
    newsletterSent: boolean;
    description?: string;
    expirationDate?: Date;
}


