import './style.css';
import { IChacterResult } from './contracts/ICharacter';
import { ILocationResult } from './contracts/ILocation';
import { IEpisodeResult } from './contracts/IEpisode';

const BASE_URL = "https://rickandmortyapi.com/api";

const CHARACTER_ROUTE = `${BASE_URL}/character`;
const LOCATION_ROUTE = `${BASE_URL}/location`;
const EPISODE_ROUTE = `${BASE_URL}/episode`;

const outputElement = document.getElementById("output") as HTMLDivElement;
const characterElement = document.getElementById("api-character") as HTMLAnchorElement;
const locationElement = document.getElementById("api-location") as HTMLAnchorElement;
const episodeElement = document.getElementById("api-episode") as HTMLAnchorElement;

characterElement?.addEventListener('click', async () => {
  try{
    const response: Response = await fetch(CHARACTER_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    data.results.forEach((result: IChacterResult) => {
      const characterDiv = document.createElement('div') as HTMLDivElement;
      characterDiv.innerHTML = displayCharacter(result)
      outputElement.appendChild(characterDiv)
    })
    
  } catch (error){
    console.error(error);
    
  }
})

function displayCharacter(character: IChacterResult): string{
  const resultAsString = `
    <h4>Name: ${character.name}</h4>
    <p>${character.status}</p>
    <p>Gender: ${character.gender}</p>
    <p>Location: ${character?.location?.name}</p>
    <img src="${character.image}" alt="${character.name}">
  `
  return resultAsString
}


async function displayLocation(location: ILocationResult): Promise<string>{
  // const residents = await fetchResidents(location.residents);
  const resultAsString = `
  <h4>Name: ${location.name}</h4>
  <p>Type: ${location.type}</p>
  <p>Resident: ${await fetchResidents(location.residents)}</p>
  `
  return resultAsString
}

async function fetchResidents(locationResidents: string[]): Promise<string>{
  const resultArray: string[] = [];
  for(const resident of locationResidents){
    try{
      const response = await fetch(resident)
      const data: IChacterResult = await response.json()
      resultArray.push(data.name)
    } catch(error){
      console.error(error);
      
    }
  }
  return resultArray.join(", ")
}


locationElement.addEventListener('click', async () => {
  try{
    const response: Response = await fetch(LOCATION_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    for(const result of data.results){
      const locationDiv = document.createElement('div') as HTMLDivElement;
      locationDiv.innerHTML = await displayLocation(result)
      outputElement.appendChild(locationDiv)
    }
  } catch (error){
    console.error(error);
    
  }
})


episodeElement?.addEventListener('click', async () => {
  try{
    const response = await fetch(EPISODE_ROUTE)
    const data = await response.json()
    outputElement.innerHTML = ""
    await Promise.all(data.results.map(async (result: IEpisodeResult) => {
      console.log(result);
      const episodeDiv = document.createElement('div') as HTMLDivElement;
      episodeDiv.innerHTML = await displayEpisode(result);
      outputElement.appendChild(episodeDiv)
    }))
  } catch(error){
    console.error(error);
    
  }
})

async function displayEpisode(episode: IEpisodeResult): Promise<string>{
  const residents = await fetchResidents(episode.characters);
  const resultAsString = `
    <p>Name:${episode.name}</p>
    <p>Air date: ${episode.air_date}</p>
    <p>Characters: ${residents}</p>
  `
  return resultAsString
}