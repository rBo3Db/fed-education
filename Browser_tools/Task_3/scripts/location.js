class LocationElement {

    constructor(name, description) {
      const location = window.location;
      this.name = name;
      this.description =" - " + description + ": ";
      this.call = location[this.name];
    }
  
    show() {
      content.insertAdjacentHTML('afterend',this.name + this.description + this.call + '<br>');
    }
  
  }
  let hashInformation = new LocationElement ('hash', "Return the anchor part of a URL. Assume that the current URL is http://www.example.com/test.htm#part2");
  let searchformation = new LocationElement ('search', "Return the querystring part of a URL. Assume that the current URL is https://www.w3schools.com/submit.htm?email=someone@example.com");
  let hostNameInformation = new LocationElement ('hostname', "Return the hostname of the current URL");
  let hrefIformation = new LocationElement ('href', "The window.location.href property returns the URL of the current page. he window.location object can be used to get the current page address (URL) and to redirect the browser to a new page.");
  let pathNameInformation = new LocationElement('pathName', "Return the path name of the current URL");

  hashInformation.show();
  searchformation.show();
  hostNameInformation.show();
  hrefIformation.show();
  pathNameInformation.show();

//   a. hash
//   b. search
//   c. hostname
//   d. href
//   e. Pathname