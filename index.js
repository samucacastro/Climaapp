const express = require('express');
const app = express();
const axios = require('axios');
const request = require('request');
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
let cidadeLocal = '46200-000';
app.get('/', async (req, res) => {
	if(req.query.cep){
		cidadeLocal = req.query.cep;
	}

	try {
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&zip=${cidadeLocal},br&appid=2e3ffb26f885315b03bd7dd50329d5fb`);
		const data = response.data;
		// res.json(data);
		const dados = data;
		const {temp, feels_like, temp_min, temp_max, humidity} = dados.main;
		 temperatura = temp;
		 sencacao = feels_like;
		 minima = temp_min;
		 maxima = temp_max;
		 humidade = humidity;
		 cidade = dados.name;
		
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao consumir a API' });
	}
	
		// const dados = JSON.parse(data);
	
	
	res.send(`<!DOCTYPE html>
<html lang="pt-br">
<head>
	<script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
	<title>clima</title>
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
	<header>
		<span><i class="fa-solid fa-magnifying-glass-location"></i></span>
	</header>

	<main>
		<section>
			<img src="https://cdn-icons-png.flaticon.com/512/3767/3767036.png">
		</section>
		<section>
			<span id="graus">${temperatura}°c</span>
			<span id="sensacao">Sensação de ${sencacao}°c</span>
			<span id="cidade"><i class="fa-solid fa-location-dot"></i> ${cidade}</span>
		</section>
	</main>
	<footer>
		<section>
			<span>${humidade}%</span>
			<h6>Humidade do ar</h6>
		</section>
		<section>
			<span>${minima}°c</span>
			<h6>Minima</h6>
		</section>
		<section>
			<span>${maxima}°c</span>
			<h6>Maxima</h6>
		</section>
	</footer>`)
 
});

app.listen(3000)
