let userAccount;

const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
  });
  // const wax = new waxjs.WaxJS({
  //   rpcEndpoint: 'http://wax-all.test:8888',
  //   tryAutoLogin: true,
  //   waxSigningURL: 'http://all-access.wax.test:8113',
  //   waxAutoSigningURL: 'http://idm.wax.test:8113/v1/accounts/auto-accept/'
  // });

  async function login() {
      if(!userAccount){
        const button = document.querySelector('input');
        
        try {

        userAccount = await wax.login();
        

        if(userAccount){
            button.value = userAccount;
            getUserAssetsByCollection(userAccount)
        }
        
        await getCurrentMessage();

        } catch(e) {
            console.log("login error", e.message)
        }
}
  }

  //Get all assets from the a specific collection
async function getUserAssetsByCollection (accountName) {
    console.log("getuSER")
    await axios
      .get(`https://wax.api.atomicassets.io/atomicmarket/v1/assets?owner=${accountName}&collection_name=hackatongen4&page=1&limit=100&order=desc&sort=asset_id`)
      .then(response => {
        if(response.data.success){
        const textAmount = document.querySelector('.text');
        textAmount.value = response.data.data.length
        enableNFT()
        console.log("response", response.data.data)
        }else{
        console.log("response", response.data.data)}
      })
  }

