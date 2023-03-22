
document.addEventListener("DOMContentLoaded",loadFooterContent);


function loadFooterContent(){

    let footerContent = {
        lenguageContent :null ,
        commonContent:null
    }

    fetch("/json/footer-info.json")
    .then(response => {
        return response.json()
    })
    .then(data => {

        footerContent.commonContent = data.common;
        

        switch(navigator.language){
            case "es":
            case "es-ES":
                footerContent.lenguageContent = data.spanish;
                break;
            
            default:
                footerContent.lenguageContent = data.english;     
        }

        document.querySelector("#logo-footer").src = footerContent.commonContent.logoImg;
        loadExploreList(footerContent.lenguageContent.exploreList);
        loadFollowList({
            followListTitle: footerContent.lenguageContent.followListTitle,
            followListId : footerContent.commonContent.followListId,
            followListImgs: footerContent.commonContent.followListImgs,
            followListUrls: footerContent.commonContent.followListUrls
        });
        loadContactList(footerContent.lenguageContent.contactList);

    })
}

function loadContactList(data){
    document.querySelector("#ul-contac_us")
    .querySelector(".title")
    .innerHTML = data.title;

    document.querySelectorAll("label").forEach(label => {
        switch(label.htmlFor){
            case "name":
                label.innerHTML = data.name;
                break;

            case "email":
                label.innerHTML = data.email;
                break;

            case "message":
                label.innerHTML = data.message;
                break;
        }
    })

    document.querySelector("#form-footer")
    .querySelector("button")
    .innerHTML = data.submit;


}

function loadExploreList(data){
    let exploreSection = document.querySelector("#exploreSection").querySelectorAll("li");
    
    exploreSection[0].querySelector("h3").innerHTML = data.title;
    exploreSection[1].querySelector("a").innerHTML = data.home;
    exploreSection[2].querySelector("a").innerHTML = data.howToUse;
    exploreSection[3].querySelector("a").innerHTML = data.pricing;
}

function loadFollowList(data){
    document.querySelector("#followSection")
    .querySelectorAll("li").forEach(li => {
        if(li.className === "title"){
            li.querySelector("h3").innerHTML = data.followListTitle;
        }
        let liA = li.querySelector("a");
        if(liA) liA.innerHTML= data.followListId;
        let liImg = li.querySelector("img");
        if(liImg){
            let liImgList = data.followListImgs;
            let liUrlList = data.followListUrls;
            switch(li.id){
                case "instagram":
                    liImg.src = liImgList.instagramImg;
                    liA.href = liUrlList.instagramUrl;
                    break;
                case "youtube":
                    liImg.src = liImgList.youtubeImg;
                    liA.href = liUrlList.youtubeUrl;
                    break;
                case "tiktok":
                    liImg.src = liImgList.tiktokImg;
                    liA.href = liUrlList.tiktokUrl;
                    break;
                case "facebook":
                    liImg.src = liImgList.facebookImg;
                    liA.href = liUrlList.facebookUrl;
                    break;
            }
        }

    })

}