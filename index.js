/* eslint-env jquery */
const user = {name:''};
$('#submitBtn').click((e)=>{
  e.preventDefault();
  let searchTerm = $('#searchTerm').val();
  if(!searchTerm){
    alert('please submit a name');
  }else{
    user.name = searchTerm;
    let options = {
      Method:'GET',
      headers: new Headers({Accept: 'application/vnd.github.v3+json',
        'Content-Type':'application/json'})
    };
    fetch('https://api.github.com/users/' + searchTerm +'/repos',options)
      .then(res=>{
        if(res.ok)
          return res.json();
        else
          return Promise.reject(new Error(res.status,res));

      }).then(obj=>{
        Object.assign(user,{repos:obj});
        render();
      }).catch(err=>alert(err));


  }
});


function render(){
  const output = $('#output');

  let results = [`<h2>${user.name}</h2>`, ...user.repos.map(repo => {
    return `<p>${repo.name}</p></br>
    <p>${repo.owner.login}</p></br><a href = ${repo.html_url}>repo</a>`;
    
  })];

  output.html(results);

}