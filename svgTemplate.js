const logo = require("./codolioLogo");
const svgTemplate = (username, totalQuestions, totalContests, awards) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="467" height="220" viewBox="0 0 467 220" fill="none" role="img" aria-labelledby="descId">
      <title id="titleId">${username}'s DSA Stats</title>
      <desc id="descId">Total Questions Solved: ${totalQuestions}, Total Contests Participated: ${totalContests}, Awards: ${awards}</desc>
      <style>
        .header {
          font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
          fill: #ffffff;
          animation: fadeInAnimation 0.8s ease-in-out forwards;
        }
        @supports(-moz-appearance: auto) {
          .header { font-size: 15.5px; }
        }
        
        .stat {
          font: 600 24px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #ffffff;
        }
        @supports(-moz-appearance: auto) {
          .stat { font-size: 12px; }
        }
        .stagger {
          opacity: 0;
          animation: fadeInAnimation 0.3s ease-in-out forwards;
        }
        .icon {
          width: 20px;
          height: 20px;
          fill: #ffffff;
        }
        @keyframes fadeInAnimation {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      </style>
    
      <!-- Background -->
      <svg id="visual" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
        <path d="M0 43L82 79L164 37L245 61L327 49L409 91L491 73L573 55L655 85L736 91L818 85L900 55L900 0L818 0L736 0L655 0L573 0L491 0L409 0L327 0L245 0L164 0L82 0L0 0Z" fill="#00cc8e"></path>
        <path d="M0 199L82 157L164 229L245 277L327 265L409 241L491 259L573 175L655 283L736 367L818 247L900 157L900 53L818 83L736 89L655 83L573 53L491 71L409 89L327 47L245 59L164 35L82 77L0 41Z" fill="#00b98a"></path>
        <path d="M0 289L82 277L164 295L245 349L327 349L409 313L491 373L573 241L655 325L736 421L818 307L900 235L900 155L818 245L736 365L655 281L573 173L491 257L409 239L327 263L245 275L164 227L82 155L0 197Z" fill="#00a784"></path>
        <path d="M0 547L82 487L164 517L245 523L327 493L409 541L491 463L573 529L655 517L736 523L818 451L900 463L900 233L818 305L736 419L655 323L573 239L491 371L409 311L327 347L245 347L164 293L82 275L0 287Z" fill="#00957c"></path>
        <path d="M0 601L82 601L164 601L245 601L327 601L409 601L491 601L573 601L655 601L736 601L818 601L900 601L900 461L818 449L736 521L655 515L573 527L491 461L409 539L327 491L245 521L164 515L82 485L0 545Z" fill="#038373"></path>
      </svg>
    
      <g data-testid="card-title" transform="translate(25, 35)">
        <text x="0" y="0" class="header" data-testid="header">${username}'s Codolio Stats</text>
      </g>
        ${logo}
      <g data-testid="main-card-body" transform="translate(0, 55)">
        <g class="stagger" style="animation-delay: 450ms" transform="translate(25, 0)">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="-30 1700 9000 512">
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
          </svg>
          <text class="stat bold" x="50" y="35">Total Questions Solved:</text>
          <text class="stat bold" x="335" y="35" data-testid="questions">${totalQuestions}</text>
        </g>
        <g class="stagger" style="animation-delay: 600ms" transform="translate(25, 25)">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 1600 9000 512">
            <path d="M400 0L176 0c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8L24 64C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9L192 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-26.1 0C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24L446.4 64c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112l84.4 0c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6l84.4 0c-5.1 66.3-31.1 111.2-63 142.3z"/>
          </svg>
          <text class="stat bold" x="50" y="35">Total Contests Participated:</text>
          <text class="stat bold" x="360" y="35" data-testid="contests">${totalContests}</text>
        </g>
        <g class="stagger" style="animation-delay: 750ms" transform="translate(25, 50)">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="-80 1500 9000 512">
            <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"/>
          </svg>
          <text class="stat bold" x="50" y="40">Awards:</text>
          <text class="stat bold" x="360" y="40" data-testid="awards">${awards}</text>
        </g>
      </g>
    </svg>`;
module.exports = svgTemplate;
