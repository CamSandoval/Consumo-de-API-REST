
const url_Api = 'https://api.thecatapi.com/v1/images/search?limit=3';
const img1 = document.getElementById('Img1');
const img2 = document.getElementById('Img2');
const img3 = document.getElementById('Img3');
const buttonChange = document.getElementById('change');

buttonChange.addEventListener('click',changeTheCat);

async function changeTheCat(){
    try{
        const cat = await fetch(url_Api);
        console.log(cat);
        const imgCat= await cat.json();
        console.log(imgCat);
        img1.src = imgCat[0].url;
        img2.src = imgCat[1].url;
        img3.src = imgCat[8].url;
    }catch(error){
        console.log(new Error(error));
    }
}

changeTheCat();
