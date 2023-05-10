
const url_Api_random = 'https://api.thecatapi.com/v1/images/search?limit=2';
const api_url_favorites = 'https://api.thecatapi.com/v1/favourites';
const api_url_favorites_delete = (id)=> `https://api.thecatapi.com/v1/favourites/${id}`;
const api_url_upload = 'https://api.thecatapi.com/v1/images/upload';
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
    const favourites = await fetch(api_url_favorites,{
        method: 'GET',
        headers:{
            'X-API-KEY':'live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS'
        }
    });
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
            'X-API-KEY':'live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS'
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
    try{
        const res = await fetch(api_url_favorites_delete(id),{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'X-API-KEY':'live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS'
            },
        });
        const data = await res.json();
        console.log(data);
        console.log('Gato eliminado en favoritos');
        loadFavourites();
    }
    catch{
        const res = await fetch(api_url_favorites_delete(id),{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
            },
        });
        
        if(res.status !== 200){
            spanError.innerHTML= `Hubo un error ${res.status} `;
        }
    }

    
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadForm');
    //FormData es una clase la cual nos permite crear objetos a partir de formularios de google
    //Con el objetivo de que sea mas facil el poder envar estos por una API, claramente en forma de objetos
    const formData = new FormData(form);
    console.log(formData.get('file'));

    const res = await fetch(api_url_upload,{
        method:'POST',
        headers:{
            //Al ser enciado en el body el una instancia de FormData no necesitamos enviar un header de content type
            //'Content-Type':'',
            'X-API-KEY':'live_rfYQ4wXDI7f3lwl4vM5VuXXeD3aNbUV6Pu7I9gMwP5bAVg2W9IFfhUeH3Xvxo4jS'
        },
        //Al ser enciado en el body el una instancia de FormData no necesitamos hacer un JSON.stringify de nuestro objeto
        body:formData,
    })

}
changeTheCat();
loadFavourites();
