let mailContainer=document.getElementById("mailContainer")

let mails=[];
let starred=[];
let seen=[];
let type=[];
let primary=[];
let updates=[];
let social=[];
let promotions=[];
let unseen_count=0;
let social_count=0;
let promotion_count=0;
let date,email_time;
let domain,organisation;

async function fetchMails() {
  try {
    const response = await fetch("http://localhost:8000/api/mail/getAll");
    mails = await response.json();
    calculateCounts(mails);
    initMailData(mails);
  } catch (error) {
    mailContainer.innerHTML = `<p>Error fetching mails: ${error.message}</p>`;
  }
}

function calculateCounts(mails) {
  unseen_count=0;
  social_count=0;
  promotion_count=0;
  for( let i = 0; i < mails.length; i++) {
    if(mails[i].status === "unseen") {
      unseen_count++;
      if(mails[i].type === "social") {
        social_count++;
      } else if(mails[i].type === "promotions") {
        promotion_count++;
      }
    }
  }
}

function addItems(mails){
  let k=0;
  mails.forEach(email => {
    const row = document.createElement("div");
    row.className = "email-row";
  
    const side_border=document.createElement("div")
    side_border.className="side-border"
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "email-checkbox side-icons";
  
    const star=document.createElement("div");
    star.className="star-icon side-icons"
    star.innerHTML=`<span class="material-symbols-outlined star" data-id="${email._id}" data-status="${email.starred}">star</span>`;
  
    const label=document.createElement("div")
    label.className="side-icons"
    label.innerHTML=`<span class="material-symbols-outlined">label_important</span>`;
  
    const drag=document.createElement("div")
    drag.id="drag-icon"
    drag.className="side-icons"
    drag.innerHTML=`<span class="material-symbols-outlined">
    drag_indicator
    </span>`;
    // console.log(email)
    const row_icons=document.createElement("div")
    row_icons.className="email-row-icons"
  
    const sender = document.createElement("div");
    sender.className = "email-sender";
    domain=email.sender.split('@')[0];
    // organisation=domain.split('.')[0]
    sender.textContent =domain;
  
    const subject = document.createElement("div");
    subject.className = "email-subject";
    subject.textContent = (email.subject ? email.subject : "(no subject)");
    
    const body = document.createElement("div");
    body.className = "email-body";
    body.innerHTML=" &nbsp;-&nbsp; "+ email.body;

    const time = document.createElement("div");
    time.className = "email-time";
    const dateObj = new Date(email.createdAt)
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timePart = dateObj.toLocaleTimeString(undefined, options);
    const options_date = { month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString(undefined, options_date);
    const now = new Date();
    const options_now = { month: 'short', day: 'numeric' };
    const now_date = now.toLocaleDateString(undefined, options_now);

    if(formattedDate===now_date){
      time.textContent = timePart;
    }
    else{
      time.textContent = formattedDate;
    }
  
    const hover_extra=document.createElement("div");
    hover_extra.className="hover-extra";
    hover_extra.innerHTML=`<span class="material-symbols-outlined archive">archive</span>
    <span class="material-symbols-outlined delete" data-id=${email._id}>delete</span>
    <span class="material-symbols-outlined mark-as-unread" data-id="${email._id}">mark_as_unread</span>
    <span class="material-symbols-outlined schedule">schedule</span>`;
    row_icons.appendChild(drag)
    row_icons.appendChild(checkbox)
    row_icons.appendChild(star)
    row_icons.appendChild(label)
    row.classList.add("change-on-hover")
    row.appendChild(side_border);
    row.appendChild(row_icons);
    row.appendChild(sender);

    if(email.type==="promotions"){
      const promo_tag=document.createElement('div')
      promo_tag.className="promo-tag"
      promo_tag.textContent=`Promotions`
      row.appendChild(promo_tag);
    }
    else if(email.type==="updates"){
      const update_tag=document.createElement('div')
      update_tag.className="update-tag"
      update_tag.textContent=`Updates`
      row.appendChild(update_tag);
    }
    row.appendChild(subject);
    row.appendChild(body);
    row.appendChild(time);
    row.appendChild(hover_extra);
  
    mailContainer.appendChild(row);
    
    if(email.starred===true){
      star.classList.toggle("star");
    }
    if(email.status==="unseen"){
      time.style.fontWeight="bold"
      time.style.color="black"
      sender.style.fontWeight = 'bold';
      subject.style.fontWeight = 'bold';
    }
    else{
      row.classList.add("unread");
    }
    
    k++;
  });
  
  let star=document.getElementsByClassName("star-icon")
  let checkbox=document.getElementsByClassName("email-checkbox")
  let body=document.getElementsByClassName("email-body")
  let subject=document.getElementsByClassName("email-subject")
  let sender=document.getElementsByClassName("email-sender")
  let new_social=document.getElementById("new-social")
  let new_promotion=document.getElementById("new-promotion")

  if(social_count>0){
    new_social.innerHTML=`${social_count} NEW`
    new_social.style.padding="3px"
    new_social.style.borderRadius="3px"
  }
  else{
    new_social.innerHTML=``
    new_social.style.padding="0px"
    new_social.style.borderRadius="0px"
  }
  if(promotion_count>0){
    new_promotion.innerHTML=`${promotion_count} NEW`
    new_promotion.style.padding="3px"
    new_promotion.style.borderRadius="3px"
  }
  else{
    new_promotion.innerHTML=``
    new_promotion.style.padding="0px"
    new_promotion.style.borderRadius="0px"
  }

  if(unseen_count>0){
    inbox.innerHTML=`<span class="material-symbols-outlined" >inbox</span >Inbox <p id="unseen-count" class="count">${unseen_count}</p>`
    inbox.style.fontWeight="bold"
  }

  for (let j = 0; j < checkbox.length; j++) {
    checkbox[j].addEventListener('click',()=>{
      if(checkbox[j].checked){
        email[j].classList.add("checked");
        email[j].classList.remove("change-on-hover");
      }
      else{
        email[j].classList.remove("checked");
        email[j].classList.add("change-on-hover");
      }
    })
  }
  for (let i = 0; i < delete_icon.length; i++){
    delete_icon[i].addEventListener('click',async()=>{
      const id=mails[i]._id
        try {
          const response = await fetch(`http://localhost:8000/api/mail/delete/${id}`,{
            method:'DELETE'
          });
          const activeCategory = document.querySelector('.active-toolbar-item').getAttribute('data-category');
          const allMailsResponse = await fetch("http://localhost:8000/api/mail/getAll");
          const allMails = await allMailsResponse.json();
          calculateCounts(allMails);
          mailContainer.innerHTML='';
          if (activeCategory === 'primary') {
            await fetchMails();
          } 
          else {
            const response = await fetch(`http://localhost:8000/api/mail/getByCategory/${activeCategory}`);
            const categoryMails = await response.json();
            mailContainer.innerHTML = '';
            addItems(categoryMails);
        }
      } catch (error) {
          mailContainer.innerHTML = `<p>Error deleting mails with id ${id}: ${error.message}</p>`;
        }
      })
  }

  for (let j = 0; j < star.length; j++){
    star[j].addEventListener('click',async(event)=>{
      const id=event.target.getAttribute("data-id")
      const starred=event.target.getAttribute("data-status").trim()
      try {
        const response = await fetch(`http://localhost:8000/api/mail/star/${id}/${starred}`,{
            method:'PUT'
          });
          event.target.parentElement.classList.toggle("star");
        } catch (error) {
          mailContainer.innerHTML = `<p>Error starring mails with id ${id}: ${error.message}</p>`;
        }
      })
  }
  async function markingRead(id){
    try {
      const response = await fetch(`http://localhost:8000/api/mail/read/${id}`,{
        method:'PUT'
      });
      const activeCategory = document.querySelector('.active-toolbar-item').getAttribute('data-category');
      const allMailsResponse = await fetch("http://localhost:8000/api/mail/getAll");
      const allMails = await allMailsResponse.json();
      calculateCounts(allMails);
      mailContainer.innerHTML='';
      if (activeCategory === 'primary') {
        await fetchMails();
      } 
      else {
        const response = await fetch(`http://localhost:8000/api/mail/getByCategory/${activeCategory}`);
        const categoryMails = await response.json();
        mailContainer.innerHTML = '';
        addItems(categoryMails);
    }
    } catch (error) {
      mailContainer.innerHTML = `<p>Error Reading mails with id ${id}: ${error.message}</p>`;
    }
  }


  for (let j = 0; j < mails.length; j++){
    const id=mails[j]._id
    subject[j].addEventListener('click', () => markingRead(id));
    body[j].addEventListener('click', () => markingRead(id));
    sender[j].addEventListener('click', () => markingRead(id));
    unread_button[j].addEventListener('click', () => markingRead(id));
  }
}

function initMailData(mails){
  for (let i = 0; i < mails.length; i++){
    if(mails[i]['starred']==true)
      starred[i]=mails[i]
    if(mails[i].status==="seen")
      seen[i]=mails[i]
    if(mails[i].type=="primary"){
      type[i]=mails[i].type
    }
    if(mails[i].type=="social"){
      type[i]=mails[i].type
    }
    if(mails[i].type=="updates"){
      type[i]=mails[i].type
    }
    if(mails[i].type=="promotions"){
      type[i]=mails[i].type
    }
  }
  addItems(mails);
}
fetchMails();

let nav_item_selected=document.getElementsByClassName("active");
let nav_item=document.getElementsByClassName("nav-item");
let more=document.getElementById("more");
let extended_div=document.getElementsByClassName("extra");
let menu=document.getElementById("menu")
let inbox = document.getElementById("inbox")
let email=document.getElementsByClassName("email-row");
let sidebar_elem=document.getElementsByClassName("nav-sidebar");
let toolbar_items=document.getElementsByClassName("toolbar-items")
let toolbar_item_selected=document.getElementsByClassName("active-toolbar-item")
let input = document.querySelector('.search-input');
let icon = document.querySelector('#search-icon');
let close=document.querySelector('#close')
let delete_icon=document.getElementsByClassName("delete");
let mark_as_read_icon=document.getElementsByClassName("mark-as-unread")
let compose_button=document.getElementsByClassName("compose-btn")
let unread_button=document.getElementsByClassName("mark-as-unread")
let starred_tab=document.getElementById("starred-tab")


for (let i = 0; i < nav_item.length; i++) {
  nav_item[i].addEventListener('click', ()=>{
    nav_item_selected[0].classList.remove("active");
    nav_item[i].classList.toggle("active");
    if(nav_item[i].classList.contains("not-more")){
      extended_div[0].classList.remove("extended");
      more.innerHTML=`<span class="material-symbols-outlined">keyboard_arrow_down</span>
      More`;
    }
  });
}

inbox.addEventListener('click',async()=>{
  mailContainer.innerHTML = '';
  fetchMails();
});

starred_tab.addEventListener('click',async()=>{
  try {
    const response = await fetch('http://localhost:8000/api/mail/getStarred',{
            method:'GET'
          });
    const starredMails = await response.json();
    mailContainer.innerHTML = '';
    addItems(starredMails);
  } 
  catch (error) {
    mailContainer.innerHTML = `<p>Error fetching starred mails: ${error.message}</p>`;
  }
});

more.addEventListener('click',()=>{
  extended_div[0].classList.toggle("extended");
  if(extended_div[0].classList.contains("extended")){
    more.innerHTML=`<span class="material-symbols-outlined">keyboard_arrow_up</span>
    Less`;
  }
  else{
    more.innerHTML=`<span class="material-symbols-outlined">keyboard_arrow_down</span>
    More`;
  }
})

menu.addEventListener('click',()=>{
  if(sidebar_elem[0].classList.contains("sidebar")){
    setTimeout(function() {
      sidebar_elem[0].classList.add("hidden-sidebar")
      sidebar_elem[0].classList.remove("sidebar");
    },100)
  }
  else{
    setTimeout(function() {
      sidebar_elem[0].classList.add("sidebar");
      sidebar_elem[0].classList.remove("hidden-sidebar")
    },100)
  }
})

close.addEventListener('click',()=>{
  input.value='';
  close.style.display='none';
  icon.style.display = 'block';
})

input.addEventListener('input', function() {
  if (this.value.length > 0 ) {
    icon.style.display = 'none';
    close.style.display='block';
  } else {
    close.style.display='none';
    icon.style.display = 'block';
  }
});

for (let i = 0; i < toolbar_items.length; i++) {
  toolbar_items[i].addEventListener('click',async()=>{
    toolbar_item_selected[0].classList.remove("active-toolbar-item");
    toolbar_items[i].classList.toggle("active-toolbar-item");
    const category = toolbar_items[i].getAttribute('data-category');
    console.log(category);

    try{
      const response = await fetch(`http://localhost:8000/api/mail/getByCategory/${category}`,{
        method: 'GET'
      });
      const mailsToShow = await response.json();
      mailContainer.innerHTML = '';
      addItems(mailsToShow);
    }catch(error) {
        mailContainer.innerHTML = `<p>Error fetching mails by category: ${error.message}</p>`;
    // NewMailData(mailsToShow);
    } 
  })
}