// used to ensure only number input from text field
export function setInputFilter(
  textbox: Element,
  inputFilter: (value: string) => boolean
): void {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop"
  ].forEach(function (event) {
    textbox.addEventListener(
      event,
      function (
        this: (HTMLInputElement | HTMLTextAreaElement) & {
          oldValue: string;
          oldSelectionStart: number | null;
          oldSelectionEnd: number | null;
        }
      ) {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (Object.prototype.hasOwnProperty.call(this, "oldValue")) {
          this.value = this.oldValue;
          if (this.oldSelectionStart !== null && this.oldSelectionEnd !== null) {
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          }
        } else {
          this.value = "";
        }
      }
    );
  });
}

// make sure only numbers enter input field
export const numbersOnly = (input: HTMLInputElement) =>
  setInputFilter(input, value => /^\d*$/.test(value));

export const waitFor = (duration = 2000) =>
  new Promise(resolve => setTimeout(resolve, duration));

export const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = window.atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
