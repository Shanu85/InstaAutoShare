const Cookie=require('../model/cookieSchema')

const readState=async (ig,username)=>{

    const json=await Cookie.findOne({'username':username})

    if(json)
    {
        const {cookies,state}=JSON.parse(json.userdata)

        ig.state.deviceString = state.deviceString;
        ig.state.deviceId = state.deviceId;
        ig.state.uuid = state.uuid;
        ig.state.phoneId = state.phoneId;
        ig.state.adid = state.adid;
        ig.state.build = state.build;
        await ig.state.deserializeCookieJar(cookies);

        return true
    }

    return false
    
}

const saveState=async(ig,username)=>{

    const cookies = await ig.state.serializeCookieJar();
    const state = {
        deviceString: ig.state.deviceString,
        deviceId: ig.state.deviceId,
        uuid: ig.state.uuid,
        phoneId: ig.state.phoneId,
        adid: ig.state.adid,
        build: ig.state.build,
    };

    var userdata=JSON.stringify({cookies: JSON.stringify(cookies),state})

    await Cookie.create({username,userdata})
}

const deleteEntry=async(IG_USERNAME)=>{

    await Cookie.deleteOne({username:IG_USERNAME})
    .then(()=>{
        console.log('entry deleted ...')
    })
    .catch((err)=>{
        console.log(err)
    })
}

const handleLogin=async(ig,IG_USERNAME,IG_PASSWORD)=>{
    try
    {
        await ig.account.login(IG_USERNAME, IG_PASSWORD);

        await saveState(ig,IG_USERNAME)

        return true
    }
    catch
    {
        return false
    }
}

const setCookies=async(ig,IG_USERNAME,IG_PASSWORD)=>{
    
    ig.state.generateDevice(IG_USERNAME);
    var response=await readState(ig,IG_USERNAME);

    if(response)
    {
        try
        {
            // after setting the state, try to fetch data of some random media
            var response=await ig.media.info('3128717732603178663')
        }
        catch
        {
            // delete the user entry in cookieData.json
            console.log('error')

            await deleteEntry(IG_USERNAME)
            
            var successLogin=await handleLogin(ig,IG_USERNAME,IG_PASSWORD)

            if(!successLogin)
            {
                console.log("Incorrect Credentials .....")
                return false
            }
        }
    }
    else
    {
        var successLogin=await handleLogin(ig,IG_USERNAME,IG_PASSWORD)

        if(!successLogin)
        {
            console.log("Incorrect Credentials .....")

            return false
        }
    }

    return true
}

module.exports={
    handleLogin,
    setCookies,
    deleteEntry
}