//export type loggingMethod = (message?: any, ...optionalParams: any[]) => void;

export function log(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...(optionalParams || []));
}

export function warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, ...(optionalParams || []));
}

export function error(message?: any, ...optionalParams: any[]): void {
    console.error(message, ...(optionalParams || []));
}

