/**
 *
 * @param {String} type - whether station or sensor marker
 * @param {Number} size - size in pixel of marker
 * @param {String} category - corresponding air pollutant category of DPE
 * @returns svg tag for corresponding marker
 */
function markerGenerator(type, size, category) {
  if (type === "purpleair") {
    let colour = "#aa44aa";
    return `<svg height="${size}" width="${size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <circle cx="${size / 2}" cy="${size / 2}" r="${
      (size-1) / 2
    }"  stroke="rgba(0,0,0,0.5)" stroke-width="1" fill="${colour}"/>
    </svg>`;
  } else if (type === "station") {
    // Determine the color based on the category
    let colour = categorizedColorCode(category);
    return `<svg width="${size}" height="${size}">
    <rect width="${size}" height="${size}" style="fill:${colour};stroke-width:3;stroke:rgba(0,0,0,0.5)" /> 
    </svg>`;
  }
}

function categorizedColorCode(category) {
  let colour;
  switch (category) {
    case "good":
      colour = "#42a93c";
      break;
    case "fair":
      colour = "#eec900";
      break;
    case "poor":
      colour = "#e47400";
      break;
    case "very-poor":
      colour = "#ba0029";
      break;
    case "extremely-poor":
      colour = "#590019";
      break;
    case "legend":
      colour = "#524eee";
      break;
    default:
      // Default color if category is not recognized
      // colour = "#524eee"; // Change this to your default color
      colour = "#242424";
  }
  return colour;
}

function svgClusterMarker(category) {
  let colour = categorizedColorCode(category);
  return `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <circle cx="15" cy="15" r="12"  stroke="${colour}" stroke-width="6" stroke-opacity="0.278431" fill="${colour}" fill-rule="evenodd"/>
</svg>`;
}

const svgHome = `<svg width="32" height="32" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="m5.183 5.436.268-.865c-.368.09-.626.569-.716.861h-.144c-.014-.2-.064-.706-.2-.84.324-.333.798-.408 1.412-.3l-.4 1.15-.22-.005ZM1.895 3.408l.065.516-.248-.109-.126-.725c.88-.14 2.716.795 2.782 2.339l-.892-.008c-.186-.813-.928-1.825-1.582-2.013Zm.251 2c-.134-.546-.499-1.163-.936-1.288l.076.424-.248-.104-.11-.556c.6-.096 1.905.554 2.076 1.533l-.858-.009ZM1.118 5.4c-.102-.3-.285-.572-.643-.644l.134.64-.233-.002-.218-.878c.572-.08 1.588.32 1.725.891L1.118 5.4Zm4.832.485-5.891.014-.011-.249 5.903-.087-.002.322Z" fill="#000"/>
      </svg>`;
// const locationMarker = `
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
//     <path stroke="#fff" fill="${color}" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
//   </svg>`;

export { markerGenerator, svgClusterMarker, svgHome };
