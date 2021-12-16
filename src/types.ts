export type NetworkApiResponse = {
    [key:string]:{
        icon:string;
        name:string;
        tokenDecimals:number[];
        tokenSymbol:string[];
    }
}