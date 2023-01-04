const VAR = {
    ENV: "local",
    ADMIN_BASE_URL_STAGE: "https://stage.admin.redcurry.co/",
    ADMIN_BASE_URL_PROD: "https://admin.redcurry.co/",
    ADMIN_BASE_URL_LOCAL: "http://localhost:3000/",
    MAGIC_PUBLIC_KEY:"pk_live_DB4074FE2B7C10D9"
}

const getAdminBaseUrl=()=>{
    if(VAR.ENV === "staging") return VAR.ADMIN_BASE_URL_STAGE
    if(VAR.ENV === "production") return VAR.ADMIN_BASE_URL_PROD
    if(VAR.ENV === "local") return VAR.ADMIN_BASE_URL_LOCAL
}

export {VAR, getAdminBaseUrl}