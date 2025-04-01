document.addEventListener("DOMContentLoaded",function(){
    const searchbutton=document.getElementById("search");
    const userinput=document.getElementById("user-input");
    const statscontainer=document.querySelector(".stats-container");
    const easyprogresscircle=document.querySelector(".easy-progress");
    const mediumprogresscircle=document.querySelector(".medium-progress");
    const hardprogresscircle=document.querySelector(".hard-progress");
    const easylevel=document.querySelector("#easy-level");
    const mediumlevel=document.querySelector("#medium-level");
    const hardlevel=document.querySelector("#hard-level");
    const cardstatscontainer=document.querySelector(".stats-card");
//return true or false based on a regex
   function validateusername(username){
  if(username.trim()===""){
    alert("Username should not be empty");
    return false;
  }
  const regex=/\b\w+\b(?: \b\w+\b)*/;
  const ismatching=regex.test(username);
  if(!ismatching){
    alert("invalid usrename");
  }
  return ismatching;
}

async function fetchuserdetails(username) {
    const URL=`https://leetcode-stats-api.herokuapp.com/${username}`;
    try{
        searchbutton.textContent="searching....";
        searchbutton.disabled=true;
        const response= await fetch(URL);
        if(!response.ok){
            throw new Error("unable to fetch user detais");
        }
        const data=await response.json();
        console.log("logging data: ",data);
        displayuserdata(data);
    }
    catch(error){
     statscontainer.innerHTML="<p>No data found <p>";
    }
    finally{
        searchbutton.textContent="search";
        searchbutton.disabled=false;
    }
    
}
function displayuserdata(data){
    const totalsolved=data["totalSolved"];
    const totalquestions=data["totalQuestions"];
    const easysolved=data["easySolved"];
    const mediumsolved=data["mediumSolved"];
    const hardsolved=data["hardSolved"];
    const totaleasy=data["totalEasy"];
    const totalmedium=data["totalMedium"];
    const totalhard=data["totalHard"];
    updateprogress(easysolved,totaleasy,easylevel,easyprogresscircle);
    updateprogress(mediumsolved,totalmedium,mediumlevel,mediumprogresscircle);
    updateprogress(hardsolved,totalhard,hardlevel,hardprogresscircle);
    const cardsdata=[
        {
            label:"AcceptanceRate : ",value:data["acceptanceRate"]
        },
        {
            label:"Ranking : " ,value:data["ranking"]
        },
        {
            label:"Contributionpoints :",value:data["contributionPoints"]
        },
        {
            label:"Reputation :",value:data["reputation"]
        }
    ]
    console.log(cardsdata);
    cardstatscontainer.innerHTML=cardsdata.map(
        data=>{
            return `<div class='card'>
            <h3>${data.label}</h3>
            <p>${data.value}</p>
            </div>`
        }
    ).join(" ")
    }
function updateprogress(solved,total,level,circle){
    const progressDegree=(solved/total)*100;
    console.log(progressDegree);
    circle.style.setProperty("--progress-degree",`${progressDegree}%`);
    level.textContent=`${solved}/${total}`;
}
    searchbutton.addEventListener("click",function(){
        const username=userinput.value;
        console.log("loggin username:",username);
        if(validateusername(username)){
            fetchuserdetails(username);
        }
    })
})