const VAR = {
    ENV: "production",
    STAGE_ADMIN_BASE_URL: "https://stage.admin.redcurry.co/",
    ADMIN_BASE_URL: "https://admin.redcurry.co/",
    MAGIC_PUBLIC_KEY:"pk_live_DB4074FE2B7C10D9"
}

const getAdminBaseUrl=()=>{
    if(VAR.ENV === "staging") return VAR.STAGE_ADMIN_BASE_URL
    return VAR.ADMIN_BASE_URL
}

export {VAR, getAdminBaseUrl}