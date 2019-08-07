/* global hljs, $ */

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('fruits');
const url = 'https://randomuser.me/api/?results=10';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let fruits = data.results;
  return fruits.map(function(fruit) {
    let li = createNode('li'),
        img = createNode('img'),
        span = createNode('span');
    img.src = fruit.picture.medium;
    span.innerHTML = `${fruit.name.first} ${fruit.name.last}`;
    append(li, img);
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});   