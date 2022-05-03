var x = 0
function darkmode(){
  if (x == 0){
    x++;
    document.getElementById('darkmode').innerHTML = `
    html,
    body,
    :not([style*="background-color:"]):not(iframe) {
        background-color: rgb(0, 0, 0) !important;
    }
    html,
    body,
    :not([style*="color:"]),
    .sr-reader *:not([class*='sr-pivot']) {
        color: rgb(186, 173, 146) !important;
    }
    h1:not([style*="color:"]),
    h2:not([style*="color:"]),
    h3:not([style*="color:"]),
    h4:not([style*="color:"]),
    h5:not([style*="color:"]),
    h6:not([style*="color:"]) {
        color: rgb(255, 151, 94) !important;
    }
    cite:not([style*="color:"]) {
        color: rgb(132, 241, 161) !important;
    }
    input:not([style*="background-color:"]),
    textarea:not([style*="background-color:"]),
    button:not([style*="background-color:"]),
    [role="button"] {
        background-color: rgb(0, 8, 31) !important;
    }
    input:not([style*="background-color:"]):hover,
    textarea:not([style*="background-color:"]):hover,
    button:not([style*="background-color:"]):hover,
    [role="button"]:hover {
        background-color: rgb(0, 17, 48) !important;
    }
    input:not([style*="background-color:"]):active, input:not([style*="background-color:"]):focus,
    textarea:not([style*="background-color:"]):active, textarea:not([style*="background-color:"]):focus,
    button:not([style*="background-color:"]):active, button:not([style*="background-color:"]):focus,
    [role="button"]:active, [role="button"]:focus {
        background-color: rgb(0, 20, 53) !important;
    }
    a:not([style*="color:"]) {
        color: rgb(132, 209, 240) !important;
    }
    a:not([style*="color:"]):hover {
        color: rgb(145, 213, 244) !important;
    }
    a:not([style*="color:"]):active, a:not([style*="color:"]):focus {
        color: rgb(157, 217, 248) !important;
    }
    :not([style*="border-color:"]),
    ::before,
    ::after {
        border-color: rgb(66, 109, 136) !important;
    }
    div:empty,
    .sr-reader *,
    .sr-backdrop {
        background-color: rgba(0, 0, 0, 0.5) !important;
    }
    input::placeholder,
    textarea::placeholder {
        color: rgba(186, 173, 146, 0.5) !important;
    }
    input:not([style*="background-image:"]),
    textarea:not([style*="background-image:"]) {
        background-image: none !important;
    }
    `;

  }
   else if (x == 1){
    x--;
    document.getElementById('darkmode').innerHTML = ''
  } 
}
