import { CoderSnack, CoderSnackResponse } from './domain/types';

const fetch = require("node-fetch");

export async function fetchCodersnackTest(): Promise<any> {

    const result = await fetch('https://api-jesidea.netlify.app/.netlify/functions/codersnack-random?category=reactjs&entity=snack');

    return result;

}

export async function fetchRandomCodersnackByCategory(category:string = 'reactjs'): Promise<CoderSnackResponse> {
    const preResult = await fetch(`https://api-jesidea.netlify.app/.netlify/functions/codersnack-random?category=${category}&entity=snack`);
    const result = await preResult.json();

    return {
        id: result.id,
        snack: {
            id: result.codersnack.id,
            header: result.codersnack.header,
            created_at: result.codersnack.created_at,
            explanation: result.codersnack.explanation,
            featured_image_url: result.codersnack.featured_image_url,
            url: result.codersnack.weblink
        },
        category: {
            id: result.codersnacks_category.id,
            header: result.codersnacks_category.header,
            key: result.codersnacks_category.key,
            description: result.codersnacks_category.description,
            image_url: result.codersnacks_category.image_url
        }
    }

}