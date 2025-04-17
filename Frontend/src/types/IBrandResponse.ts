export interface IBrandResponse
{
    success : boolean,
    message : string,
    data : {
        brand_name  : string,
        brand_image : string,
        rating      : number,
        country     : string,
        updated_at  : string,
        created_at  : string,
        brand_id    : number
    }
}