// import fs from 'fs';
// var proxyURL = 'https://cors-anywhere.herokuapp.com/';
var img_links = [];
let slideIndex = 0;

$.getJSON('https://script.google.com/macros/s/AKfycbwbe8X7rSHrhMdTEz3Gj0QeB4DmkJV9rOeA_V6J-0fWM4fo-nMVaqJ_hQRioQh18PXwtg/exec', getImages);

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

function carouselBuilder(img_links) {

    console.log(img_links.length);

    for (let i = 0; i < img_links.length; i++) {
        var newDiv = document.createElement('div');

        var newImg = document.createElement('img');
        newImg.className = 'cover_image';
        newImg.width = "800";
        newImg.height = "500";
        newImg.src = compressImg(img_links[i], `${newImg.width}x${newImg.height}`, 'low');
        // setTimeout(function () {
        //     var API_URL = `https://img.gs/lkkrljgcxx/${newImg.width}x${newImg.height},quality=low/${img_links[i]}`;
        //     console.log(API_URL);
        //     newImg.src = API_URL;
        // }, 2000);
        newImg.referrerPolicy = 'no-referrer';

        var chidDiv = document.createElement('div')
        chidDiv.className = "mySlides fade";
        chidDiv.id = 'slide_' + (i + 1);
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

        // document.querySelector('div.slideshow').appendChild(newDiv);
        $('div.slideshow').append(newDiv);
    }

}

function compressImg(imageURL, dimentions, quality) {
    let API_URL = `https://img.gs/lkkrljgcxx/${dimentions},quality=${quality}/${imageURL}`;

    // $.get(API_URL, function(data, status){
    //     console.log("data: "+data);
    //     console.log("status: "+status);
    // });

    console.log(API_URL);

    return API_URL;

    // var request = $.ajax({
    //     url: API_URL,
    //     type: 'GET',
    //     crossDomain: true,
    //     contentType: 'image/jpeg',
    //     dataType: 'jsonp',
    //     xhrFields: {
    //         responseType: 'blob'
    //     },
    //     beforeSend: function (xhr) {
    //         xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    //     },
    //     success: function (data, status) {
    //         console.log('data: ' + data);
    //         console.log('status: ' + status);
    //         const url = window.URL || window.webkitURL;
    //         const src = url.createObjectURL(data);
    //         console.log(src);
    //     },
    //     error: function (data, status) {
    //         console.log('ERROR data: ' + data);
    //         console.log('ERROR status: ' + status);
    //     }
    // });

}

function showSlidesAuto() {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    $('.mySlides').css('display', 'none');
    // for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";
    // }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlidesAuto, 6000);
}

function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    // for (i = 0; i < slides.length; i++) {
    //     slides[i].style.display = "none";
    // }
    $('.mySlides').css('display', 'none');
    slides[slideIndex - 1].style.display = "block";
}


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}