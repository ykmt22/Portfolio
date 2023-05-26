var img_links = [];
let slideIndex = 0;

$.getJSON('https://script.google.com/macros/s/AKfycbxqJU1pQP4xjOci0GQ7DY8MtvhxIv2Ikac2v0dIeLQ34f4t4luneim1_EhZrSUTYMmHWA/exec', getImages);

function getImages(img_json) {
    console.log(img_json);
    var obj = JSON.parse(JSON.stringify(img_json));

    var baseURL = "https://drive.google.com/uc?export=view&id=";
    // var baseURL = "https://drive.google.com/file/d/$img_id/preview"
    // <iframe src="https://drive.google.com/file/d/1-VTL4aZr205Tf5bh6eIuKsM0m8KgBSLj/preview" width="640" height="480" allow="autoplay"></iframe>

    for (var i = 0; i < obj.data.length; i++) {
        img_links.push(baseURL + obj.data[i].img_id);
        // img_links.push(baseURL.replace('$img_id', obj.data[i].img_id));
    }

    carouselBuilder(img_links);
    showSlidesAuto();
}

// Carousel Controller

function carouselBuilder() {

    console.log(img_links.length);

    for (let i = 0; i < img_links.length; i++) {
        var newDiv = document.createElement('div');

        var newImg = document.createElement('img');
        newImg.className = 'cover_image';
        newImg.width = "800";
        newImg.height = "480";
        newImg.src = img_links[i];

        // manipulate image here

        

        // const image = new Image();
        // image.src = newImg.src;
        // console.log(image.src);

        // var canvas = document.createElement('canvas');
        // canvas.width = newImg.width;
        // canvas.height = newImg.height;

        // const ctx = canvas.getContext('2d');
        // ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height)

        // canvas.toBlob(function(blob){
            // console.log(blob);
            // newImg.src = URL.createObjectURL(blob);
            // console.log(newImg.src);
        // }, newImg.mimeType, 50);

        var chidDiv = document.createElement('div')
        chidDiv.className = "mySlides fade";
        chidDiv.id = 'slide_'+(i+1);
        chidDiv.innerHTML = `<div class="numbertext"> ${i + 1} / ${img_links.length} </div>`;
        chidDiv.appendChild(newImg);
        // chidDiv.appendChild(canvas);

        // newDiv.innerHTML = `<div class="mySlides fade" id="slide_${i + 1}">
        //                         <div class="numbertext"> ${i + 1} / ${img_links.length} </div>
        //                         <img class = "cover_image" src="${img_links[i]}" width="800" height="480"></img>
        //                     </div>
        //                     `;

        newDiv.appendChild(chidDiv);
        newDiv.classList.add('parentSlide')

        document.querySelector('div.slideshow').appendChild(newDiv);
    }

}

function showSlidesAuto() {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlidesAuto, 6000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { 
        slideIndex = 1 
    }
    if (n < 1) { 
        slideIndex = slides.length 
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}