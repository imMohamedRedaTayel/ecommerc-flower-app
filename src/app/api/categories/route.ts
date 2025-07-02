import { JSON_HEADER } from "@/lib/constants/api.constant";
import { NextResponse } from "next/server";


export async function GET() {
    
    const response = await fetch(process.env.API + '/categories' , {
        method:"GET" , 
        headers: {
            ...JSON_HEADER
        }
    })


    const payload = await response.json();
    return NextResponse.json(payload);
    
}