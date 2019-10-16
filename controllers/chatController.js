
app.controller('chatController', function($scope,$filter,chatService,userService,SocketService) 
{
    $scope.HHmmss = $filter('date')(new Date(), 'HH:mm:ss');
    $scope.msgData = [];
    $scope.currUser = sessionStorage.getItem('Username');
    $scope.currUserId=sessionStorage.getItem('UserID');
    // let message = document.getElementById('message')
    $scope.getUser = (item) =>
    {
        sessionStorage.setItem('receiverID',item._id);
        sessionStorage.setItem('receiverName',item.firstName);
        $scope.receiverName=sessionStorage.getItem('receiverName');
        $scope.getUserMessage();
    }
    
    $scope.getUserMessage = function () {
        chatService.getUserMsg($scope);
    }

    
    userService.getallUsers().
    then(res=>
        {
            $scope.users = res.data;
            console.log(res.data);
           $scope.users = res.data;

        })
    .catch(err=>
        {
            console.log(err);
        });

     
    $scope.add = function() {
        let sendMsgData={
        senderName : sessionStorage.getItem('Username'),
        senderId : sessionStorage.getItem('UserID'),
        receiverName : sessionStorage.getItem('receiverName'),
        receiverId : sessionStorage.getItem('receiverID'),
        message:$scope.msg
        }
        SocketService.emit("newMsg", sendMsgData);
        $scope.msgData.push(sendMsgData);
        console.log($scope.msgData);
    }
  
    var senderId = sessionStorage.getItem('UserID');
    SocketService.on(senderId, function (message) {
        console.log('Message emitted');
       
        if (sessionStorage.getItem('receiverID') == message.senderId) 
        {
            
            if ($scope.msgData === undefined) 
            {console.log("sessionstorage",message)
                $scope.msgData = message;}
            else 
                $scope.msgData.push(message); 
               
        }
    })

    $scope.clearTextArea = function () {
        $scope.msg = "";
    }

   
})