const app = new PIXI.Application();
document.querySelector("div.canvas").appendChild(app.view);

const letterArr = ['a', 'k', 'a', 'q', 'j', 'k'];

// load the texture
app.loader
  .add('a', 'assets/A.png')
  .add('j', 'assets/J.png')
  .add('k', 'assets/K.png')
  .add('q', 'assets/Q.png')
  .add('background', 'assets/background.png')
  .add('spinEnabled', 'assets/spin_enabled.png')
  .add('spinDisabled', 'assets/spin_disabled.png')
  .load((loader, resources) => {
    // set background
    const background = new PIXI.Sprite(resources.background.texture);
    background.width = app.screen.width;
    background.height = app.screen.height;

    // set letterContainer
    const letterContainer = new PIXI.Container();
    letterContainer.x = app.screen.width / 2;
    letterContainer.y = app.screen.height / 2;
    letterContainer.pivot.x = letterContainer.width / 2;
    letterContainer.pivot.y = letterContainer.height / 2;

    // set button spin
    const textureSpinEnabled = resources.spinEnabled.texture;
    const textureSpinDisabled = resources.spinDisabled.texture;
    const buttonSpin = new PIXI.Sprite(textureSpinEnabled);
    buttonSpin.anchor.set(0.5);
    buttonSpin.x = app.screen.width - 100;
    buttonSpin.y = app.screen.height - 100;
    buttonSpin.interactive = true;
    buttonSpin.on('pointerup', onButtonUp);

    let rotationVar = 0;
    function onButtonUp() {
      this.texture = textureSpinDisabled;
      this.interactive = false;
      rotationVar = 0.03;
    }

    // set letters
    const RADIUS = 150;
    for (let i = 0; i < letterArr.length; i++) {
      const letter = new PIXI.Sprite(resources[letterArr[i]].texture);

      letter.anchor.set(0.5);

      const angle = (Math.PI * 2) / letterArr.length * i;
      letter.x = RADIUS * Math.cos(angle);
      letter.y = RADIUS * Math.sin(angle);

      letter.width = 128;
      letter.height = 128;
      letter.rotation = (i * (360 / letterArr.length) + 90) * (Math.PI / 180);
      letterContainer.addChild(letter);
    }

    const resetSpin = () => {
      letterContainer.rotation = 0;
      rotationVar = 0;

      buttonSpin.texture = textureSpinEnabled;
      buttonSpin.interactive = true;
    };

    const animation = () => {
      if (letterContainer.rotation >= Math.PI * 2) {
        resetSpin();
      } else {
        letterContainer.rotation += rotationVar;
      }
    };

    app.stage.addChild(background);
    app.stage.addChild(buttonSpin);
    app.stage.addChild(letterContainer);

    app.ticker.add(animation);
});
