const { IgApiClient } = require('instagram-private-api');
const InstaService=require('./Post_Service')


const sendFollowRequest=async(accountName,selectedUser)=>{

    const detailsArr=await InstaService.getDetails(selectedUser)
 
    const selectedUser_data=detailsArr[2]
    

    for(let i=0;i<selectedUser_data.length;i++)
    {
        const uname=selectedUser_data[i].username
        const password=selectedUser_data[i].password

        const ig = new IgApiClient();

        var success=await InstaService.login(ig,uname,password)

        if(success)
        {    
            try
            {
                const accountID=await ig.user.getIdByUsername(accountName)
                
                await ig.friendship.create(id=accountID)
                
            }
            catch(err)
            {
                console.log(err)

                return {'type':1,'message':'account name not found ...'}
            }
        }
    }
    
    return {'type':2,'message':'Follow Request send ...'}


}

module.exports={
    sendFollowRequest
}