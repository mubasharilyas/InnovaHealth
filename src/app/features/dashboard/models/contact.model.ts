export interface contact {
contactId?: string;
contactStatus?: string;
contactName?: number;
contactGround?: string;
contactSatellite?: string;
contactEquipment?: string;
contactState?: string;
contactStep?: string;
contactDetail?: string;
contactBeginTimestamp?: number;
contactEndTimestamp?: number;
contactLatitude?: number;
contactLongitude?: number;
contactAzimuth?: number;
contactElevation?: number;
contactResolution?: string;
contactResolutionStatus?: string
}
export interface contacts{
    contacts:contact[],
    totalCount:number,
    errorMessage?:string
}