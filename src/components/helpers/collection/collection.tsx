import { ArtworkData } from "@/components/mint/artworkData";

// A set of utility functions for the Artworkdata property

export function getOptioncount (attributes: ArtworkData) {
  // return the count of options in the passed in attributes.options object
  let options = 0;
  for(const option in attributes){
    options++;
  }
  return options;
}

export function getAttributecount (attributes: ArtworkData) {
  // return the count of attributes in the passed in attributes object
  let attributecount = 0;
  for(const attribute in attributes){
    attributecount++;
  }
  return attributecount;

}

export function getAttributesInputs (attributes: ArtworkData) {
    let inputs = [];
    for (const [key, value] of Object.entries(attributes)) {
        if (value["input"]){
            inputs.push(value["input"]);
        }
    }
    return inputs;
}

export function maskString(input) {
  if (input.length > 8) {
    return input.substring(0, 4) + "...." + input.substring(input.length - 4);
  }
  return input;
}