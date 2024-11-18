(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const l="https://rickandmortyapi.com/api",u=`${l}/character`,m=`${l}/location`,f=`${l}/episode`,i=document.getElementById("output"),a=document.getElementById("api-character"),y=document.getElementById("api-location"),d=document.getElementById("api-episode");a==null||a.addEventListener("click",async()=>{try{const n=await(await fetch(u)).json();i.innerHTML="",n.results.forEach(r=>{const s=document.createElement("div");s.innerHTML=g(r),i.appendChild(s)})}catch(e){console.error(e)}});function g(e){var r;return`
    <h4>Name: ${e.name}</h4>
    <p>${e.status}</p>
    <p>Gender: ${e.gender}</p>
    <p>Location: ${(r=e==null?void 0:e.location)==null?void 0:r.name}</p>
    <img src="${e.image}" alt="${e.name}">
  `}async function h(e){return`
  <h4>Name: ${e.name}</h4>
  <p>Type: ${e.type}</p>
  <p>Resident: ${await p(e.residents)}</p>
  `}async function p(e){const n=[];for(const r of e)try{const t=await(await fetch(r)).json();n.push(t.name)}catch(s){console.error(s)}return n.join(", ")}y.addEventListener("click",async()=>{try{const n=await(await fetch(m)).json();i.innerHTML="";for(const r of n.results){const s=document.createElement("div");s.innerHTML=await h(r),i.appendChild(s)}}catch(e){console.error(e)}});d==null||d.addEventListener("click",async()=>{try{const n=await(await fetch(f)).json();i.innerHTML="",await Promise.all(n.results.map(async r=>{console.log(r);const s=document.createElement("div");s.innerHTML=await E(r),i.appendChild(s)}))}catch(e){console.error(e)}});async function E(e){const n=await p(e.characters);return`
    <p>Name:${e.name}</p>
    <p>Air date: ${e.air_date}</p>
    <p>Characters: ${n}</p>
  `}
