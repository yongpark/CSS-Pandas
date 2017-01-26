import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';

class CSSPandas{
  constructor(levels, $el){
    this.el = $el;
    this.levels = levels;
    this.currentLevel = 0;
    if(isNaN(window.localStorage.level)){
      window.localStorage.level = 0;
    }
    if(window.localStorage.level !== 0){
      this.currentLevel = window.localStorage.level;
    }
    this.setupPandas(this.levels[this.currentlevel]);
    this.levelButtons();
  }

  setupPandas(currentLevel){
    if(this.currentLevel === 0){
      $('prev-level-button').prop('disabled', true);
    } else {
      $('prev-level-button').prop('disabled', false);
    }

    if (this.currentLevel === 4){
      $('next-level-button').prop('disabled', true);
    } else {
      $('next-level-button').prop('disabled', false);
    }
    if(!window.localStorage.completedLevels){
      window.localStorage.completedLevels = [];
    }
    window.localStorage.level = this.currentLevel;

    // this.removestyling
    $('.directions').append(this.currentLevel.directions);
    $('.level-number').html(`Level ${this.currentLevel} of 5`);
    $('css-input').append(`<textarea rows=${keys(currentLevel.solution).length} cols='100'></textarea>`);
    // $('html').append()
    // actual css stuff
    //finish tomorrow

    let markupHolder = $("<div/>");
    this.currentLevel.setup.forEach((i, el) =>{
      if(el.nodeType === 1){
        let result = this.markup(el);
        markupHolder.append(result);
      }
    });

    $('.bed').html(this.currentLevel.bedMarkUp);
    $('.hmtl').html('<div>&ltdiv class="bed"&gt' + markupHolder.html() + '&lt/div&gt</div>');

    let bed = $('<img src="./img/bed.png class="bed"></img>');
    $('.right-side').append(bed);
    let animals = currentLevel.animals;
    for(let i =0; i < animals.length; i++){
      let animal = $('<img src="./imgs/${animals[i]}" class="animal"></img>');
      this.el.append(animal);
    }
    this.createInput();
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
    $('prev-level-button').on('click', (e) => {
      e.preventDefault;
      that.currentLevel--;
      that.setupPandas(that.levels[that.currentLevel]);
    });
    $('next-level-button').on('click', (e) => {
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
    $.each(el.attributes, () => {
      if (this.specified) {
        attributes = attributes + ' ' + this.name + '="' + this.value + '"';
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
            window.localStorage.completedLevels.forEach((level) => {
              completedLevels.push(level);
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
