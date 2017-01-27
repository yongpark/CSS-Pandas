import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';

class CSSPandas{
  constructor(levels, $el){
    this.el = $el;
    this.levels = levels;
    this.currentLevel = 0;
    if(isNaN(window.localStorage.level)){
      window.localStorage.level = "0";
    }
    if(window.localStorage.level !== "0"){
      this.currentLevel =  parseInt(window.localStorage.level);
    }
    this.setupPandas(this.levels[this.currentLevel]);
    this.levelButtons();
  }

  setupPandas(currentLevel){
    if(this.currentLevel === 0){
      $('.prev-level-button').prop('disabled', true);
    } else {
      $('.prev-level-button').prop('disabled', false);
    }

    if (this.currentLevel === 4){
      $('.next-level-button').prop('disabled', true);
    } else {
      $('.next-level-button').prop('disabled', false);
    }
    if(!window.localStorage.completedLevels){
      window.localStorage.completedLevels = [];
    }
    window.localStorage.level = currentLevel;

    this.reset();
    $('.directions').append(currentLevel.directions);
    $('.level-number').html(`Level ${currentLevel.level} of 5`);
    $('.css-input').append(`<textarea rows=${keys(currentLevel.solution).length} cols='80'></textarea>`);
    // $('html').append()
    // actual css stuff
    //finish tomorrow

    let markupHolder = $("<div/>");
    $(currentLevel.setup).each((i, el) =>{
      if(el.nodeType == 1){
        let result = this.markup(el);
        markupHolder.append(result);
      }
    });

    $('.bed').html(currentLevel.bedMarkUp);
    $('.html').html('<div>&ltdiv class="bed"&gt' + markupHolder.html() + '&lt/div&gt</div>');

    let bed = $('<img src="./images/bed.svg" class="bedsvg"></img>');
    $('.frame').append(bed);
    let animals = currentLevel.animals;
    let nested_animals = currentLevel.nested_animals;
    for(let i =0; i < animals.length; i++){
      let animal = $(`<img src="./images/${animals[i]}" class="animal"></img>`);
      this.el.append(animal);
    }
    for(let j = 0; j < nested_animals.length; j++){
      let nested = $(`<img src="./images/${nested_animals[j]}" class="nested-animal"></img>`);
      this.el.append(nested);
    }
    this.createInput();
  }

  reset(){
    this.el.empty();
    this.disableFinishLevelButton();
    $('finish-level-button').prop('disabled', true);
    $('.directions').empty();
    $('.bed').empty();
    $('.css-input').empty();
    $('.html').empty();
  }


  enableFinishLevelButton(){
    let button = $('.finish-level-button');
    button.prop('disabled', false);
  }

  disableFinishLevelButton(){
    let button = $('.finish-level-button');
    button.prop('disabled', true);
  }

  levelButtons(){
    let that = this;
    let finishLevelButton = $('.finish-level-button');
    finishLevelButton.on('click', (e) => {
      e.preventDefault();
      this.currentLevel++;
      if (this.currentLevel === 5){
        this.currentLevel = 0;
      }
      this.setupPandas(this.levels[this.currentLevel]);
      this.disableFinishLevelButton();
    });
    $('.prev-level-button').on('click', (e) => {
      e.preventDefault;
      that.currentLevel--;
      that.setupPandas(that.levels[that.currentLevel]);
    });
    $('.next-level-button').on('click', (e) => {
      e.preventDefault;
      that.currentLevel++;
      that.setupPandas(that.levels[that.currentLevel]);
    });
  }

  markup(el){
    let children = el.children.length > 0 ? true: false;

    let elName = el.tagName.toLowerCase();
    let wrapper = $('<div/>');
    let attributes = '';
    // console.log(el.attributes);
    $.each(el.attributes, (i, value) => {
      if (value.specified) {
        attributes = attributes + ' ' + value.name + '="' + value.value + '"';
      }
    });
    let space = ' ';
    if(children) {
      wrapper.text('<' + elName + space + attributes + '>');
      $(el.children).each((i, el) => {
        wrapper.append(this.markup(el));
      });
      wrapper.append('&lt;' + elName + '/&gt;');
    } else {
      wrapper.text('<' + elName + space + attributes + '/>');
    }
    return wrapper;
  }

  createInput(){
    let that = this;
    let input = $('textarea');
    let answer = {};
    let wins = 0;
    input.on('keyup', () => {
      answer = {};
      let userInput = input.val();
      if (isEqual(userInput, this.levels[this.currentLevel].solution)){
        setTimeout(() => {
          input.keypress((e) => {
            if(e.which === 13){
              this.currentLevel++;
              if (this.currentLevel === 5){
                this.currentLevel = 0;
              }
              this.setupPandas(this.levels[this.currentLevel]);
            }
          });
        }, 300);
        if (wins === 0){
          let completedLevels = [];
          if(window.localStorage.completedLevels.length > 0){
            window.localStorage.completedLevels.split('').forEach((level) => {
                completedLevels.push(parseInt(level));
            });
          }
          $('.bed').append("<div class='win-level-div'>Next Level!<button class='win-level-button>Next</button></div>'");
          $('.win-level-button').on('click', (e) => {
            e.stopPropagation();
            that.currentLevel++;
            if(that.currentLevel === 10){
              that.currentLevel = 0;
            }
            that.setupPandas(that.levels[that.currentLevel]);
          });
        }
        wins++;
        this.enableFinishLevelButton();
      }else{
        this.disableFinishLevelButton();
      }
    });
  }
}

export default CSSPandas;
