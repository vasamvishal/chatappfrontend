app.service('chatService',function($http,$window)
{
    this.getUserMsg = function($scope) {
    
        $http({
            method: 'GET',
            url: 'http://localhost:3000/getMsg',
        }).then(function (response) {
            let message = [];
            let senderId = sessionStorage.getItem('UserID');
            let receiverId = sessionStorage.getItem('receiverID');         
            
            for(let i=0; i<response.data.result.length; i++)
            {
                let list = response.data.result[i];
                console.log(response.data.result[i]);
                if(senderId == list.sender_id && receiverId == list.receiver_id || senderId == list.receiver_id &&receiverId == list.sender_id)
                {
                    message.push(list); 
                    console.log(message);
                                     
                }
                $scope.msgData = message;
                
                
            }

        }).catch((err)=>{
            return err;
        })
    }
})
