export const levels =  () => {

  return[
    {
      level: 1,
      directions: '<p>Welcome to CSS Panda, a CSS tutorial inspired by Flexbox Froggy! We’ll be learning to use CSS to select the various stuffed animals on the bed.<strong>A</strong> selects elements of type <strong>A<strong>. Element type refers to the type of tag. &ltdiv&gt, &ltul&gt, and &ltli&gt are all different elements. Try and selecting the pandas on the bed with their selector tag.</p>',
      animals: ['panda.svg', 'panda.svg'],
      nested_animals: [],
      solution: 'panda',
      setup: `
      <panda/>
      <panda/>
      `
      ,
    },
    {
      level: 2,
      directions: '</p>ID tags allow you to further specify which element you can choose. There are now two stuffed bunnies on the bed. Let’s to try select only the blue bunny this time.</p>',
      animals: ['bunny.svg', 'blue_bunny.svg'],
      nested_animals: [],
      solution: 'blue',
      setup: `
      <bunny/>
      <bunny id="blue"/>
      `
      ,
    },
    {
      level: 3,
      directions: '</p>Class tags function similarly to ID tag allowing you to specify which element you can choose. There are two of the same duck on the screen, one with a class of "better-duck". Let’s choose the "cuter panda".</p>',
      animals: ['panda.svg', 'panda.svg'],
      nested_animals: [],
      solution: '.cuter-panda',
      setup: `
      <panda/>
      <panda class="cuter-panda"/>
      `
      ,
    },
    {
      level: 4,
      directions: '</p>You can use descendant selectors to select elements inside another elemnt, also called a parent element. For example, to choose a &ltpanda&gt element inside a &ltbunny&gt you input "bunny panda". Now let’s try and select the bunny held by the panda.</p>',
      animals: ['panda.svg', 'elephant.svg'],
      nested_animals: ['bunny.svg'],
      solution: 'panda bunny',
      setup: `
      <panda>
        <bunny"/>
      </panda>
      <elephant/>
      `
      ,
    },
    {
      level: 5,
      directions: '</p>Let’s put what you learned into practice. Using a combination of the previous levels, let’s select the cuter duck held by the elephant.</p>',
      animals: ['panda.svg', 'duck.svg', 'elephant.svg', 'elephant.svg'],
      nested_animals: ['duck.svg','duck.svg'],
      solution: 'panda bunny.cuter-bunny ',
      setup: `
      <panda/>
      <duck class="cuter-duck"/>
      <elephant>
      <duck/>
      </elephant>
      <elephant>
      <duck class="cuter-duck"/>
      </elephant>
      `
      ,
    },
  ];
};
