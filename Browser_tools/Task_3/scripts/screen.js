class ScreenElement {

  constructor(name, description) {
    const screen = window.screen;
    this.name = name;
    this.description =" - " + description + ": ";
    this.call = screen[this.name];
  }

  show() {
    content.insertAdjacentHTML('afterend',this.name + this.description + this.call + '<br>');
  }

}
let availHeightInformation = new ScreenElement ('availHeight', "Get the available height of your screen");
let availWidthInformation = new ScreenElement ('availWidth', "Get the available width of your screen");
let colorDepthInformation = new ScreenElement ('colorDepth', "Get the bit depth of the color palette(how mucth bits per pixel)");
let heightInformation = new ScreenElement ('height', "Get the total height of your screen");
let pixelDepthInformation = new ScreenElement('pixelDepth', "Get the color resolution of your screen:");
let widthInformation = new ScreenElement('width', "Get the color resolution of your screen");

availHeightInformation.show();
availWidthInformation.show();
colorDepthInformation.show();
heightInformation.show();
pixelDepthInformation.show();
widthInformation.show();