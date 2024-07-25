async function fetchData() {
  const username = document.getElementById("username").value;
  const svgContainer = document.getElementById("svg-container");
  const profileLinkContainer = document.getElementById("profile-link");
  const linksContainer = document.getElementById("links-container");

  try {
    const response = await fetch(
      `https://dsastats.netlify.app/api/codolio/${username}`
    );
    if (response.ok) {
      const svg = await response.text();
      svgContainer.innerHTML = svg;

      const baseUrl = window.location.origin;
      const profileLink = `${baseUrl}/api/codolio/${username}`;
      const githubStatsUrl =
        "https://github.com/githubusername/githubusername/blob/main/stats.svg";

      const markdownImageUrl = `![Dynamic Stats](${githubStatsUrl})`;
      const markdownVariableSizeStats = `![Static Stats](${profileLink})`;
      const markdownImageTag = `<img align="center" alt="DSA Stats" width="22px" src="${githubStatsUrl}" />`;

      profileLinkContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Your DSA Stats Profile Link:</h2>
      <div class="w-full">
        <div class="relative">
          <label for="profile-link-copy-text" class="sr-only">Profile Link</label>
          <input id="profile-link-copy-text" type="text" class="text-center col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${profileLink}" disabled readonly>
          <button onclick="copyToClipboard('${profileLink}')" class="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
            <span id="default-message" class="inline-flex items-center">
              <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
              </svg>
              <span class="text-xs font-semibold">Copy</span>
            </span>
            <span id="success-message" class="hidden inline-flex items-center">
              <svg class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
              <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">Copied</span>   
            </span>
          </button>
        </div>
      </div>
    `;

      linksContainer.innerHTML = `
        <div class="bg-gray-200 p-4 rounded-md mt-4">
          <div class="flex flex-col items-center space-y-4">
            <div class="flex items-center">
              <div class="flex flex-col items-center space-y-2">
              <span>This will display a Auto-Update-Dynamic stats board. [ Setup Github Workflow Needed ]</span>
                <div class="flex items-center">
                  <code class="bg-gray-100 p-2 rounded text-sm">${markdownImageUrl}</code>
                  
                  <button type="button" onclick="copyToClipboard('${markdownImageUrl}')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 m-10 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Copy
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="margin-left: 6px;" fill="white" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                  </svg>
                  </button>
                </div>
                <br>
                <span>This will display a static (No Auto-Update) stats board.</span>
                <div class="flex items-center">
                  <code class="bg-gray-100 p-2 rounded text-sm">${markdownVariableSizeStats}</code>

                  <button type="button" onclick="copyToClipboard('${markdownVariableSizeStats}')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Copy
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" style="margin-left: 6px;" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                  </svg>
                  </button>
                </div>
                <br>
                <span>This URL will allow you to scale the size of Stats board.</span>
                <div class="flex items-center">
                  <code class="bg-gray-100 p-2 rounded text-sm">&lt;img align="center" alt="DSA Stats" width="22px" src="${githubStatsUrl}" /&gt;</code>
                  
  
                                    
                  <button type="button" onclick="copyToClipboard('&lt;img align=&quot;center&quot; alt=&quot;DSA Stats&quot; width=&quot;22px&quot; src=&quot;${githubStatsUrl}&quot; /&gt;')" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 m-10 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Copy
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="margin-left: 6px;" fill="white" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
                  </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      svgContainer.innerHTML =
        '<p class="text-red-500 text-center">Error fetching data</p>';
      profileLinkContainer.innerHTML = "";
      linksContainer.innerHTML = "";
    }
  } catch (error) {
    svgContainer.innerHTML = `<p class="text-red-500 text-center">Error: ${error.message}</p>`;
    profileLinkContainer.innerHTML = "";
    linksContainer.innerHTML = "";
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
  alert("Content copied to clipboard!");
}
