declare let browser: any;
declare let element: any;
declare let by: any;

/**
 * Usage: selectDropdownByNumber ( selector, index)
 * selector : select element
 * index : index in the dropdown, 1 base.
 */
export function selectDropdownByNumber(selector: string, index: number, milliseconds: number) {
  element(by.css(selector)).all(by.tagName('option'))
    .then((options: any) => {
      options[index].click();
    });
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}

/**
 * Usage: selectDropdownByValue (selector, item)
 * selector : select element
 * item : option(s) in the dropdown.
 */
export function selectDropdownByValue(selector: string, item: string, milliseconds: number) {
  // let desiredOption: any;
  element(by.css(selector)).sendKeys(item);
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}

/**
 * Usage: selectRandomDropdownReturnText ( selector, milliseconds)
 * selector : select random element
 * index : wait time to select value for drop down.
 */
export function selectRandomDropdownReturnText(selector: string, milliseconds: number) {
  element(by.css(selector)).all(by.tagName('option')).then((options: any) => {
    let randomNumber = Math.floor((Math.random() * options.length
    ));
    options[randomNumber].click();
    return options[randomNumber].getText().then((text: string) => {
      return text;
    });
  });
  if (typeof milliseconds !== 'undefined') {
    browser.sleep(milliseconds);
  }
}
