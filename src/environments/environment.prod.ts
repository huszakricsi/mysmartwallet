const apiurl = "https://mysmartwalletapi.herokuapp.com/";
export const environment = {
  production: true,
  api: {
    url: apiurl,
    authEndpoint: apiurl + "auth",
    currenciesEndpoint: apiurl + "currencies",
    auth: {
      signOutEndpoint: apiurl + "auth/sign_out",
      signInEndpoint: apiurl + "auth/sign_in",
      validateEndpoint: apiurl + "auth/validate_token"
    },
    accountsEndpoint: apiurl+"accounts"
  }
};
