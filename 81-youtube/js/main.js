let nextPageToken = "";
      function getVideos() {
        fetch(
          "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCymPTmdV5goU-IBMCAPaErQ&maxResults=57&order=date&key=AIzaSyAtBJJ-bZknixTcKVGcdthrQwc0XhjSuhg&pageToken=" +
            nextPageToken
        )
          .then((result) => {
            return result.json();
          })
          .then((data) => {
            console.log(data.items);
            let videos = data.items;
            nextPageToken = data.nextPageToken;
            let videoContainer = document.querySelector("#youtube-container");
            for (video of videos) {
              videoContainer.innerHTML += `
             
                        <div class="col-md-3 p-3">
                            <section class="hover-div"> 
                            <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                            <img src="${video.snippet.thumbnails.medium.url}"></a>
                            </section>
                        </div>
                
                      `;
            }
          });
      }
      getVideos();