

function IsCurrentUserMemberOfGroup(groupName, OnComplete) {

        var currentContext = new SP.ClientContext.get_current();;
        var currentWeb = currentContext.get_site().get_rootWeb();

        var currentUser = currentContext.get_site().get_rootWeb().get_currentUser();
        currentContext.load(currentUser);

        var allGroups = currentWeb.get_siteGroups();
        currentContext.load(allGroups);

        var group = allGroups.getByName(groupName);
        currentContext.load(group);

        var groupUsers = group.get_users();
        currentContext.load(groupUsers);

        currentContext.executeQueryAsync(OnSuccess,OnFailure);

        function OnSuccess(sender, args) {
            var userInGroup = false;
            var groupUserEnumerator = groupUsers.getEnumerator();
            while (groupUserEnumerator.moveNext()) {
                var groupUser = groupUserEnumerator.get_current();
                if (groupUser.get_id() == currentUser.get_id() && currentUser.get_id() != 1073741823) {
                    userInGroup = true;
                    break;
                }
            }  
            OnComplete(userInGroup);
        }

        function OnFailure(sender, args) {
            OnComplete(false);
        }    
}


function IsCurrentUserHasContribPerms() 
{
  IsCurrentUserMemberOfGroup("CMS", function (isCurrentUserInGroup) {
    if(isCurrentUserInGroup)
    {
	    document.getElementById("suiteBarDelta").style.display = "none";
	    document.getElementById("s4-ribbonrow").style.display = "none";
	    document.getElementById("DeltaPageStatusBar").style.display = "none";
	    
	    document.getElementById("s4-workspace").classList.add("cmsLogin");
    }else{
		if(document.getElementById("suiteBarDelta") != null)
		{
			document.getElementById("suiteBarDelta").style.display = "block";
			document.getElementById("s4-ribbonrow").style.display = "block";
			document.getElementById("DeltaPageStatusBar").style.display = "block";
		}
    
    }
    
  });

}
ExecuteOrDelayUntilScriptLoaded(IsCurrentUserHasContribPerms, 'SP.js');