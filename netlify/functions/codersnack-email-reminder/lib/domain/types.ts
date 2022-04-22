export interface CoderSnackCategory {
    id: number,
    header: string,
    key: string,
    description: string,
    image_url: string
}

export interface CoderSnack {
    id: number,
    header: string,
    created_at: string,
    explanation: string,
    featured_image_url: string,
    url: string
}
export interface CoderSnackResponse {
    id: number,
    snack: CoderSnack,
    category: CoderSnackCategory
}