
export const env = "dev"

const url = {
 dev: "https://apild.diginestsolutions.in/public/api/",
}

const IMAGE = {
    dev :'https://apild.diginestsolutions.in/public',
   
}

export const BASE_URL = `${url[env]}`

export const IMG_URL = IMAGE[env]