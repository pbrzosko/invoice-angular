import {Component} from "@angular/core";

@Component({
  selector: 'invoice-folder-icon',
  template: `
    <svg width="64" height="64" version="1.1" viewBox="0 0 16.933 16.933" xmlns="http://www.w3.org/2000/svg"
         xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="linearGradient1458">
          <stop stop-color="#ffbc4c" offset="0"/>
          <stop stop-color="#ffd257" offset="1"/>
        </linearGradient>
        <linearGradient id="linearGradient1371" x1="32.523" x2="32.523" y1="59.752" y2="13.321"
                        gradientUnits="userSpaceOnUse" xlink:href="#linearGradient1458"/>
        <linearGradient id="linearGradient1390" x1="32.523" x2="32.523" y1="59.752" y2="12.107"
                        gradientUnits="userSpaceOnUse">
          <stop stop-color="#e1aa50" offset="0"/>
          <stop stop-color="#fabe55" offset="1"/>
        </linearGradient>
        <linearGradient id="linearGradient1478" x1="34.24" x2="34.24" y1="59.752" y2="12.393"
                        gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffbe5a" offset="0"/>
          <stop stop-color="#ffd250" offset="1"/>
        </linearGradient>
        <linearGradient id="linearGradient1486" x1="53.159" x2="27.311" y1="22.141" y2="-1.5634"
                        gradientUnits="userSpaceOnUse" xlink:href="#linearGradient1458"/>
      </defs>
      <circle cx="-330.35" cy="-328.38" r="0" fill="#5e4aa6" stroke-width=".26458"/>
      <g id="Folder" transform="matrix(.22392 0 0 .23115 1.4289 1.8395)" fill="url(#linearGradient1486)">
        <g fill="url(#linearGradient1486)">
          <path
            d="m60 4.001h-33.21c0-1.7404-1.2803-4.001-4-4.001h-18.79c-2.209 0-4 1.792-4 4.001v12c0 2.209 1.791 4 4 4h56c2.209 0 4-1.791 4-4v-8.001c0-2.209-1.791-3.999-4-3.999z"
            clip-rule="evenodd" fill="url(#linearGradient1486)" fill-rule="evenodd"/>
        </g>
      </g>
      <g id="File_1_" transform="matrix(.23115 0 0 .23115 1.1974 1.8395)">
        <path
          d="m55.553 6.4333-47.896 3.1594c-2.2042 0.1454-3.8734 2.0504-3.728 4.2556l0.26329 3.9913c0.1454 2.2042 2.0504 3.8734 4.2546 3.728l47.896-3.1594c2.2042-0.1454 3.8734-2.0504 3.728-4.2546l-0.26329-3.9913c-0.14546-2.2052-2.0505-3.8744-4.2547-3.729z"
          fill="#fff"/>
      </g>
      <g id="Folder_1_" transform="matrix(.23115 0 0 .23115 1.1974 1.8395)" fill="url(#linearGradient1371)">
        <g fill="url(#linearGradient1390)">
          <path
            d="m60 12.001h-56c-2.209 0-4 1.791-4 4v40c0 2.209 1.791 4 4 4h56c2.209 0 4-1.791 4-4v-40c0-2.209-1.791-4-4-4z"
            fill="url(#linearGradient1478)"/>
        </g>
      </g>
    </svg>
  `
})
export class FolderIconComponent {
}