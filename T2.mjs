import fetch from 'node-fetch';

const apiKey = 'ef0b0973b783e0614ac87612ec04344b';

// Função para consultar coordenadas a partir do nome da cidade
async function getCoordinates(cityName) {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error('Cidade não encontrada ou coordenadas não disponíveis.');
    }
  } catch (error) {
    console.error('Erro ao obter coordenadas:', error.message);
    return null;
  }
}


// Função para consultar condições atuais a partir de latitude/longitude
async function getCurrentConditions(latitude, longitude, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
      console.log('Cidade não encontrada.');
      return;
    }

    if (data.main && data.main.feels_like !== undefined) {
      console.log('Sensação Térmica:', data.main.feels_like);
    } else {
      console.log('Sensação Térmica não disponível.');
    }

    const description = data.weather && data.weather.length > 0 ? data.weather[0].description : 'N/A';
    console.log('Descrição:', description);
  } catch (error) {
    console.error('Erro ao obter condições atuais:', error.message);
  }
}

// Exemplo de uso
async function main() {
  const cityName = 'London'; //Altere o nome da ciadade aqui
  const coordinates = await getCoordinates(cityName);

  if (coordinates) {
    const { latitude, longitude } = coordinates;
    console.log('Coordenadas:', `Latitude: ${latitude}, Longitude: ${longitude}`);
    await getCurrentConditions(latitude, longitude, apiKey);
  }
}

// Chamando a função principal
main();

// para utilizar no terminal: 
//    - Instalar "npm install node-fetch"
//    - E depois executar "node T2.mjs"
//    obs: infelizmente as descrições térmicas ficaram em inglês 