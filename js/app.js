'use strict'
let storage = [];
HornConst.prototype.render = function(){
    const tmpl = $('#photo-template').html();
    const $createsec = $(`<section class = ${this.keyword} ></section>`);
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
        keyword();
        dropdown();
        $('.die').hide();
    });

});
let keywordArr = [];

function keyword(){
    storage.forEach(val =>{
        if(!keywordArr.includes(val.keyword)){
            keywordArr.push(val.keyword);
            console.log(keywordArr);
        };
    });
};
function dropdown(){
    let click = $('#sort');
    click.empty();
    const option = $('#option');
    keywordArr.forEach(keyword =>{
        let sort = $(`<option value = ${keyword}> ${keyword} </option>`);
        option.append(sort);
    });
}
$('select').on('change',(event) =>{
    let newval = event.target.value;
    $('section').hide();
    $(`.${newval}`).show();
})

function HornConst(Horn) {
    this.title = Horn.title;
    this.image_url = Horn.image_url;
    this.keyword = Horn.keyword;
    this.hornnum = Horn.hornnum;
    this.desc = Horn.description;
    storage.push(this);
};