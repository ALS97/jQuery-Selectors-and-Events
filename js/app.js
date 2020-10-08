'use strict'
let storage = [];
// HornConst.prototype.render = function(){
//     const tmpl = $('#photo-template').html();
//     const $createsec = $(`<section class = ${this.keyword} ></section>`);
//     $createsec.html(tmpl);
//     $createsec.find('h2').text(this.title);
//     $createsec.find('img').attr('src', this.image_url);
//     $createsec.find('p').text(this.desc);
//     $('main').append($createsec);
// }
function renderCreature(horn){
    let template = $(`#${'creature-template'}`).html();
    let markup = Mustache.render(template, horn);
    $(`#${'flexcontainer'}`).append(markup);
  }
  

$(document).ready(pageSelect(1));
        
function pageSelect(pagenum){
    $.ajax(`data/page-${pagenum}.json`)
    .then(hrn =>{
        hrn.sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        hrn.forEach((type) =>{

            let each = new HornConst(type);
            renderCreature(each);
        
          });
        keyword();
        dropdown();
        // $('#photo-template').hide();
    });

};
$('#page').on('change',(event) =>{
    let newpage = event.target.value;
    let pagenum = newpage;
    pageSelect(pagenum);
    $('section').remove();
    //  renderCreature();
    // keyword();
    // dropdown();
})



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
$('#type').on('change',(event) => {
    let newsort = event.target.value;
    if(newsort === 'numhrn'){
        $('section').remove();
        // storage.forEach((type) => 
        let sortedhrn = storage.sort(function(a, b){return a.horns - b.horns});
        sortedhrn.forEach(creature =>{
            renderCreature(creature);
        });
        $('section').show();
        console.log(sortedhrn);
    }
    else if (newsort === 'title'){
        $('section').remove();
        storage.sort((a,b)=> a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        storage.forEach(creature =>{
            renderCreature(creature);
        })
        
    }
    $('section').show();

})

function HornConst(Horn) {
    this.title = Horn.title;
    this.image_url = Horn.image_url;
    this.keyword = Horn.keyword;
    this.horns = Horn.horns;
    this.desc = Horn.description;
    storage.push(this);
};