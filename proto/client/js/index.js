
//json files path
const postsUri = "data/posts.json";
const configUri = "data/config.json";

function queryData(){

  getRandomeQuote();

  $.ajax({
    dataType: "json",
    url: configUri,
    mimeType: "application/json",
    success: function(result){
      const jData = JSON.parse(JSON.stringify(result));
      createHeader(jData[0].active === "y"? jData[0]: "");
      createSidebar(jData[1].active === "y" ? jData[1]: "");
      createPosts(jData[2].active ===  "y"? jData[2]: "");
      createAboutMe(jData[3].active === "y" ? jData[3]: "");
      createSocial(jData[4].active ===  "y"? jData[4]: "");
      createFooter(jData[5].active === "y"? jData[5]: "");
      document.title = jData[6].title;
    }
  });
}

function age(created) {
  let calculatedAge = new Date().getFullYear() - created;
  if (calculatedAge == 1) {
    return "1 year ago";
  } else if (calculatedAge == 0) {
    return "some months ago";
  } else {
    return `${calculatedAge} years ago`;
  }
}

function createPosts(data){
  if(data){
    $.ajax({
      dataType: "json",
      url: postsUri,
      mimeType: "application/json",
      success: function(result){
      const dataJ = JSON.parse(JSON.stringify(result));
      if(dataJ){
        document.getElementsByClassName("content")[0].innerHTML = `
        <h1 class="posts-title">My posts</h1>
        ${dataJ.map(postTemplate).join("")}
        <p class="content-bottom">These ${dataJ.length} posts were added recently. Check back soon for updates.</p>
        `;
        $('.content').show();
        $('.post').show();    
      }}
    });
    }
}


function createHeader(data){
  if(data){
    if(data.logo){
      $.ajax( {
        url: "http://quotes.stormconsultancy.co.uk/random.json",
        dataType: "json",
        type: 'GET',
         success: function(json) {
          const dataJ = JSON.parse(JSON.stringify(json));  
          var quote = `${dataJ.quote}
          </br></br> -<i> ${dataJ.author}</i>`;
          document.getElementsByClassName("header")[0].innerHTML = `
          <img class="header-image" src="${data.logo}">
          <p class="header-text">${quote}</p> 
          `;
          $('.header').show();
          }
     });
    }
  }
}

function createSidebar(data){
  if(data && data.position){

    if(data.position === "left"){
    document.getElementsByClassName("sidenav-left")[0].innerHTML = `
      <a href="#about">About</a>
      <a href="#posts">Posts</a>
      <a href="#social">Social</a>
      `;
      $('.sidenav-left').show();
    }

    if(data.position === "right"){

      document.getElementsByClassName("sidenav-right")[0].innerHTML = `
      <a href="#about">About</a>
      <a href="#posts">Posts</a>
      <a href="#social">Social</a>
      `;
      $('.sidenav-right').show();
    }

    if(data.position === "both"){

      document.getElementsByClassName("sidenav-right")[0].innerHTML = `
      <a href="#about">About</a>
      <a href="#posts">Posts</a>
      <a href="#social">Social</a>
      `;
      document.getElementsByClassName("sidenav-left")[0].innerHTML = `
      <a href="#about">About</a>
      <a href="#posts">Posts</a>
      <a href="#social">Social</a>
        `;
        $('.sidenav-left').show();
        $('.sidenav-right').show();
      }
  }
}

function createSocial(data){
  if(data){
    document.getElementsByClassName("social")[0].innerHTML = `
    <ul class="social-ul">
      <li><a name="social" href="${data.fb}"><img class="social-image" src="images/social-icons/Facebook.png"></img></a></li>
      <li><a href="${data.tw}"><img class="social-image" src="images/social-icons/Twitter.png"></img></a></li>
      <li><a href="${data.ln}"><img class="social-image" src="images/social-icons/Linkedin.png"></img></a></li>
      <li><a href="${data.in}"><img class="social-image" src="images/social-icons/Instagram.png"></img></a></li>
      <li><a href="${data.git}"><img class="social-image" src="images/social-icons/Github.png"></img></a></li>
  </ul>
    `;
    $('.social').show();
  }
}

function createAboutMe(data){ 
  if(data){
    document.getElementsByClassName("aboutme")[0].innerHTML = `
    <a name="about"></a>
    <img class="about-image" src="${data.image}"></img>
    <div class="about-content">
    <h3 class="about-author">${data.author}</h>
    <p>Short bio: <i>${data.bio}</i></p>
    <p>Born: <i>${data.born}</i></p>
    <p>Current: </i><i>${data.current}</i></p>
    <p>Interests: <i>${data.interests}</i></p>
    </div>    
      `;
      $('.aboutme').show();
  }
 //todo 
}

function createFooter(data){
  if(data && data.text){
  document.getElementsByClassName("footer")[0].innerHTML = `
  <p class="footer-info">${data.text}</p>
  `;
    $('.footer').show();
  }
}

function postTemplate(post) {
  let target = `target-${post.id}`;
  let desc = `desc-${post.id}`;
    return `
    <a name="posts"></a>
    <div name="posts" class="post">
    <img class="post-image" src="${post.image}">
    <h2 class="post-name">${post.name} <span class="category">(${post.category})</span></h2>
    <p class=${desc} title=${post.id}>${post.text.substring(0,240)}<a href="#" class="toggle-desc"> read more</a></p>
    <p class=${target} title=${post.id}>${post.text}<a href="#" class="toggle"> ...less</a></p> 
   
    <p><strong>Created:</strong> ${age(post.created)}</p>
    <span class="category">tags: ${post.tags ? post.tags : "none"}</span>
    </div>
  `;
}

function postLinkTemplate(link){

}

function getRandomeQuote() {
  $.ajax( {
    url: "http://quotes.stormconsultancy.co.uk/random.json",
    dataType: "json",
    type: 'GET',
     success: function(json) {
      const dataJ = JSON.parse(JSON.stringify(json));  
      quote = `${dataJ.quote}
      - ${dataJ.author}`;
      console.log(quote);
      }
 });
}

document.addEventListener("DOMContentLoaded", queryData);

$(document).on('click','.toggle', function(event){
    let toggleText = `.${($(event.target).parent().attr('class'))}`;
    let toggleDesc = `.desc-${($(event.target).parent().attr('title'))}`;
      $(toggleText).toggle('slow');
      $(toggleDesc).toggle('slow');
      event.preventDefault();
  });

$(document).on('click','.toggle-desc', function(event){
    let toggleText = `.target-${($(event.target).parent().attr('title'))}`;
    let toggleDesc = `.${($(event.target).parent().attr('class'))}`;
      $(toggleText).toggle('slow');
      $(toggleDesc).toggle('slow');
      event.preventDefault();
  });

  

