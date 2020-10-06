'use strict'
let storage = [];
HornConst.prototype.render = function(){
    const tmpl = $('#photo-template').html();
    const $createsec = $('<section></section>');
    $createsec.html(tmpl);
    $createsec.find('h2').text(this.title);
    $createsec.find('img').attr('src', this.image_url);
    $createsec.find('p').text(this.desc);
    $('main').append($createsec);
}

$(document).ready(function(){

    $.ajax('data/page-1.json')
    .then(hrn =>{
        hrn.forEach((type) =>{
            new HornConst(type).render();
        });
    });

});


function HornConst(Horn) {
    this.title = Horn.title;
    this.image_url = Horn.image_url;
    this.keyword = Horn.keyword;
    this.hornnum = Horn.hornnum;
    this.desc = Horn.desc;
    storage.push(this);
}