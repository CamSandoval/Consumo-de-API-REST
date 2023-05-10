
const url_Api_random = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS';
const api_url_favorites = 'https://api.thecatapi.com/v1/favourites?api_key=live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS';
const api_url_favorites_delete = (id)=> `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS`;
const spanError = document.getElementById('error');
const buttonChange = document.getElementById('change');

buttonChange.addEventListener('click',changeTheCat);

async function changeTheCat(){
    const cat = await fetch(url_Api_random);
    try{
        const imgCat= await cat.json();
        console.log('Random');
        console.log(imgCat);
        const img1 = document.getElementById('Img1');
        const img2 = document.getElementById('Img2');

        const buttonSave1 = document.getElementById('btn1');
        const buttonSave2 = document.getElementById('btn2');
        img1.src = imgCat[0].url;
        img2.src = imgCat[1].url;

        buttonSave1.onclick = () => saveFavouriteCat(imgCat[0].id);
        buttonSave2.onclick = () => saveFavouriteCat(imgCat[1].id);
    }catch(error){
        console.log(new Error(error));
    }
}

async function loadFavourites(){
    const favourites = await fetch(api_url_favorites);
    const data = await favourites.json();
    console.log('Fav');
    console.log(data);

        
    if(favourites.status != 200){
        spanError.innerText= `Hubo un error ${favourites.status} ${data.message}`;
    }else{
        const section = document.getElementById('favoritesMichis');
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const texth2 = document.createTextNode('Favoritos');
        h2.appendChild(texth2);
        section.appendChild(h2);
        data.forEach(i => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const nodeBtn = document.createTextNode('Sacar al michi de favoritos');

            img.src= i.image.url;
            img.width= 150;
            img.height = 200;
            btn.appendChild(nodeBtn);
            btn.onclick = ()=> deleteFavouriteCat(i.id)
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);

        });
    }
}

async function saveFavouriteCat(id){
    const res = await fetch(api_url_favorites,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await res.json();
    console.log(data);
    if(res.status !== 200){
        spanError.innerText= `Hubo un error ${res.status} ${data.message}`;
    }else{
        console.log('Gato guardado en favoritos');
        loadFavourites()
    }
}

async function deleteFavouriteCat(id){
    const res = await fetch(api_url_favorites_delete(id),{
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
        },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);

    if(res.status !== 200){
        spanError.innerHTML= `Hubo un error ${res.status} ${data.message}`;
    }else{
        console.log('Gato eliminado en favoritos');
        loadFavourites();
    }
}
changeTheCat();
loadFavourites();
