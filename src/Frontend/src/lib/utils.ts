import convert from 'xml-js';
import {Buffer} from 'buffer';

export const downloadFile = (data: unknown) => {
    // @ts-expect-error
    window.Buffer = window.Buffer || Buffer;
    const xml = convert.json2xml(JSON.stringify(data), {compact: true});
    const element = document.createElement("a");
    const file = new Blob(['<?xml version="1.0" encoding="UTF-8"?>' + xml], {type: 'application/xml'});
    element.href = URL.createObjectURL(file);
    element.download = `export-${new Date().getTime()}.xml`; 
    document.body.appendChild(element);
    element.click();
    element.parentNode?.removeChild(element)
  }