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

  setupGame(currentLevel){
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
    if(!window.lcaolStorage.completedLevels){
      window.localStorage.completedLevels = [];
    }
    window.localStorage.level = this.currentLevel;
    // this.removestyling
    // $('.details').append(currentLevel.details);
    // $('.level').html(`Level ${this.currentLevel} of 5`);
    // $('css-input').append(`<textarea rows=${keys(currentLevel.solution).length} cols='100'></textarea>`);

    // actual css stuff
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
      this.setupPands(this.levels[this.currentLevel]);
      this.disableNextLevelButton();
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


}
