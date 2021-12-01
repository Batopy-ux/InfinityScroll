const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'yZ9ZJA7nfnI9qXZONhmLmVJ_mRuX4qmic1uM4yjFR74';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if images are loaded
function imageLoaded(){
	imagesLoaded++;
	if(imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// Helper function to set attributes
function setAttributes(element, attributes){
	for(const k of Object.keys(attributes)){
		element.setAttribute(k, attributes[k])
	}
}

// Create elements for links and photos
const displayPhotos = () =>{
	imagesLoaded = 0;
	totalImages =photosArray.length;
	photosArray.forEach( photo => {
		//Create <a> and <img>tag
		const item = document.createElement('a');
		setAttributes(item,{href: photo.links.html, 
							target: '_blank',})

		const img = document.createElement('img');
		setAttributes(img,{src: photo.urls.regular, 
						alt: photo.alt_description ,
						title: photo.alt_description,});
		
		img.addEventListener('load', imageLoaded);
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}


//Get photos
async function getPhotos() {
	try {
	const response = await fetch(apiUrl);
	photosArray = await response.json();
	displayPhotos();	
	} catch(e) {
		console.log('Oops, I did it again',e);
	}
	}

window.addEventListener("scroll", () => {
	if(window.innerHeight + window.scrollY >= document.body.offsetHeight-2000 && ready){
		ready = false;
		getPhotos();
	}
	});

getPhotos();

